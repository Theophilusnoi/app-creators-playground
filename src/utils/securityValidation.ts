
import { sanitizeInput, sanitizeHTML } from './security';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string;
}

/**
 * Validates and sanitizes spiritual content input
 */
export const validateSpiritualContent = (content: string, maxLength: number = 2000): ValidationResult => {
  if (!content || typeof content !== 'string') {
    return { isValid: false, error: 'Content is required' };
  }

  if (content.length > maxLength) {
    return { isValid: false, error: `Content must be less than ${maxLength} characters` };
  }

  // Check for potential security threats
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      return { isValid: false, error: 'Invalid content detected' };
    }
  }

  const sanitizedValue = sanitizeInput(content);
  return { isValid: true, sanitizedValue };
};

/**
 * Validates dream journal entries
 */
export const validateDreamEntry = (title: string, content: string): ValidationResult => {
  const titleValidation = validateSpiritualContent(title, 200);
  if (!titleValidation.isValid) {
    return { isValid: false, error: `Title: ${titleValidation.error}` };
  }

  const contentValidation = validateSpiritualContent(content, 5000);
  if (!contentValidation.isValid) {
    return { isValid: false, error: `Content: ${contentValidation.error}` };
  }

  return { isValid: true };
};

/**
 * Validates meditation session data
 */
export const validateMeditationSession = (type: string, duration: number): ValidationResult => {
  if (!type || typeof type !== 'string') {
    return { isValid: false, error: 'Meditation type is required' };
  }

  if (type.length > 100) {
    return { isValid: false, error: 'Meditation type is too long' };
  }

  if (typeof duration !== 'number' || duration < 1 || duration > 480) {
    return { isValid: false, error: 'Duration must be between 1 and 480 minutes' };
  }

  const sanitizedType = sanitizeInput(type);
  return { isValid: true, sanitizedValue: sanitizedType };
};

/**
 * Rate limiting for user actions
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 10, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  checkLimit(userId: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(userId) || [];
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }

    validAttempts.push(now);
    this.attempts.set(userId, validAttempts);
    return true;
  }
}

export const chatRateLimiter = new RateLimiter(30, 60000); // 30 messages per minute
export const voiceRateLimiter = new RateLimiter(20, 60000); // 20 voice inputs per minute
