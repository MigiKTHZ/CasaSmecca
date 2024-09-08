import { ProductCategory } from "@prisma/client";
import ProductSidenav from "../components/productSidenav";
import prisma from '@/app/lib/prisma';

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const productCategory : ProductCategory[] = await prisma.productCategory.findMany();

    return (
        <>         
            <main className="flex min-h-screen flex-col items-center bg-lime-900 justify-between p-16">
                <div className="flex flex-row gap-4">
                    <ProductSidenav categories={productCategory} />
                    {children}
                </div>
            </main>    
        </>
    )
}