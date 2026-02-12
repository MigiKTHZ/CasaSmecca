import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/app/lib/stripe';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const sessionId = searchParams.get('session_id');

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
        }

        // Retrieve session from Stripe with line items expanded
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items.data.price.product', 'customer']
        });

        // Calculate total from line items
        let amount_total = 0;
        if (session.line_items && session.line_items.data) {
            amount_total = session.line_items.data.reduce((total, item) => {
                return total + (item.amount_total || 0);
            }, 0);
        }

        return NextResponse.json({
            id: session.id,
            payment_status: session.payment_status,
            amount_total: amount_total / 100, // Convert to CHF
            customer_email: session.customer_email,
            customer_details: session.customer_details,
            customer: session.customer,
            line_items_count: session.line_items?.data?.length || 0,
            created: new Date(session.created * 1000).toISOString()
        });
    } catch (error: any) {
        console.error('Error fetching session info:', error);
        return NextResponse.json({
            error: error.message,
            details: 'Failed to retrieve session information'
        }, { status: 500 });
    }
}