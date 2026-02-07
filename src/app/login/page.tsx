import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';

function LoginFormSkeleton() {
    return (
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 animate-pulse">
            <div className="mb-6">
                <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
                <div className="h-12 bg-gray-900 rounded-lg" />
            </div>
            <div className="mb-6">
                <div className="h-4 w-20 bg-gray-700 rounded mb-2" />
                <div className="h-12 bg-gray-900 rounded-lg" />
            </div>
            <div className="h-12 bg-purple-600/50 rounded-lg" />
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
            <div className="w-full max-w-md p-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="dashboard-title text-3xl mb-2">Admin Login</h1>
                    <p className="dashboard-subtitle">Sign in to manage your blog</p>
                </div>

                {/* Login Form wrapped in Suspense for useSearchParams */}
                <div className="dashboard-card shadow-2xl">
                    <Suspense fallback={<LoginFormSkeleton />}>
                        <LoginForm />
                    </Suspense>
                </div>

                {/* Setup Instructions */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-[var(--text-muted)]">
                        Create an account in your Supabase Dashboard under Authentication → Users
                    </p>
                </div>
            </div>
        </div>
    );
}
