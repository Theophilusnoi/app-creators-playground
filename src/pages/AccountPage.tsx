
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/auth/AuthProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { User, ArrowLeft, CreditCard, Settings } from 'lucide-react';

const AccountPage = () => {
  const { user, signOut } = useAuth();
  const { subscribed, subscriptionTier } = useSubscription();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <Card className="bg-black/30 border-purple-500/30 p-8">
          <CardContent className="text-center">
            <p className="text-white mb-4">Please log in to access your account</p>
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
          <Link to="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <User className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold text-white">Account Settings</h1>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-purple-200 text-sm">Email</label>
                  <p className="text-white">{user.email}</p>
                </div>
                <div>
                  <label className="text-purple-200 text-sm">User ID</label>
                  <p className="text-gray-300 text-sm font-mono">{user.id}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Subscription Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-purple-200 text-sm">Current Plan</label>
                  <p className="text-white capitalize">
                    {subscribed ? `${subscriptionTier} Tier` : 'Free Tier'}
                  </p>
                </div>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/pricing">Manage Subscription</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={signOut}
                  variant="outline" 
                  className="border-red-500/30 text-red-200 hover:bg-red-900/20"
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
