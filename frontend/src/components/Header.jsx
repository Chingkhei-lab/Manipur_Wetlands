import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const getLinkClass = (path) => {
        return location.pathname === path
            ? "text-sm font-semibold text-primary border-b-2 border-primary pb-1"
            : "text-sm font-medium text-[#6a8174] hover:text-primary transition-colors whitespace-nowrap";
    };

    const getMobileLinkClass = (path) => {
        return location.pathname === path
            ? "block px-4 py-3 text-base font-semibold text-primary bg-primary/5 rounded-lg"
            : "block px-4 py-3 text-base font-medium text-[#6a8174] hover:bg-gray-50 hover:text-primary rounded-lg transition-colors";
    };

    // Close mobile menu when a link is clicked
    const handleMobileLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-[#dde3e0] dark:border-primary/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">
                {/* Logo Area */}
                <Link to="/" className="flex items-center gap-2 md:gap-3 z-50">
                    <div className="bg-primary p-1.5 md:p-2 rounded-lg text-white flex-shrink-0">
                        <span className="material-symbols-outlined text-xl md:text-2xl">eco</span>
                    </div>
                    <div>
                        <h1 className="text-base md:text-lg font-extrabold leading-none tracking-tight text-primary uppercase">Manipur Wetlands</h1>
                        <p className="text-[9px] md:text-[10px] font-medium tracking-widest text-[#6a8174] uppercase mt-0.5">Biodiversity Inventory</p>
                    </div>
                </Link>

                {/* Main Nav Links (Desktop) */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8 overflow-hidden">
                    <Link to="/" className={getLinkClass("/")}>Home</Link>
                    <Link to="/explorer" className={getLinkClass("/explorer")}>Wetlands Explorer</Link>
                    <Link to="/catalog?category=species" className={getLinkClass("/catalog")}>Biodiversity Library</Link>
                    <Link to="/map" className={getLinkClass("/map")}>Interactive Map</Link>
                    <Link to="/about" className={getLinkClass("/about")}>About</Link>
                    {(user && user.role === 'manager') && (
                        <Link to="/manage-data" className={getLinkClass("/manage-data")}>Manage Data</Link>
                    )}
                    {user && user.role === 'admin' && (
                        <Link to="/admin/managers" className={getLinkClass("/admin/managers")}>Managers</Link>
                    )}
                </nav>

                {/* Actions (Search, Login Button, Mobile Menu Toggle) */}
                <div className="flex items-center gap-2 md:gap-4 z-50">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-primary/10 transition-colors text-[#6a8174] focus:outline-none"
                        aria-label="Open Search"
                    >
                        <span className="material-symbols-outlined text-xl md:text-2xl">search</span>
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-xs font-bold text-[#121614] leading-tight">{user.name}</span>
                                <span className="text-[9px] font-bold text-primary uppercase tracking-wider">{user.role}</span>
                            </div>
                            <button onClick={() => logout()} className="flex items-center gap-1.5 md:gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all border border-red-100">
                                <span className="material-symbols-outlined text-[16px] md:text-lg">logout</span>
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-1.5 md:gap-2 bg-primary hover:bg-primary/90 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-md shadow-primary/20 transition-all">
                            <span className="material-symbols-outlined text-[16px] md:text-lg">login</span>
                            <span>Login</span>
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-[#6a8174] focus:outline-none ml-1 flex-shrink-0"
                        aria-label="Toggle mobile menu"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#dde3e0] shadow-xl py-4 px-4 flex flex-col gap-2 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <Link to="/" className={getMobileLinkClass("/")} onClick={handleMobileLinkClick}>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-xl">home</span>
                            Home
                        </div>
                    </Link>
                    <Link to="/explorer" className={getMobileLinkClass("/explorer")} onClick={handleMobileLinkClick}>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-xl">travel_explore</span>
                            Wetlands Explorer
                        </div>
                    </Link>
                    <Link to="/catalog?category=species" className={getMobileLinkClass("/catalog")} onClick={handleMobileLinkClick}>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-xl">library_books</span>
                            Biodiversity Library
                        </div>
                    </Link>
                    <Link to="/map" className={getMobileLinkClass("/map")} onClick={handleMobileLinkClick}>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-xl">map</span>
                            Interactive Map
                        </div>
                    </Link>
                    <Link to="/about" className={getMobileLinkClass("/about")} onClick={handleMobileLinkClick}>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-xl">info</span>
                            About Project
                        </div>
                    </Link>
                    {(user && user.role === 'manager') && (
                        <Link to="/manage-data" className={getMobileLinkClass("/manage-data")} onClick={handleMobileLinkClick}>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-xl">database</span>
                                Manage Data
                            </div>
                        </Link>
                    )}
                    {user && user.role === 'admin' && (
                        <Link to="/admin/managers" className={getMobileLinkClass("/admin/managers")} onClick={handleMobileLinkClick}>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-xl">manage_accounts</span>
                                Managers
                            </div>
                        </Link>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100 px-4 flex flex-col gap-3">
                        {user ? (
                            <>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-2">
                                    <p className="text-xs text-[#6a8174] font-medium mb-1">Signed in as:</p>
                                    <p className="text-sm font-bold text-[#121614]">{user.name}</p>
                                    <p className="text-[10px] font-bold text-primary uppercase mt-1">{user.role}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        handleMobileLinkClick();
                                    }}
                                    className="flex bg-red-50 text-red-600 border border-red-100 w-full py-3 rounded-lg text-sm font-bold justify-center items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-lg">logout</span>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="flex bg-primary text-white w-full py-3 rounded-lg text-sm font-bold justify-center items-center gap-2 shadow-md shadow-primary/20"
                                onClick={handleMobileLinkClick}
                            >
                                <span className="material-symbols-outlined text-lg">login</span>
                                Login / Admin
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Mount Search Overlay */}
            {isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
        </header>
    );
};

export default Header;
