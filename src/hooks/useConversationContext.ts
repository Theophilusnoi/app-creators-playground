
import { useState, useEffect, useCallback } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  spiritualLevel: 'beginner' | 'intermediate' | 'advanced' | 'teacher';
  preferredTraditions: string[];
  currentChallenges: string[];
  spiritualGoals: string[];
  communicationStyle: 'gentle' | 'direct' | 'philosophical' | 'practical';
  interests: string[];
  lastActiveDate: Date;
}

export interface ConversationTurn {
  id: string;
  userMessage: string;
  aiResponse: string;
  timestamp: Date;
  topics: string[];
  sentiment: 'positive' | 'neutral' | 'seeking' | 'troubled';
  spiritualNeed: string;
}

export interface ConversationContext {
  sessionId: string;
  userProfile: UserProfile | null;
  conversationHistory: ConversationTurn[];
  currentTopics: string[];
  emotionalState: string;
  spiritualNeeds: string[];
  contextSummary: string;
}

export const useConversationContext = () => {
  const [context, setContext] = useState<ConversationContext>({
    sessionId: generateSessionId(),
    userProfile: null,
    conversationHistory: [],
    currentTopics: [],
    emotionalState: 'neutral',
    spiritualNeeds: [],
    contextSummary: ''
  });

  // Load context from localStorage on mount
  useEffect(() => {
    const savedContext = localStorage.getItem('spiritualConversationContext');
    if (savedContext) {
      try {
        const parsed = JSON.parse(savedContext);
        setContext(prev => ({
          ...prev,
          ...parsed,
          sessionId: generateSessionId() // Always generate new session ID
        }));
      } catch (error) {
        console.error('Error loading conversation context:', error);
      }
    }
  }, []);

  // Save context to localStorage whenever it changes
  useEffect(() => {
    const contextToSave = {
      ...context,
      conversationHistory: context.conversationHistory.slice(-20) // Keep only last 20 turns
    };
    localStorage.setItem('spiritualConversationContext', JSON.stringify(contextToSave));
  }, [context]);

  const analyzeMessage = useCallback((message: string) => {
    const topics = extractTopics(message);
    const sentiment = analyzeSentiment(message);
    const spiritualNeed = identifySpiritualNeed(message);
    
    return { topics, sentiment, spiritualNeed };
  }, []);

  const addConversationTurn = useCallback((userMessage: string, aiResponse: string) => {
    const analysis = analyzeMessage(userMessage);
    
    const newTurn: ConversationTurn = {
      id: generateTurnId(),
      userMessage,
      aiResponse,
      timestamp: new Date(),
      topics: analysis.topics,
      sentiment: analysis.sentiment,
      spiritualNeed: analysis.spiritualNeed
    };

    setContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, newTurn].slice(-20),
      currentTopics: updateCurrentTopics(prev.currentTopics, analysis.topics),
      emotionalState: analysis.sentiment,
      spiritualNeeds: updateSpiritualNeeds(prev.spiritualNeeds, analysis.spiritualNeed),
      contextSummary: generateContextSummary(prev.conversationHistory, newTurn)
    }));
  }, [analyzeMessage]);

  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setContext(prev => ({
      ...prev,
      userProfile: prev.userProfile ? { ...prev.userProfile, ...updates } : null
    }));
  }, []);

  const createUserProfile = useCallback((profileData: Omit<UserProfile, 'id' | 'lastActiveDate'>) => {
    const newProfile: UserProfile = {
      ...profileData,
      id: generateUserId(),
      lastActiveDate: new Date()
    };
    
    setContext(prev => ({
      ...prev,
      userProfile: newProfile
    }));
  }, []);

  const getContextForAI = useCallback(() => {
    const recentHistory = context.conversationHistory.slice(-5);
    return {
      userProfile: context.userProfile,
      recentTopics: context.currentTopics,
      emotionalState: context.emotionalState,
      spiritualNeeds: context.spiritualNeeds,
      recentConversation: recentHistory.map(turn => ({
        user: turn.userMessage,
        assistant: turn.aiResponse,
        topics: turn.topics
      })),
      contextSummary: context.contextSummary
    };
  }, [context]);

  return {
    context,
    addConversationTurn,
    updateUserProfile,
    createUserProfile,
    getContextForAI,
    analyzeMessage
  };
};

