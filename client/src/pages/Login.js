import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Login({ goToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, signInWithProvider, authMessage, user } = useAuth(); // Get user from context
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Auto-redirect if already logged in (e.g. after Google OAuth return)
    React.useEffect(() => {
        if (user) {
            const from = location.state?.from?.pathname ?? "/dashboard";
            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

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

        // Signed in and verified — redirect
        const from = location.state?.from?.pathname ?? "/dashboard";
        navigate(from, { replace: true });
    };

    const handleOAuth = async (provider) => {
        const { error } = await signInWithProvider(provider);
        if (error) {
            setError(error.message ?? "OAuth sign in failed");
        }
    };

    return (
        <div className="login-card">
            <h1 className="title">Welcome Back!</h1>
            <p className="subtitle">
                Sign in to access your dashboard and continue optimizing your QA process.
            </p>

            {authMessage && <p className="msg error">{authMessage}</p>}
            {location.state?.message && <p className="msg error">{location.state.message}</p>}
            {error && <p className="msg error">{error}</p>}

            <div className="field">
                <label>User Name</label>
                <input
                    type="email"
                    placeholder="Enter your user name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="field">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="forgot">Forgot Password?</div>

            <button className="primary-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="divider">OR</div>

            <button className="social-btn" onClick={() => handleOAuth("google")}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Continue with Google
            </button>

            <button className="social-btn" onClick={() => handleOAuth("linkedin_oidc")}>
                <img src="https://www.svgrepo.com/svg/475661/linkedin-color" alt="linkedin" />
                Continue with LinkedIn
            </button>

            <button className="social-btn" onClick={() => handleOAuth("github")}>
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" />
                Continue with GitHub
            </button>

            <p className="switch">
                Don’t have an account?{" "}
                <span onClick={goToRegister} style={{ cursor: "pointer", color: "blue" }}>
                    Sign Up
                </span>
            </p>
        </div>
    );
}