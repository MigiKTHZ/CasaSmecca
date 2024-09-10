import Image from "next/image";
import prisma from '@/app/lib/prisma';
import { ProductCategory } from "@prisma/client";

export default async function Shop() {

    const productCategories : ProductCategory[] = await prisma.productCategory.findMany();

    return (
        // <main className="flex min-h-screen flex-col items1-center bg-lime-900 justify-between p-24">
            <div className='border-4 border-lime-950 size-full rounded-lg bg-lime-100 max-w-screen-md text-black p-8'>
                <div className="grid grid-cols-2 gap-4">
                    {productCategories.map((category) => (
                        <div key={category.CategoryID} className="">
                            <a href={"/shop/" + category.CategoryID} className="flex items-center">
                                <Image src={category.image} className="size-full" alt="Flowbite Logo" width={240} height={320} />
                            </a>    
                        </div>
                    ))}
                </div>
            </div>
        // </main>
    );
}