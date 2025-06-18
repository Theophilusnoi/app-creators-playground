
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useVoiceService } from '@/hooks/useVoiceService';
import { supabase } from '@/integrations/supabase/client';
import { Scan, RotateCw, Camera, Video, VideoOff, CameraSwitch, Upload } from 'lucide-react';

interface PalmLine {
  id: string;
  name: string;
  description: string;
}

interface PalmAnalysis {
  lifeLineReading: {
    name: string;
    reading: string;
    meaning: string;
    spiritualInsight: string;
    strength: string;
  };
  heartLineReading: {
    name: string;
    reading: string;
    meaning: string;
    spiritualInsight: string;
    strength: string;
  };
  headLineReading: {
    name: string;
    reading: string;
    meaning: string;
    spiritualInsight: string;
    strength: string;
  };
  fateLineReading: {
    name: string;
    reading: string;
    meaning: string;
    spiritualInsight: string;
    strength: string;
  };
  spiritualGifts: string;
  challenges: string;
  guidance: string;
  overallReading: string;
  confidenceScore: number;
  imageQuality: string;
}

const palmLines: PalmLine[] = [
  { id: 'life', name: 'Life Line', description: 'Represents vitality and life journey' },
  { id: 'heart', name: 'Heart Line', description: 'Shows emotional nature and relationships' },
  { id: 'head', name: 'Head Line', description: 'Indicates intellect and thinking style' },
  { id: 'fate', name: 'Fate Line', description: 'Reveals destiny and life purpose' },
];

