// components/shop/RelatedProducts.tsx
import Image from 'next/image'
import Link from 'next/link'

interface RelatedProductsProps {
    relatedProducts: any[]
    categoryId: number
}

export default function RelatedProducts({ relatedProducts, categoryId }: RelatedProductsProps) {
    if (relatedProducts.length === 0) return null

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                    <div key={relatedProduct.productID} className="bg-white rounded-xl shadow-lg overflow-hidden border-4 border-lime-950">
                        <Link href={`/shop/product/${relatedProduct.slug}`}>
                            <div className="relative h-48 overflow-hidden">
                                {relatedProduct.image ? (
                                    <Image
                                        src={relatedProduct.image}
                                        alt={relatedProduct.name}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                ) : (
                                    <div className="h-full bg-lime-100 flex items-center justify-center">
                                        <span className="text-gray-400">{relatedProduct.name.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                                    {relatedProduct.name}
                                </h3>
                                <div className="text-lime-600 font-bold">
                                    {relatedProduct.price ? 'CHF ' + (typeof relatedProduct.price === 'object' && 'toNumber' in relatedProduct.price ?
                                        relatedProduct.price.toNumber().toFixed(2) :
                                        Number(relatedProduct.price).toFixed(2)) : 'Price on request'}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}