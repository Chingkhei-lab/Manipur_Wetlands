import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Catalog = () => {
    const [searchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [filters, setFilters] = useState({
        Wetland: true,
        Animal: true,
        Bird: true,
        Fish: true,
        Flora: true,
        Insect: true
    });

    useEffect(() => {
        // Automatically hide Wetlands if ?category=species
        const categoryParam = searchParams.get('category');
        if (categoryParam === 'species') {
            setFilters(prev => ({ ...prev, Wetland: false }));
        }

        const fetchAllItems = async () => {
            try {
                const response = await axios.get('http://localhost:5171/api/search');
                setItems(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to fetch catalog:", err);
                setError("Failed to load catalog data.");
                setIsLoading(false);
            }
        };

        fetchAllItems();
    }, [searchParams]);

    const handleFilterChange = (type) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const toggleAll = (state) => {
        const newFilters = {};
        Object.keys(filters).forEach(k => newFilters[k] = state);
        setFilters(newFilters);
    };

    const filteredItems = items.filter(item => filters[item.type]);

    const getTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case 'wetland': return 'bg-primary text-white';
            case 'animal': return 'bg-orange-500 text-white';
            case 'bird': return 'bg-blue-500 text-white';
            case 'fish': return 'bg-cyan-500 text-white';
            case 'flora': return 'bg-emerald-500 text-white';
            case 'insect': return 'bg-purple-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-[#121614] dark:text-white antialiased min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow max-w-[1400px] mx-auto px-4 lg:px-8 py-10 w-full flex flex-col lg:flex-row gap-8">

                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-[#1a2620] border border-[#dde3e0] dark:border-primary/20 rounded-2xl p-6 sticky top-28 shadow-sm">
                        <h3 className="text-xl font-extrabold mb-4 text-[#121614] dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">filter_list</span>
                            Filters
                        </h3>

                        <div className="flex gap-2 mb-4 pb-4 border-b border-[#dde3e0] dark:border-primary/10">
                            <button onClick={() => toggleAll(true)} className="text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors w-full">All</button>
                            <button onClick={() => toggleAll(false)} className="text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full">None</button>
                        </div>

                        <div className="space-y-3">
                            {Object.keys(filters).map(type => (
                                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={filters[type]}
                                            onChange={() => handleFilterChange(type)}
                                            className="peer sr-only"
                                        />
                                        <div className="w-5 h-5 border-2 border-[#dde3e0] dark:border-primary/30 rounded bg-white dark:bg-[#121614] peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-[14px] opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-[#6a8174] group-hover:text-primary transition-colors">{type}s</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Grid */}
                <section className="flex-grow">
                    <div className="mb-6 flex justify-between items-end">
                        <h1 className="text-3xl font-extrabold">Unified Catalog</h1>
                        <p className="text-[#6a8174] font-medium text-sm">Showing {filteredItems.length} items</p>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-12">
                            <p>{error}</p>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="text-center py-20 bg-white/50 dark:bg-[#1a2620]/50 rounded-2xl border border-dashed border-[#dde3e0] dark:border-primary/20">
                            <span className="material-symbols-outlined text-4xl text-[#6a8174] mb-3">search_off</span>
                            <h3 className="text-xl font-bold mb-1">No items found</h3>
                            <p className="text-[#6a8174] text-sm">Try adjusting your filters on the left.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {filteredItems.map(item => (
                                <Link
                                    to={item.type === 'Wetland' ? `/wetland/${item.link_id}` : `/species/${item.link_id}`}
                                    key={`${item.type}-${item.id}`}
                                    className="group block relative bg-white dark:bg-[#1a2620] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                                        <img
                                            src={`/${item.image_url || 'assets/placeholder.jpg'}`}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                                        />

                                        {/* Elegant Type Badge */}
                                        <div className="absolute top-2 right-2 z-10">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-md backdrop-blur-md ${getTypeColor(item.type)}`}>
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-extrabold text-[#121614] dark:text-white line-clamp-2 text-sm group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default Catalog;
