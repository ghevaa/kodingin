'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Post } from '@/types/database';
import { createPostAction, updatePostAction } from '@/actions/posts';
import { generateSlug } from '@/lib/utils';

interface PostFormProps {
    post?: Post;
    mode: 'create' | 'edit';
}

export default function PostForm({ post, mode }: PostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState(post?.title ?? '');
    const [slug, setSlug] = useState(post?.slug ?? '');
    const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
    const [content, setContent] = useState(post?.content ?? '');
    const [coverImage, setCoverImage] = useState(post?.cover_image ?? '');
    const [published, setPublished] = useState(post?.published ?? false);
    const [autoSlug, setAutoSlug] = useState(mode === 'create');

    // Auto-generate slug from title
    useEffect(() => {
        if (autoSlug && title) {
            setSlug(generateSlug(title));
        }
    }, [title, autoSlug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('slug', slug);
            formData.append('excerpt', excerpt);
            formData.append('content', content);
            formData.append('cover_image', coverImage);
            formData.append('published', String(published));

            let result;
            if (mode === 'create') {
                result = await createPostAction(formData);
            } else if (post) {
                result = await updatePostAction(post.id, formData);
            }

            if (result && !result.success) {
                setError(result.error);
                return;
            }

            // Redirect to posts list on success
            router.push('/admin/posts');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    {error}
                </div>
            )}

            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Title <span className="text-red-400">*</span>
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter post title"
                />
            </div>

            {/* Slug */}
            <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
                    Slug <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">/blog/</span>
                        <input
                            id="slug"
                            type="text"
                            value={slug}
                            onChange={(e) => {
                                setSlug(e.target.value);
                                setAutoSlug(false);
                            }}
                            required
                            className="w-full pl-16 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="url-friendly-slug"
                        />
                    </div>
                    {mode === 'create' && (
                        <button
                            type="button"
                            onClick={() => setAutoSlug(!autoSlug)}
                            className={`px-4 py-3 rounded-lg border transition-colors ${autoSlug
                                ? 'bg-purple-600 border-purple-600 text-white'
                                : 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white'
                                }`}
                            title={autoSlug ? 'Auto-generating from title' : 'Click to auto-generate'}
                        >
                            Auto
                        </button>
                    )}
                </div>
            </div>

            {/* Excerpt */}
            <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
                    Excerpt
                </label>
                <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
                    placeholder="Brief summary of the post (optional)"
                />
            </div>

            {/* Content */}
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                    Content <span className="text-red-400">*</span>
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={15}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y font-mono text-sm"
                    placeholder="Write your post content here..."
                />
                <p className="mt-2 text-sm text-gray-500">
                    Tip: You can use plain text or Markdown formatting.
                </p>
            </div>

            {/* Cover Image */}
            <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-300 mb-2">
                    Cover Image URL
                </label>
                <input
                    id="coverImage"
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                />
                {coverImage && (
                    <div className="mt-3 relative aspect-video max-w-sm rounded-lg overflow-hidden border border-gray-700">
                        <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Published Toggle */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => setPublished(!published)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${published ? 'bg-purple-600' : 'bg-gray-700'
                        }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${published ? 'translate-x-6' : 'translate-x-1'
                            }`}
                    />
                </button>
                <label className="text-sm font-medium text-gray-300">
                    {published ? 'Published (visible to public)' : 'Draft (not visible)'}
                </label>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Saving...
                        </span>
                    ) : mode === 'create' ? (
                        'Create Post'
                    ) : (
                        'Update Post'
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/admin/posts')}
                    className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
