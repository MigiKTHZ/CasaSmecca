// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, ShoppingBag, X, Home, LogOut, Store, User, Handshake, Mail, BookOpen, LogIn, ShieldUser } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import Cookies from 'js-cookie';
import Image from 'next/image';

interface NavLink {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [cartCount, setCartCount] = useState<number>(0);
    const pathname = usePathname();
    const { data: session } = useSession();

    const navLinks: NavLink[] = [
        {
            name: 'Home',
            href: '/',
            icon: <Home className="w-4 h-4 md:mr-2" />
        },
        {
            name: 'Shop',
            href: '/shop',
            icon: <Store className="w-4 h-4 md:mr-2" />
        },
        {
            name: 'Porträt',
            href: '/portrait',
            icon: <User className="w-4 h-4 md:mr-2" />
        },
        {
            name: 'Vertriebspartner',
            href: '/vertriebspartner',
            icon: <Handshake className="w-4 h-4 md:mr-2" />
        },
        {
            name: 'Geschichte',
            href: '/geschichte',
            icon: <BookOpen className="w-4 h-4 md:mr-2" />
        },
        {
            name: 'Kontakt',
            href: '/kontakt',
            icon: <Mail className="w-4 h-4 md:mr-2" />
        },
    ];

    // Update cart count when cart changes
    useEffect(() => {
        const updateCartCount = () => {
            try {
                const cartCookie = Cookies.get('shopping_cart');
                if (cartCookie) {
                    const cart = JSON.parse(cartCookie);
                    const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
                    setCartCount(count);
                } else {
                    setCartCount(0);
                }
            } catch (error) {
                console.error('Error reading cart cookie:', error);
                setCartCount(0);
            }
        };

        // Initial load
        updateCartCount();

        // Listen for cart updates
        window.addEventListener('cart-updated', updateCartCount);

        // Also check when the page gains focus (in case cart was updated in another tab)
        window.addEventListener('focus', updateCartCount);

        return () => {
            window.removeEventListener('cart-updated', updateCartCount);
            window.removeEventListener('focus', updateCartCount);
        };
    }, []);

    // Check if link is active
    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-lime-200">
            <div className="container mx-auto px-4">
                {/* Main header - Clean and professional */}
                <div className="py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo with SVG */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <div className="mr-3">
                                    {/* Using the SVG file */}
                                    <Image
                                        src="/logo/logo_blau_header.svg"
                                        alt="Casa Smecca Logo"
                                        width={160}
                                        height={48}
                                        className="h-12 w-auto"
                                        priority
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center px-5 py-2.5 rounded-lg transition-all duration-300 font-medium ${isActive(link.href)
                                        ? 'bg-gradient-to-r from-lime-600 to-emerald-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-lime-50 hover:text-lime-800'
                                        }`}
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Right side icons */}
                        <div className="flex items-center space-x-4">
                            {/* Cart */}
                            <div className="relative">
                                <Link
                                    href="/cart"
                                    className="p-2.5 rounded-lg hover:bg-lime-50 transition-all duration-300 flex items-center"
                                    aria-label="Shopping cart"
                                >
                                    <ShoppingBag size={22} className="text-lime-700" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartCount > 9 ? '9+' : cartCount}
                                        </span>
                                    )}
                                </Link>
                            </div>
                            {session && session.user.adminFlag ? (
                                <div className="relative">
                                    <Link
                                        href="/admin"
                                        className="p-2.5 rounded-lg hover:bg-lime-50 transition-all duration-300 flex items-center"
                                        aria-label="Shopping cart"
                                    >
                                        <ShieldUser size={22} className="text-lime-700" />
                                    </Link>
                                </div>
                            ) : null}

                            {/* Usericon */}
                            {session && session.user ? (
                                <div className="relative">
                                    <Link
                                        href="/user"
                                        className="p-2.5 rounded-lg hover:bg-lime-50 transition-all duration-300 flex items-center"
                                        aria-label="Shopping cart"
                                    >
                                        <User size={22} className="text-lime-700" />
                                    </Link>
                                </div>
                            ) : null}


                            {/* Sign In Button */}
                            {session && session.user ? (
                                <button
                                    onClick={() => signOut()}
                                    className="hidden md:flex items-center bg-gradient-to-r from-lime-600 to-emerald-600 text-white px-4 py-2.5 rounded-lg hover:from-lime-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </button>
                            ) : (
                                <Link
                                    href="/signin"
                                    className="hidden md:flex items-center bg-gradient-to-r from-lime-600 to-emerald-600 text-white px-4 py-2.5 rounded-lg hover:from-lime-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                                >
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Sign In
                                </Link>
                            )}

                            {/* Mobile menu button */}
                            <button
                                className="lg:hidden p-2.5 rounded-lg hover:bg-lime-50 transition-all duration-300"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <X size={24} className="text-lime-700" />
                                ) : (
                                    <Menu size={24} className="text-lime-700" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="lg:hidden mt-4 pb-4 border-t border-lime-200 pt-4">
                            <nav className="flex flex-col space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${isActive(link.href)
                                            ? 'bg-gradient-to-r from-lime-600 to-emerald-600 text-white font-medium'
                                            : 'text-gray-700 hover:bg-lime-50 hover:text-lime-800'
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.icon}
                                        <span className="ml-3">{link.name}</span>
                                    </Link>
                                ))}

                                {/* Mobile Cart Link */}
                                <Link
                                    href="/cart"
                                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-lime-50 hover:text-lime-800 transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="relative">
                                        <ShoppingBag size={20} className="text-lime-700 mr-3" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                                {cartCount > 9 ? '9+' : cartCount}
                                            </span>
                                        )}
                                    </div>
                                    <span>Cart ({cartCount} items)</span>
                                </Link>

                                {session && session.user ? (
                                    <div className="relative">
                                        <Link
                                            href="/user"
                                            className="p-2.5 rounded-lg hover:bg-lime-50 transition-all duration-300 flex items-center"
                                            aria-label="Shopping cart"
                                        >
                                            <User size={22} className="text-lime-700" />
                                        </Link>
                                    </div>
                                ) : null}

                                {/* Mobile Sign In button */}
                                {session && session.user ? (
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center justify-center bg-gradient-to-r from-lime-600 to-emerald-600 text-white px-4 py-3 rounded-lg hover:from-lime-700 hover:to-emerald-700 transition-all duration-300 font-medium mt-2"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Sign Out
                                    </button>
                                ) : (
                                    <Link
                                        href="/signin"
                                        className="flex items-center justify-center bg-gradient-to-r from-lime-600 to-emerald-600 text-white px-4 py-3 rounded-lg hover:from-lime-700 hover:to-emerald-700 transition-all duration-300 font-medium mt-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Sign In
                                    </Link>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}