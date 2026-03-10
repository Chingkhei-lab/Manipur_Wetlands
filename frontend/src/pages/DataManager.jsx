import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const DataManager = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('wetlands');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [allWetlands, setAllWetlands] = useState([]);
    const [isUploading, setIsUploading] = useState(null);

    const tabs = [
        { id: 'wetlands', label: 'Wetlands', icon: 'water' },
        { id: 'animals', label: 'Animals', icon: 'pets' },
        { id: 'birds', label: 'Birds', icon: 'flutter_dash' },
        { id: 'fish', label: 'Fish', icon: 'phishing' },
        { id: 'flora', label: 'Flora', icon: 'forest' },
        { id: 'insects', label: 'Insects', icon: 'bug_report' }
    ];

    useEffect(() => {
        if (user && (user.role === 'admin' || user.role === 'manager')) {
            fetchData();
            fetchWetlands();
        }
    }, [activeTab]);

    const fetchWetlands = async () => {
        try {
            const response = await axios.get(`http://localhost:5171/api/DataManager/wetlands`);
            setAllWetlands(response.data);
        } catch (err) {
            console.error("Error fetching wetlands:", err);
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get(`http://localhost:5171/api/DataManager/${activeTab}`);
            setData(response.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(`Failed to load ${activeTab} data. Please ensure the backend server is running.`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            // Pre-fill wetlandIds if species
            const wetlandIds = item.wetlands ? item.wetlands.map(w => w.id) : [];
            setFormData({ ...item, wetlandIds });
        } else {
            setEditingItem(null);
            setFormData(getDefaultFormData());
        }
        setIsModalOpen(true);
    };

    const getDefaultFormData = () => {
        const base = {
            commonId: '',
            commonName: '',
            scientificName: '',
            localName: '',
            description: '',
            imageUrl: '',
            imageUrl2: '',
            iucnStatus: '',
            wetlandIds: []
        };

        if (activeTab === 'wetlands') {
            return {
                name: '',
                type: '',
                district: '',
                latitude: 0,
                longitude: 0,
                description: '',
                imageUrl: '',
                imageUrl2: '',
                imageUrl3: '',
                commonId: '',
                areaSqKm: 0
            };
        } else if (activeTab === 'animals') {
            return { ...base };
        } else if (activeTab === 'birds') {
            return { ...base, seasonality: '' };
        } else if (activeTab === 'fish') {
            return { ...base, economicValue: '' };
        } else if (activeTab === 'flora') {
            return { ...base, plantType: '' };
        } else if (activeTab === 'insects') {
            return { ...base, roleInEcosystem: '' };
        }
        return base;
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleWetlandToggle = (wetlandId) => {
        setFormData(prev => {
            const currentIds = prev.wetlandIds || [];
            const newIds = currentIds.includes(wetlandId)
                ? currentIds.filter(id => id !== wetlandId)
                : [...currentIds, wetlandId];
            return { ...prev, wetlandIds: newIds };
        });
    };

    const handleFileUpload = async (e, fieldName = 'imageUrl') => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        try {
            setIsUploading(fieldName);
            const response = await axios.post('http://localhost:5171/api/Media/upload', uploadFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData(prev => ({ ...prev, [fieldName]: response.data.imageUrl }));
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Image upload failed.");
        } finally {
            setIsUploading(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let payload = formData;

            // If it's a species (not wetlands tab), wrap it in SpeciesSaveRequest
            if (activeTab !== 'wetlands') {
                payload = {
                    data: { ...formData },
                    wetlandIds: formData.wetlandIds || []
                };
                // Remove wetlandIds from the inner data object as it's not in the DB model
                delete payload.data.wetlandIds;
                delete payload.data.wetlands; // Also remove existing nested objects
            }

            if (editingItem) {
                await axios.put(`http://localhost:5171/api/DataManager/${activeTab}/${editingItem.id}`, payload);
            } else {
                await axios.post(`http://localhost:5171/api/DataManager/${activeTab}`, payload);
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            console.error("Error saving data:", err);
            alert("Failed to save data. Please check console for details.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            await axios.delete(`http://localhost:5171/api/DataManager/${activeTab}/${id}`);
            fetchData();
        } catch (err) {
            console.error("Error deleting data:", err);
            alert("Failed to delete item.");
        }
    };

    const getSingularLabel = (id) => {
        if (id === 'flora') return 'Flora';
        if (id === 'fish') return 'Fish';
        if (id === 'wetlands') return 'Wetland';
        if (id === 'insects') return 'Insect';
        if (id === 'animals') return 'Animal';
        if (id === 'birds') return 'Bird';
        return id.slice(0, -1).charAt(0).toUpperCase() + id.slice(1, -1);
    };

    if (!user || user.role !== 'manager') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="font-display bg-background-light text-[#121614] antialiased min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#107060] mb-2">Central Data Management</h1>
                        <p className="text-sm font-medium text-[#6a8174]">Manage wetlands and biodiversity inventory from a single interface.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-[#107060] hover:bg-[#0c5a4d] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-[#107060]/20 transition-all flex items-center justify-center gap-2 flex-shrink-0"
                    >
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                        Add New {getSingularLabel(activeTab)}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                ? "bg-[#107060] text-white shadow-md"
                                : "bg-white text-[#6a8174] border border-[#dde3e0] hover:border-[#107060] hover:text-[#107060]"
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Table */}
                <div className="flex items-center justify-between mb-4 px-1">
                    <h2 className="text-lg font-bold text-[#107060] capitalize">
                        {activeTab} Database
                    </h2>
                    <span className="bg-[#107060]/10 text-[#107060] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#107060]/20">
                        Total Records: {data.length}
                    </span>
                </div>
                <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl border border-[#dde3e0] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#107060]/5 text-[#6a8174] uppercase text-xs font-extrabold tracking-widest border-b border-[#dde3e0]">
                                <tr>
                                    <th className="px-6 py-4">Name / ID</th>
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">{activeTab === 'wetlands' ? 'Type & District' : 'Found In'}</th>
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#dde3e0]">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-20 text-center">
                                            <div className="flex justify-center flex-col items-center gap-2 text-primary">
                                                <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-[#6a8174] font-medium">Loading {activeTab}...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3 text-red-500">
                                                <span className="material-symbols-outlined text-4xl">error_outline</span>
                                                <p className="font-bold">{error}</p>
                                                <button
                                                    onClick={fetchData}
                                                    className="mt-2 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-sm transition-all"
                                                >
                                                    Try Again
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : data.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-20 text-center text-[#6a8174]">
                                            <span className="material-symbols-outlined text-4xl block mb-2 text-gray-300">inventory_2</span>
                                            No {activeTab} records found.
                                        </td>
                                    </tr>
                                ) : (
                                    data.map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-6">
                                                <p className="font-bold text-[#121614] text-base">{item.name || item.commonName}</p>
                                                <p className="text-xs text-[#107060] font-bold mt-1 uppercase tracking-wider">{item.commonId}</p>
                                                {item.scientificName && <p className="text-xs italic text-[#6a8174] mt-1">{item.scientificName}</p>}
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="w-16 h-12 rounded-lg bg-gray-100 border border-[#dde3e0] overflow-hidden">
                                                    <img
                                                        src={item.imageUrl?.startsWith('/') ? item.imageUrl : `/${item.imageUrl}`}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/placeholder.jpg'; }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 border-b border-[#dde3e0]">
                                                {activeTab === 'wetlands' ? (
                                                    <div className="flex flex-col gap-2">
                                                        <span className="text-[#121614] font-bold flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[#107060] text-sm">location_on</span>
                                                            {item.district || 'Unspecified'}
                                                        </span>
                                                        {item.type && (
                                                            <span className="px-2 py-1 bg-[#107060]/10 text-[#107060] text-[10px] font-bold rounded-lg border border-[#107060]/20 w-max uppercase tracking-wider">
                                                                {item.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                                        {item.wetlands?.length > 0 ? (
                                                            item.wetlands.map(w => (
                                                                <span key={w.id} className="px-2.5 py-1 bg-[#107060]/10 text-[#107060] text-[10px] font-bold rounded-lg border border-[#107060]/20">
                                                                    {w.name}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-[#6a8174]/40 text-[11px] italic font-medium">No habitat linked</span>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-[#6a8174] font-medium">
                                                    {item.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleOpenModal(item)}
                                                        className="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#121614]/40 backdrop-blur-sm animate-[fade_0.2s_ease-out]">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col transform transition-all animate-[scale_0.2s_ease-out]">
                        <div className="p-6 border-b border-[#dde3e0] flex items-center justify-between sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-xl font-extrabold text-[#107060] capitalize">
                                    {editingItem ? 'Edit' : 'Add New'} {getSingularLabel(activeTab)}
                                </h2>
                                <p className="text-xs font-bold text-[#6a8174] uppercase tracking-wider mt-1">Data Entry Terminal</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#6a8174] hover:text-[#121614] p-1">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Common ID Removed as per request */}

                                {/* Name */}
                                <div>
                                    <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Name</label>
                                    <input
                                        type="text"
                                        name={activeTab === 'wetlands' ? 'name' : 'commonName'}
                                        value={formData.name || formData.commonName || ''}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                        required
                                    />
                                </div>

                                {activeTab !== 'wetlands' && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Scientific Name</label>
                                            <input
                                                type="text"
                                                name="scientificName"
                                                value={formData.scientificName || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Local Name</label>
                                            <input
                                                type="text"
                                                name="localName"
                                                value={formData.localName || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">IUCN Status</label>
                                            <select
                                                name="iucnStatus"
                                                value={formData.iucnStatus || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all bg-white"
                                            >
                                                <option value="">Select Status (Optional)</option>
                                                <option value="Not Evaluated">Not Evaluated (NE)</option>
                                                <option value="Data Deficient">Data Deficient (DD)</option>
                                                <option value="Least Concern">Least Concern (LC)</option>
                                                <option value="Near Threatened">Near Threatened (NT)</option>
                                                <option value="Vulnerable">Vulnerable (VU)</option>
                                                <option value="Endangered">Endangered (EN)</option>
                                                <option value="Critically Endangered">Critically Endangered (CR)</option>
                                                <option value="Extinct in the Wild">Extinct in the Wild (EW)</option>
                                                <option value="Extinct">Extinct (EX)</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'wetlands' && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Type</label>
                                            <select
                                                name="type"
                                                value={formData.type || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all bg-white"
                                            >
                                                <option value="">Select a Type</option>
                                                <option value="Lake">Lake</option>
                                                <option value="Pond">Pond</option>
                                                <option value="Marsh">Marsh</option>
                                                <option value="Swamp">Swamp</option>
                                                <option value="River">River</option>
                                                <option value="Reservoir">Reservoir</option>
                                                <option value="Bog">Bog</option>
                                                <option value="Fen">Fen</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">District</label>
                                            <input
                                                type="text"
                                                name="district"
                                                value={formData.district || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Area (Sq Km)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                name="areaSqKm"
                                                value={formData.areaSqKm || 0}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Latitude</label>
                                            <input
                                                type="number"
                                                step="0.000001"
                                                name="latitude"
                                                value={formData.latitude || 0}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Longitude</label>
                                            <input
                                                type="number"
                                                step="0.000001"
                                                name="longitude"
                                                value={formData.longitude || 0}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Specific fields */}
                                {activeTab === 'birds' && (
                                    <div>
                                        <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Seasonality</label>
                                        <input
                                            type="text"
                                            name="seasonality"
                                            value={formData.seasonality || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                        />
                                    </div>
                                )}
                                {activeTab === 'fish' && (
                                    <div>
                                        <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Economic Value</label>
                                        <input
                                            type="text"
                                            name="economicValue"
                                            value={formData.economicValue || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                        />
                                    </div>
                                )}
                                {activeTab === 'flora' && (
                                    <div>
                                        <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Plant Type</label>
                                        <input
                                            type="text"
                                            name="plantType"
                                            value={formData.plantType || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                        />
                                    </div>
                                )}
                                {activeTab === 'insects' && (
                                    <div>
                                        <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Role in Ecosystem</label>
                                        <input
                                            type="text"
                                            name="roleInEcosystem"
                                            value={formData.roleInEcosystem || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all"
                                        />
                                    </div>
                                )}

                                {/* Image Upload 1 */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Main Photo (Image 1)</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-[#dde3e0] flex items-center justify-center overflow-hidden relative group">
                                            {formData.imageUrl ? (
                                                <>
                                                    <img src={formData.imageUrl.startsWith('/') ? formData.imageUrl : `/${formData.imageUrl}`} className="w-full h-full object-cover" alt="Preview 1" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                        <span className="text-white text-[10px] font-bold">Replace</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="material-symbols-outlined text-[#6a8174]/40 text-3xl">add_photo_alternate</span>
                                            )}
                                            {isUploading === 'imageUrl' && (
                                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                                    <div className="w-6 h-6 border-2 border-[#107060] border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <input
                                                type="file"
                                                id="image-upload-1"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'imageUrl')}
                                            />
                                            <label
                                                htmlFor="image-upload-1"
                                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#dde3e0] hover:border-[#107060] hover:text-[#107060] rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                                            >
                                                <span className="material-symbols-outlined text-sm">upload</span>
                                                {formData.imageUrl ? 'Change Photo 1' : 'Upload Desktop Photo'}
                                            </label>
                                            <p className="text-[10px] text-[#6a8174] mt-2 font-medium">PNG, JPG or WebP (Max 5MB). Photo will be saved to assets automatically.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload 2 */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Secondary Photo (Image 2)</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-[#dde3e0] flex items-center justify-center overflow-hidden relative group">
                                            {formData.imageUrl2 ? (
                                                <>
                                                    <img src={formData.imageUrl2.startsWith('/') ? formData.imageUrl2 : `/${formData.imageUrl2}`} className="w-full h-full object-cover" alt="Preview 2" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                        <span className="text-white text-[10px] font-bold">Replace</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="material-symbols-outlined text-[#6a8174]/40 text-3xl">add_photo_alternate</span>
                                            )}
                                            {isUploading === 'imageUrl2' && (
                                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                                    <div className="w-6 h-6 border-2 border-[#107060] border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <input
                                                type="file"
                                                id="image-upload-2"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'imageUrl2')}
                                            />
                                            <label
                                                htmlFor="image-upload-2"
                                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#dde3e0] hover:border-[#107060] hover:text-[#107060] rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                                            >
                                                <span className="material-symbols-outlined text-sm">upload</span>
                                                {formData.imageUrl2 ? 'Change Photo 2' : 'Upload Second Photo'}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload 3 (Wetlands Only) */}
                                {activeTab === 'wetlands' && (
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Third Photo (Optional)</label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-[#dde3e0] flex items-center justify-center overflow-hidden relative group">
                                                {formData.imageUrl3 ? (
                                                    <>
                                                        <img src={formData.imageUrl3.startsWith('/') ? formData.imageUrl3 : `/${formData.imageUrl3}`} className="w-full h-full object-cover" alt="Preview 3" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                            <span className="text-white text-[10px] font-bold">Replace</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span className="material-symbols-outlined text-[#6a8174]/40 text-3xl">add_photo_alternate</span>
                                                )}
                                                {isUploading === 'imageUrl3' && (
                                                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                                        <div className="w-6 h-6 border-2 border-[#107060] border-t-transparent rounded-full animate-spin"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <input
                                                    type="file"
                                                    id="image-upload-3"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'imageUrl3')}
                                                />
                                                <label
                                                    htmlFor="image-upload-3"
                                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#dde3e0] hover:border-[#107060] hover:text-[#107060] rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                                                >
                                                    <span className="material-symbols-outlined text-sm">upload</span>
                                                    {formData.imageUrl3 ? 'Change Photo 3' : 'Upload Third Photo (Optional)'}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Habitat Selection (Only for Species) */}
                                {activeTab !== 'wetlands' && (
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-[#6a8174] uppercase mb-3">Habitat (Select Wetlands where found)</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 rounded-xl border border-[#dde3e0] scrollbar-thin">
                                            {allWetlands.map(w => (
                                                <button
                                                    key={w.id}
                                                    type="button"
                                                    onClick={() => handleWetlandToggle(w.id)}
                                                    className={`flex items-center gap-2 p-2 rounded-lg text-[11px] font-bold transition-all text-left ${formData.wetlandIds?.includes(w.id)
                                                        ? "bg-[#107060] text-white shadow-sm"
                                                        : "bg-white text-[#6a8174] border border-[#dde3e0] hover:border-[#107060]"
                                                        }`}
                                                >
                                                    <span className="material-symbols-outlined text-sm">
                                                        {formData.wetlandIds?.includes(w.id) ? 'check_box' : 'check_box_outline_blank'}
                                                    </span>
                                                    <span className="truncate">{w.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-[#6a8174] uppercase mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-xl border border-[#dde3e0] focus:border-[#107060] focus:ring-1 focus:ring-[#107060] outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <button
                                    type="submit"
                                    className="flex-grow bg-[#107060] hover:bg-[#0c5a4d] text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-[#107060]/20 transition-all uppercase tracking-widest"
                                >
                                    {editingItem ? 'Update Changes' : 'Create Record'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 border border-[#dde3e0] text-[#6a8174] hover:bg-gray-50 rounded-xl text-sm font-bold transition-all uppercase tracking-widest"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default DataManager;
