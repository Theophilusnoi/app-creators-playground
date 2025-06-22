import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause, RotateCcw, CheckCircle, Volume2 } from "lucide-react";
import { VoicePlayer } from './VoicePlayer';

interface RitualStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  affirmation?: string;
  visualization?: string;
}

interface RitualSequence {
  id: string;
  name: string;
  description: string;
  totalDuration: number;
  steps: RitualStep[];
  powerLevel: number;
}

interface RitualSequencerProps {
  sequences: RitualSequence[];
  onSequenceComplete: (sequenceId: string) => void;
  onClose: () => void;
}

export const RitualSequencer: React.FC<RitualSequencerProps> = ({
  sequences,
  onSequenceComplete,
  onClose
}) => {
  const [activeSequence, setActiveSequence] = useState<RitualSequence | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    if (!isRunning || !activeSequence) return;

    const currentStep = activeSequence.steps[currentStepIndex];
    if (!currentStep) return;

    const interval = setInterval(() => {
      setStepProgress(prev => {
        const next = prev + (100 / (currentStep.duration / 100));
        if (next >= 100) {
          setCompletedSteps(prev => [...prev, currentStep.id]);
          if (currentStepIndex < activeSequence.steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
            setStepProgress(0);
          } else {
            // Sequence complete
            setIsRunning(false);
            setTimeout(() => {
              onSequenceComplete(activeSequence.id);
              resetSequence();
            }, 1000);
          }
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, activeSequence, currentStepIndex]);

  const startSequence = (sequence: RitualSequence) => {
    setActiveSequence(sequence);
    setCurrentStepIndex(0);
    setStepProgress(0);
    setCompletedSteps([]);
    setIsRunning(true);
  };

  const pauseResume = () => {
    setIsRunning(!isRunning);
  };

  const resetSequence = () => {
    setActiveSequence(null);
    setCurrentStepIndex(0);
    setStepProgress(0);
    setIsRunning(false);
    setCompletedSteps([]);
  };

  const getCurrentStep = () => {
    if (!activeSequence) return null;
    return activeSequence.steps[currentStepIndex];
  };

  const generateStepAudioScript = (step: RitualStep) => {
    let script = `Welcome to the ${step.name} phase of your sacred ritual. `;
    
    // Add breathing introduction
    script += `Take a moment to settle into this present moment. Feel your body supported by the earth beneath you, and let your breath flow naturally. `;
    
    // Elaborate on the main description
    script += `${step.description} Allow yourself to fully embrace this sacred time and space. `;
    
    // Add detailed guidance based on step type
    if (step.name.toLowerCase().includes('preparation') || step.name.toLowerCase().includes('container')) {
      script += `This is your time to create a sacred container for transformation. Notice the quality of light around you, the temperature of the air on your skin. Let your nervous system begin to settle and open to receive the gifts of this practice. Take three deep breaths with me now - breathing in peace, breathing out any tension or worry. `;
    } else if (step.name.toLowerCase().includes('grounding') || step.name.toLowerCase().includes('earth')) {
      script += `Feel the solid earth supporting you from below. Imagine roots growing from the base of your spine, reaching deep into the earth's core. With each breath, feel yourself becoming more stable, more centered, more connected to the ancient wisdom of the earth. Let this grounding energy rise up through your body, filling you with strength and stability. `;
    } else if (step.name.toLowerCase().includes('gratitude') || step.name.toLowerCase().includes('blessing')) {
      script += `Open your heart to the abundance already present in your life. Feel gratitude not just as a thought, but as a warm, expanding sensation in your chest. Let this appreciation fill every cell of your being. Notice how gratitude transforms your entire energetic state, connecting you to the flow of universal abundance. `;
    } else if (step.name.toLowerCase().includes('intention') || step.name.toLowerCase().includes('daily')) {
      script += `This is a powerful moment of creation. Feel into the quality of being you wish to embody today. See yourself moving through your day with grace, wisdom, and purpose. Feel this intention taking root in your heart, knowing that you are co-creating your reality with the divine forces of the universe. `;
    } else if (step.name.toLowerCase().includes('release') || step.name.toLowerCase().includes('writing')) {
      script += `Allow yourself to be completely honest and vulnerable in this sacred space. Write with the full knowing that anything you release today is being transformed by powerful spiritual forces. Feel the liberation that comes with letting go of what no longer serves your highest good. Trust that as you release, you create space for miracles to enter your life. `;
    } else if (step.name.toLowerCase().includes('moon') || step.name.toLowerCase().includes('lunar')) {
      script += `Connect with the ancient feminine wisdom of the moon. Feel her silver light penetrating every cell of your being, awakening your intuitive powers and emotional intelligence. The moon is your ally in transformation, helping you release old patterns and embrace your authentic power. `;
    }
    
    // Add the affirmation with more context
    if (step.affirmation) {
      script += `Now, let us speak these words of power together. Feel them resonating not just in your mind, but in every fiber of your being. Speak with conviction and love: "${step.affirmation}". Repeat this affirmation silently to yourself, feeling its truth awakening within you. `;
    }
    
    // Add detailed visualization guidance
    if (step.visualization) {
      script += `Close your eyes gently and allow your inner vision to awaken. ${step.visualization} Take your time with this visualization, allowing all your senses to engage. See the colors, feel the textures, hear the sounds, smell the fragrances. Let this vision become so real that it begins to anchor itself into your physical reality. `;
    }
    
    // Add closing guidance
    script += `As you continue with this step, remember that you are engaging in a sacred act of self-transformation. Trust the process, trust your inner wisdom, and know that you are being held and supported by forces greater than yourself. Breathe deeply and allow yourself to fully receive the gifts of this practice. `;
    
    return script;
  };

  if (activeSequence) {
    const currentStep = getCurrentStep();
    const totalProgress = ((currentStepIndex + stepProgress / 100) / activeSequence.steps.length) * 100;

    return (
      <Card className="bg-gray-900/95 border-2 border-purple-500/50 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center bg-gray-800/90 border-b border-purple-500/30">
          <CardTitle className="text-white text-xl font-bold crisp-text">
            🕯️ {activeSequence.name}
          </CardTitle>
          <div className="space-y-2">
            <div className="w-full bg-gray-700/80 rounded-full h-3 border border-gray-600">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-300 shadow-lg"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <p className="text-purple-100 text-sm font-semibold crisp-text">
              Overall Progress: {Math.round(totalProgress)}% • Step {currentStepIndex + 1} of {activeSequence.steps.length}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 p-6">
          {currentStep && (
            <div className="bg-gray-800/60 p-4 rounded-lg border border-purple-500/30 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-bold text-lg crisp-text">
                  Current Step: {currentStep.name}
                </h4>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-100 text-sm font-medium crisp-text">Audio Guided</span>
                </div>
              </div>
              
              <p className="text-gray-100 text-base mb-3 font-medium crisp-text leading-relaxed">{currentStep.description}</p>
              
              <div className="w-full bg-gray-700/70 rounded-full h-3 mb-3 border border-gray-600">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-300 shadow-md"
                  style={{ width: `${stepProgress}%` }}
                />
              </div>
              <p className="text-green-200 text-sm font-semibold crisp-text mb-4">
                {Math.round(stepProgress)}% Complete • {Math.round((currentStep.duration * (100 - stepProgress)) / 100000)} minutes remaining
              </p>

              {/* Audio Player for Current Step */}
              <div className="mb-4">
                <VoicePlayer 
                  script={generateStepAudioScript(currentStep)}
                  tone="nurturing_gentle"
                />
              </div>

              {currentStep.affirmation && (
                <div className="mt-3 p-4 bg-pink-900/30 rounded-lg border border-pink-500/30 shadow-md">
                  <h5 className="text-pink-100 font-bold text-base mb-2 crisp-text">🗣️ Affirm:</h5>
                  <p className="text-pink-50 text-base font-medium italic crisp-text">"{currentStep.affirmation}"</p>
                </div>
              )}

              {currentStep.visualization && (
                <div className="mt-3 p-4 bg-indigo-900/30 rounded-lg border border-indigo-500/30 shadow-md">
                  <h5 className="text-indigo-100 font-bold text-base mb-2 crisp-text">👁️ Visualize:</h5>
                  <p className="text-indigo-50 text-base font-medium crisp-text leading-relaxed">{currentStep.visualization}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center gap-3">
            <Button
              onClick={pauseResume}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-400/50 shadow-lg"
              size="lg"
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Pause' : 'Resume'}
            </Button>
            <Button
              onClick={resetSequence}
              variant="outline"
              className="border-2 border-purple-500/50 text-purple-100 hover:bg-purple-500/20 font-bold shadow-lg"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          <div className="mt-4">
            <h5 className="text-white font-bold text-base mb-3 crisp-text">📝 Sequence Steps:</h5>
            <div className="space-y-2">
              {activeSequence.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium border shadow-sm ${
                    completedSteps.includes(step.id)
                      ? 'bg-green-900/40 text-green-100 border-green-500/30'
                      : index === currentStepIndex
                      ? 'bg-purple-900/40 text-purple-100 border-purple-500/30'
                      : 'bg-gray-800/40 text-gray-300 border-gray-600/30'
                  }`}
                >
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : index === currentStepIndex ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-current" />
                  )}
                  <span className="font-semibold crisp-text">{step.name}</span>
                  <span className="text-xs opacity-75 font-medium crisp-text">
                    ({Math.round(step.duration / 1000)}s)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          🕯️ Ritual Sequencer
        </CardTitle>
        <p className="text-purple-200">
          Guided spiritual ritual sequences with precise timing and audio guidance
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-purple-900/20 p-4 rounded-lg mb-4">
          <h3 className="text-purple-200 font-semibold mb-2">How It Works</h3>
          <p className="text-purple-100 text-sm">
            The Ritual Sequencer guides you through complex spiritual practices step-by-step, 
            with audio guidance, proper timing, visualization, and affirmations for maximum effectiveness.
          </p>
        </div>

        <div className="grid gap-3">
          {sequences.map((sequence) => (
            <Button
              key={sequence.id}
              onClick={() => startSequence(sequence)}
              className={`w-full p-4 h-auto bg-gradient-to-r ${
                sequence.powerLevel >= 9 ? 'from-purple-600 to-gold-600' :
                sequence.powerLevel >= 7 ? 'from-purple-600 to-pink-600' :
                sequence.powerLevel >= 5 ? 'from-purple-600 to-indigo-600' :
                'from-purple-600 to-purple-800'
              } hover:opacity-90 text-white`}
            >
              <div className="text-left w-full">
                <div className="font-semibold text-lg flex items-center gap-2">
                  {sequence.name}
                  <Volume2 className="w-4 h-4" />
                </div>
                <div className="text-sm opacity-90">{sequence.description}</div>
                <div className="text-xs mt-1 opacity-75">
                  Duration: {Math.round(sequence.totalDuration / 1000)}s • 
                  Steps: {sequence.steps.length} • 
                  Power: {sequence.powerLevel}/10 • Audio Guided
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-purple-500/50 text-purple-200"
          >
            Close Sequencer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
