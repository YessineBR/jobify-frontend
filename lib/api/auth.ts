const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password1: string;
    password2: string;
    first_name?: string;
    last_name?: string;
}

export interface SocialAuthCredentials {
    access_token?: string;
    code?: string;
}

class AuthAPI {
    private getHeaders(includeAuth: boolean = false): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (includeAuth) {
            const token = this.getAccessToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return headers;
    }

    private getAccessToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('access_token');
    }

    private getRefreshToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('refresh_token');
    }

    private setTokens(access: string, refresh: string): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    }

    private clearTokens(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || error.non_field_errors?.[0] || 'Login failed');
        }

        const data: AuthResponse = await response.json();
        this.setTokens(data.access, data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    }

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/api/auth/registration/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(
                error.email?.[0] ||
                error.password1?.[0] ||
                error.non_field_errors?.[0] ||
                'Registration failed'
            );
        }

        const data: AuthResponse = await response.json();
        this.setTokens(data.access, data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    }

    async loginWithGoogle(credentials: SocialAuthCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/api/auth/google/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Google login failed');
        }

        const data: AuthResponse = await response.json();
        this.setTokens(data.access, data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    }

    async loginWithLinkedIn(credentials: SocialAuthCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/api/auth/linkedin/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'LinkedIn login failed');
        }

        const data: AuthResponse = await response.json();
        this.setTokens(data.access, data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    }

    async logout(): Promise<void> {
        try {
            await fetch(`${API_BASE_URL}/api/auth/logout/`, {
                method: 'POST',
                headers: this.getHeaders(true),
            });
        } finally {
            this.clearTokens();
        }
    }

    async getCurrentUser(): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/api/auth/user/`, {
            headers: this.getHeaders(true),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        const user: User = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }

    async updateUser(userData: Partial<User>): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/api/auth/user/`, {
            method: 'PATCH',
            headers: this.getHeaders(true),
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Update failed');
        }

        const user: User = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }

    async refreshToken(): Promise<string> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            this.clearTokens();
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        this.setTokens(data.access, this.getRefreshToken()!);
        return data.access;
    }

    async verifyToken(): Promise<boolean> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/token/verify/`, {
                method: 'POST',
                headers: this.getHeaders(true),
            });
            return response.ok;
        } catch {
            return false;
        }
    }

    async changePassword(oldPassword: string, newPassword: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/api/auth/password/change/`, {
            method: 'POST',
            headers: this.getHeaders(true),
            body: JSON.stringify({
                old_password: oldPassword,
                new_password1: newPassword,
                new_password2: newPassword,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(
                error.old_password?.[0] ||
                error.new_password1?.[0] ||
                'Password change failed'
            );
        }
    }

    async requestPasswordReset(email: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/api/auth/password/reset/`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.email?.[0] || 'Password reset request failed');
        }
    }

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }

    getCachedUser(): User | null {
        if (typeof window === 'undefined') return null;
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
}

export const authAPI = new AuthAPI();