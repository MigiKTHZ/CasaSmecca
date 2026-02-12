// components/shop/ShopContent.tsx
import HeroSection from './HeroSection'
import ShopCategories from './ShopCategories'
import prisma from '@/app/lib/prisma'

export default async function ShopContent() {
    // Fetch categories with product counts
    const categories = await prisma.productCategory.findMany({
        orderBy: {
            categoryID: 'asc'
        },
        include: {
            _count: {
                select: { products: true }
            }
        }
    })

    // Count total products
    const totalProducts = await prisma.product.count()

    return (
        <main className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
            <HeroSection 
                categoriesCount={categories.length}
                totalProducts={totalProducts}
            />
            
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <ShopCategories categories={categories} />
                    </div>
                </div>
            </div>
        </main>
    )
}