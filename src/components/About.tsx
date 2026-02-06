'use client';

import ScrollReveal from './ScrollReveal';

export default function About() {
    return (
        <section className="about-section py-20 relative overflow-hidden" id="about">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gray-950/50 -z-10" />
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-900/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-900/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-8">
                        <ScrollReveal delay={0} duration={0.6} direction="up" distance={30}>
                            <div>
                                <h2 className="text-sm font-semibold text-purple-400 tracking-wider uppercase mb-2">About Us</h2>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    Crafting Digital Excellence for Forward-Thinking Businesses
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                    At Kodingin, we don't just write code; we build the future of your business. As a premier software development house based in Semarang, Indonesia, we specialize in transforming complex problems into elegant, high-performance digital solutions.
                                </p>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Our team of expert developers and designers is passionate about pushing the boundaries of what's possible on the web. From SaaS platforms to enterprise automation, we deliver results that drive growth and scalability.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2} duration={0.6} direction="up" distance={30}>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                                    <h4 className="text-2xl font-bold text-white mb-1">5+</h4>
                                    <p className="text-gray-400 text-sm">Years Experience</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                                    <h4 className="text-2xl font-bold text-white mb-1">50+</h4>
                                    <p className="text-gray-400 text-sm">Projects Delivered</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                                    <h4 className="text-2xl font-bold text-white mb-1">100%</h4>
                                    <p className="text-gray-400 text-sm">Client Satisfaction</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                                    <h4 className="text-2xl font-bold text-white mb-1">24/7</h4>
                                    <p className="text-gray-400 text-sm">Support</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Side - Visual */}
                    <ScrollReveal delay={0.3} duration={0.8} direction="left" distance={50}>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-20 blur-lg" />
                            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/90 shadow-2xl">
                                <div className="grid grid-cols-2 gap-4 p-4">
                                    <div className="space-y-4">
                                        <div className="h-40 rounded-lg bg-gray-800 animate-pulse" />
                                        <div className="h-24 rounded-lg bg-gray-800/60 animate-pulse delay-75" />
                                    </div>
                                    <div className="space-y-4 pt-8">
                                        <div className="h-24 rounded-lg bg-gray-800/60 animate-pulse delay-150" />
                                        <div className="h-40 rounded-lg bg-gray-800 animate-pulse delay-200" />
                                    </div>
                                </div>
                                {/* Code Overlay Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="font-mono text-sm text-gray-400">
                                        <p><span className="text-purple-400">const</span> <span className="text-blue-400">future</span> = <span className="text-yellow-400">await</span> <span className="text-green-400">build</span>({'{'}</p>
                                        <p className="pl-4">quality: <span className="text-orange-400">'premium'</span>,</p>
                                        <p className="pl-4">innovation: <span className="text-blue-400">true</span>,</p>
                                        <p className="pl-4">scale: <span className="text-purple-400">Infinity</span></p>
                                        <p>{'}'});</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
