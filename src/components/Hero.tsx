"use client";

import Flowchart from './Flowchart';
import CountUp from './CountUp';
import RotatingText from './RotatingText';
import ScrollReveal from './ScrollReveal';
import './RotatingText.css';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
                <div className="grid-overlay"></div>
            </div>

            <div className="hero-wrapper">
                {/* Left Side: Text Content */}
                <div className="hero-content">
                    <ScrollReveal delay={0} duration={0.8} direction="up" distance={30}>
                        <h1 className="hero-title">
                            Build{' '}
                            <RotatingText
                                texts={['Websites', 'Automation', 'SaaS', 'SEO']}
                                mainClassName="rotating-text-gradient"
                                staggerFrom="first"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                staggerDuration={0.02}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                rotationInterval={2500}
                            />
                            <br />That Scale With You
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2} duration={0.8} direction="up" distance={30}>
                        <p className="hero-description">
                            Transform your ideas into stunning, high-performance websites and SaaS applications.
                            From concept to launch, we've got you covered.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4} duration={0.8} direction="up" distance={30}>
                        <div className="hero-cta flex gap-4">
                            <a href="#contact" className="btn btn-primary btn-lg">
                                Start Building
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </a>
                            <a href="#about" className="btn btn-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white backdrop-blur-sm transition-all">
                                About Us
                            </a>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.6} duration={0.8} direction="up" distance={30}>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-value">
                                    <CountUp to={15} suffix="+" duration={2.5} />
                                </span>
                                <span className="stat-label">Websites Launched</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat">
                                <span className="stat-value">
                                    <CountUp to={99.9} suffix="%" duration={2} />
                                </span>
                                <span className="stat-label">Uptime Guarantee</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat">
                                <span className="stat-value">
                                    <CountUp to={24} suffix="/7" duration={1.5} />
                                </span>
                                <span className="stat-label">Support Available</span>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Right Side: Branching Flowchart */}
                <ScrollReveal delay={0.3} duration={1} direction="right" distance={50}>
                    <Flowchart />
                </ScrollReveal>
            </div>
        </section>
    );
}
