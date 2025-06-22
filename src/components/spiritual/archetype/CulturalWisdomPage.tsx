
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
      'celtic': {
        teachings: [
          'The Triple Goddess: Maiden, Mother, Crone - understanding life\'s sacred cycles',
          'Celtic Tree Calendar: Each moon cycle connected to sacred trees and their wisdom',
          'Ogham Script: Ancient alphabet connecting letters to trees and natural forces',
          'Samhain Wisdom: Honoring ancestors and the thinning of veils between worlds'
        ],
        practices: [
          'Daily tree meditation - connecting with the spirit of different trees',
          'Seasonal celebration rituals honoring the Celtic wheel of the year',
          'Ancestor communication through guided meditation',
          'Celtic knot meditation for understanding interconnectedness'
        ],
        symbols: ['Triskele', 'Celtic Knots', 'Tree of Life', 'Spiral'],
        deities: ['Brigid', 'Cernunnos', 'The Morrígan', 'Lugh']
      },
      'norse': {
        teachings: [
          'The Nine Realms: Understanding the cosmic tree Yggdrasil and interconnected worlds',
          'Rune Wisdom: Each rune as a gateway to universal forces and divination',
          'Wyrd and Fate: Understanding personal destiny and the web of fate',
          'Berserker Consciousness: Channeling primal power for transformation'
        ],
        practices: [
          'Daily rune meditation and casting for guidance',
          'Seidr practices for spiritual journeying and prophecy',
          'Blót rituals for honoring the gods and nature spirits',
          'Galdr - runic chanting for manifestation and protection'
        ],
        symbols: ['Mjölnir', 'Valknut', 'Vegvísir', 'Yggdrasil'],
        deities: ['Odin', 'Freya', 'Thor', 'Frigg']
      },
      'egyptian': {
        teachings: [
          'Ma\'at Principle: Living in harmony with cosmic order and truth',
          'Ka and Ba: Understanding the multiple aspects of the soul',
          'Duat Journey: The soul\'s journey through the underworld after death',
          'Neteru Wisdom: Working with Egyptian deities as cosmic principles'
        ],
        practices: [
          'Daily Ma\'at meditation for ethical living and balance',
          'Hieroglyphic meditation for connecting with ancient wisdom',
          'Pyramid energy work for consciousness expansion',
          'Egyptian deity invocation for specific life aspects'
        ],
        symbols: ['Ankh', 'Eye of Horus', 'Djed Pillar', 'Was Scepter'],
        deities: ['Isis', 'Osiris', 'Thoth', 'Hathor']
      }
    };

    return wisdomContent[tradition.id as keyof typeof wisdomContent] || {
      teachings: ['Ancient wisdom teachings from this tradition'],
      practices: ['Sacred practices for spiritual development'],
      symbols: ['Sacred symbols'],
      deities: ['Divine beings and archetypes']
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            <Play className="w-4 h-4 mr-2" />
            Begin Practice Session
          </Button>
          <Button 
            variant="outline"
            className="border-purple-500 text-purple-300 hover:bg-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Study Guide
          </Button>
        </div>
      </div>
    </div>
  );
};
