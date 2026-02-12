import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "../context/AuthProvider";

import "./AuthPage.css";

function AuthPage({ initialMode }) {
  const [mode, setMode] = useState(initialMode || "login");
  const location = useLocation();
  const navigate = useNavigate();
  const { signInWithProvider } = useAuth();

  // Sync mode with URL
  useEffect(() => {
    if (location.pathname === "/register") {
      setMode("register");
    } else if (location.pathname === "/login") {
      setMode("login");
    }
  }, [location.pathname]);

  const handleToggleMode = (newMode) => {
    setMode(newMode);
    navigate(newMode === "login" ? "/login" : "/register", { replace: true });
  };

  const handleOAuth = async (provider) => {
    await signInWithProvider(provider);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
            <h2>ResuMate AI</h2>
          </div>

          <h1>
            AI-powered resume screening & ATS scoring platform for <span>modern recruitment.</span>
          </h1>

          <ul className="auth-features">
            <li>
              <div className="feature-icon">✔</div>
              <div className="feature-text">
                <h3>Upload resumes & job descriptions</h3>
                <p>Automated parsing of PDF, Docx, and TXT files with 99.9% accuracy.</p>
              </div>
            </li>
            <li>
              <div className="feature-icon">✔</div>
              <div className="feature-text">
                <h3>Check ATS score & skills</h3>
                <p>Deep semantic analysis to match candidate skills with job requirements.</p>
              </div>
            </li>
            <li>
              <div className="feature-icon">✔</div>
              <div className="feature-text">
                <h3>Make faster hiring decisions</h3>
                <p>Reduce time-to-hire by up to 75% with ranked candidate lists.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="hero">


          {/* Block 1: ATS MATCH */}
          <div className="glass-block auth-block auth-block-1">
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

          {/* Block 2: SENIOR DEV */}
          <div className="glass-block auth-block auth-block-2">
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

          {/* Block 3: BULK UPLOAD */}
          <div className="glass-block auth-block auth-block-3">
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

          {/* Block 4: STRONG CANDIDATE */}
          <div className="glass-block auth-block auth-block-4">
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
                    <div className="p-bar" style={{ width: "90%" }}></div>
                  </div>
                  <div className="m-bar">
                    <div className="p-bar" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 5: MAIL SENT */}
          <div className="glass-block auth-block auth-block-5">
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
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          {mode === "login" ? (
            <Login handleOAuth={handleOAuth} goToRegister={() => handleToggleMode("register")} />
          ) : (
            <Register handleOAuth={handleOAuth} goToLogin={() => handleToggleMode("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

