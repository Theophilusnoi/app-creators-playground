
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  BookOpen, Plus, Heart, TrendingUp, Calendar, 
  Edit3, Trash2, Star, Search, Filter
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title?: string;
  content: string;
  entry_type: string;
  mood_rating?: number;
  manifestation_progress?: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

const ENTRY_TYPES = [
  { id: 'daily', name: 'Daily Reflection', emoji: '📝' },
  { id: 'gratitude', name: 'Gratitude', emoji: '🙏' },
  { id: 'goal', name: 'Goal Setting', emoji: '🎯' },
  { id: 'manifestation', name: 'Manifestation', emoji: '✨' },
  { id: 'ritual', name: 'Ritual Notes', emoji: '🕯️' },
  { id: 'insight', name: 'Insight', emoji: '💡' },
  { id: 'affirmation', name: 'Affirmation', emoji: '👑' }
];

const JOURNAL_PROMPTS = {
  daily: [
    "What am I most grateful for financially today?",
    "How did I invest in myself today?",
    "What abundance did I notice around me?",
    "What money beliefs did I challenge today?"
  ],
  gratitude: [
    "I am grateful for these financial blessings...",
    "I appreciate my ability to...",
    "Thank you universe for bringing me...",
    "I am blessed with..."
  ],
  goal: [
    "My top financial goal for this month is...",
    "To achieve this goal, I will...",
    "I know I've reached this goal when...",
    "The steps I need to take are..."
  ],
  manifestation: [
    "I am manifesting...",
    "I can see myself already having...",
    "It feels amazing to experience...",
    "I am ready to receive..."
  ]
};

