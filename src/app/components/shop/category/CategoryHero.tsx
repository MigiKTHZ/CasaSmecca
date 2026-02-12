// components/shop/CategoryHero.tsx
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ProductCategory } from '@prisma/client'

interface CategoryHeroProps {
    category: ProductCategory & {
        products: any[]
    }
}

export default function CategoryHero({ category }: CategoryHeroProps) {
    return (
        <div className="bg-gradient-to-r from-lime-600 to-emerald-600 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/shop"
                        className="inline-flex items-center text-lime-200 hover:text-white mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to All Categories
                    </Link>

                    {/* Category Info */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {category.name}
                            </h1>
                            <p className="text-lime-100 text-lg">
                                Explore our selection of {category.products.length} premium products
                            </p>
                        </div>

                        {/* Category Image */}
                        <div className="relative w-full md:w-1/3 h-64 md:h-48 rounded-xl overflow-hidden shadow-lg border-4 border-white/20">
                            {category.image ? (
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            ) : (
                                <div className="h-full w-full bg-gradient-to-br from-lime-100 to-emerald-200 flex items-center justify-center">
                                    <span className="text-white text-4xl font-bold">
                                        {category.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}