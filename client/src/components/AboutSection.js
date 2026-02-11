import React, { useEffect, useRef, useState } from "react";
import CollaborationModal from "./CollaborationModal";

function AboutSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0f1a]"
        >
            <CollaborationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Subtle background gradient from top */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-[#0a0f1a] to-slate-950/50 pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                {/* Header - Centered */}
                <div className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-900/10 rounded-full px-4 py-1.5 mb-8">
                        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">ABOUT RESUMATE AI</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                        Built to Solve Real-World <br />
                        Hiring Challenges
                    </h2>

                    <p className="text-lg text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto">
                        Bridging the gap between talent and opportunities with precision-engineered AI solutions designed for the modern recruiter.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left Column - Our Story & Features */}
                    <div className="lg:col-span-7 flex flex-col gap-12">
                        {/* Story Text */}
                        <div className={`space-y-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <h3 className="text-2xl font-bold text-white mb-2">Our Story</h3>

                            <div className="space-y-6 text-slate-400 text-[15px] leading-7 font-medium">
                                <p>
                                    ResuMate AI is being developed by interns at <span className="text-white font-bold">TechAccel India Pvt. Ltd.</span>, an upskilling-focused organization that mentors emerging talent to work on real-world problems faced by the IT industry.
                                </p>

                                <p>
                                    Under continuous mentorship, the team follows a UI-first, workflow-driven approach to design hiring solutions that reflect actual recruiter needs—from resume screening and ATS analysis to automated interview communication.
                                </p>

                                <p>
                                    The platform is currently in an early-access phase, where feedback from recruiters, developers, and sales professionals plays a key role in shaping features, usability, and real-world readiness.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Features Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* UI-First Design */}
                            <div
                                className={`group relative bg-[#0f1623] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: '300ms' }}
                            >
                                <div className="mb-4">
                                    <span className="material-icons text-cyan-400 text-2xl">architecture</span>
                                </div>
                                <h4 className="text-base font-bold text-white mb-2">UI-First Design</h4>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                    Prioritizing seamless UX for high-volume hiring efficiency.
                                </p>
                            </div>

                            {/* Recruiter-Driven */}
                            <div
                                className={`group relative bg-[#0f1623] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: '400ms' }}
                            >
                                <div className="mb-4">
                                    <span className="material-icons text-cyan-400 text-2xl">groups</span>
                                </div>
                                <h4 className="text-base font-bold text-white mb-2">Recruiter-Driven</h4>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                    Features mapped to solve actual recruitment pain points.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Collaboration & Product Owner */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Industry Collaboration Card - Compact Version */}
                        <div
                            className={`relative bg-gradient-to-br from-[#0f1623] to-[#0a0f1a] border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-cyan-900/5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: '200ms' }}
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-20 blur-lg rounded-2xl pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded bg-cyan-950/30 border border-cyan-800/50">
                                        <span className="material-icons text-cyan-400 text-lg">handshake</span>
                                    </div>
                                    <h4 className="text-base font-bold text-cyan-400">Industry Collaboration</h4>
                                </div>

                                <p className="text-slate-400 text-xs leading-relaxed mb-5">
                                    Seeking strategic partnerships with HR tech firms and recruitment agencies to refine our AI models.
                                </p>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 text-sm font-bold py-2.5 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                    >
                                        <span>Collaborate</span>
                                        <span className="material-icons text-base">arrow_forward</span>
                                    </button>

                                    <button className="w-full bg-transparent hover:bg-slate-800 text-white text-sm font-semibold py-2.5 px-3 rounded-lg border border-slate-700 transition-colors duration-200">
                                        Feedback
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Owner Card */}
                        <div
                            className={`relative bg-[#0f1623] border border-slate-800 rounded-2xl p-8 text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: '400ms' }}
                        >
                            {/* Soft Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                {/* Avatar */}
                                <div className="w-32 h-32 rounded-full border-4 border-[#0a0f1a] shadow-lg mb-5 overflow-hidden bg-slate-800 relative">
                                    <img
                                        src="/assets/images/manas.png"
                                        alt="Manas Thumu"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Name & Role */}
                                <h3 className="text-2xl font-bold text-white mb-1">Manas Thumu</h3>
                                <div className="inline-block bg-cyan-900/30 border border-cyan-500/30 rounded-full px-3 py-0.5 mb-5">
                                    <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">Product Owner</span>
                                </div>

                                {/* Bio */}
                                <div className="text-slate-400 text-xs leading-relaxed mb-6 max-w-sm mx-auto space-y-3">
                                    <p>
                                        I am an AI Intern and Full-Stack Developer at TechAccel India Pvt. Ltd., contributing to the development of intelligent, scalable web applications for recruitment and HR technology.
                                    </p>
                                    <p>
                                        Working under industry mentorship, I build user-centric frontend interfaces and robust backend systems, integrating AI-driven logic and clean APIs.
                                    </p>
                                    <p>
                                        I am passionate about AI, automation, and clean code, focused on delivering high-performance, intuitive, and scalable digital solutions.
                                    </p>
                                </div>

                                {/* Social Icons */}
                                <div className="flex items-center justify-center gap-4 mb-8">
                                    {/* LinkedIn - Blue */}
                                    <a
                                        href="https://www.linkedin.com/in/manas-thumu-a9454424b/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/30 hover:border-[#0077b5] flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <svg className="w-5 h-5 fill-[#0077b5] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.224 0z" />
                                        </svg>
                                    </a>

                                    {/* GitHub - White */}
                                    <a
                                        href="https://github.com/Manasanoop28"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-white/50 flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <svg className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>

                                    {/* Email - Default */}
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-300 group"
                                    >
                                        <span className="material-icons text-xl group-hover:scale-110 transition-transform">email</span>
                                    </a>
                                </div>

                                {/* Divider & Footer */}
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-4"></div>
                                <div className="flex items-center gap-2 opacity-60">
                                    <span className="material-icons text-cyan-400 text-sm">school</span>
                                    <span className="text-xs font-medium text-slate-300">TechAccel Alumni & Mentor</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
