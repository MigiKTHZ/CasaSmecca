// components/portrait/WelcomeSection.tsx
import Image from 'next/image'

export default function WelcomeSection() {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-4 border-lime-950">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Unser Motto ist: Die Qualität in der Tradition
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                        Ich begrüsse Sie herzlich bei Casa Smecca, Ihrem Partner für authentische
                        italienische Produkte. Seit Jahren setzen wir auf höchste Qualität und
                        traditionelle Herstellungsverfahren.
                    </p>
                    <p className="text-gray-700 text-lg">
                        Unsere Leidenschaft für italienische Küche und Kultur treibt uns an,
                        nur die besten Produkte direkt aus Italien zu importieren und unseren
                        Kunden anzubieten.
                    </p>
                </div>

                <div className="relative h-96 rounded-xl overflow-hidden shadow-lg border-4 border-lime-950">
                    <Image
                        src="/portrait/3.jpg"
                        alt="Casa Smecca Portrait"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}