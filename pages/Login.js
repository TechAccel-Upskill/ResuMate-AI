import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Login({ goToRegister, handleOAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, authMessage } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error: signInError, message } = await signIn({ email, password });

        setLoading(false);
        if (signInError) {
            setError(message ?? signInError.message);
            return;
        }
        // Navigation handled by AuthProvider
    };

    return (
        <div className="login-card">
            <h1 className="title">Welcome Back 👋</h1>
            <p className="subtitle">Sign in to access your dashboard</p>

            {(authMessage || location.state?.message || error) && (
                <div className="auth-alert">
                    <svg className="alert-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <span>{authMessage || location.state?.message || error}</span>
                </div>
            )}

            <div className="field">
                <div className="field-header">
                    <label>USER NAME</label>
                </div>
                <div className="input-container">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                        type="email"
                        placeholder="Enter your username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <div className="field-header">
                    <label>PASSWORD</label>
                    <span className="forgot-link">Forgot Password?</span>
                </div>
                <div className="input-container">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>

            <button className="primary-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Signing in..." : (
                    <>
                        Sign In
                        <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </>
                )}
            </button>

            <div className="divider">OR</div>

            <div className="social-row">
                <button className="social-box" type="button" onClick={() => handleOAuth("google")}>
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                </button>
                <button className="social-box" type="button" onClick={() => handleOAuth("linkedin_oidc")}>
                    <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn" />
                </button>
                <button className="social-box" type="button" onClick={() => handleOAuth("github")}>
                    <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" />
                </button>
            </div>

            <p className="switch">
                Don't have an account?{" "}
                <span onClick={goToRegister}>
                    Sign up for free
                </span>
            </p>
        </div>
    );
}
