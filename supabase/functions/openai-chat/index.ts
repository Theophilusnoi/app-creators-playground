import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Check if OpenAI API key is available
  if (!openaiApiKey) {
    console.error('OPENAI_API_KEY is not set');
    return new Response(JSON.stringify({ 
      error: 'OpenAI API key not configured',
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

    // Build the conversation messages for OpenAI
    const messages = [];
    
    // Add system prompt
    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt
      });
    }

    // Add conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.slice(-10).forEach((msg: any) => {
        messages.push({
          role: msg.isUser || msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenAI API');
    }

    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: generatedText,
      tone: extractTone(generatedText),
      metadata: {
        model: 'gpt-4o-mini',
        timestamp: new Date().toISOString()
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in openai-chat function:', error);
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