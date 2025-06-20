
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calendar, Star, BookOpen, CheckCircle, Circle } from 'lucide-react';
import { enhancedSeraphinaBathingService, ProgressEntry } from '@/services/seraphinaBathingService';

interface ProgressTrackerProps {
  onBack: () => void;
  currentRitual?: {
    name: string;
    duration: string;
  };
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ onBack, currentRitual }) => {
  const [progressHistory, setProgressHistory] = useState<ProgressEntry[]>([]);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    ritual_name: currentRitual?.name || '',
    day_number: 1,
    notes: '',
    feelings_before: '',
    feelings_after: '',
    completed: false
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const history = enhancedSeraphinaBathingService.getProgressHistory();
    setProgressHistory(history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const saveEntry = () => {
    const entry: ProgressEntry = {
      ...newEntry,
      date: new Date().toISOString(),
      total_days: parseInt(currentRitual?.duration?.match(/\d+/)?.[0] || '7')
    };

    enhancedSeraphinaBathingService.saveProgressEntry(entry);
    loadProgress();
    setShowAddEntry(false);
    setNewEntry({
      ritual_name: currentRitual?.name || '',
      day_number: newEntry.day_number + 1,
      notes: '',
      feelings_before: '',
      feelings_after: '',
      completed: false
    });
  };

  const getCurrentRitualProgress = () => {
    if (!currentRitual) return null;
    
    const ritualEntries = progressHistory.filter(entry => 
      entry.ritual_name === currentRitual.name
    );
    
    const totalDays = parseInt(currentRitual.duration.match(/\d+/)?.[0] || '7');
    const completedDays = ritualEntries.length;
    const progress = Math.min((completedDays / totalDays) * 100, 100);
    
    return { completedDays, totalDays, progress, entries: ritualEntries };
  };

  const currentProgress = getCurrentRitualProgress();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 text-purple-300 hover:text-purple-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Chat
        </Button>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Spiritual Healing Journey Tracker
        </h2>
        <p className="text-xl text-purple-200">Monitor your sacred bathing progress and spiritual growth</p>
      </div>

      {/* Current Ritual Progress */}
      {currentProgress && (
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-400/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-purple-200">
              <div className="bg-purple-500/20 rounded-full p-2">
                <Star className="w-5 h-5" />
              </div>
              Current Ritual: {currentRitual?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-purple-200 mb-2">
                  <span>Progress: Day {currentProgress.completedDays} of {currentProgress.totalDays}</span>
                  <span>{Math.round(currentProgress.progress)}% Complete</span>
                </div>
                <Progress value={currentProgress.progress} className="h-3" />
              </div>
              
              <Button
                onClick={() => setShowAddEntry(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Log Today's Session
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Entry Form */}
      {showAddEntry && (
        <Card className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-2 border-blue-400/50">
          <CardHeader>
            <CardTitle className="text-blue-200">Log Your Sacred Bathing Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Day Number
                </label>
                <Input
                  type="number"
                  value={newEntry.day_number}
                  onChange={(e) => setNewEntry({...newEntry, day_number: parseInt(e.target.value)})}
                  className="bg-blue-900/20 border-blue-400/30 text-blue-100"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-blue-200">
                  <input
                    type="checkbox"
                    checked={newEntry.completed}
                    onChange={(e) => setNewEntry({...newEntry, completed: e.target.checked})}
                    className="rounded"
                  />
                  Session Completed
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                How did you feel before the ritual?
              </label>
              <Input
                value={newEntry.feelings_before}
                onChange={(e) => setNewEntry({...newEntry, feelings_before: e.target.value})}
                placeholder="Anxious, tired, heavy energy..."
                className="bg-blue-900/20 border-blue-400/30 text-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                How do you feel after the ritual?
              </label>
              <Input
                value={newEntry.feelings_after}
                onChange={(e) => setNewEntry({...newEntry, feelings_after: e.target.value})}
                placeholder="Peaceful, cleansed, lighter..."
                className="bg-blue-900/20 border-blue-400/30 text-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Notes & Observations
              </label>
              <Textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                placeholder="Any insights, experiences, or observations during the ritual..."
                className="bg-blue-900/20 border-blue-400/30 text-blue-100"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={saveEntry}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90"
              >
                Save Entry
              </Button>
              <Button
                onClick={() => setShowAddEntry(false)}
                variant="outline"
                className="border-blue-400/30 text-blue-200 hover:bg-blue-900/20"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress History */}
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-400/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-200">
            <div className="bg-green-500/20 rounded-full p-2">
              <Calendar className="w-5 h-5" />
            </div>
            Your Spiritual Journey History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {progressHistory.length === 0 ? (
            <div className="text-center py-8 text-green-200/70">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No progress entries yet. Start your first sacred bathing ritual to begin tracking your spiritual journey!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {progressHistory.map((entry, index) => (
                <div
                  key={index}
                  className="bg-green-900/20 rounded-lg p-4 border border-green-400/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {entry.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-green-400/50" />
                      )}
                      <h4 className="font-medium text-green-200">{entry.ritual_name}</h4>
                    </div>
                    <span className="text-sm text-green-300">
                      Day {entry.day_number}/{entry.total_days}
                    </span>
                  </div>
                  
                  <div className="text-sm text-green-200/80 mb-2">
                    {new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString()}
                  </div>

                  {entry.feelings_before && (
                    <div className="mb-2">
                      <span className="text-xs text-green-300 font-medium">Before: </span>
                      <span className="text-sm text-green-200">{entry.feelings_before}</span>
                    </div>
                  )}

                  {entry.feelings_after && (
                    <div className="mb-2">
                      <span className="text-xs text-green-300 font-medium">After: </span>
                      <span className="text-sm text-green-200">{entry.feelings_after}</span>
                    </div>
                  )}

                  {entry.notes && (
                    <div>
                      <span className="text-xs text-green-300 font-medium">Notes: </span>
                      <span className="text-sm text-green-200">{entry.notes}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
