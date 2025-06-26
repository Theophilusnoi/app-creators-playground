
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, locale, emotion } = await req.json()
    
    console.log('Request received:', { text: text?.substring(0, 50), locale, emotion })
    
    if (!text) {
      throw new Error('No text provided')
    }

    const apiKey = Deno.env.get('ELEVENLABS_API_KEY')
    console.log('API Key status:', apiKey ? 'Present' : 'Missing')
    
    if (!apiKey) {
      throw new Error('ElevenLabs API key not configured')
    }

    // Voice mapping for different locales
    const voiceMap: Record<string, string> = {
      'en': '21m00Tcm4TlvDq8ikWAM', // Rachel (English)
      'es': 'MF3mGyEYCl7XYWbV9V6O', // Elli (Spanish)
      'hi': 'Xb7hH8MSUJpSbSDYk0k2', // Alice (Hindi)
      'ar': 'pFZP5JQG7iQjIQuC4Bku', // Lily (Arabic)
      'fr': 'jsCqWAovK2LkecY7zXl4'  // Callum (French)
    }

    const voiceId = voiceMap[locale] || voiceMap['en']
    console.log('Using voice ID:', voiceId, 'for locale:', locale)

    // Emotion to stability mapping
    const getStability = (emotion?: string) => {
      switch (emotion) {
        case 'calm': return 0.8
        case 'urgent': return 0.3
        case 'compassionate': return 0.6
        default: return 0.7
      }
    }

    const modelId = 'eleven_multilingual_v2'

    const requestBody = {
      text,
      model_id: modelId,
      voice_settings: {
        stability: getStability(emotion),
        similarity_boost: 0.8,
      }
    }

    console.log('Making request to ElevenLabs with:', { voiceId, modelId, textLength: text.length })

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify(requestBody)
    })

    console.log('ElevenLabs response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', response.status, errorText)
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`)
    }

    const audioBuffer = await response.arrayBuffer()
    console.log('Audio generated successfully, size:', audioBuffer.byteLength)
    
    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    })

  } catch (error) {
    console.error('Voice generation error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
