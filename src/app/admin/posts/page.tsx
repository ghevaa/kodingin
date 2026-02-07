import Link from 'next/link';
import { getAllPosts } from '@/services/posts';
import PostsTable from '@/components/admin/PostsTable';
import type { Post } from '@/types/database';

// Force dynamic rendering for auth-protected pages
export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
    let posts: Post[] = [];
    let error: string | null = null;

    try {
        const result = await getAllPosts({ limit: 100 });
        posts = result.posts;
    } catch (e) {
        console.error('Failed to load posts:', e);
        error = 'Unable to load posts. Please try again later.';
    }

    return (
        <div className="dashboard-container">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="dashboard-header mb-0">
                    <h1 className="dashboard-title">Posts</h1>
                    <p className="dashboard-subtitle">Manage your blog posts</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="action-btn primary"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Post
                </Link>
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 backdrop-blur-sm">
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!error && posts.length === 0 && (
                <div className="dashboard-card text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                        No posts yet
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-6">
                        Get started by creating your first blog post.
                    </p>
                    <Link
                        href="/admin/posts/new"
                        className="action-btn primary"
                    >
                        Create Your First Post
                    </Link>
                </div>
            )}

            {/* Posts Table */}
            {posts.length > 0 && <PostsTable posts={posts} />}
        </div>
    );
}
