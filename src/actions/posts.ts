'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import {
    createPost,
    updatePost,
    deletePost,
    togglePublishPost,
    generateSlug,
} from '@/services/posts';
import type { PostInsert, PostUpdate } from '@/types/database';

/**
 * Server Actions for Posts
 * Handle form submissions with proper revalidation.
 */

export type ActionResult<T = void> =
    | { success: true; data: T }
    | { success: false; error: string };

/**
 * Create a new post.
 */
export async function createPostAction(
    formData: FormData
): Promise<ActionResult<{ id: string; slug: string }>> {
    try {
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const excerpt = formData.get('excerpt') as string | null;
        const coverImage = formData.get('cover_image') as string | null;
        const published = formData.get('published') === 'true';

        // Generate slug from title or use provided slug
        const slug = (formData.get('slug') as string) || generateSlug(title);

        if (!title || !content) {
            return { success: false, error: 'Title and content are required' };
        }

        const postData: PostInsert = {
            title,
            slug,
            content,
            excerpt: excerpt || null,
            cover_image: coverImage || null,
            published,
        };

        const post = await createPost(postData);

        // Revalidate caches
        revalidatePath('/blog');
        revalidatePath('/admin/posts');
        revalidateTag('posts', { expire: 0 });

        return { success: true, data: { id: post.id, slug: post.slug } };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create post';
        return { success: false, error: message };
    }
}

/**
 * Update an existing post.
 */
export async function updatePostAction(
    id: string,
    formData: FormData
): Promise<ActionResult<{ slug: string }>> {
    try {
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const excerpt = formData.get('excerpt') as string | null;
        const coverImage = formData.get('cover_image') as string | null;
        const published = formData.get('published') === 'true';
        const slug = formData.get('slug') as string;

        if (!title || !content || !slug) {
            return { success: false, error: 'Title, slug, and content are required' };
        }

        const updates: PostUpdate = {
            title,
            slug,
            content,
            excerpt: excerpt || null,
            cover_image: coverImage || null,
            published,
        };

        const post = await updatePost(id, updates);

        // Revalidate caches
        revalidatePath('/blog');
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath('/admin/posts');
        revalidatePath(`/admin/posts/${id}/edit`);
        revalidateTag('posts', { expire: 0 });

        return { success: true, data: { slug: post.slug } };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update post';
        return { success: false, error: message };
    }
}

/**
 * Delete a post.
 */
export async function deletePostAction(id: string): Promise<ActionResult> {
    try {
        await deletePost(id);

        // Revalidate caches
        revalidatePath('/blog');
        revalidatePath('/admin/posts');
        revalidateTag('posts', { expire: 0 });

        return { success: true, data: undefined };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete post';
        return { success: false, error: message };
    }
}

/**
 * Toggle published status of a post.
 */
export async function togglePublishAction(
    id: string,
    publish: boolean
): Promise<ActionResult> {
    try {
        const post = await togglePublishPost(id, publish);

        // Revalidate caches
        revalidatePath('/blog');
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath('/admin/posts');
        revalidateTag('posts', { expire: 0 });

        return { success: true, data: undefined };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update post status';
        return { success: false, error: message };
    }
}
