// components/vertriebspartner/CallToAction.tsx
import Link from 'next/link'
import { Handshake, Mail, Phone } from 'lucide-react'

export default function CallToAction() {
    return (
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border-4 border-lime-950">
            <div className="text-center max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Handshake className="w-10 h-10 text-lime-700" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Partner werden?
                </h2>

                <p className="text-gray-700 text-lg mb-8">
                    Interessieren Sie sich für eine Partnerschaft mit Casa Smecca?
                    Wir sind immer auf der Suche nach engagierten Partnern, die unsere
                    Leidenschaft für italienische Produkte teilen.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/kontakt"
                        className="inline-flex items-center justify-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                        <Mail className="w-5 h-5 mr-2" />
                        Kontakt aufnehmen
                    </Link>

                    <a
                        href="tel:+41619212320"
                        className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-lime-700 font-semibold py-3 px-8 rounded-lg transition-colors border-2 border-lime-600"
                    >
                        <Phone className="w-5 h-5 mr-2" />
                        Direkt anrufen
                    </a>
                </div>

                <p className="mt-8 text-gray-600 text-sm">
                    Wir freuen uns auf Ihre Anfrage und besprechen gerne mögliche Kooperationen.
                </p>
            </div>
        </div>
    )
}