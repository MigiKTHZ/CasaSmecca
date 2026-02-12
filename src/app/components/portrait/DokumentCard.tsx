import Image from 'next/image'
import Link from 'next/link'

interface DocumentCardProps {
    imageSrc: string
    title: string
    description: string
    link: string
}

export default function DocumentCard({ imageSrc, title, description, link }: DocumentCardProps) {
    return (
        <Link
            href={link}
            target="_blank"
            className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={`${title} Dokument`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
            <div className="mt-4 text-amber-600 font-medium group-hover:text-amber-700">
                PDF öffnen →
            </div>
        </Link>
    )
}