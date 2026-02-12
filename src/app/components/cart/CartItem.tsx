// components/cart/CartItem.tsx
'use client';

import { Trash2, Plus, Minus, AlertCircle } from 'lucide-react';

interface CartItemProps {
    item: {
        id: number;
        name: string;
        price: number;
        originalPrice?: number;
        image: string;
        quantity: number;
        size?: string;
        color?: string;
        inStock: boolean;
    };
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            {/* Product Image */}
            <div className="sm:w-24 h-24 flex-shrink-0">
                <div
                    className="w-full h-full bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url(${item.image})` }}
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow">
                <div className="flex justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                            {item.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center mt-1">
                            <span className="font-bold text-lg text-gray-800">${item.price.toFixed(2)}</span>
                            {item.originalPrice && item.originalPrice > item.price && (
                                <span className="text-gray-500 line-through text-sm ml-2">
                                    ${item.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Variants */}
                        <div className="flex flex-wrap gap-3 mt-2">
                            {item.size && (
                                <div className="text-sm text-gray-600">
                                    Size: <span className="font-medium">{item.size}</span>
                                </div>
                            )}
                            {item.color && (
                                <div className="text-sm text-gray-600">
                                    Color: <span className="font-medium">{item.color}</span>
                                </div>
                            )}
                        </div>

                        {/* Stock Status */}
                        {!item.inStock && (
                            <div className="flex items-center text-amber-600 text-sm mt-2">
                                <AlertCircle size={16} className="mr-1" />
                                Out of stock
                            </div>
                        )}
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors self-start"
                        aria-label="Remove item"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={18} />
                        </button>
                        <span className="px-4 py-1 text-gray-800 font-medium min-w-12 text-center">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={!item.inStock}
                            className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    {/* Item Total */}
                    <div className="font-bold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}