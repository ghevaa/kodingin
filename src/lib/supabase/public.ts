import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

// Cache the client instance
let publicClient: SupabaseClient | null = null;

/**
 * Creates a Supabase client for public, anonymous access.
 * This client does NOT use cookies/sessions and is safe for static generation.
 * Use this for public pages that can be cached (blog posts, etc).
 * 
 * Returns null if environment variables are not configured (build-time safety).
 */
export function createPublicClient(): SupabaseClient | null {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        console.warn('Supabase credentials not configured. Some features will be unavailable.');
        return null;
    }

    if (!publicClient) {
        publicClient = createSupabaseClient(url, key);
    }

    return publicClient;
}
