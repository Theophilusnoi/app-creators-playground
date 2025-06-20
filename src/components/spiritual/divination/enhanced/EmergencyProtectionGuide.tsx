
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, ArrowLeft, Zap } from 'lucide-react';

interface EmergencyProtectionGuideProps {
  onBack: () => void;
}

export const EmergencyProtectionGuide: React.FC<EmergencyProtectionGuideProps> = ({ onBack }) => {
  const emergencyGuidance = {
    immediate_protection: [
      "Say immediately: 'I call upon divine light to protect me now'",
      "Visualize brilliant white light surrounding you completely",
      "Hold salt in your hand or sprinkle around you if available",
      "Call upon your spiritual guides and angels for protection"
    ],
    emergency_cleansing: [
      "Take a quick shower with salt and intention to cleanse",
      "Light a white candle if available and safe to do so",
      "Pray continuously for divine protection and intervention",
      "Stay in a safe, blessed space until you feel protected"
    ],
    follow_up: [
      "Complete a full sacred bathing ritual as soon as possible",
      "Strengthen your daily spiritual protection practices",
      "Consider seeking guidance from a trusted spiritual advisor",
      "Continue prayer and positive affirmations throughout the day"
    ]
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 text-purple-300 hover:text-purple-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Chat
        </Button>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Emergency Spiritual Protection
        </h2>
        <p className="text-xl text-red-200">Immediate Divine Intervention & Safety</p>
      </div>

      {/* Emergency Message */}
      <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-400/50 animate-pulse">
        <CardContent className="text-center py-6">
          <div className="text-4xl mb-3">🙏</div>
          <h3 className="text-xl font-bold text-red-200 mb-3">Divine Protection is Here</h3>
          <p className="text-red-100 leading-relaxed max-w-2xl mx-auto">
            Beloved soul, you are not alone in this spiritual emergency. The divine forces of light 
            are surrounding you with protection right now. Follow these immediate steps and know 
            that you are deeply loved and divinely protected.
          </p>
        </CardContent>
      </Card>

      {/* Immediate Protection */}
      <Card className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border-2 border-red-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-200">
            <div className="bg-red-500/20 rounded-full p-2">
              <AlertTriangle className="w-5 h-5" />
            </div>
            Immediate Protection (Do Now)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyGuidance.immediate_protection.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-red-100 leading-relaxed font-medium">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Cleansing */}
      <Card className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-2 border-blue-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-200">
            <div className="bg-blue-500/20 rounded-full p-2">
              <Zap className="w-5 h-5" />
            </div>
            Emergency Cleansing (If Safe to Do)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyGuidance.emergency_cleansing.map((step, index) => (
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

      {/* Follow Up */}
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-200">
            <div className="bg-green-500/20 rounded-full p-2">
              <Shield className="w-5 h-5" />
            </div>
            Follow-Up Protection (Within 24 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyGuidance.follow_up.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-green-100 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Affirmation */}
      <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-400/50">
        <CardContent className="text-center py-6">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-xl font-bold text-yellow-200 mb-3">Divine Protection Affirmation</h3>
          <p className="text-yellow-100 leading-relaxed max-w-2xl mx-auto text-lg font-medium">
            "I am surrounded by divine light and love. I am protected by the highest spiritual forces. 
            Only love and light may approach me. I am safe, I am blessed, I am divinely protected."
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
