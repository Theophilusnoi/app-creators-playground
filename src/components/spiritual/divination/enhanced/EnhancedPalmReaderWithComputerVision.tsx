
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useVoiceService } from '@/hooks/useVoiceService';
import { enhancedPalmistryService, EnhancedPalmReading } from '@/services/enhancedPalmistryService';
import { Camera, RotateCw, Scan, Hand, Upload, ZoomIn, ZoomOut, Eye, Cpu } from 'lucide-react';

export const EnhancedPalmReaderWithComputerVision: React.FC = () => {
  const [palmImage, setPalmImage] = useState<string | null>(null);
  const [palmReading, setPalmReading] = useState<EnhancedPalmReading | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [cameraStatus, setCameraStatus] = useState<'inactive' | 'starting' | 'active' | 'error'>('inactive');
  const [zoomLevel, setZoomLevel] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { generateAndPlay } = useVoiceService();

  const initCamera = async () => {
    try {
      setCameraStatus('starting');
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
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
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve;
          }
        });
        
        await videoRef.current.play();
        setCameraStatus('active');
        
        toast({
          title: "AI Camera Ready",
          description: "Computer vision analysis enabled for authentic readings",
        });
      }
    } catch (err) {
      console.error("Camera error:", err);
      setCameraStatus('error');
      toast({
        title: "Camera Access Required",
        description: "Enable camera permissions for AI-enhanced palm analysis",
        variant: "destructive"
      });
    }
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

  const startPalmScan = async () => {
    if (cameraStatus !== 'active') {
      toast({
        title: "Camera Not Ready",
        description: "Please wait for camera to initialize",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    setScanProgress(0);
    setPalmReading(null);
    
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    if (video) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const croppedImageData = cropPalmImage(canvas, ctx, video);
        setPalmImage(croppedImageData);
        await performEnhancedAnalysis(croppedImageData);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        const img = new Image();
        img.onload = async () => {
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
            
            setIsAnalyzing(true);
            setScanProgress(0);
            setPalmReading(null);
            await performEnhancedAnalysis(croppedImageData);
          }
        };
        img.src = imageData;
      };
      reader.readAsDataURL(file);
    }
  };

  const performEnhancedAnalysis = async (imageData: string) => {
    // Simulate progressive analysis stages
    const stages = [
      { progress: 20, message: "🖼️ Analyzing image quality..." },
      { progress: 35, message: "👋 Detecting hand presence..." },
      { progress: 50, message: "🔍 Identifying palm lines..." },
      { progress: 70, message: "📏 Measuring palm features..." },
      { progress: 85, message: "🤖 AI interpretation analysis..." },
      { progress: 95, message: "✨ Generating spiritual insights..." }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setScanProgress(stage.progress);
      console.log(stage.message);
    }

    try {
      const analysis = await enhancedPalmistryService.generateEnhancedPalmReading(imageData);
      setPalmReading(analysis);
      setScanProgress(100);
      setIsAnalyzing(false);
      
      toast({
        title: "AI Analysis Complete",
        description: `${analysis.analysisMethod === 'computer_vision_enhanced' ? 'Computer vision enhanced' : 'Traditional'} reading generated (${analysis.accuracyScore}% accuracy)`,
      });

      generateAndPlay({
        text: `Your AI-enhanced palm reading is complete. Computer vision analysis detected ${analysis.computerVisionAnalysis.imageQuality} image quality with ${Math.round(analysis.computerVisionAnalysis.confidenceScore * 100)}% confidence. ${analysis.overallReading.slice(0, 150)}...`,
        emotion: 'wise'
      });
    } catch (error) {
      console.error('Enhanced analysis error:', error);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Error",
        description: "Failed to complete AI analysis. Please try again.",
        variant: "destructive"
      });
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

  useEffect(() => {
    const autoStartCamera = () => {
      if (cameraStatus === 'inactive') {
        initCamera();
      }
    };

    const timer = setTimeout(autoStartCamera, 1000);
    
    return () => {
      clearTimeout(timer);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <Cpu className="text-purple-600" size={40} />
          AI Computer Vision Palm Analysis
        </h1>
        <p className="text-purple-200 text-lg">
          Advanced computer vision + authentic palmistry traditions
        </p>
      </div>
      
      <Card className="overflow-hidden border-2 border-purple-300/50 shadow-2xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Eye size={28} />
            AI Enhanced Palm Reading
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
                    
                    {!isAnalyzing && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative">
                          <div className="border-4 border-white/90 rounded-xl w-64 h-80 animate-pulse flex items-center justify-center bg-white/10 backdrop-blur-sm">
                            <div className="text-white font-bold text-center text-lg">
                              <Hand size={48} className="mx-auto mb-2 animate-pulse" />
                              AI Analysis Ready
                              <br />
                              <span className="text-sm opacity-90">Position palm for scanning</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
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
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="bg-purple-200/30 rounded-full p-6 mb-6">
                      <Camera size={64} className={cameraStatus === 'error' ? "text-red-400" : "text-purple-400"} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-purple-200">
                      {cameraStatus === 'error' ? 'Camera Access Required' : 'Initializing AI Vision...'}
                    </h3>
                    
                    <Button 
                      onClick={initCamera}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg"
                      size="lg"
                    >
                      <RotateCw className="mr-2" size={20} />
                      Start AI Camera
                    </Button>
                  </div>
                )}
                
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="animate-pulse mb-6">
                      <Cpu size={64} className="text-purple-400 mx-auto" />
                    </div>
                    <div className="w-full max-w-sm mx-auto">
                      <Progress value={scanProgress} className="bg-white/20 h-4 mb-4" />
                      <p className="text-white text-center text-lg font-semibold">
                        🤖 AI Computer Vision Analysis... {scanProgress}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={startPalmScan}
                  disabled={isAnalyzing || cameraStatus !== 'active'}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 text-lg font-bold shadow-lg"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <RotateCw className="animate-spin mr-2" size={20} />
                  ) : (
                    <Scan className="mr-2" size={20} />
                  )}
                  🤖 AI Analyze
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                  variant="outline"
                  className="px-6 py-4 border-2 border-purple-400 text-purple-300 hover:bg-purple-600/20"
                  size="lg"
                >
                  <Upload className="mr-2" size={20} />
                  Upload
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
            
            {/* Results Section */}
            <div className="space-y-6">
              {palmImage && (
                <div className="text-center mb-4">
                  <img src={palmImage} alt="Palm Analysis" className="max-w-full max-h-48 rounded-lg mx-auto shadow-lg border-2 border-purple-300" />
                </div>
              )}
              
              {palmReading ? (
                <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-6 border border-purple-300/30">
                  <h3 className="font-bold text-2xl text-purple-200 mb-6 flex items-center gap-2">
                    <Cpu size={24} />
                    🤖 AI Enhanced Reading
                  </h3>
                  
                  {/* Computer Vision Results */}
                  <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-lg text-blue-300 mb-3">🔍 Computer Vision Analysis</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-200">Image Quality:</span>
                        <span className="ml-2 text-white capitalize">{palmReading.computerVisionAnalysis.imageQuality}</span>
                      </div>
                      <div>
                        <span className="text-blue-200">Hand Detected:</span>
                        <span className="ml-2 text-white">{palmReading.computerVisionAnalysis.handDetected ? '✅ Yes' : '❌ No'}</span>
                      </div>
                      <div>
                        <span className="text-blue-200">Palm Orientation:</span>
                        <span className="ml-2 text-white capitalize">{palmReading.computerVisionAnalysis.palmOrientation}</span>
                      </div>
                      <div>
                        <span className="text-blue-200">Analysis Method:</span>
                        <span className="ml-2 text-white">{palmReading.analysisMethod === 'computer_vision_enhanced' ? '🤖 AI Enhanced' : '📜 Traditional'}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-blue-200">Accuracy Score:</span>
                      <span className="ml-2 text-white font-bold">{palmReading.accuracyScore}%</span>
                    </div>
                  </div>
                  
                  {/* Traditional Reading Content */}
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-lg text-purple-300 mb-2">💖 Life Line - {palmReading.majorLines.lifeLine.quality}</h4>
                      <p className="text-purple-100 text-sm">{palmReading.majorLines.lifeLine.traditionalMeaning}</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-lg text-purple-300 mb-2">❤️ Heart Line - {palmReading.majorLines.heartLine.quality}</h4>
                      <p className="text-purple-100 text-sm">{palmReading.majorLines.heartLine.traditionalMeaning}</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-semibold text-lg text-purple-300 mb-2">🧠 Head Line - {palmReading.majorLines.headLine.quality}</h4>
                      <p className="text-purple-100 text-sm">{palmReading.majorLines.headLine.traditionalMeaning}</p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-400/30">
                      <h4 className="font-semibold text-lg text-yellow-200 mb-2">🔮 Enhanced Overall Reading</h4>
                      <p className="text-yellow-100">{palmReading.overallReading}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-2xl p-8 text-center border border-purple-300/30">
                  <div className="text-7xl mb-6">🤖</div>
                  <h3 className="font-bold text-2xl text-purple-200 mb-4">
                    AI Computer Vision Ready
                  </h3>
                  <p className="text-purple-300 text-lg leading-relaxed">
                    Advanced computer vision analysis combined with authentic palmistry traditions for enhanced spiritual insights.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-sm text-purple-400 space-y-2">
        <p>🤖 Computer vision enhanced with traditional palmistry wisdom</p>
        <p>📊 Real-time image analysis with accuracy scoring</p>
        <p>✨ Authentic spiritual interpretation with AI precision</p>
      </div>
    </div>
  );
};
