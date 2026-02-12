'use client';

import Link from 'next/link';
import { XCircle, ShoppingCart, Home } from 'lucide-react';

export default function CheckoutCancelPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <XCircle size={48} className="text-red-600" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Cancelled</h1>

                        <p className="text-gray-600 mb-6">
                            Your payment was cancelled. No charges have been made to your account.
                        </p>

                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
                            <ul className="text-sm text-gray-600 text-left space-y-2">
                                <li>• Check if your payment method is valid and has sufficient funds</li>
                                <li>• Ensure your billing information matches your payment method</li>
                                <li>• Try using a different payment method</li>
                                <li>• Contact your bank if you suspect any issues</li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/cart"
                                className="inline-flex items-center justify-center bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                <ShoppingCart size={20} className="mr-2" />
                                Back to Cart
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                <Home size={20} className="mr-2" />
                                Return Home
                            </Link>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Still having trouble?{' '}
                                <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                                    Contact our support team
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}