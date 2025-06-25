
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book, 
  Shield, 
  Heart, 
  Zap, 
  Search,
  ChevronRight,
  Lotus,
  Sun,
  Moon,
  Star
} from 'lucide-react';

interface KnowledgeSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: any;
}

export const SpiritualKnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const knowledgeSections: KnowledgeSection[] = [
    {
      id: 'vedantic_wisdom',
      title: 'Vedantic Wisdom',
      icon: <Lotus className="w-5 h-5" />,
      content: {
        karma_yoga: {
          definition: "The path of selfless action and service",
          key_concepts: [
            "Action without attachment to results",
            "Offering all actions to the Divine",
            "Transforming work into worship",
            "Understanding duty vs. desire"
          ],
          practices: [
            "Dedicated service to others",
            "Mindful daily activities",
            "Offering results to the Divine",
            "Working without ego involvement"
          ]
        },
        bhakti_yoga: {
          definition: "The path of devotion and love",
          key_concepts: [
            "Surrender to the Divine",
            "Cultivating divine love",
            "Seeing God in all beings",
            "Emotional purification through devotion"
          ],
          practices: [
            "Daily prayer and worship",
            "Chanting mantras",
            "Devotional singing",
            "Ritual worship (puja)"
          ]
        },
        raja_yoga: {
          definition: "The royal path of meditation and mind control",
          key_concepts: [
            "Eight-limbed path (Ashtanga)",
            "Meditation and concentration",
            "Ethical living (Yamas and Niyamas)",
            "Transcendence of mind"
          ],
          practices: [
            "Daily meditation",
            "Pranayama (breath control)",
            "Ethical conduct",
            "Self-study and contemplation"
          ]
        }
      }
    },
    {
      id: 'protection_practices',
      title: 'Spiritual Protection',
      icon: <Shield className="w-5 h-5" />,
      content: {
        daily_protection: [
          "Morning prayer for divine protection",
          "Visualizing white light around yourself",
          "Carrying protective crystals or amulets",
          "Regular spiritual cleansing baths",
          "Blessing your home and workspace"
        ],
        emergency_protection: [
          "Immediate prayer for divine intervention",
          "Visualizing mirrors reflecting negativity back",
          "Calling upon spiritual guides and angels",
          "Using salt for instant purification",
          "Seeking sanctuary in sacred spaces"
        ],
        advanced_techniques: [
          "Creating psychic shields",
          "Banishing rituals",
          "Protective ward creation",
          "Energy cord cutting",
          "Spiritual warfare prayers"
        ]
      }
    },
    {
      id: 'healing_wisdom',
      title: 'Healing Wisdom',
      icon: <Heart className="w-5 h-5" />,
      content: {
        emotional_healing: {
          principles: [
            "Forgiveness as liberation",
            "Releasing past traumas",
            "Heart chakra activation",
            "Self-love cultivation"
          ],
          techniques: [
            "Heart-opening meditations",
            "Forgiveness rituals",
            "Inner child healing",
            "Emotional release ceremonies"
          ]
        },
        spiritual_healing: {
          principles: [
            "Divine light as healing force",
            "Prayer and intention power",
            "Energy transmission",
            "Sacred geometry healing"
          ],
          techniques: [
            "Laying on of hands",
            "Distance healing",
            "Crystal healing",
            "Sound healing"
          ]
        }
      }
    },
    {
      id: 'ancient_traditions',
      title: 'Ancient Traditions',
      icon: <Sun className="w-5 h-5" />,
      content: {
        hermetic_principles: [
          "As above, so below",
          "The principle of mentalism",
          "The principle of correspondence",
          "The principle of vibration",
          "The principle of polarity",
          "The principle of rhythm",
          "The principle of cause and effect",
          "The principle of gender"
        ],
        alchemical_wisdom: [
          "Spiritual transformation",
          "The Great Work",
          "Solve et coagula",
          "The philosopher's stone",
          "Seven stages of initiation"
        ],
        mystery_schools: [
          "Egyptian mysteries",
          "Greek mysteries",
          "Rosicrucian teachings",
          "Kabbalistic wisdom",
          "Gnostic traditions"
        ]
      }
    }
  ];

  const filteredSections = knowledgeSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    JSON.stringify(section.content).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = (content: any, level = 0) => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="text-purple-100 text-sm flex items-start gap-2">
              <Star className="w-3 h-3 text-yellow-400 mt-1 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    }

    if (typeof content === 'object' && content !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(content).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <h4 className={`font-medium text-purple-200 ${level === 0 ? 'text-lg' : 'text-base'}`}>
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h4>
              <div className="pl-4 border-l border-purple-500/30">
                {renderContent(value, level + 1)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-purple-100 text-sm">{content}</p>;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Book className="w-6 h-6 text-purple-400" />
            Spiritual Knowledge Base
          </CardTitle>
          <p className="text-purple-200">
            Explore ancient wisdom, spiritual practices, and sacred knowledge
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search spiritual knowledge..."
              className="pl-10 bg-black/30 border-purple-500/50 text-white placeholder-purple-300"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSections.map((section) => (
          <Card 
            key={section.id} 
            className="bg-black/30 border-purple-500/30 hover:border-purple-400/50 transition-colors cursor-pointer"
            onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </div>
                <ChevronRight className={`w-4 h-4 text-purple-400 transition-transform ${
                  selectedSection === section.id ? 'rotate-90' : ''
                }`} />
              </CardTitle>
            </CardHeader>
            {selectedSection === section.id && (
              <CardContent className="pt-0">
                {renderContent(section.content)}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <Card className="bg-black/30 border-purple-500/30">
          <CardContent className="text-center py-8">
            <p className="text-purple-200">No knowledge found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
