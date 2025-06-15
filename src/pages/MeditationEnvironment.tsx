
import React from 'react';
import { MeditationTracker } from '@/components/spiritual/MeditationTracker';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Sparkle, Moon, Sun } from 'lucide-react';

export default function MeditationEnvironment() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 animate-fade-in">
      <div className="absolute top-4 left-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="text-purple-200 hover:text-white"
        >
          <span className="mr-2">&larr;</span> Back to Dashboard
        </Button>
      </div>
      <div className="mb-8 flex flex-col items-center">
        <Sparkle className="w-16 h-16 text-purple-300 animate-pulse mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2">Meditation Environment</h1>
        <p className="text-purple-200 text-center max-w-xl">
          Enter a tranquil space to focus, relax, and meditate. Use the timer, choose your session, and unwind free from distractions.
        </p>
      </div>
      <div className="w-full max-w-3xl z-10">
        <MeditationTracker />
      </div>
    </div>
  );
}
