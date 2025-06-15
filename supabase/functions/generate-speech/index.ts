
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
    
    if (!text) {
      throw new Error('No text provided')
    }

    const apiKey = Deno.env.get('ELEVENLABS_API_KEY')
    if (!apiKey) {
      throw new Error('ElevenLabs API key not configured')
    }

    // Voice mapping for different locales
    const voiceMap: Record<string, string> = {
      'en': 'EXAVITQu4vr4xnSDxMaL', // Sarah
      'es': 'XB0fDUnXU5powFXDhCwa', // Charlotte (multilingual)
      'hi': 'Xb7hH8MSUJpSbSDYk0k2', // Alice (multilingual)
      'ar': 'pFZP5JQG7iQjIQuC4Bku', // Lily (multilingual)
      'fr': 'cgSgspJ2msm6clMCkdW9'  // Jessica (multilingual)
    }

    const voiceId = voiceMap[locale] || voiceMap['en']

    // Emotion to stability mapping
    const getStability = (emotion?: string) => {
      switch (emotion) {
        case 'calm': return 0.8
        case 'urgent': return 0.3
        case 'compassionate': return 0.6
        default: return 0.7
      }
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: getStability(emotion),
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true
        }
      })
    })

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`)
    }

    const audioBuffer = await response.arrayBuffer()
    
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
