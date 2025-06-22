
import React from 'react';
import { Eye, Brain, Star, Shield, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
  onBegin: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ open, onClose, onBegin }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-purple-500/50 text-white">
        <DialogHeader className="text-center pb-4 border-b border-gray-700">
          <DialogTitle className="text-3xl font-bold text-purple-300 flex items-center justify-center gap-3">
            🌌 Welcome to Third Eye Activation
          </DialogTitle>
          <p className="text-purple-100 mt-2">Unlock your inner wisdom and spiritual insight</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Introduction */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Eye className="w-5 h-5" />
                What is the Third Eye?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                The Third Eye (Ajna chakra) is your center of intuition, inner wisdom, and spiritual insight. 
                Located between your eyebrows, it corresponds to the pineal gland in neuroscience - often called 
                the "seat of the soul." This ancient practice combines sacred wisdom with modern understanding 
                to awaken your natural psychic abilities and enhance your connection to higher consciousness.
              </p>
            </CardContent>
          </Card>

          {/* The 5-Stage Journey */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-400">
                <Star className="w-5 h-5" />
                Your 5-Stage Spiritual Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                      <div className="font-medium text-white">{stage.title}</div>
                      <div className="text-sm text-gray-400">{stage.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Heart className="w-5 h-5" />
                Benefits You'll Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                    <span className="text-cyan-100 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Shield className="w-5 h-5" />
                Important Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-yellow-100 text-sm">
                <li>• Complete stages in order for optimal results</li>
                <li>• Take time between sessions to integrate experiences</li>
                <li>• Trust your inner guidance throughout the process</li>
                <li>• Practice regularly but don't force experiences</li>
                <li>• Stay grounded with the safety protocols provided</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
          <Button 
            onClick={onClose}
            variant="outline"
            className="flex-1 border-gray-600 text-white hover:bg-gray-800"
          >
            Close Guide
          </Button>
          <Button 
            onClick={onBegin}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold"
          >
            Begin Your Journey
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
