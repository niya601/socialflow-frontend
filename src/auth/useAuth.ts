import { useState, useEffect, useCallback } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';
import { User, AuthState } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const setError = useCallback((error: string | null) => {
    setAuthState(prev => ({ ...prev, error }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setAuthState(prev => ({ ...prev, loading }));
  }, []);

  const setUser = useCallback((user: User | null) => {
    setAuthState(prev => ({ ...prev, user, loading: false }));
  }, []);

  const signUp = async (email: string, password: string, companyName: string, subscriptionPlan: 'Free' | 'Pro') => {
    try {
      setLoading(true);
      setError(null);

      console.log('Starting signup process...');
      console.log('Email:', email);
      console.log('Company:', companyName);
      console.log('Plan:', subscriptionPlan);

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

      console.log('Supabase signup response:', { data, error });

      if (error) {
        console.error('Supabase signup error:', error);
        throw error;
      }

      if (data.user) {
        console.log('User created successfully:', data.user);
        
        // Create a user object for the app state
        const user: User = {
          id: data.user.id,
          email: data.user.email || email,
          company_name: companyName,
          subscription_plan: subscriptionPlan,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        setUser(user);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Signup error:', error);
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
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Starting signin process...');
      console.log('Email:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Supabase signin response:', { data, error });

      if (error) {
        console.error('Supabase signin error:', error);
        throw error;
      }

      if (data.user) {
        console.log('User signed in successfully:', data.user);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Signin error:', error);
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
    } finally {
      setLoading(false);
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
    } finally {
      setLoading(false);
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
        console.warn('User profile fetch failed (table may not exist):', error);
        // Return a default user profile if table doesn't exist
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
      console.error('Error fetching user profile:', error);
      // Return a default user profile as fallback
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
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log('Initial session check:', { session, error });
        
        if (error) {
          console.error('Session check error:', error);
          setLoading(false);
          return;
        }
      
        if (session?.user) {
          console.log('Found existing session for user:', session.user.email);
          const profile = await fetchUserProfile(session.user.id);
          if (profile) {
            setUser(profile);
          }
        } else {
          console.log('No existing session found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          if (profile) {
            setUser(profile);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
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