
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Volume2, 
  VolumeX, 
  Settings, 
  Play, 
  Pause,
  Cloud,
  Sun,
  CloudRain,
  Headphones
} from 'lucide-react';
import { ambientSoundService, SoundProfile, SoundLayer } from '@/services/ambientSoundService';

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

  const getWeatherIcon = () => {
    const context = ambientSoundService.getCurrentContext();
    switch (context.weather) {
      case 'rainy': return <CloudRain className="w-4 h-4" />;
      case 'cloudy': return <Cloud className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  const getTimeOfDayColor = () => {
    const context = ambientSoundService.getCurrentContext();
    switch (context.timeOfDay) {
      case 'dawn': return 'from-orange-500 to-pink-500';
      case 'morning': return 'from-yellow-400 to-orange-400';
      case 'afternoon': return 'from-blue-400 to-cyan-400';
      case 'evening': return 'from-purple-500 to-indigo-500';
      case 'night': return 'from-indigo-600 to-purple-700';
      default: return 'from-gray-500 to-gray-600';
    }
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

  return (
    <Card className="bg-gray-800/50 border-gray-600 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <Headphones className="w-5 h-5 text-purple-400" />
            <span className="crisp-text text-xl font-bold">Ambient Soundscape</span>
          </div>
          <div className="flex items-center gap-2">
            {getWeatherIcon()}
            <Badge className={`bg-gradient-to-r ${getTimeOfDayColor()} text-white font-bold text-sm`}>
              {ambientSoundService.getCurrentContext().timeOfDay}
            </Badge>
          </div>
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
        {currentProfile && (
          <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-bold text-lg crisp-text">{currentProfile.name}</h4>
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-100 font-bold border border-purple-400">
                Active
              </Badge>
            </div>
            <p className="text-gray-100 text-base font-semibold crisp-text">{currentProfile.description}</p>
          </div>
        )}

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
        {showSettings && activeLayers.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-gray-600">
            <h5 className="text-white font-bold text-lg crisp-text">Layer Controls</h5>
            {activeLayers.map((layer) => (
              <div key={layer.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`text-sm font-bold ${
                        layer.type === 'nature' ? 'bg-green-600 text-white' :
                        layer.type === 'instrument' ? 'bg-blue-600 text-white' :
                        'bg-purple-600 text-white'
                      }`}
                    >
                      {layer.type}
                    </Badge>
                    <span className="text-white text-base font-bold crisp-text">{layer.name}</span>
                  </div>
                  <Badge variant="outline" className="text-sm font-bold text-white border-white">
                    {layer.density}
                  </Badge>
                </div>
                <Slider
                  defaultValue={[layer.volume * 100]}
                  onValueChange={(value) => handleLayerVolumeChange(layer.id, value[0])}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            ))}
          </div>
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
