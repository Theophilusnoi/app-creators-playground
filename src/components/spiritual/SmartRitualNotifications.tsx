
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, Cloud, Sun, Moon, X, Play } from 'lucide-react';
import { environmentalIntelligence } from '@/services/environmentalIntelligenceService';
import { useToast } from '@/hooks/use-toast';

interface RitualSuggestion {
  ritualId: string;
  confidence: number;
  reason: string;
}

interface SmartNotificationProps {
  onStartRitual: (ritualId: string) => void;
  rituals: Array<{
    id: string;
    name: string;
    description: string;
    duration: string;
    category: string;
  }>;
}

export const SmartRitualNotifications: React.FC<SmartNotificationProps> = ({
  onStartRitual,
  rituals
}) => {
  const [suggestions, setSuggestions] = useState<RitualSuggestion[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentContext, setCurrentContext] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const loadInitialSuggestions = async () => {
      try {
        const initialSuggestions = await environmentalIntelligence.getSuggestedRituals();
        const context = await environmentalIntelligence.getCurrentContext();
        
        if (initialSuggestions.length > 0) {
          setSuggestions(initialSuggestions);
          setIsVisible(true);
          setCurrentContext(`${context.time} • ${context.weather} • ${context.dayOfWeek}`);
        }
      } catch (error) {
        console.error('Error loading ritual suggestions:', error);
      }
    };

    loadInitialSuggestions();

    // Set up periodic checks for new suggestions
    const cleanup = environmentalIntelligence.scheduleSmartReminders(
      (newSuggestions) => {
        if (newSuggestions.length > 0 && !isVisible) {
          setSuggestions(newSuggestions);
          setIsVisible(true);
          
          toast({
            title: "✨ Perfect Time for Practice",
            description: `${newSuggestions[0].reason}`,
          });
        }
      }
    );

    return cleanup;
  }, [toast, isVisible]);

  const getRitualById = (id: string) => {
    return rituals.find(ritual => ritual.id === id);
  };

  const getContextIcon = () => {
    if (currentContext.includes('morning')) return <Sun className="w-4 h-4" />;
    if (currentContext.includes('evening') || currentContext.includes('night')) return <Moon className="w-4 h-4" />;
    if (currentContext.includes('rainy')) return <Cloud className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const handleStartRitual = (ritualId: string) => {
    onStartRitual(ritualId);
    setIsVisible(false);
    
    toast({
      title: "🧘‍♀️ Ritual Started",
      description: "Your perfectly timed practice begins now",
    });
  };

  const handleDismiss = () => {
    setIsVisible(false);
    
    toast({
      title: "Reminder Dismissed",
      description: "We'll suggest another practice later",
    });
  };

  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-2 border-purple-400/50 backdrop-blur-sm animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-yellow-400" />
            Smart Ritual Suggestion
          </CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="text-gray-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-purple-200 text-sm">
          {getContextIcon()}
          <span>{currentContext}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-purple-100 text-sm mb-4">
          {suggestions[0]?.reason}
        </p>

        <div className="space-y-3">
          {suggestions.slice(0, 2).map((suggestion) => {
            const ritual = getRitualById(suggestion.ritualId);
            if (!ritual) return null;

            return (
              <div
                key={suggestion.ritualId}
                className="bg-black/20 rounded-lg p-3 border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{ritual.name}</h4>
                  <Badge className="bg-green-600 text-white text-xs">
                    {Math.round(suggestion.confidence * 100)}% match
                  </Badge>
                </div>
                <p className="text-purple-200 text-xs mb-3">{ritual.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 text-xs">{ritual.duration}</span>
                  <Button
                    size="sm"
                    onClick={() => handleStartRitual(ritual.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Start Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {suggestions.length > 2 && (
          <p className="text-purple-300 text-xs text-center mt-2">
            +{suggestions.length - 2} more suggestions available
          </p>
        )}
      </CardContent>
    </Card>
  );
};
