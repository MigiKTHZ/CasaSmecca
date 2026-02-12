// app/api/send-invoice/route.ts
import { NextResponse } from 'next/server';
import { render } from '@react-email/render';

import { sendEmail } from '@/app/lib/nodemailer';
import { InvoiceEmail } from '@/app/emails/InvoiceEmail';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            to,
            customerName,
            invoiceNumber,
            invoiceDate,
            items,
            subtotal,
            tax,
            total,
            paymentMethod,
            companyName,
        } = body;

        // Render React Email to HTML
        const html = await render(
            InvoiceEmail({
                customerName,
                invoiceNumber,
                invoiceDate,
                items: items.map((item: any) => ({
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
                subtotal,
                tax,
                total,
                paymentMethod,
                companyName,
            })
        );

        console.log("E-Mail sent to: ", to);

        await sendEmail({
            to,
            subject: `Your invoice ${invoiceNumber}`,
            html,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Invoice email error:', error);
        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}
