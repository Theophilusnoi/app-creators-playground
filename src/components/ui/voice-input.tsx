
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechToText } from '@/hooks/useSpeechToText';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onTranscript, 
  className = '',
  size = 'sm'
}) => {
  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechToText();

  React.useEffect(() => {
    if (transcript && !isListening) {
      onTranscript(transcript);
    }
  }, [transcript, isListening, onTranscript]);

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      type="button"
      size={size}
      variant={isListening ? "destructive" : "outline"}
      onClick={handleToggle}
      className={className}
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4 mr-1" />
          Stop Recording
        </>
      ) : (
        <>
          <Mic className="w-4 h-4 mr-1" />
          Voice Record
        </>
      )}
    </Button>
  );
};
