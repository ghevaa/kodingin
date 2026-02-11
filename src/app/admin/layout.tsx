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
        <div className="min-h-screen bg-[var(--bg-primary)] flex relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[var(--bg-primary)]"></div>
                <div className="grid-overlay opacity-30"></div>
                <div className="gradient-orb orb-1 opacity-20"></div>
                <div className="gradient-orb orb-2 opacity-15"></div>
                <div className="gradient-orb orb-3 opacity-10"></div>
            </div>

            {/* Sidebar */}
            <div className="relative z-20 h-screen">
                <Sidebar userEmail={user.email} />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto h-screen relative z-10">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
