
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Camera, Upload, Scan, RotateCw, CheckCircle, AlertCircle } from 'lucide-react';

interface PalmAnalysis {
  overallReading: string;
  confidenceScore: number;
  lifeLineReading: { reading: string; spiritualInsight: string };
  heartLineReading: { reading: string; spiritualInsight: string };
  headLineReading: { reading: string; spiritualInsight: string };
  spiritualGifts: string;
  guidance: string;
}

export const SimplePalmReader: React.FC = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [palmReading, setPalmReading] = useState<PalmAnalysis | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Start camera with improved error handling
  const startCamera = async () => {
    try {
      setCameraError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          facingMode: 'environment'
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        
        toast({
          title: "Camera Ready",
          description: "Position your palm in the center for best results",
        });
      }
    } catch (error) {
      console.error('Camera error:', error);
      setCameraError('Camera access denied or unavailable');
      setCameraActive(false);
      
      toast({
        title: "Camera Error",
        description: "Please allow camera access or upload an image instead",
        variant: "destructive"
      });
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setCameraError(null);
  };

  // Capture image from camera
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context || !video.videoWidth || !video.videoHeight) {
      toast({
        title: "Capture Error",
        description: "Please wait for camera to fully load",
        variant: "destructive"
      });
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    stopCamera();

    toast({
      title: "Image Captured",
      description: "Palm image captured successfully",
    });
  };

  // Handle file upload
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
      setCapturedImage(result);
      
      toast({
        title: "Image Uploaded",
        description: "Ready for palm analysis",
      });
    };
    reader.readAsDataURL(file);
  };

  // Analyze palm
  const analyzePalm = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setPalmReading(null);

    // Progress simulation
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
          image: capturedImage,
          analysisType: 'spiritual'
        }
      });

      clearInterval(progressInterval);
      setAnalysisProgress(100);

      if (error) throw error;

      if (data?.success && data?.analysis) {
        setPalmReading(data.analysis);
        
        toast({
          title: "Reading Complete",
          description: `Analysis completed with ${data.analysis.confidenceScore}% confidence`,
        });
      } else {
        throw new Error(data?.error || 'Analysis failed');
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Analysis error:', error);
      
      toast({
        title: "Analysis Failed",
        description: "Please try again or use a clearer image",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setAnalysisProgress(0), 2000);
    }
  };

  // Reset everything
  const reset = () => {
    setCapturedImage(null);
    setPalmReading(null);
    setAnalysisProgress(0);
    setIsAnalyzing(false);
    setCameraError(null);
    stopCamera();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          Sacred Palm Reader
        </h1>
        <p className="text-gray-600">
          Discover your spiritual path through ancient palmistry
        </p>
      </div>

      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Scan className="text-purple-600" size={24} />
              Palm Analysis
            </span>
            {palmReading && (
              <Button onClick={reset} variant="outline" size="sm">
                <RotateCw size={16} className="mr-1" />
                New Reading
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Camera/Upload Section */}
          {!capturedImage && !palmReading && (
            <div className="space-y-4">
              {/* Camera Preview */}
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ height: '400px' }}>
                {cameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      playsInline
                      muted
                    />
                    {/* Palm Guide Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="border-4 border-white border-dashed rounded-full w-64 h-64 flex items-center justify-center">
                        <span className="text-white font-semibold text-center">
                          Position Palm Here
                          <br />
                          <span className="text-sm opacity-80">Keep steady & well-lit</span>
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white">
                    <Camera size={48} className="mb-4 opacity-60" />
                    {cameraError ? (
                      <div className="text-center">
                        <AlertCircle className="mx-auto mb-2 text-red-400" size={32} />
                        <p className="text-red-400 mb-2">Camera Error</p>
                        <p className="text-sm opacity-80">{cameraError}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-lg mb-2">Camera Ready</p>
                        <p className="text-sm opacity-80">Start camera to capture your palm</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-3 justify-center">
                {!cameraActive ? (
                  <>
                    <Button
                      onClick={startCamera}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                    >
                      <Camera className="mr-2" size={18} />
                      Start Camera
                    </Button>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6"
                    >
                      <Upload className="mr-2" size={18} />
                      Upload Image
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={captureImage}
                      className="bg-green-600 hover:bg-green-700 text-white px-8"
                    >
                      <Camera className="mr-2" size={18} />
                      Capture Palm
                    </Button>
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      className="border-gray-300 px-6"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Captured Image Section */}
          {capturedImage && !palmReading && (
            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={capturedImage}
                  alt="Captured palm"
                  className="max-w-md mx-auto rounded-lg border-2 border-purple-200"
                />
              </div>

              {isAnalyzing ? (
                <div className="space-y-3">
                  <div className="text-center text-purple-700 font-medium">
                    Analyzing your palm lines...
                  </div>
                  <Progress value={analysisProgress} className="h-3" />
                  <div className="text-center text-sm text-gray-600">
                    {analysisProgress}% complete
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={analyzePalm}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                  >
                    <Scan className="mr-2" size={18} />
                    Analyze Palm
                  </Button>
                  <Button onClick={reset} variant="outline">
                    Retake
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Results Section */}
          {palmReading && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-700 font-semibold">
                <CheckCircle size={20} />
                Reading Complete ({palmReading.confidenceScore}% confidence)
              </div>

              <div className="grid gap-4">
                {/* Life Line */}
                <Card className="bg-white border-purple-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-purple-700 mb-2">💖 Life Line</h4>
                    <p className="text-sm text-gray-700 mb-2">{palmReading.lifeLineReading?.reading}</p>
                    <p className="text-xs text-purple-600 italic">{palmReading.lifeLineReading?.spiritualInsight}</p>
                  </CardContent>
                </Card>

                {/* Heart Line */}
                <Card className="bg-white border-purple-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-purple-700 mb-2">❤️ Heart Line</h4>
                    <p className="text-sm text-gray-700 mb-2">{palmReading.heartLineReading?.reading}</p>
                    <p className="text-xs text-purple-600 italic">{palmReading.heartLineReading?.spiritualInsight}</p>
                  </CardContent>
                </Card>

                {/* Head Line */}
                <Card className="bg-white border-purple-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-purple-700 mb-2">🧠 Head Line</h4>
                    <p className="text-sm text-gray-700 mb-2">{palmReading.headLineReading?.reading}</p>
                    <p className="text-xs text-purple-600 italic">{palmReading.headLineReading?.spiritualInsight}</p>
                  </CardContent>
                </Card>

                {/* Spiritual Gifts */}
                {palmReading.spiritualGifts && (
                  <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-green-700 mb-2">🌟 Spiritual Gifts</h4>
                      <p className="text-sm text-gray-700">{palmReading.spiritualGifts}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Overall Reading */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-purple-700 mb-2">🔮 Overall Reading</h4>
                    <p className="text-sm font-medium text-gray-700">{palmReading.overallReading}</p>
                  </CardContent>
                </Card>

                {/* Guidance */}
                {palmReading.guidance && (
                  <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-blue-700 mb-2">✨ Divine Guidance</h4>
                      <p className="text-sm text-gray-700">{palmReading.guidance}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Instructions */}
      <div className="mt-6 text-center text-sm text-gray-500 space-y-1">
        <p>For best results: Use clear lighting and hold your palm flat</p>
        <p>Your spiritual path is revealed through the lines on your palm</p>
      </div>
    </div>
  );
};
