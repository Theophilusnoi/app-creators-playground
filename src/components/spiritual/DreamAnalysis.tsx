
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Search, BarChart3, Eye, Plus, Download } from "lucide-react";
import { useDreams } from '@/hooks/useDreams';
import { DreamForm } from './DreamForm';
import { DreamStats } from './DreamStats';
import { DreamSearch } from './DreamSearch';
import { DreamJournal } from './dream/DreamJournal';
import { DreamSymbolGuide } from './dream/DreamSymbolGuide';
import { useToast } from '@/hooks/use-toast';

export const DreamAnalysis = () => {
  const { dreams, loading, error, analyzeDream } = useDreams();
  const [filteredDreams, setFilteredDreams] = useState(dreams);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('journal');
  const [analyzingDream, setAnalyzingDream] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setFilteredDreams(dreams);
  }, [dreams]);

  const handleAnalyzeDream = async (dreamId: string, content: string) => {
    try {
      setAnalyzingDream(dreamId);
      await analyzeDream(dreamId, content);
      toast({
        title: "Dream Analyzed",
        description: "Your dream has been analyzed with AI insights",
      });
    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setAnalyzingDream(null);
    }
  };

  const exportDreams = () => {
    const dreamData = filteredDreams.map(dream => ({
      date: dream.dream_date,
      title: dream.title,
      content: dream.content,
      emotions: dream.emotions?.join(', ') || '',
      symbols: dream.symbols?.join(', ') || '',
      analysis: dream.analysis || 'Not analyzed'
    }));

    const csv = [
      'Date,Title,Content,Emotions,Symbols,Analysis',
      ...dreamData.map(row => 
        `"${row.date}","${row.title}","${row.content}","${row.emotions}","${row.symbols}","${row.analysis}"`
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dream-journal-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Dreams Exported",
      description: "Your dream journal has been downloaded as CSV",
    });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-red-400 text-center">
          <p>Error loading dreams: {error}</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Dream Analysis</h2>
          <p className="text-purple-200">Explore the wisdom and messages in your dreams</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={exportDreams}
            variant="outline"
            className="border-purple-500/50 text-purple-200 hover:bg-purple-700/30"
            disabled={filteredDreams.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Record Dream
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="journal">
            <Moon className="w-4 h-4 mr-2" />
            Journal
          </TabsTrigger>
          <TabsTrigger value="search">
            <Search className="w-4 h-4 mr-2" />
            Search
          </TabsTrigger>
          <TabsTrigger value="insights">
            <BarChart3 className="w-4 h-4 mr-2" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="symbols">
            <Eye className="w-4 h-4 mr-2" />
            Symbols
          </TabsTrigger>
        </TabsList>

        <TabsContent value="journal" className="space-y-6">
          {showAddForm && (
            <DreamForm onClose={() => setShowAddForm(false)} />
          )}

          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Moon className="w-5 h-5 mr-2 text-purple-400" />
                Your Dreams ({dreams.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <DreamJournal 
                dreams={dreams}
                loading={loading}
                onAddDream={() => setShowAddForm(true)}
                onAnalyzeDream={handleAnalyzeDream}
                analyzingDream={analyzingDream}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Search className="w-5 h-5 mr-2 text-purple-400" />
                Search & Filter Dreams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DreamSearch dreams={dreams} onFilteredDreams={setFilteredDreams} />
              
              <div className="text-sm text-purple-300 mb-4">
                Showing {filteredDreams.length} of {dreams.length} dreams
              </div>

              <div className="space-y-4">
                {filteredDreams.map((dream) => (
                  <div key={dream.id} className="bg-purple-900/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-white">{dream.title}</h3>
                      <span className="text-xs text-purple-400">{dream.dream_date}</span>
                    </div>
                    
                    <p className="text-purple-200 mb-2 line-clamp-2">{dream.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {dream.emotions?.slice(0, 3).map((emotion, index) => (
                        <Button key={index} variant="outline" className="border-blue-400 text-blue-200">
                          {emotion}
                        </Button>
                      ))}
                      {dream.emotions && dream.emotions.length > 3 && (
                        <Button variant="outline" className="border-blue-400 text-blue-200">
                          +{dream.emotions.length - 3} more
                        </Button>
                      )}
                    </div>
                    
                    {dream.analysis && (
                      <div className="bg-purple-800/30 rounded p-2">
                        <p className="text-xs text-purple-200 line-clamp-2">{dream.analysis}</p>
                      </div>
                    )}
                  </div>
                ))}
                
                {filteredDreams.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-purple-400 mx-auto mb-4 opacity-50" />
                    <p className="text-purple-200">No dreams match your search criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                Dream Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dreams.length === 0 ? (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4 opacity-50" />
                  <p className="text-purple-200 mb-2">No dream data available for insights</p>
                  <p className="text-purple-300 text-sm">Record dreams to generate analytics</p>
                </div>
              ) : (
                <DreamStats dreams={dreams} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symbols" className="space-y-6">
          <DreamSymbolGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
};
