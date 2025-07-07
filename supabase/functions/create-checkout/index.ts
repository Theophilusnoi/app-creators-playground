
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

// Stripe Price ID mapping - UPDATED WITH ACTUAL PRICE IDs
const STRIPE_PRICE_IDS = {
  earth: {
    monthly: "price_1Ri4b1RwrhNPn60WOcZVVk7f",
    yearly: "price_1Ri4b1RwrhNPn60WOcZVVk7f" // Update with yearly price ID when created
  },
  water: {
    monthly: "price_1RgPKlRwrhNPn60WUoZnBbkB",
    yearly: "price_1RgPKlRwrhNPn60WUoZnBbkB" // Update with yearly price ID when created
  },
  fire: {
    monthly: "price_1Ri4fiRwrhNPn60W18bbgN3t",
    yearly: "price_1Ri4fiRwrhNPn60W18bbgN3t" // Update with yearly price ID when created
  },
  ether: {
    monthly: "price_1Ri4hJRwrhNPn60W5cqmVf0Q",
    yearly: "price_1Ri4hJRwrhNPn60W5cqmVf0Q" // Update with yearly price ID when created
  }
};

// Better error response utility
const errorResponse = (error: string, message: string, status: number = 500) => {
  logStep("ERROR", { error, message, status });
  return new Response(JSON.stringify({ 
    error,
    message,
    timestamp: new Date().toISOString()
  }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started", { method: req.method, url: req.url });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return errorResponse(
        "Stripe not configured",
        "Payment system is not configured. Please contact support.",
        500
      );
    }
    logStep("Stripe key verified");

    // Use the service role key to perform writes (upsert) in Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return errorResponse(
        "Authentication required",
        "Please log in to create a subscription.",
        401
      );
    }
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      logStep("Authentication error", { error: userError.message });
      return errorResponse(
        "Authentication failed",
        "Please log in again.",
        401
      );
    }
    const user = userData.user;
    if (!user?.email) {
      return errorResponse(
        "User not authenticated",
        "Please log in with a valid email address.",
        401
      );
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Parse request body with better error handling
    let requestBody;
    try {
      const bodyText = await req.text();
      logStep("Raw request body received", { bodyLength: bodyText.length, hasContent: !!bodyText });
      
      if (!bodyText || bodyText.trim() === '') {
        return errorResponse(
          "Empty request body",
          "Please provide subscription details.",
          400
        );
      }
      
      requestBody = JSON.parse(bodyText);
      logStep("Parsed request body", requestBody);
    } catch (parseError) {
      logStep("Failed to parse request body", { error: parseError.message });
      return errorResponse(
        "Invalid request format",
        "Please provide valid request data.",
        400
      );
    }

    const { tier, interval, referralCode } = requestBody;
    if (!tier || typeof tier !== 'string') {
      return errorResponse(
        "Invalid subscription tier",
        "Please select a valid subscription plan.",
        400
      );
    }

    // Validate tier exists in our price mapping
    const tierKey = tier.toLowerCase() as keyof typeof STRIPE_PRICE_IDS;
    if (!STRIPE_PRICE_IDS[tierKey]) {
      logStep("Invalid tier provided", { 
        tier, 
        tierKey, 
        availableTiers: Object.keys(STRIPE_PRICE_IDS) 
      });
      return errorResponse(
        "Invalid subscription tier",
        "Please select a valid subscription plan.",
        400
      );
    }

    // Default to monthly if no interval specified
    const billingInterval = interval || 'monthly';
    if (billingInterval !== 'monthly' && billingInterval !== 'yearly') {
      return errorResponse(
        "Invalid billing interval",
        "Please select monthly or yearly billing.",
        400
      );
    }
    
    logStep("Request validated", { tier, interval: billingInterval, referralCode });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer already exists
    logStep("Checking for existing Stripe customer");
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      logStep("No existing customer found - will create during checkout");
    }

    // Get the appropriate price ID
    const tierPriceIds = STRIPE_PRICE_IDS[tierKey];
    const priceId = billingInterval === 'yearly' ? tierPriceIds.yearly : tierPriceIds.monthly;
    logStep("Price ID determined", { tier, interval: billingInterval, priceId });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    const sessionParams: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: {
        tier: tier,
        interval: billingInterval,
        user_id: user.id,
        referral_code: referralCode || "",
      },
    };

    logStep("Creating checkout session", { 
      priceId, 
      customerId: customerId || 'new customer',
      email: user.email,
      mode: 'subscription',
      origin
    });

    const session = await stripe.checkout.sessions.create(sessionParams);
    logStep("Checkout session created successfully", { 
      sessionId: session.id, 
      url: session.url ? 'URL generated' : 'No URL',
      status: session.status
    });

    if (!session.url) {
      return errorResponse(
        "Checkout creation failed",
        "Unable to generate checkout URL. Please try again.",
        500
      );
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    logStep("CRITICAL ERROR in create-checkout", { 
      message: errorMessage, 
      stack: errorStack,
      type: error.constructor.name 
    });
    
    // Provide more specific error messages based on error type
    let userMessage = "Unable to create checkout session. Please try again.";
    
    if (errorMessage.includes('No such price')) {
      userMessage = "Invalid subscription plan selected. Please contact support.";
    } else if (errorMessage.includes('customer')) {
      userMessage = "Customer account issue. Please contact support.";
    } else if (errorMessage.includes('authentication') || errorMessage.includes('key')) {
      userMessage = "Payment system configuration error. Please contact support.";
    } else if (errorMessage.includes('Invalid request')) {
      userMessage = "Invalid request data. Please try again.";
    }
    
    return errorResponse(
      "Checkout creation failed",
      userMessage,
      500
    );
  }
});
