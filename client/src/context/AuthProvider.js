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
  }, [user, navigate, location.pathname]);

  const handleSession = async (session) => {
    if (!session) {
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error, message: error.message };
    }

    // Check verification immediately
    if (data.user && !data.user.email_confirmed_at && !data.user.confirmed_at) {
      await supabase.auth.signOut();
      const msg = "Please verify your email before logging in";
      setAuthMessage(msg);
      return { error: { message: msg } };
    }

    return { data, error: null };
  };

  const signUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    return { data, error };
  };

  const signInWithProvider = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
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