/**
 * Database types for Supabase tables.
 * These types should match your database schema.
 * 
 * For production, generate types using:
 * npx supabase gen types typescript --project-id your-project-id > src/types/database.ts
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            posts: {
                Row: {
                    id: string;
                    title: string;
                    slug: string;
                    excerpt: string | null;
                    content: string;
                    cover_image: string | null;
                    published: boolean;
                    author_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    title: string;
                    slug: string;
                    excerpt?: string | null;
                    content: string;
                    cover_image?: string | null;
                    published?: boolean;
                    author_id?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    title?: string;
                    slug?: string;
                    excerpt?: string | null;
                    content?: string;
                    cover_image?: string | null;
                    published?: boolean;
                    author_id?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "posts_author_id_fkey";
                        columns: ["author_id"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

// Convenience types
export type Post = Database['public']['Tables']['posts']['Row'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];
