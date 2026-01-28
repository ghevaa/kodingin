'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const contactMethods = [
    {
        icon: <FaWhatsapp />,
        title: "WhatsApp",
        description: "Chat with us directly",
        value: "+62 823 1311 2227",
        link: "https://wa.me/6282313112227",
        color: "#25D366"
    },
    {
        icon: <FiMail />,
        title: "Email",
        description: "Send us an email",
        value: "kodingin@gmail.com",
        link: "mailto:kodingin@gmail.com",
        color: "#EA4335"
    },
    {
        icon: <FiMapPin />,
        title: "Office",
        description: "Visit our office",
        value: "Jl. Nakula No. 48, Semarang 50131",
        link: "https://maps.google.com/?q=Jl.+Nakula+No.+48,+Semarang+50131",
        color: "#4285F4"
    }
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="contact-section"
            id="contact"
        >
            <div className="contact-container">
                {/* Header */}
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >

                    <h2 className="contact-title">
                        Let&apos;s Build Something <span className="gradient-text">Amazing</span>
                    </h2>
                    <p className="contact-subtitle">
                        Have a project in mind? Get in touch with us and let&apos;s discuss how we can help bring your ideas to life.
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <div className="contact-grid">
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={method.title}
                            href={method.link}
                            target={method.title !== "Email" ? "_blank" : undefined}
                            rel={method.title !== "Email" ? "noopener noreferrer" : undefined}
                            className="contact-card"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div
                                className="contact-icon"
                                style={{ '--icon-color': method.color } as React.CSSProperties}
                            >
                                {method.icon}
                            </div>
                            <div className="contact-info">
                                <h3 className="contact-method-title">{method.title}</h3>
                                <p className="contact-description">{method.description}</p>
                                <span className="contact-value">{method.value}</span>
                            </div>
                            <span className="contact-arrow material-symbols-outlined">arrow_forward</span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
