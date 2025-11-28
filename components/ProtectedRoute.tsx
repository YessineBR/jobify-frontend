"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

export function ProtectedRoute({
                                   children,
                                   requireAuth = true,
                                   redirectTo = '/signin',
                               }: ProtectedRouteProps) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && requireAuth && !isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, loading, requireAuth, redirectTo, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (requireAuth && !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}