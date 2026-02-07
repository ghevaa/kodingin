import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Create New Post</h1>
                <p className="text-[var(--text-secondary)]">Write and publish a new blog post</p>
            </div>

            {/* Post Form */}
            <PostForm mode="create" />
        </div>
    );
}
