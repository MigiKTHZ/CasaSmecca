// components/shop/ProductCard.tsx (With quantity selector)
'use client'

import Image from 'next/image'
import { ShoppingCart, Check, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { Decimal } from '@prisma/client/runtime/library'
import { useState } from 'react'
import Cookies from 'js-cookie'

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
        categoryID: number
        slug: string
    }
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isAdding, setIsAdding] = useState(false)
    const [added, setAdded] = useState(false)
    const [quantity, setQuantity] = useState(1)
    
    const CART_COOKIE_KEY = 'shopping_cart'

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

    const addToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (quantity < 1) return
        
        setIsAdding(true)
        
        try {
            // Get current cart from cookies
            const cartCookie = Cookies.get(CART_COOKIE_KEY)
            let currentCart = cartCookie ? JSON.parse(cartCookie) : []

            // Check if product already in cart
            const existingItemIndex = currentCart.findIndex(
                (item: any) => item.slug === product.slug
            )

            if (existingItemIndex >= 0) {
                // Update quantity if exists
                currentCart[existingItemIndex].quantity += quantity
            } else {
                // Add new item
                currentCart.push({
                    slug: product.slug,
                    quantity: quantity
                })
            }

            // Save to cookies
            Cookies.set(CART_COOKIE_KEY, JSON.stringify(currentCart), {
                expires: 7,
                path: '/',
                sameSite: 'strict'
            })

            setAdded(true)
            
            // Reset after 2 seconds
            setTimeout(() => {
                setAdded(false)
                setQuantity(1) // Reset quantity after adding
            }, 2000)

            // Dispatch custom event for cart update
            window.dispatchEvent(new CustomEvent('cart-updated'))

            console.log('Added to cart:', product.slug, 'Quantity:', quantity)

        } catch (error) {
            console.error('Error adding to cart:', error)
            alert('Failed to add item to cart')
        } finally {
            setIsAdding(false)
        }
    }

    const increaseQuantity = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setQuantity(prev => prev + 1)
    }

    const decreaseQuantity = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    return (
        <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-4 border-lime-950 flex flex-col h-full">
            {/* Make the image clickable */}
            <Link href={`/shop/product/${product.slug}`}>
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
                        <div className="h-full w-full bg-gradient-to-br from-lime-100 to-emerald-200 flex items-center justify-center">
                            <span className="text-gray-400 text-4xl font-bold">
                                {product.name.charAt(0)}
                            </span>
                        </div>
                    )}

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
                    href={`/shop/product/${product.slug}`}
                    className="hover:text-lime-700 transition-colors"
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
                    <div className="space-y-3">
                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    className="px-3 py-1 text-gray-600 hover:text-lime-700 disabled:text-gray-300 disabled:cursor-not-allowed"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-3 py-1 min-w-8 text-center font-medium">
                                    {quantity}
                                </span>
                                <button
                                    onClick={increaseQuantity}
                                    className="px-3 py-1 text-gray-600 hover:text-lime-700"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            
                            <div className="text-lime-600 font-bold text-lg">
                                {formattedPrice}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className={`w-full py-2 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 border-2 ${
                                isAdding
                                    ? 'bg-gray-400 cursor-not-allowed border-gray-500'
                                    : added
                                    ? 'bg-green-600 hover:bg-green-700 border-green-700 text-white'
                                    : 'bg-lime-600 hover:bg-lime-700 border-lime-700 text-white'
                            }`}
                            onClick={addToCart}
                            disabled={isAdding}
                        >
                            {isAdding ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Adding...</span>
                                </>
                            ) : added ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>Added {quantity} item{quantity !== 1 ? 's' : ''}!</span>
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>Add to Cart ({quantity})</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}