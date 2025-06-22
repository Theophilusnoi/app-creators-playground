
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  Heart, 
  Brain, 
  Users, 
  BookOpen,
  Zap,
  Eye
} from 'lucide-react';

interface SafetyProtocolsProps {
  onSafetyCheckComplete: (passed: boolean) => void;
}

export const SafetyProtocols: React.FC<SafetyProtocolsProps> = ({ onSafetyCheckComplete }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState('physical');

  const safetyCategories = {
    physical: {
      title: 'Physical Safety',
      icon: Shield,
      color: 'red',
      items: [
        'Never attempt to move objects that could cause harm if they fall',
        'Begin with lightweight, soft objects only',
        'Ensure adequate space around practice area',
        'Remove breakable items and obstacles from vicinity',
        'Stop immediately if experiencing headaches, dizziness, or nausea',
        'Maintain proper posture and take regular breaks',
        'Never practice while driving or operating machinery'
      ]
    },
    energetic: {
      title: 'Energetic Safety & Balance',
      icon: Zap,
      color: 'yellow',
      items: [
        'Avoid forcing or straining during practice',
        'Learn to recognize signs of energetic depletion',
        'Develop grounding practices for stability',
        'Establish energetic protection techniques',
        'Maintain balance with other life aspects',
        'Practice energy restoration when depleted',
        'Monitor for emotional instability or oversensitivity'
      ]
    },
    psychological: {
      title: 'Psychological Safety',
      icon: Brain,
      color: 'purple',
      items: [
        'Seek professional support if experiencing psychological disturbance',
        'Maintain realistic expectations about development',
        'Be cautious about sharing experiences prematurely',
        'Develop discernment about information sources',
        'Maintain supportive social connections',
        'Avoid grandiose thinking or superiority complex',
        'Balance psychic development with practical life'
      ]
    },
    ethical: {
      title: 'Ethical Guidelines',
      icon: Heart,
      color: 'pink',
      items: [
        'Never use abilities to harm others',
        'Do not manipulate situations for personal gain',
        'Respect others\' privacy and boundaries',
        'Be honest about abilities and limitations',
        'Consider consequences before using abilities',
        'Maintain humility and service orientation',
        'Use abilities responsibly, not for ego enhancement'
      ]
    }
  };

  const handleItemCheck = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getTotalItems = () => {
    return Object.values(safetyCategories).reduce((total, category) => total + category.items.length, 0);
  };

  const getCheckedCount = () => {
    return Object.keys(checkedItems).filter(key => checkedItems[key]).length;
  };

  const allItemsChecked = getCheckedCount() === getTotalItems();

  const completeSafetyCheck = () => {
    if (allItemsChecked) {
      onSafetyCheckComplete(true);
    }
  };

  const getCategoryButtonClass = (categoryKey: string, isActive: boolean) => {
    const category = safetyCategories[categoryKey as keyof typeof safetyCategories];
    if (isActive) {
      return `bg-${category.color}-600 hover:bg-${category.color}-700`;
    }
    return `border-${category.color}-400/30 text-${category.color}-200 hover:bg-${category.color}-600/20`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-red-900/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-200 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Safety Protocols & Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-800/20 p-4 rounded-lg border border-red-600/30">
              <p className="text-red-200 font-semibold mb-2">
                IMPORTANT: Safety protocols must be understood and acknowledged before beginning telekinetic practice.
              </p>
              <p className="text-red-300 text-sm">
                These guidelines protect both practitioners and others from potential physical, energetic, and psychological risks.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-red-200">Safety Check Progress:</span>
              <Badge className={allItemsChecked ? 'bg-green-600/20 text-green-200' : 'bg-red-600/20 text-red-200'}>
                {getCheckedCount()} / {getTotalItems()} Acknowledged
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(safetyCategories).map(([key, category]) => {
                const IconComponent = category.icon;
                const isActive = activeSection === key;
                return (
                  <Button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    variant={isActive ? "default" : "outline"}
                    className={getCategoryButtonClass(key, isActive)}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.title}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {activeSection && (
        <Card className={`bg-${safetyCategories[activeSection as keyof typeof safetyCategories].color}-900/20 border-${safetyCategories[activeSection as keyof typeof safetyCategories].color}-500/30`}>
          <CardHeader>
            <CardTitle className={`text-${safetyCategories[activeSection as keyof typeof safetyCategories].color}-200 flex items-center gap-2`}>
              {React.createElement(safetyCategories[activeSection as keyof typeof safetyCategories].icon, { className: "w-5 h-5" })}
              {safetyCategories[activeSection as keyof typeof safetyCategories].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {safetyCategories[activeSection as keyof typeof safetyCategories].items.map((item, index) => {
                const key = `${activeSection}-${index}`;
                const isChecked = checkedItems[key] || false;
                const currentCategory = safetyCategories[activeSection as keyof typeof safetyCategories];
                
                return (
                  <div 
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      isChecked 
                        ? `bg-${currentCategory.color}-800/30 border-${currentCategory.color}-600/50`
                        : `bg-${currentCategory.color}-800/10 border-${currentCategory.color}-600/20 hover:bg-${currentCategory.color}-800/20`
                    }`}
                    onClick={() => handleItemCheck(activeSection, index)}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isChecked 
                        ? `bg-${currentCategory.color}-600 border-${currentCategory.color}-600`
                        : `border-${currentCategory.color}-400`
                    }`}>
                      {isChecked && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`text-${currentCategory.color}-200 text-sm`}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {allItemsChecked && (
        <Card className="bg-green-900/20 border-green-500/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-200">
                <Shield className="w-6 h-6" />
                <span className="font-semibold">Safety Protocols Acknowledged</span>
              </div>
              <p className="text-green-300 text-sm">
                You have acknowledged all safety protocols and guidelines. You may now proceed with telekinetic training.
              </p>
              <Button 
                onClick={completeSafetyCheck}
                className="bg-green-600 hover:bg-green-700"
              >
                Complete Safety Check
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
