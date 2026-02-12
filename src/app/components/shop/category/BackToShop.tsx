// components/shop/BackToShop.tsx
import Link from 'next/link'

export default function BackToShop() {
    return (
        <div className="bg-white border-t-4 border-lime-200 py-8">
            <div className="container mx-auto px-4 text-center">
                <Link
                    href="/shop"
                    className="inline-flex items-center text-lime-600 hover:text-lime-700 font-medium border-2 border-lime-600 hover:border-lime-700 px-6 py-3 rounded-lg transition-colors"
                >
                    ← Back to All Categories
                </Link>
            </div>
        </div>
    )
}