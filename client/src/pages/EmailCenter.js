import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import './EmailCenter.css';
import '../pages/Dashboard.css';
import RecruiterProfileCard from '../components/RecruiterProfileCard';
import ThemeToggle from '../components/ThemeToggle';

const EmailCenter = () => {
    const { user, signOut } = useAuth();
    // const { id } = useParams(); // Use this to fetch candidate data in real app

    // Mock Data for "Sarah Jenkins" or "Alex Jensen"
    const candidate = {
        name: 'Alex Jensen',
        role: 'Senior Frontend Engineer',
        email: 'alex.jensen@example.com',
        match: 98,
        img: 'https://i.pravatar.cc/150?img=11'
    };

    const [emailType, setEmailType] = useState('selection'); // 'selection' | 'rejection'

    const [showModal, setShowModal] = useState(false); // Modal state

    const handleSignOut = async () => {
        await signOut();
    };

    const handleSendClick = () => {
        setShowModal(true);
    };

    return (
        <div className="ea-container">
            {/* ... existing sidebar ... */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="icon-box">
                        <span className="material-icons" style={{ color: 'white', fontSize: '20px' }}>smart_toy</span>
                    </div>
                    <span>ResuMate AI</span>
                </div>

                <div className="menu-label">Menu</div>
                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-item">
                        <span className="material-icons">grid_view</span>
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/job-description" className="nav-item">
                        <span className="material-icons">description</span>
                        <span>Job Description</span>
                    </Link>
                    <Link to="/resume-scan" className="nav-item">
                        <span className="material-icons">document_scanner</span>
                        <span>Resume Scan</span>
                    </Link>
                    <Link to="/reports" className="nav-item">
                        <span className="material-icons">analytics</span>
                        <span>Reports</span>
                    </Link>
                    <Link to="/email-automation/1" className="nav-item active">
                        <span className="material-icons">mail</span>
                        <span>Email Center</span>
                    </Link>
                </nav>

                {/* RECRUITER CARD */}
                <RecruiterProfileCard />
            </aside>

            {/* MAIN CONTENT */}
            <main className="ea-main">
                {/* Header */}
                <header className="ea-header">
                    <div className="ea-breadcrumbs" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Reports › Email Center
                    </div>
                    <div className="ea-header-right">
                        <ThemeToggle />
                    </div>
                </header>

                <div className="ea-content-wrapper">
                    <div className="ea-page-title-row">
                        <div>
                            <h1>Email Center</h1>
                            <p className="subtitle">Review and customize the AI-generated response before sending.</p>
                        </div>
                        <div className="ai-badge-ready">
                            <span className="material-icons">check_circle</span> AI Draft Ready
                        </div>
                    </div>

                    {/* Candidate Summary Card */}
                    <div className="ea-candidate-card">
                        <div className="ea-c-profile">
                            <img src={candidate.img} alt={candidate.name} />
                            <div className="ea-c-info">
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <h2>{candidate.name}</h2>
                                    <span className="tag-complete">INTERVIEW COMPLETE</span>
                                </div>
                                <div className="ea-c-meta">
                                    <span><span className="material-icons">email</span> {candidate.email}</span>
                                    <span><span className="material-icons">work</span> {candidate.role}</span>
                                    <span className="match-score"><span className="material-icons">star</span> {candidate.match}% Match Score</span>
                                </div>
                            </div>
                        </div>
                        <button className="btn-outline-sm">View Profile</button>
                    </div>

                    {/* Email Editor */}
                    <div className="email-editor-container">
                        <div className="editor-top-bar">
                            <div className="type-toggle">
                                <button
                                    className={emailType === 'selection' ? 'active' : ''}
                                    onClick={() => setEmailType('selection')}
                                >
                                    <span className="material-icons">check</span> Selection Email
                                </button>
                                <button
                                    className={emailType === 'rejection' ? 'active' : ''}
                                    onClick={() => setEmailType('rejection')}
                                >
                                    Rejection Email
                                </button>
                            </div>
                            <div className="ai-gen-label">
                                <span className="material-icons">auto_awesome</span> AI GENERATED DRAFT
                            </div>
                        </div>

                        <div className="editor-fields">
                            <div className="field-row">
                                <label>To:</label>
                                <div className="field-input readonly">
                                    {candidate.name} &lt;{candidate.email}&gt;
                                </div>
                            </div>
                            <div className="field-row">
                                <label>Subject:</label>
                                <div className="field-input">
                                    {emailType === 'selection'
                                        ? `Offer of Employment - ${candidate.role} Role`
                                        : `Update regarding your application for ${candidate.role}`
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="editor-body">
                            {/* Fake Toolbar */}
                            <div className="editor-toolbar">
                                <span className="material-icons">format_bold</span>
                                <span className="material-icons">format_italic</span>
                                <span className="material-icons">format_underlined</span>
                                <div className="div-line"></div>
                                <span className="material-icons">format_list_bulleted</span>
                                <span className="material-icons">link</span>
                                <div className="ai-tools">
                                    <button className="ai-tool-btn purple">
                                        <span className="material-icons">face</span> Make Friendlier
                                    </button>
                                    <button className="ai-tool-btn blue">
                                        <span className="material-icons">compress</span> Shorten
                                    </button>
                                </div>
                            </div>

                            {/* Text Area */}
                            <textarea
                                key={emailType}
                                className="email-textarea"
                                defaultValue={
                                    emailType === 'selection'
                                        ? `Dear ${candidate.name.split(' ')[0]},

We are thrilled to offer you the position of ${candidate.role} at ResuMate AI! After reviewing your impressive portfolio and enjoying our conversations during the interview process, the entire team is excited about the prospect of you joining us.

We were particularly impressed by your extensive experience in frontend architecture and your leadership skills. We believe your skills will be a perfect match for our upcoming product roadmap.

Attached to this email, please find the formal offer letter detailing the compensation package, benefits, and start date. We have also included a brief overview of our onboarding process to give you an idea of what your first few weeks will look like.

Please let us know if you have any questions or need further clarification on any aspect of the offer. We look forward to hearing from you soon!

Best regards,

Alex Morgan
Recruiter Admin`
                                        : `Dear ${candidate.name.split(' ')[0]},

Thank you so much for taking the time to apply for the ${candidate.role} position at ResuMate AI and for sharing your experience with us throughout the interview process. We truly enjoyed learning more about your background and accomplishments.

After careful consideration, we regret to inform you that we have decided to move forward with another candidate whose experience more closely aligns with our current requirements. This was not an easy decision, as we met many strong candidates, including you.

We sincerely appreciate the effort and time you invested in your application and interviews. We encourage you to apply again in the future should a role open up that matches your skills and interests—we’d be happy to reconnect.

We wish you all the very best in your continued job search and professional journey.

Warm regards,

Alex Morgan
Recruiter Admin
ResuMate AI`
                                }
                            />
                        </div>

                        <div className="editor-footer">
                            <button className="btn-cancel">Discard Draft</button>
                            <button className="btn-send" onClick={handleSendClick}>
                                Send Email
                                <span className="material-icons">send</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* DEMO MODE MODAL */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                                <span className="material-icons">close</span>
                            </button>
                            <div className="modal-icon-box">
                                <span className="material-icons">engineering</span>
                            </div>
                            <h2>🚧 Processing in Progress</h2>
                            <p>This action is currently operating in UI demo mode without backend execution.</p>
                            <p className="modal-subtext">Backend logic for this feature is under development and will be integrated as part of the implementation plan.</p>
                            <div className="modal-info-box">
                                <span className="material-icons">info</span>
                                This preview is intended to demonstrate the final user workflow and experience.
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default EmailCenter;
