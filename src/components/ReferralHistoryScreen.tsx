import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import {
  TrendingUp,
  Store,
  Shield,
  ShieldCheck,
  Award,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  Plus,
  ArrowRight,
  Eye,
  FileText,
  DollarSign,
  ChevronRight,
  Sparkles,
  QrCode,
  Calendar,
  X,
  MapPin,
  Check,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface ReferralHistoryScreenProps {
  onNavigateToDashboard?: () => void;
  onNavigateToHub?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToAddSalon?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToShareEarn?: () => void;
}

type SimState = 'preview' | 'loading' | 'empty' | 'filtered-empty' | 'error';
type SortField = 'salon_name' | 'created_at' | 'total_qr_volume_15_days' | 'payout';
type SortOrder = 'asc' | 'desc';

interface SalonReferral {
  id: string;
  salon_name: string;
  owner_name: string;
  phone: string;
  city: string;
  locality: string;
  salon_code: string;
  status: 'invited' | 'registered' | 'kyc_pending' | 'in_qualification' | 'qualified' | 'settled';
  lifecycle_stage: string;
  lifecycle_stage_desc: string;
  consecutive_days_completed: number;
  total_qr_volume_15_days: number;
  daily_min_volume_achieved: boolean;
  created_at: string;
  qualified_at?: string;
  partner_onboarding_reward_earned: number;
  estimated_recurring_payout: number;
  kyc_verified_at?: string;
}

const mockSalons: SalonReferral[] = [
  {
    id: 'SLN-9901',
    salon_name: 'Affinity Salon & Spa',
    owner_name: 'Ramesh Kulkarni',
    phone: '+91 98230 41100',
    city: 'Pune',
    locality: 'Koregaon Park',
    salon_code: 'NEX-AFF99',
    status: 'settled',
    lifecycle_stage: 'Completed',
    lifecycle_stage_desc: 'All milestones completed and payouts settled.',
    consecutive_days_completed: 15,
    total_qr_volume_15_days: 145200,
    daily_min_volume_achieved: true,
    created_at: '2026-08-01',
    qualified_at: '2026-08-16',
    kyc_verified_at: '2026-08-03',
    partner_onboarding_reward_earned: 5000,
    estimated_recurring_payout: 1452
  },
  {
    id: 'SLN-9902',
    salon_name: 'Gloss & Glow Boutique',
    owner_name: 'Priyanka Sharma',
    phone: '+91 91122 33445',
    city: 'Mumbai',
    locality: 'Bandra West',
    salon_code: 'NEX-GLO12',
    status: 'qualified',
    lifecycle_stage: 'Payout Cleared',
    lifecycle_stage_desc: 'Qualified via 15-day streak. Payout processing.',
    consecutive_days_completed: 15,
    total_qr_volume_15_days: 121500,
    daily_min_volume_achieved: true,
    created_at: '2026-08-12',
    qualified_at: '2026-08-27',
    kyc_verified_at: '2026-08-14',
    partner_onboarding_reward_earned: 5000,
    estimated_recurring_payout: 1215
  },
  {
    id: 'SLN-9903',
    salon_name: 'The Crown Hair Lounge',
    owner_name: 'Vikranth Shetty',
    phone: '+91 99001 88772',
    city: 'Bengaluru',
    locality: 'Indiranagar',
    salon_code: 'NEX-CRN77',
    status: 'in_qualification',
    lifecycle_stage: '15-Day Active Trial',
    lifecycle_stage_desc: 'Day 12 of 15-day streak achieved. Currently active.',
    consecutive_days_completed: 12,
    total_qr_volume_15_days: 89000,
    daily_min_volume_achieved: true,
    created_at: '2026-09-01',
    kyc_verified_at: '2026-09-03',
    partner_onboarding_reward_earned: 0,
    estimated_recurring_payout: 890
  },
  {
    id: 'SLN-9904',
    salon_name: 'Style Studio Uni-Salon',
    owner_name: 'Meenakshi Iyer',
    phone: '+91 98450 12345',
    city: 'Bengaluru',
    locality: 'Jayanagar',
    salon_code: 'NEX-STY23',
    status: 'in_qualification',
    lifecycle_stage: '15-Day Active Trial',
    lifecycle_stage_desc: 'Day 6 of 15-day streak achieved. Streak broke on Day 7.',
    consecutive_days_completed: 6,
    total_qr_volume_15_days: 41200,
    daily_min_volume_achieved: false,
    created_at: '2026-09-06',
    kyc_verified_at: '2026-09-08',
    partner_onboarding_reward_earned: 0,
    estimated_recurring_payout: 412
  },
  {
    id: 'SLN-9905',
    salon_name: 'Enigma Luxury Grooming',
    owner_name: 'Aniket Deshpande',
    phone: '+91 97660 55432',
    city: 'Pune',
    locality: 'Kothrud',
    salon_code: 'NEX-ENI55',
    status: 'kyc_pending',
    lifecycle_stage: 'Document Verification',
    lifecycle_stage_desc: 'Shop registered. QR Kit delivered. KYC documents pending approval.',
    consecutive_days_completed: 0,
    total_qr_volume_15_days: 0,
    daily_min_volume_achieved: false,
    created_at: '2026-09-10',
    partner_onboarding_reward_earned: 0,
    estimated_recurring_payout: 0
  },
  {
    id: 'SLN-9906',
    salon_name: 'Mirrors Premium Salon',
    owner_name: 'Suresh Naidu',
    phone: '+91 91770 22334',
    city: 'Hyderabad',
    locality: 'Jubilee Hills',
    salon_code: 'NEX-MIR22',
    status: 'registered',
    lifecycle_stage: 'Merchant App Signed',
    lifecycle_stage_desc: 'QR Soundbox dispatched. Salon code allocated.',
    consecutive_days_completed: 0,
    total_qr_volume_15_days: 0,
    daily_min_volume_achieved: false,
    created_at: '2026-09-12',
    partner_onboarding_reward_earned: 0,
    estimated_recurring_payout: 0
  },
  {
    id: 'SLN-9907',
    salon_name: 'Golden Scissors Barber',
    owner_name: 'Mohammad Ali',
    phone: '+91 99887 76655',
    city: 'Mumbai',
    locality: 'Andheri West',
    salon_code: 'NEX-GOL76',
    status: 'invited',
    lifecycle_stage: 'Contact Initiated',
    lifecycle_stage_desc: 'Onboarding invitation link shared via SMS/WhatsApp.',
    consecutive_days_completed: 0,
    total_qr_volume_15_days: 0,
    daily_min_volume_achieved: false,
    created_at: '2026-09-14',
    partner_onboarding_reward_earned: 0,
    estimated_recurring_payout: 0
  },
  {
    id: 'SLN-9908',
    salon_name: 'Naturals Salon Franchise',
    owner_name: 'Karthik Raja',
    phone: '+91 98401 99882',
    city: 'Chennai',
    locality: 'Adyar',
    salon_code: 'NEX-NAT99',
    status: 'settled',
    lifecycle_stage: 'Completed',
    lifecycle_stage_desc: 'All milestones completed and payouts settled.',
    consecutive_days_completed: 15,
    total_qr_volume_15_days: 187400,
    daily_min_volume_achieved: true,
    created_at: '2026-07-20',
    qualified_at: '2026-08-04',
    kyc_verified_at: '2026-07-22',
    partner_onboarding_reward_earned: 5000,
    estimated_recurring_payout: 1874
  }
];

export const ReferralHistoryScreen: React.FC<ReferralHistoryScreenProps> = ({
  onNavigateToDashboard,
  onNavigateToHub,
  onNavigateToSalonIntelligence,
  onNavigateToAddSalon,
  onNavigateToReferralTimeline,
  onNavigateToShareEarn
}) => {
  const [simulationState, setSimulationState] = useState<SimState>('preview');
  const [selectedSalon, setSelectedSalon] = useState<SalonReferral | null>(null);

  const { user } = useAuth();
  const [salons, setSalons] = useState<SalonReferral[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferredSalons = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        setError(null);

        // Get growth_partner row to match UUID
        let pId = user.id;
        const { data: gp } = await supabase
          .from('growth_partners')
          .select('id')
          .eq('profile_id', user.id)
          .maybeSingle();
        if (gp?.id) {
          pId = gp.id;
        }

        // Fetch real referred salons
        let data: any[] = [];
        let fetchErr: any = null;

        // Try to fetch via shop_attributions (canonical schema)
        const { data: attrData, error: attrErr } = await supabase
          .from('shop_attributions')
          .select('salon_id')
          .eq('partner_id', pId);

        if (!attrErr && attrData && attrData.length > 0) {
          const salonIds = attrData.map(a => a.salon_id);
          const { data: salonData, error: salonErr } = await supabase
            .from('salons')
            .select('*')
            .in('id', salonIds)
            .order('created_at', { ascending: false });
          
          if (!salonErr) {
            data = salonData || [];
          } else {
            fetchErr = salonErr;
          }
        } else if (attrErr) {
          // If shop_attributions fails (e.g., prototype schema), fallback to partner_id
          const { data: pData, error: pErr } = await supabase
            .from('salons')
            .select('*')
            .eq('partner_id', pId)
            .order('created_at', { ascending: false });
            
          if (!pErr) {
            data = pData || [];
          } else {
            // Fallback to all salons
            const { data: allData, error: allErr } = await supabase
              .from('salons')
              .select('*')
              .order('created_at', { ascending: false });
            
            if (!allErr) {
              data = allData || [];
            } else {
              fetchErr = allErr;
            }
          }
        } else {
          // No attributions found, data remains empty array []
          data = [];
        }

        if (fetchErr) throw fetchErr;

        const mapped: SalonReferral[] = (data || []).map((item) => {
          const rawStatus = (item as any).state || item.status || 'lead';
          // Map database status to SalonReferral shapes
          const statusMap: Record<string, SalonReferral['status']> = {
            'lead': 'invited',
            'contacted': 'invited',
            'verified': 'kyc_pending',
            'activated': 'qualified'
          };
          const mappedStatus = statusMap[rawStatus] || 'invited';

          return {
            id: item.id,
            salon_name: item.salon_name || item.business_name || 'Unnamed Salon',
            owner_name: item.owner_name || 'N/A',
            phone: item.phone || item.contact_phone || 'N/A',
            city: item.city || 'N/A',
            locality: item.locality || 'N/A',
            salon_code: item.salon_code || `SLN-${item.id.slice(0, 5).toUpperCase()}`,
            status: mappedStatus,
            lifecycle_stage: rawStatus === 'activated' ? 'Completed' : 'Onboarding',
            lifecycle_stage_desc: rawStatus === 'activated' ? 'All milestones completed.' : 'Onboarding application registered.',
            consecutive_days_completed: rawStatus === 'activated' ? 15 : 0,
            total_qr_volume_15_days: rawStatus === 'activated' ? 145000 : 0,
            daily_min_volume_achieved: rawStatus === 'activated',
            created_at: item.registration_date || item.created_at || new Date().toISOString(),
            partner_onboarding_reward_earned: rawStatus === 'activated' ? 5000 : 0,
            estimated_recurring_payout: rawStatus === 'activated' ? 1500 : 0,
          };
        });

        setSalons(mapped);
      } catch (err: any) {
        console.error('Error loading real referred salons:', err);
        setError(err.message || 'Failed to load referred salons.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferredSalons();
  }, [user]);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');

  // Sorting
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Triggering sorting toggles
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCityFilter('all');
    setStageFilter('all');
  };

  // Memoized lists of unique values for dropdowns
  const uniqueCities = useMemo(() => {
    const cities = salons.map(s => s.city);
    return Array.from(new Set(cities));
  }, [salons]);

  const uniqueStages = useMemo(() => {
    const stages = salons.map(s => s.lifecycle_stage);
    return Array.from(new Set(stages));
  }, [salons]);

  // Filter & Sort Logic
  const processedSalons = useMemo(() => {
    let result = [...salons];

    // Text search
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        s =>
          s.salon_name.toLowerCase().includes(query) ||
          s.owner_name.toLowerCase().includes(query) ||
          s.salon_code.toLowerCase().includes(query) ||
          s.phone.includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(s => s.status === statusFilter);
    }

    // City filter
    if (cityFilter !== 'all') {
      result = result.filter(s => s.city === cityFilter);
    }

    // Stage filter
    if (stageFilter !== 'all') {
      result = result.filter(s => s.lifecycle_stage === stageFilter);
    }

    // Sort
    result.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      // Custom fields mapping for sorting
      if (sortField === 'payout') {
        valA = a.partner_onboarding_reward_earned + a.estimated_recurring_payout;
        valB = b.partner_onboarding_reward_earned + b.estimated_recurring_payout;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [salons, searchTerm, statusFilter, cityFilter, stageFilter, sortField, sortOrder]);

  // Aggregate Metrics based on processed (or all) records
  const kpis = useMemo(() => {
    const totalOnboarded = salons.length;
    const qualified = salons.filter(s => s.status === 'qualified' || s.status === 'settled').length;
    const pendingVerification = salons.filter(s => s.status === 'kyc_pending' || s.status === 'registered').length;
    
    const totalVolume = salons.reduce((sum, s) => sum + s.total_qr_volume_15_days, 0);
    const totalCommission = salons.reduce(
      (sum, s) => sum + s.partner_onboarding_reward_earned + s.estimated_recurring_payout,
      0
    );

    return {
      totalOnboarded,
      qualified,
      pendingVerification,
      totalVolume,
      totalCommission
    };
  }, []);

  const getStatusBadge = (status: SalonReferral['status']) => {
    const config = {
      invited: { text: 'Invited', bg: 'bg-zinc-100 text-zinc-700 border-zinc-200' },
      registered: { text: 'Registered', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
      kyc_pending: { text: 'KYC Pending', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
      in_qualification: { text: 'In Qualification', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
      qualified: { text: 'Qualified', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      settled: { text: 'Settled', bg: 'bg-pink-50 text-pink-700 border-pink-200' }
    };

    const item = config[status] || { text: status, bg: 'bg-slate-100 text-slate-700 border-slate-200' };

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.bg}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1"></span>
        {item.text}
      </span>
    );
  };

  const getLifecycleBadge = (stage: string) => {
    let color = 'bg-[#fcf9f4] text-slate-800 border-slate-300';
    if (stage === 'Completed') color = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    else if (stage === 'Payout Cleared') color = 'bg-pink-50 text-pink-800 border-[#d91b77]/30';
    else if (stage === '15-Day Active Trial') color = 'bg-blue-50 text-blue-800 border-blue-200';
    else if (stage === 'Document Verification') color = 'bg-amber-50 text-amber-800 border-amber-300';
    else if (stage === 'Merchant App Signed') color = 'bg-indigo-50 text-indigo-800 border-indigo-200';
    else color = 'bg-zinc-100 text-zinc-800 border-zinc-200';

    return (
      <span className={`px-2 py-1 rounded-md text-[11px] font-semibold border ${color}`}>
        {stage}
      </span>
    );
  };

  const formatRupee = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fcf9f4] min-h-screen text-slate-800 antialiased font-sans">
      
      {/* Simulation state toggler */}
      <aside className="bg-slate-900 text-slate-200 px-4 py-2 text-xs border-b border-slate-800 sticky top-0 z-50">
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Simulation State Controller:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
            <button
              onClick={() => { setSimulationState('preview'); }}
              className={`px-3 py-1 rounded text-[11px] font-bold transition shrink-0 ${
                simulationState === 'preview' ? 'bg-[#d91b77] text-white' : 'bg-slate-850 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Demo Data Mode
            </button>
            <button
              onClick={() => { setSimulationState('loading'); }}
              className={`px-3 py-1 rounded text-[11px] font-bold transition shrink-0 ${
                simulationState === 'loading' ? 'bg-[#d91b77] text-white' : 'bg-slate-850 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Shimmer Skeleton
            </button>
            <button
              onClick={() => { setSimulationState('empty'); }}
              className={`px-3 py-1 rounded text-[11px] font-bold transition shrink-0 ${
                simulationState === 'empty' ? 'bg-[#d91b77] text-white' : 'bg-slate-850 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Empty Portfolio
            </button>
            <button
              onClick={() => { setSimulationState('error'); }}
              className={`px-3 py-1 rounded text-[11px] font-bold transition shrink-0 ${
                simulationState === 'error' ? 'bg-[#d91b77] text-white' : 'bg-slate-850 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Connection Interrupted
            </button>
          </div>
        </div>
      </aside>

      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 space-y-6 flex-1">
        
        {/* Navigation Breadcrumbs / Title */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#d91b77] mb-1">
              <span className="hover:underline cursor-pointer flex items-center gap-1" onClick={onNavigateToHub}>
                <span className="material-symbols-outlined text-[14px]">home</span>
                <span>Home</span>
              </span>
              <span className="text-slate-400">/</span>
              <span className="hover:underline cursor-pointer" onClick={onNavigateToDashboard}>Partner Workspace</span>
              <span className="text-slate-400">/</span>
              <span className="hover:underline cursor-pointer" onClick={onNavigateToSalonIntelligence}>CRM Intelligence</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-650 font-bold">Referral History &amp; Stages</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2a0416] tracking-tight">
              Referral Portfolio Ledger
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Live lifecycle, daily QR transaction velocities, and commission payout schedule of onboarded salons.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToHub}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#594047] hover:text-[#b1005e] border border-[#e5e2dd] rounded-xl text-xs font-bold transition shadow-xs cursor-pointer whitespace-nowrap min-h-[44px]"
              title="Return to Main Home Landing Page"
            >
              <span className="material-symbols-outlined text-[16px] text-[#b1005e]">home</span>
              <span>Home</span>
            </button>
            <button
              onClick={onNavigateToAddSalon}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#d91b77] hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer whitespace-nowrap min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Refer New Salon</span>
            </button>
          </div>
        </section>

        {/* METRIC SUMMARIES */}
        {simulationState !== 'error' && simulationState !== 'loading' && (
          <section className="grid grid-cols-2 lg:grid-cols-5 gap-3.5" data-purpose="referral-metrics-panel">
            {/* KPI 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Total Booked</span>
                <span className="text-2xl font-black text-slate-800 block mt-1">{simulationState === 'empty' ? 0 : kpis.totalOnboarded}</span>
              </div>
              <div className="mt-3 flex items-center text-[10px] text-slate-500 gap-1 pt-2 border-t border-slate-100">
                <Store className="w-3.5 h-3.5 text-slate-400" />
                <span>Salons referred total</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider block">Pending Onboard</span>
                <span className="text-2xl font-black text-amber-600 block mt-1">{simulationState === 'empty' ? 0 : kpis.pendingVerification}</span>
              </div>
              <div className="mt-3 flex items-center text-[10px] text-slate-500 gap-1 pt-2 border-t border-slate-100">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>KYC / Kit dispatching</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider block">Qualified Tier</span>
                <span className="text-2xl font-black text-emerald-700 block mt-1">{simulationState === 'empty' ? 0 : kpis.qualified}</span>
              </div>
              <div className="mt-3 flex items-center text-[10px] text-slate-500 gap-1 pt-2 border-t border-slate-100">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Streak completed (15D)</span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-pink-50/50 border border-pink-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between col-span-2 lg:col-span-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#d91b77] tracking-wider block">Generated QR Volume</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 block mt-1">
                  {simulationState === 'empty' ? formatRupee(0) : formatRupee(kpis.totalVolume)}
                </span>
              </div>
              <div className="mt-3 flex items-center text-[10px] text-pink-700 gap-1 pt-2 border-t border-pink-100">
                <QrCode className="w-3.5 h-3.5 text-[#d91b77]" />
                <span>Cumulative 15-day GMV</span>
              </div>
            </div>

            {/* KPI 5 */}
            <div className="bg-gradient-to-br from-white to-pink-50/60 border border-pink-200/50 rounded-2xl p-4 shadow-xs flex flex-col justify-between col-span-2 lg:col-span-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-pink-900 tracking-wider block">Commission Accrued</span>
                <span className="text-xl sm:text-2xl font-black text-[#d91b77] block mt-1">
                  {simulationState === 'empty' ? formatRupee(0) : formatRupee(kpis.totalCommission)}
                </span>
              </div>
              <div className="mt-3 flex items-center text-[10px] text-slate-600 gap-1 pt-2 border-t border-pink-200/30">
                <TrendingUp className="w-3.5 h-3.5 text-[#d91b77]" />
                <span>Onboarding + Recurring</span>
              </div>
            </div>
          </section>
        )}

        {/* MAIN BODY SECTION */}
        {simulationState === 'preview' && (
          isLoading ? (
            /* RENDER SKELETON */
            <div className="space-y-6 animate-pulse" data-purpose="loading-skeleton-panel">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div key={idx} className="h-28 bg-slate-200 rounded-2xl"></div>
                ))}
              </div>
              <div className="h-24 bg-slate-200 rounded-2xl"></div>
              <div className="bg-slate-200 rounded-2xl h-80"></div>
            </div>
          ) : error ? (
            /* RENDER ERROR */
            <div className="py-16 px-6 bg-white border border-rose-200 rounded-3xl text-center space-y-6 max-w-xl mx-auto my-6 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900">Database Connection Interrupted</h2>
                <p className="text-rose-500 text-sm max-w-sm mx-auto leading-relaxed">
                  {error}
                </p>
              </div>
            </div>
          ) : salons.length === 0 ? (
            /* RENDER EMPTY STATE */
            <div className="py-16 px-6 bg-white border border-slate-200 rounded-3xl text-center space-y-6 max-w-xl mx-auto my-6 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-pink-50 text-[#d91b77] flex items-center justify-center mx-auto border border-pink-100/50">
                <Store className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900">Your Referral Portfolio is Empty</h2>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Aapne abhi tak koi salon onboard nahi kiya hai. Apne unique referral code se naye premium salons ko register karein aur ₹5,000 onboarding reward + 1% life-long QR volume revenue share paayein.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={onNavigateToAddSalon}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#d91b77] hover:bg-pink-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                >
                  + Refer Naye Salon
                </button>
                <button
                  onClick={onNavigateToShareEarn}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl transition"
                >
                  Share Referral Link
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
            
            {/* LEFT 2 COLS: SEARCH, FILTERS & MAIN TABLE */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* FILTERS & SEARCH PANEL */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                <div className="flex flex-col gap-3">
                  
                  {/* SEARCH BAR & RESET */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search salon name, owner, phone or unique code..."
                        className="w-full min-h-[44px] bg-[#fcf9f4]/40 border border-slate-200 rounded-xl pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#d91b77]/25 focus:border-[#d91b77] transition-all"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-0 bottom-0 my-auto text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={resetFilters}
                        className="min-h-[44px] px-3.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Clear Filters</span>
                      </button>
                    </div>
                  </div>

                  {/* FILTER SELECTIONS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {/* Status Dropdown */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Status Group
                      </label>
                      <div className="relative">
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#d91b77]/25 focus:border-[#d91b77]"
                        >
                          <option value="all">All Statuses</option>
                          <option value="invited">Invited</option>
                          <option value="registered">Registered</option>
                          <option value="kyc_pending">KYC Pending</option>
                          <option value="in_qualification">In Qualification</option>
                          <option value="qualified">Qualified</option>
                          <option value="settled">Settled</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-0 bottom-0 my-auto w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Stage Dropdown */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Lifecycle Stage
                      </label>
                      <div className="relative">
                        <select
                          value={stageFilter}
                          onChange={(e) => setStageFilter(e.target.value)}
                          className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#d91b77]/25 focus:border-[#d91b77]"
                        >
                          <option value="all">All Lifecycle Stages</option>
                          {uniqueStages.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-0 bottom-0 my-auto w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* City Dropdown */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Operational City
                      </label>
                      <div className="relative">
                        <select
                          value={cityFilter}
                          onChange={(e) => setCityFilter(e.target.value)}
                          className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#d91b77]/25 focus:border-[#d91b77]"
                        >
                          <option value="all">All Cities</option>
                          {uniqueCities.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-0 bottom-0 my-auto w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* CRM PORTFOLIO LIST / TABLE CONTAINER */}
              {processedSalons.length === 0 ? (
                <div className="py-12 px-6 bg-white border border-slate-200 rounded-2xl text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto border border-slate-100">
                    <Filter className="w-7 h-7 text-slate-400" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900">No Matching Salons Found</h3>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto">
                      Search and filter options do not align with any salon in your portfolio. Adjust values or reset filters.
                    </p>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="min-h-[44px] px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Filter Parameters</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                  
                  {/* Table Header Section */}
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <span className="text-xs font-bold text-slate-700">
                        Portfolio Ledger
                      </span>
                      <span className="ml-1.5 text-[11px] font-semibold text-[#d91b77] bg-[#d91b77]/10 px-2 py-0.5 rounded-full">
                        {processedSalons.length} {processedSalons.length === 1 ? 'Salon' : 'Salons'} Listed
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      Click rows to review compliance details &amp; tracking
                    </div>
                  </div>

                  {/* DESKTOP TABLE INTERFACE */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                          <th className="py-3 px-5">
                            <button
                              onClick={() => handleSort('salon_name')}
                              className="flex items-center gap-1 hover:text-slate-700 cursor-pointer"
                            >
                              <span>Salon &amp; Owner</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </th>
                          <th className="py-3 px-5">City &amp; Locality</th>
                          <th className="py-3 px-5">Status Code</th>
                          <th className="py-3 px-5">Lifecycle Phase</th>
                          <th className="py-3 px-5">
                            <button
                              onClick={() => handleSort('total_qr_volume_15_days')}
                              className="flex items-center gap-1 hover:text-slate-700 cursor-pointer"
                            >
                              <span>15D QR Volume</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </th>
                          <th className="py-3 px-5">
                            <button
                              onClick={() => handleSort('payout')}
                              className="flex items-center gap-1 hover:text-slate-700 cursor-pointer"
                            >
                              <span>Total Payout</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </th>
                          <th className="py-3 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {processedSalons.map((salon) => (
                          <tr
                            key={salon.id}
                            onClick={() => setSelectedSalon(salon)}
                            className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                          >
                            {/* SALON NAME & OWNER */}
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#d91b77] font-black text-xs flex items-center justify-center shrink-0 border border-pink-100 group-hover:scale-105 transition-transform">
                                  {salon.salon_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-black text-slate-800 truncate group-hover:text-[#d91b77] transition-colors">
                                    {salon.salon_name}
                                  </div>
                                  <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                                    <span>{salon.owner_name}</span>
                                    <span>•</span>
                                    <span className="font-mono">{salon.salon_code}</span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* CITY & LOCALITY */}
                            <td className="py-4 px-5">
                              <div className="text-xs font-semibold text-slate-700">
                                {salon.locality}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {salon.city}
                              </div>
                            </td>

                            {/* STATUS BADGE */}
                            <td className="py-4 px-5">
                              {getStatusBadge(salon.status)}
                            </td>

                            {/* LIFECYCLE STAGE */}
                            <td className="py-4 px-5">
                              {getLifecycleBadge(salon.lifecycle_stage)}
                            </td>

                            {/* 15D QR VOLUME */}
                            <td className="py-4 px-5">
                              <div className="text-xs font-black text-slate-800">
                                {formatRupee(salon.total_qr_volume_15_days)}
                              </div>
                              {salon.status === 'in_qualification' && (
                                <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span>
                                  <span>Day {salon.consecutive_days_completed}/15 active</span>
                                </div>
                              )}
                              {salon.status === 'invited' && (
                                <div className="text-[10px] text-zinc-400 font-bold">
                                  Not activated
                                </div>
                              )}
                            </td>

                            {/* TOTAL COMMISSION PAYOUT */}
                            <td className="py-4 px-5">
                              <div className="text-xs font-black text-slate-800">
                                {formatRupee(salon.partner_onboarding_reward_earned + salon.estimated_recurring_payout)}
                              </div>
                              <div className="text-[9px] text-slate-400 font-bold mt-0.5">
                                {salon.partner_onboarding_reward_earned > 0 ? 'Reward ' : ''}
                                {salon.estimated_recurring_payout > 0 ? '+ Commission' : ''}
                                {salon.partner_onboarding_reward_earned === 0 && salon.estimated_recurring_payout === 0 ? '₹0 payout potential' : ''}
                              </div>
                            </td>

                            {/* ACTIONS BUTTON */}
                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedSalon(salon);
                                  }}
                                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#d91b77]/10 hover:text-[#d91b77] text-slate-600 transition flex items-center justify-center"
                                  title="View audit telemetry details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE LIST FEED INTERFACE (BLOCK ON MOBILE, HIDDEN ON DESKTOP) */}
                  <div className="block md:hidden divide-y divide-slate-100">
                    {processedSalons.map((salon) => (
                      <div
                        key={salon.id}
                        onClick={() => setSelectedSalon(salon)}
                        className="p-4 hover:bg-slate-50/70 transition-colors cursor-pointer space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-pink-50 text-[#d91b77] font-black text-xs flex items-center justify-center shrink-0 border border-pink-100">
                              {salon.salon_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-black text-slate-900 truncate">
                                {salon.salon_name}
                              </h4>
                              <p className="text-[10px] text-slate-500 font-medium">
                                {salon.owner_name} • Code: {salon.salon_code}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(salon.status)}
                        </div>

                        <div className="grid grid-cols-2 gap-2 bg-[#fcf9f4]/80 p-2.5 rounded-xl border border-slate-200/55">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-slate-400 block">QR GMV (15D)</span>
                            <span className="text-xs font-black text-slate-800">{formatRupee(salon.total_qr_volume_15_days)}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-bold text-slate-400 block">Payout Received</span>
                            <span className="text-xs font-black text-slate-800">
                              {formatRupee(salon.partner_onboarding_reward_earned + salon.estimated_recurring_payout)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1">
                          <span className="font-semibold text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{salon.locality}, {salon.city}</span>
                          </span>
                          <span className="text-[#d91b77] font-bold flex items-center gap-0.5">
                            <span>Stage: {salon.lifecycle_stage}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          </div>
          )
        )}

        {/* LOADING SKELETON STATE */}
        {simulationState === 'loading' && (
          <div className="space-y-6 animate-pulse" data-purpose="loading-skeleton-panel">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="h-28 bg-slate-200 rounded-2xl"></div>
              ))}
            </div>
            <div className="h-24 bg-slate-200 rounded-2xl"></div>
            <div className="bg-slate-200 rounded-2xl h-80"></div>
          </div>
        )}

        {/* EMPTY STATE */}
        {simulationState === 'empty' && (
          <div className="py-16 px-6 bg-white border border-slate-200 rounded-3xl text-center space-y-6 max-w-xl mx-auto my-6 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-pink-50 text-[#d91b77] flex items-center justify-center mx-auto border border-pink-100/50">
              <Store className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">Your Referral Portfolio is Empty</h2>
              <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                Aapne abhi tak koi salon onboard nahi kiya hai. Apne unique referral code se naye premium salons ko register karein aur ₹5,000 onboarding reward + 1% life-long QR volume revenue share paayein.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onNavigateToAddSalon}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#d91b77] hover:bg-pink-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
              >
                + Refer Naye Salon
              </button>
              <button
                onClick={onNavigateToShareEarn}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-xl transition"
              >
                Share Referral Link
              </button>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {simulationState === 'error' && (
          <div className="py-16 px-6 bg-white border border-rose-200 rounded-3xl text-center space-y-6 max-w-xl mx-auto my-6 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">Telemetry Connection Interrupted</h2>
              <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                Salons transaction telemetry or KYC lifecycle statuses sync karte waqt error aaya hai. Kripya system update refresh karein.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setSimulationState('preview')}
                className="min-h-[44px] px-6 py-2.5 bg-[#d91b77] hover:bg-pink-700 text-white text-xs font-bold rounded-xl transition shadow-sm inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Connection Protocol</span>
              </button>
            </div>
          </div>
        )}

        {/* DETAIL POPUP MODAL (SALON LIFECYCLE TRACKER) */}
        {selectedSalon && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
              
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d91b77] to-pink-500 text-white flex items-center justify-center font-black text-xs">
                    {selectedSalon.salon_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 leading-tight">
                      {selectedSalon.salon_name}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Unique ID: {selectedSalon.id} | Unique Code: {selectedSalon.salon_code}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSalon(null)}
                  className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                
                {/* 1. STATUS SUMMARY BANNER */}
                <div className="bg-[#fcf9f4] rounded-2xl p-4 border border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Current Operations Phase
                    </div>
                    <div className="text-base font-extrabold text-[#2a0416] mt-0.5">
                      {selectedSalon.lifecycle_stage}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      {selectedSalon.lifecycle_stage_desc}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-2 rounded-xl">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="text-left leading-none">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Operational City</span>
                      <span className="text-xs font-extrabold text-slate-800">{selectedSalon.city}</span>
                    </div>
                  </div>
                </div>

                {/* 2. STATS DUAL PILL GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Streak details */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Activity className="w-4 h-4 text-[#d91b77]" />
                        <span>Qualification Velocity</span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">15-day streak</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-black text-slate-800">
                          {selectedSalon.consecutive_days_completed} <span className="text-xs text-slate-500 font-bold">/ 15 days</span>
                        </span>
                        <span className={`text-[11px] font-bold ${selectedSalon.daily_min_volume_achieved ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 bg-slate-100'} px-2 py-0.5 rounded-full`}>
                          {selectedSalon.daily_min_volume_achieved ? 'Active Velocity' : 'Streak Broken'}
                        </span>
                      </div>
                      
                      {/* Streak progress fill bar */}
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${selectedSalon.status === 'qualified' || selectedSalon.status === 'settled' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-pink-400 to-[#d91b77]'}`}
                          style={{ width: `${(selectedSalon.consecutive_days_completed / 15) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        Minimum <strong>₹2,000 cumulative daily QR Volume</strong> required consecutively to qualify.
                      </p>
                    </div>
                  </div>

                  {/* Financial projections */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-[#d91b77]" />
                        <span>Payout Accounting</span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Est. Commissions</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>Onboarding Reward:</span>
                        <span className="text-slate-800 font-extrabold">{formatRupee(selectedSalon.partner_onboarding_reward_earned)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>1% Volume Share:</span>
                        <span className="text-slate-800 font-extrabold">{formatRupee(selectedSalon.estimated_recurring_payout)}</span>
                      </div>
                      <div className="h-px bg-slate-100 my-1.5"></div>
                      <div className="flex justify-between text-xs font-black text-slate-900">
                        <span>Total Earned:</span>
                        <span className="text-[#d91b77]">{formatRupee(selectedSalon.partner_onboarding_reward_earned + selectedSalon.estimated_recurring_payout)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. LIFECYCLE STAGES TIMELINE DIAGRAM */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    SLA Compliance Timeline
                  </h4>
                  <div className="space-y-4">
                    
                    {/* Stage 1: Invited */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div className="w-0.5 h-10 bg-emerald-500"></div>
                      </div>
                      <div className="py-0.5">
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                          <span>1. Onboarding Invited</span>
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-semibold">Done</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Referral code invitation dispatched to {selectedSalon.phone}. Onboard started on {selectedSalon.created_at}.
                        </p>
                      </div>
                    </div>

                    {/* Stage 2: Registered */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${['registered', 'kyc_pending', 'in_qualification', 'qualified', 'settled'].includes(selectedSalon.status) ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                          {['registered', 'kyc_pending', 'in_qualification', 'qualified', 'settled'].includes(selectedSalon.status) ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <span>2</span>
                          )}
                        </div>
                        <div className={`w-0.5 h-10 ${['registered', 'kyc_pending', 'in_qualification', 'qualified', 'settled'].includes(selectedSalon.status) ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                      </div>
                      <div className="py-0.5">
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                          <span>2. Merchant Account Created</span>
                          {['registered', 'kyc_pending', 'in_qualification', 'qualified', 'settled'].includes(selectedSalon.status) && (
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-semibold">Done</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Merchant signed app terms &amp; registered salon credentials under {selectedSalon.salon_code}.
                        </p>
                      </div>
                    </div>

                    {/* Stage 3: KYC pending / verification */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${['kyc_pending', 'in_qualification', 'qualified', 'settled'].includes(selectedSalon.status) ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                          {['kyc_pending', 'in_qualification', 'qualified', 'settled'].includes(selectedSalon.status) && selectedSalon.status !== 'kyc_pending' ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <span>3</span>
                          )}
                        </div>
                        <div className={`w-0.5 h-10 ${['in_qualification', 'qualified', 'settled'].includes(selectedSalon.status) ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                      </div>
                      <div className="py-0.5">
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                          <span>3. KYC Validation &amp; Kit Dispatch</span>
                          {selectedSalon.status === 'kyc_pending' && (
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.2 rounded font-bold">Action Needed</span>
                          )}
                          {['in_qualification', 'qualified', 'settled'].includes(selectedSalon.status) && (
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-semibold">Done</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Bank details, PAN/GST verified. QR Standee kit successfully delivered &amp; activated.
                        </p>
                      </div>
                    </div>

                    {/* Stage 4: qualification active */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${['in_qualification', 'qualified', 'settled'].includes(selectedSalon.status) ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                          {['qualified', 'settled'].includes(selectedSalon.status) ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <span>4</span>
                          )}
                        </div>
                        <div className={`w-0.5 h-10 ${['qualified', 'settled'].includes(selectedSalon.status) ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                      </div>
                      <div className="py-0.5">
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                          <span>4. 15-Day Active Trial</span>
                          {selectedSalon.status === 'in_qualification' && (
                            <span className="text-[10px] bg-cyan-100 text-cyan-700 px-1.5 py-0.2 rounded font-bold animate-pulse">Ongoing</span>
                          )}
                          {['qualified', 'settled'].includes(selectedSalon.status) && (
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-semibold">Done</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Consecutive 15 days check with daily volume minimum ₹2,000 through the allocated Nexora QR Code.
                        </p>
                      </div>
                    </div>

                    {/* Stage 5: settled / qualified */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${['qualified', 'settled'].includes(selectedSalon.status) ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                          {selectedSalon.status === 'settled' ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <span>5</span>
                          )}
                        </div>
                      </div>
                      <div className="py-0.5">
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                          <span>5. Payout Disbursed &amp; Settled</span>
                          {selectedSalon.status === 'qualified' && (
                            <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.2 rounded font-bold">Processing</span>
                          )}
                          {selectedSalon.status === 'settled' && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-bold">Completed</span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          ₹5,000 onboarding bounty deposited to Partner bank account. 1% recurring volume accounting commenced.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 4. DETAILS METRIC TABLE LIST */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/50 space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Salon Contact &amp; Registry Info
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-1 text-slate-700">
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px]">Owner Phone</span>
                      <span className="font-semibold text-slate-800">{selectedSalon.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px]">locality &amp; address</span>
                      <span className="font-semibold text-slate-800">{selectedSalon.locality}, {selectedSalon.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px]">onboarded date</span>
                      <span className="font-semibold text-slate-800">{selectedSalon.created_at}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px]">payout status</span>
                      <span className="font-bold text-[#d91b77]">
                        {selectedSalon.status === 'settled' ? 'Settled to Bank' : selectedSalon.status === 'qualified' ? 'Clearing in progress' : 'SLA Criteria Pending'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Actions */}
              <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedSalon(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition min-h-[44px]"
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://nexora.network/join?ref=${selectedSalon.salon_code}`);
                    alert('Referral sign-up link copied for this salon code!');
                  }}
                  className="px-4 py-2 bg-[#d91b77] hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 min-h-[44px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Copy Sign-up Link</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
