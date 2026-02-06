import { createPublicClient } from '@/lib/supabase/public';
import type { Post } from '@/types/database';

/**
 * Public Posts Service
 * Read-only operations for public blog pages.
 * Uses the public Supabase client (no cookies) for static generation compatibility.
 */

/**
 * Get published posts for the public blog.
 * Results are ordered by creation date (newest first).
 */
export async function getPublishedPosts(
    options: { limit?: number; offset?: number } = {}
): Promise<{ posts: Post[]; count: number }> {
    const { limit = 10, offset = 0 } = options;
    const supabase = createPublicClient();

    // Handle case when Supabase is not configured (build time)
    if (!supabase) {
        return { posts: [], count: 0 };
    }

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
 * Only returns published posts.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const supabase = createPublicClient();

    // Handle case when Supabase is not configured (build time)
    if (!supabase) {
        return null;
    }

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error('Error fetching post by slug:', error);
        throw new Error('Failed to fetch post');
    }

    return data as Post;
}
