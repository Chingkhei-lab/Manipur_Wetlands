import React from 'react';
import { Link } from 'react-router-dom';

const SpeciesCard = ({ species, onClick }) => {
    // Dynamic IUCN Status coloring
    const getStatusColor = (status) => {
        if (!status) return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
        const s = status.toLowerCase();
        if (s.includes('endangered')) return 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20';
        if (s.includes('vulnerable')) return 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200 dark:border-orange-500/20';
        if (s.includes('least concern')) return 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20';
        return 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
    };

    return (
        <Link
            to={`/species/${species.type}/${species.id}`}
            onClick={onClick}
            className="group block relative bg-white dark:bg-[#1a2620] rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#dde3e0] dark:border-primary/10 overflow-hidden transform hover:-translate-y-1"
        >
            <div className="relative aspect-square overflow-hidden bg-white">
                {(species.imageUrl2 || species.image_url_2) ? (
                    <div className="grid grid-cols-2 gap-2 h-full w-full">
                        <img
                            src={`${species.imageUrl || species.image_url || '/assets/placeholder.jpg'}`}
                            alt={`${species.commonName} 1`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                        />
                        <img
                            src={`${species.imageUrl2 || species.image_url_2}`}
                            alt={`${species.commonName} 2`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                        />
                    </div>
                ) : (
                    <img
                        src={`${species.imageUrl || species.image_url || '/assets/placeholder.jpg'}`}
                        alt={species.commonName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                    />
                )}

                {/* Embedded Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-white text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold shadow-lg flex items-center gap-1.5 md:gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-xs md:text-sm">
                        View Data <span className="material-symbols-outlined text-[14px] md:text-sm">open_in_new</span>
                    </span>
                </div>

                {/* IUCN Badge */}
                {species.iucnStatus && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10">
                        <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded-md text-[8px] md:text-[10px] font-bold uppercase tracking-wider border shadow-sm backdrop-blur-md ${getStatusColor(species.iucnStatus)}`}>
                            {species.iucnStatus}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-3 md:p-5 flex flex-col bg-white dark:bg-[#1a2620]">
                {/* Local name if available, otherwise common name */}
                <h4 className="text-sm md:text-xl font-extrabold text-[#121614] dark:text-white mb-0.5 md:mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {species.localName || species.commonName}
                </h4>

                {/* Fallback to common name if localname was used above, otherwise scientific name */}
                {species.localName ? (
                    <p className="text-[10px] md:text-xs font-bold text-[#6a8174] uppercase tracking-wider mb-0.5 md:mb-1 line-clamp-1">{species.commonName}</p>
                ) : null}

                <p className="text-[10px] md:text-sm italic text-[#6a8174] line-clamp-1">{species.scientificName}</p>
            </div>
        </Link>
    );
};

export default SpeciesCard;
