// components/shop/ProductContent.tsx
import prisma from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import ProductDetail from './ProductDetail'
import BreadcrumbNav from './BreadcrumbNav'
import BackToCategory from './BackToCategory'

interface ProductContentProps {
    params: {
        productSlug: string
    }
}

export default async function ProductContent({ params }: ProductContentProps) {

    const product = await prisma.product.findUnique({
        where: { slug: params.productSlug },
        include: {
            productCategory: true
        }
    })

    if (!product) {
        notFound()
    }

    const relatedProducts = await prisma.product.findMany({
        where: {
            categoryID: product.categoryID,
            productID: { not: product.productID }
        },
        take: 4,
        orderBy: { productID: 'asc' }
    })
    return (
        <main className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
            <BreadcrumbNav
                categorySlug={product.productCategory.slug}
                categoryName={product.productCategory.name}
                productName={product.name}
            />

            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <BackToCategory categorySlug={product.productCategory.slug} categoryName={product.productCategory.name} />
                        <ProductDetail product={product} relatedProducts={relatedProducts} />
                    </div>
                </div>
            </div>
        </main>
    )
}