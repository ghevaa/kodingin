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
        <div>
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Posts</h1>
                    <p className="text-[var(--text-secondary)]">Manage your blog posts</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary)]/90 hover:shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Post
                </Link>
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 backdrop-blur-sm flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!error && posts.length === 0 && (
                <div className="bg-[var(--bg-card)]/50 backdrop-blur-xl border border-[var(--border-color)] rounded-2xl p-12 text-center shadow-xl">
                    <div className="text-6xl mb-6 opacity-80 animate-bounce cursor-default">📝</div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                        No posts yet
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                        Get started by creating your first blog post. It will appear here once you've saved it.
                    </p>
                    <Link
                        href="/admin/posts/new"
                        className="inline-flex px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary)]/90 hover:shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Your First Post
                    </Link>
                </div>
            )}

            {/* Posts Table */}
            {posts.length > 0 && <PostsTable posts={posts} />}
        </div>
    );
}
