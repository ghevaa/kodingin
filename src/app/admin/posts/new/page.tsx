import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Create New Post</h1>
                <p className="text-gray-400 mt-1">Write and publish a new blog post</p>
            </div>

            {/* Post Form */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <PostForm mode="create" />
            </div>
        </div>
    );
}
