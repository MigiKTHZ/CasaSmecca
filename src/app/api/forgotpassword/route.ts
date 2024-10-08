// /app/api/resetpassword/route.ts
import { sendEmail, MailOptions } from '@/app/lib/nodemailer';
import { NextResponse } from 'next/server';
import prisma from "@/app/lib/prisma";
import { sign } from 'jsonwebtoken';

// Handler for POST requests
export async function POST(req: Request) {
    const email = await req.text();

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) return NextResponse.json({ message: "No User with this E-Mail found" });

    const secret = process.env.NEXTAUTH_SECRET || "your-secret"; // Make sure you have the secret defined
    const token = sign(
        { id: user.userID, email: user.email }, // Include the user ID and email in the token payload
        secret,
        { expiresIn: '1h' } // Token will expire in 1 hour
    );

    const resetPasswordUrl = `${process.env.NEXTAUTH_URL}/resetpassword?token=${token}`;


    const mailoptions: MailOptions = {
        to: email,
        subject: "CasaSmecca Password Reset Request",
        text: `Click the following link to reset your password: ${resetPasswordUrl}`,
        html: `<h1>Password Reset</h1><p>Click the following link to reset your password:</p><a href="${resetPasswordUrl}">Reset Password</a>`
    }

    sendEmail(mailoptions);
    console.log("E-Mail sent");
    return NextResponse.json({ message: "Success" }, { status: 200 });
}
