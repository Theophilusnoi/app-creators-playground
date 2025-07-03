
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateSpiritualContent, ValidationResult } from '@/utils/securityValidation';
import { logSecurityEvent } from '@/utils/securityLogger';

interface SecureFormWrapperProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  userId?: string;
  formType: string;
}

export const SecureFormWrapper: React.FC<SecureFormWrapperProps> = ({
  children,
  onSubmit,
  userId,
  formType
}) => {
  const [securityError, setSecurityError] = React.useState<string | null>(null);

  const handleSecureSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSecurityError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const data: Record<string, any> = {};

      // Validate all form fields
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') {
          const validation: ValidationResult = validateSpiritualContent(value);
          if (!validation.isValid) {
            setSecurityError(validation.error || 'Invalid input detected');
            
            // Log potential security threat
            await logSecurityEvent({
              eventType: 'validation_failed',
              userId,
              metadata: { formType, field: key, error: validation.error },
              severity: 'medium'
            });
            return;
          }
          data[key] = validation.sanitizedValue || value;
        } else {
          data[key] = value;
        }
      }

      // Log successful form submission
      await logSecurityEvent({
        eventType: 'form_submitted',
        userId,
        metadata: { formType },
        severity: 'low'
      });

      onSubmit(data);
    } catch (error) {
      setSecurityError('An error occurred while processing your request');
      
      await logSecurityEvent({
        eventType: 'form_error',
        userId,
        metadata: { formType, error: String(error) },
        severity: 'high'
      });
    }
  };

  return (
    <form onSubmit={handleSecureSubmit} className="space-y-4">
      {securityError && (
        <Alert variant="destructive">
          <AlertDescription>{securityError}</AlertDescription>
        </Alert>
      )}
      {children}
    </form>
  );
};
