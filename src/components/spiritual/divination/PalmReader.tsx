
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useVoiceService } from '@/hooks/useVoiceService';
import { Scan, RotateCw, Camera } from 'lucide-react';

interface PalmLine {
  id: string;
  name: string;
  description: string;
}

const palmLines: PalmLine[] = [
  { id: 'life', name: 'Life Line', description: 'Represents vitality and life journey' },
  { id: 'heart', name: 'Heart Line', description: 'Shows emotional nature and relationships' },
  { id: 'head', name: 'Head Line', description: 'Indicates intellect and thinking style' },
  { id: 'fate', name: 'Fate Line', description: 'Reveals career path and life direction' },
  { id: 'sun', name: 'Sun Line', description: 'Relates to creativity and success' },
];

const mockReadings = [
  "Your heart line is long and clear, indicating deep emotional connections and a capacity for lasting love.",
  "The head line shows creativity and strong problem-solving abilities, suggesting an analytical yet intuitive mind.",
  "Your life line suggests vitality and resilience, with potential for a long and fulfilling journey.",
  "The fate line indicates a path with significant changes and opportunities for growth and transformation.",
  "You have a square palm, which suggests practicality and a down-to-earth nature with strong leadership qualities."
];

export const PalmReader: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [palmReading, setPalmReading] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const { generateAndPlay } = useVoiceService();

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const startPalmScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setPalmReading('');
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          analyzePalm();
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const analyzePalm = () => {
    const reading = mockReadings[Math.floor(Math.random() * mockReadings.length)];
    setPalmReading(reading);
    setIsScanning(false);
    
    generateAndPlay({
      text: `Your palm reading reveals: ${reading}. This suggests a path of growth and discovery.`,
      emotion: 'compassionate'
    });
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <Scan className="text-purple-400" />
          Palmistry Analysis
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-purple-500/50 rounded-lg aspect-square relative overflow-hidden bg-black/20">
              {isScanning ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-pulse mb-4">
                      <Scan size={48} className="text-purple-400 mx-auto" />
                    </div>
                    <Progress value={scanProgress} className="w-full max-w-xs mx-auto mb-2" />
                    <p className="text-purple-300">Scanning your palm...</p>
                  </div>
                </div>
              ) : cameraActive ? (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="border-4 border-white/50 border-dashed rounded-full w-64 h-64" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-purple-300">
                    <Camera size={48} className="mx-auto mb-2" />
                    <p>Camera not active</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              {!cameraActive && (
                <Button
                  onClick={initCamera}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Camera className="mr-2" size={16} />
                  Start Camera
                </Button>
              )}
              
              <Button
                onClick={startPalmScan}
                disabled={isScanning || !cameraActive}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                {isScanning ? (
                  <>
                    <RotateCw className="animate-spin mr-2" size={16} />
                    Scanning
                  </>
                ) : (
                  <>
                    <Scan className="mr-2" size={16} />
                    Scan My Palm
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-white">Palm Lines & Meanings</h3>
            
            <div className="space-y-3">
              {palmLines.map(line => (
                <div key={line.id} className="flex items-start p-3 bg-black/20 border border-purple-500/30 rounded-lg">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                    {line.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{line.name}</h4>
                    <p className="text-sm text-purple-200">{line.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {palmReading && (
              <div className="mt-4 p-4 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-lg border border-purple-500/30">
                <h4 className="font-semibold text-purple-200 mb-2">Your Palm Reading</h4>
                <p className="text-purple-100 leading-relaxed">{palmReading}</p>
                <div className="mt-4 text-sm text-purple-300">
                  <p>✨ Remember: Palmistry reveals possibilities, not certainties. Your choices shape your destiny.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
