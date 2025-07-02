import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[TEST-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("=== TEST FUNCTION START ===");
    logStep("Method", req.method);

    // Check environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    logStep("Environment check", {
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      hasStripeKey: !!stripeKey,
      stripeKeyLength: stripeKey ? stripeKey.length : 0,
      stripeKeyPrefix: stripeKey ? stripeKey.substring(0, 12) + "..." : "missing"
    });

    // Test body parsing
    let requestBody;
    try {
      const bodyText = await req.text();
      logStep("Raw body received", { 
        bodyText: bodyText,
        length: bodyText.length,
        contentType: req.headers.get("content-type")
      });
      
      if (bodyText && bodyText.trim() !== '') {
        requestBody = JSON.parse(bodyText);
        logStep("Request body parsed", requestBody);
      } else {
        logStep("Empty body received - using defaults");
        requestBody = { tier: 'test' };
      }
    } catch (parseError) {
      logStep("Body parsing error", { error: parseError.message });
      requestBody = { tier: 'test' };
    }

    // Test auth
    const authHeader = req.headers.get("Authorization");
    logStep("Auth header check", { 
      hasAuth: !!authHeader, 
      authPrefix: authHeader ? authHeader.substring(0, 20) + "..." : "missing" 
    });

    if (authHeader) {
      const supabaseClient = createClient(
        supabaseUrl ?? "",
        supabaseServiceKey ?? "",
        { auth: { persistSession: false } }
      );

      const token = authHeader.replace("Bearer ", "");
      const { data, error: userError } = await supabaseClient.auth.getUser(token);
      
      if (userError) {
        logStep("Auth error", { error: userError.message });
      } else {
        logStep("User authenticated", { userId: data.user?.id, email: data.user?.email });
      }
    }

    // Test Stripe key format
    if (stripeKey) {
      logStep("Stripe key validation", {
        startsWithSk: stripeKey.startsWith('sk_'),
        format: stripeKey.includes('_') ? 'valid format' : 'invalid format'
      });
    }

    logStep("=== TEST FUNCTION SUCCESS ===");
    return new Response(JSON.stringify({ 
      status: "success",
      message: "Test function working correctly",
      checks: {
        environment: !!supabaseUrl && !!supabaseServiceKey && !!stripeKey,
        auth: !!authHeader,
        body: !!requestBody
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("=== TEST FUNCTION ERROR ===", { 
      message: errorMessage, 
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return new Response(JSON.stringify({ 
      status: "error",
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});