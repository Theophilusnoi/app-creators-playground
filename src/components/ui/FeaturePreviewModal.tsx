
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Play, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';

interface FeaturePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    title: string;
    description: string;
    preview: {
      type: 'image' | 'video' | 'demo';
      content: string;
      caption?: string;
    };
    benefits: string[];
    tier: 'free' | 'fire' | 'ether';
    route: string;
  };
}

const FeaturePreviewModal: React.FC<FeaturePreviewModalProps> = ({
  isOpen,
  onClose,
  feature
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const tierInfo = {
    free: { name: 'Free', color: 'bg-green-500', price: 'Free Forever' },
    fire: { name: 'Fire Keeper', color: 'bg-orange-500', price: '$19.70/month' },
    ether: { name: 'Ether Walker', color: 'bg-purple-500', price: '$49.70/month' }
  };

  const handleTryNow = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate(feature.route);
    }
    onClose();
  };

  const handleUpgrade = () => {
    navigate('/pricing');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-900 border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            {feature.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Content */}
          <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-lg p-6 border border-purple-500/20">
            {feature.preview.type === 'image' && (
              <div className="text-center">
                <div className="w-full h-48 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-6xl">🔮</div>
                </div>
                <p className="text-purple-200 text-sm">{feature.preview.caption}</p>
              </div>
            )}
            
            {feature.preview.type === 'demo' && (
              <div className="text-center">
                <div className="w-full h-48 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mb-4 relative">
                  <Play className="w-16 h-16 text-white/80" />
                  <div className="absolute inset-0 bg-black/20 rounded-lg" />
                </div>
                <p className="text-purple-200 text-sm">{feature.preview.caption}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed">{feature.description}</p>

          {/* Benefits */}
          <div className="bg-purple-900/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              What You'll Experience:
            </h4>
            <ul className="space-y-2">
              {feature.benefits.map((benefit, index) => (
                <li key={index} className="text-purple-300 text-sm flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 mt-0.5 text-purple-400 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Tier Badge */}
          <div className="flex items-center justify-center">
            <Badge 
              className={`${tierInfo[feature.tier].color} text-white px-4 py-2`}
            >
              {tierInfo[feature.tier].name} Feature - {tierInfo[feature.tier].price}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleTryNow}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
              size="lg"
            >
              {!user ? 'Sign In to Try' : feature.tier === 'free' ? 'Try Now' : 'Access Feature'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            {feature.tier !== 'free' && (
              <Button 
                onClick={handleUpgrade}
                variant="outline"
                className="border-purple-400 text-purple-200 hover:bg-purple-600/20"
                size="lg"
              >
                View Pricing
              </Button>
            )}
          </div>

          {!user && (
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-200 text-sm text-center">
                Create your free account to save your spiritual journey progress and access personalized insights.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeaturePreviewModal;
