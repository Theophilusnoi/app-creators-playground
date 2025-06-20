import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useVoiceService } from '@/hooks/useVoiceService';
import { supabase } from '@/integrations/supabase/client';
import { Scan, RotateCw, Camera, Video, VideoOff, RotateCcw, Upload, AlertCircle, Play, Volume2 } from 'lucide-react';

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
  elementalType: string;
  majorLines: {
    lifeLine: {
      name: string;
      reading: string;
      traditionalMeaning: string;
      spiritualInsight: string;
      culturalSource: string;
    };
    heartLine: {
      name: string;
      reading: string;
      traditionalMeaning: string;
      spiritualInsight: string;
      culturalSource: string;
    };
  };
  traditionalInterpretation: {
    synthesis: string;
    ayurvedicReading: string;
    chineseReading: string;
    westernReading: string;
  };
  spiritualGuidance: {
    spiritualGifts: string[];
    elementalPractices: string[];
  };
  culturalContext: string;
}

const palmLines: PalmLine[] = [
  { id: 'life', name: 'Life Line', description: 'Represents vitality and life journey' },
  { id: 'heart', name: 'Heart Line', description: 'Shows emotional nature and relationships' },
  { id: 'head', name: 'Head Line', description: 'Indicates intellect and thinking style' },
  { id: 'fate', name: 'Fate Line', description: 'Reveals destiny and life purpose' },
];

