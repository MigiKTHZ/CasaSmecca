// components/CategoryGrid.tsx
import prisma from '@/app/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

// Color gradients for categories
const colorGradients = [
    'from-lime-500 to-emerald-600',
    'from-lime-600 to-emerald-700',
    'from-emerald-500 to-lime-600',
    'from-emerald-600 to-lime-700',
]

export default async function CategoryGrid() {
    // Get all categories with product counts
    const categories = await prisma.productCategory.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        },
        orderBy: {
            categoryID: 'asc'
        }
    })

    // Shuffle categories and take 4
    const shuffled = [...categories].sort(() => 0.5 - Math.random())
    const featuredCategories = shuffled.slice(0, 4)

    return (
        <section className="py-12 md:py-16 bg-gradient-to-b from-lime-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Beliebte Kategorien</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Entdecken Sie unsere vielfältigen Produktkategorien
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {featuredCategories.map((category, index) => (
                        <Link
                            key={category.categoryID}
                            href={`/shop/${category.slug}`}
                            className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer border-4 border-lime-100 hover:border-lime-300 transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="h-64 w-full relative">
                                {category.image ? (
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-gradient-to-br from-lime-200 to-emerald-300 flex items-center justify-center">
                                        <span className="text-white text-4xl font-bold">
                                            {category.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className={`absolute inset-0 bg-gradient-to-t ${colorGradients[index % colorGradients.length]} opacity-80`}></div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                                <p className="text-sm opacity-90 mb-4">{category._count.products} Produkte</p>
                                <button className="text-white font-medium py-2 px-6 rounded-lg transition-colors bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30">
                                    Jetzt entdecken
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-10 md:mt-14">
                    <Link
                        href="/shop"
                        className="inline-flex items-center bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Alle Kategorien anzeigen
                    </Link>
                </div>
            </div>
        </section>
    )
}