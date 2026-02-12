// components/shop/CategoryCard.tsx
'use client'

import { ProductCategory } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
    category: ProductCategory & {
        _count?: {
            products: number
        }
    }
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const productCount = category._count?.products || 0
    
    return (
        <Link href={`/shop/${category.slug}`}>
            <div className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-4 border-lime-950">
                {/* Tall Portrait Image Container */}
                <div className="relative h-[320px] w-full overflow-hidden">
                    {/* Subtle gradient overlay at bottom only */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-10" />
                    
                    {/* Display the image with more visible area */}
                    {category.image ? (
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            priority={category.categoryID <= 4}
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-lime-100 to-emerald-200 flex items-center justify-center">
                            <span className="text-gray-600 text-5xl font-bold">
                                {category.name.charAt(0)}
                            </span>
                        </div>
                    )}
                    
                    {/* Product Count Badge */}
                    <div className="absolute top-4 right-4 bg-lime-600 text-white px-3 py-1 rounded-full z-20 shadow-sm border-2 border-lime-700">
                        <span className="text-sm font-medium">
                            {productCount} {productCount === 1 ? 'product' : 'products'}
                        </span>
                    </div>
                    
                    {/* Category name overlay at bottom */}
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                            {category.name}
                        </h3>
                        <div className="flex items-center justify-between">
                            <span className="text-white/90 text-sm drop-shadow-md">
                                Browse products
                            </span>
                            <span className="text-white text-lg group-hover:translate-x-2 transition-transform">
                                →
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info section below image */}
                <div className="p-4 bg-gradient-to-b from-white to-lime-50">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">
                            {productCount} items
                        </span>
                        <div className="text-lime-600 font-medium hover:text-lime-700 transition-colors text-sm">
                            View Products
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}