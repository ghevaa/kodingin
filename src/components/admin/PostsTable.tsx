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
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-700/50">
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Title</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Created</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                        {posts.map((post) => (
                            <tr
                                key={post.id}
                                className={`hover:bg-gray-700/30 transition-colors ${loading === post.id ? 'opacity-50' : ''}`}
                            >
                                {/* Title */}
                                <td className="px-6 py-4">
                                    <div>
                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="text-white font-medium hover:text-purple-400 transition-colors"
                                        >
                                            {post.title}
                                        </Link>
                                        <p className="text-sm text-gray-500 mt-1">/{post.slug}</p>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleTogglePublish(post.id, post.published)}
                                        disabled={loading === post.id}
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${post.published
                                                ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                                            }`}
                                    >
                                        {post.published ? 'Published' : 'Draft'}
                                    </button>
                                </td>

                                {/* Created Date */}
                                <td className="px-6 py-4 text-gray-400 text-sm">
                                    {formatDate(post.created_at)}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        {post.published && (
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </Link>
                                        )}
                                        <Link
                                            href={`/admin/posts/${post.id}/edit`}
                                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id, post.title)}
                                            disabled={loading === post.id}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
