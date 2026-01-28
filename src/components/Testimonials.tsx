'use client';

import { FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    quote: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Chen',
        role: 'Indie Maker',
        company: 'Personal Project',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        quote: 'Working with Kodingin transformed my personal portfolio completely. Their attention to detail resulted in a significant increase in client inquiries.',
    },
    {
        id: 2,
        name: 'Ghandi Sukirman',
        role: 'Small Business Owner',
        company: 'Local Shop',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        quote: 'The automation they set up for my daily tasks saved me hours every week. I can finally focus on growing my business instead of administrative work.',
    },
    {
        id: 3,
        name: 'Emily Watson',
        role: 'Content Creator',
        company: 'Freelance',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        quote: 'Beautiful, fast, and optimized. My blog launched with incredible performance scores and my readership has doubled in just a few months.',
    },
    {
        id: 4,
        name: 'David Kuncoro',
        role: 'Developer',
        company: 'Side Hustle',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        quote: 'Their expertise with Next.js is top-notch. The codebase they delivered is clean, scalable, and exactly what I needed to launch my MVP.',
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="testimonial-rating">
            {[...Array(5)].map((_, index) => (
                <FiStar
                    key={index}
                    className={`star ${index < rating ? 'filled' : ''}`}
                />
            ))}
        </div>
    );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
    return (
        <ScrollReveal delay={index * 0.1} duration={0.6} direction="up" distance={30}>
            <div className="testimonial-card">
                <div className="testimonial-quote-icon">
                    <FaQuoteLeft />
                </div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <StarRating rating={testimonial.rating} />
                <div className="testimonial-author">
                    <div className="testimonial-avatar">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                    </div>
                    <div className="testimonial-info">
                        <h4 className="testimonial-name">{testimonial.name}</h4>
                        <p className="testimonial-role">
                            {testimonial.role} at <span>{testimonial.company}</span>
                        </p>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}

export default function Testimonials() {
    return (
        <section className="testimonials-section" id="testimonials">
            <div className="container">
                <ScrollReveal delay={0} duration={0.6} direction="up" distance={30}>
                    <div className="section-header">
                        <h2 className="section-title">
                            Trusted by <span className="gradient-text">Our Clients</span>
                        </h2>
                        <p className="section-description">
                            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
                        </p>
                    </div>
                </ScrollReveal>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
