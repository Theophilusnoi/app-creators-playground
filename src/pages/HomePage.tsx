
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Star, Users, BookOpen } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl font-bold text-white">Spiritual Break Through</h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Begin your spiritual awakening journey with AI-powered guidance, ancient wisdom, and transformative practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link to="/auth">Start Your Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-purple-400 text-purple-200">
              <Link to="/pricing">View Plans</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-400" />
                Fire Keeper AI Mentorship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Weekly 1:1 sessions with advanced AI spiritual guidance and personalized practices.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                Ancient Wisdom
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Access sacred traditions, ancient texts, and time-tested spiritual practices.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-green-400" />
                Sacred Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Join councils of advanced practitioners and participate in group rituals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
