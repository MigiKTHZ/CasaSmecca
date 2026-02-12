// components/shop/BackToCategory.tsx
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface BackToCategoryProps {
    categorySlug: string
    categoryName: string
}

export default function BackToCategory({ categorySlug, categoryName }: BackToCategoryProps) {
    return (
        <Link
            href={`/shop/${categorySlug}`}
            className="inline-flex items-center text-lime-600 hover:text-lime-700 mb-8"
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {categoryName}
        </Link>
    )
}