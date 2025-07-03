
import { useState, useCallback } from 'react';
import { chatRateLimiter } from '@/utils/securityValidation';
import { logSecurityEvent, handleSecureError } from '@/utils/securityLogger';
import { sanitizeInput } from '@/utils/security';

interface UseChatSecurityOptions {
  userId?: string;
  chatType: string;
  maxMessageLength?: number;
}

export const useSecureChat = (options: UseChatSecurityOptions) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockReason, setBlockReason] = useState<string | null>(null);

  const validateMessage = useCallback((message: string): { isValid: boolean; error?: string; sanitizedMessage?: string } => {
    if (!message || message.trim().length === 0) {
      return { isValid: false, error: 'Message cannot be empty' };
    }

    const maxLength = options.maxMessageLength || 1000;
    if (message.length > maxLength) {
      return { isValid: false, error: `Message too long (max ${maxLength} characters)` };
    }

    // Check rate limiting
    if (options.userId && !chatRateLimiter.checkLimit(options.userId)) {
      setIsBlocked(true);
      setBlockReason('Too many messages. Please wait a moment before sending another.');
      
      logSecurityEvent({
        eventType: 'rate_limit_exceeded',
        userId: options.userId,
        metadata: { chatType: options.chatType },
        severity: 'medium'
      });
      
      return { isValid: false, error: 'Rate limit exceeded' };
    }

    const sanitizedMessage = sanitizeInput(message);
    return { isValid: true, sanitizedMessage };
  }, [options.userId, options.chatType, options.maxMessageLength]);

  const sendSecureMessage = useCallback(async (
    message: string,
    sendFunction: (sanitizedMessage: string) => Promise<void>
  ): Promise<boolean> => {
    try {
      const validation = validateMessage(message);
      if (!validation.isValid) {
        return false;
      }

      await sendFunction(validation.sanitizedMessage!);
      
      // Log successful message
      await logSecurityEvent({
        eventType: 'message_sent',
        userId: options.userId,
        metadata: { chatType: options.chatType, messageLength: message.length },
        severity: 'low'
      });

      return true;
    } catch (error) {
      const errorMessage = handleSecureError(error, `${options.chatType}_chat`, options.userId);
      console.error('Failed to send message:', errorMessage);
      return false;
    }
  }, [validateMessage, options.userId, options.chatType]);

  return {
    sendSecureMessage,
    validateMessage,
    isBlocked,
    blockReason,
    clearBlock: () => {
      setIsBlocked(false);
      setBlockReason(null);
    }
  };
};
