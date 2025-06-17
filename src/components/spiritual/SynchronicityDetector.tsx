
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Star, Clock, Plus, Loader2, Trash2, Edit } from "lucide-react";
import { useSynchronicities } from '@/hooks/useSynchronicities';
import { SynchronicityForm } from './SynchronicityForm';

const synchronicityTypes = [
  { type: "Number Sequences", color: "bg-blue-500", examples: ["111", "222", "333", "11:11"] },
  { type: "Animal Messengers", color: "bg-green-500", examples: ["Repeated animal sightings", "Unusual animal behavior"] },
  { type: "Repeated Words/Phrases", color: "bg-purple-500", examples: ["Hearing same word multiple times", "Seeing same phrase"] },
  { type: "Meaningful Coincidences", color: "bg-pink-500", examples: ["Perfect timing", "Unexpected connections"] },
  { type: "Dreams & Reality", color: "bg-yellow-500", examples: ["Dream symbols appearing", "Prophetic dreams"] }
];

export const SynchronicityDetector = () => {
  const { synchronicities, loading, deleteSynchronicity } = useSynchronicities();
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteSynchronicity(id);
    } catch (error) {
      console.error('Failed to delete synchronicity:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Synchronicity Tracker</h2>
          <p className="text-purple-200">Recognize and record meaningful patterns in your life</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Record Synchronicity
        </Button>
      </div>

      {/* Synchronicity Types Guide */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Types of Synchronicities</CardTitle>
          <CardDescription className="text-purple-200">
            Common patterns to watch for in your daily experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {synchronicityTypes.map((sync, index) => (
              <div key={index} className="bg-purple-900/20 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 rounded-full ${sync.color} mr-2`}></div>
                  <h3 className="font-medium text-white">{sync.type}</h3>
                </div>
                <div className="space-y-1">
                  {sync.examples.map((example, i) => (
                    <p key={i} className="text-xs text-purple-300">• {example}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Synchronicity Form */}
      {showAddForm && (
        <SynchronicityForm onClose={() => setShowAddForm(false)} />
      )}

      {/* User's Synchronicities */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="w-5 h-5 mr-2 text-purple-400" />
            Your Synchronicities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
              <span className="ml-2 text-purple-200">Loading synchronicities...</span>
            </div>
          ) : synchronicities.length === 0 ? (
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Synchronicities Yet</h3>
              <p className="text-purple-300">
                Start recording the meaningful patterns and coincidences in your life.
              </p>
            </div>
          ) : (
            synchronicities.map((sync) => (
              <div key={sync.id} className="bg-purple-900/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-purple-400 text-purple-200">
                      {sync.synchronicity_type}
                    </Badge>
                    <div className="flex items-center text-xs text-purple-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(sync.date_occurred)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < sync.significance ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(sync.id)}
                      disabled={deletingId === sync.id}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      {deletingId === sync.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <h3 className="text-white font-medium mb-2">{sync.title}</h3>
                <p className="text-purple-100 mb-3">{sync.description}</p>
                
                {sync.tags && sync.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {sync.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-800/30 text-purple-200 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {sync.meaning && (
                  <div className="bg-purple-800/30 rounded p-2 mt-2">
                    <p className="text-sm text-purple-200 italic">Meaning: {sync.meaning}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
