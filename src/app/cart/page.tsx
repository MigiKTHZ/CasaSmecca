import prisma from '@/app/lib/prisma';
import { CustomerOrder } from '@prisma/client';
import CartTable from '../components/cartTable';
import { useSession } from "next-auth/react";


export default async function Cart() {

    const { data: session } = useSession();

    const customerOrders: CustomerOrder[] | null = await prisma.customerOrder.findMany({
        where: {
            userID: Number(session?.user.userID),
        },
        include: {
            productOrder: { 
                include: {
                    product: true, // Include related Product details
                },
            }, // Include related ProductOrder details
        },
    });

    return (
        <main className="flex min-h-screen flex-col items-center bg-lime-900 justify-between p-24">
            <CartTable customerOrders={customerOrders}></CartTable>
        </main>
    );
}