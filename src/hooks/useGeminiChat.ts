
import { useState } from 'react';
import { generateGeminiResponse, buildSeraphinaSystemPrompt } from '@/services/geminiService';

interface UseGeminiChatOptions {
  personality?: any;
  tradition?: string;
  context?: any;
}

export const useGeminiChat = (options: UseGeminiChatOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (
    message: string, 
    conversationHistory: any[] = [],
    customSystemPrompt?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const systemPrompt = customSystemPrompt || buildSeraphinaSystemPrompt(
        options.personality || {
          warmth_level: 8,
          wisdom_level: 9,
          compassion_level: 9,
          humor_level: 5,
          communication_style: 'balanced'
        },
        options.tradition || 'eclectic'
      );

      const response = await generateGeminiResponse({
        message,
        context: options.context,
        personality: options.personality,
        conversationHistory,
        systemPrompt
      });

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateSpiritualResponse = async (
    prompt: string,
    context?: any
  ) => {
    const spiritualPrompt = `As Seraphina, a wise spiritual guide, provide gentle, nurturing guidance for: ${prompt}`;
    
    return sendMessage(prompt, [], spiritualPrompt);
  };

  const generateMeditationGuidance = async (
    meditationType: string,
    duration: number,
    tradition: string
  ) => {
    const prompt = `Please provide guided meditation instructions for a ${duration}-minute ${meditationType} meditation in the ${tradition} tradition.`;
    
    const systemPrompt = `You are Seraphina, providing a guided meditation. Speak directly to the practitioner with gentle, calming instructions. Format as a flowing meditation guide, not a list of steps.`;
    
    return sendMessage(prompt, [], systemPrompt);
  };

  return {
    sendMessage,
    generateSpiritualResponse,
    generateMeditationGuidance,
    isLoading,
    error
  };
};
