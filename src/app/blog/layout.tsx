import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import './blog.css';

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

            {/* Main Content with dedicated blog styling */}
            <main className="blog-page-wrapper">
                {children}
            </main>

            <Footer />
        </div>
    );
}
