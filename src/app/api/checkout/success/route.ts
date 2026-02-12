import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const sessionId = searchParams.get('session_id');

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
        }

        // Retrieve the order from database
        const order = await prisma.customerOrder.findUnique({
            where: { stripeSessionId: sessionId },
            include: {
                productOrders: {
                    include: {
                        product: true
                    }
                }
            }
        });

        console.log('🔍 Success API - Order found:', {
            orderID: order?.orderID,
            totalAmount: order?.totalAmount,
            totalAmountType: typeof order?.totalAmount,
            totalAmountValue: order?.totalAmount?.toString()
        });

        if (!order) {
            return NextResponse.json({
                message: 'Order not found yet',
                status: 'processing'
            });
        }

        // Stelle sicher, dass totalAmount eine Zahl ist
        const totalAmount = Number(order.totalAmount) || 0;

        return NextResponse.json({
            orderID: order.orderID,
            email: order.email,
            totalAmount: totalAmount, // <-- HIER als Zahl
            status: order.status,
            createdAt: order.createdAt.toISOString(),
            productOrders: order.productOrders
        });

    } catch (error: any) {
        console.error('Error fetching order details:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}