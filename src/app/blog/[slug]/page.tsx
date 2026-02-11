import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getPublishedPosts } from '@/services/posts.public';

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static paths for popular posts
export async function generateStaticParams() {
    try {
        const { posts } = await getPublishedPosts({ limit: 10 });
        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch {
        return [];
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found - Kodingin Blog',
        };
    }

    return {
        title: `${post.title} - Kodingin Blog`,
        description: post.excerpt || post.content.slice(0, 160),
        openGraph: {
            title: post.title,
            description: post.excerpt || post.content.slice(0, 160),
            type: 'article',
            publishedTime: post.created_at,
            modifiedTime: post.updated_at,
            images: post.cover_image ? [post.cover_image] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <article className="blog-article-container">
                {/* Glass Container */}
                <div className="blog-article-card">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-[var(--color-primary-light)] hover:text-[var(--color-primary)] mb-8 transition-colors group"
                    >
                        <svg
                            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Blog
                    </Link>

                    {/* Cover Image */}
                    {post.cover_image && (
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg border border-[var(--border-color)] group">
                            <img
                                src={post.cover_image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/50 to-transparent pointer-events-none"></div>
                        </div>
                    )}

                    {/* Post Header */}
                    <header className="mb-10 text-center">
                        <div className="inline-block mb-6">
                            <span className="px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-sm font-medium tracking-wide">
                                Blog Post
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-[var(--text-secondary)] text-sm md:text-base border-t border-b border-[var(--border-color)]/50 py-4 max-w-lg mx-auto">
                            <time dateTime={post.created_at} className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formattedDate}
                            </time>
                            {post.updated_at !== post.created_at && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]"></span>
                                    <span>Updated</span>
                                </>
                            )}
                        </div>
                    </header>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 leading-relaxed border-l-4 border-[var(--color-primary)] pl-6 italic bg-[var(--bg-tertiary)]/30 py-4 rounded-r-xl">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Post Content */}
                    <div className="prose prose-invert prose-lg max-w-none
                        prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                        prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
                        prose-a:text-[var(--color-primary-light)] prose-a:no-underline hover:prose-a:text-[var(--color-primary)] prose-a:transition-colors
                        prose-strong:text-white prose-strong:font-semibold
                        prose-code:text-[var(--color-primary-light)] prose-code:bg-[var(--bg-tertiary)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-[var(--border-color)]
                        prose-pre:bg-[#0d0d12] prose-pre:border prose-pre:border-[var(--border-color)] prose-pre:rounded-xl prose-pre:shadow-lg
                        prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-primary)] prose-blockquote:text-[var(--text-secondary)] prose-blockquote:bg-[var(--bg-tertiary)]/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                        prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-[var(--border-color)]/50
                        prose-li:text-[var(--text-secondary)] prose-li:marker:text-[var(--color-primary)]
                        prose-hr:border-[var(--border-color)]
                    ">
                        <div className="whitespace-pre-wrap">{post.content}</div>
                    </div>

                    {/* Post Footer */}
                    <footer className="mt-16 pt-10 border-t border-[var(--border-color)]">
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <Link
                                href="/blog"
                                className="px-6 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 font-medium"
                            >
                                ← More Articles
                            </Link>
                            <div className="flex items-center gap-4">
                                <span className="text-[var(--text-muted)] font-medium">Share this post:</span>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://kodingin.com/blog/${post.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all duration-300"
                                    aria-label="Share on Twitter"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://kodingin.com/blog/${post.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300"
                                    aria-label="Share on LinkedIn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </article>
        </div>
    );
}
