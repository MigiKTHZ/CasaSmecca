// components/portrait/PhilosophySection.tsx
export default function PhilosophySection() {
    const philosophies = [
        {
            icon: "🇮🇹",
            title: "Authentizität",
            description: "Wir importieren ausschließlich originale italienische Produkte direkt von den Herstellern."
        },
        {
            icon: "⭐",
            title: "Qualität",
            description: "Höchste Qualitätsstandards und traditionelle Herstellungsverfahren."
        },
        {
            icon: "🤝",
            title: "Vertrauen",
            description: "Langjährige Beziehungen zu unseren Partnern und Kunden."
        }
    ]

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-4 border-lime-950">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Unsere Philosophie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {philosophies.map((philosophy, index) => (
                    <div key={index} className="text-center">
                        <div className="text-5xl mb-4">{philosophy.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{philosophy.title}</h3>
                        <p className="text-gray-700">{philosophy.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}