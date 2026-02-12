// app/api/admin/upload/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/lib/auth";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'Keine Datei hochgeladen' }, { status: 400 });
        }

        // Hier müsste die tatsächliche Upload-Logik implementiert werden
        // Für jetzt geben wir eine Dummy-URL zurück
        const fileName = `image-${Date.now()}-${file.name}`;
        const imageUrl = `/uploads/${fileName}`;

        // In der Praxis würden Sie hier die Datei in einen Cloud-Speicher hochladen
        // z.B. AWS S3, Cloudinary, Vercel Blob Storage, etc.

        return NextResponse.json({ url: imageUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Upload fehlgeschlagen' }, { status: 500 });
    }
}