// Helper functions
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateTurnId(): string {
  return `turn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function extractTopics(message: string): string[] {
  const topicKeywords = {
    meditation: ['meditat', 'mindful', 'breath', 'stillness', 'silence'],
    relationships: ['love', 'relationship', 'partner', 'family', 'friend'],
    purpose: ['purpose', 'meaning', 'calling', 'mission', 'destiny'],
    healing: ['heal', 'pain', 'hurt', 'trauma', 'recovery'],
    abundance: ['money', 'wealth', 'abundance', 'prosperity', 'financial'],
    spiritual_growth: ['spiritual', 'growth', 'awakening', 'consciousness', 'enlighten'],
    guidance: ['guidance', 'advice', 'help', 'direction', 'confused'],
    gratitude: ['grateful', 'thankful', 'appreciation', 'blessing']
  };

  const topics: string[] = [];
  const lowerMessage = message.toLowerCase();

  Object.entries(topicKeywords).forEach(([topic, keywords]) => {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      topics.push(topic);
    }
  });

  return topics;
}

function analyzeSentiment(message: string): 'positive' | 'neutral' | 'seeking' | 'troubled' {
  const lowerMessage = message.toLowerCase();
  
  const positiveWords = ['happy', 'grateful', 'blessed', 'amazing', 'wonderful', 'peaceful'];
  const troubledWords = ['sad', 'confused', 'lost', 'hurt', 'angry', 'frustrated', 'difficult'];
  const seekingWords = ['help', 'guidance', 'advice', 'how', 'what should', 'need'];

  const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;
  const troubledCount = troubledWords.filter(word => lowerMessage.includes(word)).length;
  const seekingCount = seekingWords.filter(word => lowerMessage.includes(word)).length;

  if (troubledCount > positiveCount && troubledCount > 0) return 'troubled';
  if (seekingCount > 0) return 'seeking';
  if (positiveCount > 0) return 'positive';
  return 'neutral';
}

function identifySpiritualNeed(message: string): string {
  const needPatterns = {
    guidance: ['guidance', 'direction', 'help', 'advice', 'what should'],
    healing: ['heal', 'pain', 'hurt', 'trauma', 'broken'],
    clarity: ['confused', 'unclear', 'don\'t understand', 'lost'],
    connection: ['lonely', 'isolated', 'disconnected', 'alone'],
    purpose: ['purpose', 'meaning', 'why', 'point', 'destiny'],
    peace: ['anxiety', 'stress', 'worry', 'fear', 'calm'],
    growth: ['grow', 'learn', 'develop', 'improve', 'evolve']
  };

  const lowerMessage = message.toLowerCase();
  
  for (const [need, patterns] of Object.entries(needPatterns)) {
    if (patterns.some(pattern => lowerMessage.includes(pattern))) {
      return need;
    }
  }
  
  return 'general_support';
}

function updateCurrentTopics(currentTopics: string[], newTopics: string[]): string[] {
  const combined = [...new Set([...currentTopics, ...newTopics])];
  return combined.slice(-10); // Keep only last 10 topics
}

function updateSpiritualNeeds(currentNeeds: string[], newNeed: string): string[] {
  const updated = currentNeeds.includes(newNeed) 
    ? currentNeeds 
    : [...currentNeeds, newNeed];
  return updated.slice(-5); // Keep only last 5 needs
}

function generateContextSummary(history: ConversationTurn[], newTurn: ConversationTurn): string {
  const recentTopics = [...new Set(history.slice(-3).flatMap(turn => turn.topics))];
  const dominantNeed = newTurn.spiritualNeed;
  
  return `Recent conversation focused on ${recentTopics.join(', ')}. User seeking ${dominantNeed}.`;
}
