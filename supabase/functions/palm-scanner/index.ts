
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PalmAnalysisRequest {
  image: string; // base64 encoded image
  analysisType?: 'basic' | 'advanced' | 'spiritual';
}

interface PalmLine {
  name: string;
  reading: string;
  meaning: string;
  spiritualInsight: string;
  strength: 'weak' | 'moderate' | 'strong' | 'very strong';
}

interface PalmAnalysisResult {
  success: boolean;
  analysis?: {
    lifeLineReading: PalmLine;
    heartLineReading: PalmLine;
    headLineReading: PalmLine;
    fateLineReading: PalmLine;
    spiritualGifts: string;
    challenges: string;
    guidance: string;
    overallReading: string;
    confidenceScore: number;
    imageQuality: 'poor' | 'fair' | 'good' | 'excellent';
  };
  error?: string;
}

// Mock palm analysis logic (in real implementation, this would use AI/ML)
function analyzePalmImage(imageBase64: string, analysisType: string = 'basic'): PalmAnalysisResult {
  console.log('Starting palm analysis...');
  console.log('Image size:', imageBase64.length, 'characters');
  console.log('Analysis type:', analysisType);

  // Simulate image quality assessment
  const imageQuality = assessImageQuality(imageBase64);
  console.log('Assessed image quality:', imageQuality);

  if (imageQuality === 'poor') {
    return {
      success: false,
      error: 'Image quality is too poor for accurate analysis. Please ensure good lighting and clear palm visibility.'
    };
  }

  // Generate detailed palm reading
  const analysis = generatePalmReading(analysisType, imageQuality);
  
  console.log('Palm analysis completed successfully');
  return {
    success: true,
    analysis
  };
}

function assessImageQuality(imageBase64: string): 'poor' | 'fair' | 'good' | 'excellent' {
  // Simple heuristic based on image size and format
  const sizeScore = imageBase64.length > 50000 ? 2 : imageBase64.length > 20000 ? 1 : 0;
  const formatScore = imageBase64.includes('data:image/jpeg') || imageBase64.includes('data:image/png') ? 1 : 0;
  
  const totalScore = sizeScore + formatScore;
  
  if (totalScore >= 3) return 'excellent';
  if (totalScore >= 2) return 'good';
  if (totalScore >= 1) return 'fair';
  return 'poor';
}

