"use client"

import React from 'react';
import { CustomerOrder, ProductOrder, Product } from '@prisma/client';
import Link from 'next/link'

interface OrdersPageProps {
    customerOrders: (CustomerOrder & {
        productOrders: (ProductOrder & { product: Product })[];
    })[] | null;
}


export default function CartTable({ customerOrders }: OrdersPageProps) {

    return (
        <>

            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-3 text-left font-medium">
                                    <input className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" type="checkbox" />
                                </th>
                                <th className="px-6 py-3 text-left font-medium">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left font-medium">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left font-medium">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left font-medium">
                                    #
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {customerOrders?.map((customerOrder) => (
                                customerOrder.productOrders.map((productOrder: ProductOrder) => (
                                    <tr key={productOrder.productOrderID}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <input className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                {productOrder.product.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            {productOrder.count}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                {Number(productOrder.count) * Number(productOrder.product.price)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <Link href="#" className="text-red-900 underline" >Remove Product</Link>
                                        </td>
                                    </tr>
                                ))
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>



        </>
    );
}