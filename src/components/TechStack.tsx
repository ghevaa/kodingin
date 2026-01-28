'use client';

import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPhp, SiMysql, SiNodedotjs, SiPrisma, SiN8N } from 'react-icons/si';

const techStackLogos = [
    { node: <SiReact />, title: "React" },
    { node: <SiNextdotjs />, title: "Next.js" },
    { node: <SiTypescript />, title: "TypeScript" },
    { node: <SiTailwindcss />, title: "Tailwind CSS" },
    { node: <SiPhp />, title: "PHP" },
    { node: <SiMysql />, title: "MySQL" },
    { node: <SiNodedotjs />, title: "Node.js" },
    { node: <SiPrisma />, title: "Prisma" },
    { node: <SiN8N />, title: "n8n" },
];

export default function TechStack() {
    return (
        <section className="tech-stack-standalone" id="tech-stack">
            <div className="container">
                <div className="tech-stack-section">
                    <p className="tech-stack-label">Our Tech Stack</p>
                    <LogoLoop
                        logos={techStackLogos}
                        speed={80}
                        direction="left"
                        logoHeight={32}
                        gap={48}
                        pauseOnHover
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#0a0a0f"
                        ariaLabel="Our technology stack"
                    />
                </div>
            </div>
        </section>
    );
}
