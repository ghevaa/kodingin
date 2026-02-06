import Link from 'next/link';
import type { Post } from '@/types/database';

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <article className="group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            {/* Cover Image */}
            {post.cover_image ? (
                <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-video overflow-hidden">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </Link>
            ) : (
                <Link href={`/blog/${post.slug}`} className="block">
                    <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                        <span className="text-4xl">📄</span>
                    </div>
                </Link>
            )}

            {/* Content */}
            <div className="p-6">
                {/* Date */}
                <time
                    dateTime={post.created_at}
                    className="text-sm text-gray-400"
                >
                    {formattedDate}
                </time>

                {/* Title */}
                <h2 className="mt-2 mb-3">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="text-xl font-semibold text-white hover:text-purple-400 transition-colors line-clamp-2"
                    >
                        {post.title}
                    </Link>
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="text-gray-400 line-clamp-3 mb-4">
                        {post.excerpt}
                    </p>
                )}

                {/* Read More */}
                <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                    Read More
                    <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
        </article>
    );
}
