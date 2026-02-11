import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FeaturesSection from "../components/FeaturesSection";
import AboutSection from "../components/AboutSection";
import PricingSection from "../components/PricingSection";
import ResourcesSection from "../components/ResourcesSection";
import Footer from "../components/Footer";
import SuccessStoriesModal from "../components/SuccessStoriesModal";
import "./HomePage.css";

function HomePage() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const getNavLinkClass = (sectionId) => {
    const baseClass = "text-sm font-medium transition-colors cursor-pointer";
    const inactiveClass = "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary";
    const activeClass = "text-primary dark:text-primary font-bold";
    return `${baseClass} ${activeSection === sectionId ? activeClass : inactiveClass}`;
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 transition-colors duration-300 font-body antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
                <span className="material-icons text-primary text-2xl">smart_toy</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">ResuMate AI</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className={getNavLinkClass('about')}>About Us</button>
              <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className={getNavLinkClass('features')}>Features</button>
              <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className={getNavLinkClass('pricing')}>Pricing</button>
              <button onClick={() => setIsSuccessModalOpen(true)} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Success Stories</button>
              <button onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })} className={getNavLinkClass('resources')}>Resources</button>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button aria-label="Toggle Dark Mode" className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none" onClick={toggleDark}>
                <span className="material-icons dark:hidden">dark_mode</span>
                <span className="material-icons hidden dark:block text-yellow-400">light_mode</span>
              </button>
              <Link className="text-sm font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors" to="/login">Sign In</Link>
              <Link className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40" to="/register">Get Started</Link>
            </div>
            <div className="md:hidden flex items-center gap-4">
              <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none" onClick={toggleDark}>
                <span className="material-icons dark:hidden">dark_mode</span>
                <span className="material-icons hidden dark:block text-yellow-400">light_mode</span>
              </button>
              <button className="text-slate-600 dark:text-slate-300 hover:text-primary">
                <span className="material-icons text-3xl">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden min-h-[calc(100vh-5rem)]">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl dark:bg-primary/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-3xl dark:bg-teal-900/20 pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col items-start space-y-8">
              <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800/50 rounded-full pl-2 pr-4 py-1 animate-fade-in-up">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                  <span className="material-icons text-[14px]">bolt</span>
                </span>
                <span className="text-xs font-semibold text-primary dark:text-teal-400 uppercase tracking-wide">New Feature</span>
                <span className="text-sm text-slate-800 dark:text-slate-300 font-medium">Auto-Interview Scheduling</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.15]">
                  AI-Powered <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">Resume Screening.</span> <br />
                  Move Smarter, Not Slower.
                </h1>
                <p className="text-lg sm:text-xl text-slate-900 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">
                  An AI-powered resume analyzer built for modern hiring. It instantly scans resumes, matches them with job descriptions, and delivers clear ATS scores, skill insights, and hiring decisions—fast, fair, and data-driven.
                </p>
              </div>

              <ul className="space-y-4 pt-2">
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="material-icons text-primary group-hover:scale-110 transition-transform">check_circle</span>
                  </div>
                  <span className="text-base text-slate-900 dark:text-slate-300 font-semibold">Upload resumes &amp; job descriptions in bulk</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="material-icons text-primary group-hover:scale-110 transition-transform">check_circle</span>
                  </div>
                  <span className="text-base text-slate-900 dark:text-slate-300 font-semibold">Instant ATS score &amp; skills gap analysis</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="material-icons text-primary group-hover:scale-110 transition-transform">check_circle</span>
                  </div>
                  <span className="text-base text-slate-900 dark:text-slate-300 font-semibold">Make data-driven hiring decisions 10x faster</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-1">
                  <span className="material-icons">play_circle_filled</span>
                  <span>View Demo</span>
                </button>
              </div>

              <div className="pt-8 w-full border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest mb-4">Trusted by HR teams at</p>
                <div className="flex flex-wrap gap-8 items-center opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="h-6 w-24 bg-slate-800 dark:bg-white mask-logo rounded" />
                  <div className="h-5 w-20 bg-slate-800 dark:bg-white mask-logo rounded opacity-80" />
                  <div className="h-7 w-28 bg-slate-800 dark:bg-white mask-logo rounded opacity-90" />
                  <div className="h-6 w-24 bg-slate-800 dark:bg-white mask-logo rounded opacity-80" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="relative w-full max-w-[85%] mx-auto">

                <div className="home-illustration">
                  {/* Hero Robot Image */}
                  <div className="relative overflow-hidden rounded-xl w-full h-full min-h-[400px]">
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                    <img
                      alt="AI Recruiter"
                      className="hero-robot w-full h-full object-cover"
                      src="/assets/images/resumate-ai.png"
                    />
                  </div>

                </div>

                {/* Block 1: ATS MATCH - Top Left */}
                <div className="glass-block home-block home-block-1">
                  <div className="block-header">
                    <span className="block-label">ATS Match</span>
                    <span className="block-value">94%</span>
                  </div>
                  <div className="bar-graph">
                    <div className="bar bar-up" style={{ height: "80%" }}></div>
                    <div className="bar bar-down" style={{ height: "40%" }}></div>
                    <div className="bar bar-up" style={{ height: "95%" }}></div>
                  </div>
                </div>

                {/* Block 2: SENIOR DEV - Top Right */}
                <div className="glass-block home-block home-block-2">
                  <div className="block-header">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="block-title">Senior Developer</span>
                  </div>
                  <div className="tag-group">
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">Node</span>
                    <span className="skill-tag">AWS</span>
                  </div>
                </div>

                {/* Block 3: BULK UPLOAD - Left Center */}
                <div className="glass-block home-block home-block-3">
                  <div className="block-header">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="block-title">Bulk Upload</span>
                  </div>
                  <div className="upload-rows">
                    <div className="upload-row">
                      <div className="file-info">resume_v1.pdf</div>
                      <div className="progress-bg">
                        <div className="progress-bar" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                    <div className="upload-row">
                      <div className="file-info">scanning...</div>
                      <div className="progress-bg">
                        <div className="progress-bar scanning" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Block 4: STRONG CANDIDATE - Below Bulk Upload */}
                <div className="glass-block home-block home-block-4">
                  <div className="report-summary">
                    <div className="progress-ring">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <span className="ring-text">85%</span>
                    </div>
                    <div className="report-details">
                      <div className="status-badge">Strong Candidate</div>
                      <div className="mini-bars">
                        <div className="m-bar">
                          <div className="p-bar" style={{ width: "95%" }}></div>
                        </div>
                        <div className="m-bar">
                          <div className="p-bar" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Block 5: MAIL SENT - Bottom Center */}
                <div className="glass-block home-block home-block-5">
                  <div className="block-sub-label">Automated Email</div>
                  <div className="block-header">
                    <div className="email-icon">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="block-title">Mail Sent</span>
                  </div>
                  <div className="candidate-row">
                    <div className="avatar-small"></div>
                    <span className="candidate-name">Alex Rivera</span>
                    <div className="success-check">✔</div>
                  </div>
                </div>

                {/* Subtle background glow behind the robot - No border */}
                <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 blur-3xl opacity-20 transform scale-110 rounded-full" />
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* About Us Section */}
      <AboutSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Resources Section */}
      <ResourcesSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <SuccessStoriesModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onExplore={() => {
          setIsSuccessModalOpen(false);
          document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onFeedback={() => {
          setIsSuccessModalOpen(false);
          const footer = document.querySelector('.footer');
          if (footer) footer.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Local styles for small animations */}
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes bounce-delayed { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
        .animate-bounce-delayed { animation: bounce-delayed 5s infinite ease-in-out 1s; }
        .mask-logo {}
      `}</style>
    </div>
  );
}

export default HomePage;
