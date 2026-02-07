'use client';

import * as React from 'react';
import { motion, useInView } from 'motion/react';

interface CodeDemoProps {
    code: string;
    language?: string;
    filename?: string;
    delay?: number;
}

export function CodeDemo({ code, filename = 'example.tsx', delay = 0 }: CodeDemoProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayedCode, setDisplayedCode] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    React.useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => {
                setIsTyping(true);
                let currentIndex = 0;

                const typeChar = () => {
                    if (currentIndex < code.length) {
                        setDisplayedCode(code.slice(0, currentIndex + 1));
                        currentIndex++;
                        // Random typing speed variation
                        const typingDelay = Math.random() * 30 + 10;
                        setTimeout(typeChar, typingDelay);
                    } else {
                        setIsTyping(false);
                    }
                };

                typeChar();
            }, delay * 1000);

            return () => clearTimeout(timeout);
        }
    }, [isInView, code, delay]);

    // Simple syntax highlighting helpers (Minimal/Grayscale)
    const highlightCode = (text: string) => {
        return text.split(/(\s+|[{}();,<>])/g).map((token, i) => {
            if (token.match(/^(import|export|from|function|return|type|const|let|var|if|else|default|async|await)$/)) {
                return <span key={i} className="text-gray-400 font-semibold">{token}</span>;
            }
            if (token.match(/^('.*'|".*")$/)) {
                return <span key={i} className="text-gray-300">{token}</span>;
            }
            if (token.match(/^[A-Z][a-zA-Z0-9]*$/)) {
                return <span key={i} className="text-gray-200">{token}</span>;
            }
            if (token.match(/^[a-z]+Props$/)) {
                return <span key={i} className="text-gray-400">{token}</span>;
            }
            if (token === 'div' || token === 'p') {
                return <span key={i} className="text-gray-300">{token}</span>;
            }
            return <span key={i} className="text-gray-500">{token}</span>;
        });
    };

    return (
        <div ref={ref} className="w-full max-w-lg mx-auto font-mono text-sm leading-relaxed dashboard-wrapper">
            <div className="dashboard-browser h-full bg-[#1a1a25]">
                <div className="browser-header !border-b-0 !bg-transparent">
                    <div className="browser-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                </div>

                {/* Code Area - matched padding */}
                <div className="code-demo-content">
                    <pre className="font-mono text-sm">
                        <code>
                            {highlightCode(displayedCode)}
                            {/* Cursor */}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2 h-4 bg-gray-400 ml-1 align-middle"
                            />
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
