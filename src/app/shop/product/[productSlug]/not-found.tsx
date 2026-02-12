// app/shop/[categoryId]/[productId]/not-found.tsx
import Link from 'next/link'

export default function ProductNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lime-50 to-white">
            <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border-4 border-lime-950">
                <div className="text-6xl mb-6">❌</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                <p className="text-gray-600 mb-8">
                    The product you&apos;re looking for doesn&apos;t exist or has been removed.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/shop"
                        className="inline-block w-full md:w-auto px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors font-semibold"
                    >
                        Browse All Products
                    </Link>
                    <Link
                        href="/"
                        className="inline-block w-full md:w-auto px-6 py-3 border-2 border-lime-600 text-lime-700 rounded-lg hover:bg-lime-50 transition-colors"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}