
import React, { useEffect, useState } from 'react';

interface BreathingGuideProps {
  isActive: boolean;
  pattern?: 'box' | '478' | 'simple';
  onPhaseChange?: (phase: string) => void;
}

export const BreathingGuide: React.FC<BreathingGuideProps> = ({ 
  isActive, 
  pattern = 'simple',
  onPhaseChange 
}) => {
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [scale, setScale] = useState(1);

  const patterns = {
    box: { inhale: 4, hold: 4, exhale: 4, pause: 4 },
    '478': { inhale: 4, hold: 7, exhale: 8, pause: 0 },
    simple: { inhale: 4, hold: 0, exhale: 4, pause: 0 }
  };

  const currentPattern = patterns[pattern];

  useEffect(() => {
    if (!isActive) {
      setScale(1);
      setCurrentPhase('inhale');
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let currentPhaseIndex = 0;
    const phases = Object.entries(currentPattern).filter(([_, duration]) => duration > 0);

    const runCycle = () => {
      const [phase, duration] = phases[currentPhaseIndex];
      setCurrentPhase(phase as any);
      onPhaseChange?.(phase);

      // Animate based on phase
      if (phase === 'inhale') {
        setScale(1.5);
      } else if (phase === 'exhale') {
        setScale(0.8);
      } else {
        setScale(1.2); // hold/pause
      }

      timeoutId = setTimeout(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        runCycle();
      }, duration * 1000);
    };

    runCycle();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isActive, pattern, onPhaseChange]);

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Pause';
      default: return 'Breathe';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div 
          className={`w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-80 transition-transform duration-1000 ease-in-out shadow-2xl`}
          style={{ transform: `scale(${scale})` }}
        />
        <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-30 animate-pulse" />
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">{getPhaseText()}</h3>
        <p className="text-purple-200 text-sm">
          {pattern === 'box' && 'Box Breathing (4-4-4-4)'}
          {pattern === '478' && '4-7-8 Technique'}
          {pattern === 'simple' && 'Simple Breathing (4-4)'}
        </p>
      </div>
    </div>
  );
};
