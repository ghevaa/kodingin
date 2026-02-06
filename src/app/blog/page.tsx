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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Our Blog
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Insights, tutorials, and updates from the Kodingin team.
                </p>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center mb-8">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {/* Empty State */}
            {!error && posts.length === 0 && (
                <div className="bg-gray-800/50 rounded-xl p-12 text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h2 className="text-2xl font-semibold text-white mb-2">
                        No posts yet
                    </h2>
                    <p className="text-gray-400 mb-6">
                        We&apos;re working on some great content. Check back soon!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
