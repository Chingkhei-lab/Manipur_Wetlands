import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
    const [activeTab, setActiveTab] = useState('admin'); // 'admin' or 'manager'
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:5171/api/managers/login', {
                email,
                password
            });

            if (!response.data?.token) {
                setError('No authentication token was returned by the server.');
                return;
            }

            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Login failed.');
            } else {
                setError('Unable to connect to server. Please ensure backend is running.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#107060] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
            {/* Background decorative elements optional */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 flex justify-between">
                <span className="material-symbols-outlined text-[40rem] text-white -mt-32 -ml-32">eco</span>
                <span className="material-symbols-outlined text-[30rem] text-white mt-64 -mr-32">water</span>
            </div>

            <div className="w-full max-w-md relative z-10 flex flex-col items-center">
                {/* Logo or Title above form optional */}
                <Link to="/" className="mb-8 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <div className="bg-white p-2 rounded-lg text-[#107060]">
                        <span className="material-symbols-outlined text-2xl">eco</span>
                    </div>
                    <div className="text-white">
                        <h1 className="text-xl font-extrabold leading-none tracking-tight uppercase">Manipur Wetlands</h1>
                        <p className="text-[10px] font-medium tracking-widest uppercase mt-0.5 opacity-80">Biodiversity Inventory</p>
                    </div>
                </Link>

                {/* Tabs */}
                <div className="flex w-full relative z-20 mb-6 gap-2 sm:gap-4 flex-row justify-center max-w-sm">
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`flex-1 font-bold text-sm py-3 px-4 rounded-xl transition-all duration-200 ${activeTab === 'admin'
                            ? 'bg-white text-[#107060] shadow-md'
                            : 'bg-[#0c594d] text-white/80 hover:bg-[#0e6154] hover:text-white'
                            }`}
                        type="button"
                    >
                        Admin
                    </button>
                    <button
                        onClick={() => setActiveTab('manager')}
                        className={`flex-1 font-bold text-sm py-3 px-4 rounded-xl transition-all duration-200 ${activeTab === 'manager'
                            ? 'bg-white text-[#107060] shadow-md'
                            : 'bg-[#0c594d] text-white/80 hover:bg-[#0e6154] hover:text-white'
                            }`}
                        type="button"
                    >
                        Manager
                    </button>
                </div>

                {/* Form Box */}
                <div className="bg-white shadow-[0_15px_50px_rgba(0,0,0,0.2)] p-8 sm:p-10 w-full relative z-10 rounded-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold border border-red-100 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">error</span>
                                {error}
                            </div>
                        )}
                        {/* Full Name Field (Manager Only) */}
                        {activeTab === 'manager' && (
                            <div>
                                <label className="block text-sm font-bold text-[#121614] mb-2">Full Name</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6a8174] text-lg pointer-events-none">person</span>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#dde3e0] bg-gray-50/50 text-sm outline-none focus:border-[#107060] focus:ring-1 focus:ring-[#107060] transition-colors"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-bold text-[#121614] mb-2">Email</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6a8174] text-lg pointer-events-none">mail</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={activeTab === 'admin' ? "admin@manipurwetlands.org" : "manager@manipurwetlands.org"}
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#dde3e0] bg-gray-50/50 text-sm outline-none focus:border-[#107060] focus:ring-1 focus:ring-[#107060] transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-[#121614]">Password</label>
                                {activeTab === 'manager' && (
                                    <a href="#" className="text-xs font-bold text-[#107060] hover:underline">Forgot Password?</a>
                                )}
                            </div>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6a8174] text-lg pointer-events-none">lock</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-11 py-3 rounded-lg border border-[#dde3e0] bg-gray-50/50 text-sm outline-none focus:border-[#107060] focus:ring-1 focus:ring-[#107060] transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6a8174] hover:text-[#107060] focus:outline-none flex items-center justify-center transition-colors px-1"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>



                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-[#107060] hover:bg-[#0c594d] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-[#107060]/30 transition-all text-sm"
                            >
                                Login
                            </button>
                        </div>

                        {/* Links section */}
                        <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col items-center gap-3 text-[13px] font-medium text-[#6a8174]">
                            {activeTab === 'manager' && (
                                <p>
                                    New Manager? <Link to="/manager-register" className="font-bold text-[#107060] hover:underline">Register Here</Link>
                                </p>
                            )}
                            <Link to="/" className="mt-4 text-xs font-bold text-[#107060] flex items-center gap-1 hover:underline">
                                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                                Return to Visitor View
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Footer outside container */}
                <div className="mt-12 text-center text-white/70 text-xs font-medium relative z-10">
                    <p>© 2024 Manipur Wetlands. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
