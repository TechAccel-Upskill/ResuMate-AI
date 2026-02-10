import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import JobDescription from "./pages/JobDescription";
import ResumeScan from "./pages/ResumeScan";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import CandidateReport from "./pages/CandidateReport";
import EmailCenter from "./pages/EmailCenter";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage initialMode="login" />} />
            <Route path="/register" element={<AuthPage initialMode="register" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job-description"
              element={
                <ProtectedRoute>
                  <JobDescription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-scan"
              element={
                <ProtectedRoute>
                  <ResumeScan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidate/:id"
              element={
                <ProtectedRoute>
                  <CandidateReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/email-automation/:id"
              element={
                <ProtectedRoute>
                  <EmailCenter />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;