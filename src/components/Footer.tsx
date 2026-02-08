'use client';

import { FiGithub, FiInstagram, FiMapPin, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <ScrollReveal delay={0} duration={0.6} direction="up" distance={30}>
                        <div className="footer-brand">
                            <a href="#" className="logo">
                                <img src="/kodingin-logo.svg" alt="Kodingin" className="logo-svg" />
                            </a>
                            <p>Build stunning websites and SaaS applications with ease.</p>

                            <div className="footer-contact-info">
                                <div className="footer-contact-item">
                                    <FiMapPin className="footer-contact-icon" />
                                    <span>Jl. Nakula No. 48, Semarang 50131</span>
                                </div>
                                <div className="footer-contact-item">
                                    <FiMail className="footer-contact-icon" />
                                    <a href="mailto:hello@kodingin.com">hello@kodingin.com</a>
                                </div>
                            </div>

                            <div className="social-links">
                                <a href="https://wa.me/6282313112227" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                                    <FaWhatsapp />
                                </a>
                                <a href="https://instagram.com/kodingincom" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                    <FiInstagram />
                                </a>
                                <a href="https://tiktok.com/@kodingincom" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="TikTok">
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                                    </svg>
                                </a>
                                <a href="https://github.com/kodingincom" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                                    <FiGithub />
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                    <div className="footer-links">
                        <ScrollReveal delay={0.1} duration={0.6} direction="up" distance={30}>
                            <div className="footer-column">
                                <h4>Product</h4>
                                <a href="#features">Features</a>
                                <a href="#pricing">Pricing</a>
                                <a href="#">Templates</a>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2} duration={0.6} direction="up" distance={30}>
                            <div className="footer-column">
                                <h4>Company</h4>
                                <a href="#">About</a>
                                <a href="#">Blog</a>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.3} duration={0.6} direction="up" distance={30}>
                            <div className="footer-column">
                                <h4>Support</h4>
                                <a href="#">Help Center</a>
                                <a href="#contact">Contact</a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
                <ScrollReveal delay={0.4} duration={0.6} direction="none">
                    <div className="footer-bottom">
                        <p>&copy; 2026 Kodingin. All rights reserved.</p>
                    </div>
                </ScrollReveal>
            </div>
        </footer>
    );
}
