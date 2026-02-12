// components/auth/AuthLayout.tsx - UPDATED TO MATCH SITE DESIGN
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Shield, Truck, Gift } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    footerText: string;
    footerLinkText: string;
    footerLinkHref: string;
}

export default function AuthLayout({
    children,
    title,
    subtitle,
    footerText,
    footerLinkText,
    footerLinkHref,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-lime-50 to-amber-50">
            {/* Back to home */}
            <div className="container mx-auto px-4 py-6">
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-600 hover:text-lime-700 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Zurück zur Startseite
                </Link>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto">
                    {/* Logo/Brand - Angepasst an Shop Design */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-lime-600 to-emerald-600 rounded-full mb-6 shadow-lg">
                            <ShoppingBag size={36} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Casa<span className="text-lime-700">Smecca</span>
                        </h1>
                        <p className="text-gray-600">Italienische Delikatessen seit 1750</p>
                        <div className="w-24 h-1 bg-gradient-to-r from-lime-500 to-amber-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Auth Card - Angepasst an Design */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Decorative top border */}
                        <div className="h-2 bg-gradient-to-r from-lime-600 via-emerald-600 to-amber-600"></div>
                        
                        <div className="p-6 md:p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
                                <p className="text-gray-600">{subtitle}</p>
                            </div>

                            {children}

                            {/* Footer */}
                            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                <p className="text-gray-600">
                                    {footerText}{' '}
                                    <Link
                                        href={footerLinkHref}
                                        className="text-lime-600 hover:text-lime-700 font-semibold transition-colors"
                                    >
                                        {footerLinkText}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Features - Angepasst */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-lime-100">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-lime-100 rounded-full mb-3 mx-auto">
                                <Shield size={20} className="text-lime-700" />
                            </div>
                            <p className="text-sm font-medium text-gray-800">Sicher</p>
                            <p className="text-xs text-gray-500 mt-1">SSL Verschlüsselung</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-emerald-100">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-3 mx-auto">
                                <Truck size={20} className="text-emerald-700" />
                            </div>
                            <p className="text-sm font-medium text-gray-800">Schnelle Lieferung</p>
                            <p className="text-xs text-gray-500 mt-1">CH-weit</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-amber-100">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-3 mx-auto">
                                <Gift size={20} className="text-amber-700" />
                            </div>
                            <p className="text-sm font-medium text-gray-800">Exklusiv</p>
                            <p className="text-xs text-gray-500 mt-1">Italienische Spezialitäten</p>
                        </div>
                    </div>

                    {/* Trust Badge */}
                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-sm text-gray-600">250+ Jahre Tradition</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom decorative element */}
            <div className="mt-12 pb-8">
                <div className="text-center text-gray-500 text-sm">
                    <p>Casa Smecca &copy; {new Date().getFullYear()} - Alle Rechte vorbehalten</p>
                    <div className="flex justify-center space-x-4 mt-2 text-xs">
                        <Link href="/agb" className="text-gray-500 hover:text-lime-700">AGB</Link>
                        <Link href="/datenschutz" className="text-gray-500 hover:text-lime-700">Datenschutz</Link>
                        <Link href="/impressum" className="text-gray-500 hover:text-lime-700">Impressum</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}