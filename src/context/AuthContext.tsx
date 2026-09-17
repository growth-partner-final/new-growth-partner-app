import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface RegisteredPartner {
  name: string;
  partnerId: string;
  referralLink: string;
  status?: string;
  tier?: string;
  city?: string;
  isPending?: boolean;
}

interface AuthResult {
  error: any;
  partner?: RegisteredPartner | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  registeredPartner: RegisteredPartner | null;
  setRegisteredPartner: React.Dispatch<React.SetStateAction<RegisteredPartner | null>>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, options?: { data?: any }) => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Loads the authenticated partner from the canonical growth_partners table.
 * If no partner row exists, returns "Partner profile pending" instead of sample data.
 */
async function loadPartnerFromCanonical(currentUser: User): Promise<RegisteredPartner> {
  try {
    // 1. Query canonical growth_partners table by profile_id
    const { data: partnerRow, error: partnerError } = await supabase
      .from('growth_partners')
      .select('id, profile_id, referral_code, status, verification_status, tier, city, joined_at')
      .eq('profile_id', currentUser.id)
      .maybeSingle();

    if (partnerError) {
      console.warn('Canonical growth_partners query error:', partnerError.message);
    }

    // 2. Query profiles table for legal full name
    const { data: profileRow } = await supabase
      .from('profiles')
      .select('full_name, email, phone')
      .eq('id', currentUser.id)
      .maybeSingle();

    const partnerName =
      profileRow?.full_name ||
      currentUser.user_metadata?.full_name ||
      currentUser.user_metadata?.name ||
      currentUser.email?.split('@')[0] ||
      'Partner';

    if (partnerRow && partnerRow.referral_code) {
      return {
        name: partnerName,
        partnerId: partnerRow.referral_code,
        referralLink: `https://nexora.network/join?ref=${partnerRow.referral_code}`,
        status: partnerRow.status,
        tier: partnerRow.tier,
        city: partnerRow.city,
        isPending: false,
      };
    }

    // If no partner row exists in canonical growth_partners:
    return {
      name: partnerName,
      partnerId: 'Partner profile pending',
      referralLink: '',
      isPending: true,
    };
  } catch (err) {
    console.warn('Error fetching canonical partner profile:', err);
    return {
      name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Partner',
      partnerId: 'Partner profile pending',
      referralLink: '',
      isPending: true,
    };
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [registeredPartner, setRegisteredPartner] = useState<RegisteredPartner | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Supabase getSession error:', error.message);
        }
        if (!isMounted) return;

        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          const partner = await loadPartnerFromCanonical(initialSession.user);
          if (isMounted) {
            setRegisteredPartner(partner);
          }
        } else {
          if (isMounted) {
            setRegisteredPartner(null);
          }
        }
      } catch (err) {
        console.warn('Supabase initialization error:', err);
        if (isMounted) {
          setRegisteredPartner(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const { data } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
        if (!isMounted) return;
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          const partner = await loadPartnerFromCanonical(newSession.user);
          if (isMounted) {
            setRegisteredPartner(partner);
          }
        } else {
          if (isMounted) {
            setRegisteredPartner(null);
          }
        }
        setLoading(false);
      });
      subscription = data.subscription;
    } catch (err) {
      console.warn('Supabase onAuthStateChange error:', err);
    }

    return () => {
      isMounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const res = await supabase.auth.signInWithPassword({ email, password });
      if (res.error) {
        return { error: res.error };
      }
      if (res.data.user) {
        setUser(res.data.user);
        setSession(res.data.session);
        const partner = await loadPartnerFromCanonical(res.data.user);
        setRegisteredPartner(partner);
        return { error: null, partner };
      }
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    options?: { data?: any }
  ): Promise<AuthResult> => {
    try {
      const res = await supabase.auth.signUp({ email, password, options });
      if (res.error) {
        return { error: res.error };
      }
      if (res.data.user) {
        setUser(res.data.user);
        setSession(res.data.session);
        const partner = await loadPartnerFromCanonical(res.data.user);
        setRegisteredPartner(partner);
        return { error: null, partner };
      }
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const resetPassword = async (email: string): Promise<{ error: any }> => {
    try {
      const res = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      });
      return { error: res.error };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signOut = async (): Promise<{ error: any }> => {
    try {
      const res = await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setRegisteredPartner(null);
      return { error: res.error };
    } catch (err: any) {
      setUser(null);
      setSession(null);
      setRegisteredPartner(null);
      return { error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        registeredPartner,
        setRegisteredPartner,
        signIn,
        signUp,
        resetPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
