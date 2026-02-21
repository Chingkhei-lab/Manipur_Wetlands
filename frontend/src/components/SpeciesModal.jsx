import React from 'react';
import { Link } from 'react-router-dom';

const SpeciesModal = ({ species, onClose }) => {
    if (!species) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="bg-white dark:bg-[#121614] rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg border border-[#dde3e0] dark:border-primary/20"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-64 w-full">
                    <img
                        src={`/${species.imageUrl || 'assets/placeholder.jpg'}`}
                        alt={species.commonName}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors backdrop-blur-md"
                    >
                        <span className="material-symbols-outlined block text-xl">close</span>
                    </button>
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md uppercase">
                            {species.type || 'Species'}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-2xl font-extrabold text-[#121614] dark:text-white mb-1">{species.commonName}</h3>
                    <p className="text-sm italic text-[#6a8174] mb-4">{species.scientificName}</p>

                    <p className="text-[#121614]/80 dark:text-white/80 text-sm line-clamp-4 leading-relaxed mb-6">
                        {species.description || "No description available for this species yet."}
                    </p>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-sm font-bold text-[#6a8174] hover:bg-[#dde3e0] dark:hover:bg-primary/10 transition-colors"
                        >
                            Close
                        </button>
                        <Link
                            to={`/species/${species.commonId}`}
                            className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2"
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
