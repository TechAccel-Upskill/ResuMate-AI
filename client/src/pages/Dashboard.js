import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';
import RecruiterProfileCard from '../components/RecruiterProfileCard';
import BrandingFooter from '../components/BrandingFooter';

function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
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
          <Link to="/dashboard" className="nav-item active">
            <span className="material-icons">dashboard</span>
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
      <main className="main-content">
        {/* TOP HEADER */}
        <header className="top-header">
          <div className="search-bar">
            <span className="material-icons">search</span>
            <input type="text" placeholder="Search candidates, jobs, or reports..." />
          </div>
          <div className="header-actions">
            <div className="ai-status">
              <div className="ai-status-dot"></div>
              AI Online
            </div>
            <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <span className="material-icons">notifications</span>
            </button>
            <div className="profile-avatar" style={{ background: '#5b5fc7', color: 'white' }}>
              <span>A</span>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="hero-card">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to ResuMate AI 👋</h1>
            <p className="hero-desc">
              Scan. Match. Decide — Faster hiring powered by AI. Your intelligent assistant is ready to process new applications.
            </p>

            <div className="progress-card">
              <div className="progress-header">
                <span>Setup Progress</span>
                <span style={{ color: '#64748b' }}>—</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '0%' }}></div>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                Awaiting backend integration
              </div>
            </div>

            <div className="action-buttons" style={{ display: 'flex', gap: '12px' }}>
              <button className="start-btn" onClick={() => navigate('/job-description')}>
                <span className="material-icons">add_circle</span>
                Start New Scan
              </button>
              <button className="start-btn" style={{ background: '#1e293b', border: '1px solid #334155' }}>
                <span className="material-icons">play_circle</span>
                Watch Tutorial
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              {/* Abstract UI representation */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f87171' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fbbf24' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34d399' }}></div>
              </div>
              <div style={{ width: '60%', height: '8px', background: '#334155', borderRadius: '4px', marginBottom: '12px' }}></div>
              <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', marginBottom: '8px' }}></div>
              <div style={{ width: '90%', height: '8px', background: '#1e293b', borderRadius: '4px', marginBottom: '8px' }}></div>
              <div style={{ width: '70%', height: '8px', background: '#1e293b', borderRadius: '4px' }}></div>

              <div className="glow-icon">
                <span className="material-icons" style={{ color: 'white' }}>auto_awesome</span>
              </div>

              <div style={{ position: 'absolute', right: '20px', top: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="material-icons" style={{ fontSize: '12px' }}>check_circle</span>
                Match 98%
              </div>
            </div>
          </div>
        </section>

        {/* STATS GRID */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <div>
                <div className="stat-title">Active Job Posts</div>
              </div>
              <div className="stat-icon icon-blue">
                <span className="material-icons">work</span>
              </div>
            </div>
            <div className="stat-value-group">
              <span className="stat-value" style={{ color: '#64748b' }}>—</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div>
                <div className="stat-title">Resumes Parsed</div>
              </div>
              <div className="stat-icon icon-purple">
                <span className="material-icons">folder_open</span>
              </div>
            </div>
            <div className="stat-value-group">
              <span className="stat-value" style={{ color: '#64748b' }}>—</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div>
                <div className="stat-title">Top Match Rate</div>
              </div>
              <div className="stat-icon icon-orange">
                <span className="material-icons">star</span>
              </div>
            </div>
            <div className="stat-value-group">
              <span className="stat-value" style={{ color: '#64748b' }}>—</span>
            </div>
          </div>
        </section>

        {/* RECENT SCANS TABLE */}
        <section className="table-section">
          <div className="table-header">
            <div className="table-title">
              <span className="material-icons" style={{ color: '#94a3b8' }}>history</span>
              Recent Scans
            </div>
            <a href="#" style={{ color: '#818cf8', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>View All →</a>
          </div>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Role Name</th>
                  <th>Date Scanned</th>
                  <th>Candidates</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <span className="material-icons" style={{ fontSize: '48px', color: '#334155' }}>inbox</span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>No scans yet</div>
                        <div style={{ fontSize: '12px' }}>Data will appear once backend integration is complete.</div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;
