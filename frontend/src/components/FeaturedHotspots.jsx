import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedHotspots = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-primary text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-2 md:mb-3">Wetland Ecosystems</h2>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121614] dark:text-white leading-tight">Featured Biodiversity Hotspots</h3>
                    <p className="text-[#6a8174] mt-3 md:mt-4 text-base md:text-lg">Explore the unique ecological significance of Manipur's major wetlands, from the floating islands of Loktak to the bird sanctuaries of Pumlen.</p>
                </div>
                <Link to="/explorer" className="text-primary font-bold flex items-center gap-2 group whitespace-nowrap mt-2 md:mt-0">
                    <span className="text-sm md:text-base">View all Wetlands</span>
                    <span className="material-symbols-outlined text-sm md:text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Card 1 */}
                <div className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 md:mb-5">
                        <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            data-alt="Lush green aquatic landscape with phumdis"
                            src="/assets/wetland_loktak.jpg"
                            alt="Loktak Lake"
                        />
                        <div className="absolute top-3 left-3 md:top-4 md:left-4">
                            <span className="bg-white/90 backdrop-blur text-primary px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs font-bold uppercase">Freshwater</span>
                        </div>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-[#121614] dark:text-white group-hover:text-primary transition-colors">Loktak Lake</h4>
                    <p className="text-[#6a8174] mt-1.5 md:mt-2 text-sm md:text-base line-clamp-2 md:line-clamp-none">The largest freshwater lake in Northeast India, famous for its unique floating islands called Phumdis and the Keibul Lamjao National Park.</p>
                </div>

                {/* Card 2 */}
                <div className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 md:mb-5">
                        <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            data-alt="Swampy wetland with migratory birds"
                            src="/assets/wetland_pumlen.jpg"
                            alt="Pumlen Pat"
                        />
                        <div className="absolute top-3 left-3 md:top-4 md:left-4">
                            <span className="bg-white/90 backdrop-blur text-primary px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs font-bold uppercase">Marshy Pat</span>
                        </div>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-[#121614] dark:text-white group-hover:text-primary transition-colors">Pumlen Pat</h4>
                    <p className="text-[#6a8174] mt-1.5 md:mt-2 text-sm md:text-base line-clamp-2 md:line-clamp-none">A vital second-largest wetland in Manipur providing a crucial wintering ground for hundreds of migratory bird species.</p>
                </div>

                {/* Card 3 */}
                <div className="group cursor-pointer sm:col-span-2 lg:col-span-1">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 md:mb-5">
                        <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            data-alt="Misty lake surrounded by mountains"
                            src="/assets/wetland_ikop.jpg"
                            alt="Ikop Pat"
                        />
                        <div className="absolute top-3 left-3 md:top-4 md:left-4">
                            <span className="bg-white/90 backdrop-blur text-primary px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs font-bold uppercase">Biodiversity Link</span>
                        </div>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-[#121614] dark:text-white group-hover:text-primary transition-colors">Ikop Pat</h4>
                    <p className="text-[#6a8174] mt-1.5 md:mt-2 text-sm md:text-base line-clamp-2 md:line-clamp-none">Essential for flood control and local fishing economies, Ikop Pat represents the symbiotic relationship between locals and nature.</p>
                </div>
            </div>
        </section>
    );
};

export default FeaturedHotspots;
