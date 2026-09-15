import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface RegisteredPartner {
  name: string;
  partnerId: string;
  referralLink: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  registeredPartner: RegisteredPartner | null;
  setRegisteredPartner: React.Dispatch<React.SetStateAction<RegisteredPartner | null>>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, options?: { data?: any }) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const DEFAULT_PARTNER: RegisteredPartner = {
  name: 'Growth Partner [DEV SAMPLE]',
  partnerId: 'REF-5A45019655',
  referralLink: 'https://nexora.network/join?ref=REF-5A45019655'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [registeredPartner, setRegisteredPartner] = useState<RegisteredPartner | null>(DEFAULT_PARTNER);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const metadata = session.user.user_metadata || {};
        const pId = metadata.partner_id || DEFAULT_PARTNER.partnerId;
        setRegisteredPartner({
          name: metadata.full_name || metadata.name || session.user.email?.split('@')[0] || DEFAULT_PARTNER.name,
          partnerId: pId,
          referralLink: metadata.referral_link || `https://nexora.network/join?ref=${pId}`
        });
      }
      setLoading(false);
    }).catch((err) => {
      console.warn('Supabase getSession error:', err);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const metadata = session.user.user_metadata || {};
        const pId = metadata.partner_id || DEFAULT_PARTNER.partnerId;
        setRegisteredPartner({
          name: metadata.full_name || metadata.name || session.user.email?.split('@')[0] || DEFAULT_PARTNER.name,
          partnerId: pId,
          referralLink: metadata.referral_link || `https://nexora.network/join?ref=${pId}`
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (!res.error && res.data.user) {
      const metadata = res.data.user.user_metadata || {};
      const pId = metadata.partner_id || DEFAULT_PARTNER.partnerId;
      setRegisteredPartner({
        name: metadata.full_name || metadata.name || res.data.user.email?.split('@')[0] || DEFAULT_PARTNER.name,
        partnerId: pId,
        referralLink: metadata.referral_link || `https://nexora.network/join?ref=${pId}`
      });
    }
    return { error: res.error };
  };

  const signUp = async (email: string, password: string, options?: { data?: any }) => {
    const res = await supabase.auth.signUp({ email, password, options });
    if (!res.error && res.data.user) {
      const metadata = res.data.user.user_metadata || {};
      const pId = metadata.partner_id || DEFAULT_PARTNER.partnerId;
      setRegisteredPartner({
        name: metadata.full_name || metadata.name || res.data.user.email?.split('@')[0] || DEFAULT_PARTNER.name,
        partnerId: pId,
        referralLink: metadata.referral_link || `https://nexora.network/join?ref=${pId}`
      });
    }
    return { error: res.error };
  };

  const signOut = async () => {
    const res = await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    return { error: res.error };
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
        signOut
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
