
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause, RotateCcw, CheckCircle } from "lucide-react";

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

  if (activeSequence) {
    const currentStep = getCurrentStep();
    const totalProgress = ((currentStepIndex + stepProgress / 100) / activeSequence.steps.length) * 100;

    return (
      <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl">
            🕯️ {activeSequence.name}
          </CardTitle>
          <div className="space-y-2">
            <div className="w-full bg-purple-900/50 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <p className="text-purple-200 text-sm">
              Overall Progress: {Math.round(totalProgress)}% • Step {currentStepIndex + 1} of {activeSequence.steps.length}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {currentStep && (
            <div className="bg-purple-900/20 p-4 rounded-lg">
              <h4 className="text-purple-200 font-semibold mb-2">
                Current Step: {currentStep.name}
              </h4>
              <p className="text-purple-100 text-sm mb-3">{currentStep.description}</p>
              
              <div className="w-full bg-purple-800/50 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-300 to-pink-300 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stepProgress}%` }}
                />
              </div>
              <p className="text-purple-300 text-xs">{Math.round(stepProgress)}% Complete</p>

              {currentStep.affirmation && (
                <div className="mt-3 p-3 bg-pink-900/20 rounded-lg">
                  <h5 className="text-pink-200 font-medium text-sm mb-1">🗣️ Affirm:</h5>
                  <p className="text-pink-100 text-sm italic">"{currentStep.affirmation}"</p>
                </div>
              )}

              {currentStep.visualization && (
                <div className="mt-3 p-3 bg-indigo-900/20 rounded-lg">
                  <h5 className="text-indigo-200 font-medium text-sm mb-1">👁️ Visualize:</h5>
                  <p className="text-indigo-100 text-sm">{currentStep.visualization}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center gap-3">
            <Button
              onClick={pauseResume}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Resume'}
            </Button>
            <Button
              onClick={resetSequence}
              variant="outline"
              className="border-purple-500/50 text-purple-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="mt-4">
            <h5 className="text-purple-200 font-medium text-sm mb-2">📝 Sequence Steps:</h5>
            <div className="space-y-2">
              {activeSequence.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 p-2 rounded text-sm ${
                    completedSteps.includes(step.id)
                      ? 'bg-green-900/30 text-green-200'
                      : index === currentStepIndex
                      ? 'bg-purple-900/30 text-purple-200'
                      : 'bg-gray-900/30 text-gray-400'
                  }`}
                >
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : index === currentStepIndex ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-current" />
                  )}
                  <span>{step.name}</span>
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
          Guided spiritual ritual sequences with precise timing and instruction
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-purple-900/20 p-4 rounded-lg mb-4">
          <h3 className="text-purple-200 font-semibold mb-2">How It Works</h3>
          <p className="text-purple-100 text-sm">
            The Ritual Sequencer guides you through complex spiritual practices step-by-step, 
            ensuring proper timing, visualization, and affirmations for maximum effectiveness.
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
                <div className="font-semibold text-lg">{sequence.name}</div>
                <div className="text-sm opacity-90">{sequence.description}</div>
                <div className="text-xs mt-1 opacity-75">
                  Duration: {Math.round(sequence.totalDuration / 1000)}s • 
                  Steps: {sequence.steps.length} • 
                  Power: {sequence.powerLevel}/10
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
