
export interface AncientSource {
  source_id: string;
  source_name: string;
  culture: string;
  approx_date: string;
  original_excerpt?: string;
  translation: string;
  verification_status: 'verified' | 'disputed' | 'uncertain';
}

export interface TraditionInterpretation {
  interpretation_id: string;
  tradition_name: string;
  meaning: string;
  context_rules: string;
  prescribed_action: string;
  is_verified: boolean;
}

export interface DreamSymbol {
  symbol_id: string;
  symbol_name: string;
  universal_archetype: string;
  physical_description: string;
  interpretations: TraditionInterpretation[];
  sources: AncientSource[];
}

export interface LucidTechnique {
  technique_id: string;
  name: string;
  tradition: string;
  preparation: string;
  sleep_posture: string;
  visualization: string;
  mantra?: string;
  duration: string;
}

export interface InterpretationResult {
  primary_symbols: DreamSymbol[];
  cultural_interpretation: string;
  universal_archetypes: string[];
  prescribed_ritual: string;
  confidence_score: number;
  sources_cited: AncientSource[];
}

export type CulturalTradition = 
  | 'egyptian' 
  | 'mesopotamian' 
  | 'greek' 
  | 'islamic' 
  | 'vedic' 
  | 'chinese' 
  | 'shamanic';
