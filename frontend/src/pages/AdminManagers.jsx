import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AdminManagers = () => {
    const { user } = useAuth();
    const [managers, setManagers] = useState([]);
    const [generatedCode, setGeneratedCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch managers directory
    useEffect(() => {
        const fetchManagers = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:5171/api/managers/list');
                setManagers(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching managers:", err);
                setError("Could not load managers list.");
            } finally {
                setIsLoading(false);
            }
        };

        if (user && user.role === 'admin') {
            fetchManagers();
        }
    }, [user]);

    // If not admin, redirect
    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    const handleGenerateCode = async () => {
        try {
            const response = await axios.post('http://localhost:5171/api/managers/generate-code');
            setGeneratedCode(response.data.code);
            // Optionally, we could show how long it is valid for from response.data.expiresInSeconds
        } catch (err) {
            console.error("Error generating code:", err);
            alert("Failed to generate registration code.");
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await axios.put(`http://localhost:5171/api/managers/${id}/toggle-status`);
            // Refresh list
            const response = await axios.get('http://localhost:5171/api/managers/list');
            setManagers(response.data);
        } catch (err) {
            console.error("Error toggling manager status:", err);
            alert("Failed to update manager status.");
        }
    };

    const handleDeleteManager = async (id) => {
        if (!window.confirm("Are you sure you want to PERMANENTLY remove this manager account? This action cannot be undone.")) return;

        try {
            await axios.delete(`http://localhost:5171/api/managers/${id}`);
            // Refresh list
            const response = await axios.get('http://localhost:5171/api/managers/list');
            setManagers(response.data);
        } catch (err) {
            console.error("Error deleting manager:", err);
            alert("Failed to remove manager account.");
        }
    };

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-[#121614] dark:text-white antialiased min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-primary mb-1">Manager Administration</h1>
                        <p className="text-sm font-medium text-[#6a8174]">Generate registration codes and oversee authorized manager accounts.</p>
                    </div>
                    <button
                        onClick={handleGenerateCode}
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 flex-shrink-0"
                    >
                        <span className="material-symbols-outlined text-lg">vpn_key</span>
                        Generate Registration Code
                    </button>
                </div>

                {generatedCode && (
                    <div className="bg-green-50 border border-green-200 p-6 rounded-xl mb-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-[fade_0.3s_ease-in-out]">
                        <div>
                            <h3 className="text-green-800 font-bold mb-1 flex items-center gap-2">
                                <span className="material-symbols-outlined">check_circle</span>
                                New Registration Code Generated
                            </h3>
                            <p className="text-sm text-green-700">Share this code securely with the new manager. It is <strong>valid for 5 minutes</strong>.</p>
                        </div>
                        <div className="bg-white px-6 py-3 rounded-lg border border-green-300 shadow-inner flex items-center gap-3">
                            <code className="text-2xl font-mono font-extrabold text-primary tracking-wider">{generatedCode}</code>
                            <button
                                onClick={() => navigator.clipboard.writeText(generatedCode)}
                                className="text-gray-400 hover:text-primary transition-colors p-1"
                                title="Copy to clipboard"
                            >
                                <span className="material-symbols-outlined">content_copy</span>
                            </button>
                        </div>
                    </div>
                )}

                <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl border border-[#dde3e0] overflow-hidden">
                    <div className="p-6 border-b border-[#dde3e0] bg-gray-50/50 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[#121614] flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">groups</span>
                            Active Managers Directory
                        </h2>
                        <span className="bg-primary/10 text-primary text-xs font-extrabold px-3 py-1 rounded-full">
                            {isLoading ? "..." : `${managers.length} Users`}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#107060]/5 text-[#6a8174] uppercase text-xs font-extrabold tracking-widest border-b border-[#dde3e0]">
                                <tr>
                                    <th className="px-6 py-4">Manager Info</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date Joined</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#dde3e0]">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-20 text-center">
                                            <div className="flex justify-center flex-col items-center gap-2">
                                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-[#6a8174] font-medium">Loading directory...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-red-500 font-medium">
                                            {error}
                                        </td>
                                    </tr>
                                ) : managers.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-[#6a8174]">
                                            No managers have been registered yet.
                                        </td>
                                    </tr>
                                ) : (
                                    managers.map(manager => (
                                        <tr key={manager.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold uppercase">
                                                        {manager.fullName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-[#121614]">{manager.fullName}</p>
                                                        <p className="text-xs text-[#6a8174]">{manager.email}</p>
                                                        <p className="text-[10px] text-primary font-mono mt-0.5 font-bold uppercase tracking-widest">
                                                            Code: {manager.registrationCode || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {manager.isActive ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-100 uppercase tracking-wider">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                        Authorized
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-100 uppercase tracking-wider">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                        Revoked
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-[#6a8174] font-medium">
                                                {new Date(manager.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleStatus(manager.id)}
                                                        className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${manager.isActive
                                                                ? "bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white"
                                                                : "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                                                            }`}
                                                        title={manager.isActive ? "Revoke Access" : "Authorize Access"}
                                                    >
                                                        <span className="material-symbols-outlined text-sm">
                                                            {manager.isActive ? 'block' : 'verified_user'}
                                                        </span>
                                                        {manager.isActive ? 'Revoke' : 'Authorize'}
                                                    </button>

                                                    <button
                                                        onClick={() => handleDeleteManager(manager.id)}
                                                        className="inline-flex items-center justify-center p-1.5 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-colors border border-transparent hover:border-red-600"
                                                        title="Delete Permanently"
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
            <Footer />
        </div>
    );
};

export default AdminManagers;
