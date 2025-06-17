
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RitualActivationRequest {
  situation: string;
  userTradition?: string;
}

interface SafetyCheck {
  passed: boolean;
  incidents: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  disclaimer: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get user from JWT
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('Authentication required')
    }

    const { situation, userTradition }: RitualActivationRequest = await req.json();

    console.log('Activating ritual for situation:', situation, 'user:', user.id);

    // 1. Get or create user spiritual profile
    let { data: userProfile, error: profileError } = await supabaseClient
      .from('user_spiritual_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError && profileError.code === 'PGRST116') {
      // Create default profile if doesn't exist
      const { data: newProfile, error: createError } = await supabaseClient
        .from('user_spiritual_profiles')
        .insert({
          user_id: user.id,
          tradition: userTradition || 'eclectic',
          access_level: 1,
          completed_safety_training: true // For demo purposes
        })
        .select()
        .single();

      if (createError) throw createError;
      userProfile = newProfile;
    } else if (profileError) {
      throw profileError;
    }

    // 2. Find appropriate ritual (removed the invalid join)
    const { data: rituals, error: ritualError } = await supabaseClient
      .from('psalm_rituals')
      .select('*')
      .eq('situation', situation)
      .lte('min_user_level', userProfile.access_level)
      .order('safety_rating', { ascending: false });

    if (ritualError) throw ritualError;
    if (!rituals || rituals.length === 0) {
      throw new Error(`No suitable rituals found for situation: ${situation}`);
    }

    const selectedRitual = rituals[0];
    console.log('Selected ritual:', selectedRitual.id, 'safety rating:', selectedRitual.safety_rating);

    // 3. Get sacred text information separately
    const { data: sacredText } = await supabaseClient
      .from('sacred_texts')
      .select('*')
      .eq('title', `Psalm ${selectedRitual.psalm_number}`)
      .single();

    // Add sacred text info to ritual if found
    if (sacredText) {
      selectedRitual.sacred_texts = sacredText;
    }

    // 4. Check for cultural adaptations
    const { data: adaptation } = await supabaseClient
      .from('cultural_adaptations')
      .select('*')
      .eq('ritual_id', selectedRitual.id)
      .eq('tradition', userProfile.tradition)
      .single();

    // 5. Perform safety checks
    const safetyCheck: SafetyCheck = await performSafetyChecks(
      selectedRitual,
      userProfile,
      adaptation,
      supabaseClient
    );

    // 6. Generate AR components
    const arComponents = generateARComponents(selectedRitual.seal_svg);

    // 7. Apply cultural adaptations if they exist
    let adaptedRitual = { ...selectedRitual };
    if (adaptation) {
      adaptedRitual = {
        ...selectedRitual,
        instructions: adaptation.modified_instructions || selectedRitual.instructions,
        required_materials: adaptation.material_substitutions || selectedRitual.required_materials,
        cultural_disclaimer: adaptation.disclaimer
      };
    }

    // 8. Log ritual activation
    const { error: logError } = await supabaseClient
      .from('ritual_activations')
      .insert({
        user_id: user.id,
        ritual_id: selectedRitual.id,
        safety_incidents: { checks: safetyCheck.incidents }
      });

    if (logError) console.warn('Failed to log activation:', logError);

    // 9. Return comprehensive ritual package
    const response = {
      ritual: adaptedRitual,
      safetyCheck,
      arComponents,
      biometricRequirements: {
        heartRateMonitoring: selectedRitual.safety_rating < 7,
        breathingGuidance: true,
        emergencyThresholds: {
          maxHeartRate: 120,
          minCoherence: 0.3
        }
      },
      userProfile,
      emergencyProtocols: {
        enabled: true,
        contactMethod: 'immediate_exit',
        cooldownPeriod: 300 // 5 minutes
      }
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in activate-ritual function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        type: 'ritual_activation_error'
      }), 
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function performSafetyChecks(
  ritual: any,
  userProfile: any,
  adaptation: any,
  supabaseClient: any
): Promise<SafetyCheck> {
  const incidents = [];
  let disclaimer = 'Practice with awareness and respect for the sacred.';

  // Check safety rating vs user experience
  if (ritual.safety_rating < 7 && userProfile.spiritual_experience_years < 3) {
    incidents.push({
      type: 'experience_safety_mismatch',
      message: 'This ritual requires more spiritual experience',
      severity: 'high' as const
    });
  }

  // Check if cultural adaptation is missing for high-risk rituals
  if (ritual.safety_rating < 5 && !adaptation) {
    incidents.push({
      type: 'missing_cultural_adaptation',
      message: 'Proceed with extreme caution - no cultural guidance available',
      severity: 'high' as const
    });
  }

  // Check time constraints
  const currentHour = new Date().getHours();
  if (ritual.time_constraints === 'midnight' && (currentHour < 23 || currentHour > 1)) {
    incidents.push({
      type: 'timing_warning',
      message: 'This ritual is traditionally performed at midnight',
      severity: 'medium' as const
    });
  }

  // Apply cultural disclaimer if available
  if (adaptation?.disclaimer) {
    disclaimer = adaptation.disclaimer;
  }

  // Log safety check
  await supabaseClient
    .from('cultural_safety_logs')
    .insert({
      user_id: userProfile.user_id,
      ritual_id: ritual.id,
      safety_check_type: 'pre_activation',
      passed: incidents.filter(i => i.severity === 'high').length === 0,
      details: { incidents, ritual_safety_rating: ritual.safety_rating }
    });

  return {
    passed: incidents.filter(i => i.severity === 'high').length === 0,
    incidents,
    disclaimer
  };
}

function generateARComponents(sealSvg: string | null) {
  if (!sealSvg) {
    return {
      hasAR: false,
      components: []
    };
  }

  return {
    hasAR: true,
    components: [
      {
        type: 'sacred_seal',
        content: sealSvg,
        position: { x: 0, y: 0, z: -1 },
        scale: 0.5,
        rotation: { x: 0, y: 0, z: 0 },
        animation: 'gentle_pulse'
      },
      {
        type: 'protective_circle',
        radius: 1.5,
        color: '#ffffff',
        opacity: 0.3,
        animation: 'clockwise_rotation'
      }
    ],
    interactions: [
      {
        gesture: 'tap',
        action: 'advance_step'
      },
      {
        gesture: 'long_press',
        action: 'emergency_exit'
      }
    ]
  };
}
