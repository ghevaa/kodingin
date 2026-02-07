import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
    return (
        <div className="dashboard-container">
            {/* Page Header */}
            <div className="dashboard-header">
                <h1 className="dashboard-title">Create New Post</h1>
                <p className="dashboard-subtitle">Write and publish a new blog post</p>
            </div>

            {/* Post Form */}
            <div className="dashboard-card">
                <PostForm mode="create" />
            </div>
        </div>
    );
}
