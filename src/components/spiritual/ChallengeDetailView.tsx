
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  Play, 
  CheckCircle2, 
  MessageCircle, 
  Calendar, 
  Target, 
  Award,
  Clock,
  Heart,
  Send
} from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  duration_days: number;
  reward_points: number;
}

interface UserParticipation {
  id: string;
  challenge_id: string;
  current_day: number;
  is_completed: boolean;
  streak_days: number;
  total_points_earned: number;
}

interface ChallengeContent {
  id: string;
  day_number: number;
  title: string;
  description: string;
  practice_type: string;
  content: any;
  duration_minutes: number;
}

interface DailyCheckIn {
  id: string;
  day_number: number;
  completed_at: string;
  practice_duration_minutes?: number;
  reflection_notes?: string;
  mood_before?: number;
  mood_after?: number;
}

interface Discussion {
  id: string;
  user_id: string;
  content: string;
  discussion_type: string;
  likes_count: number;
  created_at: string;
}

interface ChallengeDetailViewProps {
  challenge: Challenge;
  participation?: UserParticipation;
  onUpdate: () => void;
}

export const ChallengeDetailView: React.FC<ChallengeDetailViewProps> = ({
  challenge,
  participation,
  onUpdate
}) => {
  const { user } = useAuth();
  const [challengeContent, setChallengeContent] = useState<ChallengeContent[]>([]);
  const [dailyCheckIns, setDailyCheckIns] = useState<DailyCheckIn[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [reflectionNotes, setReflectionNotes] = useState('');
  const [moodBefore, setMoodBefore] = useState<number>(5);
  const [moodAfter, setMoodAfter] = useState<number>(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallengeData();
  }, [challenge.id, participation?.id]);

  const loadChallengeData = async () => {
    try {
      // Load challenge content
      const { data: contentData, error: contentError } = await supabase
        .from('challenge_content')
        .select('*')
        .eq('challenge_id', challenge.id)
        .order('day_number');

      if (contentError) throw contentError;

      // Load user's daily check-ins
      if (participation) {
        const { data: checkInsData, error: checkInsError } = await supabase
          .from('daily_check_ins')
          .select('*')
          .eq('participation_id', participation.id)
          .order('day_number');

        if (checkInsError) throw checkInsError;
        setDailyCheckIns(checkInsData || []);
      }

      // Load discussions
      const { data: discussionsData, error: discussionsError } = await supabase
        .from('challenge_discussions')
        .select('*')
        .eq('challenge_id', challenge.id)
        .order('created_at', { ascending: false });

      if (discussionsError) throw discussionsError;

      setChallengeContent(contentData || []);
      setDiscussions(discussionsData || []);
    } catch (error) {
      console.error('Error loading challenge data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDayContent = () => {
    if (!participation) return null;
    return challengeContent.find(content => content.day_number === participation.current_day);
  };

  const isDayCompleted = (dayNumber: number) => {
    return dailyCheckIns.some(checkIn => checkIn.day_number === dayNumber);
  };

  const completeDailyPractice = async () => {
    if (!participation || !user) return;

    const currentDay = participation.current_day;
    
    try {
      // Create daily check-in
      const { error: checkInError } = await supabase
        .from('daily_check_ins')
        .insert({
          user_id: user.id,
          participation_id: participation.id,
          challenge_id: challenge.id,
          day_number: currentDay,
          reflection_notes: reflectionNotes,
          mood_before: moodBefore,
          mood_after: moodAfter,
          practice_duration_minutes: getCurrentDayContent()?.duration_minutes
        });

      if (checkInError) throw checkInError;

      // Update participation progress
      const newCurrentDay = currentDay < challenge.duration_days ? currentDay + 1 : currentDay;
      const isCompleted = currentDay === challenge.duration_days;
      
      const { error: updateError } = await supabase
        .from('user_challenge_participations')
        .update({
          current_day: newCurrentDay,
          is_completed: isCompleted,
          streak_days: participation.streak_days + 1,
          last_activity_date: new Date().toISOString().split('T')[0],
          total_points_earned: isCompleted ? challenge.reward_points : participation.total_points_earned
        })
        .eq('id', participation.id);

      if (updateError) throw updateError;

      // Create milestone if needed
      if (isCompleted) {
        await supabase
          .from('challenge_milestones')
          .insert({
            user_id: user.id,
            participation_id: participation.id,
            milestone_type: 'completion',
            milestone_day: challenge.duration_days,
            points_awarded: challenge.reward_points,
            badge_earned: `${challenge.title} Master`,
            description: `Completed the ${challenge.title} challenge!`
          });
      }

      // Reset form
      setReflectionNotes('');
      setMoodBefore(5);
      setMoodAfter(5);

      // Refresh data
      onUpdate();
      loadChallengeData();

    } catch (error) {
      console.error('Error completing daily practice:', error);
    }
  };

  const postDiscussion = async () => {
    if (!newDiscussion.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('challenge_discussions')
        .insert({
          challenge_id: challenge.id,
          user_id: user.id,
          content: newDiscussion,
          discussion_type: 'general'
        });

      if (error) throw error;

      setNewDiscussion('');
      loadChallengeData();
    } catch (error) {
      console.error('Error posting discussion:', error);
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading challenge details...</div>;
  }

  const currentDayContent = getCurrentDayContent();
  const progressPercentage = participation ? (participation.current_day / challenge.duration_days) * 100 : 0;
  const isCurrentDayCompleted = participation ? isDayCompleted(participation.current_day) : false;

  return (
    <div className="space-y-6">
      {/* Challenge Header */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white">{challenge.title}</CardTitle>
          <p className="text-purple-200">{challenge.description}</p>
          
          {participation && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="border-green-400 text-green-200">
                  Day {participation.current_day} of {challenge.duration_days}
                </Badge>
                <Badge variant="outline" className="border-yellow-400 text-yellow-200">
                  {participation.streak_days} day streak
                </Badge>
                {participation.is_completed && (
                  <Badge variant="outline" className="border-purple-400 text-purple-200">
                    <Award className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-purple-200 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/30">
          <TabsTrigger value="today" className="data-[state=active]:bg-purple-600">
            <Target className="w-4 h-4 mr-2" />
            Today
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-purple-600">
            <Calendar className="w-4 h-4 mr-2" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-purple-600">
            <MessageCircle className="w-4 h-4 mr-2" />
            Community
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-purple-600">
            <Play className="w-4 h-4 mr-2" />
            All Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {currentDayContent && participation && !participation.is_completed ? (
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">
                  Day {participation.current_day}: {currentDayContent.title}
                </CardTitle>
                <p className="text-purple-200">{currentDayContent.description}</p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-blue-400 text-blue-200">
                    {currentDayContent.practice_type}
                  </Badge>
                  <Badge variant="outline" className="border-green-400 text-green-200">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentDayContent.duration_minutes} min
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentDayContent.content && (
                  <div className="space-y-4">
                    {currentDayContent.content.instructions && (
                      <div>
                        <h4 className="text-white font-semibold mb-2">Instructions:</h4>
                        <ul className="list-disc list-inside text-purple-200 space-y-1">
                          {currentDayContent.content.instructions.map((instruction: string, index: number) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {currentDayContent.content.guided_meditation && (
                      <div>
                        <h4 className="text-white font-semibold mb-2">Guided Meditation:</h4>
                        <p className="text-purple-200 italic">{currentDayContent.content.guided_meditation}</p>
                      </div>
                    )}
                  </div>
                )}

                {!isCurrentDayCompleted && (
                  <div className="space-y-4 border-t border-purple-500/30 pt-4">
                    <h4 className="text-white font-semibold">Complete Today's Practice</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-purple-200 text-sm">Mood Before (1-10)</label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={moodBefore}
                          onChange={(e) => setMoodBefore(Number(e.target.value))}
                          className="w-full"
                        />
                        <span className="text-white text-sm">{moodBefore}</span>
                      </div>
                      
                      <div>
                        <label className="text-purple-200 text-sm">Mood After (1-10)</label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={moodAfter}
                          onChange={(e) => setMoodAfter(Number(e.target.value))}
                          className="w-full"
                        />
                        <span className="text-white text-sm">{moodAfter}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-purple-200 text-sm block mb-2">Reflection Notes</label>
                      <Textarea
                        value={reflectionNotes}
                        onChange={(e) => setReflectionNotes(e.target.value)}
                        placeholder={currentDayContent.content.reflection_prompt || "How did today's practice feel?"}
                        className="bg-black/50 border-purple-500/30 text-white"
                      />
                    </div>

                    <Button 
                      onClick={completeDailyPractice}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Complete Today's Practice
                    </Button>
                  </div>
                )}

                {isCurrentDayCompleted && (
                  <div className="text-center text-green-400 font-semibold">
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-2" />
                    Today's practice completed! 🎉
                  </div>
                )}
              </CardContent>
            </Card>
          ) : participation?.is_completed ? (
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="text-center py-8">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Challenge Completed!</h3>
                <p className="text-purple-200 mb-4">
                  Congratulations on completing the {challenge.title}. You've earned {challenge.reward_points} points!
                </p>
                <Badge variant="outline" className="border-yellow-400 text-yellow-200">
                  <Award className="w-3 h-3 mr-1" />
                  {challenge.title} Master
                </Badge>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="text-center py-8">
                <p className="text-purple-200">Join this challenge to start your journey!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: challenge.duration_days }, (_, index) => {
              const dayNumber = index + 1;
              const isCompleted = isDayCompleted(dayNumber);
              const isCurrent = participation?.current_day === dayNumber;
              const isFuture = participation ? dayNumber > participation.current_day : true;
              
              return (
                <div
                  key={dayNumber}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center text-sm font-semibold
                    ${isCompleted ? 'bg-green-600 text-white' : 
                      isCurrent ? 'bg-purple-600 text-white' :
                      isFuture ? 'bg-gray-600 text-gray-300' :
                      'bg-yellow-600 text-white'}
                  `}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : dayNumber}
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          {participation && (
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Share with Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={newDiscussion}
                  onChange={(e) => setNewDiscussion(e.target.value)}
                  placeholder="Share your insights, ask questions, or encourage others..."
                  className="bg-black/50 border-purple-500/30 text-white"
                />
                <Button 
                  onClick={postDiscussion}
                  disabled={!newDiscussion.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-purple-200 mb-2">{discussion.content}</p>
                      <div className="flex items-center gap-4 text-sm text-purple-300">
                        <span>{new Date(discussion.created_at).toLocaleDateString()}</span>
                        <button className="flex items-center gap-1 hover:text-purple-200">
                          <Heart className="w-3 h-3" />
                          {discussion.likes_count}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4">
            {challengeContent.map((content) => {
              const isCompleted = isDayCompleted(content.day_number);
              const isAccessible = participation ? content.day_number <= participation.current_day : false;
              
              return (
                <Card 
                  key={content.id} 
                  className={`bg-black/30 border-purple-500/30 backdrop-blur-sm ${
                    !isAccessible ? 'opacity-50' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">
                        Day {content.day_number}: {content.title}
                      </CardTitle>
                      {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                    </div>
                    <p className="text-purple-200">{content.description}</p>
                  </CardHeader>
                  {isAccessible && (
                    <CardContent>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline" className="border-blue-400 text-blue-200">
                          {content.practice_type}
                        </Badge>
                        <Badge variant="outline" className="border-green-400 text-green-200">
                          <Clock className="w-3 h-3 mr-1" />
                          {content.duration_minutes} min
                        </Badge>
                      </div>
                      
                      {content.content.guided_meditation && (
                        <p className="text-purple-200 italic">
                          {content.content.guided_meditation}
                        </p>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
