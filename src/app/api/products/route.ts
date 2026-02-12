// app/api/products/route.ts - SIMPLE VERSION
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slugs = searchParams.get('slugs');
        
        if (!slugs) {
            return NextResponse.json([]);
        }
        
        const slugArray = slugs.split(',').filter(Boolean);
        
        if (slugArray.length === 0) {
            return NextResponse.json([]);
        }
        
        // Simple database query - no joins needed
        const products = await prisma.product.findMany({
            where: {
                slug: {
                    in: slugArray
                }
            }
        });
        
        // Convert Decimal to number for JSON
        const serializedProducts = products.map(product => ({
            ...product,
            price: Number(product.price)
        }));
        
        return NextResponse.json(serializedProducts);
        
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}