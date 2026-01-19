import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./AuthPage.css";

function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-left-content">
          <h1>ResuMate AI</h1>
          <p>AI-powered resume screening & ATS scoring platform</p>
          <ul>
            <li>Upload resumes & job descriptions</li>
            <li>Check ATS score & skills</li>
            <li>Make faster hiring decisions</li>
          </ul>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          {mode === "login" ? (
            <Login goToRegister={() => setMode("register")} />
          ) : (
            <Register goToLogin={() => setMode("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

