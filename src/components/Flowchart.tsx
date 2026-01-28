"use client";
import React, { useEffect, useState } from 'react';

export default function Flowchart() {
    const [step, setStep] = useState(0);

    // Animation sequence configuration
    const TOTAL_STEPS = 6;
    const STEP_DURATION = 1000;
    const PAUSE_AT_END = 1500;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (step === 0) {
            timeoutId = setTimeout(() => setStep(1), 500);
        } else if (step <= TOTAL_STEPS) {
            const isLastStep = step === TOTAL_STEPS;
            const delay = isLastStep ? PAUSE_AT_END : STEP_DURATION;

            timeoutId = setTimeout(() => {
                if (isLastStep) {
                    setStep(0);
                } else {
                    setStep(s => s + 1);
                }
            }, delay);
        }

        return () => clearTimeout(timeoutId);
    }, [step]);

    // Helper to determine class names
    const getNodeClass = (nodeStep: number) => {
        if (step === nodeStep) return "flow-node active";
        if (step > nodeStep) return "flow-node completed";
        return "flow-node";
    };

    const getConnectorClass = (connStep: number) => {
        if (step === connStep) return "flow-connector active";
        if (step > connStep) return "flow-connector completed";
        return "flow-connector";
    };

    return (
        <div className="flowchart-container">
            <div className="flowchart flowchart-dual">
                {/* Level 1: Kodingin */}
                <div className="flow-level level-1">
                    <div className={getNodeClass(1)}>
                        <div className="flow-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
                        <div className="flow-label">
                            <span className="flow-title">Kodingin</span>
                            <span className="flow-desc">Start Here</span>
                        </div>
                    </div>
                </div>

                {/* Connector: Kodingin branches to Building and Automation */}
                <div className={`flow-connector connector-dual-branch ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
                    <svg className="dual-branch-lines" viewBox="0 0 400 35" preserveAspectRatio="none">
                        {/* Left branch: center(200) -> Building center(100) */}
                        <path d="M 200 0 C 200 20, 100 20, 100 35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                        {/* Right branch: center(200) -> Automation center(300) */}
                        <path d="M 200 0 C 200 20, 300 20, 300 35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                </div>

                {/* Level 2: Building and Automation side by side */}
                <div className="flow-level level-2 flow-dual-row">
                    {/* Building */}
                    <div className={getNodeClass(2)}>
                        <div className="flow-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                            </svg>
                        </div>
                        <div className="flow-label">
                            <span className="flow-title">Building</span>
                            <span className="flow-desc">Craft Vision</span>
                        </div>
                    </div>
                    {/* Automation */}
                    <div className={getNodeClass(2)}>
                        <div className="flow-icon icon-automation">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                                <path d="M16 10a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0v-1a4 4 0 0 1 4-4z" />
                                <path d="M8 10a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0v-1a4 4 0 0 1 4-4z" />
                                <path d="M12 17v5M8 22h8" />
                            </svg>
                        </div>
                        <div className="flow-label">
                            <span className="flow-title">Automation</span>
                            <span className="flow-desc">AI Workflows</span>
                        </div>
                    </div>
                </div>

                {/* Two parallel columns for the branches */}
                <div className="flow-dual-columns">
                    {/* Left Column: Building path */}
                    <div className="flow-column flow-column-left">
                        {/* Connector: Building to 3 technologies */}
                        <div className={`flow-connector connector-branch ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                            <svg className="branch-lines" viewBox="0 0 200 35" preserveAspectRatio="none">
                                <path d="M 100 0 C 100 20, 33 20, 33 35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                <path d="M 100 0 L 100 35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                <path d="M 100 0 C 100 20, 167 20, 167 35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                        </div>

                        {/* Level 3: Technology Branches */}
                        <div className="flow-level level-3 flow-branches-small">
                            {/* Next.js */}
                            <div className={`${getNodeClass(3)} flow-node-small`}>
                                <div className="flow-icon icon-tech">
                                    <svg viewBox="0 0 150 90" fill="currentColor">
                                        <path d="M34.992 23.495h27.855v2.219H37.546v16.699h23.792v2.219H37.546v18.334h25.591v2.219H34.992v-41.69zm30.35 0h2.96l13.115 18.334 13.405-18.334L113.055.207 83.1 43.756l15.436 21.429H95.46L81.417 45.683 67.316 65.185h-3.018L79.85 43.756 65.343 23.495zm34.297 2.219v-2.219h31.742v2.219h-14.623v39.47h-2.554v-39.47H99.64zM.145 23.495h3.192l44.011 66.003L29.16 65.185 2.814 26.648l-.116 38.537H.145v-41.69zm130.98 38.801c-.523 0-.914-.405-.914-.928 0-.524.391-.929.913-.929.528 0 .913.405.913.929 0 .524.405.929.914.929.523 0 .913-.405.913-.929z" />
                                    </svg>
                                </div>
                                <div className="flow-label">
                                    <span className="flow-title">Next.js</span>
                                </div>
                            </div>
                            {/* PHP */}
                            <div className={`${getNodeClass(3)} flow-node-small`}>
                                <div className="flow-icon icon-tech">
                                    <svg viewBox="0 0 256 135" fill="currentColor" transform="scale(1.1)">
                                        <path d="M152.9,87.5c0,0,6.1-31.4,6.1-31.4c1.4-7.1,0.2-12.4-3.4-15.7c-3.5-3.2-9.5-4.8-18.3-4.8h-10.6l3-15.6c0.1-0.6,0-1.2-0.4-1.7c-0.4-0.5-0.9-0.7-1.5-0.7h-14.6c-1,0-1.8,0.7-2,1.6l-6.5,33.3c-0.6-3.8-2-7-4.4-9.6c-4.3-4.9-11-7.4-20.1-7.4H52.1c-1,0-1.8,0.7-2,1.6L37,104.7c-0.1,0.6,0,1.2,0.4,1.7c0.4,0.5,0.9,0.7,1.5,0.7h14.7c1,0,1.8-0.7,2-1.6l3.2-16.3h10.9c5.7,0,10.6-0.6,14.3-1.8c3.9-1.3,7.4-3.4,10.5-6.3c2.5-2.3,4.6-4.9,6.2-7.7l-2.6,13.5c-0.1,0.6,0,1.2,0.4,1.7s0.9,0.7,1.5,0.7h14.6c1,0,1.8-0.7,2-1.6l7.2-37h10c4.3,0,5.5,0.8,5.9,1.2c0.3,0.3,0.9,1.5,0.2,5.2l-5.8,29.9c-0.1,0.6,0,1.2,0.4,1.7c0.4,0.5,0.9,0.7,1.5,0.7H151C151.9,89.1,152.7,88.4,152.9,87.5z M85.3,61.5c-0.9,4.7-2.6,8.1-5.1,10c-2.5,1.9-6.6,2.9-12,2.9h-6.5l4.7-24.2h8.4c6.2,0,8.7,1.3,9.7,2.4C85.8,54.2,86.1,57.3,85.3,61.5z M215.3,42.9c-4.3-4.9-11-7.4-20.1-7.4h-28.3c-1,0-1.8,0.7-2,1.6l-13.1,67.5c-0.1,0.6,0,1.2,0.4,1.7c0.4,0.5,0.9,0.7,1.5,0.7h14.7c1,0,1.8-0.7,2-1.6l3.2-16.3h10.9c5.7,0,10.6-0.6,14.3-1.8c3.9-1.3,7.4-3.4,10.5-6.3c2.6-2.4,4.8-5.1,6.4-8c1.6-2.9,2.8-6.1,3.5-9.6C220.9,54.7,219.6,47.9,215.3,42.9z M200,61.5c-0.9,4.7-2.6,8.1-5.1,10c-2.5,1.9-6.6,2.9-12,2.9h-6.5l4.7-24.2h8.4c6.2,0,8.7,1.3,9.7,2.4C200.6,54.2,200.9,57.3,200,61.5z" />
                                    </svg>
                                </div>
                                <div className="flow-label">
                                    <span className="flow-title">PHP</span>
                                </div>
                            </div>
                            {/* SQL */}
                            <div className={`${getNodeClass(3)} flow-node-small`}>
                                <div className="flow-icon icon-tech">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2.5c5.523 0 10 2.015 10 4.5s-4.477 4.5-10 4.5S2 9.485 2 7 6.477 2.5 12 2.5z" />
                                        <path d="M2 7v10c0 2.485 4.477 4.5 10 4.5s10-2.015 10-4.5V7" />
                                        <path d="M2 12c0 2.485 4.477 4.5 10 4.5s10-2.015 10-4.5" />
                                    </svg>
                                </div>
                                <div className="flow-label">
                                    <span className="flow-title">SQL</span>
                                </div>
                            </div>
                        </div>

                        {/* Connector: Merge from tech to WWW */}
                        <div className={`flow-connector connector-merge ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}>
                            <svg className="merge-lines" viewBox="0 0 200 35" preserveAspectRatio="none">
                                <path d="M 33 0 C 33 20, 100 20, 100 35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                <path d="M 100 0 L 100 35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                <path d="M 167 0 C 167 20, 100 20, 100 35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                        </div>

                        {/* WWW */}
                        <div className="flow-level level-4">
                            <div className={getNodeClass(4)}>
                                <div className="flow-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="2" y1="12" x2="22" y2="12" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                </div>
                                <div className="flow-label">
                                    <span className="flow-title">WWW</span>
                                    <span className="flow-desc">Deploy</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Automation -> n8n */}
                    <div className="flow-column flow-column-right">
                        {/* Spacer + long connector to push n8n down to WWW level */}
                        <div className={`flow-connector connector-long ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                            <div className="long-connector-line">
                                <svg viewBox="0 0 2 100" preserveAspectRatio="none" style={{ width: '2px', height: '100%' }}>
                                    <path d="M 1 0 L 1 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                </svg>
                            </div>
                        </div>

                        {/* n8n Node - aligned with WWW */}
                        <div className="flow-level level-4">
                            <div className={getNodeClass(4)}>
                                <div className="flow-icon icon-n8n">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="7" height="7" rx="1" />
                                        <rect x="14" y="3" width="7" height="7" rx="1" />
                                        <rect x="3" y="14" width="7" height="7" rx="1" />
                                        <rect x="14" y="14" width="7" height="7" rx="1" />
                                        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
                                    </svg>
                                </div>
                                <div className="flow-label">
                                    <span className="flow-title">n8n</span>
                                    <span className="flow-desc">Automation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connector: WWW and n8n merge to Online */}
                <div className={`flow-connector connector-dual-merge ${step === 4 ? 'active' : step > 4 ? 'completed' : ''}`}>
                    <svg className="dual-merge-lines" viewBox="0 0 400 40" preserveAspectRatio="none">
                        {/* Left merge: WWW(100) -> center(200) */}
                        <path d="M 100 2 C 100 22, 200 22, 200 38" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                        {/* Right merge: n8n(300) -> center(200) */}
                        <path d="M 300 2 C 300 22, 200 22, 200 38" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                </div>

                {/* Level 5: Online */}
                <div className="flow-level level-5">
                    <div className={getNodeClass(5)}>
                        <div className="flow-icon icon-success">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flow-label">
                            <span className="flow-title">Online</span>
                            <span className="flow-desc">Live!</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
