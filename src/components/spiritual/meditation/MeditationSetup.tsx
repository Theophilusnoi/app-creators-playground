
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Loader2 } from "lucide-react";

interface MeditationType {
  value: string;
  label: string;
  description: string;
}

const MEDITATION_TYPES: MeditationType[] = [
  {
    value: 'mindfulness',
    label: 'Mindfulness Meditation',
    description: 'Focus on present moment awareness'
  },
  {
    value: 'breathwork',
    label: 'Breathwork Meditation',
    description: 'Control and awareness of breath'
  },
  {
    value: 'visualization',
    label: 'Visualization Meditation',
    description: 'Using mental imagery for relaxation'
  },
  {
    value: 'loving_kindness',
    label: 'Loving-Kindness Meditation',
    description: 'Cultivating feelings of love and compassion'
  },
  {
    value: 'body_scan',
    label: 'Body Scan Meditation',
    description: 'Systematic attention to body sensations'
  }
];

interface MeditationSetupProps {
  selectedType: string;
  duration: number;
  isGeneratingGuidance: boolean;
  onTypeChange: (type: string) => void;
  onDurationChange: (duration: number) => void;
  onStart: () => void;
}

export const MeditationSetup: React.FC<MeditationSetupProps> = ({
  selectedType,
  duration,
  isGeneratingGuidance,
  onTypeChange,
  onDurationChange,
  onStart
}) => {
  return (
    <div className="space-y-4">
      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white w-full">
          <SelectValue placeholder="Select Meditation Type" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-white border-gray-600">
          {MEDITATION_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value} className="text-white hover:bg-gray-700">
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-2">
        <h4 className="text-white font-semibold">Duration ({duration} min)</h4>
        <Slider
          value={[duration]}
          max={60}
          min={1}
          step={1}
          onValueChange={(value) => onDurationChange(value[0])}
          className="text-purple-500"
        />
      </div>

      <Button 
        onClick={onStart}
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isGeneratingGuidance}
      >
        {isGeneratingGuidance ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Guidance...
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Begin Meditation
          </>
        )}
      </Button>
    </div>
  );
};
