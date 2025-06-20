
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Bath, Sparkles, Heart } from 'lucide-react';
import { RitualInstructions } from '@/services/seraphinaBathingService';

interface RitualInstructionsGuideProps {
  instructions: RitualInstructions;
  ritualName: string;
  onBack: () => void;
}

export const RitualInstructionsGuide: React.FC<RitualInstructionsGuideProps> = ({
  instructions,
  ritualName,
  onBack
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 text-purple-300 hover:text-purple-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Ingredient Guide
        </Button>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Sacred Ritual Instructions
        </h2>
        <p className="text-xl text-purple-200">{ritualName}</p>
      </div>

      {/* Preparation Steps */}
      <Card className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-2 border-blue-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-200">
            <div className="bg-blue-500/20 rounded-full p-2">
              <Sparkles className="w-5 h-5" />
            </div>
            Preparation Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {instructions.preparation_steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-blue-100 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sacred Bathing Steps */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border-2 border-purple-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-200">
            <div className="bg-purple-500/20 rounded-full p-2">
              <Bath className="w-5 h-5" />
            </div>
            Sacred Bathing Ritual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {instructions.ritual_steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-purple-100 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Closing Ritual */}
      <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-200">
            <div className="bg-yellow-500/20 rounded-full p-2">
              <Heart className="w-5 h-5" />
            </div>
            Closing & Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {instructions.closing_ritual.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-yellow-100 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sacred Reminder */}
      <Card className="bg-gradient-to-r from-pink-900/30 to-rose-900/30 border-2 border-pink-400/50">
        <CardContent className="text-center py-6">
          <div className="text-4xl mb-3">🙏</div>
          <h3 className="text-xl font-bold text-pink-200 mb-3">Sacred Reminder</h3>
          <p className="text-pink-100 leading-relaxed max-w-2xl mx-auto">
            This is a sacred practice. Approach it with reverence, faith, and an open heart. 
            The divine is working through this ritual to bring you healing and protection. 
            Trust in the process and allow the sacred energies to flow through you.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-pink-300">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">You are divinely guided and protected</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
