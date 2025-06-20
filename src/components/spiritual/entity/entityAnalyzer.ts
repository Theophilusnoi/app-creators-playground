
import { ENTITY_KEYWORDS, ENTITY_TYPES, DetectedEntity } from './entityTypes';

export const analyzeForEntityAttachment = (text: string): DetectedEntity | null => {
  if (!text || text.length < 3) {
    return null;
  }

  const lowerText = text.toLowerCase();
  const indicators: string[] = [];
  let severity = 0;
  let entityType = '';

  // Check severity levels
  for (const keyword of ENTITY_KEYWORDS.severe) {
    if (lowerText.includes(keyword)) {
      indicators.push(`SEVERE: "${keyword}"`);
      severity = Math.max(severity, 3);
    }
  }

  for (const keyword of ENTITY_KEYWORDS.moderate) {
    if (lowerText.includes(keyword)) {
      indicators.push(`MODERATE: "${keyword}"`);
      severity = Math.max(severity, 2);
    }
  }

  for (const keyword of ENTITY_KEYWORDS.mild) {
    if (lowerText.includes(keyword)) {
      indicators.push(`MILD: "${keyword}"`);
      severity = Math.max(severity, 1);
    }
  }

  // Identify specific entity type
  for (const [type, keywords] of Object.entries(ENTITY_TYPES)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        entityType = type;
        break;
      }
    }
    if (entityType) break;
  }

  if (severity > 0) {
    return { severity, type: entityType, indicators };
  }

  return null;
};
