
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { AngelMeditationInterface } from './AngelMeditationInterface';
import { AngelDirectory } from './angels/AngelDirectory';
import { AngelInvocationPanel } from './angels/AngelInvocationPanel';
import { angelicEntities, type AngelEntity } from './angels/angelData';
import { useAngelSearch } from './angels/useAngelSearch';
import { Sparkles, Heart } from 'lucide-react';

const AngelicAssistance = () => {
  const [angels, setAngels] = useState<AngelEntity[]>([]);
  const { searchTerm, setSearchTerm, filteredAngels } = useAngelSearch(angels);
  const [selectedAngel, setSelectedAngel] = useState<AngelEntity | null>(null);
  const [invocationText, setInvocationText] = useState('');
  const [activeTab, setActiveTab] = useState('directory');
  const [isInvoking, setIsInvoking] = useState(false);
  const [connectionActive, setConnectionActive] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const { toast } = useToast();
  
  // Initialize angel data
  useEffect(() => {
    setAngels(angelicEntities);
  }, []);

  const handleInvokeAngel = (angel: AngelEntity) => {
    setSelectedAngel(angel);
    setActiveTab('invocation');
    setInvocationText(`Blessed ${angel.name}, ${angel.title}, I humbly call upon your divine presence. ${angel.domain.toLowerCase()} is what I seek. Please guide me with your divine wisdom and assistance...`);
  };

  const submitInvocation = async () => {
    if (!selectedAngel || !invocationText) {
      toast({
        title: "Incomplete Invocation",
        description: "Please select an angel and enter your invocation text.",
        variant: "destructive"
      });
      return;
    }
    
    setIsInvoking(true);
    
    try {
      toast({
        title: "✨ Invocation Sent",
        description: `Your request to ${selectedAngel.name} has been received. Divine assistance is on its way.`,
      });
      
      console.log("Invocation:", {
        angel: selectedAngel.name,
        text: invocationText,
        timestamp: new Date().toISOString()
      });
      
      // Simulate connection establishing
      setTimeout(() => {
        setConnectionActive(true);
        setIsInvoking(false);
        toast({
          title: `🌟 ${selectedAngel.name} Connected`,
          description: "The angelic presence is now with you. Begin your meditation or requested work.",
        });
      }, 3000);
      
    } catch (error) {
      console.error('Invocation error:', error);
      setIsInvoking(false);
    }
  };

  const startMeditation = (angel: AngelEntity) => {
    setSelectedAngel(angel);
    setShowMeditation(true);
    toast({
      title: `🧘‍♀️ Starting Meditation with ${angel.name}`,
      description: "Prepare yourself for a divine connection.",
    });
  };

  const handleBackFromMeditation = () => {
    setShowMeditation(false);
    setActiveTab('directory');
  };

  // Show meditation interface if meditation is active
  if (showMeditation && selectedAngel) {
    return (
      <AngelMeditationInterface
        angel={selectedAngel}
        onBack={handleBackFromMeditation}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Angelic Assistance</h2>
        <p className="text-purple-200">Connect with divine angelic entities for protection, guidance, and assistance</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/30">
          <TabsTrigger value="directory" className="data-[state=active]:bg-purple-600">
            <Sparkles className="w-4 h-4 mr-2" />
            Angelic Directory
          </TabsTrigger>
          <TabsTrigger value="invocation" className="data-[state=active]:bg-purple-600">
            <Heart className="w-4 h-4 mr-2" />
            Divine Invocation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="directory" className="space-y-4">
          <AngelDirectory
            angels={filteredAngels}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onInvokeAngel={handleInvokeAngel}
            onStartMeditation={startMeditation}
          />
        </TabsContent>
        
        <TabsContent value="invocation" className="space-y-4">
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-xl p-6 max-w-4xl mx-auto backdrop-blur-sm border border-purple-500/30">
            <AngelInvocationPanel
              selectedAngel={selectedAngel}
              invocationText={invocationText}
              onInvocationTextChange={setInvocationText}
              onSubmitInvocation={submitInvocation}
              onStartMeditation={startMeditation}
              isInvoking={isInvoking}
              connectionActive={connectionActive}
            />
            
            {!selectedAngel && (
              <div className="text-center">
                <Button
                  onClick={() => setActiveTab('directory')}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                >
                  Browse Angelic Directory
                </Button>
              </div>
            )}
            
            <div className="mt-8 text-center text-sm text-purple-400 space-y-1">
              <p>✨ Invoke angels with pure intention and an open heart for best results</p>
              <p>🙏 Your requests are received in the divine realm instantly</p>
              <p>💫 Divine assistance flows through love, gratitude, and faith</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AngelicAssistance;
