// components/portrait/PortraitContent.tsx (Updated)
import HeroSection from './HeroSection'
import WelcomeSection from './WelcomeSection'
import DocumentsSection from './DocumentsSection'
import PhilosophySection from './PhilosophySection'
import CallToAction from './CallToAction'

export default function PortraitContent() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
            <HeroSection />

            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <WelcomeSection />
                        <DocumentsSection />
                        <PhilosophySection />
                        <CallToAction />
                    </div>
                </div>
            </div>
        </main>
    )
}