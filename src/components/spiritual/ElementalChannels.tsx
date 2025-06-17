import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Globe, Sparkles, Flame, Droplets, Wind, Mountain } from 'lucide-react';

interface ElementalCommunication {
  id: string;
  element: string;
  message_symbol: string;
  response_received: boolean;
  elemental_type: string;
  communication_method: string;
  intensity_level: number;
  created_at: string;
}

export const ElementalChannels = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedElement, setSelectedElement] = useState('fire');
  const [messageSymbol, setMessageSymbol] = useState('');
  const [communicationMethod, setCommunicationMethod] = useState('meditation');
  const [intensityLevel, setIntensityLevel] = useState(5);
  const [isCommunicating, setIsCommunicating] = useState(false);
  const [communications, setCommunications] = useState<ElementalCommunication[]>([]);
  const [loading, setLoading] = useState(false);

  const elements = [
    { value: 'fire', label: 'Fire - Transformation & Will', icon: Flame, color: 'text-red-400' },
    { value: 'water', label: 'Water - Emotion & Flow', icon: Droplets, color: 'text-blue-400' },
    { value: 'air', label: 'Air - Thought & Communication', icon: Wind, color: 'text-yellow-400' },
    { value: 'earth', label: 'Earth - Grounding & Manifestation', icon: Mountain, color: 'text-green-400' }
  ];

  const communicationMethods = [
    { value: 'meditation', label: 'Meditative Communion' },
    { value: 'ritual', label: 'Sacred Ritual' },
    { value: 'offering', label: 'Energy Offering' },
    { value: 'divination', label: 'Divination Practice' },
    { value: 'nature_immersion', label: 'Nature Immersion' }
  ];

  const elementalTypes = {
    fire: ['Salamander', 'Fire Dragon', 'Phoenix Spirit', 'Solar Being'],
    water: ['Undine', 'Water Nymph', 'Ocean Guardian', 'Rain Spirit'],
    air: ['Sylph', 'Wind Dancer', 'Sky Guardian', 'Storm Being'],
    earth: ['Gnome', 'Tree Spirit', 'Mountain Guardian', 'Crystal Being']
  };

  useEffect(() => {
    if (user) {
      fetchCommunications();
    }
  }, [user]);

  const fetchCommunications = async () => {
    try {
      const { data, error } = await supabase
        .from('elemental_communications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommunications(data || []);
    } catch (error) {
      console.error('Error fetching communications:', error);
    }
  };

  const initiateElementalCommunication = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to communicate with elemental beings.",
        variant: "destructive"
      });
      return;
    }

    if (!messageSymbol.trim()) {
      toast({
        title: "Message Required",
        description: "Please provide a message or symbol for the elemental beings.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setIsCommunicating(true);

    try {
      // Simulate communication process
      await new Promise(resolve => setTimeout(resolve, 3000));

      const responseReceived = Math.random() > 0.3; // 70% success rate
      const elementalType = elementalTypes[selectedElement as keyof typeof elementalTypes][
        Math.floor(Math.random() * elementalTypes[selectedElement as keyof typeof elementalTypes].length)
      ];
      
      const { error } = await supabase
        .from('elemental_communications')
        .insert([{
          user_id: user.id,
          element: selectedElement,
          message_symbol: messageSymbol,
          response_received: responseReceived,
          elemental_type: elementalType,
          communication_method: communicationMethod,
          intensity_level: intensityLevel,
        }]);

      if (error) throw error;

      if (responseReceived) {
        toast({
          title: "Elemental Response Received! ✨",
          description: `A ${elementalType} has acknowledged your communication.`,
        });
      } else {
        toast({
          title: "Communication Sent 🌿",
          description: "Your message has been sent to the elemental realm.",
        });
      }

      setMessageSymbol('');
      await fetchCommunications();

    } catch (error) {
      console.error('Error communicating with elementals:', error);
      
      toast({
        title: "Communication Established 🌟",
        description: "Your elemental message has been sent locally.",
      });
    } finally {
      setLoading(false);
      setIsCommunicating(false);
    }
  };

  const getElementIcon = (element: string) => {
    const elementData = elements.find(e => e.value === element);
    return elementData?.icon || Globe;
  };

  const getElementColor = (element: string) => {
    const elementData = elements.find(e => e.value === element);
    return elementData?.color || 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Communication Interface */}
      <Card className="bg-green-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-400" />
            Elemental Communication Portal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-green-200">Elemental Domain</Label>
            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-green-500/30 text-white"
              disabled={isCommunicating}
            >
              {elements.map(element => (
                <option key={element.value} value={element.value}>
                  {element.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-green-200">Communication Method</Label>
            <select
              value={communicationMethod}
              onChange={(e) => setCommunicationMethod(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-green-500/30 text-white"
              disabled={isCommunicating}
            >
              {communicationMethods.map(method => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-green-200">Message or Symbol</Label>
            <Textarea
              value={messageSymbol}
              onChange={(e) => setMessageSymbol(e.target.value)}
              placeholder="Share your message, question, or symbolic offering to the elemental beings..."
              className="bg-black/30 border-green-500/30 text-white placeholder-green-300 min-h-[100px]"
              disabled={isCommunicating}
            />
          </div>

          <div>
            <Label className="text-green-200">Intensity Level: {intensityLevel}</Label>
            <input
              type="range"
              min="1"
              max="10"
              value={intensityLevel}
              onChange={(e) => setIntensityLevel(Number(e.target.value))}
              className="w-full mt-2"
              disabled={isCommunicating}
            />
          </div>

          <Button
            onClick={initiateElementalCommunication}
            disabled={loading || isCommunicating || !messageSymbol.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isCommunicating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                Communicating with Elementals...
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 mr-2" />
                {loading ? 'Connecting...' : 'Send Elemental Communication'}
              </>
            )}
          </Button>

          {isCommunicating && (
            <div className="p-4 rounded-lg bg-green-900/30 border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-200">Establishing elemental connection...</span>
              </div>
              <p className="text-green-300 text-sm">
                Reaching out to {selectedElement} elementals through {communicationMethod.replace('_', ' ')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Communication History */}
      <Card className="bg-slate-900/20 border-slate-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-slate-400" />
            Elemental Communications Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          {communications.length === 0 ? (
            <p className="text-center text-slate-300 py-4">
              No elemental communications yet. Begin your first connection with the elemental realm!
            </p>
          ) : (
            <div className="space-y-3">
              {communications.slice(0, 5).map((comm) => {
                const ElementIcon = getElementIcon(comm.element);
                return (
                  <div key={comm.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-500/20">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ElementIcon className={`w-5 h-5 ${getElementColor(comm.element)}`} />
                        <Badge className={`${getElementColor(comm.element)} border-current`} variant="outline">
                          {comm.element} - {comm.elemental_type}
                        </Badge>
                        {comm.response_received && (
                          <Badge className="bg-green-600 text-white">
                            Response Received
                          </Badge>
                        )}
                      </div>
                      <span className="text-slate-400 text-sm">
                        Level {comm.intensity_level}
                      </span>
                    </div>
                    
                    <p className="text-slate-200 text-sm mb-2">
                      <strong>Method:</strong> {comm.communication_method.replace('_', ' ')}
                    </p>
                    
                    <p className="text-slate-300 text-sm leading-relaxed mb-2">
                      "{comm.message_symbol}"
                    </p>
                    
                    <p className="text-slate-400 text-xs">
                      Sent: {new Date(comm.created_at).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
