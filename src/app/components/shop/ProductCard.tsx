// components/shop/ProductCard.tsx
'use client'

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Decimal } from '@prisma/client/runtime/library'

interface ProductCardProps {
    product: {
        productID: number
        name: string
        description: string | null
        price: Decimal | number
        image: string
        weight: string | null
        volume: string | null
        packaging: string | null
        fullWidth: boolean
        specialType: string | null
        categoryID: number  // We need this for the link
    }
}

export default function ProductCard({ product }: ProductCardProps) {
    // Convert Decimal to number if needed
    const getPriceValue = () => {
        try {
            if (!product.price) return 0

            if (typeof product.price === 'object' && product.price !== null) {
                if ('toNumber' in product.price) {
                    return product.price.toNumber()
                }
                return Number(product.price)
            }

            return Number(product.price)
        } catch {
            return 0
        }
    }

    const priceValue = getPriceValue()
    const formattedPrice = priceValue === 0
        ? 'Price on request'
        : `CHF ${priceValue.toFixed(2)}`

    return (
        <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            {/* Make the image clickable */}
            <Link href={`/shop/${product.categoryID}/${product.productID}`}>
                <div className="relative h-64 w-full overflow-hidden flex-shrink-0 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />

                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-4xl font-bold">
                                {product.name.charAt(0)}
                            </span>
                        </div>
                    )}

                    {/* Product ID Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full z-20">
                        <span className="text-sm font-medium text-gray-800">
                            #{product.productID}
                        </span>
                    </div>

                    {/* View Product Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                        <span className="text-white font-medium bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                            View Details →
                        </span>
                    </div>
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-5 flex-grow flex flex-col">
                {/* Product Name (also clickable) */}
                <Link
                    href={`/shop/${product.categoryID}/${product.productID}`}
                    className="hover:text-amber-700 transition-colors"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Special Info */}
                {(product.weight || product.volume || product.packaging) && (
                    <div className="mb-3">
                        {product.weight && (
                            <div className="text-sm text-gray-600">Weight: {product.weight}</div>
                        )}
                        {product.volume && (
                            <div className="text-sm text-gray-600">Volume: {product.volume}</div>
                        )}
                        {product.packaging && (
                            <div className="text-sm text-gray-600">{product.packaging}</div>
                        )}
                    </div>
                )}

                {/* Description */}
                {product.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {product.description}
                    </p>
                )}

                {/* Price and Action */}
                <div className="mt-auto">
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="text-amber-600 font-bold text-lg">
                            {formattedPrice}
                        </div>
                        <button
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                            onClick={(e) => {
                                e.stopPropagation()
                                console.log('Add to cart:', product.productID)
                            }}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}