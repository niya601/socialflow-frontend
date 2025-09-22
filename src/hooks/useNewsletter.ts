import { useState } from 'react';
import { supabase } from '../utils/supabase';

interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

interface UseNewsletterReturn {
  subscribe: (email: string) => Promise<{ success: boolean; error?: string }>;
  loading: boolean;
  error: string | null;
}

export const useNewsletter = (): UseNewsletterReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const subscribe = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      setError(null);

      // Validate email format
      if (!email || !email.trim()) {
        const errorMsg = 'Email is required';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      const trimmedEmail = email.trim().toLowerCase();
      
      if (!validateEmail(trimmedEmail)) {
        const errorMsg = 'Please enter a valid email address';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      // Insert into newsletter_subscriptions table
      const { data, error: supabaseError } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: trimmedEmail,
            is_active: true,
          }
        ])
        .select()
        .single();

      if (supabaseError) {
        console.error('Newsletter subscription error:', supabaseError);
        
        // Handle duplicate email error
        if (supabaseError.code === '23505') {
          const errorMsg = 'This email is already subscribed to our newsletter';
          setError(errorMsg);
          return { success: false, error: errorMsg };
        }
        
        // Handle other database errors
        const errorMsg = 'Failed to subscribe. Please try again.';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      console.log('Newsletter subscription successful:', data);
      return { success: true };

    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      const errorMsg = 'An unexpected error occurred. Please try again.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    subscribe,
    loading,
    error,
  };
};