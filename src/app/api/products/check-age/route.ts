import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const slugs = searchParams.get('slugs')?.split(',') || [];

        if (slugs.length === 0) {
            return NextResponse.json({ containsAlcohol: false });
        }

        const products = await prisma.product.findMany({
            where: {
                slug: { in: slugs },
                requiresAgeVerification: true
            }
        });

        return NextResponse.json({
            containsAlcohol: products.length > 0,
            products: products.map(p => ({
                name: p.name,
                minimumAge: p.minimumAge,
                requiresAgeVerification: p.requiresAgeVerification
            }))
        });
    } catch (error) {
        console.error('Error checking age:', error);
        return NextResponse.json({ containsAlcohol: false }, { status: 500 });
    }
}