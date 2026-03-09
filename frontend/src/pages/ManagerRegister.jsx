import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManagerRegister = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerCode, setRegisterCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5171/api/managers/register', {
                fullName,
                email,
                password,
                code: registerCode
            });

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            console.error("Registration error:", err);
            const message = err.response?.data?.message || "Registration failed. Please check your code and try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#107060] flex flex-col justify-center items-center px-4 py-12">
                <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
                    <span className="material-symbols-outlined text-6xl text-green-500 mb-4 animate-bounce">check_circle</span>
                    <h2 className="text-2xl font-bold text-[#121614] mb-2">Registration Successful!</h2>
                    <p className="text-[#6a8174] mb-6">Your manager account has been created. Redirecting to login...</p>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#107060] h-full animate-[progress_3s_linear]"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#107060] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 flex justify-between">
                <span className="material-symbols-outlined text-[40rem] text-white -mt-32 -ml-32">eco</span>
                <span className="material-symbols-outlined text-[30rem] text-white mt-64 -mr-32">water</span>
            </div>

            <div className="w-full max-w-md relative z-10 flex flex-col items-center">
                <Link to="/" className="mb-8 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <div className="bg-white p-2 rounded-lg text-[#107060]">
                        <span className="material-symbols-outlined text-2xl">eco</span>
                    </div>
                    <div className="text-white">
                        <h1 className="text-xl font-extrabold leading-none tracking-tight uppercase">Manipur Wetlands</h1>
                        <p className="text-[10px] font-medium tracking-widest uppercase mt-0.5 opacity-80">Manager Registration</p>
                    </div>
                </Link>

                <div className="bg-white shadow-[0_15px_50px_rgba(0,0,0,0.2)] p-8 sm:p-10 w-full relative z-10 rounded-2xl">
                    <h2 className="text-2xl font-extrabold text-[#121614] mb-6 text-center">Manager Sign Up</h2>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start gap-3">
                            <span className="material-symbols-outlined text-red-500 text-xl">error</span>
                            <p className="text-xs text-red-700 font-medium leading-relaxed">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">
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
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#121614] mb-2">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6a8174] text-lg pointer-events-none">mail</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="manager@manipurwetlands.org"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#dde3e0] bg-gray-50/50 text-sm outline-none focus:border-[#107060] focus:ring-1 focus:ring-[#107060] transition-colors"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#121614] mb-2">Register Code <span className="text-xs font-normal text-[#6a8174] ml-1">(Provided by Admin)</span></label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6a8174] text-lg pointer-events-none">key</span>
                                <input
                                    type="text"
                                    value={registerCode}
                                    onChange={(e) => setRegisterCode(e.target.value)}
                                    placeholder="MGR-XXXXXX"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#dde3e0] bg-gray-50/50 text-sm outline-none focus:border-[#107060] focus:ring-1 focus:ring-[#107060] transition-colors font-mono"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-[#121614] mb-2">Password</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6a8174] text-lg pointer-events-none">lock</span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-11 py-3 rounded-lg border border-[#dde3e0] bg-gray-50/50 text-sm outline-none focus:border-[#107060] focus:ring-1 focus:ring-[#107060] transition-colors"
                                        required
                                        disabled={isLoading}
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
                            <div>
                                <label className="block text-sm font-bold text-[#121614] mb-2">Confirm</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6a8174] text-lg pointer-events-none">lock_reset</span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#dde3e0] bg-gray-50/50 text-sm outline-none focus:border-[#107060] focus:ring-1 focus:ring-[#107060] transition-colors"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-[#107060] hover:bg-[#0c594d] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-[#107060]/30 transition-all text-sm flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating Account...
                                    </>
                                ) : (
                                    "Register Account"
                                )}
                            </button>
                        </div>

                        <div className="pt-4 flex flex-col items-center gap-3 text-[13px] font-medium text-[#6a8174]">
                            <p>
                                Already have an account? <Link to="/login" className="font-bold text-[#107060] hover:underline">Log in</Link>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="mt-12 text-center text-white/70 text-xs font-medium relative z-10">
                    <p>© 2024 Manipur Wetlands. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default ManagerRegister;
