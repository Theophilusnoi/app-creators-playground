
export interface DetectedEntity {
  severity: number;
  type: string;
  indicators: string[];
}

export interface EntityAttachmentDetectorProps {
  message: string;
  onEntityDetected: (severity: number, entityType: string) => void;
  onActivateRemoval: (removalType: string) => void;
}

export const ENTITY_KEYWORDS = {
  mild: [
    'drained', 'exhausted', 'mood swings', 'negative thoughts',
    'feeling watched', 'cold spots', 'unexplained emotions'
  ],
  moderate: [
    'entity attachment', 'parasitic entity', 'energy vampire',
    'foreign thoughts', 'not feeling like myself', 'possession',
    'spirit attachment', 'earthbound spirit', 'lost soul'
  ],
  severe: [
    'demonic possession', 'demonic attachment', 'demon inside me',
    'multiple entities', 'dark entity', 'evil presence',
    'losing control', 'voices commanding', 'entity control'
  ]
};

export const ENTITY_TYPES = {
  'parasitic_entity': ['parasitic entity', 'energy vampire', 'drained', 'exhausted'],
  'earthbound_spirit': ['earthbound spirit', 'lost soul', 'spirit attachment', 'ghost'],
  'demonic_attachment': ['demonic', 'demon', 'dark entity', 'evil presence'],
  'thought_form': ['foreign thoughts', 'not feeling like myself', 'personality changes'],
  'multiple_entities': ['multiple entities', 'many voices', 'chaos inside']
};
