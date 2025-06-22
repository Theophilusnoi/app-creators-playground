
import React from 'react';
import { Eye, Brain, Star, Shield, Heart } from 'lucide-react';
import { MobileOptimizedModal, MobileOptimizedCard } from '../shared/MobileOptimizedModal';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
  onBegin: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ open, onClose, onBegin }) => {
  return (
    <MobileOptimizedModal
      open={open}
      onClose={onClose}
      onBegin={onBegin}
      title="Welcome to Third Eye Activation"
      subtitle="Unlock your inner wisdom and spiritual insight"
      headerIcon="🌌"
      beginButtonText="Begin Your Journey"
    >
      {/* Introduction */}
      <MobileOptimizedCard
        title="What is the Third Eye?"
        icon={Eye}
        iconColor="text-purple-400"
      >
        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
          The Third Eye (Ajna chakra) is your center of intuition, inner wisdom, and spiritual insight. 
          Located between your eyebrows, it corresponds to the pineal gland in neuroscience - often called 
          the "seat of the soul." This ancient practice combines sacred wisdom with modern understanding 
          to awaken your natural psychic abilities and enhance your connection to higher consciousness.
        </p>
      </MobileOptimizedCard>

      {/* The 5-Stage Journey */}
      <MobileOptimizedCard
        title="Your 5-Stage Spiritual Journey"
        icon={Star}
        iconColor="text-indigo-400"
      >
        <div className="grid gap-3">
          {[
            { icon: Shield, title: "Preparation & Grounding", desc: "Sacred space creation and energy protection" },
            { icon: Brain, title: "Pranayama & Energy", desc: "Breathwork to stimulate your pineal gland" },
            { icon: Eye, title: "Focal Meditation", desc: "Direct attention training on the Ajna point" },
            { icon: Star, title: "Symbol Activation", desc: "Sacred geometry imprinting for deeper access" },
            { icon: Heart, title: "Integration", desc: "Translating visions into practical wisdom" }
          ].map((stage, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="bg-indigo-600 rounded-full p-2 flex-shrink-0">
                <stage.icon className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white text-sm md:text-base">{stage.title}</div>
                <div className="text-xs md:text-sm text-gray-400">{stage.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </MobileOptimizedCard>

      {/* Benefits */}
      <MobileOptimizedCard
        title="Benefits You'll Experience"
        icon={Heart}
        iconColor="text-cyan-400"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            "Enhanced intuition and inner guidance",
            "Deeper meditation and spiritual awareness",
            "Improved decision-making abilities",
            "Stronger connection to higher consciousness",
            "Increased psychic sensitivity",
            "Better dream recall and lucid dreaming"
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
              <span className="text-cyan-100 text-xs md:text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </MobileOptimizedCard>

      {/* Important Notes */}
      <MobileOptimizedCard
        title="Important Guidelines"
        icon={Shield}
        iconColor="text-yellow-400"
      >
        <ul className="space-y-1 text-yellow-100 text-xs md:text-sm">
          <li>• Complete stages in order for optimal results</li>
          <li>• Take time between sessions to integrate experiences</li>
          <li>• Trust your inner guidance throughout the process</li>
          <li>• Practice regularly but don't force experiences</li>
          <li>• Stay grounded with the safety protocols provided</li>
        </ul>
      </MobileOptimizedCard>
    </MobileOptimizedModal>
  );
};
