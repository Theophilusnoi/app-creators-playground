
import { supabase } from '@/integrations/supabase/client';
import { sanitizeError } from './security';

export interface SecurityEvent {
  eventType: string;
  userId?: string;
  metadata?: Record<string, any>;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Logs security events to the database
 */
export const logSecurityEvent = async (event: SecurityEvent): Promise<void> => {
  try {
    // Get user IP and user agent (if available)
    const userAgent = navigator?.userAgent;
    
    // Sanitize metadata to prevent sensitive data logging
    const sanitizedMetadata = event.metadata ? {
      ...event.metadata,
      // Remove any potential sensitive fields
      password: undefined,
      token: undefined,
      key: undefined,
      secret: undefined
    } : {};

    await supabase
      .from('security_logs')
      .insert({
        event_type: event.eventType,
        user_id: event.userId,
        user_agent: userAgent,
        metadata: sanitizedMetadata
      });
  } catch (error) {
    // Silently fail to prevent blocking user actions
    console.error('Failed to log security event:', sanitizeError(error));
  }
};

/**
 * Secure console logging that removes sensitive data in production
 */
export const secureLog = (level: 'info' | 'warn' | 'error', message: string, data?: any): void => {
  // Only log in development environment
  if (process.env.NODE_ENV === 'development') {
    const sanitizedData = data ? sanitizeForLogging(data) : undefined;
    console[level](message, sanitizedData);
  }
};

/**
 * Removes sensitive information from log data
 */
const sanitizeForLogging = (data: any): any => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sensitiveKeys = ['password', 'token', 'key', 'secret', 'auth', 'jwt'];
  const sanitized = { ...data };

  for (const key of sensitiveKeys) {
    if (key in sanitized) {
      sanitized[key] = '[REDACTED]';
    }
  }

  return sanitized;
};

/**
 * Enhanced error handler that prevents information disclosure
 */
export const handleSecureError = (error: any, context: string, userId?: string): string => {
  const sanitizedError = sanitizeError(error);
  
  // Log security event for monitoring
  logSecurityEvent({
    eventType: 'error_occurred',
    userId,
    metadata: { context, error: sanitizedError },
    severity: 'medium'
  });

  secureLog('error', `Error in ${context}:`, error);
  return sanitizedError;
};
