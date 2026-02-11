import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function PricingSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const currentSection = sectionRef.current;
        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, []);

    const features = [
        "AI resume screening",
        "Job description matching",
        "ATS & skill gap analysis",
        "Bulk resume processing",
        "Automated interview & email workflows",
        "Industry feedback-driven updates"
    ];

    return (
        <section
            id="pricing"
            ref={sectionRef}
            className="relative py-24 lg:py-32 overflow-hidden bg-[#0a0f1a]"
        >
            {/* Background gradient matching About Section */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-[#0a0f1a] to-slate-950/50 pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                {/* Header - Centered */}
                <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        Simple Pricing. <span className="text-cyan-400">Early Access <br /> Free.</span>
                    </h2>

                    <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        ResuMate AI is currently available at no cost as part of our early-access program. Pricing may be introduced based on product maturity and demand.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className={`max-w-md mx-auto relative group transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                    <div className="relative bg-[#061C1F] border border-cyan-900/40 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-cyan-900/20 overflow-hidden">

                        {/* Top Row: Title + Badge */}
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl font-bold text-white">Early Access Plan</h3>
                            <span className="bg-cyan-400 text-[#05181C] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Early Access
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl sm:text-6xl font-extrabold text-white">₹0</span>
                            <span className="text-xl text-cyan-400 font-medium">/ Free</span>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-cyan-900/30 mb-8" />

                        {/* Features List */}
                        <ul className="space-y-5 mb-10">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                                            <span className="material-icons text-[#05181C] text-[14px] font-bold">check</span>
                                        </div>
                                    </div>
                                    <span className="text-slate-300 text-sm font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#05181C] font-extrabold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 transform hover:-translate-y-0.5"
                        >
                            Get Started for Free
                        </button>

                    </div>
                </div>

                {/* Disclaimer */}
                <div className={`text-center mt-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-slate-500 text-xs italic">
                        Early access users will receive advance notice before any pricing changes are introduced.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default PricingSection;
