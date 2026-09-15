import React, { useState, useEffect, useRef } from 'react';

export interface PartnerNotification {
  id: string;
  type: 'payout' | 'salon_status' | 'milestone';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority?: 'urgent' | 'high' | 'normal';
  amount?: string;
  salonName?: string;
  ownerName?: string;
  badgeText?: string;
  actionType?: 'whatsapp' | 'view_receipt' | 'track_delivery' | 'view_salon';
  actionLabel?: string;
  metadata?: {
    trackingNumber?: string;
    accountMasked?: string;
    stage?: string;
    reason?: string;
    txnId?: string;
  };
}

const INITIAL_NOTIFICATIONS: PartnerNotification[] = [
  {
    id: 'notif-1',
    type: 'payout',
    title: '₹1,500 Milestone Bonus Released',
    message: 'Glow & Grace Unisex Salon completed all 30-day onboarding milestones (182 UPI transactions cleared). Credited to linked HDFC Bank A/C.',
    timestamp: '10 min ago',
    isRead: false,
    priority: 'high',
    amount: '₹1,500',
    salonName: 'Glow & Grace Unisex Salon',
    badgeText: 'Milestone Paid',
    actionType: 'view_receipt',
    actionLabel: 'View Receipt',
    metadata: {
      accountMasked: 'HDFC •••• 4019',
      stage: 'Stage 5: 100% Qualified',
      txnId: 'TXN-NEX-98124-HDFC'
    }
  },
  {
    id: 'notif-2',
    type: 'salon_status',
    title: 'Action Required: KYC Onboarding Paused',
    message: 'Velvet Touch Lounge application flagged: Electricity bill name mismatch with PAN card. Send one-click WhatsApp re-upload link to owner Sunita Kadam.',
    timestamp: '35 min ago',
    isRead: false,
    priority: 'urgent',
    salonName: 'Velvet Touch Lounge',
    ownerName: 'Sunita Kadam',
    badgeText: 'Action Required',
    actionType: 'whatsapp',
    actionLabel: 'Send WhatsApp Link',
    metadata: {
      reason: 'Electricity bill name mismatch with PAN card'
    }
  },
  {
    id: 'notif-3',
    type: 'payout',
    title: '₹2,500 Voice Soundbox Activation Incentive',
    message: 'Aura Luxury Hair Lounge completed initial terminal setup and verified 5 customer UPI transactions. Direct hardware incentive credited.',
    timestamp: '2 hours ago',
    isRead: false,
    priority: 'normal',
    amount: '₹2,500',
    salonName: 'Aura Luxury Hair Lounge',
    badgeText: 'Activation Credited',
    actionType: 'view_receipt',
    actionLabel: 'View Ledger',
    metadata: {
      accountMasked: 'HDFC •••• 4019',
      txnId: 'TXN-REF-5A450-HW25'
    }
  },
  {
    id: 'notif-4',
    type: 'salon_status',
    title: 'Hardware Dispatched: 4G Voice Soundbox',
    message: 'Terminal kit for Royal Looks Salon (Connaught Place, Delhi) dispatched via BlueDart Express. Out for delivery scheduled tomorrow.',
    timestamp: '3 hours ago',
    isRead: false,
    priority: 'normal',
    salonName: 'Royal Looks Salon',
    badgeText: 'Dispatched',
    actionType: 'track_delivery',
    actionLabel: 'Track BlueDart Courier',
    metadata: {
      trackingNumber: 'BLR-89210-NX'
    }
  },
  {
    id: 'notif-5',
    type: 'salon_status',
    title: 'DigiLocker KYC Approved & Verified',
    message: 'Elegance Studio & Spa (Priya Nair, Indiranagar) passed automated Aadhaar KYC verification. Live on NPCI UPI switch with 44 transactions.',
    timestamp: '6 hours ago',
    isRead: true,
    priority: 'normal',
    salonName: 'Elegance Studio & Spa',
    badgeText: 'KYC Verified',
    metadata: {
      stage: 'Stage 4: Active & Live'
    }
  },
  {
    id: 'notif-6',
    type: 'payout',
    title: '₹14,280 Monthly Volume Share Processed',
    message: 'August 2026 merchant volume commission split for your fleet of 18 salons. Total merchant UPI GMV: ₹51.0 Lakhs at 0.28% share.',
    timestamp: '1 day ago',
    isRead: true,
    priority: 'normal',
    amount: '₹14,280',
    badgeText: 'Volume Retainer',
    actionType: 'view_receipt',
    actionLabel: 'View Tax Invoice',
    metadata: {
      accountMasked: 'HDFC •••• 4019',
      txnId: 'TXN-VOL-AUG-2026'
    }
  },
  {
    id: 'notif-7',
    type: 'salon_status',
    title: 'New Referral Registered via Partner Link',
    message: 'Glamour Point Unisex Salon (Koramangala, Bengaluru) submitted application via your referral link REF-5A45019655. Initial document triage in progress.',
    timestamp: '2 days ago',
    isRead: true,
    priority: 'normal',
    salonName: 'Glamour Point Unisex Salon',
    badgeText: 'New Referral',
    metadata: {
      stage: 'Stage 1: Document Triage'
    }
  },
  {
    id: 'notif-8',
    type: 'payout',
    title: '₹500 Large Fleet Scale Incentive',
    message: 'Royal Looks Salon expansion verified to 12 styling chairs. Additional capacity escalation bonus unlocked.',
    timestamp: '3 days ago',
    isRead: true,
    priority: 'normal',
    amount: '₹500',
    badgeText: 'Scale Bonus',
    metadata: {
      accountMasked: 'HDFC •••• 4019',
      txnId: 'TXN-SCALE-ROYAL'
    }
  }
];

