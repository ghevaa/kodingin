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
        <article className="blog-card group">
            {/* Cover Image */}
            <Link href={`/blog/${post.slug}`} className="blog-card-image">
                {post.cover_image ? (
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="blog-image-placeholder">
                        <span className="text-4xl opacity-50">📝</span>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Read Article
                    </span>
                </div>
            </Link>

            {/* Content */}
            <div className="blog-card-content">
                {/* Date */}
                <div className="blog-card-date">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span>
                    <time dateTime={post.created_at}>
                        {formattedDate}
                    </time>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`} className="block">
                    <h2 className="blog-card-title">
                        {post.title}
                    </h2>
                </Link>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="blog-card-excerpt">
                        {post.excerpt}
                    </p>
                )}

                {/* Footer */}
                <div className="blog-card-footer">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="blog-card-link"
                    >
                        Read More
                        <svg
                            className="w-4 h-4"
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