export const PalmReader: React.FC = () => {
  const { toast } = useToast();
  const { generateAndPlay, playReadyAudio, audioReady, isGenerating } = useVoiceService();
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
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraStatus, setCameraStatus] = useState<'inactive' | 'starting' | 'active' | 'error'>('inactive');
  const [isRetrying, setIsRetrying] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [showPermissionsHelp, setShowPermissionsHelp] = useState(false);

  // Enhanced camera initialization with better error handling
  const startCamera = async () => {
    try {
      setCameraStatus('starting');
      setCameraError(null);
      setShowPermissionsHelp(false);
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported in this browser');
      }

      // Stop existing stream if any
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }

      console.log('🎥 Starting enhanced camera initialization...');

      // Enhanced constraints with multiple fallback options
      const constraintOptions = [
        // High quality with environment camera preference
        {
          video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
            facingMode: 'environment'
          }
        },
        // Medium quality fallback
        {
          video: {
            width: { ideal: 1024, max: 1280 },
            height: { ideal: 576, max: 720 },
            facingMode: { ideal: 'environment' }
          }
        },
        // Basic quality fallback
        {
          video: {
            width: 640,
            height: 480,
            facingMode: { ideal: 'environment' }
          }
        },
        // Ultimate fallback - any available camera
        {
          video: true
        }
      ];

      let mediaStream: MediaStream | null = null;
      let lastError: Error | null = null;

      // Try each constraint option
      for (let i = 0; i < constraintOptions.length; i++) {
        try {
          console.log(`📹 Trying constraint option ${i + 1}:`, constraintOptions[i]);
          mediaStream = await navigator.mediaDevices.getUserMedia(constraintOptions[i]);
          console.log('✅ Camera stream acquired successfully');
          break;
        } catch (err) {
          console.warn(`⚠️ Constraint option ${i + 1} failed:`, err);
          lastError = err as Error;
          continue;
        }
      }

      if (!mediaStream) {
        throw lastError || new Error('All camera constraint options failed');
      }

      // Set up video stream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        
        // Wait for video to be ready
        await new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject(new Error('Video element not available'));
            return;
          }
          
          const video = videoRef.current;
          const timeoutId = setTimeout(() => {
            reject(new Error('Video loading timeout'));
          }, 10000);
          
          video.onloadedmetadata = () => {
            clearTimeout(timeoutId);
            console.log('📹 Video metadata loaded, dimensions:', video.videoWidth, 'x', video.videoHeight);
            resolve();
          };
          
          video.onerror = () => {
            clearTimeout(timeoutId);
            reject(new Error('Video loading error'));
          };
        });

        await videoRef.current.play();
      }

      setIsCameraActive(true);
      setCameraStatus('active');
      
      toast({
        title: "Camera Ready",
        description: "Divine vision activated - ready to scan your palm",
      });
      
    } catch (error) {
      console.error('❌ Enhanced camera start error:', error);
      
      const err = error as Error;
      let errorMessage = 'Camera access failed';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = 'Camera permission denied. Please allow camera access and try again.';
        setShowPermissionsHelp(true);
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = 'No camera found on this device.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = 'Camera is being used by another application.';
      } else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
        errorMessage = 'Camera does not meet the required specifications.';
      } else {
        errorMessage = err.message || 'Unknown camera error occurred.';
      }
      
      setCameraError(errorMessage);
      setCameraStatus('error');
      setIsCameraActive(false);
      
      toast({
        title: 'Camera Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  // Enhanced stop camera function
  const stopCamera = () => {
    console.log('🛑 Stopping enhanced camera...');
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log('🔒 Stopping track:', track.kind, track.label);
        track.stop();
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setCameraStatus('inactive');
    setCameraError(null);
    setShowPermissionsHelp(false);
  };

  // Enhanced image upload handler
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload a valid image file (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    console.log('📁 Processing uploaded image:', file.name, 'Size:', file.size, 'Type:', file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      if (!result || !result.startsWith('data:image/')) {
        toast({
          title: "Upload Error",
          description: "Failed to process the uploaded image",
          variant: "destructive"
        });
        return;
      }

      console.log('✅ Image upload successful, data URL length:', result.length);
      
      setCapturedImage(result);
      setUploadedImage(result);
      setPalmReading(null);
      setScanProgress(0);
      setIsScanning(false);
      setIsAnalyzing(false);
      
      toast({
        title: "Image Uploaded Successfully",
        description: "Your palm image is ready for divine analysis",
      });
    };

    reader.onerror = () => {
      console.error('❌ File reader error');
      toast({
        title: "Upload Error",
        description: "Failed to read the uploaded image file",
        variant: "destructive"
      });
    };

    reader.readAsDataURL(file);
  };

  // Enhanced capture image function
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      toast({
        title: 'Camera Not Ready',
        description: 'Please wait for camera to initialize',
        variant: 'destructive',
      });
      return;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) {
      toast({
        title: 'Capture Error',
        description: 'Failed to initialize image capture',
        variant: 'destructive',
      });
      return;
    }

    if (!video.videoWidth || !video.videoHeight) {
      toast({
        title: 'Camera Not Ready',
        description: 'Please wait a moment and try again',
        variant: 'destructive',
      });
      return;
    }
    
    try {
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
    } catch (error) {
      console.error('Capture error:', error);
      toast({
        title: 'Capture Failed',
        description: 'Failed to capture photo. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Enhanced scan function with better image validation
  const startScan = async () => {
    const imageToAnalyze = capturedImage || uploadedImage;
    
    if (!imageToAnalyze) {
      toast({
        title: 'No Image',
        description: 'Please capture or upload an image first',
        variant: 'destructive',
      });
      return;
    }

    if (!imageToAnalyze.startsWith('data:image/')) {
      console.error('❌ Invalid image format:', imageToAnalyze.substring(0, 50));
      toast({
        title: 'Invalid Image Format',
        description: 'Please ensure the image is in a valid format',
        variant: 'destructive',
      });
      return;
    }

    console.log('🔮 Starting palm analysis with image length:', imageToAnalyze.length);
    
    setIsScanning(true);
    setIsAnalyzing(true);
    setScanProgress(0);
    setPalmReading(null);
    setVoiceAvailable(false);
    
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        const newProgress = Math.min(prev + Math.floor(Math.random() * 10) + 1, 90);
        
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
          image: imageToAnalyze,
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

        await prepareVoiceReading(data.analysis);
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

  // New function to prepare voice reading with fallbacks
  const prepareVoiceReading = async (analysis: any) => {
    console.log('🎵 Preparing voice reading...');
    
    try {
      if (generateAndPlay) {
        const voiceText = `Your divine palm reading is complete. ${analysis.overallReading}`;
        console.log('🎵 Generating voice with text:', voiceText.substring(0, 50) + '...');
        
        const success = await generateAndPlay({
          text: voiceText,
          emotion: 'compassionate'
        });
        
        if (success) {
          console.log('✅ Voice generation successful');
          setVoiceAvailable(true);
        } else {
          console.warn('⚠️ Voice generation failed, enabling fallback');
          setVoiceAvailable(true);
        }
      } else {
        console.warn('⚠️ Voice service not available, enabling fallback');
        setVoiceAvailable(true);
      }
    } catch (error) {
      console.error('❌ Voice preparation error:', error);
      setVoiceAvailable(true);
    }
  };

  // Browser speech synthesis fallback
  const playWithBrowserSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      console.log('🔊 Using browser speech synthesis');
      setIsPlayingVoice(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsPlayingVoice(false);
        console.log('🔊 Browser speech ended');
      };
      
      utterance.onerror = () => {
        setIsPlayingVoice(false);
        toast({
          title: "Speech Error",
          description: "Unable to play voice reading",
          variant: "destructive"
        });
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice playback",
        variant: "destructive"
      });
    }
  };

  // Enhanced voice play handler
  const handleVoicePlay = async () => {
    if (!palmReading) return;
    
    console.log('🎵 Voice play requested, audioReady:', audioReady);
    
    if (audioReady && playReadyAudio) {
      try {
        console.log('🎵 Playing generated audio');
        await playReadyAudio();
      } catch (error) {
        console.error('❌ Generated audio playback failed:', error);
        playWithBrowserSpeech(palmReading.overallReading);
      }
    } else {
      console.log('🎵 Using browser speech fallback');
      playWithBrowserSpeech(palmReading.overallReading);
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
    setVoiceAvailable(false);
    setIsPlayingVoice(false);
  };

  // Initialize on component mount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

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
              <span>Enhanced Palm Scanner</span>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={isCameraActive ? "destructive" : "secondary"} 
                size="icon"
                onClick={isCameraActive ? stopCamera : startCamera}
                disabled={cameraStatus === 'starting'}
              >
                {cameraStatus === 'starting' ? (
                  <RotateCw className="animate-spin" size={20} />
                ) : isCameraActive ? (
                  <VideoOff size={20} />
                ) : (
                  <Video size={20} />
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Camera Preview Section */}
            <div className="relative bg-black rounded-xl overflow-hidden border-2 border-indigo-500">
              {cameraError && (
                <div className="absolute top-2 left-2 right-2 z-10 bg-red-900/90 backdrop-blur-sm text-white p-2 rounded-lg text-sm flex items-center">
                  <AlertCircle className="mr-2 flex-shrink-0" size={16} />
                  <span>{cameraError}</span>
                </div>
              )}
              
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
                  {cameraStatus === 'error' ? (
                    <div className="text-center">
                      <p className="text-red-400 mb-2">Camera Error</p>
                      <p className="text-sm text-gray-600 mb-4">{cameraError}</p>
                    </div>
                  ) : cameraStatus === 'starting' ? (
                    <div className="text-center">
                      <p className="text-yellow-400 mb-2">Initializing Camera...</p>
                      <p className="text-sm text-gray-600 mb-4">Please wait</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-4">Camera is disabled</p>
                  )}
                  
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
              
              {isCameraActive && !isScanning && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-4 border-white/80 border-dashed rounded-full w-72 h-72 animate-pulse flex items-center justify-center">
                    <div className="text-white font-bold text-center text-lg">
                      Position your palm here
                      <br />
                      <span className="text-sm opacity-80">Keep steady and well-lit</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    className="flex-1"
                    onClick={captureImage}
                    disabled={!isCameraActive || isScanning}
                  >
                    <Camera className="mr-2" size={18} />
                    Capture Palm Image
                  </Button>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="palm-upload-bottom"
                  />
                  <label
                    htmlFor="palm-upload-bottom"
                    className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md cursor-pointer transition-colors inline-flex items-center"
                  >
                    <Upload size={18} />
                  </label>
                </div>
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
                          Authentic Palm Reading
                        </h3>
                        
                        {voiceAvailable && (
                          <Button
                            onClick={handleVoicePlay}
                            disabled={isPlayingVoice || isGenerating}
                            className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg"
                          >
                            {isPlayingVoice ? (
                              <>
                                <Volume2 className="animate-pulse" size={16} />
                                Playing...
                              </>
                            ) : isGenerating ? (
                              <>
                                <RotateCw className="animate-spin" size={16} />
                                Preparing...
                              </>
                            ) : (
                              <>
                                <Play size={16} />
                                Play Voice
                              </>
                            )}
                          </Button>
                        )}
                      </div>

                      {/* Elemental Type Display */}
                      {palmReading.elementalType && (
                        <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 rounded-lg p-3 border border-purple-500">
                          <h4 className="font-semibold text-purple-200 mb-1 capitalize">
                            🌟 {palmReading.elementalType} Elemental Soul
                          </h4>
                          <p className="text-xs text-purple-300">
                            Your elemental nature guides your spiritual expression and divine gifts
                          </p>
                        </div>
                      )}
                      
                      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                        {/* Life Line */}
                        <div className="bg-white/70 rounded-lg p-3 text-gray-800">
                          <h4 className="font-semibold text-purple-700 mb-1">💖 {palmReading.majorLines?.lifeLine?.name || palmReading.lifeLineReading?.name}</h4>
                          <p className="text-sm mb-1">{palmReading.majorLines?.lifeLine?.traditionalMeaning || palmReading.lifeLineReading?.reading}</p>
                          <p className="text-xs text-purple-600 italic">{palmReading.majorLines?.lifeLine?.spiritualInsight || palmReading.lifeLineReading?.spiritualInsight}</p>
                          {palmReading.majorLines?.lifeLine?.culturalSource && (
                            <p className="text-xs text-gray-600 mt-1">Source: {palmReading.majorLines.lifeLine.culturalSource}</p>
                          )}
                        </div>
                        
                        {/* Heart Line */}
                        <div className="bg-white/70 rounded-lg p-3 text-gray-800">
                          <h4 className="font-semibold text-purple-700 mb-1">❤️ {palmReading.majorLines?.heartLine?.name || palmReading.heartLineReading?.name}</h4>
                          <p className="text-sm mb-1">{palmReading.majorLines?.heartLine?.traditionalMeaning || palmReading.heartLineReading?.reading}</p>
                          <p className="text-xs text-purple-600 italic">{palmReading.majorLines?.heartLine?.spiritualInsight || palmReading.heartLineReading?.spiritualInsight}</p>
                          {palmReading.majorLines?.heartLine?.culturalSource && (
                            <p className="text-xs text-gray-600 mt-1">Source: {palmReading.majorLines.heartLine.culturalSource}</p>
                          )}
                        </div>

                        {/* Traditional Interpretation */}
                        {palmReading.traditionalInterpretation && (
                          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-3 border border-amber-300 text-gray-800">
                            <h4 className="font-semibold text-amber-700 mb-2">📜 Traditional Wisdom</h4>
                            <p className="text-sm mb-2">{palmReading.traditionalInterpretation.synthesis}</p>
                            <details className="text-xs">
                              <summary className="cursor-pointer text-amber-600 hover:text-amber-800">View Ancient Traditions</summary>
                              <div className="mt-2 space-y-1">
                                <p><strong>Vedic:</strong> {palmReading.traditionalInterpretation.ayurvedicReading}</p>
                                <p><strong>Chinese:</strong> {palmReading.traditionalInterpretation.chineseReading}</p>
                                <p><strong>Western:</strong> {palmReading.traditionalInterpretation.westernReading}</p>
                              </div>
                            </details>
                          </div>
                        )}

                        {/* Spiritual Guidance */}
                        {palmReading.spiritualGuidance && (
                          <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-3 border border-green-300 text-gray-800">
                            <h4 className="font-semibold text-green-700 mb-2">🌟 Spiritual Guidance</h4>
                            {palmReading.spiritualGifts && (
                              <p className="text-sm mb-2"><strong>Divine Gift:</strong> {palmReading.spiritualGifts}</p>
                            )}
                            {palmReading.spiritualGuidance.spiritualGifts?.[0] && (
                              <p className="text-sm mb-2"><strong>Sacred Ability:</strong> {palmReading.spiritualGuidance.spiritualGifts[0]}</p>
                            )}
                            {palmReading.spiritualGuidance.elementalPractices?.[0] && (
                              <p className="text-xs text-green-600"><strong>Elemental Practice:</strong> {palmReading.spiritualGuidance.elementalPractices[0]}</p>
                            )}
                          </div>
                        )}
                        
                        {/* Overall Reading */}
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 border border-purple-300 text-gray-800">
                          <h4 className="font-semibold text-purple-700 mb-1">🔮 Overall Sacred Reading</h4>
                          <p className="text-sm font-medium">{palmReading.overallReading}</p>
                        </div>
                      </div>
                      
                      <div className="text-center text-sm text-gray-300 mb-3">
                        <p>Confidence: {palmReading.confidenceScore}% | Quality: {palmReading.imageQuality}</p>
                        {palmReading.culturalContext && (
                          <p className="text-xs text-gray-400 mt-1">{palmReading.culturalContext}</p>
                        )}
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
          
          {/* Enhanced Permissions Help */}
          {showPermissionsHelp && (
            <div className="mt-6 bg-yellow-900/40 rounded-xl p-4 border border-yellow-700">
              <h3 className="text-lg font-semibold mb-3 text-yellow-200 flex items-center">
                <AlertCircle className="mr-2" size={20} />
                Camera Permissions Help
              </h3>
              <div className="text-yellow-100 space-y-2">
                <p>If the camera isn't working, please try these steps:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Click the camera icon in your browser's address bar and allow camera access</li>
                  <li>Refresh the page and try again</li>
                  <li>Make sure no other applications are using your camera</li>
                  <li>Try using a different browser (Chrome, Firefox, Safari)</li>
                  <li>As an alternative, you can upload a photo of your palm using the "Upload" button</li>
                </ul>
              </div>
            </div>
          )}
          
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
        <p className="mt-2">📱 Enhanced camera technology for improved palm reading accuracy</p>
      </div>
    </div>
  );
};
