
import prisma from '@/app/lib/prisma';
import { CustomerOrder } from '@prisma/client';
import CartTable from '../components/cartTable';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import CartTotal from '../components/cartTotal';

export default async function Cart() {

    const session = await getServerSession(authOptions);

    const customerOrders: CustomerOrder[] | null = await prisma.customerOrder.findMany({
        where: {
            userID: Number(session?.user.userID),
        },
        include: {
            productOrders: {
                include: {
                    product: true, // Include related Product details
                },
            }, // Include related ProductOrder details
        },
    });



    console.log(customerOrders);

    return (
        <main className="flex min-h-screen flex-col items-center bg-lime-900 justify-between p-24">

            <div className="bg-lime-700 p-4 h-screen w-full rounded-lg">
                <div className="mb-4">
                    <h1 className="text-3xl font-bolder leading-tight text-gray-900 mx-auto sm:px-6 lg:px-8">Shopping Cart</h1>
                </div>
                <div className="flex">
                    <div className="max-w-7xl w-3/4 mx-auto sm:px-6 lg:px-8">
                        <div className="flex flex-col">
                            <CartTable customerOrders={customerOrders}></CartTable>
                        </div>
                    </div>
                    <div className="max-w-7xl w-1/4 mx-auto sm:px-6 lg:px-8">
                        <CartTotal customerOrders={customerOrders}></CartTotal>
                    </div>

                </div>
            </div>
        </main>
    );
}