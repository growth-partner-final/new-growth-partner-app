import React, { useState, useMemo } from 'react';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';
import {
  Bell,
  CheckCircle2,
  Wallet,
  Store,
  Shield,
  ChevronRight,
  Filter,
  Check,
  Settings,
  X,
  CreditCard,
  Target
} from 'lucide-react';

// Mock Notification Data with createdAt dates
const createDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
};

const initialNotifications = [
  { id: 1, type: 'earnings', title: 'Payout Dispatched • ₹4,750 Credited', body: 'Commission payout successfully credited to HDFC Bank.', time: '10:42 AM', unread: true, createdAt: createDate(1) },
  { id: 2, type: 'milestone', title: 'Day 15 Streak Verified!', body: 'Enchante Luxe Hair Studio maintained activity. ₹500 credited.', time: '09:15 AM', unread: true, createdAt: createDate(2) },
  { id: 3, type: 'referral', title: 'New Salon Onboarded', body: 'Vogue Aura Unisex Salon registered.', time: '08:04 AM', unread: true, createdAt: createDate(5) },
  { id: 4, type: 'milestone', title: 'Soundbox Milestone Claim Ready', body: 'Crossed 10 successful transitions.', time: 'Yesterday', unread: true, createdAt: createDate(10) },
  { id: 5, type: 'earnings', title: 'Withdrawal Request Under Review', body: 'Ticket WDR-2025-0874 submitted.', time: 'Yesterday', unread: false, createdAt: createDate(35) },
  { id: 6, type: 'system', title: 'Security Update', body: 'Your password was updated successfully.', time: 'Last Month', unread: false, createdAt: createDate(40) },
];

interface PartnerNotificationsScreenProps {
  onNavigateToHub?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToEarningsLedger?: () => void;
  onNavigateToWithdrawals?: () => void;
  onNavigateBack?: () => void;
}

export const PartnerNotificationsScreen: React.FC<PartnerNotificationsScreenProps> = ({
  onNavigateToHub,
  onNavigateToDashboard,
  onNavigateToEarningsLedger,
  onNavigateToWithdrawals,
  onNavigateBack
}) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'milestones' | 'payouts'>('all');
  const [view, setView] = useState<'active' | 'archived'>('active');

  const { active, archived } = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return {
      active: notifications.filter(n => n.createdAt >= thirtyDaysAgo),
      archived: notifications.filter(n => n.createdAt < thirtyDaysAgo),
    };
  }, [notifications]);

  const currentList = view === 'active' ? active : archived;

  const filteredNotifications = currentList.filter(n => {
    if (filter === 'milestones') return n.type === 'milestone';
    if (filter === 'payouts') return n.type === 'earnings';
    return true;
  });

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#e5e2dd] px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onNavigateBack && (
              <button
                type="button"
                onClick={onNavigateBack}
                className="w-9 h-9 rounded-full bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19] flex items-center justify-center cursor-pointer transition-colors"
                title="Go Back"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
            )}
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#1c1c19] leading-tight">Notifications</span>
              <span className="text-xs text-[#594047]">Partner alerts and updates</span>
            </div>
          </div>

          {onNavigateToHub && (
            <button
              type="button"
              onClick={onNavigateToHub}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#594047] bg-[#f0ede9] hover:bg-[#e5e2dd] hover:text-[#b1005e] border border-[#e5e2dd] transition-all cursor-pointer shadow-xs active:scale-95"
              title="Return to Main Home Landing Page"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </button>
          )}
        </div>
      </header>

      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4">
        <BreadcrumbNavigation
          onNavigateToHub={onNavigateToHub}
          onNavigateToDashboard={onNavigateToDashboard}
          items={[
            { label: 'Notifications', isActive: true, icon: 'notifications' }
          ]}
        />
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1c1c19]">Notifications</h1>
          <div className="flex gap-2">
            <button onClick={markAllAsRead} className="px-4 py-2 rounded-full bg-[#d91b77] text-white text-xs font-bold cursor-pointer hover:bg-[#b1005e] transition-colors">Mark All Read</button>
            <button onClick={clearAll} className="px-4 py-2 rounded-full bg-red-100 text-red-600 text-xs font-bold cursor-pointer hover:bg-red-200 transition-colors">Clear All</button>
          </div>
        </div>

      <div className="flex gap-4 border-b">
        <button onClick={() => setView('active')} className={`pb-2 font-bold text-sm ${view === 'active' ? 'border-b-2 border-primary' : 'text-gray-400'}`}>Active</button>
        <button onClick={() => setView('archived')} className={`pb-2 font-bold text-sm ${view === 'archived' ? 'border-b-2 border-primary' : 'text-gray-400'}`}>Archived ({archived.length})</button>
      </div>

      <div className="flex gap-2">
        {(['all', 'milestones', 'payouts'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-bold ${filter === f ? 'bg-[#1c1c19] text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(n => (
            <div key={n.id} className={`p-4 rounded-xl border ${n.unread ? 'bg-white border-primary' : 'bg-gray-50 border-gray-200'}`}>
              <h3 className="font-bold text-sm">{n.title}</h3>
              <p className="text-xs text-gray-600">{n.body}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-gray-400">{n.time}</span>
                {view === 'archived' && <span className="text-[10px] text-gray-400 font-bold">Archived</span>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">No {view} notifications found.</p>
        )}
      </div>
    </div>
  </div>
);
};
