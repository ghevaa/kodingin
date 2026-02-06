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
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back Link */}
            <Link
                href="/blog"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
            >
                <svg
                    className="w-5 h-5 mr-2"
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
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Post Header */}
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-400">
                    <time dateTime={post.created_at}>{formattedDate}</time>
                    {post.updated_at !== post.created_at && (
                        <span className="text-gray-500">• Updated</span>
                    )}
                </div>
            </header>

            {/* Excerpt */}
            {post.excerpt && (
                <p className="text-xl text-gray-300 mb-8 leading-relaxed border-l-4 border-purple-500 pl-4">
                    {post.excerpt}
                </p>
            )}

            {/* Post Content */}
            <div
                className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white 
          prose-p:text-gray-300 
          prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
          prose-strong:text-white
          prose-code:text-purple-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700
          prose-blockquote:border-purple-500 prose-blockquote:text-gray-300
          prose-img:rounded-xl
        "
            >
                {/* 
          For production, you'd want to use a Markdown renderer like:
          - react-markdown
          - @mdx-js/react
          - marked + dangerouslySetInnerHTML (with sanitization)
          
          For now, we'll render the content as pre-formatted text
        */}
                <div className="whitespace-pre-wrap">{post.content}</div>
            </div>

            {/* Post Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-800">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        ← More Articles
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400">Share:</span>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://kodingin.com/blog/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            Twitter
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://kodingin.com/blog/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </footer>
        </article>
    );
}
