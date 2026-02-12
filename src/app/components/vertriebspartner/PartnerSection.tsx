// components/vertriebspartner/PartnerSection.tsx
import PartnerCountry from './PartnerCountry'

export default function PartnerSection() {
    return (
        <div className="space-y-12">
            <PartnerCountry
                country="Schweiz"
                partners={[
                    {
                        imageSrc: "/vertriebspartner/Vinum.jpg",
                        name: "Vinum Waldhaus",
                        description: "Premium Weinhandel mit Fokus auf italienische Weine"
                    },
                    {
                        imageSrc: "/vertriebspartner/salvis.jpg",
                        name: "SALVI'S",
                        description: "Feinkost & Delikatessen aus Italien"
                    }
                ]}
            />
        </div>
    )
}