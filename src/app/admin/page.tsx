import Link from 'next/link';
import { getPostStats } from '@/services/posts';

// Force dynamic rendering for auth-protected pages
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    let stats = { total: 0, published: 0, drafts: 0 };
    let error = null;

    try {
        stats = await getPostStats();
    } catch (e) {
        console.error('Failed to load stats:', e);
        error = 'Unable to load statistics';
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-[var(--text-secondary)]">Welcome back to your command center</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-[var(--text-muted)] px-3 py-1 rounded-full bg-white/5 border border-white/5">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Posts */}
                <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]/50 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-24 h-24 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-[var(--text-secondary)] font-medium mb-1">Total Posts</p>
                        <h3 className="text-4xl font-bold text-white">{stats.total}</h3>
                    </div>
                </div>

                {/* Published */}
                <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]/50 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-24 h-24 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-500 border border-emerald-500/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-[var(--text-secondary)] font-medium mb-1">Published</p>
                        <h3 className="text-4xl font-bold text-white">{stats.published}</h3>
                    </div>
                </div>

                {/* Drafts */}
                <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]/50 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-24 h-24 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 text-amber-500 border border-amber-500/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <p className="text-[var(--text-secondary)] font-medium mb-1">Drafts</p>
                        <h3 className="text-4xl font-bold text-white">{stats.drafts}</h3>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]/50 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/admin/posts/new"
                        className="group flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="font-semibold text-[var(--text-primary)]">New Post</span>
                        <span className="text-sm text-[var(--text-secondary)]">Write a new article</span>
                    </Link>

                    <Link
                        href="/admin/posts"
                        className="group flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/5 transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <span className="font-semibold text-[var(--text-primary)]">Manage Posts</span>
                        <span className="text-sm text-[var(--text-secondary)]">View and edit all posts</span>
                    </Link>

                    <Link
                        href="/blog"
                        target="_blank"
                        className="group flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-emerald-500 hover:bg-emerald-500/5 transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                        <span className="font-semibold text-[var(--text-primary)]">View Live Blog</span>
                        <span className="text-sm text-[var(--text-secondary)]">See how it looks</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
