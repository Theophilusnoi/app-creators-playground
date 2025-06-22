
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Heart, ArrowLeft, Download, Play, Scroll } from "lucide-react";
import { CulturalTradition } from '@/types/archetype';

interface CulturalWisdomPageProps {
  tradition: CulturalTradition;
  onBack: () => void;
}

export const CulturalWisdomPage: React.FC<CulturalWisdomPageProps> = ({
  tradition,
  onBack
}) => {
  const getWisdomContent = () => {
    const wisdomContent = {
      'buddhist': {
        teachings: [
          'The Four Noble Truths: Understanding suffering, its cause, its cessation, and the path to freedom',
          'The Eightfold Path: Right understanding, intention, speech, action, livelihood, effort, mindfulness, and concentration',
          'The Three Jewels: Buddha (the teacher), Dharma (the teaching), Sangha (the community)',
          'Impermanence (Anicca): All conditioned existence is transient and ever-changing',
          'Interdependence: All phenomena arise in dependence upon multiple causes and conditions',
          'Karma: The law of cause and effect governing moral actions and their consequences'
        ],
        practices: [
          'Mindfulness meditation (Vipassana) - developing clear awareness of present moment experience',
          'Loving-kindness meditation (Metta) - cultivating universal compassion and goodwill',
          'Walking meditation - bringing mindful awareness to each step and movement',
          'Dharma study and contemplation - reflecting deeply on Buddhist teachings',
          'Taking refuge in the Three Jewels - daily commitment to Buddhist path',
          'Five Precepts practice - ethical conduct as foundation for spiritual development'
        ],
        symbols: ['Dharma Wheel', 'Lotus Flower', 'Bodhi Tree', 'Om Mani Padme Hum'],
        deities: ['Buddha Shakyamuni', 'Avalokiteshvara', 'Manjushri', 'Tara']
      },
      'celtic': {
        teachings: [
          'The Triple Goddess: Maiden, Mother, Crone - understanding life\'s sacred cycles',
          'Celtic Tree Calendar: Each moon cycle connected to sacred trees and their wisdom',
          'Ogham Script: Ancient alphabet connecting letters to trees and natural forces',
          'Samhain Wisdom: Honoring ancestors and the thinning of veils between worlds',
          'The Otherworld: Understanding the Celtic realm beyond ordinary perception',
          'Sacred Wells and Springs: Places of healing and divine connection'
        ],
        practices: [
          'Daily tree meditation - connecting with the spirit of different trees',
          'Seasonal celebration rituals honoring the Celtic wheel of the year',
          'Ancestor communication through guided meditation and offerings',
          'Celtic knot meditation for understanding interconnectedness',
          'Ogham divination - using tree symbols for guidance and insight',
          'Sacred fire ceremonies for purification and renewal'
        ],
        symbols: ['Triskele', 'Celtic Knots', 'Tree of Life', 'Spiral'],
        deities: ['Brigid', 'Cernunnos', 'The Morrígan', 'Lugh']
      },
      'norse': {
        teachings: [
          'The Nine Realms: Understanding the cosmic tree Yggdrasil and interconnected worlds',
          'Rune Wisdom: Each rune as a gateway to universal forces and divination',
          'Wyrd and Fate: Understanding personal destiny and the web of fate',
          'Berserker Consciousness: Channeling primal power for transformation',
          'Ragnarok Cycle: Death and rebirth as cosmic and personal transformation',
          'Honor and Oath-keeping: Sacred bonds that bind communities and individuals'
        ],
        practices: [
          'Daily rune meditation and casting for guidance and self-understanding',
          'Seidr practices for spiritual journeying and prophecy',
          'Blót rituals for honoring the gods and nature spirits',
          'Galdr - runic chanting for manifestation and protection',
          'Warrior meditation - channeling inner strength for life challenges',
          'Ancestor veneration through storytelling and ritual offerings'
        ],
        symbols: ['Mjölnir', 'Valknut', 'Vegvísir', 'Yggdrasil'],
        deities: ['Odin', 'Freya', 'Thor', 'Frigg']
      },
      'egyptian': {
        teachings: [
          'Ma\'at Principle: Living in harmony with cosmic order and truth',
          'Ka and Ba: Understanding the multiple aspects of the soul',
          'Duat Journey: The soul\'s journey through the underworld after death',
          'Neteru Wisdom: Working with Egyptian deities as cosmic principles',
          'Sacred Geometry: Understanding divine proportions in temple architecture',
          'Hermetic Principles: As above, so below - cosmic and personal correspondence'
        ],
        practices: [
          'Daily Ma\'at meditation for ethical living and balance',
          'Hieroglyphic meditation for connecting with ancient wisdom',
          'Pyramid energy work for consciousness expansion',
          'Egyptian deity invocation for specific life aspects',
          'Shadow work through Osiris death-rebirth mythology',
          'Sacred mathematics and geometry in daily contemplation'
        ],
        symbols: ['Ankh', 'Eye of Horus', 'Djed Pillar', 'Was Scepter'],
        deities: ['Isis', 'Osiris', 'Thoth', 'Hathor']
      },
      'indigenous': {
        teachings: [
          'Seven Generations Principle: Consider the impact of decisions on seven generations',
          'Medicine Wheel Teachings: Four directions and their associated wisdom',
          'Animal Spirit Guides: Learning from the natural world\'s teachers',
          'Sacred Reciprocity: Giving back to the earth and community',
          'Vision Quest Wisdom: Seeking guidance through solitude and fasting',
          'Elder Teachings: Honoring the wisdom of those who came before'
        ],
        practices: [
          'Smudging ceremonies with sage, cedar, and sweetgrass for purification',
          'Drumming and chanting for spiritual connection and healing',
          'Earth-based ceremonies honoring the seasons and natural cycles',
          'Plant spirit medicine work with sacred herbs and botanicals',
          'Talking circles for community healing and shared wisdom',
          'Sacred pipe ceremonies for prayer and communion with the divine'
        ],
        symbols: ['Medicine Wheel', 'Eagle Feather', 'Sacred Pipe', 'Turtle'],
        deities: ['Great Spirit', 'White Buffalo Woman', 'Kokopelli', 'Grandmother Moon']
      },
      'hindu': {
        teachings: [
          'Dharma: Righteous living according to one\'s life purpose and cosmic order',
          'Karma Yoga: The path of selfless action and service to others',
          'Bhakti: Devotional practices cultivating love for the divine',
          'Raja Yoga: The royal path of meditation and mental discipline',
          'Vedantic Wisdom: Understanding the unity of Atman (individual soul) and Brahman (universal consciousness)',
          'Sacred Geometry: Mandalas and yantras as maps of consciousness'
        ],
        practices: [
          'Daily pranayama (breathing practices) for energy cultivation',
          'Mantra meditation using sacred sounds for spiritual transformation',
          'Yoga asanas (postures) for physical and spiritual purification',
          'Puja rituals honoring deities and sacred forces',
          'Pilgrimage to holy sites for spiritual merit and transformation',
          'Guru-disciple relationship for authentic spiritual transmission'
        ],
        symbols: ['Om', 'Lotus', 'Shri Yantra', 'Trishul'],
        deities: ['Krishna', 'Shiva', 'Devi', 'Ganesha']
      }
    };

    return wisdomContent[tradition.id as keyof typeof wisdomContent] || {
      teachings: ['Ancient wisdom teachings from this sacred tradition'],
      practices: ['Sacred practices for spiritual development'],
      symbols: ['Sacred symbols of this tradition'],
      deities: ['Divine beings and archetypal forces']
    };
  };

  const content = getWisdomContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-6 border-purple-400 text-purple-200 hover:bg-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Wisdom Access
          </Button>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {tradition.name} Sacred Teachings
            </h1>
            <p className="text-purple-200 text-lg">{tradition.region}</p>
            <Badge className="mt-2 bg-green-600">
              Wisdom Unlocked
            </Badge>
          </div>
        </div>

        {/* Core Teachings Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Scroll className="w-6 h-6 text-yellow-400" />
            Core Teachings
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {content.teachings.map((teaching, index) => (
              <Card key={index} className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-purple-100 leading-relaxed">{teaching}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sacred Practices Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6 text-pink-400" />
            Sacred Practices
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {content.practices.map((practice, index) => (
              <Card key={index} className="bg-black/30 border-pink-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Heart className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                    <p className="text-pink-100 leading-relaxed">{practice}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Symbols and Deities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-black/30 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Sacred Symbols
              </h3>
              <div className="flex flex-wrap gap-3">
                {content.symbols.map((symbol, index) => (
                  <Badge key={index} className="bg-blue-600/80 text-white px-4 py-2">
                    {symbol}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-400" />
                Divine Archetypes
              </h3>
              <div className="flex flex-wrap gap-3">
                {content.deities.map((deity, index) => (
                  <Badge key={index} className="bg-purple-600/80 text-white px-4 py-2">
                    {deity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            onClick={() => {
              // Simulate starting a practice session
              alert(`Beginning ${tradition.name} practice session. Find a quiet space and prepare for sacred work.`);
            }}
          >
            <Play className="w-4 h-4 mr-2" />
            Begin Practice Session
          </Button>
          <Button 
            variant="outline"
            className="border-purple-500 text-purple-300 hover:bg-purple-700"
            onClick={() => {
              // Simulate downloading study materials
              alert(`Study guide for ${tradition.name} would be downloaded. This feature connects you with authentic resources and community teachers.`);
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Study Guide
          </Button>
        </div>

        {/* Wisdom Integration Notice */}
        <Card className="bg-black/30 border-yellow-500/30 backdrop-blur-sm mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">Integration Reminder</h3>
            <p className="text-yellow-100 leading-relaxed">
              These teachings are meant to be lived, not just studied. Take time to integrate each practice 
              into your daily life before moving to advanced concepts. True wisdom comes through consistent, 
              respectful practice over time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
