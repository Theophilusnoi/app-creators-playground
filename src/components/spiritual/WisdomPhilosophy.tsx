
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Quote, 
  Lightbulb, 
  Heart, 
  Compass, 
  Eye,
  Infinity,
  Mountain,
  Flower
} from 'lucide-react';

interface WisdomContent {
  id: string;
  title: string;
  tradition: string;
  content: string;
  insight: string;
  practice: string;
  category: string;
}

const wisdomCategories = [
  {
    id: 'non-duality',
    name: 'Non-Duality',
    icon: Infinity,
    color: 'from-purple-600 to-violet-600',
    description: 'Explore the unity beyond apparent separation'
  },
  {
    id: 'sacred-texts',
    name: 'Sacred Texts',
    icon: BookOpen,
    color: 'from-amber-600 to-yellow-600',
    description: 'Timeless wisdom from spiritual traditions'
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    icon: Lightbulb,
    color: 'from-blue-600 to-cyan-600',
    description: 'Practical wisdom for daily living'
  },
  {
    id: 'mysticism',
    name: 'Mysticism',
    icon: Eye,
    color: 'from-indigo-600 to-purple-600',
    description: 'Direct experience of the divine'
  }
];

const wisdomContent: WisdomContent[] = [
  {
    id: '1',
    title: 'Who Am I Beyond Thought?',
    tradition: 'Advaita Vedanta',
    content: 'The question "Who am I?" is not seeking an answer but pointing to the one who asks. When thoughts arise, notice: who is aware of these thoughts? This awareness itself is your true nature.',
    insight: 'You are not the thinker of thoughts, but the awareness in which thoughts appear and disappear.',
    practice: 'Sit quietly and ask "Who am I?" When any answer arises, ask "Who knows this?" Continue until only awareness remains.',
    category: 'non-duality'
  },
  {
    id: '2',
    title: 'The Lotus Teaches Purity',
    tradition: 'Buddhism',
    content: 'The lotus grows from muddy waters yet blooms pristine. Similarly, enlightenment arises not despite our difficulties, but through them. Each challenge is the mud that nourishes our awakening.',
    insight: 'Your struggles are not obstacles to spirituality—they are the very ground from which wisdom grows.',
    practice: 'When facing difficulties, ask: "How is this situation teaching me? What lotus is trying to bloom here?"',
    category: 'sacred-texts'
  },
  {
    id: '3',
    title: 'Amor Fati - Love Your Fate',
    tradition: 'Stoicism',
    content: 'Marcus Aurelius taught us to not merely accept what happens, but to love it. Every experience, pleasant or painful, is exactly what we need for our growth.',
    insight: 'Resistance to what is creates suffering. Embracing what is creates strength.',
    practice: 'Each morning, say: "Whatever comes today, I choose to love it as my teacher." Journal obstacles as fuel for growth.',
    category: 'philosophy'
  },
  {
    id: '4',
    title: 'The Beloved in All Forms',
    tradition: 'Sufism',
    content: 'Rumi wrote: "In your light I learn how to love. In your beauty, how to make poems. You dance inside my chest where no one sees you, but sometimes I do, and that sight becomes this art, this music, this form."',
    insight: 'The Divine beloved appears in every face, every moment, every breath when we have eyes to see.',
    practice: 'Look into a mirror and see the Beloved looking back. Then extend this vision to all beings you encounter.',
    category: 'mysticism'
  },
  {
    id: '5',
    title: 'The Two Arrows Teaching',
    tradition: 'Buddhism',
    content: 'The Buddha taught that when struck by the first arrow of pain, we often shoot ourselves with a second arrow of resistance, blame, and story. The first arrow is unavoidable; the second is optional.',
    insight: 'Pain is inevitable, but suffering is a choice we make through our resistance and mental elaboration.',
    practice: 'When pain arises, pause and ask: "What is the first arrow (actual sensation)? What are the second arrows (my stories about it)?"',
    category: 'sacred-texts'
  },
  {
    id: '6',
    title: 'The Eternal Now',
    tradition: 'Eckhart Tolle',
    content: 'Past and future exist only as mental constructs. Life can only be lived in the present moment. All transformation, all awakening, all peace is available right now.',
    insight: 'The present moment is the only portal to eternity and your true self.',
    practice: 'Set random phone alarms throughout the day. When they ring, simply ask: "What is here now?" Feel your breath and body.',
    category: 'philosophy'
  }
];

