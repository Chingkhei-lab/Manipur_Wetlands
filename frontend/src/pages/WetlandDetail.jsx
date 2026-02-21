import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpeciesModal from '../components/SpeciesModal';
import BioStats from '../components/BioStats';
import SpeciesCard from '../components/SpeciesCard';

const WetlandDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Animals');
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [archiveImages, setArchiveImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWetlandDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5171/api/species/wetland/${id}`);
                setData(response.data);
                setArchiveImages([
                    `/${response.data.wetlandImageUrl || 'assets/placeholder.jpg'}`,
                    `/assets/${id}_1.jpg`,
                    `/assets/${id}_2.jpg`
                ]);
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to fetch wetland details:", err);
                setError("Failed to load wetland details.");
                setIsLoading(false);
            }
        };

        fetchWetlandDetails();
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
                <div className="flex-grow flex justify-center items-center text-red-500">
                    <p>{error || "Wetland not found."}</p>
                </div>
                <Footer />
            </div>
        );
    }

    const speciesCategories = ['Animals', 'Birds', 'Fish', 'Flora', 'Insects'];
    const currentSpecies = data.species[activeTab.toLowerCase()] || data.species[activeTab] || [];

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-[#121614] dark:text-white antialiased min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center object-cover"
                        style={{
                            backgroundImage: `url('/${data.wetlandImageUrl || 'assets/placeholder.jpg'}')`
                        }}
                    ></div>
                    {/* Glass Bar at Bottom */}
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 lg:p-12 z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div className="max-w-4xl text-left">
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-2 line-clamp-2 drop-shadow-lg">{data.wetlandName}</h1>
                            <p className="text-lg text-white/90 mb-4 line-clamp-2 drop-shadow-md">{data.wetlandDescription}</p>

                            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm">
                                <span className="flex items-center gap-1.5 text-white/90 font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-primary text-base">location_on</span>
                                    {data.wetlandDistrict}
                                </span>
                                <span className="flex items-center gap-1.5 text-white/90 font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-primary text-base">water</span>
                                    {data.wetlandType || 'Wetland'}
                                </span>
                                <span className="flex items-center gap-1.5 text-white/90 font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-primary text-base">straighten</span>
                                    {data.wetlandAreaSqKm ? `${data.wetlandAreaSqKm} sq km` : 'Area TBA'}
                                </span>
                                <span className="flex items-center gap-1.5 text-white/90 font-bold uppercase tracking-wider text-green-400">
                                    <span className="material-symbols-outlined text-base">verified_user</span>
                                    Protected Region
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/map?focus=${id}`)}
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl text-sm font-extrabold uppercase tracking-widest shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-2 flex-shrink-0"
                        >
                            <span className="material-symbols-outlined text-xl">public</span>
                            <span>Locate on Map 🗺️</span>
                        </button>
                    </div>
                </section>

                <BioStats speciesData={data.species} />

                {/* Simulated Visual Archive */}
                <section className="bg-primary/5 dark:bg-[#1a2620]/50 py-20 mt-16 mb-16 border-y border-[#dde3e0] dark:border-primary/10">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-extrabold text-[#121614] dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">photo_library</span>
                                Visual Archive
                            </h2>
                            <span className="text-xs font-bold text-[#6a8174] uppercase tracking-widest bg-white dark:bg-[#1a2620] px-3 py-1 rounded-full border border-[#dde3e0] dark:border-primary/20 shadow-sm">
                                3 Images
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[500px]">
                            <div className="md:col-span-2 h-64 md:h-full rounded-2xl overflow-hidden shadow-lg border border-[#dde3e0] dark:border-primary/20 bg-gray-100 dark:bg-gray-800 relative group">
                                {archiveImages[0] && (
                                    <img
                                        key={archiveImages[0]}
                                        src={archiveImages[0]}
                                        alt="Main view"
                                        className="w-full h-full object-cover animate-[fade_0.4s_ease-in-out]"
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-4 h-full hidden md:flex">
                                {archiveImages[1] && (
                                    <div
                                        className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-[#dde3e0] dark:border-primary/20 bg-black relative group cursor-pointer"
                                        onClick={() => {
                                            const newImages = [...archiveImages];
                                            [newImages[0], newImages[1]] = [newImages[1], newImages[0]];
                                            setArchiveImages(newImages);
                                        }}
                                    >
                                        <img
                                            src={archiveImages[1]}
                                            alt={`${data.wetlandName} Archive 1`}
                                            className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-700"
                                            onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                            <span className="material-symbols-outlined text-white text-3xl drop-shadow-lg">open_in_full</span>
                                        </div>
                                    </div>
                                )}
                                {archiveImages[2] && (
                                    <div
                                        className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-[#dde3e0] dark:border-primary/20 bg-black relative group cursor-pointer"
                                        onClick={() => {
                                            const newImages = [...archiveImages];
                                            [newImages[0], newImages[2]] = [newImages[2], newImages[0]];
                                            setArchiveImages(newImages);
                                        }}
                                    >
                                        <img
                                            src={archiveImages[2]}
                                            alt={`${data.wetlandName} Archive 2`}
                                            className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-700"
                                            onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                            <span className="material-symbols-outlined text-white text-3xl drop-shadow-lg">open_in_full</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Species Tabs */}
                <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
                    <div className="flex border-b border-[#dde3e0] dark:border-primary/20 mb-8 overflow-x-auto hide-scrollbar">
                        {speciesCategories.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 font-semibold text-sm transition-colors whitespace-nowrap ${activeTab === tab
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-[#6a8174] hover:text-primary/70'
                                    }`}
                            >
                                {tab} ({data.species[tab.toLowerCase()]?.length || data.species[tab]?.length || 0})
                            </button>
                        ))}
                    </div>

                    {/* Species Grid */}
                    {currentSpecies.length === 0 ? (
                        <div className="text-center py-12 text-[#6a8174]">
                            <p>No {activeTab.toLowerCase()} data recorded for this wetland yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {currentSpecies.map((speciesItem) => (
                                <SpeciesCard
                                    key={speciesItem.id}
                                    species={{ ...speciesItem, type: activeTab }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedSpecies({ ...speciesItem, type: activeTab });
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />

            {/* Species Modal */}
            {selectedSpecies && (
                <SpeciesModal
                    species={selectedSpecies}
                    onClose={() => setSelectedSpecies(null)}
                />
            )}
        </div>
    );
};

export default WetlandDetail;
