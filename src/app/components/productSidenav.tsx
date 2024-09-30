"use client"
import { Sidebar } from "flowbite-react";
import { ProductCategory } from "@prisma/client";

interface ProductSidenavProps {
    categories: ProductCategory[];
}

export default function ProductSidenav({categories} : ProductSidenavProps) {

    return (

        <Sidebar className="bg-lime-100 rounded" aria-label="Default sidebar example">
            <Sidebar.Items className="bg-lime-100">
                <Sidebar.ItemGroup className="bg-lime-100">
                    {categories.map((category) => (
                        <Sidebar.Item key={category.CategoryID} href={"/shop/" + category.CategoryID}>
                            {category.name}
                        </Sidebar.Item>
                    ))}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>


    );
}