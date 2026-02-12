// components/shop/HeroSection.tsx
interface HeroSectionProps {
    categoriesCount: number
    totalProducts: number
}

export default function HeroSection({ categoriesCount, totalProducts }: HeroSectionProps) {
    return (
        <div className="bg-gradient-to-r from-lime-600 to-emerald-600 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Explore Our <span className="text-lime-200">Italian</span> Collection
                    </h1>
                    <p className="text-xl md:text-2xl text-lime-100 mb-8">
                        Authentic Italian products, shipped directly from Italy.
                        Select a category to discover our premium selection.
                    </p>

                    {/* Dynamic Stats */}
                    <div className="mt-8 flex flex-wrap justify-center gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{categoriesCount}</div>
                            <div className="text-lime-200 text-sm">Categories</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{totalProducts}</div>
                            <div className="text-lime-200 text-sm">Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">🇮🇹</div>
                            <div className="text-lime-200 text-sm">Direct from Italy</div>
                        </div>
                    </div>
                    
                    <div className="w-32 h-1 bg-white/50 mx-auto rounded-full mt-8"></div>
                </div>
            </div>
        </div>
    )
}