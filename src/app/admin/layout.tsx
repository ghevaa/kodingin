import { redirect } from 'next/navigation';
import { getUser } from '@/services/auth';
import Sidebar from '@/components/admin/Sidebar';

// Force dynamic rendering for auth-protected pages
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Double-check authentication (middleware should handle this, but just in case)
    const user = await getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <Sidebar userEmail={user.email} />

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-950">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
