'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Post } from '@/types/database';
import { createPostAction, updatePostAction } from '@/actions/posts';
import { generateSlug } from '@/lib/utils';
import TiptapEditor from './TiptapEditor';

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
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-[var(--bg-card)]/50 backdrop-blur-xl border border-[var(--border-color)] rounded-2xl p-8 shadow-xl">
                {/* Error Message */}
                {error && (
                    <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                <div className="grid gap-8">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                            Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[var(--bg-tertiary)]/50 border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all backdrop-blur-sm"
                            placeholder="Enter post title"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label htmlFor="slug" className="block text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                            Slug <span className="text-red-400">*</span>
                        </label>
                        <div className="flex gap-3">
                            <div className="flex-1 relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-mono text-sm">/blog/</span>
                                <input
                                    id="slug"
                                    type="text"
                                    value={slug}
                                    onChange={(e) => {
                                        setSlug(e.target.value);
                                        setAutoSlug(false);
                                    }}
                                    required
                                    className="w-full pl-16 pr-4 py-3 bg-[var(--bg-tertiary)]/50 border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all backdrop-blur-sm font-mono text-sm"
                                    placeholder="url-friendly-slug"
                                />
                            </div>
                            {mode === 'create' && (
                                <button
                                    type="button"
                                    onClick={() => setAutoSlug(!autoSlug)}
                                    className={`px-4 py-2 rounded-xl border transition-all font-medium text-sm flex items-center gap-2 ${autoSlug
                                        ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)] text-[var(--color-primary)]'
                                        : 'bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }`}
                                    title={autoSlug ? 'Auto-generating from title' : 'Click to auto-generate'}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Auto
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                            Excerpt
                        </label>
                        <textarea
                            id="excerpt"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-[var(--bg-tertiary)]/50 border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-y transition-all backdrop-blur-sm"
                            placeholder="Brief summary of the post (optional)"
                        />
                    </div>



                    {/* Content */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                            Content <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <TiptapEditor
                                content={content}
                                onChange={setContent}
                            />
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label htmlFor="coverImage" className="block text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                            Cover Image URL
                        </label>
                        <div className="flex gap-6 items-start">
                            <div className="flex-1">
                                <input
                                    id="coverImage"
                                    type="url"
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)]/50 border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all backdrop-blur-sm"
                                    placeholder="https://example.com/image.jpg"
                                />
                                <p className="mt-2 text-sm text-[var(--text-muted)]">
                                    Provide a direct URL to your cover image.
                                </p>
                            </div>
                            {coverImage && (
                                <div className="relative w-40 aspect-video rounded-lg overflow-hidden border border-[var(--border-color)] shadow-lg bg-[var(--bg-tertiary)]">
                                    <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Published Toggle */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)]/30 border border-[var(--border-color)]">
                        <button
                            type="button"
                            onClick={() => setPublished(!published)}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-card)] ${published ? 'bg-[var(--color-success)]' : 'bg-[var(--bg-tertiary)] border border-[var(--text-muted)]'
                                }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${published ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                        <div>
                            <span className="block text-sm font-medium text-[var(--text-primary)]">
                                {published ? 'Published' : 'Draft'}
                            </span>
                            <span className="block text-xs text-[var(--text-muted)]">
                                {published ? 'This post will be visible to everyone.' : 'This post is hidden from the public.'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-8 mt-8 border-t border-[var(--border-color)]">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-[var(--color-primary)]/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {mode === 'create' ? 'Create Post' : 'Update Post'}
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/admin/posts')}
                        className="px-6 py-3 rounded-xl border border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-tertiary)] transition-all flex items-center gap-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}
