
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Eye, Star, Clock, Plus } from "lucide-react";

const synchronicityTypes = [
  { type: "Number Sequences", color: "bg-blue-500", examples: ["111", "222", "333", "11:11"] },
  { type: "Animal Messengers", color: "bg-green-500", examples: ["Repeated animal sightings", "Unusual animal behavior"] },
  { type: "Repeated Words/Phrases", color: "bg-purple-500", examples: ["Hearing same word multiple times", "Seeing same phrase"] },
  { type: "Meaningful Coincidences", color: "bg-pink-500", examples: ["Perfect timing", "Unexpected connections"] },
  { type: "Dreams & Reality", color: "bg-yellow-500", examples: ["Dream symbols appearing", "Prophetic dreams"] }
];

const recentSynchronicities = [
  {
    id: 1,
    type: "Number Sequences",
    description: "Saw 11:11 three times today when thinking about career change",
    timestamp: "2 hours ago",
    meaning: "Alignment with life purpose"
  },
  {
    id: 2,
    type: "Animal Messengers",
    description: "A red cardinal appeared outside my window during meditation",
    timestamp: "Yesterday",
    meaning: "Message of hope and renewal"
  },
  {
    id: 3,
    type: "Meaningful Coincidences",
    description: "Met someone with the same rare book I was just thinking about",
    timestamp: "3 days ago",
    meaning: "Confirmation of current path"
  }
];

export const SynchronicityDetector = () => {
  const [newSynchronicity, setNewSynchronicity] = useState({
    type: '',
    description: '',
    meaning: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSynchronicity = () => {
    if (newSynchronicity.description.trim()) {
      // Here you would save to Supabase
      console.log('New synchronicity:', newSynchronicity);
      setNewSynchronicity({ type: '', description: '', meaning: '' });
      setShowAddForm(false);
    }
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
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Record New Synchronicity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-white font-medium">Type</label>
              <select 
                value={newSynchronicity.type}
                onChange={(e) => setNewSynchronicity(prev => ({ ...prev, type: e.target.value }))}
                className="w-full p-2 rounded-md bg-black/20 border border-purple-500/30 text-white"
              >
                <option value="">Select type...</option>
                {synchronicityTypes.map((type) => (
                  <option key={type.type} value={type.type}>{type.type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium">Description</label>
              <Textarea
                value={newSynchronicity.description}
                onChange={(e) => setNewSynchronicity(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what happened in detail..."
                className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium">Possible Meaning (Optional)</label>
              <Input
                value={newSynchronicity.meaning}
                onChange={(e) => setNewSynchronicity(prev => ({ ...prev, meaning: e.target.value }))}
                placeholder="What might this be telling you?"
                className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
              />
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleAddSynchronicity} className="bg-purple-600 hover:bg-purple-700">
                Save Synchronicity
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Synchronicities */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="w-5 h-5 mr-2 text-purple-400" />
            Recent Synchronicities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentSynchronicities.map((sync) => (
            <div key={sync.id} className="bg-purple-900/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="border-purple-400 text-purple-200">
                  {sync.type}
                </Badge>
                <div className="flex items-center text-xs text-purple-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {sync.timestamp}
                </div>
              </div>
              <p className="text-white mb-2">{sync.description}</p>
              <div className="bg-purple-800/30 rounded p-2">
                <p className="text-sm text-purple-200 italic">Meaning: {sync.meaning}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
