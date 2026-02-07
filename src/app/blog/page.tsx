import Link from 'next/link';
import { getPublishedPosts } from '@/services/posts.public';
import PostCard from '@/components/blog/PostCard';
import type { Post } from '@/types/database';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPage() {
    let posts: Post[] = [];
    let error: string | null = null;

    try {
        const result = await getPublishedPosts({ limit: 12 });
        posts = result.posts;
    } catch (e) {
        console.error('Failed to load posts:', e);
        error = 'Unable to load blog posts. Please try again later.';
    }

    return (
        <div className="container py-20">
            {/* Page Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
                    Our Blog
                </h1>
                <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                    Insights, tutorials, and updates from the Kodingin team.
                </p>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center mb-8 backdrop-blur-sm">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {/* Empty State */}
            {!error && posts.length === 0 && (
                <div className="bg-[var(--bg-card)] rounded-2xl p-12 text-center border border-[var(--border-color)] backdrop-blur-sm">
                    <div className="text-6xl mb-6">📝</div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                        No posts yet
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                        We&apos;re working on some great content. Check back soon for updates!
                    </p>
                    <Link
                        href="/"
                        className="btn btn-primary"
                    >
                        Back to Home
                    </Link>
                </div>
            )}

            {/* Posts Grid */}
            {posts.length > 0 && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
