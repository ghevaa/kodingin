import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Blog - Kodingin',
    description: 'Read our latest articles about web development, SaaS, and technology.',
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            {/* Main Content using same styling as global layout if needed, or specific padding */}
            <main className="pt-24 min-h-screen">
                {children}
            </main>

            <Footer />
        </div>
    );
}
