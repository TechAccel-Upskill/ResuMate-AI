import React, { useEffect, useRef, useState } from "react";

function FeaturesSection() {
    const [isVisible, setIsVisible] = useState(false);
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

    const features = [
        {
            icon: "search",
            title: "AI Resume Screening",
            description: "Instant parsing of top talent using advanced LLMs to identify high-potential candidates in milliseconds.",
            delay: "0ms"
        },
        {
            icon: "download",
            title: "Job Description Matching",
            description: "Contextual alignment of candidates to specific roles and team culture using semantic understanding.",
            delay: "100ms"
        },
        {
            icon: "insert_chart",
            title: "ATS & Skill Gap Analysis",
            description: "Identify exactly what is missing in your talent pipeline automatically with data-driven mapping.",
            delay: "200ms"
        },
        {
            icon: "rocket_launch",
            title: "Faster Hiring Decisions",
            description: "Reduce time-to-hire by 60% with instant data-driven insights and candidate scoring models.",
            delay: "300ms"
        },
        {
            icon: "layers",
            title: "Bulk Resume Processing",
            description: "Upload and analyze thousands of profiles in seconds. Scalable architecture for high-volume needs.",
            delay: "400ms"
        },
        {
            icon: "mail",
            title: "Automated Workflows",
            description: "End-to-end automation for interview scheduling and personalized email sequences. Streamline candidate follow-ups without manual effort.",
            delay: "500ms",
            badge: "PRO"
        }
    ];

    return (
        <section
            id="features"
            ref={sectionRef}
            className="relative py-20 lg:py-28 overflow-hidden bg-[#0a0f1a]"
        >
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-[#0a0f1a] to-slate-950/50 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 border border-cyan-500/30 rounded-md px-3 py-1 mb-6">
                        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">ENTERPRISE INTELLIGENCE</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                        Everything You Need for <br className="hidden sm:block" />
                        <span className="text-cyan-400">Smarter Hiring</span>
                    </h2>

                    <p className="text-base text-slate-400 leading-relaxed">
                        Powerful AI tools designed to streamline your recruitment pipeline<br className="hidden sm:block" /> and find the perfect fit faster.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative bg-gradient-to-br from-slate-900/40 to-slate-800/20 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6 transition-all duration-500 hover:scale-[1.02] hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            style={{
                                transitionDelay: isVisible ? feature.delay : '0ms'
                            }}
                        >
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 to-cyan-400/0 group-hover:from-cyan-500/5 group-hover:to-cyan-400/5 transition-all duration-500 pointer-events-none" />

                            {/* Pro badge */}
                            {feature.badge && (
                                <div className="absolute top-4 right-4 bg-cyan-500 text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-lg">
                                    {feature.badge}
                                </div>
                            )}

                            {/* Icon container - Square with teal outline */}
                            <div className="relative mb-5">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg border-2 border-cyan-500/60 bg-cyan-500/5 group-hover:border-cyan-400 group-hover:bg-cyan-500/10 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                                    <span className="material-icons text-cyan-400 text-2xl group-hover:scale-110 transition-transform duration-500">
                                        {feature.icon}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-400 transition-colors duration-300">
                                {feature.title}
                            </h3>

                            <p className="text-slate-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
