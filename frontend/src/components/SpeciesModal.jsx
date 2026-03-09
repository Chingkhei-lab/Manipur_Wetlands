import React from 'react';
import { Link } from 'react-router-dom';

const SpeciesModal = ({ species, onClose }) => {
    if (!species) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="bg-white dark:bg-[#121614] sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl w-full max-w-lg sm:border border-[#dde3e0] dark:border-primary/20 max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Mobile Drag Handle Indicator */}
                <div className="sm:hidden flex justify-center pt-3 pb-1 w-full absolute top-0 z-50 pointer-events-none">
                    <div className="w-12 h-1.5 bg-white/50 backdrop-blur-md rounded-full shadow-sm"></div>
                </div>

                <div className="relative h-48 sm:h-64 w-full flex-shrink-0">
                    <img
                        src={`${species.imageUrl || '/assets/placeholder.jpg'}`}
                        alt={species.commonName}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 sm:bg-none pointer-events-none"></div>
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 sm:p-1.5 transition-colors backdrop-blur-md z-40"
                    >
                        <span className="material-symbols-outlined block text-lg sm:text-xl">close</span>
                    </button>
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-40">
                        <span className="bg-primary text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-md uppercase">
                            {species.type || 'Species'}
                        </span>
                    </div>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto hide-scrollbar flex-grow">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#121614] dark:text-white mb-0.5 sm:mb-1">{species.commonName}</h3>
                    <p className="text-xs sm:text-sm italic text-[#6a8174] mb-3 sm:mb-4">{species.scientificName}</p>

                    <p className="text-[#121614]/80 dark:text-white/80 text-sm line-clamp-4 sm:line-clamp-none leading-relaxed mb-4 sm:mb-6">
                        {species.description || "No description available for this species yet."}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
                        <button
                            onClick={onClose}
                            className="hidden sm:block px-5 py-2.5 rounded-lg text-sm font-bold text-[#6a8174] hover:bg-[#dde3e0] dark:hover:bg-primary/10 transition-colors w-full sm:w-auto"
                        >
                            Close
                        </button>
                        <Link
                            to={`/species/${species.type}/${species.id}`}
                            className="bg-primary hover:bg-primary/90 text-white px-5 py-3 sm:py-2.5 rounded-xl sm:rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            <span>View Full Details</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeciesModal;
