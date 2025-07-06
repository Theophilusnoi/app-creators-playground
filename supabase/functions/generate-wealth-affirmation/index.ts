
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
    const { goal, category, userName } = await req.json()

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

    // Generate personalized affirmation using OpenAI
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
            content: `You are a spiritual wealth manifestation expert. Create powerful, personalized affirmations that combine ancient wisdom with modern manifestation principles. The affirmations should be positive, present-tense, and emotionally compelling.`
          },
          {
            role: 'user',
            content: `Create a personalized wealth affirmation for ${userName || 'this person'} who wants to manifest: "${goal}". 
            Category: ${category}. 
            Make it powerful, specific, and include their name if provided. 
            The affirmation should be 1-2 sentences and feel authentic and inspiring.`
          }
        ],
        max_tokens: 150,
        temperature: 0.8,
      }),
    })

    const openAIData = await openAIResponse.json()
    const affirmation = openAIData.choices[0]?.message?.content?.trim()

    if (!affirmation) {
      throw new Error('Failed to generate affirmation')
    }

    return new Response(
      JSON.stringify({ 
        affirmation,
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
