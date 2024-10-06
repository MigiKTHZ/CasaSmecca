"use client"
import React from "react";
import { CustomerOrder, ProductOrder, Product } from '@prisma/client';

interface OrdersPageProps {
    customerOrders: (CustomerOrder & {
        productOrders: (ProductOrder & { product: Product })[];
    })[] | null;
}

export default function CartTotal({customerOrders} : OrdersPageProps) {

    const totalProductOrdersCount = customerOrders?.reduce((total, order) => {
        // Sum the count of each productOrder in the current CustomerOrder
        return total + order.productOrders.reduce((orderTotal, productOrder) => orderTotal + productOrder.count, 0);
    }, 0) || 0; // Default to 0 if customerOrders is null or empty

    return (
        <>
            <div className="bg-lime-900 p-4 rounded-lg">
                <h2 className="text-lime-100 text-xl">Bestellübersicht</h2>
                {/* sum of anzahl eingekaufte produkte (sum of productorderscount) */}
                <h3 className="text-gray-300">{totalProductOrdersCount} Artikel</h3>
                <div className="border-t-2 border-solid border-lime-100 rounded "></div>
                <br />
                <h3 className="text-lime-100">Total:</h3>
                <div className="border-t-2 border-solid border-lime-100 rounded "></div>
                <br />
                <button type="button" className="bg-lime-950 p-2 w-full text-lime-100 rounded-lg">Zur Kasse</button>
            </div>
        </>
    );
}