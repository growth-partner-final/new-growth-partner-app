import React, { useState } from 'react';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';

interface TopPerformersLeaderboardProps {
  onNavigateToAuth?: () => void;
  onNavigateToHub?: () => void;
  onNavigateToWorkspace?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToReferralTimeline?: () => void;
}

type SimState = 'preview' | 'loading' | 'empty' | 'filtered-empty' | 'unranked' | 'error';
type TabPeriod = 'weekly' | 'monthly' | 'alltime';

interface LeaderboardItem {
  rank: number;
  name: string;
  initials: string;
  id: string;
  location: string;
  verified: number;
  qualifying: number;
  trend: string;
  milestone: string;
}

const mockRankings: LeaderboardItem[] = [
  { rank: 4, name: 'Rohit Verma', initials: 'RV', id: 'GP-8821', location: 'Nagpur, MH', verified: 76, qualifying: 72, trend: '▲ +1', milestone: 'Level 3: Branded Laptop' },
  { rank: 5, name: 'Sunita Deshmukh', initials: 'SD', id: 'GP-4402', location: 'Thane, MH', verified: 68, qualifying: 65, trend: '— 0', milestone: 'Level 3: Branded Laptop' },
  { rank: 6, name: 'Deepak Joshi', initials: 'DJ', id: 'GP-9110', location: 'Delhi, DL', verified: 59, qualifying: 54, trend: '▲ +3', milestone: 'Level 2: Samsung Tablet' },
  { rank: 7, name: 'Ananya A.', initials: 'AA', id: 'GP-44199', location: 'Delhi South, DL', verified: 68, qualifying: 65, trend: '▼ -1', milestone: 'Level 2: Samsung Tablet' },
  { rank: 8, name: 'Manish K.', initials: 'MK', id: 'GP-22901', location: 'Thane, MH', verified: 64, qualifying: 60, trend: '▲ +2', milestone: 'Level 2: Samsung Tablet' },
  { rank: 9, name: 'Vijay S.', initials: 'VS', id: 'GP-89211', location: 'Secunderabad, TS', verified: 59, qualifying: 55, trend: '▼ -2', milestone: 'Level 2: Samsung Tablet' },
  { rank: 10, name: 'Deepak L.', initials: 'DL', id: 'GP-73019', location: 'Bengaluru North, KA', verified: 54, qualifying: 50, trend: '— 0', milestone: 'Level 2: Samsung Tablet' },
  { rank: 11, name: 'Shruti M.', initials: 'SM', id: 'GP-66120', location: 'Mumbai City, MH', verified: 49, qualifying: 45, trend: '▲ +1', milestone: 'Level 1: Nexora Kit' },
  { rank: 12, name: 'Naveen G.', initials: 'NG', id: 'GP-18765', location: 'Gurugram, HR', verified: 46, qualifying: 42, trend: '▼ -1', milestone: 'Level 1: Nexora Kit' },
  { rank: 13, name: 'Manish Gupta', initials: 'MG', id: 'GP-3382', location: 'Nashik, MH', verified: 44, qualifying: 40, trend: '— 0', milestone: 'Level 1: Nexora Kit' },
  { rank: 15, name: 'Alok Patel', initials: 'AP', id: 'GP-1093', location: 'Ahmedabad, GJ', verified: 39, qualifying: 35, trend: '▼ -2', milestone: 'Level 1: Nexora Kit' }
];

