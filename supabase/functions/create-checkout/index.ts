
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

    const { tier, referralCode } = await req.json();
    if (!tier) throw new Error("Subscription tier is required");
    logStep("Tier and referral code received", { tier, referralCode });

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Check if user was referred
    let referralRecord = null;
    if (referralCode) {
      const { data: referralData } = await supabaseClient
        .from('referrals')
        .select('*')
        .eq('referral_code', referralCode)
        .eq('status', 'pending')
        .single();
      
      if (referralData) {
        referralRecord = referralData;
        logStep("Valid referral found", { referralId: referralRecord.id });
      }
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check for existing customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      logStep("No existing customer found");
    }

    // Define wisdom tier pricing
    const wisdomTiers = {
      earth: { amount: 2900, name: "Earth Keeper - Monthly" }, // $29.00
      water: { amount: 7900, name: "Water Bearer - Monthly" }, // $79.00
      fire: { amount: 19700, name: "Fire Keeper - Monthly" }, // $197.00
      ether: { amount: 49700, name: "Ether Walker - Monthly" }, // $497.00
      // Legacy pricing for backwards compatibility
      basic: { amount: 999, name: "Basic Plan" },
      premium: { amount: 1999, name: "Premium Plan" },
      pro: { amount: 4999, name: "Pro Plan" }
    };

    const selectedTier = wisdomTiers[tier as keyof typeof wisdomTiers];
    if (!selectedTier) throw new Error("Invalid subscription tier");
    logStep("Tier pricing", selectedTier);

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    // Create checkout session with metadata for referral tracking
    const sessionMetadata: any = {
      tier,
      user_id: user.id,
      user_email: user.email
    };
    
    if (referralRecord) {
      sessionMetadata.referral_id = referralRecord.id;
      sessionMetadata.referrer_user_id = referralRecord.referrer_user_id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: selectedTier.name,
              description: `Access to ${tier} tier spiritual guidance and tools`
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

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
