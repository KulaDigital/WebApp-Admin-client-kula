import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';
import axiosInstance from '../utils/instance';

export interface UserRole {
  role: 'super_admin' | 'client';
  clientId?: number | string;
  userName?: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userRole: UserRole | null;
  authLoading: boolean;
  roleLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  // Fetch user role from backend
  const fetchUserRole = async (accessToken: string) => {
    setRoleLoading(true);
    try {
      const response = await axiosInstance.get('/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { role, client_id, user_name } = response.data;
      setUserRole({ role, clientId: client_id, userName: user_name });
    } catch (error) {
      console.error('Failed to fetch user role:', error);
      setUserRole(null);
    } finally {
      setRoleLoading(false);
    }
  };

  // Initialize session on mount and refresh
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let isComponentMounted = true;

    const initializeAuth = async () => {
      try {
        // Get current session
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();
        
        if (!isComponentMounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user || null);

        // Fetch role if session exists
        if (currentSession?.access_token) {
          await fetchUserRole(currentSession.access_token);
        }

        // Listen to auth state changes
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event: string, newSession: any) => {
          if (!isComponentMounted) return;
          
          setSession(newSession);
          setUser(newSession?.user || null);

          if (newSession?.access_token) {
            await fetchUserRole(newSession.access_token);
          } else {
            setUserRole(null);
          }
        });

        // Store unsubscribe function to be called on cleanup
        unsubscribe = () => subscription?.unsubscribe();
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (isComponentMounted) {
          setAuthLoading(false);
        }
      }
    };

    initializeAuth();

    // Return cleanup function that unsubscribes from auth listener
    return () => {
      isComponentMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const signOut = async () => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
      setUser(null);
      setUserRole(null);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, userRole, authLoading, roleLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
