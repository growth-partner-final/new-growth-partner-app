import React, { useState, useEffect } from 'react';

interface SalonOnboardingLog {
  id: string;
  salonName: string;
  ownerName: string;
  locality: string;
  timestamp: string;
  hardware: 'Soundbox 4G' | 'QR Standee' | 'Smart POS';
  bonus: number;
}

interface WeeklyGoalTrackerProps {
  onNavigateToAddSalon?: () => void;
  className?: string;
}

const STORAGE_KEY = 'nexora_partner_weekly_goal_v1';

export const WeeklyGoalTracker: React.FC<WeeklyGoalTrackerProps> = ({
  onNavigateToAddSalon,
  className = ''
}) => {
  // Saved state or defaults
  const [target, setTarget] = useState<number>(5);
  const [completed, setCompleted] = useState<number>(3);
  const [isEditingTarget, setIsEditingTarget] = useState<boolean>(false);
  const [tempTarget, setTempTarget] = useState<number>(5);
  const [showQuickAddModal, setShowQuickAddModal] = useState<boolean>(false);
  const [newSalonName, setNewSalonName] = useState<string>('');
  const [newSalonLocality, setNewSalonLocality] = useState<string>('');
  const [newSalonHardware, setNewSalonHardware] = useState<'Soundbox 4G' | 'QR Standee' | 'Smart POS'>('Soundbox 4G');
  
  const [recentLogs, setRecentLogs] = useState<SalonOnboardingLog[]>([
    {
      id: 'log-1',
      salonName: 'Luxe Looks Hair Studio',
      ownerName: 'Sunita Rao',
      locality: 'Indiranagar, Bangalore',
      timestamp: 'Yesterday, 4:15 PM',
      hardware: 'Soundbox 4G',
      bonus: 2500
    },
    {
      id: 'log-2',
      salonName: 'Velvet Glow Unisex Salon',
      ownerName: 'Arjun Verma',
      locality: 'Koramangala, Bangalore',
      timestamp: '2 days ago',
      hardware: 'Smart POS',
      bonus: 3000
    },
    {
      id: 'log-3',
      salonName: 'Urban Shears & Spa',
      ownerName: 'Deepak Sharma',
      locality: 'HSR Layout, Bangalore',
      timestamp: '3 days ago',
      hardware: 'QR Standee',
      bonus: 1500
    }
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.target === 'number' && parsed.target > 0) {
          setTarget(parsed.target);
          setTempTarget(parsed.target);
        }
        if (typeof parsed.completed === 'number') {
          setCompleted(parsed.completed);
        }
        if (Array.isArray(parsed.recentLogs)) {
          setRecentLogs(parsed.recentLogs);
        }
      }
    } catch (e) {
      console.warn('Failed to load weekly goal state', e);
    }
  }, []);

  // Sync to localStorage
  const persistState = (newTarget: number, newCompleted: number, newLogs: SalonOnboardingLog[]) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          target: newTarget,
          completed: newCompleted,
          recentLogs: newLogs
        })
      );
    } catch (e) {
      console.warn('Failed to persist weekly goal state', e);
    }
  };

  const handleSaveTarget = () => {
    const valid = Math.max(1, Math.min(50, Number(tempTarget) || 5));
    setTarget(valid);
    setIsEditingTarget(false);
    persistState(valid, completed, recentLogs);
  };

  const handleLogQuickOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSalonName.trim()) return;

    const bonus = newSalonHardware === 'Smart POS' ? 3000 : newSalonHardware === 'Soundbox 4G' ? 2500 : 1500;
    const newLog: SalonOnboardingLog = {
      id: `log-${Date.now()}`,
      salonName: newSalonName.trim(),
      ownerName: 'Verified Merchant',
      locality: newSalonLocality.trim() || 'Metro Hub',
      timestamp: 'Just now',
      hardware: newSalonHardware,
      bonus
    };

    const nextCompleted = completed + 1;
    const nextLogs = [newLog, ...recentLogs];
    setCompleted(nextCompleted);
    setRecentLogs(nextLogs);
    setNewSalonName('');
    setNewSalonLocality('');
    setShowQuickAddModal(false);
    persistState(target, nextCompleted, nextLogs);
  };

  const handleQuickIncrement = () => {
    const nextCompleted = completed + 1;
    const dummyLog: SalonOnboardingLog = {
      id: `log-${Date.now()}`,
      salonName: `Partner Salon #${nextCompleted}`,
      ownerName: 'Direct Referral',
      locality: 'City Center',
      timestamp: 'Just now',
      hardware: 'Soundbox 4G',
      bonus: 2500
    };
    const nextLogs = [dummyLog, ...recentLogs];
    setCompleted(nextCompleted);
    setRecentLogs(nextLogs);
    persistState(target, nextCompleted, nextLogs);
  };

  const handleResetWeek = () => {
    if (window.confirm('Reset this week\'s onboarding tally to 0 for a fresh sprint?')) {
      setCompleted(0);
      setRecentLogs([]);
      persistState(target, 0, []);
    }
  };

  // Math for dynamic SVG progress ring
  const percentage = Math.min(100, Math.round((completed / Math.max(target, 1)) * 100));
  const radius = 54;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const isGoalAchieved = completed >= target;
  const remaining = Math.max(0, target - completed);
  const estimatedActivationBonus = completed * 2500;
  const sprintMilestoneBonus = isGoalAchieved ? (target >= 8 ? 5000 : 2500) : 0;
  const totalProjected = estimatedActivationBonus + sprintMilestoneBonus;

  return (
    <section 
      id="weekly-goal-tracker-card"
      className={`relative w-full rounded-2xl bg-white/90 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Decorative gradient glow accents */}
      <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[#d91b77]/10 blur-2xl pointer-events-none -z-0"></div>
      <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#ffe088]/20 blur-2xl pointer-events-none -z-0"></div>

      <div className="relative z-10 flex flex-col gap-6">
        {/* Card Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e2dd]/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shadow-xs shrink-0">
              <span className="material-symbols-outlined text-[22px]">target</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#1c1c19] tracking-tight">
                  Weekly Goal Tracker
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f0ede9] text-[#72304f] text-[11px] font-bold border border-[#e5e2dd]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d91b77] animate-pulse"></span>
                  Current Sprint
                </span>
              </div>
              <p className="text-xs text-[#594047] mt-0.5">
                Set and track your weekly salon onboardings to maximize tier multipliers and sprint bonuses.
              </p>
            </div>
          </div>

          {/* Edit Target & Actions */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              id="edit-weekly-target-btn"
              type="button"
              onClick={() => setIsEditingTarget(!isEditingTarget)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#594047] bg-[#f6f3ee] hover:bg-[#e5e2dd] hover:text-[#1c1c19] border border-[#e5e2dd] transition-colors cursor-pointer"
              title="Change your weekly onboarding target"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span>{isEditingTarget ? 'Close' : 'Set Target'}</span>
            </button>

            <button
              id="quick-log-salon-btn"
              type="button"
              onClick={() => setShowQuickAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#d91b77] hover:bg-[#b1005e] shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Log Salon</span>
            </button>
          </div>
        </div>

        {/* Inline Target Setter Panel (when active) */}
        {isEditingTarget && (
          <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#d91b77]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1c1c19]">Choose Your Weekly Target</span>
              <span className="text-[11px] text-[#594047]">
                Select a recommended sprint commitment or enter a custom target number.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Presets */}
              {[3, 5, 8, 10, 15].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTempTarget(val)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    tempTarget === val
                      ? 'bg-[#d91b77] text-white shadow-xs'
                      : 'bg-white text-[#594047] hover:bg-[#ebe8e3] border border-[#e5e2dd]'
                  }`}
                >
                  {val} Salons
                </button>
              ))}

              <div className="flex items-center gap-1.5 ml-1">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={tempTarget}
                  onChange={(e) => setTempTarget(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-2.5 py-1 rounded-lg bg-white border border-[#e5e2dd] text-xs font-bold text-[#1c1c19] text-center focus:outline-hidden focus:border-[#d91b77]"
                />
                <button
                  type="button"
                  onClick={handleSaveTarget}
                  className="px-3 py-1 rounded-lg bg-[#1c1c19] text-white text-xs font-bold hover:bg-[#3c0223] transition-colors cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Tracker Body: Ring & Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Dynamic Progress Ring (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6 p-4 rounded-2xl bg-[#fcf9f4] border border-[#e5e2dd]/80">
            {/* SVG Ring */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                {/* Background Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="text-[#f0ede9]"
                  strokeWidth={strokeWidth}
                  stroke="currentColor"
                  fill="transparent"
                />
                {/* Dynamic Progress Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke={isGoalAchieved ? '#cca730' : '#d91b77'}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              {/* Center Content Inside Ring */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                <span className="text-3xl font-black text-[#1c1c19] tracking-tight leading-none">
                  {percentage}%
                </span>
                <span className="text-[11px] font-bold text-[#8e4767] mt-0.5">
                  {completed} / {target}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#594047] font-semibold">
                  Salons
                </span>
              </div>
            </div>

            {/* Ring Summary Copy */}
            <div className="flex flex-col text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                {isGoalAchieved ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-extrabold shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">military_tech</span>
                    Goal Smashed! 🎉
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#b1005e] text-xs font-bold">
                    <span className="material-symbols-outlined text-[15px]">trending_up</span>
                    In Progress
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-[#1c1c19] mt-1.5">
                {isGoalAchieved
                  ? `Outstanding! Target of ${target} surpassed!`
                  : `${remaining} more salon${remaining === 1 ? '' : 's'} to hit goal`}
              </h3>

              <p className="text-xs text-[#594047] mt-1 leading-relaxed max-w-xs">
                {isGoalAchieved
                  ? 'You unlocked this week\'s sprint bonus multiplier. Every extra salon adds 1.25x revenue share!'
                  : `You're ${percentage}% of the way there. Onboard ${remaining} more salon${remaining === 1 ? '' : 's'} before Sunday midnight.`}
              </p>

              {/* Quick Stepper action */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                <button
                  type="button"
                  onClick={handleQuickIncrement}
                  className="px-3 py-1 rounded-full bg-white text-[#b1005e] hover:bg-[#ffd9e2] text-xs font-bold border border-[#e5e2dd] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">add_circle</span>
                  <span>+1 Quick Onboard</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetWeek}
                  className="p-1 text-[#594047] hover:text-[#b1005e] transition-colors cursor-pointer"
                  title="Reset weekly sprint"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Telemetry & Financial Projection (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Card 1: Completed Activations */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e5e2dd] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-[#594047]">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Activated</span>
                  <span className="material-symbols-outlined text-[18px] text-[#b1005e]">storefront</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-[#1c1c19]">{completed}</span>
                    <span className="text-xs text-[#594047]">/ {target} Target</span>
                  </div>
                  <div className="w-full bg-[#f0ede9] rounded-full h-1.5 mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isGoalAchieved ? 'bg-[#cca730]' : 'bg-[#d91b77]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Card 2: Estimated Activation Cash */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e5e2dd] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-[#594047]">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Activation Bonus</span>
                  <span className="material-symbols-outlined text-[18px] text-[#cca730]">payments</span>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-black text-[#d91b77] font-mono">
                    ₹{estimatedActivationBonus.toLocaleString('en-IN')}
                  </span>
                  <div className="text-[10px] text-[#594047] mt-0.5">
                    Avg ₹2,500 per hardware setup
                  </div>
                </div>
              </div>

              {/* Card 3: Sprint Milestone Bonus */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e5e2dd] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-[#594047]">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Sprint Bonus</span>
                  <span className="material-symbols-outlined text-[18px] text-[#735c00]">stars</span>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-black text-[#1c1c19] font-mono">
                    {isGoalAchieved ? `+₹${sprintMilestoneBonus.toLocaleString('en-IN')}` : 'Locked'}
                  </span>
                  <div className="text-[10px] text-[#8e4767] font-semibold mt-0.5">
                    {isGoalAchieved ? 'Unlocked for Monday payout' : `Complete ${remaining} more to unlock`}
                  </div>
                </div>
              </div>
            </div>

            {/* Projected Weekly Payout Box */}
            <div className="p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ffe088] text-[#241a00] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1c1c19]">
                    Total Projected Sprint Earnings: ₹{totalProjected.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-[#594047]">
                    Includes activation payouts + recurring transaction commission estimates.
                  </span>
                </div>
              </div>

              {onNavigateToAddSalon && (
                <button
                  type="button"
                  onClick={onNavigateToAddSalon}
                  className="px-4 py-1.5 rounded-full text-xs font-bold text-[#b1005e] bg-white hover:bg-[#ffd9e2] border border-[#e5e2dd] transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                >
                  + Refer Form
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Recent Sprint Onboardings Feed (Collapsible / Preview) */}
        {recentLogs.length > 0 && (
          <div className="border-t border-[#e5e2dd]/60 pt-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1c1c19]">
                <span className="material-symbols-outlined text-[16px] text-[#b1005e]">history_toggle_off</span>
                <span>Salons Onboarded This Sprint ({recentLogs.length})</span>
              </div>
              <span className="text-[11px] text-[#594047]">Auto-reconciles with live verification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {recentLogs.slice(0, 3).map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-[#f6f3ee]/80 border border-[#e5e2dd] flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#b1005e] shrink-0 border border-[#e5e2dd]">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#1c1c19] truncate">
                        {log.salonName}
                      </span>
                      <span className="text-[10px] text-[#594047] truncate">
                        {log.locality} • {log.hardware}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#d91b77] shrink-0">
                    +₹{log.bonus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Log Salon Modal */}
      {showQuickAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-[#e5e2dd] relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e2dd]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">add_business</span>
                </div>
                <h3 className="font-bold text-[#1c1c19] text-base">Quick Log Salon Onboarding</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQuickAddModal(false)}
                className="text-[#594047] hover:text-[#1c1c19] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleLogQuickOnboarding} className="flex flex-col gap-3.5 mt-4">
              <div>
                <label className="block text-xs font-bold text-[#1c1c19] mb-1">
                  Salon / Merchant Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Touch Unisex Hair Salon"
                  value={newSalonName}
                  onChange={(e) => setNewSalonName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] text-xs text-[#1c1c19] focus:outline-hidden focus:border-[#d91b77]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1c1c19] mb-1">
                  Locality / Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sector 18, Noida"
                  value={newSalonLocality}
                  onChange={(e) => setNewSalonLocality(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] text-xs text-[#1c1c19] focus:outline-hidden focus:border-[#d91b77]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1c1c19] mb-1">
                  Hardware Deployed
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Soundbox 4G', 'QR Standee', 'Smart POS'] as const).map((hw) => (
                    <button
                      key={hw}
                      type="button"
                      onClick={() => setNewSalonHardware(hw)}
                      className={`p-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer ${
                        newSalonHardware === hw
                          ? 'bg-[#d91b77] text-white shadow-xs'
                          : 'bg-[#f6f3ee] text-[#594047] hover:bg-[#ebe8e3] border border-[#e5e2dd]'
                      }`}
                    >
                      {hw}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuickAddModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#594047] hover:bg-[#f0ede9] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-bold text-white bg-[#d91b77] hover:bg-[#b1005e] shadow-xs cursor-pointer active:scale-95"
                >
                  Log &amp; Update Goal Ring
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
