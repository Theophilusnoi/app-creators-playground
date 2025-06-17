
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { situation, userTradition = 'eclectic' } = await req.json();
    
    console.log('Processing ritual activation for situation:', situation);

    // Get ritual data based on situation
    const { data: ritualData, error: ritualError } = await supabase
      .from('psalm_rituals')
      .select('*')
      .eq('situation', situation)
      .single();

    if (ritualError || !ritualData) {
      console.error('Ritual not found:', ritualError);
      throw new Error(`No ritual found for situation: ${situation}`);
    }

    // Get sacred text information in separate query
    const { data: sacredTextData } = await supabase
      .from('sacred_texts')
      .select('*')
      .eq('tradition', 'christian')
      .single();

    console.log('Found ritual:', ritualData);

    // Enhanced ritual instructions based on situation
    const enhancedInstructions = getEnhancedInstructions(situation, ritualData);

    // Generate safety check
    const safetyCheck = generateSafetyCheck(situation, userTradition);

    // Create AR components data
    const arComponents = {
      hasAR: true,
      sacred_geometry: true,
      protective_circles: true,
      visualization_guides: true
    };

    const activationResponse = {
      ritual: {
        ...ritualData,
        sacred_texts: sacredTextData,
        instructions: enhancedInstructions,
        seal_svg: generateSacredSeal(ritualData.psalm_number)
      },
      safetyCheck,
      arComponents,
      biometricRequirements: {
        heart_rate_monitoring: false,
        stress_level_check: true
      },
      userProfile: {
        tradition: userTradition,
        experience_level: 'intermediate'
      },
      emergencyProtocols: {
        emergency_exit: true,
        specialist_contact: true
      }
    };

    console.log('Returning activation response:', activationResponse);

    return new Response(
      JSON.stringify(activationResponse),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in activate-ritual function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to activate ritual'
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

function getEnhancedInstructions(situation: string, ritualData: any) {
  const baseInstructions = {
    duration: "20-30 minutes",
    preparation: [
      "Find a quiet, private space where you won't be disturbed",
      "Gather all required materials within arm's reach",
      "Sit comfortably facing east (if possible)",
      "Take three deep breaths to center yourself",
      "Set your intention clearly in your mind"
    ],
    steps: []
  };

  // Situation-specific enhanced steps
  switch (situation) {
    case 'protection':
      baseInstructions.steps = [
        {
          action: "Create Sacred Space",
          details: "Light the white candle and place it in front of you. As you light it, visualize bright white light expanding around you in a protective sphere.",
          timing: "2-3 minutes",
          specific_actions: [
            "Hold the match or lighter steadily",
            "Light the candle while focusing on protection",
            "Place the candle at eye level in front of you",
            "Watch the flame for 30 seconds to establish connection"
          ],
          visualization: "See yourself surrounded by an impenetrable shield of divine white light that deflects all negativity.",
          expected_sensations: "You may feel warmth, tingling, or a sense of safety washing over you."
        },
        {
          action: "Recite Psalm 91",
          details: "Read Psalm 91 aloud three times with conviction and faith. Feel each word creating a barrier of protection around you.",
          timing: "5-7 minutes",
          specific_actions: [
            "Hold the psalm text in your hands",
            "Read slowly and clearly",
            "Pause between each recitation for 30 seconds",
            "Emphasize verses 11-12 with extra intention"
          ],
          visualization: "With each verse, see angels surrounding you and your home with protective energy.",
          expected_sensations: "You may feel a presence, increased confidence, or physical sensations of warmth."
        },
        {
          action: "Seal the Protection",
          details: "Hold the salt in your hands and pray for divine protection. Sprinkle a small amount at each corner of your room while affirming your safety.",
          timing: "3-5 minutes",
          specific_actions: [
            "Pour salt into your palm",
            "Walk clockwise around the room",
            "Sprinkle salt at each corner",
            "Return to your starting position"
          ],
          visualization: "See golden light emanating from each pinch of salt, creating an unbreakable protective grid.",
          expected_sensations: "The room may feel lighter, more peaceful, or energetically 'sealed'."
        },
        {
          action: "Close with Gratitude",
          details: "Thank the divine forces for their protection. Affirm that you are safe and protected. Allow the candle to burn for at least 10 more minutes.",
          timing: "2-3 minutes",
          specific_actions: [
            "Place hands over heart",
            "Speak your gratitude aloud",
            "State 'I am divinely protected' three times",
            "Sit quietly and feel the protection"
          ],
          visualization: "Feel the protective energy settling into your aura as a permanent shield.",
          expected_sensations: "Deep peace, confidence, and a lasting sense of safety."
        },
        {
          action: "Integration",
          details: "Sit quietly and allow the protective energy to integrate into your being. Notice any changes in how you feel.",
          timing: "5-10 minutes",
          specific_actions: [
            "Close your eyes and breathe naturally",
            "Scan your body for sensations",
            "Notice any shifts in your emotional state",
            "Remember this feeling for future reference"
          ],
          visualization: "See the protection becoming part of your natural energy field.",
          expected_sensations: "Calm confidence, inner strength, and spiritual connection."
        }
      ];
      break;

    case 'healing':
      baseInstructions.steps = [
        {
          action: "Prepare Healing Space",
          details: "Light the green candle and arrange healing crystals around you. Create an atmosphere of peace and healing energy.",
          timing: "3-4 minutes",
          specific_actions: [
            "Light the green candle with healing intention",
            "Place rose quartz near your heart",
            "Arrange other crystals in a circle around you",
            "Take five deep healing breaths"
          ],
          visualization: "See green healing light flowing from the candle into your entire being.",
          expected_sensations: "Warmth, relaxation, or tingling in areas needing healing."
        },
        {
          action: "Invoke Healing Energy",
          details: "Place your hands on the area needing healing (or over your heart for emotional healing). Recite Psalm 23 while visualizing divine healing light.",
          timing: "8-10 minutes",
          specific_actions: [
            "Place hands gently on the area of concern",
            "Recite Psalm 23 slowly three times",
            "Breathe deeply between recitations",
            "Feel healing energy flowing through your hands"
          ],
          visualization: "See golden-green light pouring through your hands, healing and restoring perfect wholeness.",
          expected_sensations: "Warmth, pulsing, tingling, or deep relaxation in the healing area."
        },
        {
          action: "Direct Healing Flow",
          details: "Visualize the healing light spreading throughout your entire body, restoring balance and health to every cell.",
          timing: "5-7 minutes",
          specific_actions: [
            "Move hands slowly over your entire body",
            "Pause at any areas that feel tense or unwell",
            "Breathe healing light into each area",
            "Trust the process completely"
          ],
          visualization: "See your body glowing with perfect health and vitality from head to toe.",
          expected_sensations: "Progressive relaxation, reduced pain, or increased energy."
        },
        {
          action: "Seal the Healing",
          details: "Thank the divine for the healing received. Affirm your perfect health and wholeness.",
          timing: "2-3 minutes",
          specific_actions: [
            "Place both hands over your heart",
            "Express gratitude for healing received",
            "Affirm 'I am perfectly whole and healthy'",
            "Seal with 'So it is' or 'Amen'"
          ],
          visualization: "See the healing energy becoming permanently integrated into your cellular structure.",
          expected_sensations: "Deep peace, vitality, and confidence in your healing."
        },
        {
          action: "Integration and Rest",
          details: "Rest quietly and allow the healing energy to complete its work. Stay hydrated and be gentle with yourself.",
          timing: "5-8 minutes",
          specific_actions: [
            "Lie down or sit comfortably",
            "Close your eyes and rest deeply",
            "Avoid analyzing or questioning",
            "Simply receive and integrate"
          ],
          visualization: "Feel the healing continuing to work at the deepest levels of your being.",
          expected_sensations: "Deep relaxation, sleepiness, or peaceful restoration."
        }
      ];
      break;

    case 'spiritual_attack':
      baseInstructions.steps = [
        {
          action: "Emergency Protection",
          details: "Immediately light a white candle and call upon divine protection. This creates an instant barrier against negative forces.",
          timing: "1-2 minutes (urgent)",
          specific_actions: [
            "Light white candle immediately",
            "Say 'I call upon divine protection NOW'",
            "Visualize bright white light surrounding you",
            "Hold a protective object if available"
          ],
          visualization: "See an impenetrable wall of divine light forming around you instantly.",
          expected_sensations: "Immediate relief, warmth, or sensation of being shielded."
        },
        {
          action: "Banish Negative Forces",
          details: "Recite Psalm 91 with authority and conviction. Command all negative entities to leave in the name of the divine.",
          timing: "5-7 minutes",
          specific_actions: [
            "Stand if possible, speak with authority",
            "Recite Psalm 91 loudly and clearly",
            "Point away from yourself when commanding departure",
            "Repeat until you feel the energy shift"
          ],
          visualization: "See dark energies being expelled by brilliant divine light, unable to return.",
          expected_sensations: "Shift in room energy, feeling of oppression lifting, return of peace."
        },
        {
          action: "Cleanse the Space",
          details: "Use salt or sage to cleanse your immediate area. Move in a clockwise direction while maintaining protective prayers.",
          timing: "3-5 minutes",
          specific_actions: [
            "Sprinkle salt or light sage",
            "Move clockwise around your space",
            "Pay attention to corners and doorways",
            "Maintain constant prayer or affirmation"
          ],
          visualization: "See purifying light sweeping through every corner, removing all traces of negativity.",
          expected_sensations: "Space feeling lighter, cleaner, more peaceful."
        },
        {
          action: "Strengthen Protection",
          details: "Create multiple layers of protection through prayer, visualization, and sacred objects.",
          timing: "5-8 minutes",
          specific_actions: [
            "Place protective symbols around you",
            "Recite additional protective prayers",
            "Visualize multiple layers of divine protection",
            "Call upon your spiritual guides or angels"
          ],
          visualization: "See layer upon layer of protective light, making you completely impenetrable.",
          expected_sensations: "Deep sense of safety, spiritual presence, complete protection."
        },
        {
          action: "Maintain Vigilance",
          details: "Continue prayers and maintain protective visualization. Keep the candle burning and stay alert to any return of negativity.",
          timing: "10-15 minutes",
          specific_actions: [
            "Keep protective prayers going",
            "Monitor your energy and the space",
            "Maintain the protective candle",
            "Trust in your divine protection"
          ],
          visualization: "See yourself permanently surrounded by unbreakable divine protection.",
          expected_sensations: "Sustained peace, confidence, and spiritual connection."
        }
      ];
      break;

    default:
      // Generic steps for other situations
      baseInstructions.steps = [
        {
          action: "Center Yourself",
          details: "Take several deep breaths and focus your intention on your spiritual goal.",
          timing: "2-3 minutes",
          specific_actions: [
            "Sit comfortably with spine straight",
            "Take 7 deep breaths",
            "Set your clear intention",
            "Feel grounded and present"
          ],
          visualization: "See yourself surrounded by peaceful, sacred energy.",
          expected_sensations: "Calm, centeredness, spiritual connection."
        },
        {
          action: "Invoke Divine Presence",
          details: "Call upon divine forces to assist you in your spiritual work.",
          timing: "5-7 minutes",
          specific_actions: [
            "Light your candle with reverence",
            "Speak your invocation aloud",
            "Open your heart to divine presence",
            "Feel the sacred connection"
          ],
          visualization: "See divine light filling your space and your being.",
          expected_sensations: "Presence, warmth, spiritual uplift."
        },
        {
          action: "Perform Sacred Work",
          details: "Engage in your specific spiritual practice with full attention and devotion.",
          timing: "10-15 minutes",
          specific_actions: [
            "Follow your specific ritual steps",
            "Maintain focused attention",
            "Trust in the process",
            "Stay open to spiritual guidance"
          ],
          visualization: "See your spiritual goal manifesting through divine power.",
          expected_sensations: "Spiritual energy, guidance, transformation."
        },
        {
          action: "Close with Gratitude",
          details: "Thank the divine forces and seal your spiritual work.",
          timing: "2-3 minutes",
          specific_actions: [
            "Express heartfelt gratitude",
            "Seal your work with blessing",
            "Ground the energy",
            "Close the sacred space"
          ],
          visualization: "See your spiritual work complete and blessed.",
          expected_sensations: "Completion, peace, spiritual fulfillment."
        }
      ];
  }

  return baseInstructions;
}

function generateSafetyCheck(situation: string, tradition: string) {
  const incidents = [];
  
  // Check for high-risk situations
  if (situation === 'spiritual_attack') {
    incidents.push({
      type: 'emergency_protocol',
      message: 'This is an emergency spiritual situation. Professional guidance is recommended.',
      severity: 'high'
    });
  }
  
  if (situation === 'banishing') {
    incidents.push({
      type: 'advanced_practice',
      message: 'Banishing rituals require experience. Ensure you have proper protection in place.',
      severity: 'medium'
    });
  }

  return {
    passed: incidents.length === 0 || incidents.every(i => i.severity !== 'high'),
    incidents,
    disclaimer: `This ritual has been adapted for the ${tradition} tradition. Please ensure all practices align with your personal beliefs and spiritual guidance.`
  };
}

function generateSacredSeal(psalmNumber: number) {
  // Simple SVG seal representation
  return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="none" stroke="gold" stroke-width="2"/>
    <text x="50" y="55" text-anchor="middle" fill="gold" font-size="16" font-family="serif">
      ${psalmNumber}
    </text>
    <circle cx="50" cy="50" r="25" fill="none" stroke="gold" stroke-width="1"/>
  </svg>`;
}
