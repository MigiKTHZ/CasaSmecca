import React from "react";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import Image from "next/image";
import prisma from '@/app/lib/prisma';
import { Product } from "@prisma/client";

export default async function ProductDetails({
    params,
}: {
    params: { productId : number };
}) {

    const product: Product | null = await prisma.product.findUnique({
        where: {
            productID: Number(params.productId),
        },
    });

    return (
        <>
            <div className="px-3 max-w-7xl m-auto">
                <div>
                    <div className="grid gird-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 h-max ">
                        {/* Product Image */}
                        <div className="overflow-hidden rounded-xl">
                            <Image
                                src={"" + product?.image}
                                alt="productDetail"
                                width={400}
                                height={139}
                            />
                        </div>
                        {/* Product Details */}
                        <div className="flex flex-col justify-between">
                            <div>
                                {/* Product Title */}
                                <h1 className="text-3xl text-lime-950 font-semibold sm:text-4xl">
                                    {product?.name} 
                                </h1>
                                {/* Product Description */}
                                <p className="mt-3 text-lime-700 text-md leading-6 text-justify sm:text-left sm:mt-4">
                                    {product?.description}
                                </p>
                                <span className="text-x text-lime-950 font-semibold sm:text-2xl">
                                    {product?.price + " CHF"}
                                </span>
                            </div>
                            {/* Quantity Input and Order Button */}
                            <div className=" ">
                                <div className="text-left flex flex-col gap-2 w-full">
                                    {/* Quantity Label */}
                                    <label className="font-semibold">Quantity</label>
                                    {/* Quantity Input */}
                                    <input
                                        className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-lime-100"
                                        type="number"
                                        defaultValue="1"
                                        required
                                    />
                                </div>
                                {/* Order Button */}
                                <div className="w-full text-left my-4">
                                    <button
                                        className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-lime-950 text-white text-md font-bold border border-lime-950 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-lime-950 lg:m-0 md:px-6"
                                        title="Confirm Order"
                                    >
                                        <span>In den Warenkorb</span>
                                        <HiOutlineArrowCircleRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
