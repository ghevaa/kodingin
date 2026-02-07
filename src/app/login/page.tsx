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
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-primary)]/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[var(--color-secondary)]/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md p-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-purple-600 shadow-lg shadow-purple-500/30 mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">Admin Login</h1>
                    <p className="text-[var(--text-secondary)]">Sign in to manage your content</p>
                </div>

                {/* Login Form wrapped in glass card */}
                <div className="bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--border-color)] rounded-2xl shadow-2xl p-1">
                    <div className="bg-[var(--bg-card)]/50 rounded-xl p-6 sm:p-8">
                        <Suspense fallback={<LoginFormSkeleton />}>
                            <LoginForm />
                        </Suspense>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center space-y-2">
                    <p className="text-sm text-[var(--text-muted)]">
                        Secure Access • Kodingin Admin
                    </p>
                </div>
            </div>
        </div>
    );
}
