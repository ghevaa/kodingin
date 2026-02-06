import { createClient } from '@/lib/supabase/server';
import type { Post, PostInsert, PostUpdate } from '@/types/database';

/**
 * Posts Service
 * Business logic for managing blog posts.
 * All functions use the server-side Supabase client.
 */

export interface PostsListOptions {
    limit?: number;
    offset?: number;
    published?: boolean;
}

export interface PostsListResult {
    posts: Post[];
    count: number;
}

/**
 * Get published posts for the public blog.
 * Results are ordered by creation date (newest first).
 */
export async function getPublishedPosts(
    options: PostsListOptions = {}
): Promise<PostsListResult> {
    const { limit = 10, offset = 0 } = options;
    const supabase = await createClient();

    const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        console.error('Error fetching published posts:', error);
        throw new Error('Failed to fetch posts');
    }

    return {
        posts: (data as Post[]) ?? [],
        count: count ?? 0,
    };
}

/**
 * Get a single post by its slug.
 * For public access, only returns if published.
 */
export async function getPostBySlug(
    slug: string,
    requirePublished = true
): Promise<Post | null> {
    const supabase = await createClient();

    let query = supabase
        .from('posts')
        .select('*')
        .eq('slug', slug);

    if (requirePublished) {
        query = query.eq('published', true);
    }

    const { data, error } = await query.single();

    if (error) {
        if (error.code === 'PGRST116') {
            // No rows returned
            return null;
        }
        console.error('Error fetching post by slug:', error);
        throw new Error('Failed to fetch post');
    }

    return data as Post;
}

/**
 * Get a single post by its ID.
 * For admin use - returns regardless of published status.
 */
export async function getPostById(id: string): Promise<Post | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error('Error fetching post by id:', error);
        throw new Error('Failed to fetch post');
    }

    return data as Post;
}

/**
 * Get all posts for admin dashboard.
 * Includes drafts and published posts.
 */
export async function getAllPosts(
    options: PostsListOptions = {}
): Promise<PostsListResult> {
    const { limit = 50, offset = 0 } = options;
    const supabase = await createClient();

    const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        console.error('Error fetching all posts:', error);
        throw new Error('Failed to fetch posts');
    }

    return {
        posts: (data as Post[]) ?? [],
        count: count ?? 0,
    };
}

/**
 * Create a new post.
 * Requires authenticated user.
 */
export async function createPost(post: PostInsert): Promise<Post> {
    const supabase = await createClient();

    // Get current user for author_id
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('Authentication required');
    }

    const { data, error } = await supabase
        .from('posts')
        .insert({
            ...post,
            author_id: user.id,
        } as PostInsert)
        .select()
        .single();

    if (error) {
        console.error('Error creating post:', error);
        if (error.code === '23505') {
            throw new Error('A post with this slug already exists');
        }
        throw new Error('Failed to create post');
    }

    return data as Post;
}

/**
 * Update an existing post.
 * Requires authenticated user who is the author.
 */
export async function updatePost(id: string, updates: PostUpdate): Promise<Post> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('posts')
        .update(updates as PostUpdate)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating post:', error);
        if (error.code === '23505') {
            throw new Error('A post with this slug already exists');
        }
        throw new Error('Failed to update post');
    }

    return data as Post;
}

/**
 * Delete a post.
 * Requires authenticated user who is the author.
 */
export async function deletePost(id: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting post:', error);
        throw new Error('Failed to delete post');
    }
}

/**
 * Toggle the published status of a post.
 */
export async function togglePublishPost(id: string, published: boolean): Promise<Post> {
    return updatePost(id, { published });
}

/**
 * Generate a URL-friendly slug from a title.
 * Re-exported from lib/utils for convenience.
 */
export { generateSlug } from '@/lib/utils';

/**
 * Get post statistics for the admin dashboard.
 */
export async function getPostStats(): Promise<{
    total: number;
    published: number;
    drafts: number;
}> {
    const supabase = await createClient();

    const { count: total } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true });

    const { count: published } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('published', true);

    return {
        total: total ?? 0,
        published: published ?? 0,
        drafts: (total ?? 0) - (published ?? 0),
    };
}
