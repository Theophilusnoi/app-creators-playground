import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useVoiceService } from '@/hooks/useVoiceService';
import { Camera, RotateCw, Scan, Hand, Upload, ZoomIn, ZoomOut, Move, X, AlertCircle, Wifi, WifiOff, Play } from 'lucide-react';

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
  const [initializationTimeout, setInitializationTimeout] = useState<NodeJS.Timeout | null>(null);
  const [cameraRetryCount, setCameraRetryCount] = useState(0);
  const [lastError, setLastError] = useState<string>('');
  const [deviceSupport, setDeviceSupport] = useState<{
    hasCamera: boolean;
    hasPermission: boolean | null;
    isSecureContext: boolean;
  }>({
    hasCamera: false,
    hasPermission: null,
    isSecureContext: false
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const { generateAndPlay } = useVoiceService();

  // Check device capabilities on mount
  useEffect(() => {
    const checkDeviceSupport = async () => {
      const isSecureContext = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
      const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      
      console.log('🔍 Device Support Check:', {
        isSecureContext,
        hasMediaDevices,
        userAgent: navigator.userAgent,
        protocol: window.location.protocol
      });

      let hasCamera = false;
      if (hasMediaDevices) {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          hasCamera = devices.some(device => device.kind === 'videoinput');
          console.log('📱 Available video devices:', devices.filter(d => d.kind === 'videoinput').length);
        } catch (err) {
          console.warn('⚠️ Could not enumerate devices:', err);
        }
      }

      setDeviceSupport({
        hasCamera,
        hasPermission: null,
        isSecureContext
      });
    };

    checkDeviceSupport();
  }, []);

  const initCamera = async () => {
    try {
      console.log('🎥 Advanced camera initialization starting...', {
        retryCount: cameraRetryCount,
        deviceSupport
      });
      
      setCameraStatus('starting');
      setLastError('');
      
      // Clear any existing timeout
      if (initializationTimeout) {
        clearTimeout(initializationTimeout);
        setInitializationTimeout(null);
      }
      
      // Set timeout with progressive increase based on retry count
      const timeoutDuration = Math.min(15000 + (cameraRetryCount * 5000), 30000);
      const timeoutId = setTimeout(() => {
        console.log('⏰ Advanced camera initialization timeout reached after', timeoutDuration, 'ms');
        setCameraStatus('error');
        setLastError('Camera initialization timeout');
        toast({
          title: "Camera Timeout",
          description: `Camera took too long to initialize (${timeoutDuration/1000}s). This might be a device compatibility issue.`,
          variant: "destructive"
        });
      }, timeoutDuration);
      
      setInitializationTimeout(timeoutId);
      
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          console.log('🛑 Stopping existing track:', track.kind, track.label);
          track.stop();
        });
        streamRef.current = null;
      }
      
      // Enhanced device support checks
      if (!deviceSupport.isSecureContext) {
        throw new Error('Camera requires HTTPS or localhost environment');
      }
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported on this device');
      }
      
      if (!deviceSupport.hasCamera) {
        throw new Error('No camera detected on this device');
      }
      
      // Progressive constraint options with more fallbacks
      const constraintOptions = [
        // Ultra high quality (only on retry 0)
        ...(cameraRetryCount === 0 ? [{
          video: {
            width: { ideal: 1920, max: 1920 },
            height: { ideal: 1080, max: 1080 },
            facingMode: { ideal: 'environment' },
            frameRate: { ideal: 30 }
          }
        }] : []),
        
        // High quality with rear camera
        {
          video: {
            width: { ideal: 1280, max: 1280 },
            height: { ideal: 720, max: 720 },
            facingMode: { ideal: 'environment' },
            frameRate: { ideal: 24 }
          }
        },
        
        // Medium quality with rear camera
        {
          video: {
            width: { ideal: 640, max: 640 },
            height: { ideal: 480, max: 480 },
            facingMode: { ideal: 'environment' }
          }
        },
        
        // Any rear camera (no resolution constraints)
        {
          video: {
            facingMode: { ideal: 'environment' }
          }
        },
        
        // Front camera high quality
        {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: { ideal: 'user' }
          }
        },
        
        // Front camera medium quality
        {
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: { ideal: 'user' }
          }
        },
        
        // Basic front camera
        {
          video: {
            facingMode: { ideal: 'user' }
          }
        },
        
        // Absolute fallback - any camera
        {
          video: true
        }
      ];

      let stream = null;
      let constraintError = null;

      for (let i = 0; i < constraintOptions.length; i++) {
        try {
          console.log(`📹 Trying advanced constraint option ${i + 1}/${constraintOptions.length}:`, constraintOptions[i]);
          
          // Add a small delay between attempts to avoid overwhelming the system
          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          
          stream = await navigator.mediaDevices.getUserMedia(constraintOptions[i]);
          console.log('✅ Camera stream acquired successfully with option', i + 1);
          
          // Verify stream is actually working
          if (stream.getTracks().length === 0) {
            throw new Error('Stream has no tracks');
          }
          
          const videoTrack = stream.getVideoTracks()[0];
          if (!videoTrack || videoTrack.readyState !== 'live') {
            throw new Error('Video track not ready');
          }
          
          console.log('📹 Video track details:', {
            label: videoTrack.label,
            readyState: videoTrack.readyState,
            settings: videoTrack.getSettings()
          });
          
          break;
        } catch (err) {
          console.log(`❌ Advanced constraint option ${i + 1} failed:`, err);
          constraintError = err;
          
          // Clean up failed stream
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
          }
          
          // If permission denied, don't try other options
          if (err instanceof Error && err.name === 'NotAllowedError') {
            setDeviceSupport(prev => ({ ...prev, hasPermission: false }));
            throw err;
          }
          
          // If overconstrained, try simpler constraints
          if (err instanceof Error && err.name === 'OverconstrainedError') {
            console.log('📹 Constraint too restrictive, trying simpler options...');
            continue;
          }
          
          continue;
        }
      }

      if (!stream) {
        throw constraintError || new Error('All camera constraint options failed');
      }
      
      setDeviceSupport(prev => ({ ...prev, hasPermission: true }));
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Enhanced video ready promise with better error handling
        const videoReady = new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject(new Error('Video element not available'));
            return;
          }

          const video = videoRef.current;
          let resolved = false;
          
          const handleSuccess = () => {
            if (resolved) return;
            resolved = true;
            
            console.log('📹 Video ready, dimensions:', 
              video.videoWidth, 'x', video.videoHeight);
            
            if (video.videoWidth === 0 || video.videoHeight === 0) {
              reject(new Error('Invalid video dimensions'));
              return;
            }
            
            resolve();
          };

          const handleError = (e: Event) => {
            if (resolved) return;
            resolved = true;
            console.error('📹 Video error:', e);
            reject(new Error('Video failed to load'));
          };

          // Multiple event listeners for better compatibility
          video.addEventListener('loadedmetadata', handleSuccess, { once: true });
          video.addEventListener('loadeddata', handleSuccess, { once: true });
          video.addEventListener('canplay', handleSuccess, { once: true });
          video.addEventListener('error', handleError, { once: true });
          
          // Cleanup timeout
          setTimeout(() => {
            if (!resolved) {
              resolved = true;
              video.removeEventListener('loadedmetadata', handleSuccess);
              video.removeEventListener('loadeddata', handleSuccess);
              video.removeEventListener('canplay', handleSuccess);
              video.removeEventListener('error', handleError);
              reject(new Error('Video metadata load timeout'));
            }
          }, 10000);
        });
        
        // Wait for video to be ready
        await videoReady;
        
        // Enhanced video play with multiple attempts
        const playVideo = async (attempts = 3) => {
          for (let i = 0; i < attempts; i++) {
            try {
              if (videoRef.current) {
                await videoRef.current.play();
                console.log('📹 Video playback started successfully');
                return;
              }
            } catch (playError) {
              console.warn(`📹 Video play attempt ${i + 1} failed:`, playError);
              if (i === attempts - 1) {
                console.warn('📹 All video play attempts failed, but stream should still work for capture');
              } else {
                await new Promise(resolve => setTimeout(resolve, 1000));
              }
            }
          }
        };
        
        await playVideo();
        
        // Success cleanup
        if (initializationTimeout) {
          clearTimeout(initializationTimeout);
          setInitializationTimeout(null);
        }
        
        setCameraStatus('active');
        setCameraRetryCount(0); // Reset retry count on success
        
        toast({
          title: "📸 Camera Ready!",
          description: "Advanced camera initialization successful. Position your palm for optimal capture.",
        });
      }
    } catch (err) {
      console.error("🚨 Advanced camera initialization error:", err);
      
      // Enhanced error handling
      if (initializationTimeout) {
        clearTimeout(initializationTimeout);
        setInitializationTimeout(null);
      }
      
      setCameraStatus('error');
      setCameraRetryCount(prev => prev + 1);
      
      // Cleanup on error
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      let errorMessage = "Camera initialization failed. Please try again or use upload.";
      let errorTitle = "Camera Error";
      
      if (err instanceof Error) {
        setLastError(err.message);
        
        if (err.name === 'NotAllowedError') {
          errorTitle = "Camera Permission Denied";
          errorMessage = "Please allow camera access in your browser settings and reload the page.";
        } else if (err.name === 'NotFoundError') {
          errorTitle = "No Camera Found";
          errorMessage = "No camera detected. Please connect a camera or use the upload option.";
        } else if (err.name === 'NotSupportedError') {
          errorTitle = "Camera Not Supported";
          errorMessage = "Camera not supported on this device. Please use the upload option.";
        } else if (err.message.includes('timeout')) {
          errorTitle = "Camera Timeout";
          errorMessage = `Camera initialization timed out (attempt ${cameraRetryCount + 1}). This may be a device compatibility issue.`;
        } else if (err.message.includes('HTTPS') || err.message.includes('localhost')) {
          errorTitle = "Secure Connection Required";
          errorMessage = "Camera requires HTTPS or localhost. Please use a secure connection.";
        } else if (err.name === 'OverconstrainedError') {
          errorTitle = "Camera Constraints Error";
          errorMessage = "Camera quality requirements too high for this device. Trying lower quality...";
        }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    console.log('🛑 Stopping advanced camera...');
    
    if (initializationTimeout) {
      clearTimeout(initializationTimeout);
      setInitializationTimeout(null);
    }
    
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
    setZoomLevel(1);
    setLastError('');
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
      await initCamera();
      return;
    }
    
    if (cameraStatus === 'active') {
      // Scan palm
      await startPalmScan();
    }
    
    if (cameraStatus === 'error') {
      // Retry camera initialization
      await initCamera();
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
          Starting Camera... {cameraRetryCount > 0 && `(Attempt ${cameraRetryCount + 1})`}
        </span>
      );
    }

    if (cameraStatus === 'active') {
      return (
        <span className="flex items-center justify-center">
          <Scan className="mr-2" size={20} />
          📱 Capture Palm Reading
        </span>
      );
    }

    if (cameraStatus === 'error') {
      return (
        <span className="flex items-center justify-center">
          <AlertCircle className="mr-2" size={20} />
          🔄 Retry Camera {cameraRetryCount > 0 && `(${cameraRetryCount + 1})`}
        </span>
      );
    }

    return (
      <span className="flex items-center justify-center">
        <Camera className="mr-2" size={20} />
        🎥 Start Camera
      </span>
    );
  };

  const handleMainButtonClick = async () => {
    console.log('🎯 Main button clicked, current status:', cameraStatus);
    
    if (isAnalyzing) {
      toast({
        title: "Analysis in Progress",
        description: "Please wait for the current analysis to complete",
        variant: "destructive"
      });
      return;
    }

    if (cameraStatus === 'inactive' || cameraStatus === 'error') {
      console.log('🎥 Initiating camera...');
      await initCamera();
    } else if (cameraStatus === 'active') {
      console.log('📸 Starting palm scan...');
      await startPalmScan();
    } else if (cameraStatus === 'starting') {
      toast({
        title: "Camera Starting",
        description: "Please wait for camera to initialize",
      });
    }
  };

  const getDiagnosticInfo = () => {
    if (cameraStatus === 'error' && lastError) {
      return (
        <div className="mt-4 p-4 bg-red-900/30 rounded-lg border border-red-400/30">
          <h4 className="font-semibold text-red-200 mb-2 flex items-center gap-2">
            <AlertCircle size={16} />
            🔧 Diagnostic Information
          </h4>
          <div className="text-red-100 text-sm space-y-1">
            <p><strong>Error:</strong> {lastError}</p>
            <p><strong>Retry Count:</strong> {cameraRetryCount}</p>
            <p><strong>Device Support:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>📱 Camera Available: {deviceSupport.hasCamera ? '✅ Yes' : '❌ No'}</li>
              <li>🔒 Secure Context: {deviceSupport.isSecureContext ? '✅ Yes' : '❌ No'}</li>
              <li>🎫 Permission: {deviceSupport.hasPermission === true ? '✅ Granted' : deviceSupport.hasPermission === false ? '❌ Denied' : '❓ Unknown'}</li>
            </ul>
          </div>
        </div>
      );
    }
    return null;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 Component unmounting, cleaning up advanced camera...');
      if (initializationTimeout) {
        clearTimeout(initializationTimeout);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [initializationTimeout]);

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
            {deviceSupport.isSecureContext ? (
              <Wifi size={20} className="text-green-300" />
            ) : (
              <WifiOff size={20} className="text-red-300" />
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Camera Section */}
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
                        <AlertCircle size={64} className="text-red-400" />
                      ) : cameraStatus === 'starting' ? (
                        <RotateCw size={64} className="text-purple-400 animate-spin" />
                      ) : (
                        <Camera size={64} className="text-purple-400" />
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-purple-200">
                      {cameraStatus === 'error' 
                        ? 'Camera Error Detected' 
                        : cameraStatus === 'starting'
                        ? 'Starting Camera...'
                        : 'Ready for Palm Reading'}
                    </h3>
                    
                    <p className="text-purple-300 mb-6 text-lg">
                      {cameraStatus === 'error'
                        ? 'Click the button below to retry camera initialization.'
                        : cameraStatus === 'starting'
                        ? 'Please wait while we initialize your camera...'
                        : 'Click the button below to start your camera and begin palm reading.'}
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
                        🔮 Analyzing palm... {scanProgress}%
                      </p>
                      <p className="text-purple-300 text-center text-sm mt-2">
                        AI spiritual analysis in progress...
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Main Action Button */}
              <div className="space-y-4">
                <Button
                  onClick={handleMainButtonClick}
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
              
              {/* Diagnostic Information */}
              {getDiagnosticInfo()}
              
              {/* Positioning Tips */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-4 border border-blue-400/30">
                <h4 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
                  <Move size={16} />
                  📋 Palm Positioning Guide
                </h4>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Hold palm 6-8 inches from camera</li>
                  <li>• Keep fingers together and straight</li>
                  <li>• Ensure good lighting (avoid shadows)</li>
                  <li>• Position palm flat and stable</li>
                  <li>• Use zoom controls for better focus</li>
                  <li>• Try multiple angles if needed</li>
                </ul>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="space-y-6">
              {palmImage && (
                <div className="text-center mb-4">
                  <img src={palmImage} alt="Captured Palm" className="max-w-full max-h-48 rounded-lg mx-auto shadow-lg border-2 border-purple-300" />
                  <p className="text-purple-300 text-sm mt-2">✂️ Auto-cropped for palm focus</p>
                </div>
              )}
              
              {palmReading ? (
                <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-6 border border-purple-300/30">
                  <h3 className="font-bold text-2xl text-purple-200 mb-6 flex items-center gap-2">
                    <Scan size={24} />
                    ✨ Your Palm Reading
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
                    Click the camera button above to start your palm reading or upload an existing image.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-sm text-purple-400 space-y-2">
        <p>✨ Ancient palmistry wisdom enhanced with advanced spiritual AI technology</p>
        <p>📱 Advanced camera system with multiple fallback options for optimal compatibility</p>
        <p>🔮 Your divine path awaits discovery through the sacred art of palm reading</p>
      </div>
    </div>
  );
};
