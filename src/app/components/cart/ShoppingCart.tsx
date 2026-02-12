// components/cart/ShoppingCart.tsx - CLEANED UP VERSION
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ShoppingBag, ArrowLeft, Shield, Truck } from 'lucide-react';
import Cookies from 'js-cookie';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

// Type for what's stored in cookies
type CookieCartItem = {
    slug: string;
    quantity: number;
};

// Type for cart items with full product data
type CartProduct = {
    id: number;
    slug: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    quantity: number;
    size?: string;
    color?: string;
    inStock: boolean;
};

const CART_COOKIE_KEY = 'shopping_cart';

export default function ShoppingCart() {
    const { data: session } = useSession();
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load cart from cookies and fetch products
    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            // 1. Get cart data from cookies
            const cartCookie = Cookies.get(CART_COOKIE_KEY);
            if (!cartCookie) {
                setIsLoading(false);
                return;
            }

            const cookieItems: CookieCartItem[] = JSON.parse(cartCookie);

            if (cookieItems.length === 0) {
                setIsLoading(false);
                return;
            }

            // 2. Fetch all products for these slugs at once
            const slugs = cookieItems.map(item => item.slug);
            const response = await fetch(`/api/products?slugs=${slugs.join(',')}`);

            if (!response.ok) throw new Error('Failed to fetch products');

            const products = await response.json();

            // 3. Merge product data with quantities from cookies
            const mergedItems: CartProduct[] = products.map((product: any) => {
                const cookieItem = cookieItems.find(item => item.slug === product.slug);
                if (!cookieItem) return null;

                return {
                    id: product.productID,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: cookieItem.quantity,
                    inStock: product.stock > 0,
                };
            }).filter(Boolean) as CartProduct[];

            setCartItems(mergedItems);

        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to update cart and dispatch event
    const updateCartAndDispatch = (updatedItems: CartProduct[]) => {
        // Update local state
        setCartItems(updatedItems);

        // Update cookies
        const cookieData: CookieCartItem[] = updatedItems.map(item => ({
            slug: item.slug,
            quantity: item.quantity
        }));

        if (cookieData.length === 0) {
            Cookies.remove(CART_COOKIE_KEY);
        } else {
            Cookies.set(CART_COOKIE_KEY, JSON.stringify(cookieData), {
                expires: 7,
                path: '/',
                sameSite: 'strict'
            });
        }

        // Dispatch event to update header count
        window.dispatchEvent(new CustomEvent('cart-updated'));
    };

    const updateQuantity = (slug: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        const updatedItems = cartItems.map(item =>
            item.slug === slug ? { ...item, quantity: newQuantity } : item
        );

        updateCartAndDispatch(updatedItems);
    };

    const removeItem = (slug: string) => {
        const updatedItems = cartItems.filter(item => item.slug !== slug);
        updateCartAndDispatch(updatedItems);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + 9.99; // Just shipping, no discounts
    };

    const clearCart = () => {
        Cookies.remove(CART_COOKIE_KEY);
        setCartItems([]);
        // Dispatch event to update header count
        window.dispatchEvent(new CustomEvent('cart-updated'));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading cart...</p>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Continue Shopping
                        </Link>

                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag size={48} className="text-blue-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                Looks like you haven&apos;t added any items to your cart yet.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                <ShoppingBag size={20} className="mr-2" />
                                Start Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-4"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Continue Shopping
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Shopping Cart</h1>
                        <p className="text-gray-600 mt-2">
                            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                        </p>
                        <div className="mt-2">
                            <button
                                onClick={clearCart}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                Clear cart
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column - Cart Items */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                {/* Cart Items List */}
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <CartItem
                                            key={item.slug}
                                            item={item}
                                            onUpdateQuantity={(id, quantity) => updateQuantity(item.slug, quantity)}
                                            onRemove={() => removeItem(item.slug)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-white rounded-xl p-4 flex items-center shadow-sm">
                                    <Shield className="text-green-600 mr-3" size={24} />
                                    <div>
                                        <div className="font-semibold text-gray-800">Secure Payment</div>
                                        <div className="text-sm text-gray-600">256-bit SSL encryption</div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 flex items-center shadow-sm">
                                    <Truck className="text-blue-600 mr-3" size={24} />
                                    <div>
                                        <div className="font-semibold text-gray-800">Free Shipping</div>
                                        <div className="text-sm text-gray-600">On orders over $100</div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 flex items-center shadow-sm">
                                    <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <div>
                                        <div className="font-semibold text-gray-800">Easy Returns</div>
                                        <div className="text-sm text-gray-600">30-day return policy</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:w-1/3">
                            <CartSummary
                                subtotal={calculateSubtotal()}
                                discount={0}
                                shipping={9.99}
                                total={calculateTotal()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}