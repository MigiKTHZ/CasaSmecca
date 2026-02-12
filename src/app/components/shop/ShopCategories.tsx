// components/shop/ShopCategories.tsx
'use client'

import { ProductCategory } from '@prisma/client'
import CategoryCard from './CategoryCard'

interface ShopCategoriesProps {
    categories: (ProductCategory & {
        _count: {
            products: number
        }
    })[]
}

export default function ShopCategories({ categories }: ShopCategoriesProps) {
    if (categories.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg border-4 border-lime-950">
                <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Yet</h3>
                    <p className="text-gray-600">Check back soon for our product categories!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
                <CategoryCard 
                    key={category.categoryID} 
                    category={category}
                />
            ))}
        </div>
    )
}