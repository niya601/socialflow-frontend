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
    setAuthState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setAuthState(prev => ({ ...prev, loading }));
  }, []);

  const setUser = useCallback((user: User | null) => {
    setAuthState(prev => ({ ...prev, user, loading: false, error: null }));
  }, []);

  const signUp = async (email: string, password: string, companyName: string, subscriptionPlan: 'Free' | 'Pro') => {
    try {
      setLoading(true);
      setError(null);

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
        throw error;
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || email,
          company_name: companyName,
          subscription_plan: subscriptionPlan,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        setUser(user);
        return { success: true };
      }

      setLoading(false);
      return { success: true };
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.message) {
        if (error.message.includes('fetch')) {
          errorMessage = 'Unable to connect to authentication service. Please check your internet connection.';
        } else if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please try logging in instead.';
        } else if (error.message.includes('Invalid API key')) {
          errorMessage = 'Authentication service configuration error. Please contact support.';
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
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Don't set user here - let the auth state change handler do it
      // Just return success
      return { success: true };
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.message) {
        if (error.message.includes('fetch')) {
          errorMessage = 'Unable to connect to authentication service. Please check your internet connection.';
        } else if (error.message.includes('Invalid login credentials')) {
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
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      setError(error.message);
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

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return {
          id: userId,
          email: 'user@example.com',
          company_name: 'My Company',
          subscription_plan: 'Free',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
      return data;
    } catch (error: any) {
      return {
        id: userId,
        email: 'user@example.com',
        company_name: 'My Company',
        subscription_plan: 'Free',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  };

  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      try {
        const connectionTest = await testSupabaseConnection();
        if (!connectionTest.success) {
          if (mounted) {
            setError('Unable to connect to authentication service. Please check your configuration.');
          }
          return;
        }
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          if (mounted) {
            setError('Authentication service error: ' + error.message);
          }
          return;
        }
      
        if (session?.user && mounted) {
          const profile = await fetchUserProfile(session.user.id);
          if (profile && mounted) {
            setUser(profile);
          }
        } else if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setError('Failed to initialize authentication. Please check your internet connection.');
        }
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          if (profile && mounted) {
            setUser(profile);
          }
        } else if (event === 'SIGNED_OUT') {
          if (mounted) {
            setUser(null);
          }
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          if (profile && mounted) {
            setUser(profile);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
    setError,
  };
};