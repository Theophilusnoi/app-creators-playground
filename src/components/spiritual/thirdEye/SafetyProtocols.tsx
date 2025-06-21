
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Heart, Brain, Clock, Info } from 'lucide-react';

interface SafetyProtocolsProps {
  zodiacProfile?: any;
}

export const SafetyProtocols: React.FC<SafetyProtocolsProps> = ({ zodiacProfile }) => {
  const contraindications = [
    'Diagnosed psychosis or schizophrenia',
    'Active epilepsy or seizure disorders',
    'Severe anxiety or panic disorders',
    'Recent head trauma or brain injury',
    'Currently taking psychiatric medications (consult physician)'
  ];

  const sideEffects = [
    {
      symptom: 'Pressure at brow center',
      remedy: 'Apply cold amethyst crystal to forehead',
      severity: 'Normal'
    },
    {
      symptom: 'Vivid or disturbing dreams',
      remedy: 'Place black tourmaline under pillow',
      severity: 'Normal'
    },
    {
      symptom: 'Headaches or migraines',
      remedy: 'Reduce session duration, increase grounding practices',
      severity: 'Monitor'
    },
    {
      symptom: 'Feeling disconnected from reality',
      remedy: 'Stop practice immediately, engage in grounding activities',
      severity: 'Concerning'
    },
    {
      symptom: 'Overwhelming psychic impressions',
      remedy: 'Practice shielding techniques, reduce session frequency',
      severity: 'Monitor'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Normal': return 'bg-green-600/20 text-green-200';
      case 'Monitor': return 'bg-yellow-600/20 text-yellow-200';
      case 'Concerning': return 'bg-red-600/20 text-red-200';
      default: return 'bg-gray-600/20 text-gray-200';
    }
  };

  const getZodiacSafetyTips = () => {
    if (!zodiacProfile) return null;

    const tips: Record<string, string> = {
      fire: 'Fire signs may experience intense visions. Practice grounding exercises before and after sessions.',
      earth: 'Earth signs are naturally grounded but may resist subtle energies. Be patient with your progress.',
      air: 'Air signs are naturally intuitive but may become scattered. Focus on one technique at a time.',
      water: 'Water signs are highly sensitive. Start with shorter sessions and protect your energy field.'
    };

    return tips[zodiacProfile.elements?.primary];
  };

  return (
    <div className="space-y-6">
      {/* Main Safety Alert */}
      <Alert className="border-red-400/50 bg-red-900/20">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          <strong>Important:</strong> Third Eye activation involves working with subtle energies and consciousness. 
          Please read all safety protocols before beginning your practice.
        </AlertDescription>
      </Alert>

      {/* Contraindications */}
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-200">
            <Shield className="w-6 h-6" />
            Contraindications - Do Not Practice If:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {contraindications.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-red-100">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-red-800/20 rounded-lg">
            <p className="text-red-200 text-sm">
              <strong>Note:</strong> If you have any of these conditions, please consult with a healthcare provider 
              before attempting third eye activation practices. Consider using our grounding-only meditation mode instead.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Side Effects Management */}
      <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-200">
            <Heart className="w-6 h-6" />
            Side Effect Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sideEffects.map((effect, index) => (
              <div key={index} className="border border-yellow-400/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-yellow-200">{effect.symptom}</h4>
                  <Badge className={getSeverityColor(effect.severity)}>
                    {effect.severity}
                  </Badge>
                </div>
                <p className="text-yellow-100 text-sm">
                  <strong>Remedy:</strong> {effect.remedy}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Zodiac-Specific Safety */}
      {zodiacProfile && getZodiacSafetyTips() && (
        <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-400/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-purple-200">
              <Brain className="w-6 h-6" />
              Your Zodiac Safety Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-purple-800/20 rounded-lg p-4">
              <p className="text-purple-100">{getZodiacSafetyTips()}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* General Guidelines */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-blue-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-200">
            <Info className="w-6 h-6" />
            General Safety Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-blue-100">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Start Slowly:</strong> Begin with 5-10 minute sessions and gradually increase duration.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Grounding:</strong> Always end sessions with grounding exercises (walking, eating, physical activity).
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Self-Care:</strong> Maintain healthy sleep, nutrition, and social connections during practice.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Integration:</strong> Journal your experiences and discuss with trusted spiritual advisors.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Protocol */}
      <Card className="bg-gradient-to-r from-red-900/30 to-pink-900/30 border-red-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-200">
            <AlertTriangle className="w-6 h-6" />
            Emergency Protocol
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-800/20 rounded-lg p-4">
            <p className="text-red-100 mb-3">
              <strong>If you experience severe disorientation, panic, or concerning symptoms:</strong>
            </p>
            <ol className="space-y-2 text-red-200 text-sm">
              <li>1. Stop all third eye practices immediately</li>
              <li>2. Engage in grounding activities (walking, cold water on face, eating)</li>
              <li>3. Contact a trusted friend or family member</li>
              <li>4. Seek professional medical or psychological help if symptoms persist</li>
              <li>5. Do not resume practice until symptoms completely resolve</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
