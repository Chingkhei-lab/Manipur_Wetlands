import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconRetinaUrl: iconRetina,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Child component to handle map clicks and close the drawer
const MapClickHandler = ({ onMapClick }) => {
    useMapEvents({
        click: () => {
            onMapClick();
        },
    });
    return null;
};

// Child component to handle flying to selected marker
const MapController = ({ selectedWetland }) => {
    const map = useMap();
    useEffect(() => {
        if (selectedWetland && selectedWetland.latitude && selectedWetland.longitude) {
            map.flyTo([selectedWetland.latitude, selectedWetland.longitude], 13, { duration: 1.5 });
        }
    }, [selectedWetland, map]);
    return null;
};

// Map focus component running AFTER map initialized
const MapFocusController = ({ wetlands, focusId, setSelectedWetland }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || wetlands.length === 0 || !focusId) return;

        const target = wetlands.find(w => w.commonId === focusId);
        if (target && target.latitude && target.longitude) {
            // Using a slightly longer timeout to ensure perfectly safe Leaflet canvas load
            setTimeout(() => {
                map.flyTo([target.latitude, target.longitude], 12, { duration: 1.5 });
                setSelectedWetland(target);
            }, 600);
        }
    }, [map, wetlands, focusId, setSelectedWetland]);

    return null;
};

const MapPage = () => {
    const [wetlands, setWetlands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const focusId = searchParams.get('focus');
    const [selectedWetland, setSelectedWetland] = useState(null);

    useEffect(() => {
        const fetchWetlands = async () => {
            try {
                const response = await axios.get('http://localhost:5171/api/wetlands');
                setWetlands(response.data);
                setIsLoading(false);

                // Directly manage the sequence: After loading map data, if focus exists, select it
                if (focusId && response.data.length > 0) {
                    const focusTarget = response.data.find(w => w.commonId === focusId);
                    if (focusTarget) {
                        setTimeout(() => setSelectedWetland(focusTarget), 300);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch wetlands for map:", err);
                setIsLoading(false);
            }
        };

        fetchWetlands();
    }, [focusId]);

    // Manipur constraints
    const centerPosition = [24.817, 93.936];
    const manipurBounds = [[23.8, 92.9], [25.7, 94.8]];

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-[#121614] dark:text-white antialiased h-screen flex flex-col overflow-hidden">
            <Header />
            <main className="flex-grow relative w-full h-[calc(100vh-80px)]">
                {/* Floating Title Overlay */}
                <div className="absolute top-6 left-6 z-[400] pointer-events-none">
                    <div className="bg-white/90 dark:bg-[#1a2620]/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-[#dde3e0] dark:border-primary/20 pointer-events-auto">
                        <h1 className="text-2xl font-extrabold text-[#121614] dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">map</span>
                            Manipur Wetlands Map
                        </h1>
                        <p className="text-xs font-bold text-[#6a8174] uppercase tracking-wider mt-1">Geospatial Explorer</p>
                    </div>
                </div>

                {!isLoading && (
                    <MapContainer
                        center={centerPosition}
                        zoom={9}
                        minZoom={9}
                        maxBounds={manipurBounds}
                        scrollWheelZoom={true}
                        zoomControl={false}
                        className="w-full h-full absolute inset-0 z-0 bg-[#e5e5e5] dark:bg-[#121614]"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        />
                        <MapClickHandler onMapClick={() => setSelectedWetland(null)} />
                        <MapController selectedWetland={selectedWetland} />

                        {wetlands.map(wetland => {
                            if (wetland.latitude && wetland.longitude) {
                                return (
                                    <Marker
                                        key={wetland.id}
                                        position={[wetland.latitude, wetland.longitude]}
                                        eventHandlers={{
                                            click: () => {
                                                setSelectedWetland(wetland);
                                            },
                                        }}
                                    />
                                );
                            }
                            return null;
                        })}
                    </MapContainer>
                )}

                {/* The Map Side Drawer Component */}
                <div
                    className={`absolute top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-[#1a2620] shadow-2xl border-l border-[#dde3e0] dark:border-primary/20 transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-[500] flex flex-col ${selectedWetland ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {selectedWetland && (
                        <>
                            <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-800 flex-shrink-0 border-b border-[#dde3e0] dark:border-primary/20">
                                <img
                                    src={`/${selectedWetland.imageUrl || 'assets/placeholder.jpg'}`}
                                    alt={selectedWetland.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <button
                                    onClick={() => setSelectedWetland(null)}
                                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">close</span>
                                </button>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="inline-block bg-primary px-3 py-1 rounded-[6px] text-white text-[10px] font-black uppercase tracking-widest shadow-lg mb-2">
                                        {selectedWetland.type || 'Wetland'}
                                    </span>
                                    <h2 className="text-3xl font-extrabold text-white leading-tight drop-shadow-md">{selectedWetland.name}</h2>
                                </div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col overflow-y-auto hide-scrollbar">
                                <div className="flex items-center gap-2 mb-6 text-[#6a8174]">
                                    <span className="material-symbols-outlined text-xl">location_on</span>
                                    <span className="font-bold uppercase text-xs tracking-wider">{selectedWetland.district}</span>
                                </div>

                                {selectedWetland.areaSqKm > 0 && (
                                    <div className="bg-background-light dark:bg-background-dark border border-[#dde3e0] dark:border-primary/10 rounded-xl p-4 mb-6 flex items-center gap-4">
                                        <div className="bg-primary/10 p-2 rounded-lg text-primary flex-shrink-0">
                                            <span className="material-symbols-outlined text-2xl">straighten</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#6a8174] uppercase tracking-wider">Area Coverage</p>
                                            <p className="text-xl font-extrabold text-[#121614] dark:text-white">{selectedWetland.areaSqKm} sq km</p>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-sm font-extrabold text-[#6a8174] uppercase mb-3 border-b border-[#dde3e0] dark:border-primary/10 pb-2">Ecological Overview</h3>
                                    <p className="text-[#121614]/80 dark:text-white/80 text-[15px] leading-relaxed">
                                        {selectedWetland.description || "Detailed ecological information for this wetland is currently being documented. This site forms a crucial component of the region's overall biodiversity network."}
                                    </p>
                                </div>

                                <Link
                                    to={`/wetland/${selectedWetland.commonId}`}
                                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl text-center font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-auto flex-shrink-0"
                                >
                                    <span>View Full Details</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MapPage;
