export type CartItem = {
    slug: string;
    quantity: number;
    product?: {
        id: number;
        name: string;
        price: number;
        image: string;
        requiresAgeVerification?: boolean;
    };
};

export type ShippingAddress = {
    email: string;
    name: string;
    firstname?: string;
    phone?: string;
    address: string;
    addressNr?: string;
    city: string;
    zipCode: string;
    country: string;
    shippingCost?: number;
};