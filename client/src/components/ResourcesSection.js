import React, { useState } from 'react';
import './ResourcesSection.css';

const ResourcesSection = () => {
    const [activeCategory, setActiveCategory] = useState('product-docs');

    const contentData = {
        'product-docs': {
            title: 'Product Documentation',
            description: "Complete technical and functional guides to get your team onboarded with ResuMate AI's core engine. From initial configuration to advanced talent mapping strategies.",
            learningPathTitle: 'Key Learning Path',
            learningPath: [
                'Resume screening workflow',
                'ATS score breakdown & weighting',
                'Candidate matching logic'
            ],
            btnText: 'View Documentation'
        },
        'how-it-works': {
            title: 'How ResuMate AI Works',
            description: 'ResuMate AI follows a structured, UI-first workflow designed to mirror real-world recruitment processes, from job intake to candidate communication.',
            learningPathTitle: 'Key Workflow Steps',
            learningPath: [
                'Job description ingestion and semantic analysis',
                'Resume parsing and skill extraction',
                'ATS scoring and candidate-fit evaluation',
                'Skills gap and match insights generation',
                'Automated interview scheduling and communication'
            ],
            btnText: 'Explore Workflow'
        },
        'hiring-insights': {
            title: 'Hiring Insights',
            description: 'Actionable insights based on real recruitment workflows, early user feedback, and AI-driven resume and job description analysis.',
            learningPathTitle: 'Key Insight Areas',
            learningPath: [
                'Resume screening & ATS behavior',
                'Job description quality and matching accuracy',
                'Candidate evaluation and skill-gap analysis',
                'Hiring workflow automation',
                'Early access learnings from recruiters'
            ],
            btnText: 'Explore Insights'
        },
        'faq': {
            title: 'Frequently Asked Questions',
            description: 'Find answers to common questions about ResuMate AI\'s capabilities, integrations, and data security standards.',
            learningPathTitle: 'Common Questions',
            learningPath: [
                'How does the AI parsing engine handle different file formats?',
                'Is candidate data secure and GDPR compliant?',
                'Can I customize the ATS scoring criteria?',
                'What integrations are currently supported?'
            ],
            btnText: 'View All FAQs'
        },
        'feedback': {
            title: 'Feedback & Early Access',
            description: 'Join our exclusive community of early adopters. Shape the future of ResuMate AI by sharing your feedback and feature requests.',
            learningPathTitle: 'Community Benefits',
            learningPath: [
                'Early access to beta features',
                'Direct channel to the product team',
                'Priority support and onboarding',
                'Exclusive webinars and insights'
            ],
            btnText: 'Join Community'
        }
    };

    const activeContent = contentData[activeCategory] || contentData['product-docs'];

    return (
        <section id="resources">
            <div className="resources-container">
                {/* Header Section */}
                <div className="resources-header">
                    <span className="resources-pill">Resources</span>
                    <h1 className="resources-title">
                        Everything You Need to Explore<br />and Shape <span className="text-primary">ResuMate AI</span>
                    </h1>
                    <p className="resources-subtitle">
                        Comprehensive guides, technical insights, and collaboration tools to help you master AI-driven recruitment.
                    </p>
                </div>

                <div className="resources-content-grid">
                    {/* Sidebar */}
                    <aside className="resources-sidebar">
                        <div>
                            <div className="sidebar-section-title">Categories</div>
                            <div className="sidebar-menu">
                                <div
                                    className={`sidebar-item ${activeCategory === 'product-docs' ? 'active' : ''}`}
                                    onClick={() => setActiveCategory('product-docs')}
                                >
                                    <span className="material-icons">description</span>
                                    Product Documentation
                                    {activeCategory === 'product-docs' && <span className="material-icons" style={{ marginLeft: 'auto', fontSize: '1rem' }}>chevron_right</span>}
                                </div>
                                <div
                                    className={`sidebar-item ${activeCategory === 'how-it-works' ? 'active' : ''}`}
                                    onClick={() => setActiveCategory('how-it-works')}
                                >
                                    <span className="material-icons">help_outline</span>
                                    How ResuMate AI Works
                                    {activeCategory === 'how-it-works' && <span className="material-icons" style={{ marginLeft: 'auto', fontSize: '1rem' }}>chevron_right</span>}
                                </div>
                                <div
                                    className={`sidebar-item ${activeCategory === 'hiring-insights' ? 'active' : ''}`}
                                    onClick={() => setActiveCategory('hiring-insights')}
                                >
                                    <span className="material-icons">insights</span>
                                    Hiring Insights
                                    {activeCategory === 'hiring-insights' && <span className="material-icons" style={{ marginLeft: 'auto', fontSize: '1rem' }}>chevron_right</span>}
                                </div>
                                <div
                                    className={`sidebar-item ${activeCategory === 'faq' ? 'active' : ''}`}
                                    onClick={() => setActiveCategory('faq')}
                                >
                                    <span className="material-icons">quiz</span>
                                    FAQ
                                    {activeCategory === 'faq' && <span className="material-icons" style={{ marginLeft: 'auto', fontSize: '1rem' }}>chevron_right</span>}
                                </div>
                                <div
                                    className={`sidebar-item ${activeCategory === 'feedback' ? 'active' : ''}`}
                                    onClick={() => setActiveCategory('feedback')}
                                >
                                    <span className="material-icons">rate_review</span>
                                    Feedback & Early Access
                                    {activeCategory === 'feedback' && <span className="material-icons" style={{ marginLeft: 'auto', fontSize: '1rem' }}>chevron_right</span>}
                                </div>
                            </div>
                        </div>


                    </aside>

                    {/* Main Content */}
                    <main>
                        <div className="doc-card">
                            <div className="doc-content">
                                <h2 className="doc-title">{activeContent.title}</h2>
                                <p className="doc-description">
                                    {activeContent.description}
                                </p>

                                <div className="learning-path-title">{activeContent.learningPathTitle}</div>
                                <div className="learning-path-list">
                                    {activeContent.learningPath.map((item, index) => (
                                        <div key={index} className="learning-path-item">
                                            <span className="material-icons">check_circle</span>
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <div className="doc-actions">
                                    <button className="view-doc-btn">
                                        {activeContent.btnText}
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
        </section>
    );
};

export default ResourcesSection;
