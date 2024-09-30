"use client"

import React from 'react';
import { CustomerOrder } from '@prisma/client';

interface OrdersPageProps {
    customerOrders: CustomerOrder[] | null; // Expect customerOrders to be an array
}


export default function CartTable({ customerOrders }: OrdersPageProps) {

    return (
        <>

        </>
    );
}