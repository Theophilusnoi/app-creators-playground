
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

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    // Parse the request body with error handling
    let requestBody;
    try {
      const rawBody = await req.text();
      logStep("Raw body received", { length: rawBody.length });
      
      if (rawBody && rawBody.trim()) {
        requestBody = JSON.parse(rawBody);
        logStep("Parsed request body", requestBody);
      } else {
        logStep("Empty body received");
        return new Response(JSON.stringify({ 
          error: "Request body is required" 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
    } catch (parseError) {
      logStep("JSON parse error", { error: parseError.message });
      return new Response(JSON.stringify({ 
        error: `Invalid request format: ${parseError.message}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { tier, referralCode } = requestBody;
    
    if (!tier) {
      logStep("Missing tier parameter");
      return new Response(JSON.stringify({ 
        error: "Subscription tier is required" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    
    logStep("Processing tier", { tier, referralCode });

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("Missing authorization header");
      return new Response(JSON.stringify({ 
        error: "Authorization header is required" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) {
      logStep("User authentication error", { error: userError.message });
      return new Response(JSON.stringify({ 
        error: `Authentication failed: ${userError.message}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const user = data.user;
    if (!user?.email) {
      logStep("User not found or missing email");
      return new Response(JSON.stringify({ 
        error: "User not authenticated or email not available" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Initialize Stripe with error handling
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("Missing Stripe secret key");
      return new Response(JSON.stringify({ 
        error: "Payment system not configured" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    
    let stripe;
    try {
      stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
      logStep("Stripe initialized");
    } catch (stripeError) {
      logStep("Stripe initialization error", { error: stripeError.message });
      return new Response(JSON.stringify({ 
        error: "Payment system initialization failed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Define tier pricing with validation
    const wisdomTiers = {
      earth: { amount: 2900, name: "Earth Keeper - Monthly" },
      water: { amount: 7900, name: "Water Bearer - Monthly" },
      fire: { amount: 19700, name: "Fire Keeper - Monthly" },
      ether: { amount: 49700, name: "Ether Walker - Monthly" },
    };

    const selectedTier = wisdomTiers[tier as keyof typeof wisdomTiers];
    if (!selectedTier) {
      logStep("Invalid tier", { tier });
      return new Response(JSON.stringify({ 
        error: `Invalid subscription tier: ${tier}. Valid tiers are: ${Object.keys(wisdomTiers).join(', ')}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    logStep("Tier selected", selectedTier);

    // Check for existing customer with error handling
    let customerId;
    try {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing customer", { customerId });
      } else {
        logStep("No existing customer found");
      }
    } catch (stripeError) {
      logStep("Stripe customer lookup error", { error: stripeError.message });
      return new Response(JSON.stringify({ 
        error: "Unable to verify customer information" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const origin = req.headers.get("origin") || "https://yrshvcaoczjsqziwllqi.supabase.co";
    logStep("Using origin", { origin });

    // Create checkout session with comprehensive error handling
    const sessionMetadata: any = {
      tier,
      user_id: user.id,
      user_email: user.email
    };
    
    if (referralCode) {
      sessionMetadata.referral_code = referralCode;
    }

    logStep("Creating checkout session", { metadata: sessionMetadata });

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

      logStep("Checkout session created successfully", { sessionId: session.id, url: session.url });

      if (!session.url) {
        logStep("No checkout URL returned from Stripe");
        return new Response(JSON.stringify({ 
          error: "Unable to create checkout session - no URL returned" 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } catch (stripeError) {
      logStep("Stripe checkout session creation error", { error: stripeError.message, stack: stripeError.stack });
      return new Response(JSON.stringify({ 
        error: `Unable to create checkout session: ${stripeError.message}` 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("CRITICAL ERROR in create-checkout", { 
      message: errorMessage, 
      stack: error instanceof Error ? error.stack : undefined 
    });
    
    return new Response(JSON.stringify({ 
      error: `Checkout creation failed: ${errorMessage}` 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
