
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[COMPLETE-REFERRAL] ${step}${detailsStr}`);
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

    const { sessionId } = await req.json();
    if (!sessionId) throw new Error("Session ID is required");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Get checkout session details
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    logStep("Retrieved session", { sessionId, status: session.payment_status });

    if (session.payment_status !== 'paid') {
      throw new Error("Payment not completed");
    }

    const metadata = session.metadata;
    if (!metadata?.referral_id) {
      logStep("No referral to complete");
      return new Response(JSON.stringify({ success: true, message: "No referral to complete" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Update referral record
    const { error: updateError } = await supabaseClient
      .from('referrals')
      .update({
        status: 'completed',
        referred_user_id: metadata.user_id,
        completed_at: new Date().toISOString(),
        reward_claimed: true
      })
      .eq('id', metadata.referral_id);

    if (updateError) throw updateError;

    // Here you could add logic to extend the referrer's subscription
    // For now, we'll just log the successful referral completion
    logStep("Referral completed successfully", {
      referralId: metadata.referral_id,
      referrerUserId: metadata.referrer_user_id,
      referredUserId: metadata.user_id
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Referral completed successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in complete-referral", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
