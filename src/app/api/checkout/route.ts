// app/api/checkout/route.ts - COMPLETELY FIXED VERSION
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/app/lib/stripe';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

type CartItem = {
    slug: string;
    quantity: number;
    product?: {
        id: number;
        name: string;
        price: number;
        image: string;
        requiresAgeVerification?: boolean;
    };
};

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        const { 
            cartItems, 
            customerEmail, 
            customerName,
            total, 
            subtotal,
            shippingCost,
            ageVerified, 
            ageVerificationMethod,
            userId
        } = await request.json();

        console.log('Received checkout request');

        // Validate required data
        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Check if cart contains alcohol and if age is verified
        const cartContainsAlcohol = await checkIfCartContainsAlcohol(cartItems);

        if (cartContainsAlcohol && !ageVerified) {
            return NextResponse.json({
                error: 'Age verification required',
                requiresAgeVerification: true
            }, { status: 400 });
        }

        // Calculate total amount
        const totalAmount = parseFloat(total.toString()) || 0;

        // Create or retrieve Stripe customer
        let customerId: string | null = null;
        const emailToUse = customerEmail || session?.user?.email;
        
        // Prepare shipping address for pre-fill (if user is logged in)
        let prefillShippingAddress: any = null;
        
        if (session?.user?.address && session.user.city && session.user.plz) {
            prefillShippingAddress = {
                name: session.user.name || '',
                address: {
                    line1: session.user.address || '',
                    line2: '', // Address number if you have it separately
                    city: session.user.city || '',
                    postal_code: session.user.plz || '',
                    country: 'CH'
                }
            };
        }

        if (emailToUse) {
            const existingCustomer = await prisma.user.findUnique({
                where: { email: emailToUse },
                select: { stripeCustomerId: true }
            });

            if (existingCustomer?.stripeCustomerId) {
                customerId = existingCustomer.stripeCustomerId;
            } else if (session?.user) {
                // Create new Stripe customer with user data
                const customerData: any = {
                    email: emailToUse,
                    name: session.user.name || 'Customer',
                    metadata: {
                        userId: userId?.toString() || 'guest',
                        ageVerified: ageVerified ? 'true' : 'false',
                        ageVerificationMethod: ageVerificationMethod || 'none'
                    }
                };

                // Add phone if available
                if (session.user.phoneNr) {
                    customerData.phone = session.user.phoneNr;
                }

                // Add address if available
                if (session.user.address && session.user.city && session.user.plz) {
                    customerData.address = {
                        line1: session.user.address,
                        line2: '', // Address number
                        city: session.user.city,
                        postal_code: session.user.plz,
                        country: 'CH'
                    };
                }

                const stripeCustomer = await stripe.customers.create(customerData);
                customerId = stripeCustomer.id;

                // Save to database
                await prisma.user.update({
                    where: { email: emailToUse },
                    data: { stripeCustomerId: stripeCustomer.id }
                });
            }
        }

        // Create line items for Stripe
        const lineItems: Array<{ price: string; quantity: number }> = [];

        for (const item of cartItems) {
            const product = await prisma.product.findUnique({
                where: { slug: item.slug },
                select: {
                    productID: true,
                    stripePriceId: true,
                    name: true,
                    price: true
                }
            });

            if (product?.stripePriceId) {
                lineItems.push({
                    price: product.stripePriceId,
                    quantity: item.quantity,
                });
                continue;
            }

            // Create price dynamically
            let priceAmount = product?.price ? parseFloat(product.price.toString()) : 
                            item.product?.price ? parseFloat(item.product.price.toString()) : 0;

            if (isNaN(priceAmount) || priceAmount <= 0) {
                throw new Error(`Invalid price for product ${item.slug}`);
            }

            const priceInCents = Math.round(priceAmount * 100);

            const price = await stripe.prices.create({
                unit_amount: priceInCents,
                currency: 'chf',
                product_data: {
                    name: item.product?.name || product?.name || `Product ${item.slug}`,
                    metadata: {
                        productId: product?.productID?.toString() || item.product?.id?.toString() || '',
                        slug: item.slug
                    }
                },
            });

            // Update product with Stripe price ID
            if (product) {
                await prisma.product.update({
                    where: { slug: item.slug },
                    data: { stripePriceId: price.id }
                });
            }

            lineItems.push({
                price: price.id,
                quantity: item.quantity,
            });
        }

        // Add shipping
        const shippingCostAmount = parseFloat(shippingCost.toString()) || 0;
        if (shippingCostAmount > 0) {
            const shippingPrice = await stripe.prices.create({
                unit_amount: Math.round(shippingCostAmount * 100),
                currency: 'chf',
                product_data: {
                    name: 'Shipping',
                },
            });

            lineItems.push({
                price: shippingPrice.id,
                quantity: 1,
            });
        }

        // Create metadata - store user ID for webhook
        const metadata: Record<string, string> = {
            userId: userId?.toString() || 'guest',
            cartItems: JSON.stringify(cartItems.map((item: CartItem) => ({
                slug: item.slug,
                quantity: item.quantity,
                productId: item.product?.id?.toString() || ''
            }))),
            ageVerified: ageVerified ? '1' : '0',
            ageVerificationMethod: ageVerificationMethod || 'none',
            cartContainsAlcohol: cartContainsAlcohol ? '1' : '0',
            totalAmount: totalAmount.toString(),
            subtotal: subtotal.toString(),
            shippingCost: shippingCostAmount.toString(),
            itemCount: cartItems.length.toString()
        };

        // Use only card for now
        const payment_method_types: string[] = ['card'];

        // Create Checkout Session configuration
        const sessionConfig: any = {
            payment_method_types: payment_method_types,
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel`,
            metadata: metadata,
            shipping_address_collection: {
                allowed_countries: ['CH', 'DE', 'AT', 'FR', 'IT'],
            },
            allow_promotion_codes: true,
            custom_text: {
                shipping_address: {
                    message: 'Please confirm or update your shipping address'
                },
                submit: {
                    message: 'Complete your payment'
                }
            }
        };

        // Pre-fill shipping address for logged-in users
        if (prefillShippingAddress) {
            console.log('Pre-filling shipping address:', prefillShippingAddress);
            
            // Note: Stripe doesn't directly pre-fill addresses in Checkout
            // But we can create a customer with shipping address
            if (customerId) {
                // Update customer with shipping address
                try {
                    await stripe.customers.update(customerId, {
                        shipping: {
                            name: prefillShippingAddress.name,
                            address: prefillShippingAddress.address
                        }
                    });
                    console.log('Updated customer shipping address');
                } catch (error) {
                    console.error('Failed to update customer shipping:', error);
                }
            }
        }

        // Handle customer configuration
        if (customerId) {
            sessionConfig.customer = customerId;
        } else if (emailToUse) {
            sessionConfig.customer_email = emailToUse;
        }

        const stripeSession = await stripe.checkout.sessions.create(sessionConfig);

        console.log('Stripe session created:', stripeSession.id);

        return NextResponse.json({
            sessionId: stripeSession.id,
            url: stripeSession.url
        });

    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json({
            error: error.message,
            details: error.raw?.message,
        }, { status: 500 });
    }
}

async function checkIfCartContainsAlcohol(cartItems: CartItem[]): Promise<boolean> {
    const slugs = cartItems.map(item => item.slug);
    const products = await prisma.product.findMany({
        where: {
            slug: { in: slugs },
            requiresAgeVerification: true
        }
    });
    return products.length > 0;
}