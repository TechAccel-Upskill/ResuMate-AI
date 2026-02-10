import React from 'react';
// Navbar import removed because it is implemented inline
// Actually, HomePage has Nav inline. I should verify if there is a Navbar component.
// Looking at the file list, there isn't a Navbar.js in components.
// I will copy the Nav structure from HomePage or create a reusable Navbar if I were refactoring, but for this task I will include the Nav in the page to ensure consistency with the requested layout, or just minimal needed for the page context.
// The design just shows the content. I'll stick to the content layout mostly, but I'll add a simple Nav placeholder or reuse the one from AuthProvider if avail.
// Wait, HomePage.js has the Nav inside it.
// I will create a simple Nav for this page or just the back button? The image implies a full page.
// I'll replicate the HomePage nav structure for consistency but tailored for this page if needed.

// Checking requirements again: "i need this exact ui in the rescource section just make only 2 changes remove image and updated box from product description box thats it"
// This implies the MAIN CONTENT is what matters.

import './ResourcesPage.css';

const ResourcesPage = () => {
    return (
        <div className="resources-page">
            {/* Simple Nav for navigation back to Home or consistent look */}
            <nav className="w-full z-50 bg-transparent border-b border-slate-800">
                <div className="max-w-[1600px] mx-auto px-4 md:px-6">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
                            <div className="bg-teal-500/20 p-2 rounded-lg">
                                <span className="material-icons text-teal-500 text-2xl">smart_toy</span>
                            </div>
                            <span className="font-bold text-2xl tracking-tight text-white">ResuMate AI</span>
                        </div>
                        <div className="hidden md:flex space-x-8 items-center">
                            <a href="/" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">Home</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="resources-container">
                {/* Header Section */}
                <div className="resources-header">
                    <span className="resources-pill">Resources</span>
                    <h1 className="resources-title">
                        Explore, Learn, and<br />Collaborate
                    </h1>
                    <p className="resources-subtitle">
                        Master the art of AI-driven recruitment with our comprehensive guides and industry insights. Built for modern talent teams.
                    </p>
                </div>

                <div className="resources-content-grid">
                    {/* Sidebar */}
                    <aside className="resources-sidebar">
                        <div>
                            <div className="sidebar-section-title">Categories</div>
                            <div className="sidebar-menu">
                                <div className="sidebar-item active">
                                    <span className="material-icons">description</span>
                                    Product Documentation
                                    <span className="material-icons" style={{ marginLeft: 'auto', fontSize: '1rem' }}>chevron_right</span>
                                </div>
                                <div className="sidebar-item">
                                    <span className="material-icons">help_outline</span>
                                    How ResuMate AI Works
                                </div>
                                <div className="sidebar-item">
                                    <span className="material-icons">insights</span>
                                    Hiring Insights
                                </div>
                                <div className="sidebar-item">
                                    <span className="material-icons">code</span>
                                    API Reference
                                </div>
                                <div className="sidebar-item">
                                    <span className="material-icons">folder_open</span>
                                    Case Studies
                                </div>
                            </div>
                        </div>

                        <div className="search-container">
                            <span className="material-icons search-icon">search</span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search resources..."
                            />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main>
                        <div className="doc-card">
                            <div className="doc-content">
                                {/* Removed Image as requested */}

                                <h2 className="doc-title">Product Documentation</h2>
                                <p className="doc-description">
                                    Complete technical and functional guides to get your team onboarded with ResuMate AI's core engine. From initial configuration to advanced talent mapping strategies.
                                </p>

                                <div className="learning-path-title">Key Learning Path</div>
                                <div className="learning-path-list">
                                    <div className="learning-path-item">
                                        <span className="material-icons">check_circle</span>
                                        Resume screening workflow
                                    </div>
                                    <div className="learning-path-item">
                                        <span className="material-icons">check_circle</span>
                                        ATS score breakdown & weighting
                                    </div>
                                    <div className="learning-path-item">
                                        <span className="material-icons">check_circle</span>
                                        Candidate matching logic
                                    </div>
                                </div>

                                {/* Removed "Updated: Oct 2023" box as requested */}

                                <div className="doc-actions">
                                    <button className="view-doc-btn">
                                        View Documentation
                                        <span className="material-icons">arrow_forward</span>
                                    </button>
                                    <button className="download-btn">
                                        Download PDF Guide
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
