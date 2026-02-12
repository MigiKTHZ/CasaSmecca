// components/cart/CartSummary.tsx - SIMPLE REDIRECT VERSION
'use client';

import { User } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

interface CartSummaryProps {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
}

export default function CartSummary({
    subtotal,
    shipping,
    total
}: CartSummaryProps) {
    const { data: session } = useSession();
    const router = useRouter();

    const handleCheckout = () => {
        // Always redirect to checkout page
        router.push('/checkout');
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

            {/* User Info */}
            {session && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <User size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">{session.user.name}</p>
                            <p className="text-sm text-gray-600">{session.user.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Signed in • <span className="text-green-600">✓</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!session && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                        Shopping as guest. 
                        <button 
                            onClick={() => router.push('/signin')}
                            className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Sign in
                        </button> for faster checkout.
                    </p>
                </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">CHF {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">CHF {shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>CHF {total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Checkout Button */}
            <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-700 hover:to-emerald-700 text-white font-semibold py-4 px-4 rounded-lg transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
            >
                Proceed to Checkout - CHF {total.toFixed(2)}
            </button>

            {/* Guest message */}
            {!session && (
                <p className="mt-4 text-center text-sm text-gray-600">
                    No account needed • Secure checkout
                </p>
            )}

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="text-xs text-gray-500">
                    <div className="font-semibold">✓ Secure</div>
                    <div>Payment</div>
                </div>
                <div className="text-xs text-gray-500">
                    <div className="font-semibold">✓ SSL</div>
                    <div>Encrypted</div>
                </div>
                <div className="text-xs text-gray-500">
                    <div className="font-semibold">✓ Fast</div>
                    <div>Checkout</div>
                </div>
            </div>
        </div>
    );
}