export const TopPerformersLeaderboard: React.FC<TopPerformersLeaderboardProps> = ({
  onNavigateToAuth,
  onNavigateToHub,
  onNavigateToWorkspace,
  onNavigateToSalonIntelligence,
  onNavigateToReferralTimeline
}) => {
  const [simulationState, setSimulationState] = useState<SimState>('preview');
  const [activeTab, setActiveTab] = useState<TabPeriod>('monthly');

  // Filter form states
  const [filterState, setFilterState] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [filterMetric, setFilterMetric] = useState('verified');
  const [filterSearch, setFilterSearch] = useState('');

  const triggerFilterSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = filterSearch.trim().toLowerCase();
    if (query === 'none' || query === 'empty') {
      setSimulationState('filtered-empty');
    } else {
      setSimulationState('preview');
    }
  };

  const resetFilters = () => {
    setFilterState('all');
    setFilterDistrict('all');
    setFilterCity('all');
    setFilterSearch('');
    setSimulationState('preview');
  };

  const filteredRankings = mockRankings.filter(item => {
    if (!filterSearch) return true;
    const query = filterSearch.toLowerCase();
    return item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query);
  });

  return (
    <div className="flex-1 flex flex-col bg-[#fcf9f4] min-h-screen text-slate-800 antialiased">
      {/* Dynamic CSS Styles */}
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 10px 30px -5px rgba(80, 0, 40, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02);
        }
        .glass-card-user {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 242, 248, 0.85) 100%);
          border: 1px solid rgba(217, 27, 119, 0.22);
          backdrop-filter: blur(16px);
        }
        .shimmer-bg {
          background: linear-gradient(90deg, #f0ede6 25%, #faf8f5 50%, #f0ede6 75%);
          background-size: 200% 100%;
          animation: shimmer-anim 1.6s infinite;
        }
        @keyframes shimmer-anim {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ======================================================== */}
      {/* STATE SWITCHER BAR (SHARED ACROSS VIEWPORTS)              */}
      {/* ======================================================== */}
      <aside className="bg-slate-900 text-slate-200 px-4 py-2 text-xs border-b border-slate-800 sticky top-0 z-50" data-purpose="prototype-state-bar">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400 shrink-0">State:</span>
            <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar py-0.5">
              <button
                onClick={() => setSimulationState('preview')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  simulationState === 'preview' ? 'bg-[#d91b77] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Preview Data
              </button>
              <button
                onClick={() => setSimulationState('loading')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  simulationState === 'loading' ? 'bg-[#d91b77] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Skeleton
              </button>
              <button
                onClick={() => setSimulationState('empty')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  simulationState === 'empty' ? 'bg-[#d91b77] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Empty
              </button>
              <button
                onClick={() => setSimulationState('unranked')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  simulationState === 'unranked' ? 'bg-[#d91b77] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Not Ranked
              </button>
              <button
                onClick={() => setSimulationState('error')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  simulationState === 'error' ? 'bg-[#d91b77] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Error
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* VIEWPORT 1: MOBILE VIEWPORT (max-w-[420px], block md:hidden) */}
      {/* ======================================================== */}
      <div className="w-full max-w-[420px] mx-auto bg-[#fcf9f4] flex flex-col pb-24 relative md:hidden min-h-screen shadow-sm">
        <header className="sticky top-[37px] z-30 bg-[#fcf9f4]/95 backdrop-blur-md px-4 py-3 border-b border-slate-200/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateToHub}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-left"
            title="Return to Main Home Page"
          >
            <div className="w-8 h-8 rounded-lg bg-[#d91b77] flex items-center justify-center text-white shadow-sm font-black text-sm">
              ▲
            </div>
            <div>
              <span className="block font-black tracking-tight text-xs text-slate-900 leading-none">NEXORA</span>
              <span className="text-[9px] font-semibold tracking-wider text-[#d91b77] uppercase leading-tight">Growth Partner</span>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onNavigateToHub}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-[#594047] bg-white hover:bg-slate-100 hover:text-[#b1005e] border border-slate-200 transition-colors shadow-2xs"
              title="Return to Main Home Page"
            >
              <svg className="w-3.5 h-3.5 text-[#b1005e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Home</span>
            </button>
            <button aria-label="Notifications" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-pink-900 text-white font-bold text-xs flex items-center justify-center border border-pink-950 shadow-sm">
              GP
            </div>
          </div>
        </header>

        <main className="px-3.5 pt-3.5 space-y-4">
          <BreadcrumbNavigation
            onNavigateToHub={onNavigateToHub}
            onNavigateToDashboard={onNavigateToWorkspace}
            items={[
              { label: 'Leaderboard', isActive: true, icon: 'leaderboard' }
            ]}
          />
          <section className="space-y-1.5" data-purpose="page-intro">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Top Performers</h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 tracking-wide">
                PREVIEW DATA
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Verified salon performance ke basis par partner rankings.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              <span>Updated Today 06:00 AM</span>
            </div>
          </section>

          {/* Period Controls */}
          <section data-purpose="period-selector">
            <div className="bg-slate-200/80 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('weekly')}
                className={`flex-1 min-h-[44px] py-2 rounded-lg transition-all text-center ${
                  activeTab === 'weekly' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setActiveTab('monthly')}
                className={`flex-1 min-h-[44px] py-2 rounded-lg transition-all text-center ${
                  activeTab === 'monthly' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActiveTab('alltime')}
                className={`flex-1 min-h-[44px] py-2 rounded-lg transition-all text-center ${
                  activeTab === 'alltime' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
                }`}
              >
                All Time
              </button>
            </div>
          </section>

          {/* Search And Filter */}
          <section className="space-y-2" data-purpose="filter-search-container">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </span>
              <input
                value={filterSearch}
                onChange={(e) => {
                  setFilterSearch(e.target.value);
                  const query = e.target.value.trim().toLowerCase();
                  if (query === 'none' || query === 'empty') {
                    setSimulationState('filtered-empty');
                  } else if (simulationState === 'filtered-empty') {
                    setSimulationState('preview');
                  }
                }}
                className="w-full min-h-[44px] bg-white border border-slate-200 rounded-xl pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-[#d91b77] transition-all shadow-xs"
                placeholder="Search Partner Name or ID..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-0.5">
              <button className="min-h-[36px] px-3 rounded-full bg-slate-900 text-white text-[11px] font-semibold shrink-0">
                All Regions
              </button>
              <button className="min-h-[36px] px-3 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-medium shrink-0 flex items-center gap-1">
                <span>Maharashtra</span>
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </button>
              <button className="min-h-[36px] px-3 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-medium shrink-0 flex items-center gap-1">
                <span>Delhi NCR</span>
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </button>
              <button className="min-h-[36px] px-3 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-medium shrink-0">
                Karnataka
              </button>
            </div>
          </section>

          {/* VIEW PREVIEW */}
          {simulationState === 'preview' && (
            <div className="space-y-4">
              {/* YourPositionCard */}
              <section className="bg-gradient-to-r from-pink-50 via-white to-pink-50 border border-[#d91b77]/20 rounded-2xl p-3.5 shadow-sm relative overflow-hidden" data-purpose="current-user-card">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#d91b77]/5 pointer-events-none"></div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-xl bg-[#d91b77] text-white flex flex-col items-center justify-center shadow-sm shrink-0">
                      <span className="text-[9px] font-medium leading-none uppercase">Rank</span>
                      <span className="text-base font-extrabold leading-none mt-0.5">#14</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-bold text-slate-900">You (GP-PARTNER)</h2>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#d91b77]/10 text-[#d91b77] uppercase">Your Rank</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Milestone: Level 2 Associate</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/70">
                  <div className="bg-white/80 rounded-lg p-2 border border-slate-100">
                    <span className="text-[10px] text-slate-500 block font-medium">Verified Shops</span>
                    <span className="text-sm font-black text-slate-800">42</span>
                  </div>
                  <div className="bg-white/80 rounded-lg p-2 border border-slate-100">
                    <span className="text-[10px] text-slate-500 block font-medium">Qualifying Shops</span>
                    <span className="text-sm font-black text-slate-800">38</span>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] bg-pink-50 text-pink-900 px-2.5 py-1.5 rounded-lg font-medium border border-pink-200/40">
                  <span>🚀 <strong>2 shops</strong> to reach Rank #13</span>
                  <button onClick={onNavigateToHub} className="text-[10px] underline font-bold">Details →</button>
                </div>
              </section>

              {/* PodiumTrio */}
              <section className="space-y-2" data-purpose="leaderboard-podium">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">Top 3 Champions</h2>
                  <span className="text-[10px] font-medium text-slate-500">Tier Recognition</span>
                </div>
                <div className="bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 rounded-2xl p-3.5 shadow-sm relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 uppercase tracking-wider">
                    <span>👑 Rank 1</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-800 font-extrabold text-sm shrink-0">
                        VK
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900">Vikram K.</h3>
                        <p className="text-[11px] text-slate-500">Pune • MH</p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-200">
                          Grand Tier (128 Shops)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900">118 Qualifying</div>
                      <div className="text-[10px] text-slate-500">128 Verified</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center border border-slate-300">2</span>
                        <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Silver</span>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate">Aarav Sharma</h4>
                        <p className="text-[10px] text-slate-500 truncate">Mumbai • MH</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 text-[11px]">
                      <span className="font-extrabold text-slate-900">96</span> <span className="text-[10px] text-slate-500">Qualifying</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center border border-amber-300">3</span>
                        <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">Bronze</span>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate">Pooja Nair</h4>
                        <p className="text-[10px] text-slate-500 truncate">Bangalore • KA</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 text-[11px]">
                      <span className="font-extrabold text-slate-900">84</span> <span className="text-[10px] text-slate-500">Qualifying</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* LeaderboardList */}
              <section className="space-y-2 font-sans" data-purpose="leaderboard-cards">
                <div className="flex items-center justify-between px-1 pt-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">Leaderboard Rankings</h2>
                  <span className="text-[10px] text-slate-500">Dynamic Standings</span>
                </div>

                {filteredRankings.map((item) => (
                  <div key={item.rank} className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {item.rank}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{item.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{item.location} • ID: {item.id}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-slate-900">{item.verified}</span>
                      <span className="block text-[9px] text-slate-500">{item.qualifying} Qual.</span>
                    </div>
                  </div>
                ))}

                <div className="bg-pink-50 rounded-xl p-3 border-2 border-[#d91b77] shadow-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-[#d91b77] text-white font-black text-xs flex items-center justify-center shrink-0">14</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-slate-900 truncate">You</span>
                        <span className="px-1 py-0.2 rounded bg-[#d91b77] text-white text-[8px] font-extrabold uppercase tracking-tight">GP-PARTNER</span>
                      </div>
                      <div className="text-[10px] text-pink-800 font-semibold truncate">Level 2 Associate</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-[#d91b77]">42</span>
                    <span className="block text-[9px] text-slate-600 font-medium">38 Qual.</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* STATE 2: SKELETON */}
          {simulationState === 'loading' && (
            <div className="space-y-4 animate-pulse">
              <div className="h-28 bg-slate-200 rounded-2xl"></div>
              <div className="h-36 bg-slate-200 rounded-2xl"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-24 bg-slate-200 rounded-xl"></div>
                <div className="h-24 bg-slate-200 rounded-xl"></div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-14 bg-slate-200 rounded-xl"></div>
                <div className="h-14 bg-slate-200 rounded-xl"></div>
                <div className="h-14 bg-slate-200 rounded-xl"></div>
              </div>
            </div>
          )}

          {/* STATE 3: EMPTY */}
          {simulationState === 'empty' && (
            <div className="py-8 px-4 text-center bg-white rounded-2xl border border-slate-200 my-4 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900">No Performer Data Found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Selected filter ke liye koi partner ranking record nahi mila. Filters reset karein ya period badlein.</p>
              <button className="min-h-[44px] px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors" onClick={resetFilters}>
                Reset Filter Options
              </button>
            </div>
          )}

          {/* STATE: FILTERED EMPTY */}
          {simulationState === 'filtered-empty' && (
            <div className="py-8 px-4 text-center bg-white rounded-2xl border border-slate-200 my-4 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900">No Search Results Found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Selected filter matching records are absent.</p>
              <button className="min-h-[44px] px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors" onClick={resetFilters}>
                Clear Search Query
              </button>
            </div>
          )}

          {/* STATE 4: ERROR */}
          {simulationState === 'error' && (
            <div className="py-8 px-4 text-center bg-white rounded-2xl border border-rose-200 my-4 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Connection Interrupted</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Rankings update retrieve karte waqt issue hua hai. Kripya connection check karke dubara try karein.</p>
              <button className="min-h-[44px] w-full max-w-xs mx-auto px-4 py-2.5 bg-[#d91b77] text-white rounded-xl text-xs font-bold shadow-md hover:bg-pink-700 transition-colors flex items-center justify-center gap-2" onClick={() => setSimulationState('preview')}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                Retry Connection
              </button>
            </div>
          )}

          {/* STATE 5: NOT RANKED */}
          {simulationState === 'unranked' && (
            <div className="space-y-4">
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-lg font-black">
                  #--
                </div>
                <h3 className="text-sm font-bold text-amber-950">You Are Not Yet Ranked</h3>
                <p className="text-xs text-amber-800 leading-relaxed max-w-xs mx-auto">
                  Official monthly leaderboard me qualify hone ke liye minimum <strong>5 verified salon shops</strong> onboard karein.
                </p>
                <div className="pt-2">
                  <button onClick={onNavigateToSalonIntelligence} className="min-h-[44px] w-full py-2.5 px-4 bg-[#d91b77] text-white text-xs font-bold rounded-xl shadow-xs">
                    + Onboard New Shop Now
                  </button>
                </div>
              </div>
              <div className="opacity-60 pointer-events-none">
                <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">1</span>
                    <span className="text-xs font-bold">Vikram K.</span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900">128 Verified</span>
                </div>
              </div>
            </div>
          )}

          {/* Compliance Notice */}
          <section className="pt-2" data-purpose="compliance-disclaimer">
            <div className="bg-slate-100/90 rounded-xl p-3 border border-slate-200/80 flex items-start gap-2.5">
              <svg className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              <div className="space-y-0.5 text-[10px] text-slate-500 leading-tight">
                <p className="font-bold text-slate-700">Nexora Ranking Governance:</p>
                <p>Leaderboard calculations are automated based on active, KYC-verified salon onboarding events. Ranks refresh daily at 06:00 AM IST. Disputed or fraudulent entries are subject to immediate disqualification.</p>
              </div>
            </div>
          </section>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 z-40 shadow-sticky flex items-center justify-around" data-purpose="mobile-bottom-nav">
          <button
            type="button"
            onClick={onNavigateToHub}
            className="flex flex-col items-center justify-center min-h-[44px] py-1 text-slate-500 hover:text-[#b1005e] transition-colors cursor-pointer"
            title="Return to Main Home Landing Page"
          >
            <svg className="w-5 h-5 text-[#b1005e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
            <span className="text-[9px] font-bold tracking-tight mt-0.5 text-[#b1005e]">Home</span>
          </button>
          <button onClick={onNavigateToWorkspace} className="flex flex-col items-center justify-center min-h-[44px] py-1 text-slate-500 hover:text-slate-850 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
            </svg>
            <span className="text-[9px] font-medium tracking-tight mt-0.5">Dashboard</span>
          </button>
          <button onClick={onNavigateToReferralTimeline} className="flex flex-col items-center justify-center min-h-[44px] py-1 text-slate-500 hover:text-slate-850 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
            </svg>
            <span className="text-[9px] font-medium tracking-tight mt-0.5">Referrals</span>
          </button>
          <button onClick={onNavigateToHub} className="flex flex-col items-center justify-center min-h-[44px] py-1 text-slate-500 hover:text-slate-850 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
            </svg>
            <span className="text-[9px] font-medium tracking-tight mt-0.5">Rewards</span>
          </button>
          <button className="flex flex-col items-center justify-center min-h-[44px] py-1 text-[#d91b77] transition-colors">
            <div className="relative">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" fillRule="evenodd"></path>
              </svg>
              <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white"></span>
            </div>
            <span className="text-[9px] font-bold tracking-tight mt-0.5 text-[#d91b77]">Performers</span>
          </button>
          <button onClick={onNavigateToWorkspace} className="flex flex-col items-center justify-center min-h-[44px] py-1 text-slate-500 hover:text-slate-850 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
            </svg>
            <span className="text-[9px] font-medium tracking-tight mt-0.5">Profile</span>
          </button>
        </nav>
      </div>

      {/* ======================================================== */}
      {/* VIEWPORT 2: DESKTOP VIEWPORT (hidden md:flex)            */}
      {/* ======================================================== */}
      <div className="flex-1 hidden md:flex w-full max-w-[1536px] mx-auto min-h-screen">
        <aside className="w-64 shrink-0 bg-[#fcf9f4] border-r border-[#ece8df] p-5 flex flex-col justify-between" data-purpose="partner-sidebar">
          <div>
            <button
              type="button"
              onClick={onNavigateToHub}
              className="flex items-center space-x-3 px-1 py-2 mb-6 cursor-pointer bg-transparent border-0 text-left w-full hover:opacity-90 transition-opacity"
              title="Return to Main Home Landing Page"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d91b77] to-[#500028] flex items-center justify-center text-white font-black text-xl shadow-md">
                ▲
              </div>
              <div>
                <span className="block text-base font-extrabold tracking-tight text-neutral-900 leading-none">NEXORA</span>
                <span className="text-[10px] tracking-wider uppercase font-bold text-[#d91b77]">Growth Partner</span>
              </div>
            </button>

            <div className="glass-card-user p-3.5 rounded-xl mb-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-[#500028] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  GP
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-neutral-900 truncate">Growth Partner</div>
                  <div className="text-[11px] font-mono text-neutral-500 truncate">ID: GP-PARTNER</div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    VERIFIED PARTNER
                  </div>
                </div>
              </div>
            </div>

            <nav className="space-y-1 text-sm font-medium">
              <button
                type="button"
                onClick={onNavigateToHub}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#b1005e] bg-[#ffd9e2]/50 hover:bg-[#ffd9e2] font-bold border border-[#fda4c9]/60 transition text-left cursor-pointer mb-1"
                title="Return to Main Home Page"
              >
                <svg className="w-4 h-4 text-[#b1005e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Home (Landing Page)</span>
              </button>
              <button onClick={onNavigateToWorkspace} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition text-left">
                <span>Dashboard</span>
              </button>
              <button onClick={onNavigateToReferralTimeline} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition text-left">
                <span>My Referral Code</span>
              </button>
              <button onClick={onNavigateToSalonIntelligence} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition text-left">
                <span>Referred Salons</span>
              </button>
              <button onClick={onNavigateToHub} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition text-left">
                <span>Rewards</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#d91b77] text-white font-semibold transition text-left shadow-md">
                <span>Top Performers</span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-[#ece8df] space-y-2">
            <button onClick={onNavigateToAuth} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50 transition text-left">
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-6xl">
          <div className="mb-4">
            <BreadcrumbNavigation
              onNavigateToHub={onNavigateToHub}
              onNavigateToDashboard={onNavigateToWorkspace}
              items={[
                { label: 'Top Performers Leaderboard', isActive: true, icon: 'leaderboard' }
              ]}
            />
          </div>
          <section className="mb-6" data-purpose="page-header">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d91b77] mb-1">
                  <span>Partner Growth Ecosystem</span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-neutral-650 font-bold">Performance Leaderboard</span>
                </div>
                <h1 className="text-3xl font-extrabold text-[#2a0416] tracking-tight">Top Performers</h1>
                <p className="text-neutral-600 text-sm mt-1">Verified salon performance ke basis par partner rankings.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  type="button"
                  onClick={onNavigateToHub}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#594047] bg-[#f0ede9] hover:bg-[#e5e2dd] hover:text-[#b1005e] border border-[#e5e2dd] transition-all cursor-pointer shadow-xs"
                  title="Return to Main Home Landing Page"
                >
                  <svg className="w-4 h-4 text-[#b1005e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span>Home</span>
                </button>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-sm">
                  PREVIEW DATA — Demo
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-b border-[#e7e3da] pb-3">
              <div className="inline-flex bg-neutral-200/70 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('weekly')}
                  className={`px-5 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'weekly' ? 'bg-white text-[#d91b77] shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setActiveTab('monthly')}
                  className={`px-5 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'monthly' ? 'bg-white text-[#d91b77] shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Monthly (Active)
                </button>
                <button
                  onClick={() => setActiveTab('alltime')}
                  className={`px-5 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'alltime' ? 'bg-white text-[#d91b77] shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>
          </section>

          {/* Interactive Filter Bar */}
          <section className="glass-panel p-4 rounded-2xl mb-6 shadow-sm">
            <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3" onSubmit={triggerFilterSearch}>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">State</label>
                <select value={filterState} onChange={(e) => setFilterState(e.target.value)} className="w-full text-xs rounded-lg border-neutral-300 py-2 bg-white">
                  <option value="all">All States</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="maharashtra">Maharashtra</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">District</label>
                <select value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)} className="w-full text-xs rounded-lg border-neutral-300 py-2 bg-white">
                  <option value="all">All Districts</option>
                  <option value="bengaluru">Bengaluru Urban</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Metric</label>
                <select value={filterMetric} onChange={(e) => setFilterMetric(e.target.value)} className="w-full text-xs rounded-lg border-neutral-300 py-2 bg-white">
                  <option value="verified">Verified Shops</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Search Partner</label>
                <input
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  className="w-full text-xs rounded-lg border-neutral-300 py-2 pl-3 bg-white"
                  placeholder="Search partner name..."
                  type="text"
                />
              </div>
              <div className="flex items-end gap-2">
                <button type="submit" className="w-full bg-[#500028] hover:bg-[#38011d] text-white text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition">Apply</button>
                <button type="button" onClick={resetFilters} className="w-full bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-300 text-xs font-semibold py-2 px-3 rounded-lg transition">Reset</button>
              </div>
            </form>
          </section>

          {/* DYNAMIC VIEWS */}
          {simulationState === 'preview' && (
            <div className="space-y-6">
              {/* standing card */}
              <section className="relative overflow-hidden rounded-2xl border border-[#d91b77]/30 bg-gradient-to-r from-white via-[#fff5f9] to-[#fef2f2] p-5 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d91b77] to-[#500028] text-white flex flex-col items-center justify-center font-extrabold shadow-md">
                      <span className="text-[11px] font-bold text-pink-200 uppercase tracking-tighter">Your Rank</span>
                      <span className="text-2xl font-black leading-tight">#14</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-neutral-900">Your Standing (Growth Partner)</h2>
                      <div className="text-xs text-neutral-500 font-medium mt-0.5 flex flex-wrap gap-2 items-center">
                        <span>Partner ID: <strong>GP-PARTNER</strong></span>
                        <span>•</span>
                        <span>Tier: Level 2 Associate</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-white/90 border border-neutral-200/80 p-3 rounded-xl shadow-xs">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Verified Shops</div>
                      <div className="text-xl font-extrabold text-neutral-900">42 Shops</div>
                    </div>
                    <div className="bg-white/90 border border-neutral-200/80 p-3 rounded-xl shadow-xs">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#d91b77]">Qualifying Shops</div>
                      <div className="text-xl font-extrabold text-[#d91b77]">38 Shops</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Podium Section */}
              <section className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                  {/* Rank 2 */}
                  <div className="glass-panel p-5 rounded-2xl border-t-4 border-slate-400 text-center relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-800 text-[11px] font-black uppercase px-3 py-0.5 rounded-full border border-slate-300 shadow-sm">
                      🥈 Rank 2
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 mt-3">Aarav Sharma</h3>
                    <p className="text-xs text-neutral-500 font-mono">GP-71204</p>
                    <div className="mt-4 pt-4 border-t border-neutral-200/60 grid grid-cols-2 gap-2 text-left">
                      <div className="bg-white/60 p-2 rounded-lg">
                        <div className="text-[10px] uppercase font-bold text-neutral-450">Verified</div>
                        <div className="text-sm font-extrabold text-neutral-900">96 Shops</div>
                      </div>
                    </div>
                  </div>

                  {/* Rank 1 */}
                  <div className="bg-gradient-to-b from-amber-50/90 via-white to-amber-50/40 p-6 rounded-2xl border-2 border-amber-300 shadow-lg text-center relative">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-black uppercase px-4 py-1 rounded-full shadow-md">
                      👑 Rank 1 Champion
                    </div>
                    <h3 className="text-lg font-black text-neutral-900 mt-3">Vikram K.</h3>
                    <p className="text-xs text-neutral-500 font-mono">GP-88421</p>
                    <div className="mt-4 pt-4 border-t border-amber-100 grid grid-cols-2 gap-2 text-left">
                      <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                        <div className="text-[10px] uppercase font-bold text-neutral-450">Verified</div>
                        <div className="text-base font-black text-neutral-900">128 Shops</div>
                      </div>
                    </div>
                  </div>

                  {/* Rank 3 */}
                  <div className="glass-panel p-5 rounded-2xl border-t-4 border-amber-600 text-center relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[11px] font-black uppercase px-3 py-0.5 rounded-full shadow-sm">
                      🥉 Rank 3
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 mt-3">Pooja Nair</h3>
                    <p className="text-xs text-neutral-500 font-mono">GP-63910</p>
                    <div className="mt-4 pt-4 border-t border-neutral-200/60 grid grid-cols-2 gap-2 text-left">
                      <div className="bg-white/60 p-2 rounded-lg">
                        <div className="text-[10px] uppercase font-bold text-neutral-450">Verified</div>
                        <div className="text-sm font-extrabold text-neutral-900">84 Shops</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Complete Leaderboard Table */}
              <section className="glass-panel rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 sm:p-5 border-b border-neutral-200/80 flex items-center justify-between">
                  <h2 className="text-base font-bold text-neutral-900">District Standings</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-100/70 text-neutral-500 uppercase font-bold text-[10px] border-b border-neutral-200">
                        <th className="py-3.5 px-4 text-center">Rank</th>
                        <th className="py-3.5 px-4">Partner</th>
                        <th className="py-3.5 px-4">Location</th>
                        <th className="py-3.5 px-4 text-center">Verified Shops</th>
                        <th className="py-3.5 px-4 text-center">Qualifying Shops</th>
                        <th className="py-3.5 px-4">Milestone Achieved</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200/70">
                      {filteredRankings.map((item) => (
                        <tr key={item.rank} className="hover:bg-white/80 transition">
                          <td className="py-3.5 px-4 text-center font-bold">#{item.rank}</td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-neutral-900">{item.name}</div>
                            <div className="text-[10px] text-neutral-400 font-mono">{item.id}</div>
                          </td>
                          <td className="py-3.5 px-4">{item.location}</td>
                          <td className="py-3.5 px-4 text-center font-bold">{item.verified}</td>
                          <td className="py-3.5 px-4 text-center font-bold text-[#d91b77]">{item.qualifying}</td>
                          <td className="py-3.5 px-4 text-neutral-500">{item.milestone}</td>
                        </tr>
                      ))}
                      {/* Current User Row */}
                      <tr className="bg-pink-50 border-y-2 border-[#d91b77] font-semibold">
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#d91b77] text-white font-extrabold text-xs shadow-sm">#14</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-black text-neutral-900">You (GP-PARTNER)</div>
                          <div className="text-[11px] text-[#500028] font-mono">Current Partner</div>
                        </td>
                        <td className="py-4 px-4 text-[#500028] font-bold">Bengaluru Urban, KA</td>
                        <td className="py-4 px-4 text-center font-extrabold text-neutral-900">42</td>
                        <td className="py-4 px-4 text-center font-extrabold text-[#d91b77]">38</td>
                        <td className="py-4 px-4 text-pink-900">Level 2: Associate (Active)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {/* STATE: SKELETON */}
          {simulationState === 'loading' && (
            <div className="space-y-6">
              <div className="glass-panel p-5 rounded-2xl flex items-center justify-between animate-pulse">
                <div className="w-48 h-4 bg-slate-200 rounded"></div>
                <div className="w-24 h-12 bg-slate-200 rounded-xl"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-6">
                <div className="h-32 bg-slate-200 rounded-2xl animate-pulse"></div>
                <div className="h-40 bg-slate-200 rounded-2xl animate-pulse"></div>
                <div className="h-32 bg-slate-200 rounded-2xl animate-pulse"></div>
              </div>
            </div>
          )}

          {/* STATE: EMPTY */}
          {simulationState === 'empty' && (
            <div className="glass-panel rounded-2xl p-12 text-center">
              <h2 className="text-xl font-bold text-neutral-900">No Ranking Data Available Yet</h2>
              <p className="text-neutral-550 text-sm max-w-md mx-auto mt-2">Leaderboard rankings will recalculate automatically soon.</p>
            </div>
          )}

          {/* STATE: FILTERED EMPTY */}
          {simulationState === 'filtered-empty' && (
            <div className="glass-panel rounded-2xl p-12 text-center">
              <h2 className="text-lg font-bold text-neutral-900">No Partners Found Matching Criteria</h2>
              <button onClick={resetFilters} className="mt-4 px-4 py-2 rounded-lg bg-[#500028] text-white text-xs font-bold transition">Reset Filters</button>
            </div>
          )}

          {/* STATE: UNRANKED */}
          {simulationState === 'unranked' && (
            <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/70 p-6 text-center">
              <h2 className="text-base font-extrabold text-amber-950">You are not currently ranked</h2>
              <p className="text-xs text-amber-800 mt-1">Onboard at least 1 salon completing the onboarding window to appear.</p>
            </div>
          )}

          {/* STATE: ERROR */}
          {simulationState === 'error' && (
            <div className="glass-panel rounded-2xl p-10 border-rose-200 bg-rose-50/50 text-center">
              <h2 className="text-lg font-bold text-rose-950">Unable to Reach Ranking Service</h2>
              <button onClick={() => setSimulationState('preview')} className="mt-4 px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-bold shadow-sm transition">Retry Connection</button>
            </div>
          )}

          <footer className="mt-8 pt-5 border-t border-neutral-200/80 text-[11px] text-neutral-400 space-y-1">
            <p><strong>Statutory Program Disclaimer:</strong> All rankings reflect verified shop onboarding cycles.Masked personal data is strictly withheld from the public leaderboard.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};
