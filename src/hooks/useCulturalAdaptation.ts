
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { culturalAdapter, AdaptationContext } from '@/utils/culturalAdaptationEngine';
import { spiritualValidator } from '@/utils/spiritualTerminologyValidator';

export const useCulturalAdaptation = (userTradition: string = 'secular') => {
  const { t } = useTranslation();

  const adaptContent = useCallback((
    content: string,
    context: Omit<AdaptationContext, 'userTradition'>
  ) => {
    const fullContext: AdaptationContext = {
      ...context,
      userTradition
    };

    // First validate for cultural sensitivity
    const validation = spiritualValidator.validateContent(content, userTradition);
    
    if (!validation.isValid) {
      console.warn('Cultural validation issues:', validation.issues);
      // You might want to handle this differently based on your app's requirements
    }

    // Then adapt the content
    return culturalAdapter.adaptContent(content, fullContext);
  }, [userTradition]);

  const getProfile = useCallback(() => {
    return culturalAdapter.getProfile(userTradition);
  }, [userTradition]);

  const validateTerminology = useCallback((content: string) => {
    return spiritualValidator.validateContent(content, userTradition);
  }, [userTradition]);

  return {
    adaptContent,
    getProfile,
    validateTerminology,
    t // Re-export translation function for convenience
  };
};
