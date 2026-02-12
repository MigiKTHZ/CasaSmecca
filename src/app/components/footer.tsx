// components/Footer.tsx
import prisma from '@/app/lib/prisma'
import { Mail, Phone, MapPin, ShoppingBag, Home, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function Footer() {
    // Fetch categories from database
    const categories = await prisma.productCategory.findMany({
        orderBy: {
            categoryID: 'asc'
        }
    })

    // Split categories into two columns for better layout
    const halfIndex = Math.ceil(categories.length / 2)
    const firstColumnCategories = categories.slice(0, halfIndex)
    const secondColumnCategories = categories.slice(halfIndex)

    return (
        <footer className="bg-gradient-to-b from-lime-900 to-emerald-900 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

                    {/* Shop Categories - First Column */}
                    <div>
                        <div className="flex items-center mb-4">
                            <ShoppingBag size={20} className="text-lime-300 mr-2" />
                            <h3 className="text-lg font-bold">Shop Categories</h3>
                        </div>
                        <ul className="space-y-3">
                            {firstColumnCategories.map((category) => (
                                <li key={category.categoryID}>
                                    <Link
                                        href={`/shop/${category.slug}`}
                                        className="text-lime-200 hover:text-white transition-colors hover:underline flex items-center"
                                    >
                                        <span className="w-2 h-2 bg-lime-400 rounded-full mr-2"></span>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shop Categories - Second Column */}
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="w-6 h-6 mr-2"></div> {/* Spacer for alignment */}
                            <h3 className="text-lg font-bold text-transparent">.</h3> {/* Invisible for alignment */}
                        </div>
                        <ul className="space-y-3">
                            {secondColumnCategories.map((category) => (
                                <li key={category.categoryID}>
                                    <Link
                                        href={`/shop/${category.slug}`}
                                        className="text-lime-200 hover:text-white transition-colors hover:underline flex items-center"
                                    >
                                        <span className="w-2 h-2 bg-lime-400 rounded-full mr-2"></span>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="flex items-center mb-4">
                            <Home size={20} className="text-lime-300 mr-2" />
                            <h3 className="text-lg font-bold">Quick Links</h3>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="text-lime-200 hover:text-white transition-colors hover:underline flex items-center"
                                >
                                    <span className="w-2 h-2 bg-lime-400 rounded-full mr-2"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/portrait"
                                    className="text-lime-200 hover:text-white transition-colors hover:underline flex items-center"
                                >
                                    <span className="w-2 h-2 bg-lime-400 rounded-full mr-2"></span>
                                    Portrait
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/vertriebspartner"
                                    className="text-lime-200 hover:text-white transition-colors hover:underline flex items-center"
                                >
                                    <span className="w-2 h-2 bg-lime-400 rounded-full mr-2"></span>
                                    Vertriebspartner
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/geschichte"
                                    className="text-lime-200 hover:text-white transition-colors hover:underline flex items-center"
                                >
                                    <span className="w-2 h-2 bg-lime-400 rounded-full mr-2"></span>
                                    Geschichte
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/kontakt"
                                    className="text-lime-200 hover:text-white transition-colors hover:underline flex items-center"
                                >
                                    <span className="w-2 h-2 bg-lime-400 rounded-full mr-2"></span>
                                    Kontakte
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <div className="flex items-center mb-4">
                            <User size={20} className="text-lime-300 mr-2" />
                            <h3 className="text-lg font-bold">Kontakt</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin size={20} className="text-lime-300 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-lime-200 font-medium">Adresse</p>
                                    <p className="text-lime-100">Büchelistrasse 9</p>
                                    <p className="text-lime-100">CH-4410 Liestal</p>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="text-lime-300 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-lime-200 font-medium">Telefon</p>
                                    <div className="space-y-1">
                                        <p className="text-lime-100">
                                            <a href="tel:+41619212320" className="hover:text-white transition-colors">
                                                061 921 23 20
                                            </a>
                                        </p>
                                        <p className="text-lime-100">
                                            <a href="tel:+41786378410" className="hover:text-white transition-colors">
                                                078 637 84 10
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="text-lime-300 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-lime-200 font-medium">E-Mail</p>
                                    <p className="text-lime-100">
                                        <a href="mailto:s.smecca@bluewin.ch" className="hover:text-white transition-colors">
                                            s.smecca@bluewin.ch
                                        </a>
                                    </p>
                                </div>
                            </li>
                        </ul>

                        {/* Opening Hours
                        <div className="mt-6 pt-6 border-t border-lime-800">
                            <p className="text-lime-200 font-medium mb-2">Öffnungszeiten</p>
                            <div className="space-y-1 text-sm text-lime-100">
                                <div className="flex justify-between">
                                    <span>Mo-Fr:</span>
                                    <span>09:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sa:</span>
                                    <span>09:00 - 16:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>So:</span>
                                    <span>Geschlossen</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Logo & Tagline - Updated with SVG */}
                <div className="py-6 border-t border-lime-800 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center">
                            {/* SVG Logo for Footer */}
                            <div className="mr-3">
                                <Image
                                    src="/logo/logo_weiss_footer.svg"
                                    alt="Casa Smecca Logo"
                                    width={160}
                                    height={64}
                                    className="h-12 w-auto"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-lime-300 text-sm mb-2">
                            Premium Italian Products • Direct from Italy • Authentic Taste
                        </p>
                        <p className="text-lime-400 text-xs">
                            Seit 1998 Ihr Partner für italienische Spezialitäten
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-6 border-t border-lime-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-lime-400 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Casa Smecca. Alle Rechte vorbehalten.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-lime-400">
                        <Link href="/impressum" className="hover:text-white transition-colors">
                            Impressum
                        </Link>
                        <Link href="/datenschutz" className="hover:text-white transition-colors">
                            Datenschutz
                        </Link>
                        <Link href="/agb" className="hover:text-white transition-colors">
                            AGB
                        </Link>
                        <Link href="/kontakt" className="hover:text-white transition-colors">
                            Kontakt
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}