
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { EnhancedAngelEntity } from './enhancedAngelData';

interface DetailedAngelInfoProps {
  angel: EnhancedAngelEntity;
}

export const DetailedAngelInfo: React.FC<DetailedAngelInfoProps> = ({ angel }) => {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="bg-black/40 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <span className="text-3xl">{angel.symbol}</span>
            <div>
              <h3 className="text-xl">{angel.name}</h3>
              <p className="text-purple-300 text-sm">{angel.title}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-purple-100">{angel.description}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-semibold mb-2">Celestial Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-400">Hierarchy:</span>
                  <span className="text-purple-200">{angel.hierarchy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Element:</span>
                  <span className="text-purple-200">{angel.element}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Planet:</span>
                  <span className="text-purple-200">{angel.planet}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Zodiac:</span>
                  <span className="text-purple-200">{angel.zodiacSign}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-2">Sacred Timing</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-400">Day:</span>
                  <span className="text-purple-200">{angel.weeklyDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Period:</span>
                  <span className="text-purple-200">{angel.monthlyPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-400">Numbers:</span>
                  <span className="text-purple-200">{angel.numbers.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Duties and Powers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-green-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-200 text-lg">Divine Duties</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {angel.duties.map((duty, index) => (
                <li key={index} className="text-green-100 text-sm flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>{duty}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-blue-900/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-200 text-lg">Sacred Powers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {angel.powers.map((power, index) => (
                <li key={index} className="text-blue-100 text-sm flex items-start">
                  <span className="text-blue-400 mr-2">⚡</span>
                  <span>{power}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Likes and Dislikes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-emerald-900/30 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-emerald-200 text-lg">Attracted To</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {angel.likes.map((like, index) => (
                <Badge key={index} className="bg-emerald-600/20 text-emerald-200 mr-2 mb-2">
                  ✓ {like}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-900/30 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-200 text-lg">Repelled By</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {angel.dislikes.map((dislike, index) => (
                <Badge key={index} className="bg-red-600/20 text-red-200 mr-2 mb-2">
                  ✗ {dislike}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sacred Tools */}
      <Card className="bg-purple-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-200 text-lg">Sacred Tools & Correspondences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h5 className="text-purple-300 font-semibold mb-2">Crystals</h5>
              <div className="space-y-1">
                {angel.crystals.map((crystal, index) => (
                  <div key={index} className="text-purple-100 text-sm">💎 {crystal}</div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-purple-300 font-semibold mb-2">Herbs</h5>
              <div className="space-y-1">
                {angel.herbs.map((herb, index) => (
                  <div key={index} className="text-purple-100 text-sm">🌿 {herb}</div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-purple-300 font-semibold mb-2">Colors</h5>
              <div className="space-y-1">
                {angel.colors.map((color, index) => (
                  <div key={index} className="text-purple-100 text-sm">🎨 {color}</div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-purple-300 font-semibold mb-2">Offerings</h5>
              <div className="space-y-1">
                {angel.offerings.map((offering, index) => (
                  <div key={index} className="text-purple-100 text-sm">🕯️ {offering}</div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personality & Partnership */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-indigo-900/30 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-200 text-lg">Personality Traits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {angel.personalityTraits.map((trait, index) => (
                <div key={index} className="text-indigo-100 text-sm flex items-center">
                  <span className="text-indigo-400 mr-2">👤</span>
                  <span>{trait}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-900/30 border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-amber-200 text-lg">Signs of Presence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {angel.commonSigns.map((sign, index) => (
                <div key={index} className="text-amber-100 text-sm flex items-start">
                  <span className="text-amber-400 mr-2">✨</span>
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historical and Modern Context */}
      <Card className="bg-gray-900/50 border-gray-500/30">
        <CardHeader>
          <CardTitle className="text-gray-200 text-lg">Historical & Modern Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h5 className="text-gray-300 font-semibold mb-2">Historical Significance</h5>
            <p className="text-gray-100 text-sm leading-relaxed">{angel.historicalSignificance}</p>
          </div>
          <Separator className="bg-gray-600/50" />
          <div>
            <h5 className="text-gray-300 font-semibold mb-2">Modern Relevance</h5>
            <p className="text-gray-100 text-sm leading-relaxed">{angel.modernRelevance}</p>
          </div>
          <Separator className="bg-gray-600/50" />
          <div>
            <h5 className="text-gray-300 font-semibold mb-2">Working Partnership</h5>
            <p className="text-gray-100 text-sm leading-relaxed">{angel.workingPartnership}</p>
          </div>
        </CardContent>
      </Card>

      {/* Sacred Prayers */}
      <Card className="bg-yellow-900/30 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-200 text-lg">Sacred Invocation Prayer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-800/30 p-4 rounded-lg border border-yellow-600/30">
            <p className="text-yellow-100 italic leading-relaxed whitespace-pre-line">
              {angel.invocationPrayer}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Protection and Banishing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-cyan-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-200 text-lg">Maintaining Protection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-cyan-100 text-sm leading-relaxed">{angel.protectionMethod}</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-900/30 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-200 text-lg">Respectful Release</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-100 text-sm leading-relaxed">{angel.banishingMethod}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
