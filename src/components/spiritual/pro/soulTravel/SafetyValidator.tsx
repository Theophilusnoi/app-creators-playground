
import { useToast } from '@/hooks/use-toast';

interface SafetyCheck {
  ageVerification: boolean;
  healthClearance: boolean;
  emotionalState: 'stable' | 'unstable';
  environment: 'safe' | 'unsafe';
  protocolsActive: boolean;
}

interface SessionMonitoring {
  sessionId: string;
  currentTime: number;
  maxDuration: number;
}

interface EmergencyProtocol {
  type: string;
  steps: string[];
  autoActions: string[];
}

export const SafetyValidator = {
  validatePreSession: (user: any, sessionData: any): { allowed: boolean; failedChecks?: string[]; message?: string } => {
    const checks: SafetyCheck = {
      ageVerification: user.age >= 18,
      healthClearance: !user.hasHealthRestrictions && user.healthClearance,
      emotionalState: sessionData.emotionalState || 'stable',
      environment: sessionData.environment || 'safe',
      protocolsActive: Object.values(sessionData.safetyProtocols || {}).every(Boolean)
    };

    const passed = Object.values(checks).every((check) => 
      typeof check === 'boolean' ? check : check === 'stable' || check === 'safe'
    );

    if (!passed) {
      const failedChecks = Object.keys(checks).filter(key => {
        const check = checks[key as keyof SafetyCheck];
        return typeof check === 'boolean' ? !check : check === 'unstable' || check === 'unsafe';
      });

      return {
        allowed: false,
        failedChecks,
        message: 'Please address safety requirements before proceeding'
      };
    }

    return { allowed: true };
  },

  monitorSession: (monitoring: SessionMonitoring): { action: string; message?: string } => {
    const { currentTime, maxDuration } = monitoring;
    const warningTime = maxDuration * 0.75; // 75% of max duration

    if (currentTime >= maxDuration) {
      return {
        action: 'force_end',
        message: 'Session automatically ended for safety'
      };
    }

    if (currentTime >= warningTime) {
      return {
        action: 'warning',
        message: 'Extended session detected. Consider ending soon for optimal safety.'
      };
    }

    return { action: 'continue' };
  },

  handleEmergency: (emergencyType: string): EmergencyProtocol => {
    const protocols: Record<string, EmergencyProtocol> = {
      difficulty_returning: {
        type: 'difficulty_returning',
        steps: [
          'Focus on physical body sensations',
          'Visualize silver cord connection',
          'Move fingers and toes',
          'Open eyes slowly'
        ],
        autoActions: ['end_session', 'log_incident', 'notify_support']
      },
      negative_encounter: {
        type: 'negative_encounter',
        steps: [
          'Activate white light protection',
          'Call upon spirit guides',
          'Return to physical body immediately',
          'Ground with deep breathing'
        ],
        autoActions: ['end_session', 'activate_protection']
      },
      disorientation: {
        type: 'disorientation',
        steps: [
          'Stop all projection activity',
          'Focus on breathing',
          'Ground with physical sensations',
          'Seek immediate support if needed'
        ],
        autoActions: ['end_session', 'activate_grounding', 'log_incident', 'emergency_contact']
      }
    };

    return protocols[emergencyType] || protocols.disorientation;
  },

  logSafetyIncident: (incident: {
    userId: string;
    sessionId?: string;
    incidentType: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }) => {
    // Log to console in development
    console.warn('[Soul Travel Safety Incident]', incident);
    
    // In production, this would send to logging service
    const safetyLog = {
      ...incident,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Store locally for now
    const existingLogs = JSON.parse(localStorage.getItem('soulTravel_safetyLogs') || '[]');
    existingLogs.push(safetyLog);
    localStorage.setItem('soulTravel_safetyLogs', JSON.stringify(existingLogs));

    return safetyLog;
  }
};

export const useSafetyMonitoring = () => {
  const { toast } = useToast();

  const validateSession = (user: any, sessionData: any) => {
    const validation = SafetyValidator.validatePreSession(user, sessionData);
    
    if (!validation.allowed) {
      toast({
        title: "Safety Requirements Not Met",
        description: validation.message,
        variant: "destructive"
      });
    }

    return validation.allowed;
  };

  const handleEmergency = (emergencyType: string, sessionData?: any) => {
    const protocol = SafetyValidator.handleEmergency(emergencyType);
    
    toast({
      title: "Emergency Protocol Activated",
      description: protocol.steps[0],
      variant: "destructive"
    });

    // Log the incident
    if (sessionData?.userId) {
      SafetyValidator.logSafetyIncident({
        userId: sessionData.userId,
        sessionId: sessionData.sessionId,
        incidentType: emergencyType,
        description: `Emergency protocol activated: ${emergencyType}`,
        severity: 'high'
      });
    }

    return protocol;
  };

  return {
    validateSession,
    handleEmergency,
    monitorSession: SafetyValidator.monitorSession,
    logIncident: SafetyValidator.logSafetyIncident
  };
};
