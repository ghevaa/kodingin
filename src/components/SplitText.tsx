'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

export interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    splitType?: 'chars' | 'words';
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    once?: boolean;
    threshold?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
    text,
    className = '',
    delay = 0.03,
    duration = 0.5,
    splitType = 'chars',
    tag = 'p',
    once = true,
    threshold = 0.1,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: threshold });

    const splitText = () => {
        if (splitType === 'words') {
            return text.split(' ').map((word, i) => ({ text: word, key: i }));
        }
        // Split by characters but preserve spaces
        const chars: { text: string; key: number }[] = [];
        let index = 0;
        for (const char of text) {
            chars.push({ text: char, key: index++ });
        }
        return chars;
    };

    const elements = splitText();

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: delay,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(4px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const content = (
        <motion.span
            ref={ref}
            className={`split-text ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'inline-block' }}
        >
            {elements.map((el) => (
                <motion.span
                    key={el.key}
                    variants={itemVariants}
                    style={{
                        display: 'inline-block',
                        whiteSpace: el.text === ' ' ? 'pre' : 'normal',
                    }}
                >
                    {el.text === ' ' ? '\u00A0' : el.text}
                </motion.span>
            ))}
        </motion.span>
    );

    const Tag = tag;

    return (
        <Tag className={className} style={{ overflow: 'hidden' }}>
            {content}
        </Tag>
    );
};

export default SplitText;