function generatePalmReading(analysisType: string, imageQuality: string) {
  const confidenceScore = imageQuality === 'excellent' ? 95 : 
                         imageQuality === 'good' ? 85 : 
                         imageQuality === 'fair' ? 70 : 50;

  // Life Line readings
  const lifeLineReadings = [
    {
      reading: "Long and deeply etched - indicating strong divine life force and spiritual resilience",
      meaning: "Your life line reveals exceptional vitality and a deep connection to divine energy",
      spiritualInsight: "You possess remarkable spiritual strength that will carry you through life's challenges"
    },
    {
      reading: "Clear and unbroken - showing steady spiritual growth and divine protection",
      meaning: "Your life path is guided and protected by higher spiritual forces",
      spiritualInsight: "Divine guardians watch over your journey, providing continuous spiritual support"
    },
    {
      reading: "Curved and vibrant - revealing enthusiasm for spiritual exploration",
      meaning: "You have a natural curiosity for spiritual matters and mystical experiences",
      spiritualInsight: "Your soul seeks deeper understanding and connection with the divine realm"
    }
  ];

  // Heart Line readings
  const heartLineReadings = [
    {
      reading: "Curved upward toward fingers - showing deep capacity for divine love",
      meaning: "Your heart chakra is open and radiates compassionate energy",
      spiritualInsight: "You are called to be a vessel of divine love and healing in this world"
    },
    {
      reading: "Clear and unbroken - indicating emotional balance and spiritual wisdom",
      meaning: "You maintain harmony between earthly emotions and spiritual understanding",
      spiritualInsight: "Your emotional intelligence is enhanced by divine guidance and intuition"
    },
    {
      reading: "Multiple branches - showing ability to love and heal many souls",
      meaning: "Your heart has the capacity to touch and transform many lives",
      spiritualInsight: "You are destined to be a source of healing and comfort for others"
    }
  ];

  // Head Line readings
  const headLineReadings = [
    {
      reading: "Straight and clear - indicating logical approach balanced with divine wisdom",
      meaning: "You successfully integrate rational thinking with spiritual intuition",
      spiritualInsight: "Your mind serves as a bridge between earthly knowledge and divine truth"
    },
    {
      reading: "Slightly curved - showing perfect balance between intuition and reason",
      meaning: "You possess the rare gift of spiritual discernment and practical wisdom",
      spiritualInsight: "Divine inspiration flows through your thoughts and decision-making process"
    },
    {
      reading: "Deep and well-defined - revealing strong connection to divine wisdom",
      meaning: "You have direct access to higher knowledge and spiritual understanding",
      spiritualInsight: "Your mind is a channel for receiving divine revelations and insights"
    }
  ];

  // Fate Line readings
  const fateLineReadings = [
    {
      reading: "Strong and straight - indicating clear divine destiny and purpose",
      meaning: "Your life path is aligned with divine will and cosmic purpose",
      spiritualInsight: "You are fulfilling a sacred mission that was planned before your birth"
    },
    {
      reading: "Starting from life line - showing self-determined spiritual path",
      meaning: "You have the power to shape your destiny through spiritual choices",
      spiritualInsight: "Divine free will allows you to co-create your spiritual journey"
    },
    {
      reading: "Multiple lines - revealing various divine callings and missions",
      meaning: "You have multiple spiritual gifts and purposes to fulfill in this lifetime",
      spiritualInsight: "Your soul has volunteered for several important spiritual tasks"
    }
  ];

  // Spiritual gifts
  const spiritualGifts = [
    "Healing abilities - You have natural capacity to channel divine healing energy",
    "Intuitive wisdom - You receive clear guidance from higher spiritual realms",
    "Protective presence - You naturally shield others from negative energies",
    "Teaching gift - You are meant to share spiritual wisdom and guide others",
    "Prophetic insight - You can perceive future spiritual events and possibilities"
  ];

  // Spiritual challenges
  const spiritualChallenges = [
    "Learning to trust your spiritual intuition over worldly logic",
    "Balancing spiritual service with personal needs and boundaries",
    "Overcoming past spiritual wounds or religious trauma",
    "Developing discernment between true divine guidance and false influences"
  ];

  // Spiritual guidance
  const spiritualGuidance = [
    "Spend time in daily meditation and prayer to strengthen divine connection",
    "Practice acts of service and compassion to activate your spiritual gifts",
    "Seek spiritual community and mentors who support your growth",
    "Trust the spiritual experiences and insights you receive - they are valid"
  ];

  const overallReadings = [
    "Your palm reveals a soul with significant spiritual potential and divine purpose",
    "You are called to be a light in this world, helping others find their spiritual path",
    "Your hands show the markings of an old soul with important spiritual work to do",
    "Divine energy flows strongly through you, making you a natural healer and guide"
  ];

  // Randomly select readings based on analysis type
  const selectedLifeLine = lifeLineReadings[Math.floor(Math.random() * lifeLineReadings.length)];
  const selectedHeartLine = heartLineReadings[Math.floor(Math.random() * heartLineReadings.length)];
  const selectedHeadLine = headLineReadings[Math.floor(Math.random() * headLineReadings.length)];
  const selectedFateLine = fateLineReadings[Math.floor(Math.random() * fateLineReadings.length)];

  return {
    lifeLineReading: {
      name: "Life Line - Divine Vitality",
      reading: selectedLifeLine.reading,
      meaning: selectedLifeLine.meaning,
      spiritualInsight: selectedLifeLine.spiritualInsight,
      strength: 'strong' as const
    },
    heartLineReading: {
      name: "Heart Line - Divine Love",
      reading: selectedHeartLine.reading,
      meaning: selectedHeartLine.meaning,
      spiritualInsight: selectedHeartLine.spiritualInsight,
      strength: 'very strong' as const
    },
    headLineReading: {
      name: "Head Line - Divine Wisdom",
      reading: selectedHeadLine.reading,
      meaning: selectedHeadLine.meaning,
      spiritualInsight: selectedHeadLine.spiritualInsight,
      strength: 'strong' as const
    },
    fateLineReading: {
      name: "Fate Line - Divine Purpose",
      reading: selectedFateLine.reading,
      meaning: selectedFateLine.meaning,
      spiritualInsight: selectedFateLine.spiritualInsight,
      strength: 'moderate' as const
    },
    spiritualGifts: spiritualGifts[Math.floor(Math.random() * spiritualGifts.length)],
    challenges: spiritualChallenges[Math.floor(Math.random() * spiritualChallenges.length)],
    guidance: spiritualGuidance[Math.floor(Math.random() * spiritualGuidance.length)],
    overallReading: overallReadings[Math.floor(Math.random() * overallReadings.length)],
    confidenceScore,
    imageQuality: imageQuality as 'poor' | 'fair' | 'good' | 'excellent'
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Palm scanner function called');
  console.log('Method:', req.method);
  console.log('Headers:', Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      console.log('Invalid method:', req.method);
      return new Response(
        JSON.stringify({ error: 'Method not allowed. Use POST.' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const body: PalmAnalysisRequest = await req.json();
    console.log('Request body keys:', Object.keys(body));

    if (!body.image) {
      console.log('Missing image in request');
      return new Response(
        JSON.stringify({ error: 'Missing required field: image' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate base64 image format
    if (!body.image.startsWith('data:image/')) {
      console.log('Invalid image format');
      return new Response(
        JSON.stringify({ error: 'Invalid image format. Please provide a base64 encoded image.' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Starting palm analysis...');
    const result = analyzePalmImage(body.image, body.analysisType || 'basic');
    
    if (!result.success) {
      console.log('Analysis failed:', result.error);
      return new Response(
        JSON.stringify(result),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Analysis successful, confidence:', result.analysis?.confidenceScore);
    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in palm-scanner function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Internal server error during palm analysis'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};

serve(handler);
