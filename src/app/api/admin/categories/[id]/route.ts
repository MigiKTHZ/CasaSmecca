// app/api/admin/categories/[id]/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/auth";

interface Params {
    params: { id: string };
}

// PUT update category
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

        const category = await prisma.productCategory.update({
            where: { categoryID: id },
            data: {
                name: data.name,
                image: data.image,
                slug: data.slug
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}

// DELETE category
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

        // Delete category and all associated products
        await prisma.$transaction([
            prisma.product.deleteMany({
                where: { categoryID: id }
            }),
            prisma.productCategory.delete({
                where: { categoryID: id }
            })
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}