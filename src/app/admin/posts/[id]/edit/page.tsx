import { notFound } from 'next/navigation';
import { getPostById } from '@/services/posts';
import PostForm from '@/components/admin/PostForm';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Edit Post</h1>
                <p className="text-gray-400 mt-1">Update &quot;{post.title}&quot;</p>
            </div>

            {/* Post Form */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <PostForm post={post} mode="edit" />
            </div>
        </div>
    );
}
