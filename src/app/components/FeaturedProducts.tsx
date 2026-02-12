// components/FeaturedProducts.tsx
import prisma from '@/app/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export default async function FeaturedProducts() {
    // Get 8 random products from the database
    const allProducts = await prisma.product.findMany({
        take: 20, // Take a larger sample to ensure randomness
        include: {
            productCategory: true
        }
    })

    // Shuffle array and take 4 products
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
    const featuredProducts = shuffled.slice(0, 4)

    // Helper function to format price
    const formatPrice = (price: any) => {
        if (!price) return 'Preis auf Anfrage'

        const priceValue = typeof price === 'object' && 'toNumber' in price
            ? price.toNumber()
            : Number(price)

        return priceValue === 0 ? 'Preis auf Anfrage' : `CHF ${priceValue.toFixed(2)}`
    }

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Ausgewählte Produkte</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Entdecken Sie unsere handverlesene Auswahl an italienischen Spezialitäten
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {featuredProducts.map((product) => (
                        <div
                            key={product.productID}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-4 border-lime-100 hover:border-lime-300 group"
                        >
                            <Link href={`/shop/product/${product.slug}`}>
                                <div className="relative h-56 md:h-64 w-full overflow-hidden">
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <div className="h-full bg-gradient-to-br from-lime-100 to-emerald-200 flex items-center justify-center">
                                            <span className="text-gray-400 text-4xl font-bold">
                                                {product.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Category badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-lime-800 border-2 border-lime-200">
                                            {product.productCategory.name}
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            <div className="p-4 md:p-6">
                                <Link href={`/shop/product/${product.slug}`}>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 hover:text-lime-700 transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>

                                {/* Special info if available */}
                                {(product.weight || product.volume || product.packaging) && (
                                    <div className="mb-3 space-y-1">
                                        {product.weight && (
                                            <div className="text-sm text-gray-600">Gewicht: {product.weight}</div>
                                        )}
                                        {product.volume && (
                                            <div className="text-sm text-gray-600">Volumen: {product.volume}</div>
                                        )}
                                    </div>
                                )}

                                {/* Description */}
                                {product.description && (
                                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                                        {product.description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="text-lime-700 font-bold text-lg">
                                        {formatPrice(product.price)}
                                    </div>

                                    <Link
                                        href={`/shop/product/${product.slug}`}
                                        className="flex items-center bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-700 hover:to-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                                    >
                                        <ShoppingBag className="w-4 h-4 mr-2" />
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10 md:mt-14">
                    <Link
                        href="/shop"
                        className="inline-flex items-center bg-white hover:bg-lime-50 text-lime-700 font-semibold py-3 px-8 rounded-lg transition-colors border-2 border-lime-600 shadow-lg"
                    >
                        Alle Produkte anzeigen
                    </Link>
                </div>
            </div>
        </section>
    )
}