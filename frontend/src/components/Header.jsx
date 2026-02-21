import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';

const Header = () => {
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const getLinkClass = (path) => {
        return location.pathname === path
            ? "text-sm font-semibold text-primary border-b-2 border-primary pb-1"
            : "text-sm font-medium text-[#6a8174] hover:text-primary transition-colors";
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-[#dde3e0] dark:border-primary/20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
                {/* Logo Area */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-lg text-white">
                        <span className="material-symbols-outlined text-2xl">eco</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-extrabold leading-none tracking-tight text-primary uppercase">Manipur Wetlands</h1>
                        <p className="text-[10px] font-medium tracking-widest text-[#6a8174] uppercase">Biodiversity Inventory</p>
                    </div>
                </Link>

                {/* Main Nav Links - Increased gap for cleaner look */}
                <nav className="hidden lg:flex items-center gap-10">
                    <Link to="/" className={getLinkClass("/")}>Home</Link>
                    <Link to="/explorer" className={getLinkClass("/explorer")}>Wetlands Explorer</Link>
                    <Link to="/catalog?category=species" className={getLinkClass("/catalog")}>Biodiversity Library</Link>
                    <Link to="/map" className={getLinkClass("/map")}>Interactive Map</Link>
                    <Link to="/about" className={getLinkClass("/about")}>About</Link>
                </nav>

                {/* Actions (Search Icon & Explire Button) */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-primary/10 transition-colors text-[#6a8174] focus:outline-none"
                        aria-label="Open Search"
                    >
                        <span className="material-symbols-outlined text-2xl">search</span>
                    </button>

                    <Link to="/catalog" className="hidden sm:flex bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-all items-center gap-2">
                        <span className="material-symbols-outlined text-lg">database</span>
                        <span>Explore Database</span>
                    </Link>
                </div>
            </div>

            {/* Mount Search Overlay */}
            {isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
        </header>
    );
};

export default Header;
