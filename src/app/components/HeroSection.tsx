// components/HeroSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Award, Coffee } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
    id: number;
    title: string;
    description: string;
    image: string;
    cta: string;
    bgColor: string;
    icon: React.ReactNode;
}

export default function HeroSection() {
    const slides: Slide[] = [
        {
            id: 1,
            title: "Premium Italienische Produkte",
            description: "Entdecken Sie authentische italienische Spezialitäten direkt aus Italien. Tradition und Qualität seit 1998.",
            image: "/home/home2.jpeg", // You'll need to add this image
            cta: "Zum Shop",
            bgColor: "bg-gradient-to-r from-lime-50 to-emerald-50",
            icon: <ShoppingBag className="w-6 h-6" />,
        },
        {
            id: 2,
            title: "Die Qualität in der Tradition",
            description: "Höchste Qualitätsstandards und traditionelle Herstellungsverfahren für ausgezeichneten Geschmack.",
            image: "/home/home4.jpeg", // You'll need to add this image
            cta: "Mehr erfahren",
            bgColor: "bg-gradient-to-r from-emerald-50 to-lime-50",
            icon: <Award className="w-6 h-6" />,
        },
        {
            id: 3,
            title: "Persönliche Beratung",
            description: "Unser Team steht Ihnen gerne zur Verfügung für individuelle Bestellungen und besondere Anfragen.",
            image: "/home/home5.jpeg", // You'll need to add this image
            cta: "Kontakt",
            bgColor: "bg-gradient-to-r from-lime-50 to-emerald-50",
            icon: <Coffee className="w-6 h-6" />,
        },
    ];

    // Fallback images if your custom images don't exist
    const fallbackImages = [
        "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ];

    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const nextSlide = (): void => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = (): void => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Auto slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    return (
        <section className="relative overflow-hidden">
            <div className={`${slides[currentSlide].bgColor} transition-colors duration-500`}>
                <div className="container mx-auto px-4 py-6 md:py-12 lg:py-16">
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Text content */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left mb-6 md:mb-10 lg:mb-0 lg:pr-10">
                            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                                <span className="text-lime-700 mr-2">
                                    {slides[currentSlide].icon}
                                </span>
                                <span className="text-sm font-medium text-lime-800">Casa Smecca</span>
                            </div>
                            
                            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 md:mb-6 leading-tight">
                                {slides[currentSlide].title}
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 md:mb-8 max-w-2xl mx-auto lg:mx-0">
                                {slides[currentSlide].description}
                            </p>
                            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/shop"
                                    className="bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-700 hover:to-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 shadow-lg text-sm sm:text-base whitespace-nowrap text-center"
                                >
                                    {slides[currentSlide].cta}
                                </Link>
                                <Link
                                    href="/portrait"
                                    className="bg-white hover:bg-lime-50 text-lime-700 font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors border-2 border-lime-600 shadow text-sm sm:text-base whitespace-nowrap text-center"
                                >
                                    Über uns
                                </Link>
                            </div>

                            {/* Features - Hidden on small mobile */}
                            <div className="hidden sm:grid grid-cols-3 gap-4 mt-8">
                                <div className="text-center">
                                    <div className="text-lime-600 text-xl mb-1">🇮🇹</div>
                                    <div className="text-sm font-medium text-gray-700">Direkt aus Italien</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lime-600 text-xl mb-1">⭐</div>
                                    <div className="text-sm font-medium text-gray-700">Premium Qualität</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lime-600 text-xl mb-1">🚚</div>
                                    <div className="text-sm font-medium text-gray-700">Schnelle Lieferung</div>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="w-full lg:w-1/2 relative mt-4 md:mt-0">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-lime-200">
                                <div className="h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 w-full relative">
                                    <Image
                                        src={slides[currentSlide].image}
                                        alt={slides[currentSlide].title}
                                        fill
                                        className="object-cover transition-transform duration-700"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.src = fallbackImages[currentSlide];
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Slide indicators */}
                            <div className="flex justify-center mt-4 md:mt-6 space-x-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                            index === currentSlide 
                                                ? 'bg-lime-600 scale-125' 
                                                : 'bg-lime-300 hover:bg-lime-400'
                                        }`}
                                        aria-label={`Gehe zu Slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Mobile navigation buttons */}
                            <div className="flex justify-between items-center mt-4 md:hidden">
                                <button
                                    onClick={prevSlide}
                                    className="bg-white/80 hover:bg-white p-1.5 rounded-full shadow-lg border-2 border-lime-200"
                                    aria-label="Vorheriger Slide"
                                >
                                    <ChevronLeft size={20} className="text-lime-700" />
                                </button>
                                <div className="text-sm text-lime-700 font-medium">
                                    {currentSlide + 1} / {slides.length}
                                </div>
                                <button
                                    onClick={nextSlide}
                                    className="bg-white/80 hover:bg-white p-1.5 rounded-full shadow-lg border-2 border-lime-200"
                                    aria-label="Nächster Slide"
                                >
                                    <ChevronRight size={20} className="text-lime-700" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Navigation buttons */}
            <button
                onClick={prevSlide}
                className="hidden md:flex absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg border-2 border-lime-200"
                aria-label="Vorheriger Slide"
            >
                <ChevronLeft size={24} className="text-lime-700" />
            </button>
            <button
                onClick={nextSlide}
                className="hidden md:flex absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg border-2 border-lime-200"
                aria-label="Nächster Slide"
            >
                <ChevronRight size={24} className="text-lime-700" />
            </button>
        </section>
    );
}