// components/portrait/DocumentsSection.tsx
import Image from 'next/image'
import Link from 'next/link'
import { FileText, Award, Trophy } from 'lucide-react'

export default function DocumentsSection() {
    const documents = [
        {
            imageSrc: "/portrait/portraet.jpg",
            title: "Geschichte",
            description: "Lesen Sie unsere vollständige Geschichte",
            link: "/pdfs/portraet.pdf",
            icon: <FileText className="w-6 h-6 text-lime-600" />
        },
        {
            imageSrc: "/portrait/urkunde.jpg",
            title: "Urkunde",
            description: "Offizielle Auszeichnungen und Zertifikate",
            link: "/pdfs/urkunde.pdf",
            icon: <Award className="w-6 h-6 text-lime-600" />
        },
        {
            imageSrc: "/portrait/anerkennung.jpg",
            title: "Anerkennung",
            description: "Anerkennung des Ministeriums für Arbeit",
            link: "/pdfs/anerkennung.pdf",
            icon: <Trophy className="w-6 h-6 text-lime-600" />
        }
    ]

    return (
        <div className="bg-lime-100 rounded-2xl p-8 mb-12 border-4 border-lime-950">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Unsere Dokumente & Auszeichnungen
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {documents.map((doc, index) => (
                    <Link
                        key={index}
                        href={doc.link}
                        target="_blank"
                        className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-lime-200"
                    >
                        <div className="relative h-64 mb-4 rounded-lg overflow-hidden border-2 border-lime-100">
                            <Image
                                src={doc.imageSrc}
                                alt={`${doc.title} Dokument`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{doc.title}</h3>
                                <p className="text-gray-600 text-sm">{doc.description}</p>
                            </div>
                            {doc.icon}
                        </div>
                        <div className="mt-4 text-lime-600 font-medium group-hover:text-lime-700">
                            PDF öffnen →
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}