import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import {
  SalonRow,
  SalonInsert,
  SalonUpdate,
  ReferralRow,
  ReferralInsert,
  ReferralUpdate,
  EarningsLedgerRow,
  EarningsLedgerInsert,
  EarningsLedgerUpdate
} from '../types/database';

export function useSalons() {
  const [salons, setSalons] = useState<SalonRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSalons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from('salons')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchErr) throw fetchErr;
      setSalons(data || []);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch salons');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createSalon = useCallback(async (salon: SalonInsert) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: insertErr } = await supabase
        .from('salons')
        .insert(salon)
        .select()
        .single();

      if (insertErr) throw insertErr;
      setSalons((prev) => [data, ...prev]);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to create salon');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSalon = useCallback(async (id: string, salon: SalonUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: updateErr } = await supabase
        .from('salons')
        .update(salon)
        .eq('id', id)
        .select()
        .single();

      if (updateErr) throw updateErr;
      setSalons((prev) => prev.map((s) => (s.id === id ? data : s)));
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to update salon');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSalon = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error: deleteErr } = await supabase
        .from('salons')
        .delete()
        .eq('id', id);

      if (deleteErr) throw deleteErr;
      setSalons((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete salon');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    salons,
    loading,
    error,
    fetchSalons,
    createSalon,
    updateSalon,
    deleteSalon,
  };
}

export function useReferrals() {
  const [referrals, setReferrals] = useState<ReferralRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReferrals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchErr) throw fetchErr;
      setReferrals(data || []);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch referrals');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createReferral = useCallback(async (referral: ReferralInsert) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: insertErr } = await supabase
        .from('referrals')
        .insert(referral)
        .select()
        .single();

      if (insertErr) throw insertErr;
      setReferrals((prev) => [data, ...prev]);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to create referral');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReferral = useCallback(async (id: string, referral: ReferralUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: updateErr } = await supabase
        .from('referrals')
        .update(referral)
        .eq('id', id)
        .select()
        .single();

      if (updateErr) throw updateErr;
      setReferrals((prev) => prev.map((r) => (r.id === id ? data : r)));
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to update referral');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteReferral = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error: deleteErr } = await supabase
        .from('referrals')
        .delete()
        .eq('id', id);

      if (deleteErr) throw deleteErr;
      setReferrals((prev) => prev.filter((r) => r.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete referral');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    referrals,
    loading,
    error,
    fetchReferrals,
    createReferral,
    updateReferral,
    deleteReferral,
  };
}

export function useEarningsLedger() {
  const [ledger, setLedger] = useState<EarningsLedgerRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLedger = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from('earnings_ledger')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchErr) throw fetchErr;
      setLedger(data || []);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch earnings ledger');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createLedgerEntry = useCallback(async (entry: EarningsLedgerInsert) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: insertErr } = await supabase
        .from('earnings_ledger')
        .insert(entry)
        .select()
        .single();

      if (insertErr) throw insertErr;
      setLedger((prev) => [data, ...prev]);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to create ledger entry');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLedgerEntry = useCallback(async (id: string, entry: EarningsLedgerUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: updateErr } = await supabase
        .from('earnings_ledger')
        .update(entry)
        .eq('id', id)
        .select()
        .single();

      if (updateErr) throw updateErr;
      setLedger((prev) => prev.map((l) => (l.id === id ? data : l)));
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to update ledger entry');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLedgerEntry = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error: deleteErr } = await supabase
        .from('earnings_ledger')
        .delete()
        .eq('id', id);

      if (deleteErr) throw deleteErr;
      setLedger((prev) => prev.filter((l) => l.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete ledger entry');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    ledger,
    loading,
    error,
    fetchLedger,
    createLedgerEntry,
    updateLedgerEntry,
    deleteLedgerEntry,
  };
}
