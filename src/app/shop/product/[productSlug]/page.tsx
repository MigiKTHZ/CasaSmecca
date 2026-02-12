// app/shop/product/[productSlug]/page.tsx
import ProductContent from '../../../components/shop/product/ProductContent'

interface ProductPageProps {
    params: {
        productSlug: string
    }
}

export async function generateMetadata({ params }: ProductPageProps) {

    return {
        title: `Product | Casa Smecca`,
        description: `Product details`,
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    return <ProductContent params={params} />
}