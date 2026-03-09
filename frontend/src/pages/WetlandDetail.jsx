import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpeciesModal from '../components/SpeciesModal';
import BioStats from '../components/BioStats';
import SpeciesCard from '../components/SpeciesCard';
import { useAuth } from '../context/AuthContext';

const WetlandDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Animals');
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [archiveImages, setArchiveImages] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchWetlandDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5171/api/species/wetland/${id}`);
                setData(response.data);
                setArchiveImages([
                    `${response.data.wetlandImageUrl || '/assets/placeholder.jpg'}`,
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
                <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center object-cover"
                        style={{
                            backgroundImage: `url('${data.wetlandImageUrl || '/assets/placeholder.jpg'}')`
                        }}
                    ></div>
                    {/* Glass Bar at Bottom */}
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 md:p-8 lg:p-12 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                        <div className="max-w-4xl text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white mb-1.5 md:mb-2 line-clamp-2 drop-shadow-lg">{data.wetlandName}</h1>
                            <p className="text-sm md:text-lg text-white/90 mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 drop-shadow-md">{data.wetlandDescription}</p>

                            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 md:gap-x-6 text-xs md:text-sm">
                                <span className="flex items-center gap-1 md:gap-1.5 text-white/90 font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-primary text-sm md:text-base">location_on</span>
                                    {data.wetlandDistrict}
                                </span>
                                <span className="flex items-center gap-1 md:gap-1.5 text-white/90 font-bold uppercase tracking-wider hidden sm:flex">
                                    <span className="material-symbols-outlined text-primary text-sm md:text-base">water</span>
                                    {data.wetlandType || 'Wetland'}
                                </span>
                                <span className="flex items-center gap-1 md:gap-1.5 text-white/90 font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-primary text-sm md:text-base">straighten</span>
                                    {data.wetlandAreaSqKm ? `${data.wetlandAreaSqKm} sq km` : 'Area TBA'}
                                </span>
                                <span className="flex items-center gap-1 md:gap-1.5 text-white/90 font-bold uppercase tracking-wider text-green-400">
                                    <span className="material-symbols-outlined text-sm md:text-base">verified_user</span>
                                    Protected
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/map?focus=${id}`)}
                            className="bg-primary hover:bg-primary/90 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl text-xs md:text-sm font-extrabold uppercase tracking-widest shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-2 flex-shrink-0 w-full md:w-auto mt-2 md:mt-0"
                        >
                            <span className="material-symbols-outlined text-lg md:text-xl">public</span>
                            <span>View Map 🗺️</span>
                        </button>
                    </div>
                </section>

                {/* Admin Controls */}
                {user && user.role === 'admin' && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-6">
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-yellow-800">
                                <span className="material-symbols-outlined">admin_panel_settings</span>
                                <span className="text-sm font-bold uppercase tracking-wider">Admin Controls</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <button className="flex items-center gap-1.5 bg-white hover:bg-yellow-100 text-yellow-700 px-4 py-2 border border-yellow-200 rounded-lg text-xs font-bold transition-colors">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    Edit Data
                                </button>
                                <button className="flex items-center gap-1.5 bg-white hover:bg-yellow-100 text-yellow-700 px-4 py-2 border border-yellow-200 rounded-lg text-xs font-bold transition-colors">
                                    <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
                                    Upload Photo
                                </button>
                                <button className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                    Delete Data
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                <BioStats speciesData={data.species} />

                {/* Simulated Visual Archive */}
                <section className="bg-primary/5 dark:bg-[#1a2620]/50 py-12 md:py-20 mt-8 md:mt-16 mb-8 md:mb-16 border-y border-[#dde3e0] dark:border-primary/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                        <div className="flex items-center justify-between mb-6 md:mb-8">
                            <h2 className="text-xl md:text-2xl font-extrabold text-[#121614] dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-2xl">photo_library</span>
                                Visual Archive
                            </h2>
                            <span className="text-[10px] md:text-xs font-bold text-[#6a8174] uppercase tracking-widest bg-white dark:bg-[#1a2620] px-2 py-1 md:px-3 md:py-1 rounded-full border border-[#dde3e0] dark:border-primary/20 shadow-sm">
                                3 Images
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 h-auto md:h-[500px]">
                            <div className="col-span-1 md:col-span-2 aspect-[4/3] md:aspect-auto md:h-full rounded-2xl overflow-hidden shadow-lg border border-[#dde3e0] dark:border-primary/20 bg-gray-100 dark:bg-gray-800 relative group">
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
                            <div className="grid grid-cols-2 md:grid-cols-1 md:flex md:flex-col gap-3 md:gap-4 h-auto md:h-full">
                                {archiveImages[1] && (
                                    <div
                                        className="aspect-[4/3] md:aspect-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg border border-[#dde3e0] dark:border-primary/20 bg-black relative group cursor-pointer"
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
                                            <span className="material-symbols-outlined text-white text-2xl md:text-3xl drop-shadow-lg">open_in_full</span>
                                        </div>
                                    </div>
                                )}
                                {archiveImages[2] && (
                                    <div
                                        className="aspect-[4/3] md:aspect-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg border border-[#dde3e0] dark:border-primary/20 bg-black relative group cursor-pointer"
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
                                            <span className="material-symbols-outlined text-white text-2xl md:text-3xl drop-shadow-lg">open_in_full</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Species Tabs */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 md:pb-24">
                    <div className="flex border-b border-[#dde3e0] dark:border-primary/20 mb-6 md:mb-8 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                        {speciesCategories.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 sm:px-6 py-3 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === tab
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
                        <div className="text-center py-10 md:py-12 text-[#6a8174]">
                            <p className="text-sm md:text-base">No {activeTab.toLowerCase()} data recorded for this wetland yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
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
