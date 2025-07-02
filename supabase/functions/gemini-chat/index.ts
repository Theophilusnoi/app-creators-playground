import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Check if Gemini API key is available
  if (!geminiApiKey) {
    console.error('GEMINI_API_KEY is not set');
    return new Response(JSON.stringify({ 
      error: 'Gemini API key not configured',
      fallbackResponse: "I apologize, beautiful soul. I'm having trouble connecting with the divine wisdom right now. Please try again in a moment. Your spiritual journey matters deeply to me. 💜"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { 
      message, 
      context, 
      personality, 
      conversationHistory,
      systemPrompt 
    } = await req.json();

    // Build the conversation history for Gemini
    const conversationParts = [];
    
    // Add system context
    if (systemPrompt) {
      conversationParts.push({
        text: systemPrompt
      });
    }

    // Add conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.slice(-10).forEach((msg: any) => {
        conversationParts.push({
          text: `${msg.isUser ? 'Human' : 'Assistant'}: ${msg.content}`
        });
      });
    }

    // Add current message
    conversationParts.push({
      text: `Human: ${message}`
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: conversationParts
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ 
      response: generatedText,
      tone: extractTone(generatedText),
      metadata: {
        model: 'gemini-1.5-flash',
        timestamp: new Date().toISOString()
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gemini-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallbackResponse: "I apologize, beautiful soul. I'm having trouble connecting with the divine wisdom right now. Please try again in a moment. Your spiritual journey matters deeply to me. 💜"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractTone(text: string): string {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('urgent') || lowerText.includes('immediately') || lowerText.includes('emergency')) {
    return 'urgent_calm';
  } else if (lowerText.includes('ritual') || lowerText.includes('sacred') || lowerText.includes('protection')) {
    return 'ritual_authority';
  } else if (lowerText.includes('wisdom') || lowerText.includes('ancient') || lowerText.includes('truth')) {
    return 'warm_wise';
  } else if (lowerText.includes('compassion') || lowerText.includes('love') || lowerText.includes('heart')) {
    return 'compassionate_wise';
  } else if (lowerText.includes('peace') || lowerText.includes('meditation') || lowerText.includes('stillness')) {
    return 'peaceful_wise';
  } else if (lowerText.includes('profound') || lowerText.includes('meaning') || lowerText.includes('purpose')) {
    return 'profound_gentle';
  }
  
  return 'nurturing_gentle';
}