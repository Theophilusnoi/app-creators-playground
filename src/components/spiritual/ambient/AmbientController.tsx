
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX, Settings, Play, Pause, Headphones } from 'lucide-react';
import { ambientSoundService, SoundProfile, SoundLayer } from '@/services/ambientSoundService';
import { WeatherBadge } from './WeatherBadge';
import { ProfileDisplay } from './ProfileDisplay';
import { LayerControls } from './LayerControls';

interface AmbientControllerProps {
  meditationType?: string;
  onVolumeChange?: (volume: number) => void;
}

export const AmbientController: React.FC<AmbientControllerProps> = ({
  meditationType,
  onVolumeChange
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(50);
  const [currentProfile, setCurrentProfile] = useState<SoundProfile | null>(null);
  const [activeLayers, setActiveLayers] = useState<SoundLayer[]>([]);
  const [soundProfiles, setSoundProfiles] = useState<SoundProfile[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    initializeAmbientSound();
    return () => {
      ambientSoundService.stopAll();
    };
  }, []);

  useEffect(() => {
    if (isInitialized && !isPlaying) {
      selectAndStartOptimalProfile();
    }
  }, [meditationType, isInitialized]);

  const initializeAmbientSound = async () => {
    const success = await ambientSoundService.initialize();
    if (success) {
      setIsInitialized(true);
      setSoundProfiles(ambientSoundService.getSoundProfiles());
    }
  };

  const selectAndStartOptimalProfile = async () => {
    const context = ambientSoundService.getCurrentContext();
    const optimalProfile = ambientSoundService.selectOptimalProfile(context, meditationType);
    
    if (optimalProfile) {
      const success = await ambientSoundService.startProfile(optimalProfile, context);
      if (success) {
        setCurrentProfile(optimalProfile);
        setActiveLayers(ambientSoundService.getActiveLayers());
        setIsPlaying(true);
      }
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      ambientSoundService.stopAll();
      setIsPlaying(false);
      setCurrentProfile(null);
      setActiveLayers([]);
    } else {
      await selectAndStartOptimalProfile();
    }
  };

  const handleMasterVolumeChange = (value: number[]) => {
    const volume = value[0] / 100;
    setMasterVolume(value[0]);
    ambientSoundService.setMasterVolume(volume);
    onVolumeChange?.(volume);
  };

  const handleLayerVolumeChange = (layerId: string, volume: number) => {
    ambientSoundService.adjustLayer(layerId, volume / 100);
  };

  if (!isInitialized) {
    return (
      <Card className="bg-gray-800/50 border-gray-600">
        <CardContent className="p-4">
          <div className="text-center text-white font-bold text-lg crisp-text">
            Initializing ambient soundscapes...
          </div>
        </CardContent>
      </Card>
    );
  }

  const context = ambientSoundService.getCurrentContext();

  return (
    <Card className="bg-gray-800/50 border-gray-600 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <Headphones className="w-5 h-5 text-purple-400" />
            <span className="crisp-text text-xl font-bold">Ambient Soundscape</span>
          </div>
          <WeatherBadge context={context} />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Controls */}
        <div className="flex items-center justify-between">
          <Button
            onClick={togglePlayback}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-lg crisp-text ${
              isPlaying 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause Ambience' : 'Start Ambience'}
          </Button>

          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="outline"
            size="sm"
            className="border-gray-600 text-white hover:bg-gray-700 font-bold crisp-text"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Current Profile */}
        <ProfileDisplay profile={currentProfile} />

        {/* Master Volume */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-white font-bold text-lg crisp-text">Master Volume</label>
            <span className="text-white font-bold text-lg crisp-text">{masterVolume}%</span>
          </div>
          <div className="flex items-center gap-3">
            <VolumeX className="w-4 h-4 text-gray-200" />
            <Slider
              value={[masterVolume]}
              onValueChange={handleMasterVolumeChange}
              max={100}
              step={1}
              className="flex-1"
            />
            <Volume2 className="w-4 h-4 text-gray-200" />
          </div>
        </div>

        {/* Layer Controls */}
        {showSettings && (
          <LayerControls 
            layers={activeLayers}
            onVolumeChange={handleLayerVolumeChange}
          />
        )}

        {/* Profile Selector */}
        {showSettings && (
          <div className="space-y-3 pt-2 border-t border-gray-600">
            <h5 className="text-white font-bold text-lg crisp-text">Available Profiles</h5>
            <div className="grid grid-cols-1 gap-2">
              {soundProfiles.map((profile) => (
                <Button
                  key={profile.id}
                  onClick={async () => {
                    const context = ambientSoundService.getCurrentContext();
                    await ambientSoundService.startProfile(profile, context);
                    setCurrentProfile(profile);
                    setActiveLayers(ambientSoundService.getActiveLayers());
                    setIsPlaying(true);
                  }}
                  variant={currentProfile?.id === profile.id ? "default" : "outline"}
                  size="sm"
                  className="justify-start text-left p-3 h-auto"
                >
                  <div>
                    <div className="font-bold text-base crisp-text text-white">{profile.name}</div>
                    <div className="text-sm text-gray-200 font-semibold crisp-text">{profile.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
