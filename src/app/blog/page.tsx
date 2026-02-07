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
        <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-primary)]/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[var(--color-secondary)]/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container relative z-10 py-24">
                {/* Page Header */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-sm font-medium tracking-wide">
                        Latest Updates
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 mb-6 tracking-tight">
                        Our Blog
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                        Insights, tutorials, and updates from the Kodingin team.
                        <br />Everything you need to build better software.
                    </p>
                </div>

                {/* Error State */}
                {error && (
                    <div className="max-w-2xl mx-auto bg-red-500/5 border border-red-500/20 rounded-2xl p-8 text-center backdrop-blur-md">
                        <p className="text-red-400 font-medium">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!error && posts.length === 0 && (
                    <div className="max-w-md mx-auto bg-[var(--bg-card)] rounded-3xl p-12 text-center border border-[var(--border-color)] backdrop-blur-xl shadow-2xl">
                        <div className="text-6xl mb-6 opacity-80">📝</div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                            No posts yet
                        </h2>
                        <p className="text-[var(--text-secondary)] mb-8">
                            We&apos;re crafting some amazing content. Stay tuned!
                        </p>
                        <Link
                            href="/"
                            className="btn btn-primary w-full justify-center"
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
        </div>
    );
}
