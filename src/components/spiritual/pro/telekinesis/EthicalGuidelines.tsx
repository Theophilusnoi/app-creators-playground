
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Shield, 
  Users, 
  Scale, 
  Eye,
  BookOpen,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface EthicalGuidelinesProps {
  onEthicsComplete: (committed: boolean) => void;
}

export const EthicalGuidelines: React.FC<EthicalGuidelinesProps> = ({ onEthicsComplete }) => {
  const [commitments, setCommitments] = useState<Record<string, boolean>>({});
  const [showFullText, setShowFullText] = useState(false);

  const ethicalPrinciples = [
    {
      title: 'Non-Harm Principle',
      icon: Shield,
      description: 'Never use telekinetic abilities to harm others, manipulate situations for personal gain, or interfere with others\' free will.',
      commitment: 'I commit to using my abilities only for beneficial purposes and will never cause harm to others.',
      details: [
        'No harmful manipulation of objects near people',
        'No interference with others\' possessions without permission',
        'No use of abilities to frighten or intimidate others',
        'Consideration of indirect consequences of actions'
      ]
    },
    {
      title: 'Respect and Consent',
      icon: Users,
      description: 'Respect others\' privacy, boundaries, and comfort levels when developing or demonstrating abilities.',
      commitment: 'I will respect others\' boundaries and obtain consent before demonstrations or practice involving others.',
      details: [
        'Obtain explicit permission before moving others\' objects',
        'Respect others\' discomfort with psychic phenomena',
        'Maintain confidentiality about others\' experiences',
        'Honor requests to not practice around certain individuals'
      ]
    },
    {
      title: 'Honesty and Integrity',
      icon: Eye,
      description: 'Be truthful about abilities and limitations, avoiding exaggeration or fraudulent claims.',
      commitment: 'I will be honest about my abilities and never make false claims or engage in deceptive practices.',
      details: [
        'Accurate reporting of abilities and limitations',
        'No exaggeration of successes or capabilities',
        'Acknowledgment of failures and inconsistencies',
        'Honest disclosure when teaching or sharing knowledge'
      ]
    },
    {
      title: 'Humility and Service',
      icon: Heart,
      description: 'Maintain humility about abilities and focus on service to others rather than personal power or recognition.',
      commitment: 'I will approach my development with humility and seek to serve the greater good rather than personal ego.',
      details: [
        'Avoid using abilities for personal aggrandizement',
        'Focus on spiritual growth and wisdom development',
        'Share knowledge generously and responsibly',
        'Maintain perspective about the purpose of development'
      ]
    },
    {
      title: 'Responsibility and Accountability',
      icon: Scale,
      description: 'Take full responsibility for the consequences of using telekinetic abilities and their impact on others.',
      commitment: 'I accept full responsibility for my actions and their consequences when using these abilities.',
      details: [
        'Consider long-term consequences of actions',
        'Take responsibility for unintended effects',
        'Maintain accountability to ethical standards',
        'Seek guidance when facing ethical dilemmas'
      ]
    }
  ];

  const ethicalOath = `I solemnly commit to developing and using telekinetic abilities within a framework of wisdom, compassion, and ethical responsibility. I understand that these abilities are not for personal power or ego enhancement, but are sacred gifts to be developed in service of the highest good of all beings. I pledge to use these abilities only for beneficial purposes, to respect the rights and dignity of all people, and to contribute positively to the understanding and evolution of human consciousness.`;

  const handleCommitmentChange = (index: number) => {
    setCommitments(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const allCommitmentsMade = ethicalPrinciples.every((_, index) => commitments[index]);

  const completeEthicalCommitment = () => {
    if (allCommitmentsMade) {
      onEthicsComplete(true);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-pink-900/20 border-pink-500/30">
        <CardHeader>
          <CardTitle className="text-pink-200 flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Ethical Guidelines & Sacred Commitment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-pink-800/20 p-4 rounded-lg border border-pink-600/30">
              <p className="text-pink-200 font-semibold mb-2">
                The development of consciousness abilities carries profound responsibility.
              </p>
              <p className="text-pink-300 text-sm">
                These ethical guidelines ensure that telekinetic abilities are developed and used in harmony with the highest principles of wisdom, compassion, and service to all beings.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-pink-200">Ethical Commitments:</span>
              <Badge className={`${
                allCommitmentsMade ? 'bg-green-600/20 text-green-200' : 'bg-pink-600/20 text-pink-200'
              }`}>
                {Object.keys(commitments).filter(k => commitments[k]).length} / {ethicalPrinciples.length} Made
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ethical Principles */}
      {ethicalPrinciples.map((principle, index) => {
        const IconComponent = principle.icon;
        const isCommitted = commitments[index] || false;
        
        return (
          <Card key={index} className="bg-pink-800/20 border-pink-600/30">
            <CardHeader>
              <CardTitle className="text-pink-200 flex items-center gap-2">
                <IconComponent className="w-5 h-5" />
                {principle.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-pink-300">{principle.description}</p>
              
              <div className="bg-pink-900/20 p-3 rounded-lg">
                <h4 className="text-pink-200 font-semibold mb-2">Specific Guidelines:</h4>
                <ul className="space-y-1">
                  {principle.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-pink-300 text-sm flex items-start">
                      <span className="text-pink-400 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                isCommitted 
                  ? 'bg-green-800/20 border-green-600/30' 
                  : 'bg-pink-900/20 border-pink-600/30 hover:bg-pink-800/30'
              }`}
              onClick={() => handleCommitmentChange(index)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-1 ${
                    isCommitted 
                      ? 'bg-green-600 border-green-600' 
                      : 'border-pink-400'
                  }`}>
                    {isCommitted && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <p className={`font-medium ${
                      isCommitted ? 'text-green-200' : 'text-pink-200'
                    }`}>
                      Sacred Commitment:
                    </p>
                    <p className={`text-sm italic ${
                      isCommitted ? 'text-green-300' : 'text-pink-300'
                    }`}>
                      "{principle.commitment}"
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Sacred Oath */}
      {allCommitmentsMade && (
        <Card className="bg-gold-900/20 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-gold-200 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Sacred Oath of Ethical Practice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gold-800/20 p-4 rounded-lg border border-gold-600/30">
              <p className="text-gold-200 text-sm leading-relaxed italic">
                {showFullText ? ethicalOath : ethicalOath.substring(0, 200) + '...'}
              </p>
              <Button
                onClick={() => setShowFullText(!showFullText)}
                variant="outline"
                size="sm"
                className="mt-2 border-gold-400/30 text-gold-200 hover:bg-gold-600/20"
              >
                {showFullText ? 'Show Less' : 'Read Full Oath'}
              </Button>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gold-300 text-sm">
                By completing this ethical commitment, you acknowledge your understanding and acceptance of these sacred responsibilities.
              </p>
              <Button 
                onClick={completeEthicalCommitment}
                className="bg-gold-600 hover:bg-gold-700 text-gold-100"
              >
                Make Sacred Commitment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
