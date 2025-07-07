
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AngelInvocationPanel } from './angels/AngelInvocationPanel';
import { AngelCard } from './angels/AngelCard';
import { AngelMeditationInterface } from './AngelMeditationInterface';
import { AngelDirectory } from './angels/AngelDirectory';
import { useToast } from '@/hooks/use-toast';
import { Search, Sparkles } from 'lucide-react';
import { enhancedAngels } from './angels/enhancedAngelData';
import type { EnhancedAngelEntity } from './angels/enhancedAngelData';

const AngelicAssistance = () => {
  const { toast } = useToast();
  const [selectedAngel, setSelectedAngel] = useState<EnhancedAngelEntity | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [invocationText, setInvocationText] = useState('');
  const [isInvoking, setIsInvoking] = useState(false);
  const [connectionActive, setConnectionActive] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);

  const filteredAngels = enhancedAngels.filter(angel =>
    angel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    angel.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    angel.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInvokeAngel = (angel: EnhancedAngelEntity) => {
    setSelectedAngel(angel);
    setInvocationText(`Divine ${angel.name}, ${angel.title}, I humbly seek your guidance and protection...`);
  };

  const handleStartMeditation = (angel: EnhancedAngelEntity) => {
    setSelectedAngel(angel);
    setShowMeditation(true);
  };

  const handleSubmitInvocation = async () => {
    if (!selectedAngel || !invocationText.trim()) return;

    setIsInvoking(true);
    
    try {
      // Simulate invocation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setConnectionActive(true);
      toast({
        title: `🕊️ Connection Established`,
        description: `${selectedAngel.name} has heard your call and offers divine protection.`,
      });
    } catch (error) {
      toast({
        title: "Invocation Failed",
        description: "Please purify your intentions and try again.",
        variant: "destructive"
      });
    } finally {
      setIsInvoking(false);
    }
  };

  if (showMeditation && selectedAngel) {
    return (
      <AngelMeditationInterface
        angel={selectedAngel}
        onBack={() => setShowMeditation(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            Angelic Assistance Directory
          </CardTitle>
          <p className="text-purple-200">
            Connect with divine messengers for guidance, protection, and spiritual support
          </p>
        </CardHeader>
      </Card>

      {/* Use the enhanced AngelDirectory component */}
      <AngelDirectory
        angels={enhancedAngels}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onInvokeAngel={handleInvokeAngel}
        onStartMeditation={handleStartMeditation}
      />

      {/* Angel Invocation Panel - only show if angel is selected */}
      {selectedAngel && (
        <div className="mt-6">
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Angel Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <AngelInvocationPanel
                selectedAngel={selectedAngel}
                invocationText={invocationText}
                onInvocationTextChange={setInvocationText}
                onSubmitInvocation={handleSubmitInvocation}
                onStartMeditation={handleStartMeditation}
                isInvoking={isInvoking}
                connectionActive={connectionActive}
              />
            </CardContent>
          </Card>
        )}
      )}
    </div>
  );
};

export default AngelicAssistance;
