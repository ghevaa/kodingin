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
        <div className="dashboard-container">
            {/* Page Header */}
            <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">Welcome to your blog admin panel</p>
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="dashboard-stats-grid">
                {/* Total Posts */}
                <div className="dashboard-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Total Posts</p>
                            <p className="stat-value">{stats.total}</p>
                        </div>
                        <div className="stat-icon purple">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Published */}
                <div className="dashboard-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Published</p>
                            <p className="stat-value text-[#22c55e]">{stats.published}</p>
                        </div>
                        <div className="stat-icon green">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Drafts */}
                <div className="dashboard-card">
                    <div className="stat-header">
                        <div>
                            <p className="stat-label">Drafts</p>
                            <p className="stat-value text-[#fbbf24]">{stats.drafts}</p>
                        </div>
                        <div className="stat-icon yellow">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Quick Actions</h2>
                <div className="quick-actions-grid">
                    <Link
                        href="/admin/posts/new"
                        className="action-btn primary"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Post
                    </Link>
                    <Link
                        href="/admin/posts"
                        className="action-btn secondary"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        View All Posts
                    </Link>
                    <Link
                        href="/blog"
                        target="_blank"
                        className="action-btn secondary"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}
