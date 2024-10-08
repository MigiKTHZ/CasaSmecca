// /app/api/resetpassword/route.ts
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from "@/app/lib/prisma";

const secretKey = process.env.NEXTAUTH_SECRET as string;

interface ResetPasswordPayload {
    token: string;
    newPassword: string;
}
// Handler for POST requests
export async function POST(req: Request) {
    const body = await req.json();
    const { token, newPassword } = body;

    console.log("Decoded token:", token);
    console.log("newpassword:", newPassword);

    if (!token || !newPassword) {
        return NextResponse.json({ message: 'Token or new password missing' }, { status: 200});
    }

    try {
        const decoded = jwt.verify(token, secretKey) as { email: string };
        console.log("Decoded token:", decoded);
        // Find the user
        const user = await prisma.user.findUnique({ where: { email: decoded.email } });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status:404 });
        }

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Update user password in the database
        await prisma.user.update({
            where: { email: decoded.email },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: 'Password has been reset successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403});
    }
}   