export const ProsperityJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    entry_type: 'daily',
    mood_rating: 5,
    manifestation_progress: 5,
    tags: [] as string[]
  });
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();
    fetchEntries();
    generateDailyPrompt();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUser(user.id);
    }
  };

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('manifestation_journals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const generateDailyPrompt = () => {
    const prompts = JOURNAL_PROMPTS[newEntry.entry_type as keyof typeof JOURNAL_PROMPTS] || JOURNAL_PROMPTS.daily;
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
  };

  const addTag = () => {
    if (tagInput.trim() && !newEntry.tags.includes(tagInput.trim())) {
      setNewEntry(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setNewEntry(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const saveEntry = async () => {
    if (!newEntry.content.trim() || !currentUser) {
      toast({
        title: "Please write something",
        description: "Your journal entry cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('manifestation_journals')
        .insert({
          title: newEntry.title || undefined,
          content: newEntry.content,
          entry_type: newEntry.entry_type,
          mood_rating: newEntry.mood_rating,
          manifestation_progress: newEntry.manifestation_progress,
          tags: newEntry.tags,
          user_id: currentUser
        });

      if (error) throw error;

      toast({
        title: "📝 Entry Saved!",
        description: "Your journal entry has been added"
      });

      // Reset form
      setNewEntry({
        title: '',
        content: '',
        entry_type: 'daily',
        mood_rating: 5,
        manifestation_progress: 5,
        tags: []
      });
      
      generateDailyPrompt();
      fetchEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
      toast({
        title: "Error",
        description: "Failed to save entry",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      const { error } = await supabase
        .from('manifestation_journals')
        .delete()
        .eq('id', entryId);

      if (error) throw error;
      fetchEntries();
      
      toast({
        title: "Entry Deleted",
        description: "Journal entry has been removed"
      });
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || entry.entry_type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getMoodEmoji = (rating: number) => {
    if (rating >= 8) return '😊';
    if (rating >= 6) return '😐';
    if (rating >= 4) return '😕';
    return '😢';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 8) return 'text-green-400';
    if (progress >= 6) return 'text-yellow-400';
    if (progress >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* New Entry Form */}
      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-200 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Journal Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-blue-200 text-sm font-medium mb-2 block">
                Entry Type
              </label>
              <select
                value={newEntry.entry_type}
                onChange={(e) => {
                  setNewEntry({...newEntry, entry_type: e.target.value});
                  // Generate new prompt when type changes
                  setTimeout(generateDailyPrompt, 100);
                }}
                className="w-full bg-black/20 border border-blue-500/30 text-blue-100 rounded-md px-3 py-2"
              >
                {ENTRY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.emoji} {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-blue-200 text-sm font-medium mb-2 block">
                Title (Optional)
              </label>
              <Input
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                placeholder="Entry title..."
                className="bg-black/20 border-blue-500/30 text-blue-100"
              />
            </div>
          </div>

          {/* Daily Prompt */}
          {currentPrompt && (
            <div className="bg-black/20 p-4 rounded border border-blue-500/20">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-blue-200 font-medium">Daily Prompt:</h4>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={generateDailyPrompt}
                  className="border-blue-500/30 text-blue-200"
                >
                  New Prompt
                </Button>
              </div>
              <p className="text-blue-300 italic">{currentPrompt}</p>
            </div>
          )}

          <div>
            <label className="text-blue-200 text-sm font-medium mb-2 block">
              Your Entry
            </label>
            <Textarea
              value={newEntry.content}
              onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
              placeholder="Write about your prosperity journey..."
              className="bg-black/20 border-blue-500/30 text-blue-100 min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-blue-200 text-sm font-medium mb-2 block">
                Mood Rating: {newEntry.mood_rating}/10 {getMoodEmoji(newEntry.mood_rating)}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={newEntry.mood_rating}
                onChange={(e) => setNewEntry({...newEntry, mood_rating: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-blue-200 text-sm font-medium mb-2 block">
                Manifestation Progress: {newEntry.manifestation_progress}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={newEntry.manifestation_progress}
                onChange={(e) => setNewEntry({...newEntry, manifestation_progress: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-blue-200 text-sm font-medium mb-2 block">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                className="bg-black/20 border-blue-500/30 text-blue-100"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button
                onClick={addTag}
                size="sm"
                variant="outline"
                className="border-blue-500/30 text-blue-200"
              >
                Add
              </Button>
            </div>
            
            {newEntry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newEntry.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="border-blue-500/30 text-blue-300 cursor-pointer hover:bg-red-500/20"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={saveEntry}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Entry'}
          </Button>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search entries..."
                className="pl-10 bg-black/20 border-purple-500/30 text-purple-100"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 bg-black/20 border border-purple-500/30 text-purple-100 rounded-md px-3 py-2"
              >
                <option value="all">All Types</option>
                {ENTRY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journal Entries */}
      <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-200 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Your Journal Entries ({filteredEntries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredEntries.length === 0 ? (
            <p className="text-green-300 text-center py-8">
              {searchTerm || filterType !== 'all' 
                ? 'No entries match your search criteria.' 
                : 'No journal entries yet. Start writing your prosperity journey above!'
              }
            </p>
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="bg-black/20 p-4 rounded border border-green-500/20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      {entry.title && (
                        <h4 className="text-green-200 font-medium mb-1">{entry.title}</h4>
                      )}
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline" className="border-green-500/30 text-green-300 text-xs">
                          {ENTRY_TYPES.find(t => t.id === entry.entry_type)?.emoji} {ENTRY_TYPES.find(t => t.id === entry.entry_type)?.name}
                        </Badge>
                        <span className="text-green-400 text-xs">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </span>
                        {entry.mood_rating && (
                          <Badge variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                            Mood: {entry.mood_rating}/10 {getMoodEmoji(entry.mood_rating)}
                          </Badge>
                        )}
                        {entry.manifestation_progress && (
                          <Badge variant="outline" className={`border-yellow-500/30 text-xs ${getProgressColor(entry.manifestation_progress)}`}>
                            Progress: {entry.manifestation_progress}/10
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-green-200 mb-3 whitespace-pre-wrap">{entry.content}</p>
                  
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="border-green-500/30 text-green-300 text-xs">
                          #{tag}
                        </Badge>
                      ))}
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
