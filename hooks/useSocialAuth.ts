"use client";

import {useState} from 'react';
import {useAuth} from '@/contexts/AuthContext';

declare global {
    interface Window {
        google?: never;
        linkedin?: never;
    }
}

export function useGoogleAuth() {
    const [loading, setLoading] = useState(false);
    const {loginWithGoogle} = useAuth();

    const initGoogleAuth = () => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            // Initialize Google Sign-In
            if (!window.google) {
                initGoogleAuth();
                // Wait a bit for script to load
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            // Create a one-tap prompt
            const client = window.google.accounts.oauth2.initTokenClient({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                scope: 'profile email',
                callback: async (response: any) => {
                    try {
                        if (response.access_token) {
                            await loginWithGoogle(response.access_token);
                        }
                    } catch (error) {
                        console.error('Google login error:', error);
                        throw error;
                    } finally {
                        setLoading(false);
                    }
                },
            });

            client.requestAccessToken();
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    return {handleGoogleLogin, loading};
}

export function useLinkedInAuth() {
    const [loading, setLoading] = useState(false);
    const {loginWithLinkedIn} = useAuth();

    const handleLinkedInLogin = async () => {
        setLoading(true);
        try {
            const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!;
            const redirectUri = encodeURIComponent(
                `${window.location.origin}/auth/linkedin/callback`
            );
            const state = Math.random().toString(36).substring(7);
            const scope = encodeURIComponent('openid profile email');

            // Store state for verification
            sessionStorage.setItem('linkedin_state', state);

            // Redirect to LinkedIn OAuth
            const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

            window.location.href = authUrl;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const handleLinkedInCallback = async (code: string, state: string) => {
        setLoading(true);
        try {
            // Verify state
            const savedState = sessionStorage.getItem('linkedin_state');
            if (state !== savedState) {
                throw new Error('Invalid state parameter');
            }

            // Exchange code for access token via your backend
            await loginWithLinkedIn(code);
        } catch (error) {
            console.error('LinkedIn login error:', error);
            throw error;
        } finally {
            setLoading(false);
            sessionStorage.removeItem('linkedin_state');
        }
    };

    return {handleLinkedInLogin, handleLinkedInCallback, loading};
}