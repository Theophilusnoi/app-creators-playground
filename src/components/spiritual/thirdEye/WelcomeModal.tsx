
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Brain, Star, Shield, Heart, ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
  onBegin: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ open, onClose, onBegin }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-900/95 to-indigo-900/95 border-purple-400/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            🌌 Welcome to Third Eye Activation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Introduction */}
          <Card className="bg-black/30 border-purple-400/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold">What is the Third Eye?</h3>
              </div>
              <p className="text-purple-100 leading-relaxed">
                The Third Eye (Ajna chakra) is your center of intuition, inner wisdom, and spiritual insight. 
                Located between your eyebrows, it corresponds to the pineal gland in neuroscience - often called 
                the "seat of the soul." This ancient practice combines sacred wisdom with modern understanding 
                to awaken your natural psychic abilities and enhance your connection to higher consciousness.
              </p>
            </CardContent>
          </Card>

          {/* The 5-Stage Journey */}
          <Card className="bg-black/30 border-indigo-400/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-8 h-8 text-indigo-400" />
                <h3 className="text-xl font-bold">Your 5-Stage Spiritual Journey</h3>
              </div>
              <div className="grid gap-4">
                {[
                  { icon: Shield, title: "Preparation & Grounding", desc: "Sacred space creation and energy protection" },
                  { icon: Brain, title: "Pranayama & Energy", desc: "Breathwork to stimulate your pineal gland" },
                  { icon: Eye, title: "Focal Meditation", desc: "Direct attention training on the Ajna point" },
                  { icon: Star, title: "Symbol Activation", desc: "Sacred geometry imprinting for deeper access" },
                  { icon: Heart, title: "Integration", desc: "Translating visions into practical wisdom" }
                ].map((stage, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-indigo-900/20 rounded-lg">
                    <div className="bg-indigo-500/20 rounded-full p-2">
                      <stage.icon className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                      <div className="font-medium">{stage.title}</div>
                      <div className="text-sm text-indigo-200">{stage.desc}</div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Enhanced intuition and inner guidance",
                  "Deeper meditation and spiritual awareness",
                  "Improved decision-making abilities",
                  "Stronger connection to higher consciousness",
                  "Increased psychic sensitivity",
                  "Better dream recall and lucid dreaming"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-cyan-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-400/50">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-200">Important Guidelines</h3>
              <ul className="space-y-2 text-yellow-100">
                <li>• Complete stages in order for optimal results</li>
                <li>• Take time between sessions to integrate experiences</li>
                <li>• Trust your inner guidance throughout the process</li>
                <li>• Practice regularly but don't force experiences</li>
                <li>• Stay grounded with the safety protocols provided</li>
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
              Begin Your Journey
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
