
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { VoicePlayer } from '@/components/spiritual/VoicePlayer';
import { Sparkles, Shield, PlayCircle, Play, Pause, Volume2 } from 'lucide-react';
import type { AngelEntity } from './angelData';

interface AngelInvocationPanelProps {
  selectedAngel: AngelEntity | null;
  invocationText: string;
  onInvocationTextChange: (text: string) => void;
  onSubmitInvocation: () => void;
  onStartMeditation: (angel: AngelEntity) => void;
  isInvoking: boolean;
  connectionActive: boolean;
}

export const AngelInvocationPanel: React.FC<AngelInvocationPanelProps> = ({
  selectedAngel,
  invocationText,
  onInvocationTextChange,
  onSubmitInvocation,
  onStartMeditation,
  isInvoking,
  connectionActive
}) => {
  const [isPlayingGuide, setIsPlayingGuide] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const { toast } = useToast();
  const guideTimer = useRef<NodeJS.Timeout | null>(null);

  const playInvocationGuide = async () => {
    if (!selectedAngel) return;
    
    try {
      setIsPlayingGuide(true);
      setCurrentStep(0);
      
      toast({
        title: `🎵 Starting Invocation Guide`,
        description: `Beginning step-by-step guidance for invoking ${selectedAngel.name}`,
      });
      
      const steps = selectedAngel.invocationGuide.split('\n').filter(step => step.trim().length > 0);
      
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        
        await new Promise(resolve => {
          guideTimer.current = setTimeout(resolve, 3000 * playbackSpeed);
        });
        
        if (!isPlayingGuide) break;
      }
      
      toast({
        title: `✨ Invocation Complete`,
        description: `You have completed the invocation of ${selectedAngel.name}. Divine connection established.`,
      });
      
    } catch (error) {
      console.error('Guide playback error:', error);
      toast({
        title: "Guide Playback Failed",
        description: "Could not play the invocation guide",
        variant: "destructive"
      });
    } finally {
      setIsPlayingGuide(false);
      setCurrentStep(-1);
    }
  };

  const stopGuide = () => {
    if (guideTimer.current) {
      clearTimeout(guideTimer.current);
      guideTimer.current = null;
    }
    setIsPlayingGuide(false);
    setCurrentStep(-1);
  };

  const togglePlaybackSpeed = () => {
    const speeds = [0.8, 1, 1.2, 1.5];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
    
    toast({
      title: "Playback Speed",
      description: `Set to ${speeds[nextIndex]}x`,
    });
  };

  if (!selectedAngel) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✨</div>
        <h4 className="text-xl font-semibold mb-2 text-white">Select an Angel for Assistance</h4>
        <p className="text-purple-200 mb-6">
          Choose an angel from the directory to request divine assistance, protection, or guidance.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Angel Info Header */}
      <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-purple-500/30">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2"
          style={{ 
            backgroundColor: `${selectedAngel.color}20`,
            borderColor: `${selectedAngel.color}40`
          }}
        >
          {selectedAngel.symbol}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg text-white">{selectedAngel.name}</h4>
          <p className="text-purple-300">{selectedAngel.title}</p>
          <p className="text-sm text-purple-400">Domain: {selectedAngel.domain}</p>
          <p className="text-sm text-purple-400">Best Time: {selectedAngel.timing}</p>
        </div>
        {connectionActive && (
          <div className="text-green-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Connected
            </div>
          </div>
        )}
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="guide" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/30">
          <TabsTrigger value="guide">Invocation Guide</TabsTrigger>
          <TabsTrigger value="evocation">Evocation</TabsTrigger>
          <TabsTrigger value="meditation">Meditation</TabsTrigger>
          <TabsTrigger value="practical">Practical Uses</TabsTrigger>
        </TabsList>

        <TabsContent value="guide" className="space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold text-white mb-3">How to Invoke {selectedAngel.name}</h5>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={togglePlaybackSpeed}
                className="text-purple-200 hover:text-white"
                title="Change playback speed"
              >
                <span className="text-sm font-mono">{playbackSpeed}x</span>
              </Button>
              
              {isPlayingGuide ? (
                <Button
                  onClick={stopGuide}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                  size="sm"
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Stop Guide
                </Button>
              ) : (
                <Button
                  onClick={playInvocationGuide}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  size="sm"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Play Guide
                </Button>
              )}
            </div>
          </div>

          <div className="bg-black/40 p-4 rounded-lg border border-purple-500/20">
            <div className="space-y-3">
              {selectedAngel.invocationGuide.split('\n').filter(step => step.trim().length > 0).map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-start p-3 rounded-lg transition-all ${
                    currentStep === index
                      ? 'bg-purple-600/30 border border-purple-400'
                      : 'bg-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${
                    currentStep === index 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-purple-200/20 text-purple-200'
                  }`}>
                    {index + 1}
                  </div>
                  <p className="flex-grow text-purple-100">{step.trim()}</p>
                </div>
              ))}
            </div>
            
            {isPlayingGuide && (
              <div className="mt-4 p-3 bg-purple-500/20 rounded-lg flex items-center border border-purple-400/30">
                <div className="animate-pulse mr-3">
                  <Volume2 className="text-purple-300 w-5 h-5" />
                </div>
                <p className="text-purple-200">
                  {currentStep >= 0 
                    ? `Following step ${currentStep + 1}...` 
                    : "Preparing the invocation guide..."}
                </p>
              </div>
            )}
          </div>

          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Offerings & Timing</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 p-4 rounded-lg border border-purple-500/20">
                <h6 className="text-purple-300 font-medium mb-2">Recommended Offerings:</h6>
                <ul className="text-purple-100 text-sm space-y-1">
                  {selectedAngel.offerings.map((offering, index) => (
                    <li key={index}>• {offering}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-black/40 p-4 rounded-lg border border-purple-500/20">
                <h6 className="text-purple-300 font-medium mb-2">Best Timing:</h6>
                <p className="text-purple-100 text-sm">{selectedAngel.timing}</p>
                <h6 className="text-purple-300 font-medium mb-2 mt-3">Associated Psalm:</h6>
                <p className="text-purple-100 text-sm">{selectedAngel.psalm}</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Your Personal Invocation</h5>
            <Textarea
              value={invocationText}
              onChange={(e) => onInvocationTextChange(e.target.value)}
              className="min-h-[120px] bg-black/30 border-purple-500/30 text-white placeholder:text-purple-300"
              placeholder="Speak from your heart with pure intention..."
            />
            <div className="mt-3 flex gap-3 justify-center">
              <Button
                onClick={onSubmitInvocation}
                disabled={isInvoking}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isInvoking ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Invoking...
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Send Invocation
                  </>
                )}
              </Button>
              <VoicePlayer 
                script={invocationText || `Calling upon ${selectedAngel.name}, ${selectedAngel.title}`}
                tone="compassionate"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="evocation" className="space-y-4">
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Evocation Technique</h5>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-100 whitespace-pre-wrap leading-relaxed">
                {selectedAngel.evocationGuide}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <Button 
              onClick={() => onStartMeditation(selectedAngel)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              Begin Evocation
            </Button>
            <VoicePlayer 
              script={selectedAngel.evocationGuide}
              tone="nurturing_gentle"
            />
          </div>
        </TabsContent>

        <TabsContent value="meditation" className="space-y-4">
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Guided Meditation with {selectedAngel.name}</h5>
            <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
              <p className="text-green-100 whitespace-pre-wrap leading-relaxed">
                {selectedAngel.meditationGuide}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <Button 
              onClick={() => onStartMeditation(selectedAngel)}
              className="bg-green-600 hover:bg-green-700"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Start Meditation
            </Button>
            <VoicePlayer 
              script={selectedAngel.meditationGuide}
              tone="nurturing_gentle"
            />
          </div>
        </TabsContent>

        <TabsContent value="practical" className="space-y-4">
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Practical Applications</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedAngel.practicalUses.map((use, index) => (
                <div key={index} className="bg-amber-900/30 p-3 rounded-lg border border-amber-500/30">
                  <div className="flex items-center text-amber-100">
                    <span className="mr-2 text-amber-400">✓</span>
                    <span className="text-sm">{use}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
            <h6 className="text-orange-200 font-medium mb-2">Daily Practice Ideas:</h6>
            <ul className="text-orange-100 text-sm space-y-1 list-disc pl-5">
              <li>Carry a small symbol or image of {selectedAngel.name}</li>
              <li>Repeat the angel's name as a protective mantra</li>
              <li>Visualize {selectedAngel.color} light surrounding you</li>
              <li>Read {selectedAngel.psalm} during challenges</li>
              <li>Offer {selectedAngel.offerings[0]} weekly as gratitude</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
