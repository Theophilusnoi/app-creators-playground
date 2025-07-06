
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Play, Pause, RotateCcw, Eye, Gem, TreePine, 
  Coins, Gift, Lightbulb, Volume2, VolumeX 
} from 'lucide-react';

interface VisualizationScene {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  instructions: string[];
  background: string;
  icon: React.ReactNode;
}

const VISUALIZATION_SCENES: VisualizationScene[] = [
  {
    id: 'golden-temple',
    name: 'Golden Temple of Abundance',
    description: 'Enter a magnificent golden temple where abundance flows like rivers',
    duration: 10,
    background: 'from-yellow-900/60 via-amber-900/60 to-orange-900/60',
    icon: <Gem className="w-6 h-6" />,
    instructions: [
      'Close your eyes and take three deep breaths',
      'Visualize yourself walking up golden steps to a magnificent temple',
      'See the temple walls glowing with warm, golden light',
      'Enter through the ornate doors and feel the abundance energy',
      'Notice golden coins and precious gems scattered on the floor',
      'Pick up the treasures - they represent your manifesting power',
      'Sit on the golden throne in the center of the temple',
      'Feel yourself as the ruler of your financial destiny',
      'See streams of golden light flowing toward you from all directions',
      'These streams represent money and opportunities coming to you'
    ]
  },
  {
    id: 'money-rain',
    name: 'Prosperity Rain Meditation',
    description: 'Stand in a gentle rain of golden coins and bills',
    duration: 8,
    background: 'from-green-900/60 via-emerald-900/60 to-teal-900/60',
    icon: <Coins className="w-6 h-6" />,
    instructions: [
      'Imagine yourself in a beautiful garden under a clear sky',
      'Feel a gentle breeze carrying the scent of prosperity',
      'Look up and see golden clouds forming above you',
      'Watch as gentle rain begins to fall - but it\'s not water',
      'See golden coins and green bills floating down softly',
      'Hold out your hands and feel the money landing gently',
      'Each coin and bill represents abundance coming into your life',
      'Dance in this prosperity rain with joy and gratitude',
      'Feel wealthy, abundant, and completely deserving',
      'Know that this abundance is already yours in reality'
    ]
  },
  {
    id: 'tree-of-wealth',
    name: 'Tree of Infinite Wealth',
    description: 'Tend to a magical tree that grows money instead of leaves',
    duration: 12,
    background: 'from-emerald-900/60 via-green-900/60 to-lime-900/60',
    icon: <TreePine className="w-6 h-6" />,
    instructions: [
      'Visualize yourself in a sacred grove of ancient trees',
      'In the center stands a magnificent tree with golden bark',
      'Instead of leaves, this tree grows golden coins and bills',
      'Approach the tree and place your hands on its warm bark',
      'Feel the abundance energy pulsing through the tree',
      'See the money-leaves rustling in the gentle breeze',
      'Harvest some of the abundance - take what you need',
      'Plant new seeds around the tree for future abundance',
      'Water the seeds with your positive intentions',
      'Watch as new money trees begin to sprout immediately',
      'Know that your wealth grows continuously like this tree',
      'Feel grateful for this infinite source of prosperity'
    ]
  },
  {
    id: 'treasure-vault',
    name: 'Personal Treasure Vault',
    description: 'Discover your own private vault filled with infinite wealth',
    duration: 15,
    background: 'from-purple-900/60 via-indigo-900/60 to-blue-900/60',
    icon: <Gift className="w-6 h-6" />,
    instructions: [
      'Imagine you have a key to your own private vault',
      'Walk down marble steps into an underground chamber',
      'Insert your golden key into an ornate vault door',
      'Hear the satisfying click as the vault opens',
      'Step inside and gasp at the treasures before you',
      'Piles of gold coins reaching to the ceiling',
      'Stacks of currency from around the world',
      'Precious gems sparkling in the soft light',
      'Realize this vault represents your unlimited potential',
      'Take whatever you need - there\'s always more',
      'See the vault magically refilling itself',
      'Add your own treasures - your skills and talents',
      'Lock the vault knowing it\'s always accessible to you',
      'Carry the key with you as a symbol of your wealth',
      'Feel completely secure in your financial abundance'
    ]
  }
];

