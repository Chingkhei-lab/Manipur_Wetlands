import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explorer = () => {
    const [wetlands, setWetlands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWetlands = async () => {
            try {
                // Using the backend port 5171 as established
                const response = await axios.get('http://localhost:5171/api/wetlands');
                setWetlands(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to fetch wetlands:", err);
                setError("Failed to load wetlands data. Please ensure the backend is running.");
                setIsLoading(false);
            }
        };

        fetchWetlands();
    }, []);

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-[#121614] dark:text-white antialiased min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <section className="bg-primary/10 dark:bg-primary/5 py-10 md:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 px-2">Wetlands Explorer</h1>
                        <p className="text-[#6a8174] text-base md:text-lg max-w-2xl mx-auto px-4">
                            Discover the diverse wetland ecosystems of Manipur, cataloged with detailed biodiversity data.
                        </p>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48 md:h-64">
                            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-8 md:py-12 px-4">
                            <p className="text-sm md:text-base">{error}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {wetlands.map((wetland) => (
                                <Link to={`/wetland/${wetland.id}`} key={wetland.id} className="group cursor-pointer bg-white dark:bg-[#1a2620] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#dde3e0] dark:border-primary/20 overflow-hidden flex flex-col h-full">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            src={`${wetland.imageUrl || '/assets/placeholder.jpg'}`}
                                            alt={wetland.name}
                                            onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                                        />
                                        <div className="absolute top-3 left-3 md:top-4 md:left-4">
                                            <span className="bg-white/90 backdrop-blur text-primary px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs font-bold uppercase shadow-sm">
                                                {wetland.type || 'Wetland'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-1.5 md:mb-2">
                                            <h4 className="text-lg md:text-xl font-bold text-[#121614] dark:text-white group-hover:text-primary transition-colors">
                                                {wetland.name}
                                            </h4>
                                        </div>
                                        <p className="text-[10px] md:text-xs font-bold text-[#6a8174] uppercase tracking-wider mb-2 md:mb-3">
                                            {wetland.district}
                                        </p>
                                        <p className="text-[#6a8174] text-xs md:text-sm line-clamp-3 mb-3 md:mb-4 flex-grow">
                                            {wetland.description}
                                        </p>
                                        <div className="pt-3 md:pt-4 border-t border-[#dde3e0] dark:border-primary/10 flex items-center justify-end mt-auto">
                                            <span className="text-primary text-xs md:text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                View Species <span className="material-symbols-outlined text-xs md:text-sm">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div >
    );
};

export default Explorer;
