import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './CandidateReport.css';
import '../pages/Dashboard.css';
import ThemeToggle from '../components/ThemeToggle';

const CandidateReport = () => {
    // const { id } = useParams(); // In a real app, fetch data by ID

    return (
        <div className="cr-container">
            {/* TOP NAVIGATION (Simplified for Report View) */}
            <nav className="cr-nav">
                <div className="cr-nav-left">
                    <div className="icon-box" style={{ background: 'var(--primary)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-icons" style={{ color: 'white', fontSize: '20px' }}>smart_toy</span>
                    </div>
                    <span className="brand-text">ResuMate AI</span>
                    <div className="nav-divider"></div>
                    <div className="cr-search">
                        <span className="material-icons">search</span>
                        <input type="text" placeholder="Search candidates..." />
                    </div>
                </div>
                <div className="cr-nav-center">
                    <Link to="/reports" className="back-link">
                        <span className="material-icons" style={{ fontSize: '16px' }}>arrow_back</span>
                        Back to Reports
                    </Link>
                </div>
                <div className="cr-nav-right">
                    <div className="icon-btn"><span className="material-icons">notifications</span></div>
                    <ThemeToggle />
                    <div className="user-c">AI</div>
                </div>
            </nav>

            {/* BREADCRUMBS */}
            <div className="cr-breadcrumbs">
                <span>Candidates</span>
                <span className="sep">›</span>
                <span>Frontend Engineering</span>
                <span className="sep">›</span>
                <span className="current">Alex Jensen</span>
            </div>

            {/* HEADER */}
            <header className="cr-header">
                <div className="cr-profile-main">
                    <div className="cr-avatar-lg">
                        <img src="https://i.pravatar.cc/150?img=11" alt="Alex Jensen" />
                        <div className="cr-ver-badge"><span className="material-icons">check</span></div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <h1>Alex Jensen</h1>
                            <span className="status-tag">IN REVIEW</span>
                        </div>
                        <div className="cr-meta-row">
                            <span className="meta-item"><span className="material-icons">work</span> Senior Frontend Engineer</span>
                            <span className="meta-dot">•</span>
                            <span className="meta-item"><span className="material-icons">location_on</span> San Francisco, CA</span>
                        </div>
                    </div>
                </div>
                <div className="cr-actions">
                    <button className="btn-secondary">
                        <span className="material-icons">download</span>
                        Resume
                    </button>
                    <button className="btn-danger-outline">
                        <span className="material-icons">close</span>
                        Reject
                    </button>
                    <Link to="/email-automation/1" className="btn-primary-lg" style={{ textDecoration: 'none' }}>
                        <span className="material-icons">calendar_today</span>
                        Schedule Interview
                    </Link>
                </div>
            </header>

            {/* MAIN CONTENT GRID */}
            <main className="cr-main-grid">

                {/* LEFT COLUMN (Verdict & Score & Stats) */}
                <div className="cr-col-left">
                    {/* AI VERDICT */}
                    <div className="ai-verdict-card">
                        <div className="verdict-header">
                            <div className="v-icon"><span className="material-icons">check_circle</span></div>
                            <h3>AI Verdict: Recommended for Interview</h3>
                            <div className="v-dot"></div>
                        </div>
                        <p className="verdict-text">
                            Strong match for <span className="highlight">React</span> and <span className="highlight">TypeScript</span> requirements.
                            Experience aligns well with Senior level expectations despite slight domain mismatch.
                        </p>
                        <button className="btn-view-logic">View Logic</button>
                    </div>

                    {/* SCORE & STATS ROW */}
                    <div className="stats-row">
                        <div className="score-card">
                            <label>OVERALL MATCH</label>
                            <div className="score-flex">
                                <div className="big-score">82<span>%</span></div>
                                <div className="mini-chart">
                                    <svg viewBox="0 0 36 36" className="circular-chart-sm">
                                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path className="circle" strokeDasharray="82, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <span className="material-icons inside-icon">psychology</span>
                                </div>
                            </div>
                            <div className="rank-badge">
                                <span className="material-icons">trending_up</span> Top 5% of applicants
                            </div>
                        </div>

                        <div className="mini-stat-col">
                            <div className="ms-card">
                                <div className="ms-label"><span className="material-icons">history</span> EXPERIENCE</div>
                                <div className="ms-val">6.5 Yrs</div>
                                <div className="ms-sub">Req: 5+ Years</div>
                            </div>
                            <div className="ms-card">
                                <div className="ms-label"><span className="material-icons">school</span> EDUCATION</div>
                                <div className="ms-val">B.S. Comp Sci</div>
                                <div className="ms-sub">Univ of Washington</div>
                            </div>
                        </div>
                    </div>

                    {/* CURRENT ROLE */}
                    <div className="current-role-card">
                        <div className="ms-label"><span className="material-icons">business_center</span> CURRENT ROLE</div>
                        <div className="role-val">Frontend Lead @ FinTech Co</div>
                    </div>

                    {/* SKILL MATCH BREAKDOWN */}
                    <div className="skill-section">
                        <div className="skill-header">
                            <h3>Skill Match Breakdown</h3>
                            <div className="skill-tabs">
                                <span className="active">Hard Skills</span>
                                <span>Soft Skills</span>
                            </div>
                        </div>
                        <div className="skill-grid">
                            <SkillBar label="React.js" percent={95} color="#818cf8" />
                            <SkillBar label="TypeScript" percent={88} color="#818cf8" />
                            <SkillBar label="Node.js" percent={70} color="#6366f1" />
                            <SkillBar label="System Design" percent={60} color="#f59e0b" />
                        </div>
                    </div>

                    {/* EXPERIENCE COMPARISON */}
                    <div className="exp-comp-section">
                        <div className="exp-header">
                            <span className="material-icons" style={{ color: 'var(--primary)' }}>compare_arrows</span>
                            <h3>Experience Comparison</h3>
                        </div>

                        <div className="timeline-container">
                            <TimelineItem
                                icon="check_circle"
                                title="Job Duration Alignment"
                                status="EXCEEDS"
                                statusColor="success"
                                desc={<span>Candidate has <span style={{ color: '#3b82f6', fontWeight: 600 }}>6.5 years</span> of relevant experience versus the required <span style={{ color: '#3b82f6', fontWeight: 600 }}>5 years</span>. Stability score is high.</span>}
                            />
                            <TimelineItem
                                icon="domain"
                                title="Industry Fit"
                                status="PARTIAL MATCH"
                                statusColor="warning"
                                desc={<span>Previous role was in <span style={{ color: '#3b82f6', fontWeight: 600 }}>E-commerce</span>. Current role requires <span style={{ color: '#3b82f6', fontWeight: 600 }}>Fintech</span> domain knowledge.</span>}
                            />
                            <TimelineItem
                                icon="school"
                                title="Leadership Experience"
                                status="MATCH"
                                statusColor="success"
                                desc="Resume indicates 2 years of experience leading a team of 4 frontend developers."
                                isLast={true}
                            />
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN (Widgets) */}
                <div className="cr-col-right">
                    {/* MISSING SKILLS */}
                    <div className="widget-card missing-skills">
                        <div className="w-header error">
                            <span className="material-icons">warning</span>
                            <h3>Missing Skills</h3>
                        </div>
                        <div className="ms-item">
                            <div className="dot red"></div>
                            <div>
                                <h4>GraphQL</h4>
                                <div className="ms-tag critical">CRITICAL REQUIREMENT</div>
                                <p>Not found in resume or portfolio.</p>
                            </div>
                        </div>
                        <div className="ms-item">
                            <div className="dot orange"></div>
                            <div>
                                <h4>AWS / Cloud Ops</h4>
                                <div className="ms-tag nice">NICE TO HAVE</div>
                                <p>Basic knowledge implied but no certification.</p>
                            </div>
                        </div>
                        <button className="btn-link">View suggested training paths</button>
                    </div>

                    {/* CONTACT INFO */}
                    <div className="widget-card">
                        <div className="w-header">
                            <h3>Contact Information</h3>
                            <span className="material-icons" style={{ fontSize: '16px', color: 'var(--text-muted)' }}>badge</span>
                        </div>
                        <div className="contact-list">
                            <div className="c-row">
                                <div className="c-icon"><span className="material-icons">email</span></div>
                                <span>alex.jensen@example.com</span>
                            </div>
                            <div className="c-row">
                                <div className="c-icon"><span className="material-icons">phone</span></div>
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="c-row">
                                <div className="c-icon"><span className="material-icons">link</span></div>
                                <span>linkedin.com/in/alexjensen</span>
                            </div>
                            <div className="c-row">
                                <div className="c-icon"><span className="material-icons">language</span></div>
                                <span>alexjensen.dev</span>
                            </div>
                        </div>
                    </div>

                    {/* RECRUITER NOTES - COLLABORATIVE */}
                    <div className="widget-card notes-widget">
                        <div className="notes-header-new">
                            <div className="notes-title-group">
                                <h3>Recruiter<br />Notes</h3>
                                <span className="shared-label">SHARED REVIEW<br />SPACE</span>
                            </div>
                            <div className="collab-avatars">
                                <div className="avatar-group">
                                    <img src="https://i.pravatar.cc/150?img=32" alt="Collab 1" className="collab-avatar-img" />
                                    <img src="https://i.pravatar.cc/150?img=12" alt="Collab 2" className="collab-avatar-img" />
                                    <img src="https://i.pravatar.cc/150?img=5" alt="Collab 3" className="collab-avatar-img" />
                                </div>
                                <div className="collab-avatar-add">
                                    <span className="material-icons" style={{ fontSize: '16px', color: 'white' }}>person_add</span>
                                </div>
                            </div>
                        </div>

                        <div className="collab-info">
                            <span className="material-icons">groups</span>
                            <p>All 3 added collaborators can view this report and add notes to contribute to the final decision.</p>
                        </div>

                        <div className="note-list">
                            <div className="note-item">
                                <div className="note-header-row">
                                    <div className="note-user">
                                        <span className="n-avatar" style={{ background: '#10b981' }}>M</span>
                                        <span className="n-name">Manas Thumu <span className="you-tag">(You)</span></span>
                                    </div>
                                    <span className="n-time">2h ago</span>
                                </div>
                                <p className="note-text">Seems promising. I like the leadership experience. Let's dig deeper into the GraphQL gap during the screen.</p>
                            </div>

                            <div className="note-item">
                                <div className="note-header-row">
                                    <div className="note-user">
                                        <span className="n-avatar" style={{ background: '#3b82f6' }}>D</span>
                                        <span className="n-name">David K.</span>
                                    </div>
                                    <span className="n-time">1h ago</span>
                                </div>
                                <p className="note-text">Agreed on the GraphQL part. I noticed they have some Apollo Client projects in their portfolio though. Might not be a complete zero.</p>
                            </div>

                            <div className="note-item">
                                <div className="note-header-row">
                                    <div className="note-user">
                                        <span className="n-avatar" style={{ background: '#4ade80' }}>P</span>
                                        <span className="n-name">Priya S.</span>
                                    </div>
                                    <span className="n-time">15m ago</span>
                                </div>
                                <p className="note-text"></p>
                            </div>
                        </div>

                        <div className="note-input-new">
                            <textarea placeholder="Contribute a note..." rows="1"></textarea>
                            <div className="note-actions-new">
                                <div className="format-buttons">
                                    <button className="format-btn"><span className="material-icons">format_bold</span></button>
                                    <button className="format-btn"><span className="material-icons">format_list_bulleted</span></button>
                                </div>
                                <button className="send-btn-new">
                                    <span className="material-icons">send</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

const SkillBar = ({ label, percent, color }) => (
    <div className="skill-bar-container">
        <div className="sb-header">
            <span className="sb-label">{label}</span>
            <span className="sb-val" style={{ color }}>{percent}%</span>
        </div>
        <div className="sb-bg">
            <div className="sb-fill" style={{ width: `${percent}%`, background: color }}></div>
        </div>
    </div>
);

const TimelineItem = ({ icon, title, status, statusColor, desc, isLast }) => (
    <div className={`tl-node ${isLast ? 'last' : ''}`}>
        <div className="tl-icon-col">
            <div className={`tl-icon-box ${statusColor}`}>
                <span className="material-icons">{icon}</span>
            </div>
            {!isLast && <div className="tl-line"></div>}
        </div>
        <div className="tl-content">
            <div className="tl-header">
                <h4>{title}</h4>
                <span className={`tl-badge ${statusColor}`}>{status}</span>
            </div>
            <p className="tl-desc">{desc}</p>
        </div>
    </div>
);

export default CandidateReport;
