
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Globe, Flame, Droplets, Wind, Mountain, Sparkles2 } from 'lucide-react';

interface ElementalCommunication {
  id: string;
  element: string;
  message_symbol: string;
  response_received: boolean;
  elemental_type: string;
  communication_method: string;
  intensity_level: number;
  location_data: any;
  created_at: string;
}

export const ElementalChannels = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedElement, setSelectedElement] = useState('earth');
  const [messageSymbol, setMessageSymbol] = useState('');
  const [communicationMethod, setCommunicationMethod] = useState('intention');
  const [isChanneling, setIsChanneling] = useState(false);
  const [elementalResponse, setElementalResponse] = useState('');
  const [communications, setCommunications] = useState<ElementalCommunication[]>([]);
  const [loading, setLoading] = useState(false);

  const elements = [
    {
      id: 'earth',
      name: 'Earth',
      icon: Mountain,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500/30',
      description: 'Grounding, stability, manifestation, abundance'
    },
    {
      id: 'water',
      name: 'Water',
      icon: Droplets,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500/30',
      description: 'Emotions, intuition, healing, flow'
    },
    {
      id: 'fire',
      name: 'Fire',
      icon: Flame,
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-500/30',
      description: 'Transformation, passion, energy, purification'
    },
    {
      id: 'air',
      name: 'Air',
      icon: Wind,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-500/30',
      description: 'Mental clarity, communication, freedom, inspiration'
    },
    {
      id: 'ether',
      name: 'Ether',
      icon: Sparkles2,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-500/30',
      description: 'Spirit, consciousness, divine connection, transcendence'
    }
  ];

  const communicationMethods = [
    { value: 'intention', label: 'Pure Intention' },
    { value: 'meditation', label: 'Elemental Meditation' },
    { value: 'ritual', label: 'Sacred Ritual' },
    { value: 'offering', label: 'Nature Offering' },
    { value: 'visualization', label: 'Symbol Visualization' },
    { value: 'chanting', label: 'Elemental Chanting' }
  ];

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
        description: "Please log in to communicate with elemental consciousness.",
        variant: "destructive"
      });
      return;
    }

    if (!messageSymbol.trim()) {
      toast({
        title: "Message Symbol Required",
        description: "Please provide a symbol or intention for the elemental beings.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setIsChanneling(true);

    try {
      // Simulate elemental communication process
      await new Promise(resolve => setTimeout(resolve, 2500));

      const response = generateElementalResponse(selectedElement, messageSymbol);
      const responseReceived = Math.random() > 0.2; // 80% response rate
      
      // Get user's approximate location (simplified)
      const locationData = await getCurrentLocation();
      
      const { error } = await supabase
        .from('elemental_communications')
        .insert([{
          user_id: user.id,
          element: selectedElement,
          message_symbol: messageSymbol,
          response_received: responseReceived,
          elemental_type: getElementalType(selectedElement),
          communication_method: communicationMethod,
          intensity_level: Math.floor(Math.random() * 10) + 1,
          location_data: locationData
        }]);

      if (error) throw error;

      if (responseReceived) {
        setElementalResponse(response);
        toast({
          title: "Elemental Response Received! 🌿",
          description: `The ${selectedElement} elementals have responded to your call.`,
        });
      } else {
        toast({
          title: "Message Sent ✨",
          description: `Your intention has been received by the ${selectedElement} realm.`,
        });
      }

      setMessageSymbol('');
      await fetchCommunications();

    } catch (error) {
      console.error('Error communicating with elementals:', error);
      
      // Still provide response locally
      const response = generateElementalResponse(selectedElement, messageSymbol);
      setElementalResponse(response);
      
      toast({
        title: "Elemental Connection Established 🌱",
        description: "Communication recorded in your spiritual journal.",
      });
    } finally {
      setLoading(false);
      setIsChanneling(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      return new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
              });
            },
            () => {
              resolve({ latitude: null, longitude: null, accuracy: null });
            }
          );
        } else {
          resolve({ latitude: null, longitude: null, accuracy: null });
        }
      });
    } catch (error) {
      return { latitude: null, longitude: null, accuracy: null };
    }
  };

  const getElementalType = (element: string): string => {
    const types = {
      earth: ['Gnome', 'Dryad', 'Forest Guardian', 'Mountain Spirit'][Math.floor(Math.random() * 4)],
      water: ['Undine', 'Water Nymph', 'Ocean Spirit', 'River Keeper'][Math.floor(Math.random() * 4)],
      fire: ['Salamander', 'Fire Spirit', 'Phoenix Being', 'Solar Guardian'][Math.floor(Math.random() * 4)],
      air: ['Sylph', 'Wind Spirit', 'Cloud Dancer', 'Sky Guardian'][Math.floor(Math.random() * 4)],
      ether: ['Cosmic Being', 'Star Guardian', 'Void Walker', 'Light Keeper'][Math.floor(Math.random() * 4)]
    };
    return types[element as keyof typeof types] || 'Unknown';
  };

  const generateElementalResponse = (element: string, message: string): string => {
    const responses = {
      earth: [
        `🌱 "Your roots run deep, child of Earth. We feel your intention in the soil beneath your feet. Ground yourself in our strength and let abundance flow through you like nutrients through rich earth."`,
        `🌿 "The stones whisper your name. We, the guardians of stability, offer you our unwavering support. Plant your dreams like seeds—we will help them grow strong."`,
        `🍃 "From the mountains and forests, we send you our blessing. Your message resonates through every grain of sand and leaf of grass. Be patient like the ancient trees."`
      ],
      water: [
        `🌊 "Your emotions flow to us like tributaries to the great ocean. We cleanse what no longer serves you and offer the gift of emotional healing through our sacred waters."`,
        `💧 "The tears of joy and sorrow both nourish the earth. We, the water keepers, remind you that all feelings are temporary—flow with them rather than resist."`,
        `🌙 "Under the moon's reflection on still waters, we hear your call. Let intuition be your compass, and trust the tides of change that are coming."`
      ],
      fire: [
        `🔥 "Your passion burns bright and calls to our flames! We offer you the sacred fire of transformation. What you wish to release, we will burn away with love."`,
        `⚡ "Lightning dances in your aura! The fire spirits see your inner spark and fan it into a blazing light. Use our energy to ignite your highest purpose."`,
        `☀️ "From the solar realm, we send you courage and vitality. Your message rides on our flames across dimensions. Step boldly into your power!"`
      ],
      air: [
        `🌪️ "Your thoughts take wing on our currents! We, the air spirits, carry your intentions across vast distances. Breathe deeply and let new ideas fill your mind."`,
        `🕊️ "Freedom calls to you through our whispered winds. We bring clarity to confusion and fresh perspective to old problems. Let go and let us lift you higher."`,
        `💨 "Messages travel swiftly on our breath. The sylphs dance around you, clearing mental fog and opening pathways for inspiration to enter."`
      ],
      ether: [
        `✨ "From the realm beyond form, we acknowledge your spirit's call. The cosmic beings weave your intention into the fabric of reality itself."`,
        `🌌 "Starlight carries your message to the furthest galaxies. We are the bridge between worlds, and through us, all possibilities exist. Trust in the divine plan."`,
        `⭐ "The void speaks in silence, and in that silence, all answers reside. Your connection to the eternal grows stronger with each breath. You are never alone."`
      ]
    };
    
    const elementResponses = responses[element as keyof typeof responses];
    return elementResponses[Math.floor(Math.random() * elementResponses.length)];
  };

  const selectedElementData = elements.find(e => e.id === selectedElement);

  return (
    <div className="space-y-6">
      {/* Element Selection */}
      <Card className="bg-slate-900/20 border-slate-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-slate-400" />
            Choose Your Elemental Channel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {elements.map((element) => {
              const Icon = element.icon;
              return (
                <Button
                  key={element.id}
                  variant={selectedElement === element.id ? "default" : "outline"}
                  onClick={() => setSelectedElement(element.id)}
                  className={`h-20 flex flex-col items-center gap-2 ${
                    selectedElement === element.id 
                      ? `${element.bgColor} ${element.borderColor}` 
                      : 'border-gray-600'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${element.color}`} />
                  <span className="text-xs font-medium">{element.name}</span>
                </Button>
              );
            })}
          </div>
          
          {selectedElementData && (
            <div className={`mt-4 p-3 rounded-lg ${selectedElementData.bgColor} ${selectedElementData.borderColor} border`}>
              <p className="text-gray-200 text-sm">
                <strong>{selectedElementData.name}:</strong> {selectedElementData.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Communication Interface */}
      <Card className={`${selectedElementData?.bgColor} ${selectedElementData?.borderColor} border`}>
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {selectedElementData && <selectedElementData.icon className={`w-5 h-5 ${selectedElementData.color}`} />}
            Elemental Communication Portal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-200">Communication Method</Label>
            <select
              value={communicationMethod}
              onChange={(e) => setCommunicationMethod(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-gray-500/30 text-white"
              disabled={isChanneling}
            >
              {communicationMethods.map(method => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-gray-200">Message Symbol or Intention</Label>
            <Textarea
              value={messageSymbol}
              onChange={(e) => setMessageSymbol(e.target.value)}
              placeholder={`What would you like to communicate to the ${selectedElement} elementals?`}
              className="bg-black/30 border-gray-500/30 text-white placeholder-gray-400"
              disabled={isChanneling}
              rows={3}
            />
          </div>

          <Button
            onClick={initiateElementalCommunication}
            disabled={loading || isChanneling || !messageSymbol.trim()}
            className={`w-full bg-gradient-to-r ${
              selectedElement === 'earth' ? 'from-green-600 to-emerald-600' :
              selectedElement === 'water' ? 'from-blue-600 to-cyan-600' :
              selectedElement === 'fire' ? 'from-red-600 to-orange-600' :
              selectedElement === 'air' ? 'from-yellow-600 to-amber-600' :
              'from-purple-600 to-indigo-600'
            }`}
          >
            {isChanneling ? (
              <>
                <Sparkles2 className="w-4 h-4 mr-2 animate-pulse" />
                Channeling {selectedElementData?.name} Energy...
              </>
            ) : (
              <>
                {selectedElementData && <selectedElementData.icon className="w-4 h-4 mr-2" />}
                {loading ? 'Connecting...' : `Connect with ${selectedElementData?.name} Elementals`}
              </>
            )}
          </Button>

          {isChanneling && (
            <div className={`p-4 rounded-lg ${selectedElementData?.bgColor} border ${selectedElementData?.borderColor}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  selectedElement === 'earth' ? 'bg-green-400' :
                  selectedElement === 'water' ? 'bg-blue-400' :
                  selectedElement === 'fire' ? 'bg-red-400' :
                  selectedElement === 'air' ? 'bg-yellow-400' :
                  'bg-purple-400'
                }`} />
                <span className="text-gray-200">Opening elemental channel...</span>
              </div>
              <p className="text-gray-300 text-sm">
                Connecting with {selectedElementData?.name} consciousness through {communicationMethod}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Elemental Response */}
      {elementalResponse && (
        <Card className="bg-emerald-900/20 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles2 className="w-5 h-5 text-emerald-400" />
              Elemental Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-emerald-800/30 border-l-4 border-emerald-400">
              <p className="text-emerald-100 leading-relaxed">
                {elementalResponse}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Communication History */}
      <Card className="bg-gray-900/20 border-gray-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-400" />
            Elemental Communication Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          {communications.length === 0 ? (
            <p className="text-center text-gray-300 py-4">
              No elemental communications yet. Start your first conversation with nature!
            </p>
          ) : (
            <div className="space-y-3">
              {communications.slice(0, 5).map((comm) => {
                const elementData = elements.find(e => e.id === comm.element);
                return (
                  <div key={comm.id} className={`p-4 rounded-lg ${elementData?.bgColor} border ${elementData?.borderColor}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${elementData?.color} border-current`} variant="outline">
                          {elementData?.name}
                        </Badge>
                        <Badge variant="outline" className="text-gray-300">
                          {comm.elemental_type}
                        </Badge>
                        {comm.response_received && (
                          <Badge className="bg-green-600 text-white">
                            Response
                          </Badge>
                        )}
                      </div>
                      <span className="text-gray-400 text-sm">
                        Level {comm.intensity_level}
                      </span>
                    </div>
                    
                    <p className="text-gray-200 text-sm mb-2">
                      <strong>Message:</strong> {comm.message_symbol}
                    </p>
                    
                    <p className="text-gray-400 text-xs">
                      {new Date(comm.created_at).toLocaleString()} • {comm.communication_method}
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
