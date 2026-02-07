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
        <article className="group bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--color-primary)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 hover:-translate-y-1 backdrop-blur-sm">
            {/* Cover Image */}
            <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-video">
                {post.cover_image ? (
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-purple-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <span className="text-4xl opacity-50">📝</span>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Read Article
                    </span>
                </div>
            </Link>

            {/* Content */}
            <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span>
                    <time
                        dateTime={post.created_at}
                        className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
                    >
                        {formattedDate}
                    </time>
                </div>

                {/* Title */}
                <h2 className="mb-3">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="text-xl font-bold text-white hover:text-[var(--color-primary)] transition-colors line-clamp-2 leading-tight"
                    >
                        {post.title}
                    </Link>
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="text-[var(--text-secondary)] line-clamp-3 mb-6 text-sm leading-relaxed">
                        {post.excerpt}
                    </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-color)]/50">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary-light)] text-sm font-bold transition-colors group/link"
                    >
                        Read More
                        <svg
                            className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
