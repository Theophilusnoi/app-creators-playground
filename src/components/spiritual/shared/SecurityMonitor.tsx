
import React, { useEffect } from 'react';
import { logSecurityEvent } from '@/utils/securityLogger';

interface SecurityMonitorProps {
  userId?: string;
  pageName: string;
}

export const SecurityMonitor: React.FC<SecurityMonitorProps> = ({ userId, pageName }) => {
  useEffect(() => {
    // Log page access for security monitoring
    logSecurityEvent({
      eventType: 'page_accessed',
      userId,
      metadata: { pageName, timestamp: new Date().toISOString() },
      severity: 'low'
    });

    // Monitor for suspicious activity patterns
    const handleVisibilityChange = () => {
      if (document.hidden) {
        logSecurityEvent({
          eventType: 'page_hidden',
          userId,
          metadata: { pageName },
          severity: 'low'
        });
      }
    };

    // Monitor for potential security-relevant events
    const handleBeforeUnload = () => {
      logSecurityEvent({
        eventType: 'page_unload',
        userId,
        metadata: { pageName, duration: Date.now() },
        severity: 'low'
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userId, pageName]);

  return null; // This component doesn't render anything
};
