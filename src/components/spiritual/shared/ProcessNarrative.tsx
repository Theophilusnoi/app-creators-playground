
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Book, Star, Shield, Heart } from 'lucide-react';

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-900/95 to-indigo-900/95 border-purple-400/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            {headerIcon} {title}
          </DialogTitle>
          <p className="text-purple-200 text-center text-lg">{subtitle}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Introduction */}
          <Card className="bg-black/30 border-purple-400/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Book className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold">Understanding This Practice</h3>
              </div>
              <p className="text-purple-100 leading-relaxed">{introduction}</p>
            </CardContent>
          </Card>

          {/* Process Steps */}
          <Card className="bg-black/30 border-indigo-400/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-8 h-8 text-indigo-400" />
                <h3 className="text-xl font-bold">Your Journey Steps</h3>
              </div>
              <div className="grid gap-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-indigo-900/20 rounded-lg">
                    <div className="bg-indigo-500/20 rounded-full p-2">
                      <step.icon className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                      <div className="font-medium">{step.title}</div>
                      <div className="text-sm text-indigo-200">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-black/30 border-cyan-400/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-cyan-200">Benefits You'll Experience</h3>
              <div className="space-y-4">
                {benefits.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-cyan-300 mb-2">{category.category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          <span className="text-cyan-100 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-400/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-bold text-yellow-200">Important Guidelines</h3>
              </div>
              <ul className="space-y-2 text-yellow-100">
                {guidelines.map((guideline, index) => (
                  <li key={index}>• {guideline}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-purple-400/50 text-purple-200 hover:bg-purple-400/20"
            >
              Learn More Later
            </Button>
            <Button
              onClick={onBegin}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Begin Practice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
