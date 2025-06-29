
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Heart, Brain, Activity } from 'lucide-react';

interface HealthDisclaimerProps {
  onAccept: () => void;
  onDecline?: () => void;
  className?: string;
}

const HealthDisclaimer: React.FC<HealthDisclaimerProps> = ({
  onAccept,
  onDecline,
  className = ""
}) => {
  const healthConditions = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Neurological Conditions",
      conditions: [
        "History of seizures or epilepsy",
        "Severe mental health conditions",
        "Recent head trauma or concussion",
        "Psychiatric medications affecting consciousness"
      ]
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Cardiovascular Issues",
      conditions: [
        "Heart conditions or arrhythmias",
        "High or low blood pressure",
        "Recent cardiac events",
        "Medications affecting heart rate"
      ]
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: "General Health",
      conditions: [
        "Pregnancy (consult healthcare provider)",
        "Under the influence of substances",
        "Severe fatigue or illness",
        "Recent major surgery or trauma"
      ]
    }
  ];

  return (
    <Card className={`bg-yellow-500/10 border-yellow-500/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-yellow-300 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          Important Health & Safety Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h4 className="text-red-300 font-semibold mb-2">⚠️ Medical Warning</h4>
          <p className="text-red-200 text-sm">
            Astral projection practices can alter consciousness and may not be suitable for everyone. 
            If you have any medical conditions, please consult with a healthcare provider before practicing.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-yellow-200 font-semibold">Do NOT practice if you have:</h4>
          
          {healthConditions.map((category, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-yellow-400">{category.icon}</div>
                <h5 className="text-yellow-200 font-medium">{category.title}</h5>
              </div>
              <ul className="space-y-1">
                {category.conditions.map((condition, conditionIndex) => (
                  <li key={conditionIndex} className="text-yellow-100 text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-2">Safety Guidelines</h4>
          <ul className="space-y-1 text-blue-200 text-sm">
            <li>• Practice in a safe, comfortable environment</li>
            <li>• Never practice while driving or operating machinery</li>
            <li>• Have someone available to contact in case of emergency</li>
            <li>• Start with short sessions (15-30 minutes maximum)</li>
            <li>• Stop immediately if you feel uncomfortable or unwell</li>
            <li>• Ground yourself thoroughly after each session</li>
          </ul>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="text-purple-300 font-semibold mb-2">Emotional Readiness</h4>
          <p className="text-purple-200 text-sm mb-2">
            Ensure you are in a positive, stable emotional state before practicing. Avoid sessions if you are:
          </p>
          <ul className="space-y-1 text-purple-200 text-sm">
            <li>• Experiencing severe stress or anxiety</li>
            <li>• Grieving or processing trauma</li>
            <li>• Under the influence of alcohol or drugs</li>
            <li>• Feeling fearful about the practice</li>
          </ul>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-green-300 font-semibold mb-2">✓ Acknowledgment Required</h4>
          <p className="text-green-200 text-sm">
            By proceeding, you acknowledge that you have read and understood these health warnings, 
            do not have any of the listed conditions, and understand that you practice at your own risk. 
            You agree to stop immediately and seek medical attention if you experience any adverse effects.
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={onAccept}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            I Understand & Accept Responsibility
          </Button>
          {onDecline && (
            <Button
              onClick={onDecline}
              variant="outline"
              className="flex-1 border-red-500/50 text-red-300 hover:bg-red-500/20"
            >
              I Cannot Safely Practice
            </Button>
          )}
        </div>

        <div className="text-center">
          <p className="text-yellow-200 text-xs">
            This disclaimer is for educational purposes only and does not constitute medical advice. 
            Always consult qualified healthcare professionals for medical concerns.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthDisclaimer;
