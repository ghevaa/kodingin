"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isBlogOpen, setIsBlogOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="/" className="logo">
                    <img src="/kodingin-logo.svg" alt="Kodingin" className="logo-svg" />
                </a>
                <ul className={`${isOpen ? 'nav-links-mobile flex flex-col absolute top-full left-0 right-0 bg-[rgba(10,10,15,0.95)] p-4 border-b border-[var(--border-color)]' : 'nav-links'} items-center`}>
                    <li><Link href="/">Home</Link></li>

                    {/* About Dropdown (containing Blog) */}
                    <li
                        className="relative group"
                        onMouseEnter={() => setIsBlogOpen(true)}
                        onMouseLeave={() => setIsBlogOpen(false)}
                    >
                        <button
                            className="flex items-center gap-1 text-gray-300 hover:text-purple-400 transition-colors"
                            onClick={() => setIsBlogOpen(!isBlogOpen)}
                        >
                            About
                            <svg
                                className={`w-4 h-4 transition-transform ${isBlogOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {(isBlogOpen || isOpen) && (
                            <div className={`
                                ${isOpen ? 'static w-full pl-4 mt-2 space-y-2' : 'absolute top-full left-0 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-xl py-2 mt-2'}
                            `}>
                                <Link
                                    href="#about"
                                    className="block px-4 py-2 hover:bg-gray-800 hover:text-purple-400 transition-colors rounded-lg"
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/blog"
                                    className="block px-4 py-2 hover:bg-gray-800 hover:text-purple-400 transition-colors rounded-lg"
                                >
                                    Blog
                                </Link>
                            </div>
                        )}
                    </li>

                    <li><Link href="#services">Services</Link></li>
                    <li><Link href="#pricing">Pricing</Link></li>
                    <li><Link href="#contact">Contact</Link></li>
                </ul>
                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn lg:hidden"
                    aria-label="Toggle menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
                    <span style={{ opacity: isOpen ? 0 : 1 }}></span>
                    <span style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
                </button>
            </div>
        </nav>
    );
}
