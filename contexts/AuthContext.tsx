"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI, User, LoginCredentials, RegisterCredentials } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    loginWithGoogle: (accessToken: string) => Promise<void>;
    loginWithLinkedIn: (accessToken: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check authentication on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                if (authAPI.isAuthenticated()) {
                    const cachedUser = authAPI.getCachedUser();
                    if (cachedUser) {
                        setUser(cachedUser);
                    } else {
                        // Fetch fresh user data
                        const userData = await authAPI.getCurrentUser();
                        setUser(userData);
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                // Token might be invalid, clear it
                await authAPI.logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authAPI.login(credentials);
            setUser(response.user);
        } catch (error) {
            throw error;
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        try {
            const response = await authAPI.register(credentials);
            setUser(response.user);
        } catch (error) {
            throw error;
        }
    };

    const loginWithGoogle = async (accessToken: string) => {
        try {
            const response = await authAPI.loginWithGoogle({ access_token: accessToken });
            setUser(response.user);
        } catch (error) {
            throw error;
        }
    };

    const loginWithLinkedIn = async (accessToken: string) => {
        try {
            const response = await authAPI.loginWithLinkedIn({ access_token: accessToken });
            setUser(response.user);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
            setUser(null);
            router.push('/signin');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const refreshUser = async () => {
        try {
            const userData = await authAPI.getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error('Refresh user error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                loginWithGoogle,
                loginWithLinkedIn,
                logout,
                refreshUser,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}