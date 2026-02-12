// app/api/hero-data/route.ts
import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Get total counts
        const totalProducts = await prisma.product.count()
        const totalCategories = await prisma.productCategory.count()

        // Get a random category for featured
        const categories = await prisma.productCategory.findMany({
            take: 10
        })
        const randomCategory = categories[Math.floor(Math.random() * categories.length)]

        // Get a random featured product
        const products = await prisma.product.findMany({
            take: 10,
            where: {
                image: {
                    not: ''
                }
            }
        })
        const randomProduct = products[Math.floor(Math.random() * products.length)]

        return NextResponse.json({
            totalProducts,
            totalCategories,
            featuredCategory: randomCategory || null,
            featuredProduct: randomProduct || null
        })
    } catch (error) {
        console.error('Error fetching hero data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch hero data' },
            { status: 500 }
        )
    }
}