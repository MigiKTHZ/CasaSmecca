import { Product, ProductCategory } from "@prisma/client";
import prisma from '@/app/lib/prisma';
import Card from "../../components/card";

export default async function CathegoryDetails({
    params,
}: {
    params: { categoryId: number };
}) {

    const ProductCategory: ProductCategory | null = await prisma.productCategory.findUnique({
        where: {
            CategoryID: Number(params.categoryId),
        },
    })

    let Products: Product[] = [];
    if (ProductCategory) {
        Products = await prisma.product.findMany({
            where: {
                CategoryID: {
                    equals: Number(params.categoryId),
                },
            },
        });
    }


    return (
        <div className='size-full rounded-lg bg-lime-700 max-w-screen-md text-black p-8 shadow-lg'>
            <div className="grid grid-cols-2 gap-4">
                {Products.map((product) => (
                    <div key={product.productID}>
                        <Card name={product.name} stock={product.stock} description={product.description} price={product.price} image={product.image} productID={product.productID} CategoryID={product.CategoryID} />
                    </div>
                ))}
                {/* {imageItemShop.map((item, index) => (
                <div key={index} className="">
                    <a href={item.href} className="flex items-center">
                        <Image src={item.image} className="size-full" alt="Flowbite Logo" width={240} height={320} />
                    </a>
                </div>
            ))} */}
            </div>
        </div>
    );
}