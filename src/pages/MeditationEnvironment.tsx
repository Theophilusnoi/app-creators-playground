
import React from 'react';
import { MeditationTracker } from '@/components/spiritual/MeditationTracker';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Sparkle, ArrowLeft } from 'lucide-react';

export default function MeditationEnvironment() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="text-purple-200 hover:text-white hover:bg-purple-400/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <Sparkle className="w-16 h-16 text-purple-300 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Meditation Sanctuary
          </h1>
          <p className="text-purple-200 text-center max-w-2xl mx-auto leading-relaxed">
            Enter a tranquil space designed for deep meditation and inner peace. Choose your practice, 
            set your intention, and let guided wisdom accompany you on your journey within.
          </p>
        </div>

        {/* Meditation Tracker */}
        <div className="w-full max-w-4xl">
          <MeditationTracker />
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-300/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
