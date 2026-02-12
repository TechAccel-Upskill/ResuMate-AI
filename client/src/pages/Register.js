import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

// eslint-disable-next-line no-unused-vars
export default function Register({ goToLogin, handleOAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { signUp } = useAuth();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  return (
    <div className="login-card">
      <h1 className="title">Create Account ✨</h1>
      <p className="subtitle">Join ResuMate AI today</p>

      <div className="auth-alert" style={{ marginBottom: '1rem' }}>
        <svg className="alert-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span>Registration is currently disabled. Please contact administrator.</span>
      </div>

      {message && <div className="msg success">{message}</div>}
      {error && (
        <div className="auth-alert">
          <svg className="alert-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="field" style={{ opacity: 0.4 }}>
        <div className="field-header">
          <label>EMAIL ADDRESS</label>
        </div>
        <div className="input-container">
          <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
            required
          />
        </div>
      </div>

      <div className="field" style={{ opacity: 0.4 }}>
        <div className="field-header">
          <label>PASSWORD</label>
        </div>
        <div className="input-container">
          <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled
            required
          />
        </div>
      </div>

      <button className="primary-btn" disabled style={{ opacity: 0.4, cursor: 'not-allowed' }}>
        Sign Up
        <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>

      <div className="divider">OR</div>

      <div className="social-row" style={{ opacity: 0.4, pointerEvents: 'none' }}>
        <button className="social-box" type="button" disabled style={{ cursor: 'not-allowed' }}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
        </button>
        <button className="social-box" type="button" disabled style={{ cursor: 'not-allowed' }}>
          <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn" />
        </button>
        <button className="social-box" type="button" disabled style={{ cursor: 'not-allowed' }}>
          <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" />
        </button>
      </div>

      <p className="switch" style={{ opacity: 0.4, pointerEvents: 'none', cursor: 'not-allowed' }}>
        Already have an account?{" "}
        <span>
          Sign In
        </span>
      </p>
    </div>
  );
}
