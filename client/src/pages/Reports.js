import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import './Reports.css';
import '../pages/Dashboard.css'; // Reusing some common tokens
import RecruiterProfileCard from '../components/RecruiterProfileCard';
import BrandingFooter from '../components/BrandingFooter';

const Reports = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    const candidates = [
        {
            id: 1,
            name: 'Maya Roberts',
            email: 'maya.roberts@gmail.com',
            score: 94,
            ats: '92/100',
            exp: '7 Yrs',
            loc: 'London',
            matchType: 'Strong Match',
            tags: ['Figma', 'React', 'CSS', '+3 more'],
            img: 'https://i.pravatar.cc/150?img=5'
        },
        {
            id: 2,
            name: 'James Chen',
            email: 'j.chen@outlook.com',
            score: 82,
            ats: '78/100',
            exp: '4 Yrs',
            loc: 'Remote',
            matchType: 'Good Match',
            tags: ['Sketch', 'UX Research', 'Prototyping'],
            img: 'https://i.pravatar.cc/150?img=11'
        },
        {
            id: 3,
            name: 'Sarah Lee',
            email: 'sarah.lee@design.co',
            score: 65,
            ats: '60/100',
            exp: '2 Yrs',
            loc: 'NYC',
            matchType: 'Review Needed',
            tags: ['Adobe XD', 'Graphic Design'],
            img: 'https://i.pravatar.cc/150?img=9'
        },
        {
            id: 4,
            name: 'David Kim',
            email: 'david.kim@tech.net',
            score: 97,
            ats: '95/100',
            exp: '8 Yrs',
            loc: 'Berlin',
            matchType: 'Top Candidate',
            tags: ['Figma', 'Framer', 'Leadership'],
            img: 'https://i.pravatar.cc/150?img=3'
        },
        {
            id: 5,
            name: 'Mark Wilson',
            email: 'm.wilson@demo.co',
            score: 32,
            ats: '25/100',
            exp: '1 Yr',
            loc: 'Remote',
            matchType: 'Weak Candidate',
            tags: ['HTML', 'Basic CSS'],
            img: 'https://i.pravatar.cc/150?img=8'
        },
        {
            id: 6,
            name: 'Emma Davis',
            email: 'emma.d@creative.in',
            score: 79,
            ats: '75/100',
            exp: '3.5 Yrs',
            loc: 'Austin',
            matchType: 'Good Match',
            tags: ['Sketch', 'Figma', 'Webflow'],
            img: 'https://i.pravatar.cc/150?img=4'
        }
    ];

    const getMatchColor = (type) => {
        switch (type) {
            case 'Strong Match': return 'success';
            case 'Top Candidate': return 'success';
            case 'Good Match': return 'primary';
            case 'Review Needed': return 'warning';
            case 'Weak Candidate': return 'danger';
            default: return 'primary';
        }
    };

    return (
        <div className="reports-container">
            {/* SIDEBAR */}
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
                    <Link to="/reports" className="nav-item active">
                        <span className="material-icons">analytics</span>
                        <span>Reports</span>
                    </Link>
                    <Link to="/email-automation/1" className="nav-item">
                        <span className="material-icons">mail</span>
                        <span>Email Center</span>
                    </Link>
                </nav>



                {/* RECRUITER CARD */}
                <RecruiterProfileCard />



                <BrandingFooter />
            </aside>

            {/* MAIN CONTENT */}
            <main className="rep-main">
                {/* Top Search Bar */}
                <div className="top-global-header">
                    <div className="search-bar">
                        <span className="material-icons">search</span>
                        <input type="text" placeholder="Search candidates..." />
                    </div>
                    <div className="header-right">
                        <div className="badge-pill">
                            <div className="dot"></div> AI Online
                        </div>
                        <span className="material-icons notif">notifications_none</span>
                        <div className="user-c">AI</div>
                    </div>
                </div>

                {/* Page Title & Actions */}
                <div className="page-header-row">
                    <div>
                        <h1>Candidate Reports</h1>
                        <div className="bread-meta">
                            <span className="material-icons" style={{ fontSize: '16px' }}>location_on</span>
                            Senior UX Designer
                            <span className="sep">•</span>
                            <span className="tag-pill-sm">24 Applicants</span>
                        </div>
                    </div>
                    <div className="action-row">
                        <button className="btn-outline">
                            <span className="material-icons">download</span>
                            Export CSV
                        </button>
                        <button className="btn-primary">
                            <span className="material-icons">add</span>
                            New Assessment
                        </button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="filter-bar">
                    <div className="fb-left">
                        <span className="material-icons search-icon">search</span>
                        <input type="text" placeholder="Search by name, email, or skills..." />
                    </div>
                    <div className="fb-right">
                        <div className="f-tag active">Strong Match <span className="material-icons close-x">close</span></div>
                        <div className="f-btn">Remote Only</div>
                        <div className="f-btn">Exp &gt; 5y <span className="material-icons">expand_more</span></div>
                        <div className="f-btn">
                            <span className="material-icons">tune</span>
                            More Filters
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="candidates-grid">
                    {candidates.map(c => (
                        <div key={c.id} className="c-card">
                            <div className="c-header">
                                <div className="c-profile">
                                    <img src={c.img} alt={c.name} />
                                    {c.score > 90 && <div className="c-verified"><span className="material-icons">check</span></div>}
                                </div>
                                <div className="c-info">
                                    <h3>{c.name}</h3>
                                    <p>{c.email}</p>
                                </div>
                                <div className="score-ring">
                                    <div className="score-content">
                                        <span className={`score-val ${c.score > 80 ? 'high' : c.score < 50 ? 'low' : 'mid'}`}>{c.score}%</span>
                                    </div>
                                    <svg viewBox="0 0 36 36" className="circular-chart">
                                        <path className="circle-bg"
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path className={`circle ${c.score > 80 ? 'green' : c.score < 50 ? 'red' : 'yellow'}`}
                                            strokeDasharray={`${c.score}, 100`}
                                            d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="c-metrics">
                                <div className="metric">
                                    <label>ATS SCORE</label>
                                    <span>{c.ats}</span>
                                </div>
                                <div className="metric">
                                    <label>EXPERIENCE</label>
                                    <span>{c.exp}</span>
                                </div>
                                <div className="metric">
                                    <label>LOCATION</label>
                                    <span>{c.loc}</span>
                                </div>
                            </div>

                            <div className="c-tags">
                                {c.tags.map((t, i) => (
                                    <span key={i} className="c-tag">{t}</span>
                                ))}
                            </div>

                            <div className="c-footer">
                                <span className={`match-badge ${getMatchColor(c.matchType)}`}>
                                    <div className="dot"></div>
                                    {c.matchType}
                                </span>
                                <Link to={`/candidate/${c.id}`} className="view-link" style={{ textDecoration: 'none' }}>
                                    View Report
                                    <span className="material-icons">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Reports;
