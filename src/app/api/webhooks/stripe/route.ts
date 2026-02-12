// app/api/webhooks/stripe/route.ts - WITH ADDRESS SPLITTING
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/app/lib/stripe';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper function to split address into street and number
function splitAddress(addressLine: string): { street: string; number: string } {
    if (!addressLine) return { street: '', number: '' };
    
    // Remove any extra spaces
    const cleanAddress = addressLine.trim();
    
    // Common patterns for Swiss addresses:
    // 1. "Musterstrasse 123"
    // 2. "Musterstrasse 123A"
    // 3. "Musterstrasse 123-125"
    // 4. "Musterstrasse 123 A"
    
    // Try to find the last number in the string
    const match = cleanAddress.match(/(.*?)\s+(\d+[\s\-]*[a-zA-Z0-9]*)$/);
    
    if (match) {
        const [, street, number] = match;
        return {
            street: street.trim(),
            number: number.trim()
        };
    }
    
    // If no number found, return everything as street
    return { street: cleanAddress, number: '' };
}

export async function POST(request: NextRequest) {
    console.log('=== STRIPE WEBHOOK CALLED ===');

    const payload = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        console.log('Webhook verified successfully, event type:', event.type);
    } catch (err: any) {
        console.error('Webhook Error:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
    }

    return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    try {
        console.log('=== PROCESSING STRIPE CHECKOUT SESSION ===');
        console.log('Session ID:', session.id);
        
        // Check if order already exists
        const existingOrder = await prisma.customerOrder.findFirst({
            where: { 
                OR: [
                    { stripeSessionId: session.id },
                    { stripePaymentIntentId: session.payment_intent as string }
                ]
            }
        });

        if (existingOrder) {
            console.log('Order already exists:', existingOrder.orderID);
            return;
        }

        // Parse metadata
        const metadata = session.metadata || {};
        
        // Get cart items from metadata
        let cartItems: any[] = [];
        try {
            if (metadata.cartItems) {
                cartItems = JSON.parse(metadata.cartItems);
                console.log('Cart items count:', cartItems.length);
            }
        } catch (error) {
            console.error('Error parsing cart items:', error);
        }

        // Extract shipping info from customer_details
        const customerDetails = session.customer_details;
        console.log('Customer details:', customerDetails);

        // Extract shipping details
        const shippingName = customerDetails?.name || '';
        const nameParts = shippingName.trim().split(/\s+/);
        const firstname = nameParts[0] || '';
        const lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : nameParts[0] || '';

        // Get address components
        const address = customerDetails?.address as any;
        const fullAddressLine1 = address?.line1 || '';
        const addressLine2 = address?.line2 || '';
        const city = address?.city || '';
        const postalCode = address?.postal_code || '';
        const country = address?.country || '';

        // Split address into street and number
        const { street: streetName, number: streetNumber } = splitAddress(fullAddressLine1);
        
        // Use line2 if available, otherwise use the split number
        const finalStreetNumber = addressLine2 || streetNumber;

        console.log('Extracted shipping:');
        console.log('- Full address line1:', fullAddressLine1);
        console.log('- Street:', streetName);
        console.log('- Street number:', finalStreetNumber);
        console.log('- Address line2:', addressLine2);
        console.log('- City:', city);
        console.log('- Postal code:', postalCode);
        console.log('- Country:', country);

        // Create the order in database
        const order = await prisma.customerOrder.create({
            data: {
                email: session.customer_email || customerDetails?.email || '',
                firstname: firstname,
                name: lastname,
                phoneNr: customerDetails?.phone || '',
                adress: streetName, // Street name only
                adressNr: finalStreetNumber, // Street number
                city: city,
                plz: postalCode,
                totalAmount: session.amount_total ? session.amount_total / 100 : 0,
                status: session.payment_status === 'paid' ? 'paid' : 'pending',
                stripePaymentIntentId: session.payment_intent as string,
                stripeSessionId: session.id,
                stripeCustomerId: session.customer as string,
                ageVerified: metadata.ageVerified === '1',
                verificationMethod: metadata.ageVerificationMethod || 'none',
                // Connect user if exists
                ...(metadata.userId && metadata.userId !== 'guest' ? {
                    user: {
                        connect: { userID: parseInt(metadata.userId) }
                    }
                } : {})
            }
        });

        console.log('Order created in database:', order.orderID);

        // Create product orders
        let productOrderCount = 0;
        for (const item of cartItems) {
            if (!item.slug) {
                console.warn('Item missing slug:', item);
                continue;
            }
            
            try {
                const product = await prisma.product.findUnique({
                    where: { slug: item.slug }
                });

                if (product) {
                    await prisma.productOrder.create({
                        data: {
                            customerOrderID: order.orderID,
                            productID: product.productID,
                            quantity: item.quantity || 1,
                            priceAtPurchase: product.price || 0
                        }
                    });
                    productOrderCount++;
                    console.log(`Added product: ${product.name}, Quantity: ${item.quantity}`);
                } else {
                    console.warn(`Product not found for slug: ${item.slug}`);
                }
            } catch (error) {
                console.error(`Error adding product ${item.slug}:`, error);
            }
        }

        console.log(`Created ${productOrderCount} product orders`);

        // Send confirmation email
        try {
            await sendConfirmationEmail(order);
            console.log('Confirmation email sent');
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
        }

        // Dispatch event to clear cart (for frontend)
        console.log('Order completed successfully, cart should be cleared');

        console.log(`=== ORDER ${order.orderID} PROCESSED SUCCESSFULLY ===`);

    } catch (error: any) {
        console.error('Error in handleCheckoutSessionCompleted:', error);
        console.error('Error stack:', error.stack);
    }
}

async function sendConfirmationEmail(order: any) {
    try {
        // First, fetch the order with product details
        const completeOrder = await prisma.customerOrder.findUnique({
            where: { orderID: order.orderID },
            include: {
                productOrders: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!completeOrder) {
            console.error('Order not found for email:', order.orderID);
            return;
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        
        const emailPayload = {
            to: completeOrder.email,
            customerName: `${completeOrder.firstname} ${completeOrder.name}`.trim(),
            invoiceNumber: `INV-${completeOrder.orderID.toString().padStart(6, '0')}`,
            invoiceDate: new Date(completeOrder.createdAt).toISOString().split('T')[0],
            items: completeOrder.productOrders.map((po: any) => ({
                product: {
                    name: po.product.name,
                    price: Number(po.priceAtPurchase)
                },
                quantity: po.quantity,
                price: Number(po.priceAtPurchase),
                total: Number(po.priceAtPurchase) * po.quantity
            })),
            subtotal: completeOrder.productOrders.reduce((sum: number, po: any) => 
                sum + (Number(po.priceAtPurchase) * po.quantity), 0),
            tax: 0,
            total: Number(completeOrder.totalAmount),
            paymentMethod: 'Credit Card',
            companyName: "CasaSmecca",
            shippingAddress: {
                name: `${completeOrder.firstname} ${completeOrder.name}`,
                address: completeOrder.adress,
                addressNr: completeOrder.adressNr,
                city: completeOrder.city,
                zip: completeOrder.plz,
                country: 'Switzerland'
            }
        };

        console.log('Sending email to:', emailPayload.to);

        const response = await fetch(`${baseUrl}/api/send-invoice`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailPayload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to send email:', errorText);
            throw new Error(`Email failed: ${errorText}`);
        }

        console.log('Confirmation email sent successfully for order:', completeOrder.orderID);
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
}