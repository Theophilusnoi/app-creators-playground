
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, X } from 'lucide-react';

interface MobileOptimizedModalProps {
  open: boolean;
  onClose: () => void;
  onBegin: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  beginButtonText?: string;
  closeButtonText?: string;
  headerIcon?: string;
}

export const MobileOptimizedModal: React.FC<MobileOptimizedModalProps> = ({
  open,
  onClose,
  onBegin,
  title,
  subtitle,
  children,
  beginButtonText = "Begin Practice",
  closeButtonText = "Learn More Later",
  headerIcon = "🌟"
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white mobile-backdrop">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl text-center text-white mb-4 crisp-text">
            {headerIcon} {title}
          </DialogTitle>
          {subtitle && (
            <p className="text-gray-300 text-center text-base md:text-lg crisp-text">{subtitle}</p>
          )}
        </DialogHeader>

        <div className="space-y-6 mobile-optimized">
          {children}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 min-h-[48px] crisp-text font-semibold"
            >
              {closeButtonText}
            </Button>
            <Button
              onClick={onBegin}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white min-h-[48px] crisp-text font-semibold"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              {beginButtonText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const MobileOptimizedCard: React.FC<{
  title: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  children: React.ReactNode;
}> = ({ title, icon: Icon, iconColor, children }) => {
  return (
    <Card className="bg-gray-800 border-gray-700 mobile-backdrop">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon className={`w-6 h-6 md:w-8 md:h-8 ${iconColor}`} />
          <h3 className="text-lg md:text-xl font-semibold crisp-text">{title}</h3>
        </div>
        <div className="mobile-optimized">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};
