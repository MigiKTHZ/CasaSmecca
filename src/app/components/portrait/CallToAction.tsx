// components/portrait/CallToAction.tsx
import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function CallToAction() {
    return (
        <div className="text-center">
            <Link
                href="/kontakt"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-lime-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-lime-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-lime-800"
            >
                <Mail className="w-5 h-5 mr-3" />
                Kontaktieren Sie uns für weitere Informationen
            </Link>
        </div>
    )
}