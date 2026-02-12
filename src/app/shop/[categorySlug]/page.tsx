// app/shop/[categorySlug]/page.tsx
import CategoryContent from '../../components/shop/category/CategoryContent'

interface CategoryPageProps {
    params: {
        categorySlug: string
    }
}

export async function generateMetadata({ params }: CategoryPageProps) {
    return {
        title: `Category | Casa Smecca`,
        description: `Browse products in this category`,
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    return <CategoryContent params={params} />
}