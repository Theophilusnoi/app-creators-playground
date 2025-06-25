
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Star, Users, Shield } from 'lucide-react';

interface GalacticSession {
  id: string;
  archetype_contacted: string;
  communication_method: string;
  soul_mission_insights: string;
  guidance_received: string;
  free_will_confirmed: boolean;
  session_duration: number;
  created_at: string;
}

export const GalacticCouncilInterface = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedArchetype, setSelectedArchetype] = useState('Pleiadian Healer');
  const [communicationMethod, setCommunicationMethod] = useState('telepathic_simulation');
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentGuidance, setCurrentGuidance] = useState('');
  const [soulMissionInsight, setSoulMissionInsight] = useState('');
  const [sessions, setSessions] = useState<GalacticSession[]>([]);
  const [loading, setLoading] = useState(false);

  const galacticArchetypes = [
    { 
      name: 'Pleiadian Healer', 
      domain: 'Emotional Transmutation',
      color: 'text-pink-400',
      description: 'Masters of heart healing and emotional alchemy'
    },
    { 
      name: 'Sirian Architect', 
      domain: 'Sacred Geometry',
      color: 'text-blue-400',
      description: 'Builders of cosmic structures and reality frameworks'
    },
    { 
      name: 'Andromedan Counselor', 
      domain: 'Soul Purpose',
      color: 'text-purple-400',
      description: 'Guides for soul mission clarity and life direction'
    },
    { 
      name: 'Arcturian Elder', 
      domain: 'Consciousness Evolution',
      color: 'text-indigo-400',
      description: 'Teachers of advanced consciousness technologies'
    },
    { 
      name: 'Lyran Guardian', 
      domain: 'Soul Freedom',
      color: 'text-orange-400',
      description: 'Protectors of free will and sovereign choice'
    },
    { 
      name: 'Orion Teacher', 
      domain: 'Integration',
      color: 'text-green-400',
      description: 'Masters of balancing light and shadow aspects'
    }
  ];

  const communicationMethods = [
    { value: 'telepathic_simulation', label: 'Telepathic Simulation' },
    { value: 'light_language_channeling', label: 'Light Language Channeling' },
    { value: 'frequency_attunement', label: 'Frequency Attunement' },
    { value: 'dream_state_contact', label: 'Dream State Contact' },
    { value: 'meditation_interface', label: 'Meditation Interface' }
  ];

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      // Use mock data since galactic_council_sessions table doesn't exist
      const mockSessions: GalacticSession[] = [
        {
          id: '1',
          archetype_contacted: 'Pleiadian Healer',
          communication_method: 'telepathic_simulation',
          soul_mission_insights: 'Your soul mission involves anchoring heart-centered healing on Earth. You are here to transform pain into wisdom.',
          guidance_received: 'Your heart is the gateway to healing multitudes. Every wound you transform becomes medicine for the collective.',
          free_will_confirmed: true,
          session_duration: 25,
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      setSessions(mockSessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const initiateCouncilContact = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to contact the Galactic Council.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setIsConnecting(true);

    try {
      // Simulate council contact process
      await new Promise(resolve => setTimeout(resolve, 3500));

      const sessionDuration = Math.floor(Math.random() * 30) + 10; // 10-40 minutes
      const guidance = generateGuidance(selectedArchetype);
      const missionInsight = generateSoulMission(selectedArchetype);
      
      // Create new session locally
      const newSession: GalacticSession = {
        id: Date.now().toString(),
        archetype_contacted: selectedArchetype,
        communication_method: communicationMethod,
        soul_mission_insights: missionInsight,
        guidance_received: guidance,
        free_will_confirmed: true,
        session_duration: sessionDuration,
        created_at: new Date().toISOString()
      };

      setSessions(prev => [newSession, ...prev]);
      setCurrentGuidance(guidance);
      setSoulMissionInsight(missionInsight);
      
      toast({
        title: "Council Connection Established! 🌟",
        description: `${selectedArchetype} has shared guidance with you`,
      });

    } catch (error) {
      console.error('Error contacting council:', error);
      
      // Still provide guidance locally
      const guidance = generateGuidance(selectedArchetype);
      const missionInsight = generateSoulMission(selectedArchetype);
      setCurrentGuidance(guidance);
      setSoulMissionInsight(missionInsight);
      
      toast({
        title: "Galactic Transmission Received ✨",
        description: "Council guidance integrated locally.",
      });
    } finally {
      setLoading(false);
      setIsConnecting(false);
    }
  };

  const generateGuidance = (archetype: string): string => {
    const guidanceMap: Record<string, string[]> = {
      'Pleiadian Healer': [
        "Your heart is the gateway to healing multitudes. Every wound you transform becomes medicine for the collective. Trust the process of emotional alchemy unfolding within you.",
        "The tears you've shed are sacred waters that will nourish new growth. Your sensitivity is not weakness—it's your superpower for healing dimensional rifts in the heart chakra.",
        "You came here to demonstrate unconditional love in action. Your capacity to hold space for others' pain while maintaining your center is a rare gift to humanity."
      ],
      'Sirian Architect': [
        "Reality is malleable through precise geometric intention. You are learning to build bridges between dimensions using sacred mathematical principles embedded in your DNA.",
        "The structures you create—whether physical, mental, or spiritual—must serve the highest good. Your blueprints are being downloaded from the Sirian libraries of cosmic architecture.",
        "Ground the star knowledge through practical application. Your mission involves translating cosmic principles into tangible forms that support Earth's evolution."
      ],
      'Andromedan Counselor': [
        "Your soul chose this incarnation to master the art of sovereign choice. Every decision you make ripples across multiple timelines, creating new pathways for conscious evolution.",
        "The confusion you sometimes feel about your purpose is actually the process of integrating multiple soul aspects. You are a bridge between different galactic consciousnesses.",
        "Trust the inner knowing that guides you beyond logical understanding. Your intuition is connected to the Andromedan Council of Elders who oversee soul evolution."
      ],
      'Arcturian Elder': [
        "You are being prepared for advanced consciousness technologies that will emerge on Earth. Your nervous system is upgrading to handle higher dimensional frequencies.",
        "The downloads you receive during meditation are actual light codes being transmitted from the Arcturian mothership. Integration happens gradually to preserve your human vessel.",
        "Your role is to anchor cosmic consciousness in earthly form. You are a living bridge between the Arcturian realm and human evolution."
      ],
      'Lyran Guardian': [
        "Your fierce independence is a cosmic gift. You came here to demonstrate that true spirituality honors individual sovereignty while serving the collective good.",
        "The rebellious energy you carry is actually freedom frequency. Use it to break through limitations and inspire others to claim their authentic power.",
        "You are a guardian of free will. Your mission involves protecting the right of all beings to choose their own evolutionary path without manipulation or coercion."
      ],
      'Orion Teacher': [
        "You have mastered both light and shadow in previous incarnations. Now you teach integration through your example of balanced wisdom and authentic expression.",
        "The challenges you face are opportunities to demonstrate how to navigate polarity with grace. Your students are watching how you handle life's complexities.",
        "Your teaching comes through embodiment rather than words. You show others how to embrace all aspects of self while maintaining alignment with highest truth."
      ]
    };

    const messages = guidanceMap[archetype] || guidanceMap['Pleiadian Healer'];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const generateSoulMission = (archetype: string): string => {
    const missionMap: Record<string, string[]> = {
      'Pleiadian Healer': [
        "Your soul mission involves anchoring heart-centered healing on Earth. You are here to transform pain into wisdom and fear into love through your compassionate presence."
      ],
      'Sirian Architect': [
        "You are tasked with building new structures for humanity's evolution. This includes physical healing centers, educational systems, and communities based on sacred geometry principles."
      ],
      'Andromedan Counselor': [
        "Your mission is to guide souls through the awakening process. You help others remember their galactic origins and integrate their multidimensional nature."
      ],
      'Arcturian Elder': [
        "You are here to prepare humanity for contact with benevolent galactic civilizations. Your work involves raising collective consciousness and technological integration."
      ],
      'Lyran Guardian': [
        "Your soul mission involves protecting and restoring divine feminine and masculine energies on Earth. You champion authentic expression and sovereign choice."
      ],
      'Orion Teacher': [
        "You teach integration of all aspects of self—light and shadow, human and divine. Your mission helps others embrace their complexity while maintaining spiritual alignment."
      ]
    };

    const missions = missionMap[archetype] || missionMap['Pleiadian Healer'];
    return missions[0];
  };

  const selectedArchetypeData = galacticArchetypes.find(a => a.name === selectedArchetype);

  return (
    <div className="space-y-6">
      {/* Council Interface */}
      <Card className="bg-indigo-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-indigo-400" />
            Galactic Council Interface
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-indigo-200">Council Archetype</Label>
            <select
              value={selectedArchetype}
              onChange={(e) => setSelectedArchetype(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-indigo-500/30 text-white"
              disabled={isConnecting}
            >
              {galacticArchetypes.map(archetype => (
                <option key={archetype.name} value={archetype.name}>
                  {archetype.name} - {archetype.domain}
                </option>
              ))}
            </select>
            
            {selectedArchetypeData && (
              <div className="mt-2 p-3 rounded-lg bg-indigo-900/30 border border-indigo-500/20">
                <p className="text-indigo-200 text-sm">
                  <strong className={selectedArchetypeData.color}>{selectedArchetypeData.name}:</strong> {selectedArchetypeData.description}
                </p>
              </div>
            )}
          </div>

          <div>
            <Label className="text-indigo-200">Communication Method</Label>
            <select
              value={communicationMethod}
              onChange={(e) => setCommunicationMethod(e.target.value)}
              className="w-full p-3 rounded bg-black/30 border border-indigo-500/30 text-white"
              disabled={isConnecting}
            >
              {communicationMethods.map(method => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 rounded-lg bg-amber-900/30 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-amber-200 font-medium">Free Will Protection</span>
            </div>
            <p className="text-amber-300 text-sm">
              This interface respects your sovereign choice. All guidance received supports your highest good while honoring your free will.
            </p>
          </div>

          <Button
            onClick={initiateCouncilContact}
            disabled={loading || isConnecting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {isConnecting ? (
              <>
                <Users className="w-4 h-4 mr-2 animate-pulse" />
                Establishing Council Contact...
              </>
            ) : (
              <>
                <Star className="w-4 h-4 mr-2" />
                {loading ? 'Connecting...' : `Contact ${selectedArchetype}`}
              </>
            )}
          </Button>

          {isConnecting && (
            <div className="p-4 rounded-lg bg-purple-900/30 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-200">Galactic transmission in progress...</span>
              </div>
              <p className="text-purple-300 text-sm">
                Connecting with {selectedArchetype} via {communicationMethod.replace('_', ' ')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Guidance */}
      {currentGuidance && (
        <Card className="bg-gold-900/20 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-gold-400" />
              Council Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-gold-800/30 border-l-4 border-gold-400 mb-4">
              <p className="text-gold-100 leading-relaxed italic">
                "{currentGuidance}"
              </p>
            </div>
            
            {soulMissionInsight && (
              <div className="p-4 rounded-lg bg-blue-900/30 border border-blue-500/30">
                <h4 className="text-blue-200 font-medium mb-2">Soul Mission Insight:</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {soulMissionInsight}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Session History */}
      <Card className="bg-slate-900/20 border-slate-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-400" />
            Council Contact History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-center text-slate-300 py-4">
              No council contacts yet. Begin your first galactic communication!
            </p>
          ) : (
            <div className="space-y-3">
              {sessions.slice(0, 5).map((session) => {
                const archetypeData = galacticArchetypes.find(a => a.name === session.archetype_contacted);
                return (
                  <div key={session.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-500/20">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${archetypeData?.color} border-current`} variant="outline">
                          {session.archetype_contacted}
                        </Badge>
                        <Badge className="bg-green-600 text-white">
                          {session.session_duration}m
                        </Badge>
                        {session.free_will_confirmed && (
                          <Badge className="bg-blue-600 text-white">
                            Protected
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-slate-200 text-sm leading-relaxed mb-2">
                      {session.guidance_received}
                    </p>
                    
                    <p className="text-slate-400 text-xs">
                      Contact: {new Date(session.created_at).toLocaleString()} • {session.communication_method.replace('_', ' ')}
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
