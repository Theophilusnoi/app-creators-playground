
import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, Circle, Star, Zap } from 'lucide-react';

interface ARVisualizationPlaceholderProps {
  ritualType: string;
  sealSvg?: string;
}

export const ARVisualizationPlaceholder: React.FC<ARVisualizationPlaceholderProps> = ({
  ritualType,
  sealSvg
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);

    const activationTimer = setTimeout(() => {
      setIsActivated(true);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(activationTimer);
    };
  }, []);

  const getRotationClass = () => {
    switch (animationPhase) {
      case 0: return 'rotate-0';
      case 1: return 'rotate-90';
      case 2: return 'rotate-180';
      case 3: return 'rotate-270';
      default: return 'rotate-0';
    }
  };

  return (
    <div className="relative w-full h-96 bg-black rounded-lg border border-purple-500/50 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className={`border border-purple-400/30 transition-all duration-2000 ${
                isActivated ? 'bg-purple-500/10' : 'bg-transparent'
              }`}
              style={{
                animationDelay: `${i * 50}ms`,
                animation: isActivated ? 'pulse 3s infinite' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Sacred Geometry */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer Protective Circle */}
          <div className={`w-64 h-64 border-2 border-purple-400/60 rounded-full transition-all duration-3000 ${getRotationClass()}`}>
            <div className="w-full h-full relative">
              {/* Corner Stars */}
              {[0, 90, 180, 270].map((rotation, index) => (
                <Star
                  key={index}
                  className={`absolute w-4 h-4 text-purple-300 transition-all duration-2000 ${
                    animationPhase === index ? 'text-yellow-400 scale-125' : ''
                  }`}
                  style={{
                    top: rotation === 0 ? '-8px' : rotation === 180 ? 'calc(100% - 8px)' : '50%',
                    left: rotation === 90 ? 'calc(100% - 8px)' : rotation === 270 ? '-8px' : '50%',
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Inner Sacred Symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center transition-all duration-1000 ${
              isActivated ? 'animate-pulse scale-110' : 'scale-100'
            }`}>
              {sealSvg ? (
                <div 
                  className="w-16 h-16 text-white"
                  dangerouslySetInnerHTML={{ __html: sealSvg }}
                />
              ) : (
                <Sparkles className={`w-12 h-12 text-white transition-all duration-2000 ${getRotationClass()}`} />
              )}
            </div>
          </div>

          {/* Energy Particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-120px)`,
                animation: `spin 6s linear infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* AR Status Indicators */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isActivated ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
        <span className="text-xs text-white/80">
          {isActivated ? 'AR Space Active' : 'Initializing...'}
        </span>
      </div>

      {/* Interactive Elements */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/60 rounded-lg p-4 border border-purple-500/30">
          <h4 className="text-lg font-semibold text-white mb-2">Sacred AR Environment</h4>
          <div className="space-y-2 text-sm text-purple-200">
            <div className="flex items-center gap-2">
              <Circle className="w-3 h-3" />
              <span>Protective energy field: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span>Spiritual vision enhancement: Enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3" />
              <span>Sacred geometry projection: Online</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            In production: Real-time AR overlays, 3D sacred geometry, guided meditation visuals
          </div>
        </div>
      </div>

      {/* Ritual Type Indicator */}
      <div className="absolute top-4 right-4">
        <div className="bg-purple-600/80 text-white px-3 py-1 rounded-full text-sm font-medium">
          {ritualType.replace(/_/g, ' ').toUpperCase()}
        </div>
      </div>
    </div>
  );
};
