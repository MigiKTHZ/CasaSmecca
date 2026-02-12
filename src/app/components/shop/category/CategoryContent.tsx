// components/shop/CategoryContent.tsx
import prisma from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import CategoryHero from './CategoryHero'
import ProductsGrid from './ProductsGrid'
import EmptyProducts from './EmptyProducts'
import BackToShop from './BackToShop'

interface CategoryContentProps {
    params: {
        categorySlug: string
    }
}

export default async function CategoryContent({ params }: CategoryContentProps) {

    // Fetch the category with its products
    const category = await prisma.productCategory.findUnique({
        where: { slug: params.categorySlug },
        include: {
            products: {
                orderBy: {
                    productID: 'asc'
                }
            }
        }
    })

    if (!category) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
            <CategoryHero category={category} />

            <div className="py-12">
                <div className="container mx-auto px-4">
                    {category.products.length === 0 ? (
                        <EmptyProducts />
                    ) : (
                        <ProductsGrid category={category} />
                    )}
                </div>
            </div>

            <BackToShop />
        </main>
    )
}