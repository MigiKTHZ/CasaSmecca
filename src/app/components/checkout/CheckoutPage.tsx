// components/checkout/CheckoutPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import { ArrowLeft, ShoppingBag, Check, CreditCard, Smartphone, FileText, Plus } from 'lucide-react';
import Link from 'next/link';
import AgeVerificationModal from '../../components/AgeVerificationModal';

type CartItem = {
    slug: string;
    quantity: number;
    product?: {
        id: number;
        name: string;
        price: number;
        image: string;
        requiresAgeVerification?: boolean;
    };
};

export default function CheckoutPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Age verification states
    const [showAgeVerification, setShowAgeVerification] = useState(false);
    const [ageVerified, setAgeVerified] = useState(false);
    const [ageVerificationMethod, setAgeVerificationMethod] = useState<string | null>(null);

    // Load cart items
    useEffect(() => {
        loadCart();

        // Check if age was previously verified
        const verified = localStorage.getItem('ageVerified');
        if (verified === 'true') {
            setAgeVerified(true);
            setAgeVerificationMethod(localStorage.getItem('ageVerificationMethod'));
        }
    }, []);

    const loadCart = async () => {
        try {
            const cartCookie = Cookies.get('shopping_cart');
            if (!cartCookie) {
                router.push('/cart');
                return;
            }

            const cookieItems: CartItem[] = JSON.parse(cartCookie);

            if (cookieItems.length === 0) {
                router.push('/cart');
                return;
            }

            // Fetch product details
            const slugs = cookieItems.map(item => item.slug);
            const response = await fetch(`/api/products?slugs=${slugs.join(',')}`);

            if (response.ok) {
                const products = await response.json();

                const itemsWithProducts = cookieItems.map(cookieItem => {
                    const product = products.find((p: any) => p.slug === cookieItem.slug);
                    return {
                        ...cookieItem,
                        product: product ? {
                            id: product.productID,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            requiresAgeVerification: product.requiresAgeVerification
                        } : undefined
                    };
                });

                setCartItems(itemsWithProducts);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => {
            if (item.product) {
                return sum + (item.product.price * item.quantity);
            }
            return sum;
        }, 0);
    };

    const checkForAlcohol = async (): Promise<boolean> => {
        try {
            const slugs = cartItems.map(item => item.slug);
            if (slugs.length === 0) return false;

            const response = await fetch(`/api/products/check-age?slugs=${slugs.join(',')}`);

            if (response.ok) {
                const { containsAlcohol } = await response.json();
                return containsAlcohol;
            }
            return false;
        } catch (error) {
            console.error('Error checking for alcohol:', error);
            return false;
        }
    };

    // Handle age verification
    const handleAgeVerification = (method: string, data?: any) => {
        setAgeVerified(true);
        setAgeVerificationMethod(method);
        setShowAgeVerification(false);

        // Store in localStorage for this session
        localStorage.setItem('ageVerified', 'true');
        localStorage.setItem('ageVerificationMethod', method);
        if (data?.dateOfBirth) {
            localStorage.setItem('dateOfBirth', data.dateOfBirth);
        }

        // Retry submission after verification
        handleStripeCheckout();
    };

    // Stripe checkout with multiple payment methods
    const handleStripeCheckout = async () => {
        setIsProcessing(true);

        try {
            // Check if cart contains alcohol
            const containsAlcohol = await checkForAlcohol();

            if (containsAlcohol && !ageVerified) {
                setShowAgeVerification(true);
                setIsProcessing(false);
                return;
            }

            // Calculate totals
            const subtotal = calculateSubtotal();
            const shippingCost = 9.99;
            const total = subtotal + shippingCost;

            // Prepare checkout data
            const checkoutData = {
                cartItems,
                customerEmail: session?.user?.email,
                customerName: session?.user?.name || '',
                total: total,
                subtotal: subtotal,
                shippingCost: shippingCost,
                ageVerified,
                ageVerificationMethod,
                userId: session?.user?.userID
            };

            // Call checkout API
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(checkoutData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.requiresAgeVerification) {
                    setShowAgeVerification(true);
                    setIsProcessing(false);
                    return;
                }
                throw new Error(data.error || 'Checkout failed');
            }

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('No URL returned from checkout API');
                alert('Checkout error. Please try again.');
                setIsProcessing(false);
            }

        } catch (error: any) {
            console.error('Checkout error:', error);
            alert(error.message || 'Failed to process payment. Please try again.');
            setIsProcessing(false);
        }
    };

    // Handle invoice order (separate flow)
    const handleInvoiceOrder = async () => {
        setIsProcessing(true);

        try {
            // Check if cart contains alcohol
            const containsAlcohol = await checkForAlcohol();

            if (containsAlcohol && !ageVerified) {
                setShowAgeVerification(true);
                setIsProcessing(false);
                return;
            }

            // Calculate totals
            const subtotal = calculateSubtotal();
            const shippingCost = 9.99;
            const total = subtotal + shippingCost;

            // Validate customer is logged in
            if (!session?.user) {
                alert('Please log in to place an invoice order');
                setIsProcessing(false);
                router.push('/auth/signin');
                return;
            }

            // Prepare invoice data with ALL required fields
            const invoiceData = {
                cartItems: cartItems.map(item => ({
                    slug: item.slug,
                    quantity: item.quantity
                })),
                customerDetails: {
                    email: session.user.email || '',
                    name: session.user.name || '',
                    phone: session.user.phoneNr || '',
                    address: session.user.address || '',
                    city: session.user.city || '',
                    zipCode: session.user.plz || '',
                    country: 'Switzerland'
                },
                subtotal: subtotal,
                shippingCost: shippingCost,
                total: total,
                userId: session.user.userID,
                ageVerified: ageVerified,
                ageVerificationMethod: ageVerificationMethod || 'none',
                cartContainsAlcohol: containsAlcohol
            };

            console.log('Sending invoice data:', invoiceData);

            // Create invoice order
            const response = await fetch('/api/checkout/invoice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(invoiceData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.requiresAgeVerification) {
                    setShowAgeVerification(true);
                    setIsProcessing(false);
                    return;
                }
                throw new Error(data.error || 'Invoice creation failed');
            }

            // Clear cart and show success
            Cookies.remove('shopping_cart');
            window.dispatchEvent(new CustomEvent('cart-updated'));

            // Clear age verification from localStorage
            localStorage.removeItem('ageVerified');
            localStorage.removeItem('ageVerificationMethod');
            localStorage.removeItem('dateOfBirth');

            // Redirect to success page
            router.push(data.redirectUrl || `/checkout/success?orderId=${data.orderId}&type=invoice`);

        } catch (error: any) {
            console.error('Invoice order error:', error);
            alert(error.message || 'Failed to create invoice order. Please try again.');
            setIsProcessing(false);
        }
    };

    const shippingCost = 9.99;
    const total = calculateSubtotal() + shippingCost;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading checkout...</p>
                </div>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check size={48} className="text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
                            <p className="text-gray-600 mb-6">
                                Thank you for your purchase. We&apos;ve sent a confirmation to your email.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <Link
                                href="/cart"
                                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-4"
                            >
                                <ArrowLeft size={20} className="mr-2" />
                                Back to Cart
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Checkout</h1>
                            <p className="text-gray-600 mt-2">
                                Complete your purchase - shipping details will be collected by Stripe
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column - Payment Information */}
                            <div className="lg:w-2/3">
                                <div className="space-y-8">
                                    {/* Payment Method */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Options</h2>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {/* Credit Card */}
                                                <div className="p-4 border border-gray-300 rounded-lg">
                                                    <div className="flex flex-col items-center text-center">
                                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                                            <CreditCard size={24} className="text-blue-600" />
                                                        </div>
                                                        <div className="font-medium text-gray-800 mb-1">Credit Card</div>
                                                        <div className="text-xs text-gray-500">Visa, Mastercard, Amex</div>
                                                    </div>
                                                </div>

                                                {/* TWINT */}
                                                <div className="p-4 border border-gray-300 rounded-lg">
                                                    <div className="flex flex-col items-center text-center">
                                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                                                            <Smartphone size={24} className="text-purple-600" />
                                                        </div>
                                                        <div className="font-medium text-gray-800 mb-1">TWINT</div>
                                                        <div className="text-xs text-gray-500">Mobile payment</div>
                                                    </div>
                                                </div>

                                                {/* Other Payment Methods */}
                                                <div className="p-4 border border-gray-300 rounded-lg">
                                                    <div className="flex flex-col items-center text-center">
                                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                                            <Plus size={24} className="text-green-600" />
                                                        </div>
                                                        <div className="font-medium text-gray-800 mb-1">More Options</div>
                                                        <div className="text-xs text-gray-500">Available in Stripe</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Payment Description */}
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <p className="text-blue-800 text-sm">
                                                    You will be redirected to Stripe to choose your preferred payment method.
                                                    Stripe offers multiple payment options including Credit Cards, TWINT, SOFORT, Giropay, and more.
                                                    Shipping information will be collected during checkout.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Note about Stripe */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                        <h3 className="font-semibold text-blue-800 mb-2">About Stripe Checkout</h3>
                                        <p className="text-blue-700 text-sm">
                                            All payments are processed securely through Stripe. You&apos;ll be redirected to
                                            Stripe&apos;s secure checkout page where you can:
                                        </p>
                                        <ul className="text-blue-700 text-sm mt-2 list-disc list-inside">
                                            <li>Choose your preferred payment method</li>
                                            <li>Enter shipping information</li>
                                            <li>Complete the payment securely</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="lg:w-1/3">
                                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                                    {/* Order Items */}
                                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                                        {cartItems.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between py-2">
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-gray-800 truncate">
                                                        {item.product?.name || `Product ${item.slug}`}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Quantity: {item.quantity}
                                                    </div>
                                                </div>
                                                <div className="font-medium whitespace-nowrap ml-4">
                                                    CHF {(item.product ? item.product.price * item.quantity : 0).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="space-y-3 border-t border-gray-200 pt-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium">CHF {calculateSubtotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-medium">CHF {shippingCost.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3">
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Total</span>
                                                <span>CHF {total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Age Verification Info */}
                                    {cartItems.some(item => item.product?.requiresAgeVerification) && (
                                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
                                                    <span className="text-yellow-600 text-xs">18+</span>
                                                </div>
                                                <span className="text-yellow-800 text-sm font-medium">
                                                    Age verification required
                                                </span>
                                            </div>
                                            <p className="text-yellow-700 text-xs mt-2">
                                                This order contains age-restricted products. You&apos;ll need to verify your age.
                                            </p>
                                        </div>
                                    )}

                                    {/* Payment Buttons */}
                                    <div className="space-y-4">
                                        <button
                                            type="button"
                                            onClick={handleStripeCheckout}
                                            disabled={isProcessing}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                    Processing...
                                                </>
                                            ) : (
                                                `Pay Securely with Stripe - CHF ${total.toFixed(2)}`
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleInvoiceOrder}
                                            disabled={isProcessing}
                                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <FileText size={20} className="mr-2" />
                                            Order with Invoice (30 days)
                                        </button>
                                    </div>

                                    <p className="mt-4 text-center text-xs text-gray-600">
                                        By proceeding, you agree to our Terms of Service and Privacy Policy.
                                        You&apos;ll be redirected to Stripe for secure payment processing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AgeVerificationModal
                isOpen={showAgeVerification}
                onClose={() => {
                    setShowAgeVerification(false);
                    setIsProcessing(false);
                }}
                onVerify={handleAgeVerification}
                minimumAge={18}
            />
        </>
    );
}