// components/geschichte/HistoryPage.tsx - EXAKT WIE VORHER, NUR OBERER TEIL DES BILDES
'use client';

import Link from 'next/link';
import { ArrowLeft, ChefHat, Leaf, Coffee, Wine } from 'lucide-react';

export default function HistoryPage() {
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
                            <h1 className="text-3xl md:text-4xl font-bold text-lime-900 mb-3">
                                Unsere Geschichte
                            </h1>
                            <p className="text-lg text-lime-700">
                                Seit 1750 - Tradition trifft Qualität
                            </p>
                        </div>

                        {/* Featured Image - NUR OBERER TEIL mit background-position: center top */}
                        <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="relative h-64 md:h-80 lg:h-96">
                                {/* Hier nur background-position geändert zu center top */}
                                <div
                                    className="absolute inset-0 bg-cover"
                                    style={{
                                        backgroundImage: 'url("/geschichte/Unbenannt-2.jpg")',
                                        backgroundPosition: 'center top', // <- DAS IST DIE ÄNDERUNG
                                        backgroundSize: 'cover'
                                    }}
                                />

                                {/* Overlay mit motto - UNVERÄNDERT */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 md:p-8">
                                    <div className="text-white max-w-2xl">
                                        <div className="flex items-center mb-3">
                                            <ChefHat className="text-lime-300 mr-3" size={28} />
                                            <span className="text-2xl md:text-3xl font-bold italic">
                                                &quot;Die Qualität in der Tradition&quot;
                                            </span>
                                        </div>
                                        <p className="text-lg opacity-90">Unser Motto seit Generationen</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Card - ALLES UNVERÄNDERT */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Decorative Border */}
                            <div className="h-2 bg-gradient-to-r from-lime-600 via-emerald-600 to-amber-600"></div>

                            <div className="p-6 md:p-8 lg:p-12">
                                {/* Quote Banner */}
                                <div className="bg-gradient-to-r from-lime-50 to-emerald-50 border-l-4 border-lime-600 p-6 rounded-r-lg mb-8">
                                    <div className="flex items-start">
                                        <ChefHat className="text-lime-700 mt-1 mr-4 flex-shrink-0" size={24} />
                                        <div>
                                            <p className="text-lg font-semibold text-lime-900 italic">
                                                &quot;Die Qualität in der Tradition&quot;
                                            </p>
                                            <p className="text-lime-700 mt-1">- Unser Motto seit Generationen</p>
                                        </div>
                                    </div>
                                </div>

                                {/* History Content - ALLES UNVERÄNDERT */}
                                <div className="prose prose-lg max-w-none">
                                    <div className="text-gray-700 space-y-6">
                                        <p className="text-lg leading-relaxed">
                                            Meine Familie produziert seit über 250 Jahren Hartweizen, Tomaten und Artischocken für
                                            italienische Grosshändler (filiera italiana), so steht Casa Smecca seit jeher in enger
                                            Beziehung sowohl zum Produkt, wie auch zu den Produzenten und unser Motto ist:
                                            <span className="font-semibold text-lime-700"> &quot;Die Qualität in der Tradition&quot;</span>.
                                        </p>

                                        {/* Timeline Section - UNVERÄNDERT */}
                                        <div className="border-l-2 border-lime-300 pl-6 ml-3 mt-8 mb-8">
                                            <h3 className="text-xl font-bold text-lime-900 mb-4 flex items-center">
                                                <div className="w-3 h-3 bg-lime-600 rounded-full mr-3"></div>
                                                Unsere Meilensteine
                                            </h3>

                                            <div className="space-y-6">
                                                {/* 1750 */}
                                                <div className="relative">
                                                    <div className="absolute -left-9 mt-1">
                                                        <div className="w-6 h-6 bg-lime-600 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">1750</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lime-800">Seit 1750</h4>
                                                        <p className="text-gray-600">Familientradition in der Landwirtschaft</p>
                                                    </div>
                                                </div>

                                                {/* 2000 */}
                                                <div className="relative">
                                                    <div className="absolute -left-9 mt-1">
                                                        <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">2000</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-emerald-800">Gründung 2000</h4>
                                                        <p className="text-gray-600">Importunternehmen &quot;Casa Smecca&quot; wird gegründet</p>
                                                    </div>
                                                </div>

                                                {/* 2003 */}
                                                <div className="relative">
                                                    <div className="absolute -left-9 mt-1">
                                                        <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">2003</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-amber-800">Erweiterung 2003</h4>
                                                        <p className="text-gray-600">Erste Bio-Produkte: Pasta, Sughi, Oliven, Espressokaffee</p>
                                                    </div>
                                                </div>

                                                {/* 2004 */}
                                                <div className="relative">
                                                    <div className="absolute -left-9 mt-1">
                                                        <div className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">2004</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-amber-900">Weiteres Wachstum</h4>
                                                        <p className="text-gray-600">Bio-Produkte, Weine, Balsamico, Pasta-Variationen</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-lg leading-relaxed">
                                            Aus diesem Grund gründete ich im Jahr 2000 mein Importunternehmen zunächst unter dem
                                            Namen <span className="font-semibold text-lime-700">&quot;Casa Smecca&quot;</span>. 2003 ermöglichten
                                            mir internationale Geschäftskontakte die Erweiterung meiner Produktpalette erstmalig
                                            mit Bio-Pasta, Sughi, Oliven und Espressokaffee.
                                        </p>

                                        <p className="text-lg leading-relaxed">
                                            Das Sortiment wurde 2004 um weitere Bio-Produkte, Weine, Oliven, Balsamico-Essig,
                                            weitere Pasta-Variationen und süsse Versuchungen ergänzt.
                                        </p>

                                        <p className="text-lg leading-relaxed">
                                            Selbstverständlich bin ich auch weiterhin für Sie immer wieder auf der Suche nach
                                            neuen, italienischen Gourmetsköstlichkeiten und dies natürlich vor Ort - in Italien!
                                        </p>

                                        {/* Product Highlights - UNVERÄNDERT */}
                                        <div className="bg-gradient-to-r from-lime-50 to-amber-50 p-6 rounded-xl my-8">
                                            <h3 className="text-xl font-bold text-lime-900 mb-4">Unsere Spezialitäten</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center">
                                                    <Leaf className="text-emerald-600 mr-3" size={20} />
                                                    <span>Hausspezialitäten: Tagliatelle, Tofie, Orecchiette, Maccheroni</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <ChefHat className="text-amber-600 mr-3" size={20} />
                                                    <span>Nach hauseigenem Rezept hergestellt</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Coffee className="text-brown-600 mr-3" size={20} />
                                                    <span>Feinste, auserwählteste Zutaten</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Wine className="text-purple-600 mr-3" size={20} />
                                                    <span>Hohe, konstante Produktqualität</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-lg leading-relaxed">
                                            Für die Herstellung meiner verschiedenen Hausspezialitäten (u.a. Tagliatelle, Tofie,
                                            Orecchiette, Maccheroni) werden nur die feinsten, auserwähltesten Zutaten verwendet.
                                            Sie werden alle nach hauseigenem Rezept hergestellt, was meine Stammkunden immer
                                            wieder aufs Neue begeistert, ebenso wie die hohe, konstante Produktqualität. Meine
                                            Kunden schätzen aber auch die persönliche, kompetente Beratung im Casa Smecca.
                                        </p>

                                        <p className="text-lg leading-relaxed">
                                            Meine Homepage soll Ihnen einen ersten Eindruck in meine auserlesenen Exklusivitäten
                                            vermitteln. Ich wünsche Ihnen viel Freude bei der Entdeckung vieler kulinarischer
                                            Köstlichkeiten und würde mich freuen, Sie so bald zu den Liebhabern meiner Produkte
                                            zählen zu dürfen.
                                        </p>

                                        {/* Signature - UNVERÄNDERT */}
                                        <div className="mt-12 pt-8 border-t border-lime-200">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-lime-900 mb-2">Salvo Smecca</p>
                                                <p className="text-lime-700">Gründer & Inhaber</p>
                                                <p className="text-gray-600 text-sm mt-2">Casa Smecca - Import von italienischen Delikatessen</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action - UNVERÄNDERT */}
                        <div className="mt-8 text-center">
                            <Link
                                href="/shop"
                                className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Entdecken Sie unsere Produkte
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}