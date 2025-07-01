
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("=== FUNCTION START ===");
    logStep("Method", req.method);
    logStep("Headers", Object.fromEntries(req.headers.entries()));

    // Check environment variables first
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    logStep("Environment check", {
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      hasStripeKey: !!stripeKey,
      stripeKeyPrefix: stripeKey ? stripeKey.substring(0, 10) + "..." : "missing"
    });

    if (!stripeKey) {
      logStep("ERROR: Missing Stripe key");
      return new Response(JSON.stringify({ 
        error: "Payment system not configured - missing Stripe key" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      supabaseUrl ?? "",
      supabaseServiceKey ?? "",
      { auth: { persistSession: false } }
    );
    logStep("Supabase client initialized");

    // Parse request body - try both methods
    let requestBody;
    try {
      requestBody = await req.json();
      logStep("Request body parsed as JSON", requestBody);
    } catch (jsonError) {
      logStep("JSON parse failed, trying text", { error: jsonError.message });
      try {
        const textBody = await req.text();
        logStep("Raw text body", { body: textBody, length: textBody.length });
        if (textBody && textBody.trim()) {
          requestBody = JSON.parse(textBody);
          logStep("Parsed text body as JSON", requestBody);
        } else {
          logStep("ERROR: Empty body");
          return new Response(JSON.stringify({ 
            error: "Request body is required" 
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          });
        }
      } catch (textError) {
        logStep("ERROR: Failed to parse body", { jsonError: jsonError.message, textError: textError.message });
        return new Response(JSON.stringify({ 
          error: `Invalid request format: ${textError.message}` 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
    }

    const { tier, referralCode } = requestBody;
    logStep("Extracted data", { tier, referralCode });
    
    if (!tier) {
      logStep("ERROR: Missing tier parameter");
      return new Response(JSON.stringify({ 
        error: "Subscription tier is required" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    logStep("Auth header check", { hasAuth: !!authHeader, authPrefix: authHeader ? authHeader.substring(0, 20) + "..." : "missing" });
    
    if (!authHeader) {
      logStep("ERROR: Missing authorization header");
      return new Response(JSON.stringify({ 
        error: "Authorization header is required" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const token = authHeader.replace("Bearer ", "");
    logStep("Attempting user authentication");
    
    const { data, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) {
      logStep("AUTH ERROR", { error: userError.message, code: userError.status });
      return new Response(JSON.stringify({ 
        error: `Authentication failed: ${userError.message}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const user = data.user;
    if (!user?.email) {
      logStep("ERROR: User not found or missing email", { hasUser: !!user, userEmail: user?.email });
      return new Response(JSON.stringify({ 
        error: "User not authenticated or email not available" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    logStep("User authenticated successfully", { userId: user.id, email: user.email });

    // Initialize Stripe
    logStep("Initializing Stripe");
    let stripe;
    try {
      stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
      logStep("Stripe initialized successfully");
    } catch (stripeError) {
      logStep("STRIPE INIT ERROR", { error: stripeError.message });
      return new Response(JSON.stringify({ 
        error: "Payment system initialization failed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Define tier pricing
    const wisdomTiers = {
      earth: { amount: 2900, name: "Earth Keeper - Monthly" },
      water: { amount: 7900, name: "Water Bearer - Monthly" },
      fire: { amount: 19700, name: "Fire Keeper - Monthly" },
      ether: { amount: 49700, name: "Ether Walker - Monthly" },
    };

    const selectedTier = wisdomTiers[tier as keyof typeof wisdomTiers];
    if (!selectedTier) {
      logStep("ERROR: Invalid tier", { tier, availableTiers: Object.keys(wisdomTiers) });
      return new Response(JSON.stringify({ 
        error: `Invalid subscription tier: ${tier}. Valid tiers are: ${Object.keys(wisdomTiers).join(', ')}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    logStep("Tier validated", selectedTier);

    // Check for existing customer
    logStep("Checking for existing Stripe customer");
    let customerId;
    try {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing customer", { customerId });
      } else {
        logStep("No existing customer found, will create new one");
      }
    } catch (stripeError) {
      logStep("STRIPE CUSTOMER ERROR", { error: stripeError.message });
      return new Response(JSON.stringify({ 
        error: "Unable to verify customer information" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const origin = req.headers.get("origin") || "https://yrshvcaoczjsqziwllqi.supabase.co";
    logStep("Using origin for URLs", { origin });

    // Create checkout session
    const sessionMetadata: any = {
      tier,
      user_id: user.id,
      user_email: user.email
    };
    
    if (referralCode) {
      sessionMetadata.referral_code = referralCode;
    }

    logStep("Creating Stripe checkout session", { 
      customerId,
      customerEmail: customerId ? undefined : user.email,
      metadata: sessionMetadata,
      tierAmount: selectedTier.amount
    });

    try {
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { 
                name: selectedTier.name,
                description: `Access to ${tier} tier spiritual guidance and AI mentorship`
              },
              unit_amount: selectedTier.amount,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${origin}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
        metadata: sessionMetadata,
        allow_promotion_codes: true,
      });

      logStep("SUCCESS: Checkout session created", { sessionId: session.id, hasUrl: !!session.url });

      if (!session.url) {
        logStep("ERROR: No checkout URL returned from Stripe");
        return new Response(JSON.stringify({ 
          error: "Unable to create checkout session - no URL returned" 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      logStep("=== FUNCTION SUCCESS ===", { url: session.url });
      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } catch (stripeError) {
      logStep("STRIPE CHECKOUT ERROR", { 
        error: stripeError.message, 
        type: stripeError.type,
        code: stripeError.code,
        stack: stripeError.stack 
      });
      return new Response(JSON.stringify({ 
        error: `Unable to create checkout session: ${stripeError.message}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("=== CRITICAL ERROR ===", { 
      message: errorMessage, 
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error
    });
    
    return new Response(JSON.stringify({ 
      error: `Checkout creation failed: ${errorMessage}` 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
