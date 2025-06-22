
import React from 'react';
import { MobileOptimizedModal, MobileOptimizedCard } from './MobileOptimizedModal';
import { Book, Star, Shield } from 'lucide-react';

interface ProcessStep {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface ProcessBenefit {
  category: string;
  benefits: string[];
}

interface ProcessNarrativeProps {
  open: boolean;
  onClose: () => void;
  onBegin: () => void;
  title: string;
  subtitle: string;
  introduction: string;
  steps: ProcessStep[];
  benefits: ProcessBenefit[];
  guidelines: string[];
  headerIcon?: string;
}

export const ProcessNarrative: React.FC<ProcessNarrativeProps> = ({
  open,
  onClose,
  onBegin,
  title,
  subtitle,
  introduction,
  steps,
  benefits,
  guidelines,
  headerIcon = "🌟"
}) => {
  return (
    <MobileOptimizedModal
      open={open}
      onClose={onClose}
      onBegin={onBegin}
      title={title}
      subtitle={subtitle}
      headerIcon={headerIcon}
    >
      {/* Introduction */}
      <MobileOptimizedCard
        title="Understanding This Practice"
        icon={Book}
        iconColor="text-purple-400"
      >
        <p className="text-gray-300 leading-relaxed text-sm md:text-base">{introduction}</p>
      </MobileOptimizedCard>

      {/* Process Steps */}
      <MobileOptimizedCard
        title="Your Journey Steps"
        icon={Star}
        iconColor="text-indigo-400"
      >
        <div className="grid gap-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="bg-indigo-600 rounded-full p-2 flex-shrink-0">
                <step.icon className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white text-sm md:text-base">{step.title}</div>
                <div className="text-xs md:text-sm text-gray-400">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </MobileOptimizedCard>

      {/* Benefits */}
      <MobileOptimizedCard
        title="Benefits You'll Experience"
        icon={Star}
        iconColor="text-cyan-400"
      >
        <div className="space-y-4">
          {benefits.map((category, index) => (
            <div key={index}>
              <h4 className="font-semibold text-cyan-300 mb-2 text-sm md:text-base">{category.category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {category.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                    <span className="text-cyan-100 text-xs md:text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MobileOptimizedCard>

      {/* Guidelines */}
      <MobileOptimizedCard
        title="Important Guidelines"
        icon={Shield}
        iconColor="text-yellow-400"
      >
        <ul className="space-y-1 text-yellow-100 text-xs md:text-sm">
          {guidelines.map((guideline, index) => (
            <li key={index}>• {guideline}</li>
          ))}
        </ul>
      </MobileOptimizedCard>
    </MobileOptimizedModal>
  );
};
