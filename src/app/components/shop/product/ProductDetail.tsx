// components/shop/ProductDetail.tsx
'use client'

import Image from 'next/image'
import { ShoppingCart, Plus, Minus, Heart, Share2, Check } from 'lucide-react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import RelatedProducts from './RelatedProducts'

interface ProductDetailProps {
    product: any
    relatedProducts: any[]
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
    const [quantity, setQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)
    const [added, setAdded] = useState(false)

    const CART_COOKIE_KEY = 'shopping_cart'

    // Convert price to number
    const priceValue = product.price ?
        (typeof product.price === 'object' && 'toNumber' in product.price ?
            product.price.toNumber() :
            Number(product.price))
        : 0

    const formattedPrice = priceValue === 0
        ? 'Price on request'
        : `CHF ${priceValue.toFixed(2)}`

    const addToCart = () => {
        if (quantity < 1 || product.stock === 0) return
        
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
                // Add new item (only slug and quantity)
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

            // Dispatch event to update header count
            window.dispatchEvent(new CustomEvent('cart-updated'))

            console.log('Added to cart:', product.slug, 'Quantity:', quantity)
            console.log('Cart data:', currentCart)

        } catch (error) {
            console.error('Error adding to cart:', error)
            alert('Failed to add item to cart')
        } finally {
            setIsAdding(false)
        }
    }

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(prev => prev + 1)
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    return (
        <>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-lime-950">
                <div className="h-2 bg-gradient-to-r from-lime-500 to-emerald-500"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Product Image - Single Image Only */}
                    <div>
                        {/* Main Image */}
                        <div className="relative h-96 w-full rounded-xl overflow-hidden border-4 border-lime-200">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div className="h-full w-full bg-gradient-to-br from-lime-100 to-emerald-200 flex items-center justify-center">
                                    <span className="text-gray-400 text-6xl font-bold">
                                        {product.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Removed image gallery placeholder */}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category Badge */}
                        <div className="inline-block">
                            <span className="px-4 py-1.5 bg-lime-100 text-lime-800 rounded-full text-sm font-medium border-2 border-lime-300">
                                {product.productCategory.name}
                            </span>
                        </div>

                        {/* Product Name */}
                        <h1 className="text-4xl font-bold text-gray-900">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="text-4xl font-bold text-lime-600">
                            {formattedPrice}
                        </div>

                        {/* Special Information */}
                        {(product.weight || product.volume || product.packaging) && (
                            <div className="space-y-2 bg-lime-50 p-4 rounded-lg border-2 border-lime-200">
                                {product.weight && (
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 mr-2">Weight:</span>
                                        <span className="text-gray-600">{product.weight}</span>
                                    </div>
                                )}
                                {product.volume && (
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 mr-2">Volume:</span>
                                        <span className="text-gray-600">{product.volume}</span>
                                    </div>
                                )}
                                {product.packaging && (
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 mr-2">Packaging:</span>
                                        <span className="text-gray-600">{product.packaging}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Description */}
                        {product.description && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                <p className="text-gray-600 whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Stock Information */}
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-gray-600">
                                {product.stock > 0 ? `In stock (${product.stock} available)` : 'Out of stock'}
                            </span>
                        </div>

                        {/* Add to Cart Section */}
                        <div className="pt-6 border-t-2 border-lime-200">
                            <div className="space-y-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border-2 border-lime-300 rounded-lg">
                                        <button
                                            className="px-4 py-3 text-gray-600 hover:text-lime-600 hover:bg-lime-50 rounded-l-lg disabled:text-gray-300 disabled:hover:bg-transparent"
                                            onClick={decreaseQuantity}
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-6 py-3 text-lg font-medium min-w-12 text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            className="px-4 py-3 text-gray-600 hover:text-lime-600 hover:bg-lime-50 rounded-r-lg disabled:text-gray-300 disabled:hover:bg-transparent"
                                            onClick={increaseQuantity}
                                            disabled={quantity >= product.stock}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Total Price for Quantity */}
                                    <div className="text-xl font-bold text-lime-700">
                                        Total: CHF {(priceValue * quantity).toFixed(2)}
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    className={`w-full px-8 py-4 text-white rounded-lg transition-all duration-300 font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl border-2 ${
                                        isAdding
                                            ? 'bg-gray-500 cursor-not-allowed border-gray-600'
                                            : added
                                            ? 'bg-green-600 hover:bg-green-700 border-green-700'
                                            : product.stock === 0
                                            ? 'bg-gray-400 cursor-not-allowed border-gray-500'
                                            : 'bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-700 hover:to-emerald-700 border-lime-700'
                                    }`}
                                    onClick={addToCart}
                                    disabled={isAdding || product.stock === 0}
                                >
                                    {isAdding ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Adding...</span>
                                        </>
                                    ) : added ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            <span>Added {quantity} item{quantity !== 1 ? 's' : ''}!</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-5 h-5" />
                                            <span>{product.stock === 0 ? 'Out of Stock' : `Add ${quantity} to Cart`}</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Additional Actions */}
                            <div className="flex flex-wrap gap-3 mt-4">
                                <button className="px-4 py-2 border-2 border-lime-300 text-gray-700 rounded-lg hover:bg-lime-50 transition-colors flex items-center gap-2">
                                    <Heart className="w-4 h-4" />
                                    Add to Wishlist
                                </button>
                                <button className="px-4 py-2 border-2 border-lime-300 text-gray-700 rounded-lg hover:bg-lime-50 transition-colors flex items-center gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Share Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products - Now properly included */}
            <RelatedProducts
                relatedProducts={relatedProducts}
                categoryId={product.categoryID}
            />
        </>
    )
}