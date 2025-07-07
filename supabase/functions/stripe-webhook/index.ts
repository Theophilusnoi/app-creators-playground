
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
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

// Price ID to tier mapping
const PRICE_ID_TO_TIER: Record<string, string> = {
  "price_1Ri4b1RwrhNPn60WOcZVVk7f": "earth",
  "price_1RgPKlRwrhNPn60WUoZnBbkB": "water",
  "price_1Ri4fiRwrhNPn60W18bbgN3t": "fire", 
  "price_1Ri4hJRwrhNPn60W5cqmVf0Q": "ether",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey || !webhookSecret) {
      logStep("Missing Stripe keys");
      return new Response("Missing configuration", { status: 500 });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Get the raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      logStep("No signature found");
      return new Response("No signature", { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      logStep("Event verified", { type: event.type });
    } catch (err) {
      logStep("Signature verification failed", { error: err });
      return new Response("Invalid signature", { status: 400 });
    }

    // Initialize Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        logStep("Processing checkout.session.completed", { sessionId: session.id });
        
        if (session.mode === 'subscription' && session.customer) {
          const customerId = typeof session.customer === 'string' ? session.customer : session.customer.id;
          const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
          
          if (customer.email) {
            await supabaseClient.from("subscribers").upsert({
              email: customer.email,
              stripe_customer_id: customerId,
              subscribed: true,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'email' });
            
            logStep("Updated subscriber on checkout completion", { email: customer.email });
          }
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        logStep("Processing subscription event", { subscriptionId: subscription.id, status: subscription.status });
        
        const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
        
        if (customer.email) {
          const priceId = subscription.items.data[0].price.id;
          const subscriptionTier = PRICE_ID_TO_TIER[priceId] || null;
          const subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
          const isActive = subscription.status === 'active';
          
          await supabaseClient.from("subscribers").upsert({
            email: customer.email,
            stripe_customer_id: subscription.customer as string,
            subscribed: isActive,
            subscription_tier: subscriptionTier,
            subscription_end: subscriptionEnd,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'email' });
          
          logStep("Updated subscriber on subscription event", { 
            email: customer.email, 
            tier: subscriptionTier, 
            active: isActive 
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        logStep("Processing subscription cancellation", { subscriptionId: subscription.id });
        
        const customer = await stripe.customers.retrieve(subscription.customer as string) as Stripe.Customer;
        
        if (customer.email) {
          await supabaseClient.from("subscribers").upsert({
            email: customer.email,
            stripe_customer_id: subscription.customer as string,
            subscribed: false,
            subscription_tier: null,
            subscription_end: null,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'email' });
          
          logStep("Updated subscriber on subscription cancellation", { email: customer.email });
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        logStep("Processing successful payment", { invoiceId: invoice.id });
        
        if (invoice.subscription && invoice.customer_email) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
          const priceId = subscription.items.data[0].price.id;
          const subscriptionTier = PRICE_ID_TO_TIER[priceId] || null;
          const subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
          
          await supabaseClient.from("subscribers").upsert({
            email: invoice.customer_email,
            stripe_customer_id: invoice.customer as string,
            subscribed: true,
            subscription_tier: subscriptionTier,
            subscription_end: subscriptionEnd,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'email' });
          
          logStep("Updated subscriber on payment success", { 
            email: invoice.customer_email, 
            tier: subscriptionTier 
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        logStep("Processing failed payment", { invoiceId: invoice.id });
        
        if (invoice.customer_email) {
          // You might want to handle failed payments differently
          // For now, we'll just log it
          logStep("Payment failed for customer", { email: invoice.customer_email });
        }
        break;
      }

      default:
        logStep("Unhandled event type", { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
