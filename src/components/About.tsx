'use client';

import ScrollReveal from './ScrollReveal';
import { CodeDemo } from './CodeDemo';

export default function About() {
    return (
        <section className="about-section" id="about">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gray-950/50 -z-10" />
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-900/10 rounded-full blur-3xl -z-10" />

            <div className="about-container">
                <div className="about-content">
                    {/* Left Side - Visual */}
                    <div className="about-visual-column flex-1 w-full">
                        <ScrollReveal delay={0.3} duration={0.8} direction="right" distance={50}>
                            <div className="relative">
                                {/* Gradient background removed for minimal look */}
                                <CodeDemo
                                    filename="my-component.tsx"
                                    delay={0.2}
                                    code={`'use client';

import * as React from 'react';

type MyComponentProps = {
  myProps: string;
} & React.ComponentProps<'div'>;

function MyComponent(props: MyComponentProps) {
  return (
    <div {...props}>
      <p>My Component</p>
    </div>
  );
}

export { MyComponent, type MyComponentProps };`}
                                />
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Side - Text Content */}
                    <div className="about-text-column flex-1">
                        <ScrollReveal delay={0} duration={0.6} direction="up" distance={30}>
                            <div>

                                <h2 className="section-title text-left mb-6">
                                    Why choose Kodingin?
                                </h2>
                                <p className="section-description mx-0 max-w-none text-justify mb-6">
                                    At Kodingin, we don't just write code, we build the future of your business.
                                </p>
                                <p className="section-description mx-0 max-w-none text-justify">
                                    Our team of expert developers and designers is passionate about pushing the boundaries of what's possible on the web. From SaaS platforms to enterprise automation, we deliver results that drive growth and scalability.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
