import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 transition-colors duration-300 font-body antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
                <span className="material-icons text-primary text-2xl">smart_toy</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">ResuMate AI</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <button className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Features</button>
              <button className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Pricing</button>
              <button className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Success Stories</button>
              <button className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">Resources</button>
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
                <span className="text-sm text-slate-600 dark:text-slate-300">Auto-Interview Scheduling</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  AI-Powered <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Resume Screening.</span> <br />
                  Move Smarter, Not Slower.
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  An AI-powered resume analyzer built for modern hiring. It instantly scans resumes, matches them with job descriptions, and delivers clear ATS scores, skill insights, and hiring decisions—fast, fair, and data-driven.
                </p>
              </div>

              <ul className="space-y-4 pt-2">
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="material-icons text-primary group-hover:scale-110 transition-transform">check_circle</span>
                  </div>
                  <span className="text-base text-slate-700 dark:text-slate-300 font-medium">Upload resumes &amp; job descriptions in bulk</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="material-icons text-primary group-hover:scale-110 transition-transform">check_circle</span>
                  </div>
                  <span className="text-base text-slate-700 dark:text-slate-300 font-medium">Instant ATS score &amp; skills gap analysis</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="material-icons text-primary group-hover:scale-110 transition-transform">check_circle</span>
                  </div>
                  <span className="text-base text-slate-700 dark:text-slate-300 font-medium">Make data-driven hiring decisions 10x faster</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-1">
                  <span className="material-icons">play_circle_filled</span>
                  <span>View Demo</span>
                </button>
              </div>

              <div className="pt-8 w-full border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Trusted by HR teams at</p>
                <div className="flex flex-wrap gap-8 items-center opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="h-6 w-24 bg-slate-800 dark:bg-white mask-logo rounded" />
                  <div className="h-5 w-20 bg-slate-800 dark:bg-white mask-logo rounded opacity-80" />
                  <div className="h-7 w-28 bg-slate-800 dark:bg-white mask-logo rounded opacity-90" />
                  <div className="h-6 w-24 bg-slate-800 dark:bg-white mask-logo rounded opacity-80" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-4 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 ring-1 ring-slate-200 dark:ring-slate-700">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                  <img alt="Hero visual" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvPO732jRzUgTH9rNIEoXfNyS0ZMf9aiZOZCPRkKD8MKd3RmcMyD0Spy319kMguAMWrFD14MKZK9rDIPvL8xnSCuybYJEboNqRUbK3R4lBcJU6zd4s2zNhv-iYRBhPatNkqeJXFcSvNvrmS5HdphIOxLD6mJc0iIBx9rYwltEfoNtvjVDKeg1OZ95a-mvNaYa_SMlAotHAkvJRaZtdRaLfV0uVLnP0Qk4aMIPrr1O_o2cDIx_vypt3tEDYhedSOeTW6BdkEtA6p54" />
                </div>
                <div className="absolute -top-6 -right-6 lg:-right-12 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-20 w-48 animate-bounce-slow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                      <img alt="Candidate" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvPO732jRzUgTH9rNIEoXfNyS0ZMf9aiZOZCPRkKD8MKd3RmcMyD0Spy319kMguAMWrFD14MKZK9rDIPvL8xnSCuybYJEboNqRUbK3R4lBcJU6zd4s2zNhv-iYRBhPatNkqeJXFcSvNvrmS5HdphIOxLD6mJc0iIBx9rYwltEfoNtvjVDKeg1OZ95a-mvNaYa_SMlAotHAkvJRaZtdRaLfV0uVLnP0Qk4aMIPrr1O_o2cDIx_vypt3tEDYhedSOeTW6BdkEtA6p54" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-3/4" />
                      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded w-1/2" />
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-1">
                      <span className="material-icons text-primary text-sm">auto_awesome</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Top Candidate</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-20 w-56 animate-bounce-delayed">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <span className="material-icons text-primary">analytics</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">ATS Analysis</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Processing batch #402</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-2 rounded-full w-[85%]" />
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span>Scanning skills...</span>
                    <span className="text-primary">85%</span>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 blur-3xl opacity-30 dark:opacity-20 transform rotate-6 scale-110" />
            </div>
          </div>
        </div>
      </main>

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
