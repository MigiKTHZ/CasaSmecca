// components/vertriebspartner/PartnerCard.tsx
import Image from 'next/image'

interface PartnerCardProps {
    imageSrc: string
    name: string
    description: string
}

export default function PartnerCard({ imageSrc, name, description }: PartnerCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-lime-200">
            <div className="h-2 bg-gradient-to-r from-lime-500 to-emerald-500"></div>
            <div className="p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden border-2 border-lime-100">
                        <Image
                            src={imageSrc}
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{name}</h3>
                    <p className="text-gray-600 mb-4">{description}</p>

                    <div className="mt-4 inline-flex items-center text-lime-700 font-medium">
                        <span className="mr-2">📍</span>
                        <span>Partner seit 2015</span>
                    </div>
                </div>
            </div>
        </div>
    )
}