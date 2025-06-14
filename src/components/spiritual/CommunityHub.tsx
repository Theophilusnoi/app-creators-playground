
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/components/auth/AuthProvider';
import { Users, Calendar, Trophy, Star, Plus, Clock, Heart } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty_level: string;
  duration_days: number;
  current_participants: number;
  max_participants: number;
  reward_points: number;
  featured: boolean;
  start_date: string;
  end_date: string;
}

interface Circle {
  id: string;
  name: string;
  description: string;
  type: string;
  current_members: number;
  max_members: number;
  is_private: boolean;
  tags: string[];
}

interface LiveEvent {
  id: string;
  title: string;
  description: string;
  event_type: string;
  instructor_name: string;
  scheduled_at: string;
  duration_minutes: number;
  current_attendees: number;
  max_attendees: number;
  is_premium: boolean;
}

export const CommunityHub = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [userChallenges, setUserChallenges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCommunityData();
    }
  }, [user]);

  const loadCommunityData = async () => {
    setLoading(true);
    
    try {
      // Mock data for demonstration - replace with actual API calls when types are updated
      const mockChallenges: Challenge[] = [
        {
          id: '1',
          title: '21-Day Mindfulness Challenge',
          description: 'Build a daily mindfulness practice with guided meditations and community support.',
          type: 'group',
          difficulty_level: 'beginner',
          duration_days: 21,
          current_participants: 156,
          max_participants: 500,
          reward_points: 100,
          featured: true,
          start_date: '2024-01-01',
          end_date: '2024-01-21'
        },
        {
          id: '2',
          title: 'Compassion Cultivation',
          description: 'Develop loving-kindness and compassion through daily practices and reflection.',
          type: 'group',
          difficulty_level: 'intermediate',
          duration_days: 14,
          current_participants: 89,
          max_participants: 200,
          reward_points: 75,
          featured: false,
          start_date: '2024-01-15',
          end_date: '2024-01-29'
        },
        {
          id: '3',
          title: 'Inner Peace Journey',
          description: 'Advanced practices for finding deep inner stillness and peace.',
          type: 'individual',
          difficulty_level: 'advanced',
          duration_days: 30,
          current_participants: 34,
          max_participants: 100,
          reward_points: 150,
          featured: true,
          start_date: '2024-02-01',
          end_date: '2024-03-02'
        }
      ];

      const mockCircles: Circle[] = [
        {
          id: '1',
          name: 'Meditation for Parents',
          description: 'A supportive community for parents seeking mindfulness amidst the beautiful chaos of family life.',
          type: 'support_group',
          current_members: 45,
          max_members: 50,
          is_private: false,
          tags: ['parenting', 'mindfulness', 'support']
        },
        {
          id: '2',
          name: 'Spiritual Book Club',
          description: 'Monthly discussions on transformative spiritual texts and teachings.',
          type: 'learning_group',
          current_members: 28,
          max_members: 30,
          is_private: false,
          tags: ['books', 'discussion', 'wisdom']
        },
        {
          id: '3',
          name: 'Anxiety & Mindfulness',
          description: 'Safe space for those using mindfulness to navigate anxiety and stress.',
          type: 'support_group',
          current_members: 67,
          max_members: 100,
          is_private: true,
          tags: ['anxiety', 'support', 'healing']
        }
      ];

      const mockEvents: LiveEvent[] = [
        {
          id: '1',
          title: 'Global Peace Meditation',
          description: 'Join thousands worldwide in a synchronized meditation for global healing.',
          event_type: 'meditation',
          instructor_name: 'Sarah Chen',
          scheduled_at: '2024-01-20T18:00:00Z',
          duration_minutes: 45,
          current_attendees: 234,
          max_attendees: 1000,
          is_premium: false
        },
        {
          id: '2',
          title: 'Shadow Work Workshop',
          description: 'Explore and integrate your shadow self with compassionate guidance.',
          event_type: 'workshop',
          instructor_name: 'Dr. Michael Rivera',
          scheduled_at: '2024-01-25T20:00:00Z',
          duration_minutes: 90,
          current_attendees: 45,
          max_attendees: 50,
          is_premium: true
        },
        {
          id: '3',
          title: 'Q&A with Spiritual Teacher',
          description: 'Ask your questions about spiritual practice and awakening.',
          event_type: 'qna',
          instructor_name: 'Lama Tenzin',
          scheduled_at: '2024-01-30T19:00:00Z',
          duration_minutes: 60,
          current_attendees: 89,
          max_attendees: 200,
          is_premium: false
        }
      ];

      setChallenges(mockChallenges);
      setCircles(mockCircles);
      setLiveEvents(mockEvents);
      setUserChallenges(['1']); // Mock user participation
      
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinChallenge = async (challengeId: string) => {
    if (!user) return;

    try {
      // Mock join action
      setUserChallenges(prev => [...prev, challengeId]);
      
      // Update participant count
      setChallenges(prev => 
        prev.map(c => 
          c.id === challengeId 
            ? { ...c, current_participants: c.current_participants + 1 }
            : c
        )
      );

    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  const joinCircle = async (circleId: string) => {
    if (!user) return;

    try {
      // Mock join action
      setCircles(prev => 
        prev.map(c => 
          c.id === circleId 
            ? { ...c, current_members: c.current_members + 1 }
            : c
        )
      );

    } catch (error) {
      console.error('Error joining circle:', error);
    }
  };

  const registerForEvent = async (eventId: string) => {
    if (!user) return;

    try {
      // Mock registration
      setLiveEvents(prev => 
        prev.map(e => 
          e.id === eventId 
            ? { ...e, current_attendees: e.current_attendees + 1 }
            : e
        )
      );

    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-orange-500';
      case 'master': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading community...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Community Hub</h2>
        <p className="text-purple-200">Connect, grow, and transform together</p>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/30">
          <TabsTrigger value="challenges" className="data-[state=active]:bg-purple-600">
            <Trophy className="w-4 h-4 mr-2" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="circles" className="data-[state=active]:bg-purple-600">
            <Users className="w-4 h-4 mr-2" />
            Circles
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-purple-600">
            <Calendar className="w-4 h-4 mr-2" />
            Live Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-lg">{challenge.title}</CardTitle>
                    {challenge.featured && (
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={`${getDifficultyColor(challenge.difficulty_level)} text-white border-0`}>
                      {challenge.difficulty_level}
                    </Badge>
                    <Badge variant="outline" className="border-purple-400 text-purple-200">
                      {challenge.duration_days} days
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200 text-sm mb-4">{challenge.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Participants</span>
                      <span className="text-white">
                        {challenge.current_participants}/{challenge.max_participants || '∞'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Reward</span>
                      <span className="text-yellow-400">{challenge.reward_points} points</span>
                    </div>

                    {userChallenges.includes(challenge.id) ? (
                      <Button disabled className="w-full bg-green-600">
                        <Heart className="w-4 h-4 mr-2" />
                        Joined
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => joinChallenge(challenge.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Join Challenge
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="circles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {circles.map((circle) => (
              <Card key={circle.id} className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg">{circle.name}</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    {circle.tags?.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-purple-400 text-purple-200 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200 text-sm mb-4">{circle.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Members</span>
                      <span className="text-white">
                        {circle.current_members}/{circle.max_members}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Type</span>
                      <span className="text-purple-200">{circle.type.replace('_', ' ')}</span>
                    </div>

                    <Button 
                      onClick={() => joinCircle(circle.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Join Circle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveEvents.map((event) => (
              <Card key={event.id} className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg">{event.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-blue-400 text-blue-200">
                      {event.event_type}
                    </Badge>
                    {event.is_premium && (
                      <Badge variant="outline" className="border-yellow-400 text-yellow-200">
                        Premium
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200 text-sm mb-4">{event.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Instructor</span>
                      <span className="text-white">{event.instructor_name}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Date & Time</span>
                      <span className="text-white">
                        {new Date(event.scheduled_at).toLocaleDateString()} at{' '}
                        {new Date(event.scheduled_at).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Duration</span>
                      <span className="text-white">{event.duration_minutes} minutes</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Attendees</span>
                      <span className="text-white">
                        {event.current_attendees}/{event.max_attendees || '∞'}
                      </span>
                    </div>

                    <Button 
                      onClick={() => registerForEvent(event.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
