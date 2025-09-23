import { useState, useEffect, useCallback } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, testSupabaseConnection } from '../utils/supabase';
import { User, AuthState } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const setError = useCallback((error: string | null) => {
    console.log('Setting error:', error);
    setAuthState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    console.log('Setting loading:', loading);
    setAuthState(prev => ({ ...prev, loading }));
  }, []);

  const setUser = useCallback((user: User | null) => {
    console.log('Setting user:', user);
    setAuthState(prev => ({ ...prev, user, loading: false, error: null }));
  }, []);

  const signUp = async (email: string, password: string, companyName: string, subscriptionPlan: 'Free' | 'Pro') => {
    try {
      setLoading(true);
      setError(null);
      console.log('Starting signup for:', email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            company_name: companyName,
            subscription_plan: subscriptionPlan,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);
        throw error;
      }

      console.log('Signup successful:', data);
      return { success: true };
    } catch (error: any) {
      console.error('Signup failed:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.message) {
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please try logging in instead.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Starting signin for:', email);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        throw error;
      }

      console.log('Signin successful:', data);
      
      // Create user object immediately for faster UI response
      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || email,
          company_name: data.user.user_metadata?.company_name || 'My Company',
          subscription_plan: data.user.user_metadata?.subscription_plan || 'Free',
          created_at: data.user.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        setUser(user);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Signin failed:', error);
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.message) {
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      // Always clear local state regardless of server response
      // This handles cases where the session is already expired/invalid
      setUser(null);
      if (error && !error.message.includes('session_not_found')) {
        console.warn('Logout warning:', error.message);
      }
    } catch (error: any) {
      // Even if logout fails, clear local state to reflect user's intent
      setUser(null);
      console.warn('Logout error (local state cleared):', error.message);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log('Auth hook initializing...');

    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        
        // Test connection first
        const connectionTest = await testSupabaseConnection();
        if (!connectionTest.success) {
          console.error('Connection test failed:', connectionTest.error);
          if (mounted) {
            setError('Unable to connect to authentication service.');
          }
          return;
        }
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          if (mounted) {
            setError('Authentication service error: ' + error.message);
          }
          return;
        }
      
        if (session?.user && mounted) {
          console.log('Found existing session:', session.user);
          const user: User = {
            id: session.user.id,
            email: session.user.email || 'user@example.com',
            company_name: session.user.user_metadata?.company_name || 'My Company',
            subscription_plan: session.user.user_metadata?.subscription_plan || 'Free',
            created_at: session.user.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setUser(user);
        } else if (mounted) {
          console.log('No existing session found');
          setLoading(false);
        }
      } catch (error: any) {
        console.error('Session initialization error:', error);
        if (mounted) {
          setError('Failed to initialize authentication.');
        }
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state change:', event, session?.user?.email);

        if (event === 'SIGNED_IN' && session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email || 'user@example.com',
            company_name: session.user.user_metadata?.company_name || 'My Company',
            subscription_plan: session.user.user_metadata?.subscription_plan || 'Free',
            created_at: session.user.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setUser(user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email || 'user@example.com',
            company_name: session.user.user_metadata?.company_name || 'My Company',
            subscription_plan: session.user.user_metadata?.subscription_plan || 'Free',
            created_at: session.user.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setUser(user);
        }
      }
    );

    return () => {
      console.log('Auth hook cleanup');
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, setError, setLoading]);

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
    setError,
  };
};