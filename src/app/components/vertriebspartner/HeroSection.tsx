// components/vertriebspartner/HeroSection.tsx
export default function HeroSection() {
    return (
        <div className="bg-gradient-to-r from-lime-600 to-emerald-600 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Vertriebspartner</h1>
                    <p className="text-xl md:text-2xl text-lime-100 mb-8">
                        Unsere Partner in der Schweiz und Italien
                    </p>
                    <div className="w-32 h-1 bg-white/50 mx-auto rounded-full"></div>
                </div>
            </div>
        </div>
    )
}