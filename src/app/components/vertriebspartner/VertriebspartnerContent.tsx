// components/vertriebspartner/VertriebspartnerContent.tsx
import HeroSection from './HeroSection'
import WelcomeSection from './WelcomeSection'
import PartnerSection from './PartnerSection'
import CallToAction from './CallToAction'

export default function VertriebspartnerContent() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
            <HeroSection />

            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <WelcomeSection />
                        <PartnerSection />
                        <CallToAction />
                    </div>
                </div>
            </div>
        </main>
    )
}