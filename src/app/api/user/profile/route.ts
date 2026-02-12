// app/api/user/profile/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                userID: true,
                name: true,
                firstname: true,
                email: true,
                phoneNr: true,
                address: true,
                addressNr: true,
                city: true,
                plz: true,
                createdAt: true,
                adminFlag: true
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'Benutzer nicht gefunden' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    try {
        const data = await request.json();

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name: data.name,
                firstname: data.firstname,
                phoneNr: data.phoneNr,
                address: data.address,
                addressNr: data.addressNr,
                city: data.city,
                plz: data.plz
            },
            select: {
                userID: true,
                name: true,
                firstname: true,
                email: true,
                phoneNr: true,
                address: true,
                addressNr: true,
                city: true,
                plz: true,
                createdAt: true
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}