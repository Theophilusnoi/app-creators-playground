
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

interface ProNavigationBarProps {
  onBack?: () => void;
  backLabel?: string;
  showHome?: boolean;
}

export const ProNavigationBar: React.FC<ProNavigationBarProps> = ({
  onBack,
  backLabel = "Back",
  showHome = true
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleHome = () => {
    navigate('/pro');
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <Button
        onClick={handleBack}
        variant="outline"
        className="border-purple-500/30 text-purple-200 hover:bg-purple-600/20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {backLabel}
      </Button>
      
      {showHome && (
        <Button
          onClick={handleHome}
          variant="outline"
          className="border-indigo-500/30 text-indigo-200 hover:bg-indigo-600/20"
        >
          <Home className="w-4 h-4 mr-2" />
          Pro Home
        </Button>
      )}
    </div>
  );
};