export const WisdomPhilosophy: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWisdom, setSelectedWisdom] = useState<WisdomContent | null>(null);

  const filteredWisdom = wisdomContent.filter(wisdom => 
    selectedCategory === 'all' || wisdom.category === selectedCategory
  );

  const getCategoryColor = (category: string) => {
    const categoryData = wisdomCategories.find(cat => cat.id === category);
    return categoryData?.color || 'from-gray-600 to-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white mb-2">
            📚 Wisdom & Philosophy
          </CardTitle>
          <CardDescription className="text-purple-200 text-lg">
            Timeless teachings for modern awakening
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 bg-gray-900/90 border-2 border-gray-600 p-1 gap-1">
          <TabsTrigger 
            value="all"
            className="text-white font-bold text-xs lg:text-sm bg-gray-800 border border-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-shadow-sm px-2 py-3 min-h-[48px] flex items-center justify-center crisp-text"
          >
            All
          </TabsTrigger>
          {wisdomCategories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="text-white font-bold text-xs lg:text-sm bg-gray-800 border border-gray-600 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-shadow-sm px-2 py-3 min-h-[48px] flex flex-col items-center justify-center crisp-text"
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="truncate text-xs">{category.name.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6 mt-6">
          {/* Category Description */}
          {selectedCategory !== 'all' && (
            <Card className="bg-purple-900/20 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-4">
                {(() => {
                  const category = wisdomCategories.find(cat => cat.id === selectedCategory);
                  if (!category) return null;
                  const Icon = category.icon;
                  return (
                    <div className="flex items-center gap-3">
                      <div className={`bg-gradient-to-r ${category.color} p-3 rounded-full`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white crisp-text">{category.name}</h3>
                        <p className="text-purple-200 crisp-text">{category.description}</p>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Wisdom Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredWisdom.map((wisdom) => (
              <Card key={wisdom.id} className="bg-black/30 border-purple-500/30 backdrop-blur-sm hover:bg-black/40 transition-all cursor-pointer" onClick={() => setSelectedWisdom(wisdom)}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg text-white font-bold crisp-text leading-tight">
                      {wisdom.title}
                    </CardTitle>
                    <Badge className={`bg-gradient-to-r ${getCategoryColor(wisdom.category)} text-white text-xs crisp-text flex-shrink-0`}>
                      {wisdom.tradition}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-purple-200 text-sm mb-4 crisp-text line-clamp-3">
                    {wisdom.content}
                  </p>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Quote className="w-4 h-4" />
                    <span className="text-xs crisp-text">Click to explore deeper</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Wisdom Detail Modal */}
      {selectedWisdom && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedWisdom(null)}>
          <Card className="bg-black/90 border-purple-500/50 backdrop-blur-md max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl text-white crisp-text">{selectedWisdom.title}</CardTitle>
                  <Badge className={`bg-gradient-to-r ${getCategoryColor(selectedWisdom.category)} text-white mt-2`}>
                    {selectedWisdom.tradition}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedWisdom(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2 crisp-text">
                  <BookOpen className="w-4 h-4" />
                  Teaching
                </h4>
                <p className="text-purple-100 crisp-text leading-relaxed">{selectedWisdom.content}</p>
              </div>

              <div>
                <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2 crisp-text">
                  <Lightbulb className="w-4 h-4" />
                  Key Insight
                </h4>
                <p className="text-purple-100 crisp-text leading-relaxed italic">{selectedWisdom.insight}</p>
              </div>

              <div>
                <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2 crisp-text">
                  <Heart className="w-4 h-4" />
                  Practice
                </h4>
                <p className="text-purple-100 crisp-text leading-relaxed">{selectedWisdom.practice}</p>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white crisp-text"
                onClick={() => setSelectedWisdom(null)}
              >
                Begin This Practice
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
