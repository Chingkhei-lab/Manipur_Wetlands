import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SpeciesDetail = () => {
    const { speciesType, id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpeciesDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5171/api/species/${speciesType}/${id}`);
                setData(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to fetch species details:", err);
                setError("Failed to load species details. It may not exist.");
                setIsLoading(false);
            }
        };

        fetchSpeciesDetails();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
                <Header />
                <div className="flex-grow flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
                <Header />
                <div className="flex-grow flex flex-col justify-center items-center text-red-500 gap-4">
                    <p>{error || "Species not found."}</p>
                    <button onClick={() => navigate(-1)} className="text-primary underline">Go Back</button>
                </div>
                <Footer />
            </div>
        );
    }

    const { type, data: species } = data;

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-[#121614] dark:text-white antialiased min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pb-12 md:pb-16">
                {/* Minimal Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 md:gap-2 text-[#6a8174] hover:text-primary transition-colors font-semibold text-xs md:text-sm mb-4 md:mb-6 w-max"
                    >
                        <span className="material-symbols-outlined text-sm md:text-base">arrow_back</span>
                        Back
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Image Side */}
                        <div className="flex flex-col gap-4 w-full">
                            <div className="rounded-2xl overflow-hidden shadow-md md:shadow-xl border border-[#dde3e0] dark:border-primary/20 aspect-video md:aspect-square w-full">
                                <img
                                    src={`${species.imageUrl && (species.imageUrl.startsWith('/') || species.imageUrl.startsWith('http')) ? species.imageUrl : `/${species.imageUrl || 'assets/placeholder.jpg'}`}`}
                                    alt={species.commonName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                                />
                            </div>
                            {species.imageUrl2 && (
                                <div className="rounded-2xl overflow-hidden shadow-md md:shadow-xl border border-[#dde3e0] dark:border-primary/20 aspect-video md:aspect-square w-full">
                                    <img
                                        src={`${species.imageUrl2.startsWith('/') || species.imageUrl2.startsWith('http') ? species.imageUrl2 : `/${species.imageUrl2}`}`}
                                        alt={`${species.commonName} Secondary`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Content Side */}
                        <div className="flex flex-col">
                            <span className="inline-block bg-primary/10 text-primary border border-primary/20 font-bold px-2.5 py-1 md:px-3 rounded-full text-[10px] md:text-xs uppercase tracking-wider w-max mb-3 md:mb-4">
                                {type}
                            </span>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-1 md:mb-2">{species.commonName}</h1>
                            <p className="text-lg md:text-xl text-[#6a8174] italic mb-5 md:mb-6">{species.scientificName}</p>

                            <div className="bg-white dark:bg-[#1a2620] border border-[#dde3e0] dark:border-primary/10 rounded-xl p-4 md:p-6 shadow-sm mb-6 md:mb-8">
                                <h3 className="text-xs md:text-sm font-bold text-[#6a8174] uppercase tracking-wider mb-2">Detailed Description</h3>
                                <p className="leading-relaxed text-[#121614]/90 dark:text-white/90 text-sm md:text-base">
                                    {species.description || "A detailed description of this species is currently being researched and will be updated soon."}
                                </p>
                            </div>

                            {/* Data Grid */}
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="bg-white dark:bg-[#1a2620] border border-[#dde3e0] dark:border-primary/10 rounded-xl p-3 md:p-4 shadow-sm col-span-2">
                                    <span className="block text-[10px] md:text-xs font-bold text-[#6a8174] uppercase mb-1">Local Name (Manipuri)</span>
                                    <span className="font-semibold text-sm md:text-base">{species.localName || 'Unknown'}</span>
                                </div>

                                {(species.iucnStatus || species.seasonality) && (
                                    <div className="bg-white dark:bg-[#1a2620] border border-[#dde3e0] dark:border-primary/10 rounded-xl p-3 md:p-4 shadow-sm col-span-2 flex items-center gap-2 md:gap-3">
                                        <div className={`p-1.5 md:p-2 rounded-full ${species.iucnStatus ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                            <span className="material-symbols-outlined text-sm md:text-base">{species.iucnStatus ? 'warning' : 'schedule'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] md:text-xs font-bold text-[#6a8174] uppercase mb-0.5">
                                                {species.iucnStatus ? 'IUCN Red List Status' : 'Seasonality'}
                                            </span>
                                            <span className="font-bold text-sm md:text-lg">
                                                {species.iucnStatus || species.seasonality}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Natural Habitat & Distribution */}
                            {data.habitats && data.habitats.length > 0 && (
                                <div className="mt-6 md:mt-8">
                                    <h3 className="text-xs md:text-sm font-bold text-[#6a8174] uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm md:text-base">public</span>
                                        Natural Habitat & Distribution
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {data.habitats.map((habitat) => (
                                            <button
                                                key={habitat.id}
                                                onClick={() => navigate(`/wetland/${habitat.id}`)}
                                                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all shadow-sm"
                                            >
                                                {habitat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SpeciesDetail;
