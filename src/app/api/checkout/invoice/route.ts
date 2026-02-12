// app/api/checkout/invoice/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
        const { 
            cartItems,
            customerDetails,
            subtotal,
            shippingCost,
            total,
            userId,
            ageVerified,
            ageVerificationMethod,
            cartContainsAlcohol
        } = await request.json();

        console.log('Received invoice order request');

        // Validate required data
        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        if (!customerDetails?.email) {
            return NextResponse.json({ 
                error: 'Email is required for invoice payment' 
            }, { status: 400 });
        }

        if (cartContainsAlcohol && !ageVerified) {
            return NextResponse.json({
                error: 'Age verification required',
                requiresAgeVerification: true
            }, { status: 400 });
        }

        // SAFE name parsing
        const name = customerDetails.name?.trim() || '';
        let firstname = '';
        let lastname = '';
        
        if (name) {
            const nameParts = name.split(/\s+/);
            if (nameParts.length === 1) {
                // Single name - use as lastname
                lastname = nameParts[0];
                firstname = ''; // Leave firstname empty
            } else {
                // Multiple names - first is firstname, rest is lastname
                firstname = nameParts[0];
                lastname = nameParts.slice(1).join(' ');
            }
        }

        // Debug log
        console.log('Parsed name:', { original: name, firstname, lastname });

        // Create order data
        const orderData: any = {
            email: customerDetails.email,
            firstname: firstname,
            name: lastname,
            phoneNr: customerDetails.phone || '',
            adress: customerDetails.address || '',
            adressNr: '', // Address number (empty if not provided)
            city: customerDetails.city || '',
            plz: customerDetails.zipCode || '', // ZIP code
            totalAmount: total,
            status: 'pending',
            paymentMethod: 'invoice',
            stripeSessionId: `INV-${Date.now()}`,
            ageVerified: ageVerified || false,
            verificationMethod: ageVerificationMethod || 'none',
        };

        // Add user connection if userId exists
        if (userId) {
            orderData.user = {
                connect: { userID: userId }
            };
        }

        // Create the order
        const order = await prisma.customerOrder.create({
            data: orderData
        });

        console.log('Created invoice order:', order.orderID);

        // Create product orders separately
        for (const item of cartItems) {
            try {
                const product = await prisma.product.findUnique({
                    where: { slug: item.slug },
                    select: { productID: true, price: true }
                });

                if (product && product.productID) {
                    await prisma.productOrder.create({
                        data: {
                            customerOrderID: order.orderID,
                            productID: product.productID,
                            quantity: item.quantity,
                            priceAtPurchase: product.price || 0
                        }
                    });
                    console.log(`Added product ${item.slug} to order`);
                } else {
                    console.warn(`Product not found: ${item.slug}`);
                }
            } catch (error) {
                console.error(`Error adding product ${item.slug}:`, error);
            }
        }

        // Fetch the complete order with product details
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
            throw new Error('Failed to create order');
        }

        // Send invoice email
        await sendInvoiceEmail(completeOrder);

        return NextResponse.json({
            orderId: completeOrder.orderID,
            invoiceNumber: `INV-${completeOrder.orderID.toString().padStart(6, '0')}`,
            success: true,
            message: 'Invoice order created successfully. You will receive an invoice via email.',
            redirectUrl: `${process.env.NEXTAUTH_URL}/checkout/success?orderId=${completeOrder.orderID}&type=invoice`
        });

    } catch (error: any) {
        console.error('Invoice order error:', error);
        return NextResponse.json({
            error: error.message || 'Failed to create invoice order',
        }, { status: 500 });
    }
}

async function sendInvoiceEmail(order: any) {
    try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        
        // Prepare email payload
        const emailPayload = {
            to: order.email,
            customerName: `${order.firstname} ${order.name}`.trim(),
            invoiceNumber: `INV-${order.orderID.toString().padStart(6, '0')}`,
            invoiceDate: new Date(order.createdAt).toISOString().split('T')[0],
            items: order.productOrders.map((po: any) => ({
                product: {
                    name: po.product.name,
                    price: Number(po.priceAtPurchase)
                },
                quantity: po.quantity,
                price: Number(po.priceAtPurchase),
                total: Number(po.priceAtPurchase) * po.quantity
            })),
            subtotal: order.productOrders.reduce((sum: number, po: any) => 
                sum + (Number(po.priceAtPurchase) * po.quantity), 0),
            tax: 0,
            total: Number(order.totalAmount),
            paymentMethod: 'Invoice',
            companyName: "CasaSmecca",
            paymentTerms: '30 days',
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            shippingAddress: {
                name: `${order.firstname} ${order.name}`,
                address: order.adress,
                city: order.city,
                zip: order.plz,
                country: 'Switzerland'
            }
        };

        console.log('Sending invoice email for order:', order.orderID);

        const response = await fetch(`${baseUrl}/api/send-invoice`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailPayload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to send invoice email:', errorText);
            throw new Error(`Email failed: ${errorText}`);
        } else {
            console.log('Invoice email sent for order:', order.orderID);
        }
    } catch (error) {
        console.error('Error sending invoice email:', error);
        // Don't throw here - email failure shouldn't fail the whole order
    }
}