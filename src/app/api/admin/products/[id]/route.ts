// app/api/admin/products/[id]/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/auth";

interface Params {
    params: { id: string };
}

// PUT update product
export async function PUT(request: Request, { params }: Params) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { adminFlag: true }
        });

        if (!user?.adminFlag) {
            return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 });
        }

        const data = await request.json();
        const id = parseInt(params.id);

        const product = await prisma.product.update({
            where: { productID: id },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                image: data.image,
                categoryID: data.categoryID,
                weight: data.weight || null,
                volume: data.volume || null,
                packaging: data.packaging || null,
                fullWidth: data.fullWidth,
                specialType: data.specialType || null,
                slug: data.slug
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}

// DELETE product
export async function DELETE(request: Request, { params }: Params) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { adminFlag: true }
        });

        if (!user?.adminFlag) {
            return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 });
        }

        const id = parseInt(params.id);

        await prisma.product.delete({
            where: { productID: id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}