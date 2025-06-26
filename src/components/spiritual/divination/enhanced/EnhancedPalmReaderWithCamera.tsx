import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useVoiceService } from '@/hooks/useVoiceService';
import { Camera, RotateCw, Scan, Hand, Upload, ZoomIn, ZoomOut, Move, X } from 'lucide-react';

interface PalmAnalysis {
  lifeLineReading: {
    length: string;
    meaning: string;
    insights: string;
  };
  heartLineReading: {
    shape: string;
    meaning: string;
    insights: string;
  };
  headLineReading: {
    clarity: string;
    meaning: string;
    insights: string;
  };
  fateLineReading: {
    presence: string;
    meaning: string;
    insights: string;
  };
  spiritualGifts: string;
  challenges: string;
  guidance: string;
  overallReading: string;
}

export const EnhancedPalmReaderWithCamera: React.FC = () => {
  const [palmImage, setPalmImage] = useState<string | null>(null);
  const [palmReading, setPalmReading] = useState<PalmAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [cameraStatus, setCameraStatus] = useState<'inactive' | 'starting' | 'active' | 'error'>('inactive');
  const [showGuidance, setShowGuidance] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [palmDetected, setPalmDetected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const { generateAndPlay } = useVoiceService();

  const initCamera = async () => {
    try {
      console.log('🎥 Starting enhanced camera initialization...');
      setCameraStatus('starting');
      
      // Stop any existing stream first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          console.log('🛑 Stopping existing track:', track.kind, track.label);
          track.stop();
        });
        streamRef.current = null;
      }
      
      // Try multiple constraint configurations for better compatibility
      const constraints = [
        {
          video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
            facingMode: 'environment'
          }
        },
        {
          video: {
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 },
            facingMode: 'environment'
          }
        },
        {
          video: {
            facingMode: 'environment'
          }
        },
        {
          video: true
        }
      ];

      let stream = null;
      let lastError = null;

      for (let i = 0; i < constraints.length; i++) {
        try {
          console.log(`📹 Trying constraint option ${i + 1}:`, constraints[i]);
          stream = await navigator.mediaDevices.getUserMedia(constraints[i]);
          console.log('✅ Camera stream acquired successfully');
          break;
        } catch (err) {
          console.log(`❌ Constraint option ${i + 1} failed:`, err);
          lastError = err;
          continue;
        }
      }

      if (!stream) {
        throw lastError || new Error('No camera constraints worked');
      }
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for metadata to load
        await new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject(new Error('Video element not available'));
            return;
          }

          const handleLoadedMetadata = () => {
            console.log('📹 Video metadata loaded, dimensions:', 
              videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight);
            resolve();
          };

          const handleError = (e: Event) => {
            console.error('Video loading error:', e);
            reject(new Error('Video failed to load'));
          };

          videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
          videoRef.current.addEventListener('error', handleError, { once: true });

          // Cleanup function
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
              videoRef.current.removeEventListener('error', handleError);
            }
          }, 10000);
        });
        
        // Start playing the video
        try {
          await videoRef.current.play();
          console.log('📹 Video playback started');
        } catch (playError) {
          console.error('Video play error:', playError);
          // Try to play again after a short delay
          setTimeout(async () => {
            try {
              if (videoRef.current) {
                await videoRef.current.play();
                console.log('📹 Video playback started (retry)');
              }
            } catch (retryError) {
              console.error('Video play retry failed:', retryError);
            }
          }, 500);
        }
        
        setCameraStatus('active');
        
        toast({
          title: "Camera Ready",
          description: "Position your palm in the guide for optimal capture",
        });
      }
    } catch (err) {
      console.error("Camera initialization error:", err);
      setCameraStatus('error');
      
      // Cleanup on error
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      toast({
        title: "Camera Access Required",
        description: "Please enable camera permissions to scan your palm.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    console.log('🛑 Stopping enhanced camera...');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        console.log('🛑 Stopping track:', track.kind, track.label);
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraStatus('inactive');
  };

  const cropPalmImage = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, video: HTMLVideoElement): string => {
    const cropWidth = video.videoWidth * 0.6;
    const cropHeight = video.videoHeight * 0.6;
    const cropX = (video.videoWidth - cropWidth) / 2;
    const cropY = (video.videoHeight - cropHeight) / 2;
    
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    
    ctx.drawImage(
      video,
      cropX, cropY, cropWidth, cropHeight,
      0, 0, cropWidth, cropHeight
    );
    
    return canvas.toDataURL('image/jpeg', 0.9);
  };

  const handleIntegratedScan = async () => {
    if (cameraStatus === 'inactive') {
      // Start camera first
      await initCamera();
      return;
    }
    
    if (cameraStatus === 'active') {
      // Scan palm
      await startPalmScan();
    }
  };

  const startPalmScan = async () => {
    if (cameraStatus !== 'active') {
      toast({
        title: "Camera Not Ready",
        description: "Please wait for camera to initialize",
        variant: "destructive"
      });
      return;
    }
    
    if (!videoRef.current || !videoRef.current.videoWidth) {
      toast({
        title: "Video Not Ready",
        description: "Please wait for video to load completely",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    setScanProgress(0);
    setPalmReading(null);
    setShowGuidance(false);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx && videoRef.current) {
        const croppedImageData = cropPalmImage(canvas, ctx, videoRef.current);
        setPalmImage(croppedImageData);
        console.log('📸 Palm image captured and cropped');
      }
      
      await simulatePalmAnalysis();
    } catch (error) {
      console.error('Error during palm scan:', error);
      setIsAnalyzing(false);
      toast({
        title: "Scan Error",
        description: "Failed to capture palm image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            const cropWidth = img.width * 0.7;
            const cropHeight = img.height * 0.7;
            const cropX = (img.width - cropWidth) / 2;
            const cropY = (img.height - cropHeight) / 2;
            
            canvas.width = cropWidth;
            canvas.height = cropHeight;
            
            ctx.drawImage(
              img,
              cropX, cropY, cropWidth, cropHeight,
              0, 0, cropWidth, cropHeight
            );
            
            const croppedImageData = canvas.toDataURL('image/jpeg', 0.9);
            setPalmImage(croppedImageData);
          }
        };
        img.src = imageData;
      };
      reader.readAsDataURL(file);
      
      // Stop camera if active
      if (cameraStatus === 'active') {
        stopCamera();
      }
      
      setIsAnalyzing(true);
      setScanProgress(0);
      setPalmReading(null);
      setShowGuidance(false);
      simulatePalmAnalysis();
    }
  };

  const adjustZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? Math.min(prev + 0.2, 3) : Math.max(prev - 0.2, 1);
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${newZoom})`;
      }
      return newZoom;
    });
  };

  const simulatePalmAnalysis = async () => {
    const steps = [
      { progress: 10, delay: 300 },
      { progress: 25, delay: 500 },
      { progress: 40, delay: 400 },
      { progress: 60, delay: 600 },
      { progress: 80, delay: 500 },
      { progress: 95, delay: 400 },
      { progress: 100, delay: 300 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setScanProgress(step.progress);
    }

    generatePalmReading();
  };

  const generatePalmReading = () => {
    const analysis: PalmAnalysis = {
      lifeLineReading: {
        length: generateLifeLineReading(),
        meaning: "Your life line reveals the strength of your spiritual journey and divine life force.",
        insights: "This line indicates your connection to divine energy and ability to overcome challenges through spiritual strength."
      },
      heartLineReading: {
        shape: generateHeartLineReading(),
        meaning: "Your heart line shows your capacity for divine love and spiritual connection with others.",
        insights: "This reveals how divine love flows through you and your ability to form sacred spiritual bonds."
      },
      headLineReading: {
        clarity: generateHeadLineReading(),
        meaning: "Your head line indicates divine wisdom and spiritual discernment abilities.",
        insights: "This shows your capacity for spiritual understanding and receiving divine guidance."
      },
      fateLineReading: {
        presence: generateFateLineReading(),
        meaning: "Your fate line reveals your spiritual destiny and divine purpose in this lifetime.",
        insights: "This indicates the sacred work you are meant to accomplish and your connection to divine will."
      },
      spiritualGifts: generateSpiritualGifts(),
      challenges: generateSpiritualChallenges(),
      guidance: generateSpiritualGuidance(),
      overallReading: "Your palm reveals a soul with significant spiritual potential. You are called to be a light in this world, helping others find their way to divine truth and healing."
    };

    setPalmReading(analysis);
    setIsAnalyzing(false);
    setShowGuidance(true);
    
    toast({
      title: "Divine Reading Complete",
      description: "Your palm analysis reveals sacred insights",
    });

    generateAndPlay({
      text: `Your divine palm reading is complete. I see profound spiritual gifts and divine purpose in your lines. Your life line reveals ${analysis.lifeLineReading.length}.`,
      emotion: 'compassionate'
    });
  };

  const generateLifeLineReading = () => {
    const readings = [
      "Long and deeply etched - indicating strong divine life force and spiritual resilience",
      "Clear and unbroken - showing steady spiritual growth and divine protection",
      "Curved and vibrant - revealing enthusiasm for spiritual exploration and divine connection",
      "Strong with minor branches - indicating multiple spiritual awakenings and divine encounters"
    ];
    return readings[Math.floor(Math.random() * readings.length)];
  };

  const generateHeartLineReading = () => {
    const readings = [
      "Curved upward toward fingers - showing deep capacity for divine love and compassion",
      "Clear and unbroken - indicating emotional balance and spiritual wisdom from above",
      "Reaching toward Jupiter finger - revealing leadership in spiritual matters and divine calling",
      "Multiple branches - showing ability to love and heal many souls through divine grace"
    ];
    return readings[Math.floor(Math.random() * readings.length)];
  };

  const generateHeadLineReading = () => {
    const readings = [
      "Straight and clear - indicating logical approach balanced with divine wisdom",
      "Slightly curved - showing perfect balance between divine intuition and spiritual reason",
      "Deep and well-defined - revealing strong connection to divine wisdom and spiritual truth",
      "Extending across palm - indicating broad spiritual understanding and divine knowledge"
    ];
    return readings[Math.floor(Math.random() * readings.length)];
  };

  const generateFateLineReading = () => {
    const readings = [
      "Strong and straight - indicating clear divine destiny and spiritual purpose",
      "Starting from life line - showing self-determined spiritual path guided by divine will",
      "Multiple lines - revealing various divine callings and spiritual missions",
      "Deep and unbroken - indicating strong divine guidance throughout your spiritual journey"
    ];
    return readings[Math.floor(Math.random() * readings.length)];
  };

  const generateSpiritualGifts = () => {
    const gifts = [
      "Healing abilities - You have natural capacity to channel divine healing energy through your hands",
      "Intuitive wisdom - You receive clear guidance from higher spiritual realms and divine sources",
      "Protective presence - You naturally shield others from negative energies and spiritual attacks",
      "Teaching gift - You are meant to share spiritual wisdom and guide others on their sacred journey",
      "Prophetic insight - You can perceive future spiritual events and receive divine revelations"
    ];
    return gifts[Math.floor(Math.random() * gifts.length)];
  };

  const generateSpiritualChallenges = () => {
    const challenges = [
      "Learning to trust your spiritual intuition over worldly logic and material concerns",
      "Balancing spiritual service with personal needs and maintaining healthy boundaries",
      "Overcoming past spiritual wounds, religious trauma, or negative spiritual experiences",
      "Developing discernment between true divine guidance and false spiritual influences"
    ];
    return challenges[Math.floor(Math.random() * challenges.length)];
  };

  const generateSpiritualGuidance = () => {
    const guidance = [
      "Spend time in daily meditation and prayer to strengthen your connection to divine guidance",
      "Practice acts of service and compassion to activate your spiritual gifts and divine purpose",
      "Seek out spiritual community and mentors who can support and encourage your spiritual growth",
      "Trust the spiritual experiences and divine insights you receive - they are real and valid"
    ];
    return guidance[Math.floor(Math.random() * guidance.length)];
  };

  const getMainButtonContent = () => {
    if (isAnalyzing) {
      return (
        <span className="flex items-center justify-center">
          <RotateCw className="animate-spin mr-2" size={20} />
          Analyzing Palm ({scanProgress}%)
        </span>
      );
    }

    if (cameraStatus === 'starting') {
      return (
        <span className="flex items-center justify-center">
          <RotateCw className="animate-spin mr-2" size={20} />
          Starting Camera...
        </span>
      );
    }

    if (cameraStatus === 'active') {
      return (
        <span className="flex items-center justify-center">
          <Scan className="mr-2" size={20} />
          📱 Scan My Palm
        </span>
      );
    }

    return (
      <span className="flex items-center justify-center">
        <Camera className="mr-2" size={20} />
        🔮 Start Palm Reading
      </span>
    );
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 Component unmounting, cleaning up camera...');
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <Hand className="text-purple-600" size={40} />
          Sacred Palm Analysis Pro
        </h1>
        <p className="text-purple-200 text-lg">
          Advanced camera palm reading with enhanced spiritual AI analysis
        </p>
      </div>
      
      <Card className="overflow-hidden border-2 border-purple-300/50 shadow-2xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Scan size={28} />
            Sacred Palm Analysis Pro
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Camera Section */}
            <div className="space-y-6">
              <div className="aspect-square bg-gradient-to-br from-purple-100/20 to-indigo-100/20 rounded-2xl border-2 border-dashed border-purple-400/50 relative overflow-hidden">
                {cameraStatus === 'active' ? (
                  <>
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-300"
                      style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
                    />
                    
                    {/* Palm Positioning Guide Overlay */}
                    {!isAnalyzing && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative">
                          <div className="border-4 border-white/90 rounded-xl w-64 h-80 animate-pulse flex items-center justify-center bg-white/10 backdrop-blur-sm">
                            <div className="text-white font-bold text-center text-lg">
                              <Hand size={48} className="mx-auto mb-2 animate-pulse" />
                              Place your palm here
                              <br />
                              <span className="text-sm opacity-90">Keep fingers together</span>
                            </div>
                          </div>
                          
                          {/* Corner guides */}
                          <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-yellow-400"></div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-yellow-400"></div>
                          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-yellow-400"></div>
                          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-yellow-400"></div>
                          
                          {/* Distance guide */}
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/70 px-3 py-1 rounded-full">
                            📏 6-8 inches from camera
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Zoom Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button
                        onClick={() => adjustZoom('in')}
                        disabled={zoomLevel >= 3}
                        className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full"
                        size="sm"
                      >
                        <ZoomIn size={16} />
                      </Button>
                      <Button
                        onClick={() => adjustZoom('out')}
                        disabled={zoomLevel <= 1}
                        className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full"
                        size="sm"
                      >
                        <ZoomOut size={16} />
                      </Button>
                      <div className="bg-black/70 text-white px-2 py-1 rounded text-xs text-center">
                        {Math.round(zoomLevel * 100)}%
                      </div>
                    </div>

                    {/* Close Camera */}
                    <div className="absolute top-4 left-4">
                      <Button
                        onClick={stopCamera}
                        className="bg-red-600/80 hover:bg-red-700 text-white p-2 rounded-full"
                        size="sm"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="bg-purple-200/30 rounded-full p-6 mb-6">
                      {cameraStatus === 'error' ? (
                        <Camera size={64} className="text-red-400" />
                      ) : cameraStatus === 'starting' ? (
                        <RotateCw size={64} className="text-purple-400 animate-spin" />
                      ) : (
                        <Camera size={64} className="text-purple-400" />
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-purple-200">
                      {cameraStatus === 'error' 
                        ? 'Camera Access Required' 
                        : cameraStatus === 'starting'
                        ? 'Initializing Camera...'
                        : 'Ready for Palm Reading'}
                    </h3>
                    
                    <p className="text-purple-300 mb-6 text-lg">
                      {cameraStatus === 'error'
                        ? 'Please enable camera permissions for palm scanning'
                        : cameraStatus === 'starting'
                        ? 'Please wait while we prepare your camera'
                        : 'Use camera or upload an image to begin your spiritual palm analysis'}
                    </p>
                  </div>
                )}
                
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="animate-pulse mb-6">
                      <Scan size={64} className="text-purple-400 mx-auto" />
                    </div>
                    <div className="w-full max-w-sm mx-auto">
                      <Progress value={scanProgress} className="bg-white/20 h-4 mb-4" />
                      <p className="text-white text-center text-lg font-semibold">
                        🔮 Advanced palm analysis... {scanProgress}%
                      </p>
                      <p className="text-purple-300 text-center text-sm mt-2">
                        AI spiritual analysis in progress...
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Integrated Main Button */}
              <div className="space-y-4">
                <Button
                  onClick={handleIntegratedScan}
                  disabled={isAnalyzing || cameraStatus === 'starting'}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-xl font-bold shadow-lg"
                  size="lg"
                >
                  {getMainButtonContent()}
                </Button>
                
                {/* Upload Alternative */}
                <div className="text-center">
                  <p className="text-purple-300 text-sm mb-2">Or upload an existing palm image</p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAnalyzing}
                    variant="outline"
                    className="border-2 border-purple-400 text-purple-300 hover:bg-purple-600/20 px-6 py-3"
                  >
                    <Upload className="mr-2" size={18} />
                    📁 Upload Palm Image
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
              
              {/* Enhanced Positioning Tips */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-4 border border-blue-400/30">
                <h4 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
                  <Move size={16} />
                  📋 Optimal Palm Positioning
                </h4>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Hold palm 6-8 inches from camera</li>
                  <li>• Keep fingers together and straight</li>
                  <li>• Ensure good lighting (avoid shadows)</li>
                  <li>• Position palm flat and stable</li>
                  <li>• Use zoom controls for better focus</li>
                </ul>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="space-y-6">
              {palmImage && (
                <div className="text-center mb-4">
                  <img src={palmImage} alt="Cropped Palm" className="max-w-full max-h-48 rounded-lg mx-auto shadow-lg border-2 border-purple-300" />
                  <p className="text-purple-300 text-sm mt-2">✂️ Auto-cropped for palm focus</p>
                </div>
              )}
              
              {palmReading ? (
                <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-6 border border-purple-300/30">
                  <h3 className="font-bold text-2xl text-purple-200 mb-6 flex items-center gap-2">
                    <Scan size={24} />
                    ✨ Your Enhanced Palm Reading
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-lg text-purple-300 mb-2">💖 Life Line - Divine Vitality</h4>
                      <p className="text-purple-100"><strong>Observation:</strong> {palmReading.lifeLineReading.length}</p>
                      <p className="text-purple-200 text-sm mt-1"><strong>Meaning:</strong> {palmReading.lifeLineReading.meaning}</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-lg text-purple-300 mb-2">❤️ Heart Line - Divine Love</h4>
                      <p className="text-purple-100"><strong>Observation:</strong> {palmReading.heartLineReading.shape}</p>
                      <p className="text-purple-200 text-sm mt-1"><strong>Meaning:</strong> {palmReading.heartLineReading.meaning}</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-lg text-purple-300 mb-2">🧠 Head Line - Divine Wisdom</h4>
                      <p className="text-purple-100"><strong>Observation:</strong> {palmReading.headLineReading.clarity}</p>
                      <p className="text-purple-200 text-sm mt-1"><strong>Meaning:</strong> {palmReading.headLineReading.meaning}</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-lg text-purple-300 mb-2">🌟 Fate Line - Divine Purpose</h4>
                      <p className="text-purple-100"><strong>Observation:</strong> {palmReading.fateLineReading.presence}</p>
                      <p className="text-purple-200 text-sm mt-1"><strong>Meaning:</strong> {palmReading.fateLineReading.meaning}</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-4 border border-green-400/30">
                      <h4 className="font-semibold text-lg text-green-200 mb-2">✨ Spiritual Gifts</h4>
                      <p className="text-green-100">{palmReading.spiritualGifts}</p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-4 border border-orange-400/30">
                      <h4 className="font-semibold text-lg text-orange-200 mb-2">⚡ Growth Areas</h4>
                      <p className="text-orange-100">{palmReading.challenges}</p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-4 border border-blue-400/30">
                      <h4 className="font-semibold text-lg text-blue-200 mb-2">🙏 Divine Guidance</h4>
                      <p className="text-blue-100">{palmReading.guidance}</p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-400/30">
                      <h4 className="font-semibold text-lg text-yellow-200 mb-2">🔮 Overall Reading</h4>
                      <p className="text-yellow-100">{palmReading.overallReading}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-2xl p-8 text-center border border-purple-300/30">
                  <div className="text-7xl mb-6">👋</div>
                  <h3 className="font-bold text-2xl text-purple-200 mb-4">
                    Sacred Palm Reading Ready
                  </h3>
                  <p className="text-purple-300 text-lg leading-relaxed">
                    Click the main button to start your camera or upload an image for an advanced spiritual analysis of your life path.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-sm text-purple-400 space-y-2">
        <p>✨ Ancient palmistry wisdom enhanced with modern spiritual AI technology</p>
        <p>📱 Integrated camera and upload system for optimal palm capture and analysis</p>
        <p>🔮 Your divine path awaits discovery through the sacred art of palm reading</p>
      </div>
    </div>
  );
};
