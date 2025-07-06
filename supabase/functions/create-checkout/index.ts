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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("No Stripe key found");
      return new Response(JSON.stringify({ 
        error: "Stripe not configured",
        message: "Payment system is not configured. Please contact support."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
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
      logStep("No authorization header provided");
      return new Response(JSON.stringify({ 
        error: "Authentication required",
        message: "Please log in to create a subscription."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      logStep("Authentication error", { error: userError.message });
      return new Response(JSON.stringify({ 
        error: "Authentication failed",
        message: "Please log in again."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    const user = userData.user;
    if (!user?.email) {
      logStep("User not authenticated or missing email");
      return new Response(JSON.stringify({ 
        error: "User not authenticated",
        message: "Please log in with a valid email address."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { tier, referralCode } = await req.json();
    if (!tier) {
      logStep("No tier provided");
      return new Response(JSON.stringify({ 
        error: "Invalid subscription tier",
        message: "Please select a valid subscription plan."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    
    // Check if tier is coming soon
    if (tier.toLowerCase() === 'fire' || tier.toLowerCase() === 'ether') {
      logStep("Coming soon tier requested", { tier });
      return new Response(JSON.stringify({ 
        error: "Tier coming soon",
        message: "This tier is coming soon! Please choose Earth Keeper or Water Bearer for now."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    
    logStep("Request body parsed", { tier, referralCode });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      logStep("Creating new customer");
    }

    // Updated pricing based on new structure
    const pricingMap: Record<string, number> = {
      "earth": 1900, // $19.00
      "water": 2900, // $29.00  
      "fire": 4900, // $49.00
      "ether": 5900, // $59.00
    };

    const amount = pricingMap[tier.toLowerCase()];
    if (!amount) {
      logStep("Invalid tier", { tier });
      return new Response(JSON.stringify({ 
        error: "Invalid subscription tier",
        message: "Please select a valid subscription plan."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    logStep("Pricing determined", { tier, amount });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    const sessionParams: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: `SpiritualMind ${tier.charAt(0).toUpperCase() + tier.slice(1)} Subscription`,
              description: `Access to ${tier} tier spiritual features and guidance`
            },
            unit_amount: amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: {
        tier: tier,
        user_id: user.id,
        referral_code: referralCode || "",
      },
    };

    logStep("Creating checkout session", { sessionParams: { ...sessionParams, line_items: "..." } });

    const session = await stripe.checkout.sessions.create(sessionParams);
    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ 
      error: "Checkout creation failed",
      message: "Unable to create checkout session. Please try again or contact support."
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
