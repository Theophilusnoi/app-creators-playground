import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Camera, Upload, CheckCircle, AlertCircle, RotateCw, X } from 'lucide-react';

interface PalmAnalysis {
  overallReading: string;
  confidenceScore: number;
  lifeLineReading: { reading: string; spiritualInsight: string };
  heartLineReading: { reading: string; spiritualInsight: string };
  headLineReading: { reading: string; spiritualInsight: string };
  spiritualGifts: string;
  guidance: string;
}

export const WorkingPalmReader: React.FC = () => {
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
      // Check if browser supports camera
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      // Request camera permissions with fallback constraints
      const constraints = {
        video: {
          facingMode: 'environment', // Try back camera first
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
        }
      };

      let stream: MediaStream;
      
      try {
        // Try with back camera first
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (backCameraError) {
        console.log('Back camera failed, trying front camera:', backCameraError);
        // Fallback to front camera
        const frontCameraConstraints = {
          video: {
            facingMode: 'user',
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
          }
        };
        
        try {
          stream = await navigator.mediaDevices.getUserMedia(frontCameraConstraints);
        } catch (frontCameraError) {
          console.log('Front camera failed, trying basic constraints:', frontCameraError);
          // Final fallback - basic video
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
        }
      }

      setCameraStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready
        await new Promise<void>((resolve, reject) => {
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

          const handleError = (e: Event) => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('error', handleError);
            reject(new Error('Video failed to load'));
          };

          video.addEventListener('loadedmetadata', handleLoadedMetadata);
          video.addEventListener('error', handleError);
          
          // Fallback timeout
          setTimeout(() => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('error', handleError);
            if (video.videoWidth === 0 || video.videoHeight === 0) {
              reject(new Error('Video dimensions invalid'));
            } else {
              resolve();
            }
          }, 5000);
        });

        // Try to play the video
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.warn('Video autoplay failed:', playError);
          // This is often due to browser policies, but video should still work for capture
        }
        
        setStep('camera');
        
        toast({
          title: "Camera Ready",
          description: "Position your palm in the center and click capture",
        });
      }
    } catch (error) {
      console.error('Camera initialization error:', error);
      setCameraError(error instanceof Error ? error.message : 'Unknown camera error');
      
      let errorMessage = "Camera access failed. Please check permissions and try again.";
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = "Camera permission denied. Please allow camera access and try again.";
        } else if (error.name === 'NotFoundError') {
          errorMessage = "No camera found. Please connect a camera or use file upload.";
        } else if (error.name === 'NotSupportedError') {
          errorMessage = "Camera not supported on this device. Please use file upload.";
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
          title: "Analysis Complete",
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
        description: "Please try again with a clearer image",
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-purple-800">Palm Reading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Upload a clear photo of your palm or use your camera
              </p>
              
              {cameraError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{cameraError}</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={startCamera}
                  disabled={isInitializingCamera}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                >
                  {isInitializingCamera ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      Starting Camera...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      Use Camera
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Image
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-purple-800 flex items-center justify-between">
              Position Your Palm
              <Button
                onClick={stopCamera}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ height: '400px' }}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-4 border-white border-dashed rounded-full w-64 h-64 flex items-center justify-center">
                  <span className="text-white font-semibold text-center">
                    Center Your Palm Here
                    <br />
                    <span className="text-sm opacity-80">Keep steady & well-lit</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button
                onClick={captureImage}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture Palm
              </Button>
              <Button
                onClick={stopCamera}
                variant="outline"
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
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-purple-800">Analyzing Your Palm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {imageData && (
            <div className="text-center">
              <img
                src={imageData}
                alt="Your palm"
                className="max-w-sm mx-auto rounded-lg border-2 border-purple-200"
              />
            </div>
          )}
          
          <div className="space-y-3">
            <div className="text-center text-purple-700 font-medium">
              Reading your palm lines...
            </div>
            <Progress value={analysisProgress} className="h-3" />
            <div className="text-center text-sm text-gray-600">
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
            <span className="flex items-center gap-2 text-purple-800">
              <CheckCircle className="text-green-600" size={24} />
              Your Palm Reading
            </span>
            <Button onClick={reset} variant="outline" size="sm">
              <RotateCw size={16} className="mr-1" />
              New Reading
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge className="bg-green-100 text-green-800">
              {palmReading.confidenceScore}% Confidence
            </Badge>
          </div>

          <div className="grid gap-4">
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-purple-700 mb-2">💖 Life Line</h4>
                <p className="text-sm text-gray-700 mb-2">{palmReading.lifeLineReading?.reading}</p>
                <p className="text-xs text-purple-600 italic">{palmReading.lifeLineReading?.spiritualInsight}</p>
              </CardContent>
            </Card>

            <Card className="bg-pink-50 border-pink-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-pink-700 mb-2">❤️ Heart Line</h4>
                <p className="text-sm text-gray-700 mb-2">{palmReading.heartLineReading?.reading}</p>
                <p className="text-xs text-pink-600 italic">{palmReading.heartLineReading?.spiritualInsight}</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-700 mb-2">🧠 Head Line</h4>
                <p className="text-sm text-gray-700 mb-2">{palmReading.headLineReading?.reading}</p>
                <p className="text-xs text-blue-600 italic">{palmReading.headLineReading?.spiritualInsight}</p>
              </CardContent>
            </Card>

            {palmReading.spiritualGifts && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-700 mb-2">🌟 Spiritual Gifts</h4>
                  <p className="text-sm text-gray-700">{palmReading.spiritualGifts}</p>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300">
              <CardContent className="p-4">
                <h4 className="font-semibold text-purple-700 mb-2">🔮 Overall Reading</h4>
                <p className="text-sm font-medium text-gray-700">{palmReading.overallReading}</p>
              </CardContent>
            </Card>

            {palmReading.guidance && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-700 mb-2">✨ Divine Guidance</h4>
                  <p className="text-sm text-gray-700">{palmReading.guidance}</p>
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
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">Something went wrong. Please try again.</p>
        <Button onClick={reset} className="mt-4">
          Start Over
        </Button>
      </CardContent>
    </Card>
  );
};
