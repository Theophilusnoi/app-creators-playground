
import { useState, useEffect, useCallback } from 'react';
import { ambientSoundService, SoundProfile, SoundLayer } from '@/services/ambientSoundService';

export const useAmbientSound = (meditationType?: string) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<SoundProfile | null>(null);
  const [activeLayers, setActiveLayers] = useState<SoundLayer[]>([]);
  const [masterVolume, setMasterVolume] = useState(0.5);

  const initialize = useCallback(async () => {
    if (!isInitialized) {
      const success = await ambientSoundService.initialize();
      setIsInitialized(success);
      return success;
    }
    return true;
  }, [isInitialized]);

  const startAmbientSound = useCallback(async () => {
    if (!isInitialized) {
      const success = await initialize();
      if (!success) return false;
    }

    const context = ambientSoundService.getCurrentContext();
    const optimalProfile = ambientSoundService.selectOptimalProfile(context, meditationType);
    
    if (optimalProfile) {
      const success = await ambientSoundService.startProfile(optimalProfile, context);
      if (success) {
        setCurrentProfile(optimalProfile);
        setActiveLayers(ambientSoundService.getActiveLayers());
        setIsPlaying(true);
        return true;
      }
    }
    return false;
  }, [isInitialized, meditationType, initialize]);

  const stopAmbientSound = useCallback(() => {
    ambientSoundService.stopAll();
    setIsPlaying(false);
    setCurrentProfile(null);
    setActiveLayers([]);
  }, []);

  const adjustMasterVolume = useCallback((volume: number) => {
    ambientSoundService.setMasterVolume(volume);
    setMasterVolume(volume);
  }, []);

  const adjustLayerVolume = useCallback((layerId: string, volume: number) => {
    ambientSoundService.adjustLayer(layerId, volume);
  }, []);

  // Auto-initialize on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ambientSoundService.stopAll();
    };
  }, []);

  return {
    isInitialized,
    isPlaying,
    currentProfile,
    activeLayers,
    masterVolume,
    startAmbientSound,
    stopAmbientSound,
    adjustMasterVolume,
    adjustLayerVolume,
    initialize
  };
};