const SIMULATED_ALERTS = [
  {
    type: 'payout' as const,
    title: '₹3,000 SmartPOS Commission Credited',
    message: 'Urban Men Grooming Bar (Bandra) activated Android SmartPOS terminal. Instant bonus released to your account.',
    amount: '₹3,000',
    salonName: 'Urban Men Grooming Bar',
    badgeText: 'POS Incentive',
    priority: 'high' as const,
    actionType: 'view_receipt' as const,
    actionLabel: 'View Receipt',
    metadata: { accountMasked: 'HDFC •••• 4019', txnId: 'TXN-POS-URB99' }
  },
  {
    type: 'salon_status' as const,
    title: 'Application Approved: Blossom Nail Spa',
    message: 'DigiLocker KYC cleared and QR standee dispatched via DTDC Express. Terminal will arrive within 24h.',
    salonName: 'Blossom Nail Spa',
    badgeText: 'KYC Approved',
    priority: 'normal' as const,
    actionType: 'track_delivery' as const,
    actionLabel: 'Track Delivery',
    metadata: { trackingNumber: 'DTDC-48921-MUM' }
  },
  {
    type: 'payout' as const,
    title: '₹1,500 Milestone Achieved: Elegance Studio',
    message: 'Target 50 transactions achieved by Day 12! Full 100% milestone incentive unlocked.',
    amount: '₹1,500',
    salonName: 'Elegance Studio & Spa',
    badgeText: 'Milestone Cleared',
    priority: 'high' as const,
    actionType: 'view_receipt' as const,
    actionLabel: 'View Receipt',
    metadata: { accountMasked: 'HDFC •••• 4019', txnId: 'TXN-ELEG-50TX' }
  }
];

