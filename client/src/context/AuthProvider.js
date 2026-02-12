import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      // Check for mock session first
      const mockSessionStr = localStorage.getItem('supabase.auth.token');
      if (mockSessionStr) {
        try {
          const mockSession = JSON.parse(mockSessionStr);
          if (mounted && mockSession.user) {
            setSession(mockSession);
            setUser(mockSession.user);
            setLoading(false);
            return;
          }
        } catch (e) {
          localStorage.removeItem('supabase.auth.token');
        }
      }

      // Fall back to Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      if (mounted) {
        handleSession(session);
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        handleSession(session);
        setLoading(false);

        // Centralized Routing Logic
        if (event === 'SIGNED_IN' && session) {
          // If user is on auth pages, redirect to dashboard
          if (location.pathname === '/login' || location.pathname === '/register') {
            navigate('/dashboard', { replace: true });
          }
        }

        if (event === 'SIGNED_OUT') {
          // Always redirect to home page on logout
          navigate('/', { replace: true });
        }
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const handleSession = async (session) => {
    // Don't clear session if we have a mock session
    if (!session) {
      const mockSessionStr = localStorage.getItem('supabase.auth.token');
      if (mockSessionStr) {
        // We have a mock session, don't clear it
        return;
      }
      setSession(null);
      setUser(null);
      return;
    }

    const { user } = session;

    // Check if the user has any identity provider other than email (e.g., google, linkedin, github)
    const providers = user.app_metadata.providers || [];
    const isOAuth = providers.some(p => p !== 'email');

    // Verification check:
    // 1. Email is confirmed
    // 2. OR User is confirmed (legacy)
    // 3. OR User is using an OAuth provider (assumed verified by provider)
    const isVerified = user.email_confirmed_at || user.confirmed_at || isOAuth;

    if (!isVerified) {
      await supabase.auth.signOut();
      setAuthMessage("Please verify your email to log in.");
      setSession(null);
      setUser(null);
    } else {
      setSession(session);
      setUser(user);
      setAuthMessage("");
    }
  };

  const signIn = async ({ email, password }) => {
    // Restricted mode: Only allow specific credentials
    const ALLOWED_EMAIL = 'recruiter@techaccel';
    const ALLOWED_PASSWORD = 'interns@techaccel';
    
    const normalizedEmail = email.toLowerCase().trim();
    
    if (normalizedEmail !== ALLOWED_EMAIL || password !== ALLOWED_PASSWORD) {
      return { 
        error: { message: "Invalid credentials. Access restricted." },
        message: "Invalid credentials. Access restricted."
      };
    }

    // Create a mock session for the authorized demo user
    const mockUser = {
      id: 'demo-recruiter-001',
      email: ALLOWED_EMAIL,
      email_confirmed_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      user_metadata: {
        name: 'Demo Recruiter',
        role: 'recruiter'
      },
      app_metadata: {
        provider: 'email',
        providers: ['email']
      }
    };

    const mockSession = {
      access_token: 'demo-access-token',
      refresh_token: 'demo-refresh-token',
      expires_in: 3600,
      token_type: 'bearer',
      user: mockUser
    };

    // Store mock session in localStorage for persistence
    localStorage.setItem('supabase.auth.token', JSON.stringify(mockSession));
    
    // Set the session state
    setSession(mockSession);
    setUser(mockUser);
    setAuthMessage("");

    return { 
      data: { user: mockUser, session: mockSession }, 
      error: null 
    };
  };

  const signUp = async ({ email, password }) => {
    // Registration disabled in restricted mode
    return { 
      data: null,
      error: { message: "Registration is currently disabled. Please contact administrator." }
    };
  };

  const signInWithProvider = async (provider) => {
    // OAuth disabled in restricted mode
    return { 
      data: null, 
      error: { message: "OAuth login is currently disabled." } 
    };
  };

  const signOut = async () => {
    // Clear mock session
    localStorage.removeItem('supabase.auth.token');
    
    // Clear Supabase session (if any)
    await supabase.auth.signOut();
    
    // Reset state
    setSession(null);
    setUser(null);
    setAuthMessage("");
  };

  const value = {
    user,
    session,
    authMessage,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}