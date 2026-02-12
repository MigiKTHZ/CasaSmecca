// components/kontakt/ContactPage.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
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

                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-lime-900 mb-3">
                                Kontakt
                            </h1>
                            <p className="text-lg text-lime-700">
                                Wir sind für Sie da – persönlich und kompetent
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                            {/* Left Column - Photo & Personal Info */}
                            <div className="space-y-8">
                                {/* Photo Card */}
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                    <div className="h-2 bg-gradient-to-r from-lime-600 to-emerald-600"></div>
                                    <div className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-lime-100 shadow-lg mb-6">
                                                <Image
                                                    src="/kontakt/FOTOSALVO.jpg"
                                                    alt="Salvo Smecca - Inhaber Casa Smecca"
                                                    fill
                                                    className="object-cover"
                                                    sizes="192px"
                                                />
                                            </div>
                                            <h2 className="text-2xl font-bold text-lime-900 mb-2">
                                                Salvo Smecca
                                            </h2>
                                            <p className="text-gray-600 mb-4">
                                                Gründer & Inhaber von Casa Smecca
                                            </p>
                                            <div className="inline-flex items-center bg-lime-100 text-lime-800 px-4 py-2 rounded-full">
                                                <MessageCircle size={18} className="mr-2" />
                                                Persönliche Beratung
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Opening Hours */}
                                <div className="bg-white rounded-2xl shadow-xl p-6">
                                    <div className="flex items-center mb-6">
                                        <Clock className="text-lime-600 mr-3" size={24} />
                                        <h3 className="text-xl font-bold text-lime-900">Öffnungszeiten</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Montag - Freitag</span>
                                            <span className="font-semibold">09:00 - 18:00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Samstag</span>
                                            <span className="font-semibold">09:00 - 16:00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Sonntag</span>
                                            <span className="font-semibold">Geschlossen</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                        <p className="text-sm text-amber-800 text-center">
                                            Termine nach Vereinbarung jederzeit möglich
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Contact Info & Form */}
                            <div className="space-y-8">
                                {/* Contact Info Card */}
                                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                                    <div className="mb-8">
                                        <p className="text-lg text-gray-700">
                                            Wenn Sie zusätzliche Auskünfte erhalten möchten, nehmen Sie mit mir Kontakt auf.
                                        </p>
                                    </div>

                                    {/* Contact Details */}
                                    <div className="space-y-6">
                                        {/* Address */}
                                        <div className="flex items-start">
                                            <div className="bg-lime-100 p-3 rounded-lg mr-4">
                                                <MapPin className="text-lime-700" size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 mb-1">Adresse</h4>
                                                <p className="text-gray-600">
                                                    Büchelistrasse 9<br />
                                                    CH-4410 Liestal
                                                </p>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex items-start">
                                            <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                                                <Phone className="text-emerald-700" size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 mb-1">Telefon</h4>
                                                <div className="space-y-1">
                                                    <p className="text-gray-600">
                                                        Festnetz: <a href="tel:+41619212320" className="text-blue-600 hover:underline">061 921 23 20</a>
                                                    </p>
                                                    <p className="text-gray-600">
                                                        Mobile: <a href="tel:+41786378410" className="text-blue-600 hover:underline">078 637 84 10</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start">
                                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                                <Mail className="text-blue-700" size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 mb-1">E-Mail</h4>
                                                <div className="space-y-1">
                                                    <p className="text-gray-600">
                                                        <a href="mailto:s.smecca@sunrise.ch" className="text-blue-600 hover:underline">
                                                            s.smecca@bluewin.ch
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Turm Image */}
                                    <div className="mt-8 flex justify-center">
                                        <div className="relative w-48 h-64 rounded-lg overflow-hidden shadow-lg">
                                            <Image
                                                src="/kontakt/Turm.jpg"
                                                alt="Liestal Städtli Turm"
                                                fill
                                                className="object-cover"
                                                sizes="192px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
                            <div className="h-2 bg-gradient-to-r from-emerald-600 to-blue-600"></div>
                            <div className="p-6">
                                <div className="flex items-center mb-6">
                                    <MapPin className="text-emerald-600 mr-3" size={24} />
                                    <h3 className="text-xl font-bold text-gray-800">So finden Sie uns</h3>
                                </div>
                                <div className="rounded-xl overflow-hidden shadow-lg">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.333642753042!2d7.733380276328023!3d47.483413371178834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791ca69d9c0adfd%3A0x34a3d4f7e1011201!2sB%C3%BCchelistrasse%209%2C%204410%20Liestal!5e0!3m2!1sde!2sch!4v1712439120337!5m2!1sde!2sch"
                                        className="w-full h-64 md:h-96 border-0"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Maps - Casa Smecca Standort"
                                    ></iframe>
                                </div>
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-lime-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lime-900 mb-2">Parkplätze</h4>
                                        <p className="text-sm text-gray-600">Kostenlose Parkplätze vor dem Geschäft</p>
                                    </div>
                                    <div className="bg-emerald-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-emerald-900 mb-2">ÖV</h4>
                                        <p className="text-sm text-gray-600">5 Minuten vom Bahnhof Liestal</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-blue-900 mb-2">Lieferung</h4>
                                        <p className="text-sm text-gray-600">Kostenlose Lieferung in der Region</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center">
                            <div className="inline-flex flex-col sm:flex-row gap-4">
                                <a
                                    href="tel:+41619212320"
                                    className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                                >
                                    <Phone size={20} className="mr-2" />
                                    Jetzt anrufen
                                </a>
                                <a
                                    href="mailto:salvo@casasmecca.ch"
                                    className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-lime-700 font-semibold py-3 px-8 rounded-lg transition-colors border border-lime-600"
                                >
                                    <Mail size={20} className="mr-2" />
                                    E-Mail senden
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}