export const ProsperityVisualizationTemple: React.FC = () => {
  const [selectedScene, setSelectedScene] = useState<VisualizationScene>(VISUALIZATION_SCENES[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            completeVisualization();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  useEffect(() => {
    if (isActive && selectedScene.instructions.length > 0) {
      const stepInterval = (selectedScene.duration * 60) / selectedScene.instructions.length;
      const stepTimer = Math.floor((selectedScene.duration * 60 - timeRemaining) / stepInterval);
      
      if (stepTimer !== currentStep && stepTimer < selectedScene.instructions.length) {
        setCurrentStep(stepTimer);
        
        // Speak the instruction if not muted
        if (!isMuted && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(selectedScene.instructions[stepTimer]);
          utterance.rate = 0.7;
          utterance.pitch = 1;
          utterance.volume = 0.8;
          speechSynthesis.speak(utterance);
        }
      }
    }
  }, [timeRemaining, isActive, selectedScene, currentStep, isMuted]);

  const startVisualization = () => {
    setIsActive(true);
    setCurrentStep(0);
    setTimeRemaining(selectedScene.duration * 60);
    
    toast({
      title: "🏛️ Visualization Started",
      description: `Beginning ${selectedScene.name} - ${selectedScene.duration} minutes`
    });
  };

  const pauseVisualization = () => {
    setIsActive(!isActive);
    
    if ('speechSynthesis' in window && isActive) {
      speechSynthesis.cancel();
    }
  };

  const resetVisualization = () => {
    setIsActive(false);
    setCurrentStep(0);
    setTimeRemaining(0);
    
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  const completeVisualization = () => {
    setIsActive(false);
    setCurrentStep(0);
    
    toast({
      title: "✨ Visualization Complete!",
      description: "Your prosperity visualization session has ended. Feel the abundance flowing to you!"
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (!isMuted && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timeRemaining > 0 ? 
    ((selectedScene.duration * 60 - timeRemaining) / (selectedScene.duration * 60)) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Scene Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {VISUALIZATION_SCENES.map((scene) => (
          <Card 
            key={scene.id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedScene.id === scene.id 
                ? 'ring-2 ring-yellow-400 bg-gradient-to-br ' + scene.background
                : 'bg-gradient-to-br from-gray-900/40 to-gray-800/40 border-gray-500/30'
            }`}
            onClick={() => setSelectedScene(scene)}
          >
            <CardHeader className="text-center pb-2">
              <div className={`mx-auto mb-2 ${selectedScene.id === scene.id ? 'text-yellow-200' : 'text-gray-400'}`}>
                {scene.icon}
              </div>
              <CardTitle className={`text-sm ${selectedScene.id === scene.id ? 'text-yellow-200' : 'text-gray-300'}`}>
                {scene.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className={`text-xs text-center ${selectedScene.id === scene.id ? 'text-yellow-300' : 'text-gray-400'}`}>
                {scene.description}
              </p>
              <div className={`text-xs text-center mt-2 ${selectedScene.id === scene.id ? 'text-yellow-400' : 'text-gray-500'}`}>
                {scene.duration} minutes
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Visualization */}
      <Card className={`bg-gradient-to-br ${selectedScene.background} border-yellow-500/30`}>
        <CardHeader>
          <CardTitle className="text-yellow-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {selectedScene.name}
            </div>
            <div className="text-lg font-mono">
              {timeRemaining > 0 ? formatTime(timeRemaining) : `${selectedScene.duration}:00`}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-yellow-200 text-center">{selectedScene.description}</p>

          {/* Progress Bar */}
          {isActive && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <div className="text-center text-yellow-300 text-sm">
                Step {currentStep + 1} of {selectedScene.instructions.length}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <Button
              onClick={isActive ? pauseVisualization : startVisualization}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isActive ? 'Pause' : 'Start Visualization'}
            </Button>

            {timeRemaining > 0 && (
              <Button
                onClick={resetVisualization}
                variant="outline"
                className="border-yellow-500/30 text-yellow-200"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}

            <Button
              onClick={toggleMute}
              variant="outline"
              className="border-yellow-500/30 text-yellow-200"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Current Instruction */}
          {isActive && currentStep < selectedScene.instructions.length && (
            <Card className="bg-black/30 border-yellow-500/20">
              <CardContent className="p-4">
                <p className="text-yellow-100 text-center text-lg leading-relaxed">
                  {selectedScene.instructions[currentStep]}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Instructions Preview */}
          {!isActive && (
            <Card className="bg-black/20 border-yellow-500/20">
              <CardContent className="p-4">
                <h4 className="text-yellow-200 font-medium mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Visualization Steps:
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedScene.instructions.map((instruction, index) => (
                    <div key={index} className="text-yellow-300 text-sm flex gap-3">
                      <span className="text-yellow-400 font-medium min-w-[20px]">{index + 1}.</span>
                      <span>{instruction}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-200 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Visualization Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-200 text-sm">
            <div>
              <h4 className="font-medium text-blue-100 mb-2">Before You Begin:</h4>
              <ul className="space-y-1">
                <li>• Find a quiet, comfortable space</li>
                <li>• Sit or lie down in a relaxed position</li>
                <li>• Turn off distractions and notifications</li>
                <li>• Set an intention for your session</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-100 mb-2">During Visualization:</h4>
              <ul className="space-y-1">
                <li>• Engage all your senses</li>
                <li>• Feel the emotions of having wealth</li>
                <li>• Don't worry if your mind wanders</li>
                <li>• Trust the process and stay relaxed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
