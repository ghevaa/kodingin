'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from '@/services/auth.client';
import { useEffect, useState } from 'react';

interface SidebarProps {
    userEmail?: string | null;
}

interface MenuItem {
    name: string;
    href: string;
    icon: React.ReactNode;
    target?: string;
}

interface MenuGroup {
    title: string;
    items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
    {
        title: 'Main Menu',
        items: [
            {
                name: 'Dashboard',
                href: '/admin',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                ),
            },
            {
                name: 'Posts',
                href: '/admin/posts',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                ),
            },
            {
                name: 'New Post',
                href: '/admin/posts/new',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                ),
            },
        ]
    },
    {
        title: 'System',
        items: [
            {
                name: 'View Blog',
                href: '/blog',
                target: '_blank',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                ),
            }
        ]
    }
];

export default function Sidebar({ userEmail }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <>
            {/* Mobile Toggle Button (Floating) */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-purple-600 text-white shadow-lg shadow-purple-500/30 active:scale-95 transition-all"
                aria-label="Toggle Menu"
            >
                {isMobileOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                )}
            </button>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar (Desktop & Mobile) */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-40 w-72 h-full 
                bg-[var(--bg-secondary)]/80 md:bg-[var(--bg-secondary)]/50 
                border-r border-[var(--border-color)] 
                backdrop-blur-xl transition-transform duration-300 ease-out
                flex flex-col flex-shrink-0
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo Area */}
                <div className="h-24 flex items-center px-6 border-b border-[var(--border-color)]/30">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-white/10">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-lg font-bold tracking-tight">KODINGIN</h1>
                            <p className="text-xs text-[var(--text-secondary)] font-medium tracking-wider">ADMIN CONSOLE</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
                    {menuGroups.map((group, groupIndex) => (
                        <div key={group.title} className={groupIndex > 0 ? "mt-6" : ""}>
                            <p className="px-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">
                                {group.title}
                            </p>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href ||
                                        (item.href !== '/admin' && pathname.startsWith(item.href));

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            target={item.target}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${isActive
                                                ? 'bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent text-[var(--color-primary)] border-l-2 border-[var(--color-primary)]'
                                                : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                                                }`}
                                        >
                                            <span className={`relative z-10 transition-colors ${isActive ? 'text-[var(--color-primary)]' : 'group-hover:text-[var(--color-secondary)]'}`}>
                                                {item.icon}
                                            </span>
                                            <span className="relative z-10 text-sm font-medium">{item.name}</span>

                                            {/* Hover Glow Effect */}
                                            {!isActive && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User Mini Profile */}
                <div className="p-4 border-t border-[var(--border-color)]/30">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                        <div className="relative">
                            <div className="size-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center border border-white/10 shadow-inner">
                                <span className="text-sm font-bold text-white">
                                    {userEmail?.[0].toUpperCase() ?? 'U'}
                                </span>
                            </div>
                            <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 border-2 border-[#1a1b23] rounded-full"></span>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-bold text-white truncate max-w-[120px]">
                                {userEmail?.split('@')[0] ?? 'User'}
                            </span>
                            <span className="text-xs text-[var(--text-muted)] truncate">Administrator</span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="ml-auto p-2 text-[var(--text-muted)] hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
                            title="Sign Out"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
