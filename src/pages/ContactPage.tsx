
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, Send, Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Contact form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    if (!authEmail || !authPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      setAuthLoading(false);
      return;
    }
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            emailRedirectTo: window.location.origin + '/dashboard',
          },
        });
        if (error) {
          toast({
            title: 'Sign up failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          setAwaitingConfirmation(true);
          toast({
            title: 'Check your email',
            description: "We've sent you a confirmation link. Please confirm your email address to continue.",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) {
          toast({
            title: 'Sign in failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Welcome back!',
            description: "You've been signed in successfully.",
          });
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: authEmail,
        options: {
          emailRedirectTo: window.location.href,
        },
      });
      if (error) {
        toast({
          title: 'Resend failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Confirmation email resent',
          description: 'Please check your inbox (and spam folder).',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Contact form submission logic would go here
    toast({
      title: 'Message sent!',
      description: 'Thank you for reaching out. We will get back to you soon.',
    });
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard',
        },
      });
      if (error) {
        toast({
          title: 'Google sign-in failed',
          description: error.message,
          variant: 'destructive',
        });
      }
      // On success, Supabase will redirect to /dashboard
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  // Only show contact form if user is confirmed (user && user.email_confirmed_at)
  const isUserConfirmed = user && (user.email_confirmed_at || user.confirmed_at);

  // Redirect to dashboard after confirmation if user is confirmed
  useEffect(() => {
    if (user && (user.email_confirmed_at || user.confirmed_at)) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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

          {/* AUTH SECTION */}
          {!user && !awaitingConfirmation && (
            <Card className="mb-8 bg-black/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg text-center">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 mb-4"
                  disabled={googleLoading}
                >
                  {googleLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <FcGoogle className="w-5 h-5" />
                  )}
                  Continue with Google
                </Button>
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-purple-500/30" />
                  <span className="mx-2 text-purple-200 text-xs">or</span>
                  <div className="flex-grow border-t border-purple-500/30" />
                </div>
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="auth-email" className="text-purple-200">Email</Label>
                    <Input
                      id="auth-email"
                      type="email"
                      placeholder="your@email.com"
                      value={authEmail}
                      onChange={e => setAuthEmail(e.target.value)}
                      className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auth-password" className="text-purple-200">Password</Label>
                    <Input
                      id="auth-password"
                      type="password"
                      placeholder="Password"
                      value={authPassword}
                      onChange={e => setAuthPassword(e.target.value)}
                      className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={authLoading || loading}>
                    {authLoading ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{isSignUp ? 'Creating Account...' : 'Signing In...'}</>
                    ) : (
                      <>{isSignUp ? 'Create Account' : 'Sign In'}</>
                    )}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-purple-300 hover:text-white transition-colors"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Awaiting confirmation message and resend button */}
          {awaitingConfirmation && (
            <Card className="mb-8 bg-black/30 border-purple-500/30 text-center">
              <CardHeader>
                <CardTitle className="text-white text-lg">Confirm your email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-purple-200">We've sent a confirmation link to <span className="font-semibold">{authEmail}</span>.<br />Please check your inbox and confirm your email address to continue.</p>
                <Button onClick={handleResendConfirmation} disabled={resendLoading} className="bg-purple-600 hover:bg-purple-700">
                  {resendLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Resend confirmation email
                </Button>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setAwaitingConfirmation(false)}
                    className="text-sm text-purple-300 hover:text-white transition-colors"
                  >
                    Back to sign in
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CONTACT FORM SECTION */}
          {isUserConfirmed && (
            <>
              <div className="flex justify-end mb-2">
                <Button variant="ghost" size="sm" onClick={signOut} className="text-purple-300 hover:text-white">Sign Out</Button>
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
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-purple-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-purple-200">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-purple-200">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your question or feedback..."
                    rows={5}
                    className="bg-black/20 border-purple-500/30 text-white placeholder-purple-300"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
