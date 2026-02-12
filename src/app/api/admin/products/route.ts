// app/api/admin/products/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/auth";

// GET all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                productCategory: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}

// POST create new product
export async function POST(request: Request) {
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

        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                image: data.image || '',
                categoryID: data.categoryID,
                weight: data.weight || null,
                volume: data.volume || null,
                packaging: data.packaging || null,
                fullWidth: data.fullWidth || false,
                specialType: data.specialType || null,
                slug: data.slug
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}