
export const getSeverityColor = (severity: number): string => {
  switch (severity) {
    case 1: return 'border-blue-500 bg-blue-900/20 text-blue-200';
    case 2: return 'border-purple-500 bg-purple-900/20 text-purple-200';
    case 3: return 'border-red-500 bg-red-900/20 text-red-200';
    default: return 'border-gray-500 bg-gray-900/20 text-gray-200';
  }
};

export const getSeverityName = (severity: number): string => {
  switch (severity) {
    case 1: return 'Mild Entity Influence';
    case 2: return 'Active Entity Attachment';
    case 3: return 'Severe Entity Possession';
    default: return 'Unknown';
  }
};

export const getEntityTypeDescription = (type: string): string => {
  switch (type) {
    case 'parasitic_entity':
      return 'Energy-draining entity - requires spiritual cleansing and boundary work';
    case 'earthbound_spirit':
      return 'Lost soul attachment - needs compassionate release to the light';
    case 'demonic_attachment':
      return 'Demonic entity - requires immediate spiritual warfare and deliverance';
    case 'thought_form':
      return 'Mental intrusion - needs thought pattern clearing and mental protection';
    case 'multiple_entities':
      return 'Multiple entity attachments - requires comprehensive clearing protocol';
    default:
      return 'General entity influence detected';
  }
};
