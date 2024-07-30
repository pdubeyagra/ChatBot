import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15", // Use the latest supported version or the one you need
  typescript: true,
});
