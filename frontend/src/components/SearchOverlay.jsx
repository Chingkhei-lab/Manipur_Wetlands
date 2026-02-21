import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchOverlay = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [searchQueryState, setSearchQueryState] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const inputRef = useRef(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
            setSearchQueryState('');
            setSearchResults([]);
            setTimeout(() => setIsMounted(true), 10);
        }
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Instant Search Logic
    useEffect(() => {
        const fetchSearch = async () => {
            if (searchQueryState.length > 2) {
                setIsSearching(true);
                try {
                    const response = await axios.get(`http://localhost:5171/api/search?query=${searchQueryState}`);
                    setSearchResults(response.data.slice(0, 8)); // Show a bit more comfortably
                } catch (error) {
                    console.error("Search failed:", error);
                }
                setIsSearching(false);
            } else {
                setSearchResults([]);
            }
        };

        const debounceTimer = setTimeout(fetchSearch, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQueryState]);

    const handleResultClick = (type, linkId) => {
        onClose();
        if (type.toLowerCase() === 'wetland') {
            navigate(`/wetland/${linkId}`);
        } else {
            navigate(`/species/${linkId}`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 h-screen w-screen z-50 bg-white/20 dark:bg-black/20 backdrop-blur-sm flex flex-col items-center pt-32 px-4 transition-opacity duration-300 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
            <button
                onClick={onClose}
                className="absolute top-8 right-8 text-[#6a8174] hover:text-primary transition-colors bg-white/50 dark:bg-black/20 p-2 rounded-full backdrop-blur-md border border-[#dde3e0] dark:border-primary/20"
            >
                <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <div className="w-full max-w-3xl relative">
                <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-[#6a8174] text-3xl">search</span>
                <input
                    ref={inputRef}
                    className="w-full pl-16 pr-6 py-6 text-2xl bg-white dark:bg-[#1a2620] border border-[#dde3e0] dark:border-primary/30 rounded-2xl shadow-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary placeholder:text-[#6a8174]/50 outline-none text-[#121614] dark:text-white font-bold transition-all"
                    placeholder="Search wetlands, species, or scientific names..."
                    type="text"
                    value={searchQueryState}
                    onChange={(e) => setSearchQueryState(e.target.value)}
                />
            </div>

            <div className="w-full max-w-3xl mt-4">
                {isSearching ? (
                    <div className="p-6 text-center text-[#6a8174] text-sm font-bold flex justify-center items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
                        Searching databases...
                    </div>
                ) : searchResults.length > 0 ? (
                    <div className="bg-white dark:bg-[#1a2620] border border-[#dde3e0] dark:border-primary/20 rounded-2xl shadow-xl overflow-hidden max-h-[60vh] overflow-y-auto hide-scrollbar">
                        <ul>
                            {searchResults.map((result) => (
                                <li
                                    key={`${result.type}-${result.id}`}
                                    className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-primary/10 cursor-pointer flex items-center gap-4 transition-colors border-b border-[#dde3e0]/50 dark:border-primary/10 last:border-none"
                                    onClick={() => handleResultClick(result.type, result.link_id)}
                                >
                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 border border-[#dde3e0] dark:border-primary/20 shadow-sm">
                                        <img src={`/${result.image_url || 'assets/placeholder.jpg'}`} alt={result.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-center overflow-hidden">
                                        <span className="text-lg font-extrabold text-[#121614] dark:text-white truncate block">{result.name}</span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shadow-[0_0_8px_rgba(46,139,87,0.8)]"></span>
                                            {result.type}
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-[#6a8174] opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all">arrow_forward</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : searchQueryState.length > 2 ? (
                    <div className="p-8 text-center text-[#6a8174] bg-white/50 dark:bg-[#1a2620]/50 rounded-2xl border border-dashed border-[#dde3e0] dark:border-primary/20">
                        <span className="material-symbols-outlined text-4xl mb-3">search_off</span>
                        <p className="text-lg font-bold">No exact matches found.</p>
                        <p className="text-sm">Try using different keywords or exploring the full catalog.</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default SearchOverlay;
