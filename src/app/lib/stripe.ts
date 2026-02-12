import Stripe from 'stripe';

// Use the specific API version that matches your Stripe account
// You can find this in your Stripe dashboard or use '2024-12-18.latest'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-12-15.clover', // Updated to latest stable
    typescript: true,
});

// Helper function to check if cart contains alcohol
export function cartContainsAlcohol(cartItems: any[]): boolean {
    return cartItems.some(item => item.requiresAgeVerification);
}