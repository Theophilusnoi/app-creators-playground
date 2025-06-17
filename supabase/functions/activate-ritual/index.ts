
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

    // 2. Find appropriate ritual
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

    // 4. Enhanced detailed instructions based on situation
    const detailedInstructions = getDetailedInstructions(situation, selectedRitual.psalm_number);
    selectedRitual.instructions = detailedInstructions;

    // 5. Check for cultural adaptations
    const { data: adaptation } = await supabaseClient
      .from('cultural_adaptations')
      .select('*')
      .eq('ritual_id', selectedRitual.id)
      .eq('tradition', userProfile.tradition)
      .single();

    // 6. Perform safety checks
    const safetyCheck: SafetyCheck = await performSafetyChecks(
      selectedRitual,
      userProfile,
      adaptation,
      supabaseClient
    );

    // 7. Generate AR components
    const arComponents = generateARComponents(selectedRitual.seal_svg);

    // 8. Apply cultural adaptations if they exist
    let adaptedRitual = { ...selectedRitual };
    if (adaptation) {
      adaptedRitual = {
        ...selectedRitual,
        instructions: adaptation.modified_instructions || selectedRitual.instructions,
        required_materials: adaptation.material_substitutions || selectedRitual.required_materials,
        cultural_disclaimer: adaptation.disclaimer
      };
    }

    // 9. Log ritual activation
    const { error: logError } = await supabaseClient
      .from('ritual_activations')
      .insert({
        user_id: user.id,
        ritual_id: selectedRitual.id,
        safety_incidents: { checks: safetyCheck.incidents }
      });

    if (logError) console.warn('Failed to log activation:', logError);

    // 10. Return comprehensive ritual package
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

