import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
    Button,
    Hr,
} from "@react-email/components";
import * as React from "react";
import { Tailwind } from "@react-email/tailwind";

interface InvoiceEmailProps {
    customerName: string;
    invoiceNumber: string;
    invoiceDate: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
    companyName: string;
    companyLogo?: string;
}

export const InvoiceEmail = ({
    customerName = "John Doe",
    invoiceNumber = "INV-2023-001",
    invoiceDate = "2023-11-20",
    items = [
        { name: "Premium T-Shirt", quantity: 2, price: 29.99 },
        { name: "Wireless Headphones", quantity: 1, price: 89.99 },
        { name: "USB-C Cable", quantity: 3, price: 9.99 },
    ],
    subtotal = 159.95,
    tax = 19.19,
    total = 179.14,
    paymentMethod = "Credit Card",
    companyName = "ShopEasy",
    companyLogo = "/public/logo/logo_blau_header.svg",
}: InvoiceEmailProps) => {
    const formattedDate = new Date(invoiceDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Html>
            <Head />
            <Preview>Your invoice from {companyName} ({invoiceNumber})</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                brand: "#0070f3",
                                brandLight: "#e6f2ff",
                            },
                        },
                    },
                }}
            >
                <Body className="bg-gray-50 font-sans py-5">
                    <Container className="bg-white rounded-lg max-w-2xl mx-auto p-10 shadow-sm border border-gray-200">
                        {/* Header */}
                        <Section className="mb-8">
                            <Row>
                                <Column>
                                    <Img
                                        src={companyLogo}
                                        width="120"
                                        height="auto"
                                        alt={companyName}
                                        className="mb-5"
                                    />
                                </Column>
                                <Column className="text-right">
                                    <h1 className="text-3xl font-bold text-gray-800 m-0">INVOICE</h1>
                                    <p className="text-gray-600 mt-1 mb-0">#{invoiceNumber}</p>
                                </Column>
                            </Row>
                        </Section>

                        {/* Customer & Details */}
                        <Section className="mb-8">
                            <Row>
                                <Column className="w-1/2">
                                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                        BILL TO:
                                    </h2>
                                    <p className="text-gray-800 text-lg font-medium mb-4">
                                        {customerName}
                                    </p>
                                </Column>
                                <Column className="w-1/2">
                                    <Row className="mb-3">
                                        <Column>
                                            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                INVOICE DATE:
                                            </h2>
                                            <p className="text-gray-800">{formattedDate}</p>
                                        </Column>
                                    </Row>
                                    <Row>
                                        <Column>
                                            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                PAYMENT METHOD:
                                            </h2>
                                            <p className="text-gray-800">{paymentMethod}</p>
                                        </Column>
                                    </Row>
                                </Column>
                            </Row>
                        </Section>

                        {/* Items Table */}
                        <Section className="mb-8">
                            <Row className="bg-gray-50 px-4 py-3 rounded-t-lg">
                                <Column className="w-2/5">
                                    <p className="text-xs font-semibold text-gray-600 m-0">ITEM</p>
                                </Column>
                                <Column className="w-1/5 text-center">
                                    <p className="text-xs font-semibold text-gray-600 m-0">QTY</p>
                                </Column>
                                <Column className="w-1/5 text-right">
                                    <p className="text-xs font-semibold text-gray-600 m-0">PRICE</p>
                                </Column>
                                <Column className="w-1/5 text-right">
                                    <p className="text-xs font-semibold text-gray-600 m-0">AMOUNT</p>
                                </Column>
                            </Row>

                            <Hr className="border-gray-200 my-0" />

                            {items.map((item, index) => (
                                <Row key={index} className="px-4 py-3 border-b border-gray-100">
                                    <Column className="w-2/5">
                                        <p className="text-gray-800 m-0">{item.name}</p>
                                    </Column>
                                    <Column className="w-1/5 text-center">
                                        <p className="text-gray-800 m-0">{item.quantity}</p>
                                    </Column>
                                    <Column className="w-1/5 text-right">
                                        <p className="text-gray-800 m-0">${item.price.toFixed(2)}</p>
                                    </Column>
                                    <Column className="w-1/5 text-right">
                                        <p className="text-gray-800 font-medium m-0">
                                            ${(item.quantity * item.price).toFixed(2)}
                                        </p>
                                    </Column>
                                </Row>
                            ))}
                        </Section>

                        {/* Totals */}
                        <Section className="mb-10">
                            <Row>
                                <Column className="w-1/2 ml-auto">
                                    <Row className="mb-2">
                                        <Column>
                                            <p className="text-gray-600 text-right m-0">Subtotal:</p>
                                        </Column>
                                        <Column className="text-right pl-4">
                                            <p className="text-gray-800 font-medium m-0">
                                                ${subtotal.toFixed(2)}
                                            </p>
                                        </Column>
                                    </Row>
                                    <Row className="mb-2">
                                        <Column>
                                            <p className="text-gray-600 text-right m-0">Tax (12%):</p>
                                        </Column>
                                        <Column className="text-right pl-4">
                                            <p className="text-gray-800 font-medium m-0">
                                                ${tax.toFixed(2)}
                                            </p>
                                        </Column>
                                    </Row>
                                    <Hr className="border-gray-300 my-3" />
                                    <Row>
                                        <Column>
                                            <p className="text-gray-800 font-bold text-right text-lg m-0">
                                                Grand Total:
                                            </p>
                                        </Column>
                                        <Column className="text-right pl-4">
                                            <p className="text-brand font-bold text-2xl m-0">
                                                ${total.toFixed(2)}
                                            </p>
                                        </Column>
                                    </Row>
                                </Column>
                            </Row>
                        </Section>

                        {/* Footer */}
                        <Section className="pt-8 border-t border-gray-200 text-center">
                            <p className="text-gray-600 mb-4">
                                Thank you for shopping with {companyName}!<br />
                                If you have any questions, contact us at support@{companyName.toLowerCase()}.com
                            </p>
                            <p className="text-gray-400 text-sm mb-6">
                                This is an automated invoice. No need to reply.
                            </p>
                            <Button
                                href={`https://${companyName.toLowerCase()}.com/invoices/${invoiceNumber}`}
                                className="bg-brand text-white px-8 py-3 rounded-lg font-semibold no-underline inline-block"
                            >
                                View Online Invoice
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};