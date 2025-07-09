
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/auth/AuthProvider';
import { Star, ArrowLeft, Settings, Book, Users } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <Card className="bg-black/30 border-purple-500/30 p-8">
          <CardContent className="text-center">
            <p className="text-white mb-4">Please log in to access your dashboard</p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link to="/auth">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-8">
      <div className="container mx-auto px-4">
        <Button asChild variant="ghost" className="mb-8 text-purple-200">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold text-white">Spiritual Dashboard</h1>
            </div>
            <p className="text-gray-200">Welcome back, {user.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  Spiritual Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">
                  Access meditation guides, rituals, and spiritual exercises.
                </p>
                <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/spiritual-mind-pro">Explore Practices</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">
                  Connect with fellow practitioners and join group activities.
                </p>
                <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  <Link to="/quantum-spiritual-dashboard">Join Community</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">
                  Manage your profile, subscription, and preferences.
                </p>
                <Button asChild size="sm" variant="outline" className="border-purple-500/30">
                  <Link to="/account">Manage Account</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
