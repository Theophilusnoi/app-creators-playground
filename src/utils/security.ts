
import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'span', 'p', 'br'],
    ALLOWED_ATTR: ['class']
  });
};

/**
 * Sanitizes user input for display
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .substring(0, 1000); // Limit length
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain uppercase, lowercase, and number' };
  }
  return { isValid: true, message: 'Password is valid' };
};

/**
 * Sanitizes error messages to prevent information disclosure
 */
export const sanitizeError = (error: any): string => {
  if (typeof error === 'string') {
    return error.includes('supabase') || error.includes('database') 
      ? 'A system error occurred. Please try again.' 
      : error;
  }
  if (error?.message) {
    return error.message.includes('supabase') || error.message.includes('database')
      ? 'A system error occurred. Please try again.'
      : error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};
