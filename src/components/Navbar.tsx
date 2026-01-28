"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
                <ul className={`${isOpen ? 'nav-links-mobile flex flex-col absolute top-full left-0 right-0 bg-[rgba(10,10,15,0.95)] p-4 border-b border-[var(--border-color)]' : 'nav-links'}`}>
                    <li><a href="/">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#contact">Contact</a></li>
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
