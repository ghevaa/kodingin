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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
                    <p className="text-gray-400">Sign in to manage your blog</p>
                </div>

                {/* Login Form wrapped in Suspense for useSearchParams */}
                <Suspense fallback={<LoginFormSkeleton />}>
                    <LoginForm />
                </Suspense>

                {/* Setup Instructions */}
                <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                    <p className="text-sm text-gray-500 text-center">
                        Create an account in your Supabase Dashboard under Authentication → Users
                    </p>
                </div>
            </div>
        </div>
    );
}