function getDetailedInstructions(situation: string, psalmNumber: number) {
  const baseInstructions = {
    duration: "20-30 minutes",
    preparation: [
      "Find a quiet, private space where you won't be disturbed",
      "Cleanse the area by burning sage or lighting incense",
      "Arrange your materials within easy reach",
      "Set your intention clearly in your mind",
      "Take three deep breaths to center yourself"
    ]
  };

  switch (situation) {
    case 'protection':
      return {
        ...baseInstructions,
        duration: "15-25 minutes",
        steps: [
          {
            step: 1,
            action: "Create Sacred Space",
            details: "Light a white or blue candle while saying: 'I call upon divine protection to surround me.' Place the candle in the center of your space.",
            timing: "2-3 minutes",
            visualization: "See white light filling the room"
          },
          {
            step: 2,
            action: "Hold Protection Stone",
            details: "Take your black tourmaline or obsidian in your dominant hand. Feel its weight and grounding energy. Close your eyes and connect with its protective vibration.",
            timing: "2 minutes",
            visualization: "Imagine the stone absorbing any negative energy around you"
          },
          {
            step: 3,
            action: "Recite Protection Psalm",
            details: `Slowly recite Psalm ${psalmNumber} three times. With each recitation, speak more firmly and with greater conviction. Feel the words creating a barrier around you.`,
            timing: "8-10 minutes",
            visualization: "See golden armor forming around your body with each word"
          },
          {
            step: 4,
            action: "Seal the Protection",
            details: "Stand up and trace a protective circle around yourself with your finger, moving clockwise. Say: 'This protection is sealed and shall remain with me.'",
            timing: "2 minutes",
            visualization: "See the circle glowing with protective energy"
          },
          {
            step: 5,
            action: "Closing Gratitude",
            details: "Thank the divine forces for their protection. Blow out the candle while saying: 'The light remains within me, protection surrounds me.'",
            timing: "1 minute",
            visualization: "Feel the protection settling into your aura permanently"
          }
        ]
      };

    case 'healing':
      return {
        ...baseInstructions,
        duration: "25-35 minutes",
        steps: [
          {
            step: 1,
            action: "Prepare Healing Space",
            details: "Light a green candle for physical healing or pink for emotional healing. Arrange healing crystals (rose quartz, amethyst) around you. Burn healing herbs like lavender or eucalyptus.",
            timing: "3-4 minutes",
            visualization: "See healing green light filling your space"
          },
          {
            step: 2,
            action: "Connect with Healing Energy",
            details: "Hold rose quartz over your heart chakra. Breathe deeply and feel love and compassion flowing through you. Set your specific healing intention clearly.",
            timing: "3-4 minutes",
            visualization: "Pink healing light flowing from the crystal into your heart"
          },
          {
            step: 3,
            action: "Body Scan Meditation",
            details: "Starting from your crown, slowly scan down through your body. Notice any areas of tension, pain, or discomfort. Send breath and awareness to these areas.",
            timing: "5-7 minutes",
            visualization: "White healing light scanning and healing each part of your body"
          },
          {
            step: 4,
            action: "Recite Healing Psalm",
            details: `Recite Psalm ${psalmNumber} while placing your hands on the area needing healing. If it's emotional healing, place hands on your heart. Repeat the psalm 3-7 times.`,
            timing: "10-12 minutes",
            visualization: "Golden healing energy flowing through your hands into the affected area"
          },
          {
            step: 5,
            action: "Integration and Gratitude",
            details: "Sit quietly and feel the healing energy integrating into your being. Thank your body for its wisdom and the divine for its healing grace. Drink water to ground the energy.",
            timing: "4-5 minutes",
            visualization: "Healing light becoming part of your cellular structure"
          }
        ]
      };

    case 'divine_guidance':
      return {
        ...baseInstructions,
        duration: "20-30 minutes",
        steps: [
          {
            step: 1,
            action: "Create Sacred Communication Space",
            details: "Light a purple or white candle. Place a clear quartz crystal nearby to amplify spiritual communication. Have paper and pen ready for any messages received.",
            timing: "3 minutes",
            visualization: "Purple light opening your crown chakra to divine wisdom"
          },
          {
            step: 2,
            action: "Enter Meditative State",
            details: "Sit comfortably with spine straight. Close eyes and breathe deeply. Release all expectations and open your heart to receive divine guidance with humility.",
            timing: "5 minutes",
            visualization: "Your mind becoming clear and receptive like still water"
          },
          {
            step: 3,
            action: "Ask Your Question",
            details: "Clearly state your question or area where you seek guidance. Speak it aloud or hold it firmly in your mind. Ask with sincere intention and trust.",
            timing: "2 minutes",
            visualization: "Your question traveling upward on beams of light"
          },
          {
            step: 4,
            action: "Recite Guidance Psalm",
            details: `Slowly recite Psalm ${psalmNumber} while remaining open to insights, images, or feelings that arise. Don't force anything - simply remain receptive.`,
            timing: "8-10 minutes",
            visualization: "Divine light flowing down through your crown, bringing wisdom"
          },
          {
            step: 5,
            action: "Receive and Record",
            details: "Sit in silent receptivity for several minutes. Write down any thoughts, feelings, or insights that come. Trust the first impressions - divine guidance often comes subtly.",
            timing: "5-7 minutes",
            visualization: "Messages of light being downloaded into your consciousness"
          }
        ]
      };

    case 'cleansing':
      return {
        ...baseInstructions,
        duration: "20-25 minutes",
        steps: [
          {
            step: 1,
            action: "Purification Preparation",
            details: "Light white sage or palo santo. Allow the smoke to fill your space. Light a white candle representing purity. Have sea salt and clean water nearby.",
            timing: "4 minutes",
            visualization: "Cleansing smoke removing all negativity from your space"
          },
          {
            step: 2,
            action: "Energy Assessment",
            details: "Close your eyes and scan your energy field. Notice any areas that feel heavy, dark, or stuck. These are areas that need cleansing attention.",
            timing: "3 minutes",
            visualization: "Your aura showing you exactly what needs to be cleared"
          },
          {
            step: 3,
            action: "Salt Water Blessing",
            details: "Mix sea salt with clean water. Dip your fingers and anoint your forehead, heart, and palms while asking for purification of thoughts, emotions, and actions.",
            timing: "3 minutes",
            visualization: "Pure white light entering through each anointed point"
          },
          {
            step: 4,
            action: "Cleansing Psalm Recitation",
            details: `Recite Psalm ${psalmNumber} with intention to release all that no longer serves you. With each word, feel spiritual impurities being washed away.`,
            timing: "8-10 minutes",
            visualization: "Dark energies dissolving and being replaced by pure light"
          },
          {
            step: 5,
            action: "Final Purification",
            details: "Stand and shake your whole body vigorously for 30 seconds to release any remaining stagnant energy. End by saying: 'I am cleansed, I am pure, I am renewed.'",
            timing: "2 minutes",
            visualization: "Brilliant white light now surrounding your entire being"
          }
        ]
      };

    case 'banishing':
      return {
        ...baseInstructions,
        duration: "25-30 minutes",
        steps: [
          {
            step: 1,
            action: "Fortify Your Energy",
            details: "Light a black candle for banishing and a white candle for protection. Hold iron or black tourmaline for grounding strength. State firmly: 'I reclaim my power.'",
            timing: "4 minutes",
            visualization: "Roots growing from your feet deep into the earth for stability"
          },
          {
            step: 2,
            action: "Identify What Must Go",
            details: "Clearly name what you are banishing - negative thoughts, toxic relationships, bad habits, or unwanted spiritual influences. Be specific and firm in your intent.",
            timing: "3 minutes",
            visualization: "See exactly what you're removing as dark shadows ready to leave"
          },
          {
            step: 3,
            action: "Build Banishing Energy",
            details: "Stand up and breathe powerfully. With each exhale, say 'BE GONE!' Feel your personal power growing stronger with each breath. You are the authority in your life.",
            timing: "5 minutes",
            visualization: "A powerful wind emanating from you, pushing away all unwanted influences"
          },
          {
            step: 4,
            action: "Command with Psalm Power",
            details: `Recite Psalm ${psalmNumber} with commanding authority. Each word is a decree that unwanted influences must leave. Speak with conviction and divine authority.`,
            timing: "10-12 minutes",
            visualization: "Your words creating waves of banishing energy that clear everything"
          },
          {
            step: 5,
            action: "Seal the Banishment",
            details: "Blow out the black candle forcefully, saying: 'It is done, you are banished, never to return.' Keep the white candle burning for protection.",
            timing: "3 minutes",
            visualization: "A permanent barrier now protecting you from what was banished"
          }
        ]
      };

    case 'spiritual_attack':
      return {
        ...baseInstructions,
        duration: "15-20 minutes (Emergency Protocol)",
        steps: [
          {
            step: 1,
            action: "Immediate Protection",
            details: "IMMEDIATELY light a white candle and hold a protective stone. Say loudly: 'I call upon divine protection NOW!' Do not hesitate - act with urgency.",
            timing: "1-2 minutes",
            visualization: "Instant shield of blazing white light surrounding you completely"
          },
          {
            step: 2,
            action: "Emergency Grounding",
            details: "Sit or lie on the ground/floor. Press your palms flat against the earth or floor. Breathe deeply and feel the earth's protective energy rising up through you.",
            timing: "2-3 minutes",
            visualization: "Earth energy forming a protective barrier around you"
          },
          {
            step: 3,
            action: "Invoke Higher Powers",
            details: "Call upon your highest spiritual protection - guardian angels, spirit guides, or divine protection. Say: 'I invoke the highest spiritual protection available to me!'",
            timing: "2 minutes",
            visualization: "Beings of light surrounding you in protective formation"
          },
          {
            step: 4,
            action: "Emergency Psalm Recitation",
            details: `Recite Psalm ${psalmNumber} with fierce determination. This is spiritual warfare - your voice must be strong and unwavering. Repeat until you feel the attack cease.`,
            timing: "8-10 minutes",
            visualization: "Your words creating a fortress of divine light that repels all attacks"
          },
          {
            step: 5,
            action: "Aftermath Protection",
            details: "Once the attack stops, remain protected. Keep white candle burning for hours. Carry protective stones. Consider seeking help from a spiritual counselor.",
            timing: "2-3 minutes",
            visualization: "Permanent shield of protection remaining active around you"
          }
        ]
      };

    default:
      return {
        ...baseInstructions,
        steps: [
          {
            step: 1,
            action: "Light candle",
            details: "Light your chosen candle with clear intention"
          },
          {
            step: 2,
            action: "Hold sacred object",
            details: "Hold your sacred stone or object while focusing on your need"
          },
          {
            step: 3,
            action: `Recite Psalm ${psalmNumber}`,
            details: `Slowly and mindfully recite Psalm ${psalmNumber} three times`
          },
          {
            step: 4,
            action: "Send focused energy",
            details: "Direct your spiritual energy toward your specific intention"
          }
        ]
      };
  }
}

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
