'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated counter component
function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '' }: {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [isInView, end, duration]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function Automation() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 40 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.8
            }
        }
    };

    const statsCardVariants: Variants = {
        hidden: { opacity: 0, x: -30, y: 20 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.5
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="automation-section"
            id="automation"
        >
            <div className="automation-container">
                <motion.div
                    className="automation-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Left Side - Description */}
                    <motion.div className="automation-info" variants={itemVariants}>
                        <div className="automation-icon-box">
                            <span className="material-symbols-outlined">settings_suggest</span>
                        </div>

                        <div className="automation-text">
                            <h2 className="automation-title">Workflow Automation</h2>
                            <p className="automation-description">
                                Stop wasting time on repetitive tasks. We design intelligent automation
                                scripts and bots that connect your apps (Slack, Airtable, CRM) and run
                                your business on autopilot.
                            </p>
                        </div>

                        <ul className="automation-checklist">
                            <li>
                                <span className="check-icon material-symbols-outlined">check_circle</span>
                                n8n & Zapier Workflows
                            </li>
                            <li>
                                <span className="check-icon material-symbols-outlined">check_circle</span>
                                Custom Python Bots
                            </li>
                            <li>
                                <span className="check-icon material-symbols-outlined">check_circle</span>
                                Data Scraping & Processing
                            </li>
                        </ul>
                    </motion.div>

                    {/* Right Side - Dashboard Image with Stats */}
                    <motion.div className="automation-showcase" variants={imageVariants}>
                        <div className="dashboard-wrapper">
                            {/* Browser Chrome */}
                            <div className="dashboard-browser">
                                <div className="browser-header">
                                    <div className="browser-dots">
                                        <span className="dot red"></span>
                                        <span className="dot yellow"></span>
                                        <span className="dot green"></span>
                                    </div>
                                </div>

                                {/* Dashboard Image */}
                                <div className="dashboard-image-container">
                                    <motion.img
                                        src="/images/workflow-automation.png"
                                        alt="Workflow Automation Dashboard"
                                        className="dashboard-image"
                                        initial={{ opacity: 0 }}
                                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                    />

                                    {/* Gradient overlay for smooth edge */}
                                    <div className="dashboard-overlay"></div>
                                </div>
                            </div>

                            {/* Floating Stats Card */}
                            <motion.div
                                className="stats-card"
                                variants={statsCardVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                <div className="stats-card-header">
                                    <div className="stats-icon">
                                        <span className="material-symbols-outlined">trending_up</span>
                                    </div>
                                    <div className="stats-info">
                                        <span className="stats-label">Revenue Growth</span>
                                        <span className="stats-value">
                                            <AnimatedCounter end={124} prefix="+" suffix="% YoY" duration={2} />
                                        </span>
                                    </div>
                                </div>
                                <div className="stats-progress-bar">
                                    <motion.div
                                        className="stats-progress-fill"
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: "75%" } : { width: 0 }}
                                        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                                    />
                                </div>
                            </motion.div>

                            {/* Additional floating stats */}
                            <motion.div
                                className="efficiency-card"
                                initial={{ opacity: 0, x: 30, y: -20 }}
                                animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 30, y: -20 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                <div className="efficiency-icon">
                                    <span className="material-symbols-outlined">speed</span>
                                </div>
                                <div className="efficiency-info">
                                    <span className="efficiency-value">
                                        <AnimatedCounter end={80} suffix="%" duration={1.5} />
                                    </span>
                                    <span className="efficiency-label">Time Saved</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
