// components/vertriebspartner/PartnerCountry.tsx
import PartnerCard from './PartnerCard'

interface PartnerCountryProps {
    country: string
    partners: Array<{
        imageSrc: string
        name: string
        description: string
    }>
    additionalPartners?: Array<{
        name: string
        location: string
    }>
}

export default function PartnerCountry({ country, partners, additionalPartners }: PartnerCountryProps) {
    return (
        <div className="bg-gradient-to-br from-lime-50 to-emerald-50 rounded-2xl p-8 border-2 border-lime-200">
            <div className="mb-8">
                <div className="inline-flex items-center bg-lime-600 text-white px-6 py-2 rounded-full">
                    <span className="text-xl font-bold">{country}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {partners.map((partner, index) => (
                    <PartnerCard
                        key={index}
                        imageSrc={partner.imageSrc}
                        name={partner.name}
                        description={partner.description}
                    />
                ))}
            </div>

            {additionalPartners && additionalPartners.length > 0 && (
                <div className="mt-8 pt-8 border-t border-lime-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Weitere Partner</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {additionalPartners.map((partner, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-lime-600 font-bold">P</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{partner.name}</h4>
                                        <p className="text-gray-600 text-sm">{partner.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}