// components/shop/ProductsGrid.tsx
import ProductCard from './ProductCard'
import { ProductCategory } from '@prisma/client'

interface ProductsGridProps {
    category: ProductCategory & {
        products: any[]
    }
}

export default function ProductsGrid({ category }: ProductsGridProps) {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    All Products ({category.products.length})
                </h2>
                <div className="text-sm text-gray-500">
                    Sorted by ID
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.products.map((product) => (
                    <ProductCard
                        key={product.productID}
                        product={{
                            ...product,
                            categoryID: category.categoryID
                        }}
                    />
                ))}
            </div>
        </>
    )
}