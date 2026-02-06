import { createClient } from '@/lib/supabase/client';

/**
 * Client-side Auth Utilities
 * These functions are for use in client components only.
 */

/**
 * Sign in with email and password (client-side).
 * Use this in client components.
 */
export async function signInWithEmail(email: string, password: string) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * Sign out (client-side).
 */
export async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}
