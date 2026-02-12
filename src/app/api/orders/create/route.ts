// app/api/orders/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const {
            shippingAddress,
            billingAddress,
            paymentMethod,
            cart,
            subtotal,
            shipping,
            total,
            customerEmail,
            userId,
            timestamp,
            ageVerified,
            ageVerificationMethod
        } = await request.json();

        // Create order in database
        const order = await prisma.customerOrder.create({
            data: {
                status: paymentMethod === 'card' ? 'pending' : 'pending', // Stripe will update via webhook
                totalAmount: total,
                email: customerEmail,
                firstname: shippingAddress.fullName.split(' ')[0],
                name: shippingAddress.fullName.split(' ').slice(1).join(' '),
                phoneNr: shippingAddress.phone,
                adress: shippingAddress.address,
                adressNr: shippingAddress.addressNr,
                city: shippingAddress.city,
                plz: shippingAddress.zipCode,
                userID: userId,
                ageVerified: ageVerified,
                ageVerifiedAt: ageVerified ? new Date() : null,
                verificationMethod: ageVerificationMethod,
                shippingMethod: 'Standard',
                metadata: { cart, paymentMethod } as any
            }
        });

        // Create product orders
        for (const item of cart) {
            const product = await prisma.product.findUnique({
                where: { slug: item.slug }
            });

            if (product) {
                await prisma.productOrder.create({
                    data: {
                        productID: product.productID,
                        customerOrderID: order.orderID,
                        quantity: item.quantity,
                        priceAtPurchase: product.price
                    }
                });

                // Update stock
                await prisma.product.update({
                    where: { productID: product.productID },
                    data: { stock: { decrement: item.quantity } }
                });
            }
        }

        return NextResponse.json({
            success: true,
            orderId: order.orderID,
            message: 'Order created successfully'
        });

    } catch (error: any) {
        console.error('Error creating order:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}