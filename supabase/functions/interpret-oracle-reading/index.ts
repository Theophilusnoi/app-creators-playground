
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { question, cards, readingType } = await req.json()

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    
    // Set the auth token for this request
    supabase.auth.setSession({
      access_token: token,
      refresh_token: '',
    })

    // Create card descriptions for the AI
    const cardDescriptions = cards.map((card: any) => 
      `${card.name}: ${card.upright_meaning} - Financial guidance: ${card.financial_guidance}`
    ).join('\n')

    // Generate interpretation using OpenAI
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a wise oracle reader specializing in wealth and prosperity guidance. Provide insightful, encouraging, and practical interpretations that blend spiritual wisdom with actionable financial advice.`
          },
          {
            role: 'user',
            content: `Please interpret this ${readingType} oracle reading:
            
            Question: "${question || 'General financial guidance'}"
            
            Cards drawn:
            ${cardDescriptions}
            
            Provide a comprehensive interpretation that:
            1. Addresses the question directly
            2. Explains the significance of each card in context
            3. Offers practical financial guidance
            4. Provides encouragement and next steps
            5. Maintains a positive, empowering tone
            
            Keep the interpretation between 2-4 paragraphs.`
          }
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    })

    const openAIData = await openAIResponse.json()
    const interpretation = openAIData.choices[0]?.message?.content?.trim()

    if (!interpretation) {
      throw new Error('Failed to generate interpretation')
    }

    return new Response(
      JSON.stringify({ 
        interpretation,
        success: true 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
