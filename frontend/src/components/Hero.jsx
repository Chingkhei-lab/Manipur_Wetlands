import React, { useState, useEffect } from 'react';

const heroSlides = [
    {
        id: 0,
        image: '/assets/wetland_loktak.jpg',
        badge: 'Conservation Initiative',
        title: <>Guardians of the <span className="text-primary italic">Phumdis</span></>,
        subtitle: 'Manipur Wetlands Biodiversity Inventory: Documenting 15+ Wetlands and 200+ unique species.'
    },
    {
        id: 1,
        image: '/assets/wetland_pumlen.jpg',
        badge: 'Critical Habitat',
        title: <>Sanctuary of the <span className="text-primary italic">Migratory Birds</span></>,
        subtitle: 'Explore Pumlen Pat, the second-largest wetland and a critical wintering ground for trans-Himalayan migrants.'
    },
    {
        id: 2,
        image: '/assets/wetland_ikop.jpg',
        badge: 'Ecological Heritage',
        title: <>Preserving the <span className="text-primary italic">Jewel of India</span></>,
        subtitle: 'Data-driven conservation to protect the fragile aquatic ecosystems of the Indo-Burma hotspot.'
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    return (
        <section className="relative w-full h-[650px] overflow-hidden group">
            {heroSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(20, 30, 24, 0.85) 0%, rgba(20, 30, 24, 0.4) 50%, rgba(20, 30, 24, 0) 100%), url('${slide.image}')`,
                            transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)'
                        }}
                    ></div>

                    <div className="relative max-w-7xl mx-auto px-6 lg:px-10 h-full flex flex-col justify-center items-start">
                        <div className={`max-w-2xl space-y-6 transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                {slide.badge}
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="text-xl text-white/90 font-medium leading-relaxed drop-shadow-md">
                                {slide.subtitle}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/30 transition-all flex items-center gap-3" onClick={() => window.location.href = '/catalog'}>
                                    <span>Explore the Database</span>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                                <button
                                    onClick={() => window.location.href = '/map'}
                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl text-lg font-bold transition-all"
                                >
                                    View Interactive Map
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-primary/50 backdrop-blur-sm text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous Slide"
            >
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-primary/50 backdrop-blur-sm text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Next Slide"
            >
                <span className="material-symbols-outlined">chevron_right</span>
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                                ? 'w-8 h-2 bg-primary shadow-[0_0_10px_rgba(46,139,87,0.8)]'
                                : 'w-2 h-2 bg-white/50 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
