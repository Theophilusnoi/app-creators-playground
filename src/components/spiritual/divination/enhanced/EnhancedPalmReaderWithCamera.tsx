
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Camera, Upload, CheckCircle, AlertCircle, RotateCw, X, Zap, Hand } from 'lucide-react';

interface PalmAnalysis {
  overallReading: string;
  confidenceScore: number;
  imageQuality: string;
  lifeLineReading: { name: string; reading: string; meaning: string; spiritualInsight: string };
  heartLineReading: { name: string; reading: string; meaning: string; spiritualInsight: string };
  headLineReading: { name: string; reading: string; meaning: string; spiritualInsight: string };
  fateLineReading: { name: string; reading: string; meaning: string; spiritualInsight: string };
  spiritualGifts: string;
  challenges: string;
  guidance: string;
}

export const EnhancedPalmReaderWithCamera: React.FC = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [step, setStep] = useState<'upload' | 'camera' | 'analyzing' | 'results'>('upload');
  const [imageData, setImageData] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [palmReading, setPalmReading] = useState<PalmAnalysis | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializingCamera, setIsInitializingCamera] = useState(false);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const startCamera = async () => {
    setIsInitializingCamera(true);
    setCameraError(null);
    
    try {
      // Stop existing stream if any
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      }

      // Check if browser supports camera
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      // Simple constraints that work reliably
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user' // Start with front camera for better compatibility
        }
      };

      console.log('🎥 Starting camera with basic constraints...');
      
      // Get camera stream with shorter timeout
      const stream = await Promise.race([
        navigator.mediaDevices.getUserMedia(constraints),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Camera timeout after 8 seconds')), 8000)
        )
      ]);

      setCameraStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready with timeout
        await Promise.race([
          new Promise<void>((resolve, reject) => {
            if (!videoRef.current) {
              reject(new Error('Video element not available'));
              return;
            }

            const video = videoRef.current;
            
            const handleLoadedMetadata = () => {
              video.removeEventListener('loadedmetadata', handleLoadedMetadata);
              video.removeEventListener('error', handleError);
              resolve();
            };

            const handleError = () => {
              video.removeEventListener('loadedmetadata', handleLoadedMetadata);
              video.removeEventListener('error', handleError);
              reject(new Error('Video failed to load'));
            };

            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            video.addEventListener('error', handleError);
          }),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Video load timeout')), 5000)
          )
        ]);

        // Try to play the video
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.warn('Video autoplay blocked, but camera is ready:', playError);
        }
        
        setStep('camera');
        setCameraError(null);
        
        toast({
          title: "Camera Ready! 📸",
          description: "Position your palm in the frame and capture",
        });
      }
    } catch (error) {
      console.error('Camera initialization error:', error);
      setCameraError(error instanceof Error ? error.message : 'Camera initialization failed');
      
      let errorMessage = "Camera failed to start. ";
      
      if (error instanceof Error) {
        if (error.message.includes('timeout') || error.message.includes('Timeout')) {
          errorMessage += "Camera is taking too long to respond. Try refreshing the page or use file upload.";
        } else if (error.name === 'NotAllowedError') {
          errorMessage += "Please allow camera access and try again.";
        } else if (error.name === 'NotFoundError') {
          errorMessage += "No camera found. Please use file upload instead.";
        } else {
          errorMessage += "Please try file upload or check camera permissions.";
        }
      }
      
      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsInitializingCamera(false);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      toast({
        title: "Capture Error",
        description: "Camera not ready. Please try again.",
        variant: "destructive"
      });
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context || video.videoWidth === 0 || video.videoHeight === 0) {
      toast({
        title: "Capture Error",
        description: "Video not ready. Please wait and try again.",
        variant: "destructive"
      });
      return;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    const capturedData = canvas.toDataURL('image/jpeg', 0.8);
    setImageData(capturedData);
    
    // Stop camera and start analysis
    stopCamera();
    analyzePalm(capturedData);
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped camera track:', track.kind);
      });
      setCameraStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraError(null);
    setStep('upload');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload a valid image file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageData(result);
      analyzePalm(result);
    };
    reader.readAsDataURL(file);
  };

  const analyzePalm = async (imageDataToAnalyze: string) => {
    setStep('analyzing');
    setAnalysisProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 300);

    try {
      const { data, error } = await supabase.functions.invoke('palm-scanner', {
        body: {
          image: imageDataToAnalyze,
          analysisType: 'spiritual'
        }
      });

      clearInterval(progressInterval);
      setAnalysisProgress(100);

      if (error) throw error;

      if (data?.success && data?.analysis) {
        setPalmReading(data.analysis);
        setStep('results');
        
        toast({
          title: "✨ Analysis Complete",
          description: `Reading completed with ${data.analysis.confidenceScore}% confidence`,
        });
      } else {
        throw new Error(data?.error || 'Analysis failed');
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Analysis error:', error);
      
      toast({
        title: "Analysis Failed",
        description: "Please try again with a clearer image of your palm",
        variant: "destructive"
      });
      setStep('upload');
    }
  };

  const reset = () => {
    setStep('upload');
    setImageData(null);
    setPalmReading(null);
    setAnalysisProgress(0);
    setCameraError(null);
    stopCamera();
  };

  if (step === 'upload') {
    return (
      <div className="space-y-6">
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-2 border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-center text-purple-200 text-2xl">📸 Enhanced Palm Reading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-purple-200 mb-6">
                Capture or upload a clear photo of your palm for AI-enhanced spiritual analysis
              </p>
              
              {cameraError && (
                <div className="mb-4 p-4 bg-red-900/30 border-2 border-red-500/50 rounded-lg">
                  <p className="text-red-300 text-sm font-medium">Camera Issue:</p>
                  <p className="text-red-200 text-sm">{cameraError}</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={startCamera}
                  disabled={isInitializingCamera}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white flex items-center gap-2 px-8 py-4 text-lg"
                  size="lg"
                >
                  {isInitializingCamera ? (
                    <>
                      <RotateCw className="w-5 h-5 animate-spin" />
                      Starting Camera...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      📸 Use Camera
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="border-2 border-purple-400 text-purple-300 hover:bg-purple-600/20 flex items-center gap-2 px-8 py-4 text-lg"
                  size="lg"
                >
                  <Upload className="w-5 h-5" />
                  📁 Upload Image
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="mt-6 text-sm text-purple-300">
                <p>💡 Tip: Ensure good lighting and hold your palm steady</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  if (step === 'camera') {
    return (
      <div className="space-y-6">
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-2 border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-center text-purple-200 flex items-center justify-between text-xl">
              📸 Position Your Palm
              <Button
                onClick={stopCamera}
                variant="outline"
                size="sm"
                className="text-red-400 hover:text-red-300 border-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative bg-black rounded-xl overflow-hidden" style={{ height: '400px' }}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-xl"
                autoPlay
                playsInline
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-4 border-white/90 border-dashed rounded-full w-64 h-64 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                  <div className="text-white font-bold text-center text-lg">
                    <Hand size={48} className="mx-auto mb-2 animate-pulse" />
                    Center Your Palm
                    <br />
                    <span className="text-sm opacity-90">Keep steady & well-lit</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button
                onClick={captureImage}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3"
                size="lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                ✨ Capture & Analyze
              </Button>
              <Button
                onClick={stopCamera}
                variant="outline"
                className="border-purple-400 text-purple-300"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-2 border-purple-400/30">
        <CardHeader>
          <CardTitle className="text-center text-purple-200 text-2xl">🔮 Analyzing Your Palm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {imageData && (
            <div className="text-center">
              <img
                src={imageData}
                alt="Your palm"
                className="max-w-sm mx-auto rounded-lg border-2 border-purple-300"
              />
            </div>
          )}
          
          <div className="space-y-3">
            <div className="text-center text-purple-200 font-medium text-lg">
              ✨ Reading your palm lines...
            </div>
            <Progress value={analysisProgress} className="h-4" />
            <div className="text-center text-sm text-purple-300">
              {Math.round(analysisProgress)}% complete
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'results' && palmReading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-purple-200 text-2xl">
              <CheckCircle className="text-green-400" size={28} />
              ✨ Your Enhanced Palm Reading
            </span>
            <Button onClick={reset} variant="outline" size="sm" className="border-purple-400 text-purple-300">
              <RotateCw size={16} className="mr-1" />
              New Reading
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge className="bg-green-800/30 text-green-200 border-green-500/50 px-4 py-2">
              ✅ {palmReading.confidenceScore}% Confidence
            </Badge>
          </div>

          <div className="grid gap-4">
            <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-400/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-purple-200 mb-2 text-lg">💖 {palmReading.lifeLineReading?.name}</h4>
                <p className="text-sm text-purple-100 mb-2">{palmReading.lifeLineReading?.reading}</p>
                <p className="text-sm text-purple-100 mb-2"><strong>Meaning:</strong> {palmReading.lifeLineReading?.meaning}</p>
                <p className="text-xs text-purple-300 italic">✨ {palmReading.lifeLineReading?.spiritualInsight}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-pink-900/30 to-red-900/30 border-2 border-pink-400/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-pink-200 mb-2 text-lg">❤️ {palmReading.heartLineReading?.name}</h4>
                <p className="text-sm text-pink-100 mb-2">{palmReading.heartLineReading?.reading}</p>
                <p className="text-sm text-pink-100 mb-2"><strong>Meaning:</strong> {palmReading.heartLineReading?.meaning}</p>
                <p className="text-xs text-pink-300 italic">✨ {palmReading.heartLineReading?.spiritualInsight}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-2 border-blue-400/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-200 mb-2 text-lg">🧠 {palmReading.headLineReading?.name}</h4>
                <p className="text-sm text-blue-100 mb-2">{palmReading.headLineReading?.reading}</p>
                <p className="text-sm text-blue-100 mb-2"><strong>Meaning:</strong> {palmReading.headLineReading?.meaning}</p>
                <p className="text-xs text-blue-300 italic">✨ {palmReading.headLineReading?.spiritualInsight}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-2 border-amber-400/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-amber-200 mb-2 text-lg">🌟 {palmReading.fateLineReading?.name}</h4>
                <p className="text-sm text-amber-100 mb-2">{palmReading.fateLineReading?.reading}</p>
                <p className="text-sm text-amber-100 mb-2"><strong>Meaning:</strong> {palmReading.fateLineReading?.meaning}</p>
                <p className="text-xs text-amber-300 italic">✨ {palmReading.fateLineReading?.spiritualInsight}</p>
              </CardContent>
            </Card>

            {palmReading.spiritualGifts && (
              <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-2 border-green-400/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-200 mb-2 text-lg">🎁 Spiritual Gifts</h4>
                  <p className="text-sm text-green-100">{palmReading.spiritualGifts}</p>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-400/50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-yellow-200 mb-2 text-lg">🔮 Overall Reading</h4>
                <p className="text-sm font-medium text-yellow-100">{palmReading.overallReading}</p>
              </CardContent>
            </Card>

            {palmReading.guidance && (
              <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-2 border-indigo-400/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-indigo-200 mb-2 text-lg">🙏 Divine Guidance</h4>
                  <p className="text-sm text-indigo-100">{palmReading.guidance}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-purple-200">Something went wrong. Please try again.</p>
        <Button onClick={reset} className="mt-4 bg-purple-600 hover:bg-purple-700">
          Start Over
        </Button>
      </CardContent>
    </Card>
  );
};
