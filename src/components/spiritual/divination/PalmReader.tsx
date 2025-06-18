
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useVoiceService } from '@/hooks/useVoiceService';
import { Camera, RotateCw, Scan, Hand } from 'lucide-react';

export const PalmReader: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [palmReading, setPalmReading] = useState('');
  const [cameraStatus, setCameraStatus] = useState<'inactive' | 'starting' | 'active' | 'error'>('inactive');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();
  const { generateAndPlay } = useVoiceService();
  
  // Initialize camera
  const initCamera = async () => {
    try {
      setCameraStatus('starting');
      
      // Clean up any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to load metadata
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve;
          }
        });
        
        // Play video
        await videoRef.current.play();
        setCameraStatus('active');
      }
    } catch (err) {
      console.error("Camera error:", err);
      setCameraStatus('error');
      toast({
        title: "Camera Access Required",
        description: "Please enable camera permissions in your browser settings.",
        variant: "destructive"
      });
    }
  };

  // Start palm scanning
  const startPalmScan = async () => {
    if (cameraStatus !== 'active') {
      toast({
        title: "Camera Not Ready",
        description: "Please wait for camera to initialize",
        variant: "destructive"
      });
      return;
    }
    
    setIsScanning(true);
    setScanProgress(0);
    setPalmReading('');
    
    // Capture frame from video
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // In a real app, this image would be sent to an AI API
        // For now, we'll simulate processing
        simulatePalmAnalysis();
      }
    }
  };

  // Simulate palm analysis
  const simulatePalmAnalysis = () => {
    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          generatePalmReading();
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  // Generate palm reading
  const generatePalmReading = () => {
    // In a real app, this would come from an AI API
    const mockReadings = [
      "Your heart line is long and clear, indicating deep emotional connections and a capacity for meaningful relationships.",
      "The head line shows creativity and strong problem-solving abilities, suggesting you approach challenges with innovative thinking.",
      "Your life line suggests vitality and resilience, indicating you have the energy to overcome obstacles and pursue your goals.",
      "The fate line reveals a path with significant changes and opportunities, suggesting you're entering a transformative period.",
      "You have a square palm shape which indicates a practical, down-to-earth nature and strong organizational skills.",
      "The Apollo line is prominent, suggesting potential for recognition and success in creative endeavors.",
      "Your Mercury line shows strong communication skills and potential for success in business or teaching.",
      "The Venus mount is well-developed, indicating a passionate nature and appreciation for life's pleasures."
    ];
    
    // Generate a reading
    const reading = mockReadings[Math.floor(Math.random() * mockReadings.length)];
    setPalmReading(reading);
    setIsScanning(false);
    
    toast({
      title: "Reading Complete",
      description: "Your palm analysis is ready",
    });

    generateAndPlay({
      text: `Your palm reading reveals: ${reading}. This suggests a path of growth and discovery.`,
      emotion: 'compassionate'
    });
  };

  // Initialize camera on mount
  useEffect(() => {
    initCamera();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-3">
          <Hand className="text-purple-600" size={32} />
          Sacred Palm Reader
        </h1>
        <p className="text-gray-600">
          Reveal your life path through ancient palmistry wisdom
        </p>
      </div>
      
      <Card className="overflow-hidden border border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-3">
            <Scan size={24} /> Divine Palm Analysis
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Camera Section */}
            <div className="space-y-6">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-dashed border-purple-300 relative overflow-hidden">
                {cameraStatus === 'active' ? (
                  <>
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted
                      className="w-full h-full object-cover"
                    />
                    {!isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="border-4 border-white border-dashed rounded-full w-64 h-64 animate-pulse" />
                        <div className="absolute text-white font-semibold text-center">
                          Position your palm here
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="bg-purple-100 rounded-full p-4 mb-4">
                      {cameraStatus === 'error' ? (
                        <Camera size={48} className="text-red-500" />
                      ) : (
                        <Camera size={48} className="text-purple-500" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 text-purple-800">
                      {cameraStatus === 'error' 
                        ? 'Camera Access Required' 
                        : 'Starting Camera...'}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {cameraStatus === 'error'
                        ? 'Please enable camera permissions to use palm scanning'
                        : 'Initializing divine vision technology'}
                    </p>
                    
                    <Button 
                      onClick={initCamera}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    >
                      <RotateCw className="mr-2" size={16} />
                      {cameraStatus === 'error' ? 'Retry Camera' : 'Start Camera'}
                    </Button>
                  </div>
                )}
                
                {isScanning && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                    <div className="animate-pulse mb-4">
                      <Scan size={48} className="text-white mx-auto" />
                    </div>
                    <div className="w-full max-w-xs mx-auto">
                      <Progress value={scanProgress} className="bg-white/20 h-3" />
                      <p className="mt-3 text-white text-center">
                        Scanning palm lines... {scanProgress}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <Button
                onClick={startPalmScan}
                disabled={isScanning || cameraStatus !== 'active'}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg font-semibold shadow-lg"
              >
                {isScanning ? (
                  <span className="flex items-center justify-center">
                    <RotateCw className="animate-spin mr-2" size={20} /> Scanning Palm
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Scan className="mr-2" size={20} /> Scan My Palm
                  </span>
                )}
              </Button>
            </div>
            
            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200">
                <h3 className="font-semibold text-lg text-purple-800 mb-4">
                  Palm Lines & Meanings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-800 rounded-lg w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                      ❤️
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-700">Heart Line</h4>
                      <p className="text-gray-600 text-sm">Emotional nature, relationships, and heart health</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-800 rounded-lg w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                      🧠
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-700">Head Line</h4>
                      <p className="text-gray-600 text-sm">Intellect, thinking style, and decision-making</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-800 rounded-lg w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                      🌟
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-700">Life Line</h4>
                      <p className="text-gray-600 text-sm">Vitality, life journey, and physical health</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-800 rounded-lg w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                      🛤️
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-700">Fate Line</h4>
                      <p className="text-gray-600 text-sm">Career path, life direction, and destiny</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-800 rounded-lg w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                      ☀️
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-700">Sun Line</h4>
                      <p className="text-gray-600 text-sm">Creativity, success, and public recognition</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {palmReading && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 shadow-sm">
                  <h3 className="font-semibold text-lg text-indigo-800 mb-3 flex items-center gap-2">
                    <Scan size={18} /> Your Palm Reading
                  </h3>
                  <p className="text-gray-700 mb-4 italic">"{palmReading}"</p>
                  
                  <div className="mt-4 p-4 bg-white rounded-lg border border-purple-100">
                    <h4 className="font-medium text-purple-700 mb-2">Interpretation Guidance</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Palmistry reveals potential, not fixed destiny</li>
                      <li>• Lines can change over time as you grow</li>
                      <li>• Use this insight as guidance, not prediction</li>
                      <li>• Combine with meditation for deeper understanding</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {!palmReading && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 text-center border border-indigo-200">
                  <div className="text-5xl mb-4">🔮</div>
                  <h3 className="font-semibold text-lg text-indigo-800 mb-2">
                    Awaiting Your Palm Scan
                  </h3>
                  <p className="text-gray-600">
                    Scan your palm to receive a personalized reading based on ancient palmistry wisdom combined with modern spiritual insights.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>For best results: Position your palm flat with fingers together in the scanning area under good lighting.</p>
        <p>Palmistry is an ancient art for self-reflection - your choices shape your destiny.</p>
      </div>
    </div>
  );
};
