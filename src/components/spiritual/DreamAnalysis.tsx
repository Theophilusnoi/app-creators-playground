
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Moon, Star, Eye, Plus } from "lucide-react";

const dreamSymbols = [
  { symbol: "Water", meaning: "Emotions, unconscious, flow of life", frequency: "High" },
  { symbol: "Flying", meaning: "Freedom, transcendence, rising above", frequency: "Medium" },
  { symbol: "Animals", meaning: "Instincts, natural wisdom, shadow aspects", frequency: "High" },
  { symbol: "Death", meaning: "Transformation, endings and beginnings", frequency: "Low" },
  { symbol: "Houses", meaning: "Self, psyche structure, different aspects of being", frequency: "Medium" }
];

const recentDreams = [
  {
    id: 1,
    date: "2024-01-10",
    title: "The Purple Ocean",
    content: "I was swimming in a vast purple ocean with luminescent fish guiding me to an underwater temple...",
    symbols: ["Water", "Purple", "Fish", "Temple"],
    analysis: "This dream suggests deep spiritual exploration and guidance from your intuitive wisdom."
  },
  {
    id: 2,
    date: "2024-01-08",
    title: "The Speaking Tree",
    content: "An ancient oak tree was speaking to me in a language I somehow understood...",
    symbols: ["Tree", "Ancient wisdom", "Communication"],
    analysis: "Connection to ancestral wisdom and receiving guidance from nature consciousness."
  }
];

export const DreamAnalysis = () => {
  const [newDream, setNewDream] = useState({
    title: '',
    content: '',
    emotions: '',
    symbols: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddDream = () => {
    if (newDream.content.trim()) {
      // Here you would save to Supabase and get AI analysis
      console.log('New dream:', newDream);
      setNewDream({ title: '', content: '', emotions: '', symbols: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Dream Analysis</h2>
          <p className="text-purple-200">Explore the wisdom and messages in your dreams</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Record Dream
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dream Journal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add New Dream Form */}
          {showAddForm && (
            <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Record New Dream</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-white font-medium">Dream Title</label>
                  <Input
                    value={newDream.title}
                    onChange={(e) => setNewDream(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Give your dream a memorable title..."
                    className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Dream Description</label>
                  <Textarea
                    value={newDream.content}
                    onChange={(e) => setNewDream(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Describe your dream in as much detail as you remember..."
                    className="min-h-32 bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-white font-medium">Emotions Felt</label>
                    <Input
                      value={newDream.emotions}
                      onChange={(e) => setNewDream(prev => ({ ...prev, emotions: e.target.value }))}
                      placeholder="Fear, joy, confusion, peace..."
                      className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white font-medium">Key Symbols</label>
                    <Input
                      value={newDream.symbols}
                      onChange={(e) => setNewDream(prev => ({ ...prev, symbols: e.target.value }))}
                      placeholder="Water, animals, colors, objects..."
                      className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button onClick={handleAddDream} className="bg-purple-600 hover:bg-purple-700">
                    Analyze Dream
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Dreams */}
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Moon className="w-5 h-5 mr-2 text-purple-400" />
                Dream Journal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {recentDreams.map((dream) => (
                <div key={dream.id} className="bg-purple-900/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-white">{dream.title}</h3>
                    <span className="text-xs text-purple-400">{dream.date}</span>
                  </div>
                  
                  <p className="text-purple-200 mb-3">{dream.content}</p>
                  
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {dream.symbols.map((symbol, index) => (
                        <Badge key={index} variant="outline" className="border-purple-400 text-purple-200">
                          {symbol}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-800/30 rounded p-3">
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 mr-2 text-purple-400" />
                      <span className="text-sm font-medium text-white">Jungian Analysis</span>
                    </div>
                    <p className="text-sm text-purple-200 italic">{dream.analysis}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Dream Symbol Guide */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Eye className="w-5 h-5 mr-2 text-purple-400" />
              Symbol Guide
            </CardTitle>
            <CardDescription className="text-purple-200">
              Common dream symbols and their meanings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dreamSymbols.map((item, index) => (
              <div key={index} className="bg-purple-900/20 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-white">{item.symbol}</h4>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      item.frequency === 'High' ? 'border-green-400 text-green-300' :
                      item.frequency === 'Medium' ? 'border-yellow-400 text-yellow-300' :
                      'border-red-400 text-red-300'
                    }`}
                  >
                    {item.frequency}
                  </Badge>
                </div>
                <p className="text-sm text-purple-300">{item.meaning}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
