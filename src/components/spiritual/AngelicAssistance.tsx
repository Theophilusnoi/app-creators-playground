import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AngelInvocationPanel } from './angels/AngelInvocationPanel';
import { AngelCard } from './angels/AngelCard';
import { AngelMeditationInterface } from './AngelMeditationInterface';
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
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <Input
              placeholder="Search angels by name, domain, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/30 border-purple-500/30 text-white placeholder:text-purple-300"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Angel Directory */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Angel Directory</h3>
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {filteredAngels.map((angel) => (
              <AngelCard
                key={angel.id}
                angel={angel}
                onInvoke={handleInvokeAngel}
                onMeditate={handleStartMeditation}
              />
            ))}
          </div>
        </div>

        {/* Angel Invocation Panel */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Angel Communication</h3>
          <AngelInvocationPanel
            selectedAngel={selectedAngel}
            invocationText={invocationText}
            onInvocationTextChange={setInvocationText}
            onSubmitInvocation={handleSubmitInvocation}
            onStartMeditation={handleStartMeditation}
            isInvoking={isInvoking}
            connectionActive={connectionActive}
          />
        </div>
      </div>
    </div>
  );
};

export default AngelicAssistance;
