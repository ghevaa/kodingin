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
        <div className="min-h-screen bg-[var(--bg-primary)] flex">
            {/* Sidebar */}
            <Sidebar userEmail={user.email} />

            {/* Main Content */}
            <main className="flex-1 overflow-auto h-screen relative">
                {/* Abstract Glows (matching reference) */}
                <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[var(--color-secondary)]/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="p-8 relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
