'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Post } from '@/types/database';
import { deletePostAction, togglePublishAction } from '@/actions/posts';

interface PostsTableProps {
    posts: Post[];
}

export default function PostsTable({ posts }: PostsTableProps) {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        setLoading(id);
        try {
            const result = await deletePostAction(id);
            if (!result.success) {
                alert(result.error);
            }
            router.refresh();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete post');
        } finally {
            setLoading(null);
        }
    };

    const handleTogglePublish = async (id: string, currentlyPublished: boolean) => {
        setLoading(id);
        try {
            const result = await togglePublishAction(id, !currentlyPublished);
            if (!result.success) {
                alert(result.error);
            }
            router.refresh();
        } catch (error) {
            console.error('Toggle publish error:', error);
            alert('Failed to update post status');
        } finally {
            setLoading(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[var(--border-color)] bg-[var(--bg-tertiary)]/30">
                            <th className="text-left px-6 py-5 text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Title</th>
                            <th className="text-left px-6 py-5 text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                            <th className="text-left px-6 py-5 text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Created</th>
                            <th className="text-right px-6 py-5 text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                        {posts.map((post) => (
                            <tr
                                key={post.id}
                                className={`hover:bg-[var(--bg-tertiary)]/50 transition-colors duration-200 ${loading === post.id ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                {/* Title */}
                                <td className="px-6 py-4">
                                    <div>
                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="text-[var(--text-primary)] font-medium hover:text-[var(--color-primary)] transition-colors text-lg"
                                        >
                                            {post.title}
                                        </Link>
                                        <p className="text-sm text-[var(--text-muted)] mt-1 font-mono">/{post.slug}</p>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleTogglePublish(post.id, post.published)}
                                        disabled={loading === post.id}
                                        className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm ${post.published
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                                            }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${post.published ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                                        {post.published ? 'Published' : 'Draft'}
                                    </button>
                                </td>

                                {/* Created Date */}
                                <td className="px-6 py-4 text-[var(--text-secondary)] text-sm">
                                    {formatDate(post.created_at)}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-3">
                                        {post.published && (
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                className="p-2 text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-all"
                                                title="View Live"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </Link>
                                        )}
                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="p-2 text-[var(--text-secondary)] hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                            title="Edit"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id, post.title)}
                                            disabled={loading === post.id}
                                            className="p-2 text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                            title="Delete"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
