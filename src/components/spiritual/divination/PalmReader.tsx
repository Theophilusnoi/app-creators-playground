import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useVoiceService } from '@/hooks/useVoiceService';
import { supabase } from '@/integrations/supabase/client';
import { Scan, Hand, Upload } from 'lucide-react';

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

export const PalmReader: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [palmReading, setPalmReading] = useState<PalmAnalysis | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();
  const { generateAndPlay } = useVoiceService();

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
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

  // Analyze palm using the edge function
  const analyzePalm = async () => {
    if (!uploadedImage) {
      toast({
        title: "No Image",
        description: "Please upload a palm image first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setPalmReading(null);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      console.log('🔮 Calling palm-scanner edge function...');
      
      const { data, error } = await supabase.functions.invoke('palm-scanner', {
        body: {
          image: uploadedImage,
          analysisType: 'spiritual'
        }
      });

      clearInterval(progressInterval);
      setAnalysisProgress(100);

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (data?.success && data?.analysis) {
        setPalmReading(data.analysis);
        
        toast({
          title: "Divine Reading Complete",
          description: `Analysis completed with ${data.analysis.confidenceScore}% confidence`,
        });

        // Generate voice reading
        generateAndPlay({
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
      setIsAnalyzing(false);
      setTimeout(() => setAnalysisProgress(0), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-3">
          <Hand className="text-purple-600" size={32} />
          Sacred Palm Reader
        </h1>
        <p className="text-gray-600">
          Reveal your divine purpose through ancient palmistry wisdom
        </p>
      </div>
      
      <Card className="overflow-hidden border border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-3">
            <Scan size={24} />
            Divine Palm Analysis
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-dashed border-purple-300 relative overflow-hidden">
                {uploadedImage ? (
                  <div className="w-full h-full relative">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded palm" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                        <div className="animate-pulse mb-4">
                          <Scan size={48} className="text-white mx-auto" />
                        </div>
                        <div className="w-full max-w-xs mx-auto">
                          <Progress value={analysisProgress} className="bg-white/20 h-3" />
                          <p className="mt-3 text-white text-center">
                            Divine analysis in progress... {analysisProgress}%
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="bg-purple-100 rounded-full p-4 mb-4">
                      <Upload size={48} className="text-purple-500" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 text-purple-800">
                      Upload Palm Image
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      Upload a clear photo of your palm for divine analysis
                    </p>
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="palm-upload"
                    />
                    <label
                      htmlFor="palm-upload"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors"
                    >
                      <Upload className="inline-block mr-2" size={16} />
                      Choose Image
                    </label>
                  </div>
                )}
              </div>
              
              <Button
                onClick={analyzePalm}
                disabled={isAnalyzing || !uploadedImage}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg font-semibold shadow-lg"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center">
                    <Scan className="animate-spin mr-2" size={20} />
                    Analyzing Palm
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Scan className="mr-2" size={20} />
                    Analyze My Palm
                  </span>
                )}
              </Button>
            </div>
            
            {/* Results Section */}
            <div className="space-y-6">
              {palmReading ? (
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 shadow-sm">
                  <h3 className="font-semibold text-lg text-purple-800 mb-4 flex items-center gap-2">
                    <Scan size={18} />
                    Your Divine Palm Reading
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-2">💖 {palmReading.lifeLineReading.name}</h4>
                      <p className="text-sm text-gray-700 mb-2">{palmReading.lifeLineReading.reading}</p>
                      <p className="text-xs text-purple-600 italic">{palmReading.lifeLineReading.spiritualInsight}</p>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-2">❤️ {palmReading.heartLineReading.name}</h4>
                      <p className="text-sm text-gray-700 mb-2">{palmReading.heartLineReading.reading}</p>
                      <p className="text-xs text-purple-600 italic">{palmReading.heartLineReading.spiritualInsight}</p>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-2">🧠 {palmReading.headLineReading.name}</h4>
                      <p className="text-sm text-gray-700 mb-2">{palmReading.headLineReading.reading}</p>
                      <p className="text-xs text-purple-600 italic">{palmReading.headLineReading.spiritualInsight}</p>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-2">🌟 {palmReading.fateLineReading.name}</h4>
                      <p className="text-sm text-gray-700 mb-2">{palmReading.fateLineReading.reading}</p>
                      <p className="text-xs text-purple-600 italic">{palmReading.fateLineReading.spiritualInsight}</p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                      <h4 className="font-semibold text-orange-700 mb-2">🎁 Your Spiritual Gifts</h4>
                      <p className="text-sm text-gray-700">{palmReading.spiritualGifts}</p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">🙏 Divine Guidance</h4>
                      <p className="text-sm text-gray-700">{palmReading.guidance}</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border border-purple-300">
                      <h4 className="font-semibold text-purple-700 mb-2">🔮 Overall Reading</h4>
                      <p className="text-sm text-gray-700 font-medium">{palmReading.overallReading}</p>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500">
                    <p>Confidence: {palmReading.confidenceScore}% | Quality: {palmReading.imageQuality}</p>
                  </div>
                </div>
              ) : (
                // ... keep existing code (palm reading guide)
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200">
                  <h3 className="font-semibold text-lg text-purple-800 mb-4">
                    Palm Lines & Spiritual Meanings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-800 rounded-lg w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                        ❤️
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-700">Heart Line</h4>
                        <p className="text-gray-600 text-sm">Divine love, spiritual relationships, and heart chakra energy</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-800 rounded-lg w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                        🧠
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-700">Head Line</h4>
                        <p className="text-gray-600 text-sm">Divine wisdom, spiritual discernment, and mental clarity</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-800 rounded-lg w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                        🌟
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-700">Life Line</h4>
                        <p className="text-gray-600 text-sm">Divine vitality, spiritual journey, and life force energy</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-800 rounded-lg w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                        🛤️
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-700">Fate Line</h4>
                        <p className="text-gray-600 text-sm">Divine destiny, spiritual mission, and sacred purpose</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>For best results: Upload a clear, well-lit photo of your palm with fingers together.</p>
        <p>Divine palmistry reveals spiritual insights - your faith and choices shape your destiny.</p>
      </div>
    </div>
  );
};
