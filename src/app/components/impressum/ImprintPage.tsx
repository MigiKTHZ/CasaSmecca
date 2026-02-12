// components/impressum/ImprintPage.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Mail, Phone, MapPin, User, Building, Globe, FileText } from 'lucide-react';

export default function ImprintPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gradient-to-b from-lime-50 to-amber-50 py-8 md:py-12">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb Navigation */}
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Zurück zum Shop
                        </Link>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-4xl mx-auto">
                        {/* Main Title */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-100 rounded-full mb-4">
                                <Building className="text-lime-700" size={32} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-lime-900 mb-3">
                                Impressum
                            </h1>
                            <p className="text-lg text-lime-700">
                                Rechtliche Informationen zu Casa Smecca
                            </p>
                        </div>

                        {/* Content Card */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
                            {/* Decorative Border */}
                            <div className="h-2 bg-gradient-to-r from-lime-600 via-emerald-600 to-amber-600"></div>

                            <div className="p-6 md:p-8 lg:p-12">
                                {/* Quote Banner */}
                                <div className="bg-gradient-to-r from-lime-50 to-emerald-50 border-l-4 border-lime-600 p-6 rounded-r-lg mb-8">
                                    <div className="flex items-start">
                                        <Home className="text-lime-700 mt-1 mr-4 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-lg font-semibold text-lime-900 italic">
                                                &quot;Tradition mit italienischem Flair seit 2000&quot;
                                            </p>
                                            <p className="text-lime-700 mt-1">- Willkommen bei Casa Smecca</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Impressum Content */}
                                <div className="prose prose-lg max-w-none">
                                    <div className="text-gray-700 space-y-8">

                                        {/* Company Info Card */}
                                        <section className="border-b border-lime-100 pb-8">
                                            <div className="flex items-start mb-6">
                                                <div className="bg-lime-100 p-2 rounded-lg mr-4">
                                                    <Building className="text-lime-700" size={20} />
                                                </div>
                                                <h2 className="text-2xl font-bold text-lime-900">Unternehmensinformationen</h2>
                                            </div>

                                            <div className="ml-12">
                                                <div className="bg-gradient-to-r from-lime-50 to-emerald-50 rounded-2xl p-6 md:p-8 shadow-lg">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                                                        {/* Left Column */}
                                                        <div className="space-y-6">
                                                            {/* Business Name */}
                                                            <div className="flex items-start">
                                                                <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                                                                    <Home className="text-lime-600" size={20} />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide mb-1">
                                                                        Geschäftsbezeichnung
                                                                    </h3>
                                                                    <p className="text-xl font-bold text-lime-900">Casa Smecca</p>
                                                                </div>
                                                            </div>

                                                            {/* Owner */}
                                                            <div className="flex items-start">
                                                                <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                                                                    <User className="text-lime-600" size={20} />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide mb-1">
                                                                        Inhaber
                                                                    </h3>
                                                                    <p className="text-xl font-bold text-lime-900">Salvo Smecca</p>
                                                                </div>
                                                            </div>

                                                            {/* Legal Form */}
                                                            <div className="flex items-start">
                                                                <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                                                                    <FileText className="text-lime-600" size={20} />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide mb-1">
                                                                        Rechtsform
                                                                    </h3>
                                                                    <p className="text-xl font-bold text-lime-900">Einzelunternehmen</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Right Column */}
                                                        <div className="space-y-6">
                                                            {/* Address */}
                                                            <div className="flex items-start">
                                                                <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                                                                    <MapPin className="text-lime-600" size={20} />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide mb-1">
                                                                        Adresse / Standort
                                                                    </h3>
                                                                    <p className="text-xl font-bold text-lime-900">Büchelistrasse 9</p>
                                                                    <p className="text-lg text-gray-700">4410 Liestal</p>
                                                                    <p className="text-gray-600">Schweiz</p>
                                                                </div>
                                                            </div>

                                                            {/* Contact */}
                                                            <div className="space-y-4">
                                                                {/* Phone */}
                                                                <div className="flex items-center">
                                                                    <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                                                                        <Phone className="text-lime-600" size={20} />
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide mb-1">
                                                                            Telefon
                                                                        </h3>
                                                                        <a
                                                                            href="tel:+41786378410"
                                                                            className="text-xl font-bold text-lime-900 hover:text-lime-700 transition-colors"
                                                                        >
                                                                            078 637 84 10
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                                {/* Email */}
                                                                <div className="flex items-center">
                                                                    <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                                                                        <Mail className="text-lime-600" size={20} />
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide mb-1">
                                                                            E-Mail
                                                                        </h3>
                                                                        <a
                                                                            href="mailto:s.smecca@bluewin.ch"
                                                                            className="text-xl font-bold text-lime-900 hover:text-lime-700 transition-colors break-words"
                                                                        >
                                                                            s.smecca@bluewin.ch
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Signature */}
                                        <div className="mt-12 pt-8 border-t border-lime-200">
                                            <div className="text-center">
                                                <div className="inline-flex items-center justify-center w-12 h-12 bg-lime-100 rounded-full mb-4">
                                                    <Building className="text-lime-700" size={24} />
                                                </div>
                                                <p className="text-2xl font-bold text-lime-900 mb-2">Salvo Smecca</p>
                                                <p className="text-lime-700">Gründer & Inhaber</p>
                                                <p className="text-gray-600 text-sm mt-2">Casa Smecca - Import von italienischen Delikatessen seit 2000</p>
                                                <p className="text-gray-500 text-xs mt-4">
                                                    Stand: {new Date().getFullYear()} | Impressum gemäß schweizerischem Recht
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-8 text-center">
                            <Link
                                href="/kontakt"
                                className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors mr-4"
                            >
                                Kontaktformular öffnen
                            </Link>
                            <Link
                                href="/shop"
                                className="inline-flex items-center bg-white hover:bg-gray-50 text-lime-700 font-semibold py-3 px-8 rounded-lg border border-lime-300 transition-colors"
                            >
                                Jetzt einkaufen
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}