
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useVoiceService } from '@/hooks/useVoiceService';
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { Volume2, VolumeX } from "lucide-react";

interface VoicePlayerProps {
  script: string;
  tone?: string;
}

export const VoicePlayer: React.FC<VoicePlayerProps> = ({ script, tone }) => {
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const { toast } = useToast();
  const {
    generateAndPlay,
    stopAudio,
    setApiKey,
    isGenerating,
    isPlaying
  } = useVoiceService();

  // Flag to detect if a key is set
  const hasApiKey = !!window.localStorage.getItem('elevenlabs_api_key');

  // On mount, set ApiKey if found in localStorage
  React.useEffect(() => {
    const key = localStorage.getItem('elevenlabs_api_key');
    if (key) {
      setApiKey(key);
    }
  }, [setApiKey]);

  const handlePlay = async () => {
    const key = localStorage.getItem('elevenlabs_api_key');
    if (!key) {
      setShowKeyInput(true);
      return;
    }
    const success = await generateAndPlay({
      text: script,
      emotion: tone === 'nurturing_gentle' ? 'compassionate' : undefined,
    });
    if (!success) {
      toast({
        title: "Voice playback failed",
        description: "Could not play voice. Check your ElevenLabs API key and try again!",
        variant: "destructive"
      });
    }
  };

  const handleSaveKey = () => {
    if (!apiKeyInput.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please paste your ElevenLabs API key.",
        variant: "destructive"
      });
      return;
    }
    localStorage.setItem('elevenlabs_api_key', apiKeyInput);
    setApiKey(apiKeyInput);
    setShowKeyInput(false);
    setApiKeyInput('');
    toast({
      title: "API Key Saved",
      description: "Your ElevenLabs key has been saved. Try playing again!",
    });
  };

  return (
    <div className="my-2 flex flex-col gap-2">
      {showKeyInput && (
        <div className="p-3 rounded bg-purple-950 border border-purple-700">
          <div className="mb-2 text-xs text-purple-200">
            To enable voice playback, please paste your ElevenLabs API key (get one at <a href="https://elevenlabs.io/" target="_blank" rel="noopener noreferrer" className="underline">elevenlabs.io</a> – your key is stored only in your browser).
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Paste your ElevenLabs API Key"
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSaveKey} className="bg-purple-700 text-white">
              Save Key
            </Button>
          </div>
        </div>
      )}
      <Button
        onClick={isPlaying ? stopAudio : handlePlay}
        disabled={isGenerating}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-white ${isPlaying ? "bg-purple-400 hover:bg-purple-300" : "bg-purple-600 hover:bg-purple-700"}`}
      >
        {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        {isPlaying ? "Stop" : isGenerating ? "Loading..." : "Play Voice"}
      </Button>
    </div>
  );
};

