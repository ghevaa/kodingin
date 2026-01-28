'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    popular?: boolean;
    customPrice?: boolean;
}

const pricingTiers: PricingTier[] = [
    {
        name: "Starter",
        price: "Rp 300k",
        description: "Perfect for small businesses looking to establish their online presence.",
        features: [
            "Landing Page Design",
            "Mobile Responsive",
            "Basic SEO Setup",
            "Contact Form Integration",
            "3 Rounds of Revisions",
            "2 Weeks Delivery"
        ],
        cta: "Get Started"
    },
    {
        name: "Professional",
        price: "Rp 1-3m",
        description: "Ideal for growing businesses that need advanced functionality.",
        features: [
            "Multi-page Website (up to 10 pages)",
            "Custom UI/UX Design",
            "CMS Integration",
            "Advanced SEO",
            "Analytics Setup",
            "Performance Optimization",
            "5 Rounds of Revisions",
            "4 Weeks Delivery"
        ],
        cta: "Get Started",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For businesses requiring custom solutions and ongoing support.",
        features: [
            "Custom Web Application",
            "SaaS Development",
            "Workflow Automation",
            "API Integrations",
            "Dedicated Team",
            "24/7 Priority Support",
            "Unlimited Revisions",
            "Flexible Timeline"
        ],
        cta: "Contact Us",
        customPrice: true
    }
];

export default function Pricing() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [billingCycle, setBillingCycle] = useState<'project' | 'monthly'>('project');

    return (
        <section
            ref={sectionRef}
            className="pricing-section"
            id="pricing"
        >
            <div className="pricing-container">
                {/* Header */}
                <motion.div
                    className="pricing-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="pricing-title">
                        Transparent Pricing for <span className="gradient-text">Quality Work</span>
                    </h2>
                    <p className="pricing-subtitle">
                        Choose a package that fits your needs. All projects include free consultation and post-launch support.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="pricing-grid">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            className={`pricing-card ${tier.popular ? 'popular' : ''}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            {tier.popular && (
                                <div className="popular-badge">
                                    <span className="material-symbols-outlined">star</span>
                                    Most Popular
                                </div>
                            )}

                            <div className="pricing-card-header">
                                <h3 className="tier-name">{tier.name}</h3>
                                <div className="tier-price">
                                    {tier.customPrice ? (
                                        <span className="price-text">{tier.price}</span>
                                    ) : (
                                        <>
                                            <span className="price-amount">{tier.price}</span>
                                            <span className="price-period">/project</span>
                                        </>
                                    )}
                                </div>
                                <p className="tier-description">{tier.description}</p>
                            </div>

                            <ul className="tier-features">
                                {tier.features.map((feature, i) => (
                                    <li key={i}>
                                        <span className="check-icon material-symbols-outlined">check_circle</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`tier-cta ${tier.popular ? 'primary' : ''}`}>
                                {tier.cta}
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Hint */}
                <motion.div
                    className="pricing-footer"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <p>Need a custom quote? <a href="#contact" className="pricing-link">Let&apos;s talk about your project →</a></p>
                </motion.div>
            </div>
        </section>
    );
}