export const PalmReader: React.FC = () => {
  const { toast } = useToast();
  const { generateAndPlay, playReadyAudio, audioReady } = useVoiceService();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [palmReading, setPalmReading] = useState<PalmAnalysis | null>(null);
  const [scanQuality, setScanQuality] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Get available camera devices
  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');
        setCameraDevices(cameras);
        if (cameras.length > 0) {
          setSelectedCamera(cameras[0].deviceId);
        }
      } catch (err) {
        console.error('Camera enumeration error:', err);
      }
    };
    
    getCameras();
  }, []);

  // Start/stop camera based on state
  useEffect(() => {
    const startCamera = async () => {
      if (!selectedCamera || !videoRef.current) return;
      
      try {
        const constraints = {
          video: { 
            deviceId: { exact: selectedCamera },
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };
        
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraActive(true);
      } catch (err) {
        console.error('Camera access error:', err);
        toast({
          title: 'Camera Error',
          description: 'Could not access the camera',
          variant: 'destructive',
        });
        setIsCameraActive(false);
      }
    };
    
    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
    };
    
    if (isCameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isCameraActive, selectedCamera, toast]);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setCapturedImage(e.target?.result as string);
        toast({
          title: "Image Uploaded",
          description: "Your palm image is ready for divine analysis",
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a valid image file",
        variant: "destructive"
      });
    }
  };

  // Capture image from video stream
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    setUploadedImage(imageData);
    
    toast({
      title: "Image Captured",
      description: "Palm image captured successfully",
    });
    
    return imageData;
  };

  // Analyze palm using the edge function
  const startScan = async () => {
    if (!capturedImage) {
      toast({
        title: 'No Image',
        description: 'Please capture or upload an image first',
        variant: 'destructive',
      });
      return;
    }
    
    setIsScanning(true);
    setIsAnalyzing(true);
    setScanProgress(0);
    setPalmReading(null);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        const newProgress = Math.min(prev + Math.floor(Math.random() * 10) + 1, 90);
        
        // Update quality based on progress
        if (newProgress >= 30 && newProgress < 50) {
          setScanQuality(Math.floor(Math.random() * 40) + 30);
        } else if (newProgress >= 50 && newProgress < 80) {
          setScanQuality(Math.floor(Math.random() * 30) + 50);
        } else if (newProgress >= 80) {
          setScanQuality(Math.floor(Math.random() * 20) + 80);
        }
        
        return newProgress;
      });
    }, 200);

    try {
      console.log('🔮 Calling palm-scanner edge function...');
      
      const { data, error } = await supabase.functions.invoke('palm-scanner', {
        body: {
          image: capturedImage,
          analysisType: 'spiritual'
        }
      });

      clearInterval(progressInterval);
      setScanProgress(100);

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (data?.success && data?.analysis) {
        setPalmReading(data.analysis);
        setScanQuality(data.analysis.confidenceScore);
        
        toast({
          title: "Divine Reading Complete",
          description: `Analysis completed with ${data.analysis.confidenceScore}% confidence`,
        });

        // Generate voice reading but don't auto-play
        await generateAndPlay({
          text: `Your divine palm reading is complete. ${data.analysis.overallReading}`,
          emotion: 'compassionate'
        });
      } else {
        throw new Error(data?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Palm analysis error:', error);
      clearInterval(progressInterval);
      
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze palm. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
      setIsAnalyzing(false);
      setTimeout(() => setScanProgress(0), 2000);
    }
  };

  // Toggle camera on/off
  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  // Switch to next camera
  const switchCamera = () => {
    if (cameraDevices.length < 2) return;
    
    const currentIndex = cameraDevices.findIndex(device => device.deviceId === selectedCamera);
    const nextIndex = (currentIndex + 1) % cameraDevices.length;
    setSelectedCamera(cameraDevices[nextIndex].deviceId);
    
    // Restart camera with new selection
    if (isCameraActive) {
      setIsCameraActive(false);
      setTimeout(() => setIsCameraActive(true), 100);
    }
  };

  // Reset scanner
  const resetScanner = () => {
    setCapturedImage(null);
    setUploadedImage(null);
    setScanProgress(0);
    setIsScanning(false);
    setPalmReading(null);
    setScanQuality(0);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-3">
          <Scan className="text-purple-600" size={32} />
          Sacred Palm Reader
        </h1>
        <p className="text-gray-600">
          Reveal your divine purpose through ancient palmistry wisdom
        </p>
      </div>

      <Card className="bg-gradient-to-br from-purple-900 to-indigo-800 text-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Scan className="mr-2" />
              <span>Advanced Palm Scanner</span>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={isCameraActive ? "destructive" : "secondary"} 
                size="icon"
                onClick={toggleCamera}
              >
                {isCameraActive ? <VideoOff size={20} /> : <Video size={20} />}
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                onClick={switchCamera}
                disabled={cameraDevices.length < 2}
                title={`Switch camera (${cameraDevices.length} available)`}
              >
                <CameraSwitch size={20} />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Camera Preview Section */}
            <div className="relative bg-black rounded-xl overflow-hidden border-2 border-indigo-500">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                className={`w-full h-64 object-cover ${isCameraActive ? 'block' : 'hidden'}`}
              />
              
              {!isCameraActive && (
                <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-900">
                  <Camera className="text-gray-600 w-16 h-16 mb-4" />
                  <p className="text-gray-500 mb-4">Camera is disabled</p>
                  
                  {/* Upload option when camera is off */}
                  <div className="text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="palm-upload"
                    />
                    <label
                      htmlFor="palm-upload"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors inline-flex items-center"
                    >
                      <Upload className="mr-2" size={16} />
                      Upload Image
                    </label>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={captureImage}
                  disabled={!isCameraActive || isScanning}
                >
                  <Camera className="mr-2" size={18} />
                  Capture Palm Image
                </Button>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="bg-indigo-900/30 rounded-xl p-4 border border-indigo-700">
              {capturedImage ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center mb-4">
                    <div className="relative">
                      <img 
                        src={capturedImage} 
                        alt="Captured palm" 
                        className="max-h-52 rounded-lg border-2 border-indigo-500"
                      />
                      {scanQuality > 0 && (
                        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                          Quality: {scanQuality}%
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isScanning ? (
                    <div className="space-y-3">
                      <div className="text-center text-indigo-200">
                        {isAnalyzing ? "Divine analysis in progress..." : "Analyzing your palm lines..."}
                      </div>
                      <Progress 
                        value={scanProgress} 
                        className="bg-white/20 h-3"
                      />
                      <div className="flex justify-between text-xs">
                        <span>Scan Progress</span>
                        <span>{scanProgress}%</span>
                      </div>
                    </div>
                  ) : palmReading ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-center text-purple-300">
                          Divine Palm Reading
                        </h3>
                        
                        {audioReady && (
                          <Button
                            onClick={playReadyAudio}
                            className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg"
                          >
                            Play Voice
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                        <div className="bg-white/70 rounded-lg p-3 text-gray-800">
                          <h4 className="font-semibold text-purple-700 mb-1">💖 {palmReading.lifeLineReading.name}</h4>
                          <p className="text-sm mb-1">{palmReading.lifeLineReading.reading}</p>
                          <p className="text-xs text-purple-600 italic">{palmReading.lifeLineReading.spiritualInsight}</p>
                        </div>
                        
                        <div className="bg-white/70 rounded-lg p-3 text-gray-800">
                          <h4 className="font-semibold text-purple-700 mb-1">❤️ {palmReading.heartLineReading.name}</h4>
                          <p className="text-sm mb-1">{palmReading.heartLineReading.reading}</p>
                          <p className="text-xs text-purple-600 italic">{palmReading.heartLineReading.spiritualInsight}</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 border border-purple-300 text-gray-800">
                          <h4 className="font-semibold text-purple-700 mb-1">🔮 Overall Reading</h4>
                          <p className="text-sm font-medium">{palmReading.overallReading}</p>
                        </div>
                      </div>
                      
                      <div className="text-center text-sm text-gray-300 mb-3">
                        <p>Confidence: {palmReading.confidenceScore}% | Quality: {palmReading.imageQuality}</p>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button 
                          variant="secondary" 
                          onClick={resetScanner}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600"
                        >
                          <RotateCw className="mr-2" size={16} />
                          Scan Again
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-center mb-4">
                        <p className="text-indigo-300 mb-2">Image Ready</p>
                        <p className="text-sm text-indigo-400">Ready for divine palm analysis</p>
                      </div>
                      <Button 
                        onClick={startScan}
                        disabled={isScanning}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Scan className="mr-2" size={18} />
                        Begin Divine Reading
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="bg-gradient-to-br from-purple-900 to-indigo-800 border-2 border-dashed border-indigo-600 rounded-xl w-full h-full flex items-center justify-center">
                    <div className="text-indigo-400">
                      <Camera className="mx-auto mb-3 text-indigo-500" size={40} />
                      <p>No image captured yet</p>
                      <p className="text-sm mt-1">Capture or upload your palm to begin analysis</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Palm Lines Reference */}
          <div className="mt-6 bg-indigo-900/40 rounded-xl p-4 border border-indigo-700">
            <h3 className="text-lg font-semibold mb-3 text-indigo-200">Palm Lines Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {palmLines.map(line => (
                <div 
                  key={line.id} 
                  className="bg-indigo-800/30 p-3 rounded-lg border border-indigo-700"
                >
                  <h4 className="font-medium text-purple-300">{line.name}</h4>
                  <p className="text-sm text-indigo-200">{line.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>For best results: Use a clear, well-lit photo of your palm with fingers together.</p>
        <p>Divine palmistry reveals spiritual insights - your faith and choices shape your destiny.</p>
      </div>
    </div>
  );
};
