
import { Shield, Heart, Eye,  Brain, Star, Moon, Sun, Zap, Compass, Book } from 'lucide-react';

export interface ProcessStep {
  icon: any;
  title: string;
  description: string;
}

export interface ProcessBenefit {
  category: string;
  benefits: string[];
}

export interface SpiritualNarrative {
  title: string;
  subtitle: string;
  introduction: string;
  steps: ProcessStep[];
  benefits: ProcessBenefit[];
  guidelines: string[];
  headerIcon: string;
}

export const spiritualNarratives: Record<string, SpiritualNarrative> = {
  shadowWork: {
    title: "Shadow Work Integration",
    subtitle: "Illuminate and heal your unconscious patterns",
    introduction: "Shadow Work is the practice of exploring the unconscious aspects of your personality that you've rejected, denied, or hidden. Carl Jung called these rejected aspects the 'shadow self.' By bringing awareness to these patterns, you reclaim lost parts of yourself and achieve greater wholeness and authenticity.",
    headerIcon: "🌙",
    steps: [
      { icon: Eye, title: "Recognition", description: "Identify triggers and emotional reactions that reveal shadow patterns" },
      { icon: Heart, title: "Acceptance", description: "Embrace these aspects with compassion rather than judgment" },
      { icon: Brain, title: "Integration", description: "Transform shadow patterns into conscious choices and strengths" },
      { icon: Star, title: "Embodiment", description: "Live authentically with your whole self integrated" }
    ],
    benefits: [
      {
        category: "Emotional Healing",
        benefits: ["Reduced emotional reactivity", "Greater emotional intelligence", "Healing of childhood wounds", "Freedom from repetitive patterns"]
      },
      {
        category: "Relationships",
        benefits: ["Improved communication", "Reduced projection onto others", "Deeper intimacy", "Healthier boundaries"]
      },
      {
        category: "Personal Growth",
        benefits: ["Increased self-awareness", "Greater authenticity", "Reclaimed personal power", "Enhanced creativity"]
      }
    ],
    guidelines: [
      "Approach your shadow with curiosity, not judgment",
      "Go slowly and be gentle with yourself",
      "Seek support when working with deep trauma",
      "Practice self-compassion throughout the process",
      "Remember that everyone has a shadow - you're not alone",
      "Integration is a lifelong process, not a destination"
    ]
  },

  dreamAnalysis: {
    title: "Dream Analysis & Interpretation",
    subtitle: "Unlock the wisdom of your unconscious mind",
    introduction: "Dreams are the royal road to the unconscious, offering profound insights into your psyche, unresolved conflicts, and spiritual guidance. Through systematic dream analysis, you can decode the symbolic language of your unconscious mind and receive valuable guidance for your waking life.",
    headerIcon: "💭",
    steps: [
      { icon: Moon, title: "Dream Recall", description: "Develop consistent practices for remembering your dreams clearly" },
      { icon: Book, title: "Dream Recording", description: "Document dreams with details, emotions, and initial impressions" },
      { icon: Eye, title: "Symbol Analysis", description: "Interpret the symbolic meaning of dream elements and themes" },
      { icon: Compass, title: "Life Integration", description: "Apply dream insights to your waking life decisions and growth" }
    ],
    benefits: [
      {
        category: "Self-Understanding",
        benefits: ["Deeper insight into unconscious patterns", "Recognition of suppressed emotions", "Understanding of life themes", "Access to inner wisdom"]
      },
      {
        category: "Problem Solving",
        benefits: ["Creative solutions to challenges", "Guidance for major decisions", "Resolution of inner conflicts", "Prophetic or precognitive insights"]
      },
      {
        category: "Spiritual Growth",
        benefits: ["Connection to higher self", "Spiritual guidance and messages", "Enhanced intuition", "Expanded consciousness"]
      }
    ],
    guidelines: [
      "Keep a dream journal by your bed for immediate recording",
      "Record dreams immediately upon waking for best recall",
      "Focus on emotions and feelings, not just events",
      "Look for recurring patterns and symbols over time",
      "Trust your intuitive interpretations",
      "Consider both personal and universal symbol meanings"
    ]
  },

  meditation: {
    title: "Meditation Practice",
    subtitle: "Cultivate inner peace and expanded awareness",
    introduction: "Meditation is an ancient practice that trains your mind to achieve sustained focus, emotional regulation, and expanded states of consciousness. Regular meditation practice has been scientifically proven to reduce stress, improve cognitive function, and enhance overall well-being while opening doors to spiritual awakening.",
    headerIcon: "🧘",
    steps: [
      { icon: Shield, title: "Preparation", description: "Create a sacred space and establish proper posture and intention" },
      { icon: Brain, title: "Focus Training", description: "Develop concentration through breath awareness or chosen technique" },
      { icon: Heart, title: "Mindful Awareness", description: "Cultivate present-moment awareness and emotional equanimity" },
      { icon: Star, title: "Transcendence", description: "Experience expanded states of consciousness and unity" }
    ],
    benefits: [
      {
        category: "Mental Health",
        benefits: ["Reduced stress and anxiety", "Improved emotional regulation", "Enhanced focus and concentration", "Greater mental clarity"]
      },
      {
        category: "Physical Health",
        benefits: ["Lower blood pressure", "Improved immune function", "Better sleep quality", "Reduced inflammation"]
      },
      {
        category: "Spiritual Development",
        benefits: ["Expanded consciousness", "Deeper self-awareness", "Connection to universal love", "Awakening of psychic abilities"]
      }
    ],
    guidelines: [
      "Start with short sessions and gradually increase duration",
      "Consistency is more important than length of practice",
      "Find a quiet space free from distractions",
      "Don't judge your thoughts - simply observe them",
      "Be patient with yourself as the mind learns to focus",
      "Consider learning from an experienced teacher"
    ]
  },

  synchronicity: {
    title: "Synchronicity Recognition",
    subtitle: "Decode meaningful coincidences and divine guidance",
    introduction: "Synchronicities are meaningful coincidences that reveal the interconnected nature of reality and serve as guidance from your higher self or the universe. By learning to recognize and interpret these patterns, you develop a deeper relationship with the intelligence that orchestrates your life experiences.",
    headerIcon: "🔮",
    steps: [
      { icon: Eye, title: "Awareness", description: "Develop sensitivity to notice unusual patterns and coincidences" },
      { icon: Book, title: "Documentation", description: "Record synchronicities with context, timing, and personal meaning" },
      { icon: Brain, title: "Pattern Recognition", description: "Identify recurring themes and symbolic meanings in events" },
      { icon: Compass, title: "Guidance Integration", description: "Use synchronistic insights to make aligned life decisions" }
    ],
    benefits: [
      {
        category: "Spiritual Connection",
        benefits: ["Deeper sense of divine guidance", "Feeling of cosmic support", "Enhanced intuitive abilities", "Recognition of life purpose"]
      },
      {
        category: "Decision Making",
        benefits: ["Clearer life direction", "Confirmation of right choices", "Warning of potential pitfalls", "Timing guidance for actions"]
      },
      {
        category: "Personal Growth",
        benefits: ["Increased trust in life's process", "Greater sense of meaning", "Expanded awareness", "Enhanced creativity"]
      }
    ],
    guidelines: [
      "Stay open and receptive without forcing meanings",
      "Record synchronicities immediately when they occur",
      "Look for emotional resonance - what feels meaningful to you",
      "Consider both literal and symbolic interpretations",
      "Pay attention to timing and context of events",
      "Trust your intuitive understanding of the message"
    ]
  }
};
