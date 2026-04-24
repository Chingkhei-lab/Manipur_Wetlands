import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('wetlands_user');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (e) {
                console.error("Error parsing stored user data");
            }
        }
        return null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('wetlands_token'));

    useEffect(() => {
        const interceptorId = axios.interceptors.request.use((config) => {
            const authToken = localStorage.getItem('wetlands_token');
            const requestUrl = typeof config.url === 'string' ? config.url : '';
            const isBackendRequest = requestUrl.startsWith('http://localhost:5171') || requestUrl.startsWith('/api/');

            if (authToken && isBackendRequest) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${authToken}`;
            }

            return config;
        });

        return () => {
            axios.interceptors.request.eject(interceptorId);
        };
    }, []);

    const login = (userData, jwtToken) => {
        setUser(userData);
        localStorage.setItem('wetlands_user', JSON.stringify(userData));
        if (jwtToken) {
            setToken(jwtToken);
            localStorage.setItem('wetlands_token', jwtToken);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('wetlands_user');
        localStorage.removeItem('wetlands_token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
