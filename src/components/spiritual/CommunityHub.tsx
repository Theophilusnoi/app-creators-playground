
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/components/auth/AuthProvider';
import { Users, Calendar, Trophy, Star, Plus, Clock, Heart, ArrowLeft } from "lucide-react";
import { ChallengeDetailView } from './ChallengeDetailView';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty_level: string;
  duration_days: number;
  max_participants: number;
  reward_points: number;
  featured: boolean;
  is_active: boolean;
  current_participants?: number;
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

interface UserParticipation {
  id: string;
  challenge_id: string;
  current_day: number;
  is_completed: boolean;
  streak_days: number;
  total_points_earned: number;
}

export const CommunityHub = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [userParticipations, setUserParticipations] = useState<UserParticipation[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCommunityData();
    }
  }, [user]);

  const loadCommunityData = async () => {
    setLoading(true);
    
    try {
      // Mock challenges data since the table doesn't exist in the database
      const mockChallenges: Challenge[] = [
        {
          id: '1',
          title: '21-Day Mindfulness Journey',
          description: 'Transform your daily routine with consistent mindfulness practice',
          type: 'meditation',
          difficulty_level: 'beginner',
          duration_days: 21,
          max_participants: 100,
          reward_points: 500,
          featured: true,
          is_active: true,
          current_participants: 45
        },
        {
          id: '2',
          title: 'Shadow Work Integration',
          description: 'Deep dive into shadow work for profound personal transformation',
          type: 'shadow_work',
          difficulty_level: 'advanced',
          duration_days: 30,
          max_participants: 50,
          reward_points: 1000,
          featured: false,
          is_active: true,
          current_participants: 23
        },
        {
          id: '3',
          title: 'Chakra Balancing Mastery',
          description: 'Learn to balance and activate your energy centers',
          type: 'energy_work',
          difficulty_level: 'intermediate',
          duration_days: 14,
          max_participants: 75,
          reward_points: 750,
          featured: true,
          is_active: true,
          current_participants: 67
        }
      ];

      // Mock user participations
      const mockParticipations: UserParticipation[] = [
        {
          id: '1',
          challenge_id: '1',
          current_day: 7,
          is_completed: false,
          streak_days: 6,
          total_points_earned: 150
        }
      ];

      setChallenges(mockChallenges);
      setUserParticipations(mockParticipations);

      // Mock circles data
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
        }
      ];

      setCircles(mockCircles);
      setLiveEvents(mockEvents);
      
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinChallenge = async (challengeId: string) => {
    if (!user) return;

    try {
      // Check if user is already participating
      const existingParticipation = userParticipations.find(p => p.challenge_id === challengeId);
      if (existingParticipation) return;

      // Create new participation (mock since table doesn't exist)
      const newParticipation: UserParticipation = {
        id: Date.now().toString(),
        challenge_id: challengeId,
        current_day: 1,
        is_completed: false,
        streak_days: 0,
        total_points_earned: 0
      };

      // Update local state
      setUserParticipations(prev => [...prev, newParticipation]);
      
      // Update participant count
      setChallenges(prev => 
        prev.map(c => 
          c.id === challengeId 
            ? { ...c, current_participants: (c.current_participants || 0) + 1 }
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
      console.log('Joining circle:', circleId);
      
      // Update local state for now
      setCircles(prev => 
        prev.map(circle => 
          circle.id === circleId 
            ? { ...circle, current_members: circle.current_members + 1 }
            : circle
        )
      );
    } catch (error) {
      console.error('Error joining circle:', error);
    }
  };

  const registerForEvent = async (eventId: string) => {
    if (!user) return;
    
    try {
      console.log('Registering for event:', eventId);
      
      // Update local state for now
      setLiveEvents(prev => 
        prev.map(event => 
          event.id === eventId 
            ? { ...event, current_attendees: event.current_attendees + 1 }
            : event
        )
      );
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const isUserParticipating = (challengeId: string) => {
    return userParticipations.some(p => p.challenge_id === challengeId);
  };

  const getUserParticipation = (challengeId: string) => {
    return userParticipations.find(p => p.challenge_id === challengeId);
  };

  const handleChallengeClick = (challenge: Challenge) => {
    const participation = getUserParticipation(challenge.id);
    if (participation) {
      setSelectedChallenge(challenge);
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

  // Show challenge detail view if a challenge is selected
  if (selectedChallenge) {
    const participation = getUserParticipation(selectedChallenge.id);
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => setSelectedChallenge(null)}
          variant="ghost" 
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Community
        </Button>
        <ChallengeDetailView 
          challenge={selectedChallenge} 
          participation={participation}
          onUpdate={loadCommunityData}
        />
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
            {challenges.map((challenge) => {
              const isParticipating = isUserParticipating(challenge.id);
              const participation = getUserParticipation(challenge.id);
              
              return (
                <Card 
                  key={challenge.id} 
                  className={`bg-black/30 border-purple-500/30 backdrop-blur-sm transition-all duration-200 ${
                    isParticipating ? 'cursor-pointer hover:bg-black/40' : ''
                  }`}
                  onClick={() => isParticipating ? handleChallengeClick(challenge) : undefined}
                >
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

                      {isParticipating ? (
                        <div className="space-y-2">
                          {participation && (
                            <div className="text-sm text-purple-200">
                              Day {participation.current_day} of {challenge.duration_days}
                            </div>
                          )}
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChallengeClick(challenge);
                            }}
                            className="w-full bg-green-600 hover:bg-green-700"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Continue Journey
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            joinChallenge(challenge.id);
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Join Challenge
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
