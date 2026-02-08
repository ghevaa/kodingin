'use client';

import ProjectCarousel from './ProjectCarousel';
import ScrollReveal from './ScrollReveal';
import type { ProjectItem } from './ProjectCarousel';

// Sample project data
const webProjects: ProjectItem[] = [
    {
        id: 1,
        title: 'BakerPlast POS Dashboard',
        description: 'A comprehensive Point of Sale system with real-time inventory tracking, sales analytics, and low stock alerts.',
        category: 'POS System',
        image: '/images/pos-dashboard.png',
        liveUrl: 'https://post-cashier-web.vercel.app',
        githubUrl: 'https://github.com/kodingincom',
    },
    {
        id: 2,
        title: 'TechFlow Dashboard',
        description: 'Built a comprehensive analytics dashboard with real-time data visualization.',
        category: 'Web Application',
        image: '',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
    },
    {
        id: 3,
        title: 'Artisan Portfolio',
        description: 'A stunning portfolio website with smooth animations and WebGL effects.',
        category: 'Portfolio Website',
        image: '',
        liveUrl: 'https://example.com',
    },
    {
        id: 4,
        title: 'HealthHub Platform',
        description: 'Healthcare platform with appointment booking and telemedicine features.',
        category: 'Healthcare',
        image: '',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
    },
];

export default function Features() {
    return (
        <section className="features-section" id="features">
            <div className="features-container">
                <div className="features-content">
                    {/* Left Side - Description */}
                    <div className="features-info">
                        <ScrollReveal delay={0} duration={0.6} direction="left" distance={40}>
                            <div className="features-icon-box">
                                <span className="material-symbols-outlined">web</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.15} duration={0.6} direction="up" distance={30}>
                            <div className="features-text">
                                <h2 className="features-title">High-Performance Websites</h2>
                                <p className="features-description">
                                    We craft digital experiences that convert. Using modern frameworks like Next.js and Tailwind, we build sites that are lightning fast, SEO-optimized, and visually stunning.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3} duration={0.6} direction="up" distance={30}>
                            <ul className="features-checklist">
                                <li>
                                    <span className="check-icon material-symbols-outlined">check_circle</span>
                                    CMS Integration (Sanity, Strapi)
                                </li>
                                <li>
                                    <span className="check-icon material-symbols-outlined">check_circle</span>
                                    Advanced Animations &amp; WebGL
                                </li>
                                <li>
                                    <span className="check-icon material-symbols-outlined">check_circle</span>
                                    Technical SEO Audit
                                </li>
                            </ul>
                        </ScrollReveal>
                    </div>

                    {/* Right Side - Project Carousel */}
                    <ScrollReveal delay={0.2} duration={0.8} direction="right" distance={50}>
                        <div className="features-showcase">
                            <ProjectCarousel
                                items={webProjects}
                                baseWidth={600}
                                autoplay={true}
                                autoplayDelay={5000}
                                pauseOnHover={true}
                                loop={true}
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
