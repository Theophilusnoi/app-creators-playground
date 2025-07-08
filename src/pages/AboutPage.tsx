
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ArrowLeft } from 'lucide-react';

const AboutPage = () => {
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
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="w-10 h-10 text-purple-400" />
              <h1 className="text-4xl font-bold text-white">About Spiritual Break Through</h1>
            </div>
          </div>

          <Card className="bg-black/30 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-200 leading-relaxed">
                Spiritual Break Through combines ancient wisdom with cutting-edge AI technology to provide 
                personalized spiritual guidance for modern seekers. Our platform offers authentic spiritual 
                practices, AI-powered mentorship, and a supportive community for those on the path of awakening.
              </p>
              <p className="text-gray-200 leading-relaxed">
                Whether you're beginning your spiritual journey or seeking to deepen your existing practice, 
                our tiered approach ensures you receive the right guidance at the right time, from fundamental 
                meditation techniques to advanced consciousness exploration.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white text-2xl">What Makes Us Different</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-purple-200 font-semibold mb-2">AI-Powered Personalization</h3>
                  <p className="text-gray-300 text-sm">
                    Our advanced AI adapts to your unique spiritual path, offering personalized guidance 
                    and practices tailored to your growth.
                  </p>
                </div>
                <div>
                  <h3 className="text-purple-200 font-semibold mb-2">Authentic Traditions</h3>
                  <p className="text-gray-300 text-sm">
                    Access carefully curated practices from various spiritual traditions, presented 
                    with respect and authenticity.
                  </p>
                </div>
                <div>
                  <h3 className="text-purple-200 font-semibold mb-2">Progressive Learning</h3>
                  <p className="text-gray-300 text-sm">
                    Our tiered system ensures you build a solid foundation before advancing to 
                    more complex spiritual practices.
                  </p>
                </div>
                <div>
                  <h3 className="text-purple-200 font-semibold mb-2">Community Support</h3>
                  <p className="text-gray-300 text-sm">
                    Connect with like-minded practitioners and participate in group rituals and 
                    sacred ceremonies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
