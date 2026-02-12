// app/api/user/age-verification/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/lib/auth";

// In der Realität würden Sie die User-Tabelle erweitern, aber für Demo:
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ isVerified: false });
    }

    // Hier würde man aus der Datenbank lesen
    // Für Demo: aus LocalStorage lesen
    const storedVerification = localStorage.getItem(`ageVerified_${session.user.email}`);

    return NextResponse.json({
        isVerified: storedVerification ? JSON.parse(storedVerification).isVerified : false
    });
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    try {
        const data = await request.json();

        // In der Realität in der Datenbank speichern
        // Für Demo: in LocalStorage
        localStorage.setItem(`ageVerified_${session.user.email}`, JSON.stringify(data));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving age verification:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}