// components/shop/BreadcrumbNav.tsx
import Link from 'next/link'

interface BreadcrumbNavProps {
    categorySlug: string
    categoryName: string
    productName: string
}

export default function BreadcrumbNav({ categorySlug, categoryName, productName }: BreadcrumbNavProps) {
    return (
        <div className="bg-white border-b-4 border-lime-200 py-4">
            <div className="container mx-auto px-4">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="text-gray-700 hover:text-lime-700">
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <Link href="/shop" className="text-gray-700 hover:text-lime-700">
                                    Shop
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <Link
                                    href={`/shop/${categorySlug}`}
                                    className="text-gray-700 hover:text-lime-700"
                                >
                                    {categoryName}
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="text-gray-500 truncate max-w-xs">{productName}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}