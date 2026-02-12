// app/api/admin/categories/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/auth";

// GET all categories
export async function GET() {
    try {
        const categories = await prisma.productCategory.findMany({
            include: {
                products: {
                    select: {
                        productID: true,
                        name: true,
                        price: true
                    }
                }
            },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}

// POST create new category
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

        const category = await prisma.productCategory.create({
            data: {
                name: data.name,
                image: data.image || '',
                slug: data.slug
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
    }
}