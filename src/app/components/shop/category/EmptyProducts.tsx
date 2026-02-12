// components/shop/EmptyProducts.tsx
export default function EmptyProducts() {
    return (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg border-4 border-lime-950">
            <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Products Yet
                </h3>
                <p className="text-gray-600">Products will be added soon to this category.</p>
            </div>
        </div>
    )
}