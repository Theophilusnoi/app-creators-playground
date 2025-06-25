
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Moon, Star, Heart, Eye, BookOpen } from "lucide-react";

interface ProcessNarrativeProps {
  open: boolean;
  onClose: () => void;
  onBegin: () => void;
  title: string;
  subtitle: string;
  introduction: string;
  steps: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  benefits: string[];
  guidelines: string[];
  headerIcon?: string;
}

// Icon mapping to convert string names to actual components
const iconMap: Record<string, React.ComponentType<any>> = {
  Moon,
  Star,
  Heart,
  Eye,
  BookOpen,
  X
};

export const ProcessNarrative = ({ 
  open, 
  onClose, 
  onBegin, 
  title, 
  subtitle, 
  introduction, 
  steps, 
  benefits, 
  guidelines,
  headerIcon = "Moon"
}: ProcessNarrativeProps) => {
  const HeaderIcon = iconMap[headerIcon] || Moon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen max-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 border-none p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="bg-black/30 backdrop-blur-sm border-b border-purple-500/30 p-6 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                  <HeaderIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-3xl font-bold text-white mb-2">
                    {title}
                  </DialogTitle>
                  <p className="text-purple-200 text-lg">{subtitle}</p>
                </div>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="text-purple-200 hover:bg-purple-400/20"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Introduction */}
              <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <p className="text-purple-100 text-lg leading-relaxed">
                    {introduction}
                  </p>
                </CardContent>
              </Card>

              {/* Steps */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-purple-400" />
                  Process Steps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {steps.map((step, index) => {
                    const StepIcon = iconMap[step.icon] || Star;
                    return (
                      <Card key={index} className="bg-black/30 border-purple-500/30 backdrop-blur-sm hover:bg-purple-900/20 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center">
                              <StepIcon className="w-5 h-5 text-purple-300" />
                            </div>
                            <Badge variant="outline" className="border-purple-400 text-purple-200">
                              Step {index + 1}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                          <p className="text-purple-200 text-sm">{step.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-pink-400" />
                  Benefits & Outcomes
                </h3>
                <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-pink-400 mt-2 shrink-0" />
                          <p className="text-purple-100">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Guidelines */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-indigo-400" />
                  Sacred Guidelines
                </h3>
                <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {guidelines.map((guideline, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-indigo-600/30 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-indigo-300 text-xs font-bold">{index + 1}</span>
                          </div>
                          <p className="text-purple-100">{guideline}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-black/30 backdrop-blur-sm border-t border-purple-500/30 p-6 shrink-0">
            <div className="max-w-4xl mx-auto flex gap-4 justify-end">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-purple-400/50 text-purple-200 hover:bg-purple-400/20"
              >
                Close Guide
              </Button>
              <Button
                onClick={() => {
                  onBegin();
                  onClose();
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
              >
                Begin Practice
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
