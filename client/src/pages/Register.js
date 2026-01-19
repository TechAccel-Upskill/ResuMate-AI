import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function Register({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");
    setLoading(true);

    const { error: signUpError } = await signUp({ email, password });

    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
    } else {
      setMessage("Registration successful! Please check your email to verify your account.");
    }
  };

  return (
    <div className="login-card">
      <h1 className="title">Create Account</h1>
      <p className="subtitle">
        Join ResuMate AI and start optimizing your hiring process today.
      </p>

      {message && <p className="msg success" style={{ color: 'green' }}>{message}</p>}
      {error && <p className="msg error">{error}</p>}

      <div className="field">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
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

      <button className="primary-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      <p className="switch">
        Already have an account?{" "}
        <span onClick={goToLogin} style={{ cursor: "pointer", color: "blue" }}>
          Sign In
        </span>
      </p>
    </div>
  );
}