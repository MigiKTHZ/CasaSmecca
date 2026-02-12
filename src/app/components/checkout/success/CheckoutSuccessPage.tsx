// app/checkout/success/page.tsx - UPDATED
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, FileText, CheckCircle, CreditCard } from 'lucide-react';
import Cookies from 'js-cookie';

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [orderType, setOrderType] = useState<'stripe' | 'invoice'>('stripe');
    const [orderId, setOrderId] = useState<string>('');

    useEffect(() => {
        const type = searchParams.get('type') as 'stripe' | 'invoice' | null;
        const sessionId = searchParams.get('session_id');
        const orderIdParam = searchParams.get('orderId');
        
        if (type) setOrderType(type);
        if (orderIdParam) setOrderId(orderIdParam);
        
        // ALWAYS clear cart when landing on success page
        console.log('Clearing cart cookie on success page');
        Cookies.remove('shopping_cart');
        
        // Dispatch cart cleared event for UI updates
        window.dispatchEvent(new CustomEvent('cart-cleared'));
        
        // Clear any age verification from localStorage
        localStorage.removeItem('ageVerified');
        localStorage.removeItem('ageVerificationMethod');
        localStorage.removeItem('dateOfBirth');
        
        console.log('Cart cleared and events dispatched');
        
    }, [searchParams, router]);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                        
                        {orderType === 'stripe' ? (
                            <>
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={48} className="text-green-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
                                <p className="text-gray-600 mb-6">
                                    Thank you for your purchase. We&apos;ve sent a confirmation to your email.
                                </p>
                                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                    <div className="flex items-center justify-center mb-2">
                                        <CreditCard size={20} className="text-blue-600 mr-2" />
                                        <p className="text-blue-800 font-medium">
                                            Payment processed securely through Stripe
                                        </p>
                                    </div>
                                    <p className="text-blue-700 text-sm">
                                        Your order is being processed and will be shipped soon.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText size={48} className="text-blue-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">Invoice Order Confirmed!</h1>
                                <p className="text-gray-600 mb-6">
                                    Your order has been created as an invoice. You will receive the invoice via email.
                                </p>
                                {orderId && (
                                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                        <p className="text-blue-800 font-medium text-lg">
                                            Invoice Number: INV-{orderId.padStart(6, '0')}
                                        </p>
                                        <div className="mt-3 text-blue-700 text-sm space-y-1">
                                            <p>✓ Order confirmed</p>
                                            <p>✓ Invoice will be sent via email</p>
                                            <p>✓ Payment terms: 30 days</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                <ShoppingBag size={20} className="mr-2" />
                                Continue Shopping
                            </Link>
                            <Link
                                href="/orders"
                                className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                View My Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}