interface NotificationBellProps {
  align?: 'left' | 'right';
  className?: string;
  onNavigateToReferrals?: () => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  align = 'right',
  className = '',
  onNavigateToReferrals
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<PartnerNotification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'payouts' | 'salons' | 'unread'>('all');
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'info' } | null>(null);
  const [modalDetails, setModalDetails] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [hasNewAlertAnimation, setHasNewAlertAnimation] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Unread count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const showToast = (title: string, desc: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleRead = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All Caught Up', 'All notifications marked as read');
  };

  const handleDeleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Simulate receiving a live new notification
  const handleSimulateNewAlert = () => {
    const randomTemplate = SIMULATED_ALERTS[Math.floor(Math.random() * SIMULATED_ALERTS.length)];
    const newNotif: PartnerNotification = {
      ...randomTemplate,
      id: `sim-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setHasNewAlertAnimation(true);
    setTimeout(() => setHasNewAlertAnimation(false), 2000);

    showToast(
      newNotif.title,
      newNotif.type === 'payout'
        ? `New Commission: ${newNotif.amount} credited for ${newNotif.salonName}`
        : `Status Update: ${newNotif.salonName}`
    );
  };

  // Contextual action click handler
  const handleActionClick = (notif: PartnerNotification, e: React.MouseEvent) => {
    e.stopPropagation();

    // Mark as read when actioned
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );

    if (notif.actionType === 'whatsapp') {
      const msg = `Hi Sunita, this is Growth Support from Nexora Partner Network. We noticed a slight address discrepancy in your electricity bill for Velvet Touch Lounge. Please upload an updated utility bill here: https://nexora.network/kyc-reupload?ref=REF-5A45019655&salon=VelvetTouch`;
      navigator.clipboard.writeText(msg);
      showToast(
        'WhatsApp Invite Link Copied!',
        'Message copied to clipboard with re-upload token for Sunita Kadam.'
      );
    } else if (notif.actionType === 'track_delivery') {
      const tracking = notif.metadata?.trackingNumber || 'BLR-89210-NX';
      setModalDetails({
        title: `BlueDart Shipment Tracking • #${tracking}`,
        content: (
          <div className="flex flex-col gap-4">
            <div className="p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#594047]">Recipient Salon</span>
                <strong className="text-sm text-[#1c1c19]">{notif.salonName}</strong>
                <span className="text-xs text-[#594047]">Connaught Place, New Delhi</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                In Transit
              </span>
            </div>

            <div className="flex flex-col gap-3 py-1">
              {[
                { stage: 'Terminal Kit Dispatched', time: 'Yesterday, 6:30 PM', done: true, loc: 'Bengaluru Fulfillment Hub' },
                { stage: 'Arrived at Delhi Sorting Hub', time: 'Today, 8:15 AM', done: true, loc: 'IGI Terminal Cargo Center' },
                { stage: 'Out for Delivery to Salon', time: 'Expected Tomorrow, by 2:00 PM', done: false, loc: 'Central Delhi Delivery Unit' }
              ].map((step, idx) => (
                <div key={step.stage} className="flex items-start gap-3 relative">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      step.done ? 'bg-emerald-500 text-white' : 'bg-[#e5e2dd] text-[#594047]'
                    }`}
                  >
                    {step.done ? <span className="material-symbols-outlined text-[14px]">check</span> : idx + 1}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-xs font-bold text-[#1c1c19]">{step.stage}</span>
                    <span className="text-[11px] text-[#594047]">{step.loc} • {step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      });
    } else if (notif.actionType === 'view_receipt') {
      const txn = notif.metadata?.txnId || 'TXN-REF-5A450-HDFC';
      const acct = notif.metadata?.accountMasked || 'HDFC Bank •••• 4019';
      setModalDetails({
        title: `Payment Receipt: ${notif.amount || 'Commission'}`,
        content: (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1c1c19] to-[#2d2b27] text-white flex items-center justify-between shadow-md">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#fda4c9] font-bold uppercase tracking-wider">
                  Partner Settlement Receipt
                </span>
                <span className="text-2xl font-black text-white mt-0.5">
                  {notif.amount}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Cleared &amp; Settled to Bank
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#fda4c9]">
                <span className="material-symbols-outlined text-[28px]">payments</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-[#594047] block">Beneficiary Partner</span>
                <strong className="text-[#1c1c19]">Growth Partner [DEV SAMPLE] (REF-5A45019655)</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#594047] block">Credited Account</span>
                <strong className="text-[#1c1c19]">{acct}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#594047] block">Transaction Reference</span>
                <strong className="text-[#1c1c19] font-mono text-[11px]">{txn}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#594047] block">Qualifying Merchant</span>
                <strong className="text-[#b1005e]">{notif.salonName || 'Direct Volume'}</strong>
              </div>
            </div>
          </div>
        )
      });
    } else {
      showToast(notif.title, notif.message, 'info');
    }
  };

  // Filtered list
  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'payouts') return n.type === 'payout';
    if (filter === 'salons') return n.type === 'salon_status';
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* BELL TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Partner Notifications (${unreadCount} unread)`}
        title="View Payouts & Salon Status Alerts"
        type="button"
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all relative cursor-pointer ${
          isOpen
            ? 'bg-[#ffd9e2] text-[#b1005e] ring-2 ring-[#d91b77]/30'
            : 'text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
        } ${hasNewAlertAnimation ? 'animate-bounce' : ''}`}
      >
        <span
          className={`material-symbols-outlined text-[22px] transition-transform ${
            hasNewAlertAnimation ? 'rotate-12 scale-110' : ''
          }`}
        >
          notifications
        </span>

        {/* Unread Counter Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[19px] h-[19px] px-1 rounded-full bg-[#d91b77] text-white font-extrabold text-[10px] flex items-center justify-center shadow-md shadow-[#d91b77]/40 ring-2 ring-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN POPOVER PANEL */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 z-50 w-[92vw] sm:w-[410px] bg-white rounded-3xl shadow-[0_16px_48px_rgba(74,14,46,0.16)] border border-[#e5e2dd] overflow-hidden flex flex-col font-sans animate-in fade-in zoom-in-95 duration-150 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
          style={{ maxHeight: '82vh' }}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#fcf9f4] to-[#f6f3ee] border-b border-[#e5e2dd] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1c1c19] leading-tight">Partner Activity &amp; Alerts</h3>
                  <p className="text-[11px] text-[#594047]">
                    {unreadCount > 0 ? (
                      <span className="font-semibold text-[#b1005e]">{unreadCount} unread updates</span>
                    ) : (
                      'All caught up'
                    )}
                  </p>
                </div>
              </div>

              {/* Action Buttons in Header */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleSimulateNewAlert}
                  title="Simulate incoming alert"
                  className="px-2 py-1 rounded-lg bg-white hover:bg-[#f0ede9] text-[#735c00] border border-[#cca730]/40 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[13px]">add_alert</span>
                  <span className="hidden sm:inline">Simulate Alert</span>
                </button>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    title="Mark all as read"
                    className="px-2 py-1 rounded-lg bg-white hover:bg-[#f0ede9] text-[#594047] hover:text-[#1c1c19] border border-[#e5e2dd] text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[13px]">done_all</span>
                    <span>Read All</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
              {[
                { id: 'all', label: 'All', count: notifications.length },
                {
                  id: 'payouts',
                  label: 'Payouts',
                  icon: 'payments',
                  count: notifications.filter((n) => n.type === 'payout').length
                },
                {
                  id: 'salons',
                  label: 'Salon Status',
                  icon: 'storefront',
                  count: notifications.filter((n) => n.type === 'salon_status').length
                },
                {
                  id: 'unread',
                  label: 'Unread',
                  icon: 'fiber_manual_record',
                  count: unreadCount
                }
              ].map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilter(tab.id as any)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#d91b77] text-white shadow-xs'
                        : 'bg-white text-[#594047] hover:bg-[#ebe8e3] border border-[#e5e2dd]'
                    }`}
                  >
                    {tab.icon && (
                      <span
                        className={`material-symbols-outlined text-[13px] ${
                          tab.id === 'unread' ? 'text-rose-500' : ''
                        }`}
                      >
                        {tab.icon}
                      </span>
                    )}
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#f0ede9] text-[#594047]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notification List Scroll Area */}
          <div className="overflow-y-auto flex-1 divide-y divide-[#f0ede9] max-h-[55vh]">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-center text-[#594047]">
                <div className="w-12 h-12 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#8e4767] mb-2">
                  <span className="material-symbols-outlined text-[24px]">notifications_off</span>
                </div>
                <h4 className="text-xs font-bold text-[#1c1c19]">No Notifications</h4>
                <p className="text-[11px] text-[#594047] max-w-[200px] mt-0.5">
                  {filter === 'unread'
                    ? "You're all caught up! No unread partner notifications."
                    : 'No updates in this filter category.'}
                </p>
                {filter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setFilter('all')}
                    className="mt-3 px-3 py-1 rounded-xl bg-[#ffd9e2] text-[#b1005e] text-xs font-bold"
                  >
                    Show All
                  </button>
                )}
              </div>
            ) : (
              filteredNotifications.map((notif) => {
                const isPayout = notif.type === 'payout';
                const isUrgent = notif.priority === 'urgent';

                return (
                  <div
                    key={notif.id}
                    onClick={() => handleToggleRead(notif.id)}
                    className={`p-3.5 sm:p-4 transition-colors flex items-start gap-3 cursor-pointer group hover:bg-[#fcf9f4] ${
                      !notif.isRead ? 'bg-[#fff7f9]' : 'bg-white'
                    }`}
                  >
                    {/* Category Icon Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                        isUrgent
                          ? 'bg-rose-100 text-rose-700'
                          : isPayout
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#ffd9e2] text-[#b1005e]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isUrgent
                          ? 'warning'
                          : isPayout
                          ? 'account_balance_wallet'
                          : 'storefront'}
                      </span>
                    </div>

                    {/* Content Body */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-xs font-bold leading-tight ${
                              !notif.isRead ? 'text-[#1c1c19]' : 'text-[#594047]'
                            }`}
                          >
                            {notif.title}
                          </span>
                          {!notif.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#d91b77] shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-[#8d6f77] shrink-0 whitespace-nowrap">
                          {notif.timestamp}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#594047] leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>

                      {/* Pill tags & Action Row */}
                      <div className="flex items-center justify-between gap-2 mt-1 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {notif.badgeText && (
                            <span
                              className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${
                                isUrgent
                                  ? 'bg-rose-100 text-rose-800'
                                  : isPayout
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-[#f0ede9] text-[#735c00]'
                              }`}
                            >
                              {notif.badgeText}
                            </span>
                          )}

                          {notif.amount && (
                            <span className="text-xs font-black text-emerald-700">
                              {notif.amount}
                            </span>
                          )}
                        </div>

                        {/* Interactive Contextual Action Pill */}
                        {notif.actionLabel && (
                          <button
                            type="button"
                            onClick={(e) => handleActionClick(notif, e)}
                            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                              isUrgent
                                ? 'bg-[#d91b77] hover:bg-[#b1005e] text-white'
                                : 'bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19]'
                            }`}
                          >
                            {notif.actionType === 'whatsapp' && (
                              <span className="material-symbols-outlined text-[13px] text-emerald-400">
                                chat
                              </span>
                            )}
                            {notif.actionType === 'track_delivery' && (
                              <span className="material-symbols-outlined text-[13px]">
                                local_shipping
                              </span>
                            )}
                            {notif.actionType === 'view_receipt' && (
                              <span className="material-symbols-outlined text-[13px]">
                                receipt_long
                              </span>
                            )}
                            <span>{notif.actionLabel}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Quick Dismiss / Toggle Actions on Hover */}
                    <button
                      type="button"
                      onClick={(e) => handleDeleteNotification(notif.id, e)}
                      title="Dismiss notification"
                      className="opacity-0 group-hover:opacity-100 text-[#8d6f77] hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition-all shrink-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary / Quick Link */}
          <div className="p-3 bg-[#f6f3ee] border-t border-[#e5e2dd] flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[11px] text-[#594047]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time webhook sync</span>
            </div>

            {onNavigateToReferrals && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onNavigateToReferrals();
                }}
                className="text-[11px] font-bold text-[#b1005e] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All Salons</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODAL DETAILS POPUP (For receipts or courier tracking) */}
      {modalDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#e5e2dd] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#e5e2dd] pb-3">
              <h3 className="font-bold text-sm text-[#1c1c19] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b1005e]">info</span>
                <span>{modalDetails.title}</span>
              </h3>
              <button
                type="button"
                onClick={() => setModalDetails(null)}
                className="p-1 rounded-full text-[#594047] hover:bg-[#f0ede9] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {modalDetails.content}

            <button
              type="button"
              onClick={() => setModalDetails(null)}
              className="w-full py-2.5 rounded-xl bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION BANNER */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1c19] text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 max-w-sm animate-in slide-in-from-bottom duration-200">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">
              {toastMessage.type === 'success' ? 'check_circle' : 'info'}
            </span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs font-bold text-white truncate">{toastMessage.title}</span>
            <span className="text-[11px] text-[#b4aba4] leading-snug">{toastMessage.desc}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
