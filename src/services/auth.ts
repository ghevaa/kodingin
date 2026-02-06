'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Server-side Auth Utilities
 * These functions can only be called from server components, route handlers, or server actions.
 */

/**
 * Get the current authenticated user (server-side).
 */
export async function getUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Error getting user:', error);
        return null;
    }

    return user;
}

/**
 * Check if user is authenticated (server-side).
 */
export async function isAuthenticated(): Promise<boolean> {
    const user = await getUser();
    return user !== null;
}
