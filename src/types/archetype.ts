
export interface SoulArchetype {
  id: string;
  name: string;
  tradition: string;
  description: string;
  attributes: string[];
  element: 'earth' | 'water' | 'fire' | 'air' | 'ether';
  deity: string;
  colors: string[];
  symbols: string[];
  challenges: string[];
  gifts: string[];
}

export interface ArchetypeProfile {
  primaryArchetype: SoulArchetype;
  secondaryArchetype?: SoulArchetype;
  culturalLineage: string[];
  spiritualMaturity: number;
  activatedGifts: string[];
  shadowWork: string[];
}

export interface CulturalTradition {
  id: string;
  name: string;
  region: string;
  verified: boolean;
  elderCouncil: string[];
  accessLevel: 'open' | 'initiated' | 'sacred';
  territoryAcknowledgment: string;
}
