
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Contact form submission logic would go here
    console.log('Contact form submitted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-8">
      <div className="container mx-auto px-4">
        <Button asChild variant="ghost" className="mb-8 text-purple-200">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold text-white">Contact Us</h1>
            </div>
            <p className="text-gray-200">
              Have questions about your spiritual journey? We're here to help.
            </p>
          </div>

          <Card className="bg-black/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-purple-200">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-purple-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-purple-200">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-purple-200">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your question or feedback..."
                    rows={5}
                    className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
