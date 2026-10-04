import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Trophy,
  Award,
  Calculator,
  HelpCircle,
  MessageCircle,
  Share2,
  Store,
  Layers,
  X,
  ChevronRight,
  ArrowUp,
  Flame,
  ShieldCheck,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { NexoraLogo } from './NexoraLogo';

interface BottomNavProps {
  onOpenApply: () => void;
  onOpenSupport: () => void;
  onScrollToCalculator?: () => void;
  onScrollToFAQ?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  onOpenApply,
  onOpenSupport,
  onScrollToCalculator,
  onScrollToFAQ
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setShowBackToTop(scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when More Sheet is open
  useEffect(() => {
    if (isMoreOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMoreOpen]);

  // Close sheet on route change
  useEffect(() => {
    setIsMoreOpen(false);
  }, [location.pathname]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMoreNavigation = (action: () => void) => {
    setIsMoreOpen(false);
    action();
  };

  return (
    <>
      {/* 1. Mobile Floating Actions: WhatsApp (Left) & Back-to-Top (Right) */}
      <AnimatePresence>
        {!isMoreOpen && (
          <motion.button
            key="mobile-whatsapp-btn"
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onOpenSupport}
            aria-label="Open WhatsApp Support"
            className="md:hidden fixed bottom-[76px] left-3.5 z-40 w-11 h-11 rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.4)] border border-white/30 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            <span className="sr-only">WhatsApp Support</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBackToTop && !isMoreOpen && (
          <motion.button
            key="mobile-back-to-top-btn"
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={handleScrollToTop}
            aria-label="Scroll back to top"
            className="md:hidden fixed bottom-[76px] right-3.5 z-40 w-11 h-11 rounded-full bg-[#1c1c19]/90 text-white backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. Glassmorphic Mobile Bottom Dock (md:hidden) */}
      <nav
        id="mobile-bottom-dock"
        aria-label="Mobile Navigation Dock"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#fcf9f4]/95 backdrop-blur-xl border-t border-[#e5e2dd] shadow-[0_-4px_24px_rgba(74,14,46,0.08)]"
      >
        <div className="w-full max-w-md mx-auto h-16 px-2 flex items-center justify-between">
          {/* 1. Explore/Services (Home) */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 gap-0.5 cursor-pointer transition-colors active:scale-95 ${
                isActive && !isMoreOpen
                  ? 'text-[#b1005e] font-extrabold'
                  : 'text-[#594047] hover:text-[#1c1c19]'
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px]">explore</span>
            <span className="text-[10px] tracking-tight leading-none">Explore</span>
          </NavLink>

          {/* 2. Primary Center Action: Book Now / Apply */}
          <div className="flex-1 flex justify-center items-center">
            <button
              type="button"
              onClick={onOpenApply}
              aria-label="Book Demo or Join Partner Program"
              className="relative -top-2 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#b1005e] via-[#d91b77] to-[#f59e0b] text-white shadow-[0_6px_20px_rgba(217,27,119,0.45)] ring-4 ring-[#fcf9f4] active:scale-90 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              <span className="text-[8px] font-black uppercase tracking-wider -mt-0.5 leading-none">
                Book
              </span>
            </button>
          </div>

          {/* 3. My Bookings/Profile */}
          <NavLink
            to="/partner/profile"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 gap-0.5 cursor-pointer transition-colors active:scale-95 ${
                isActive && !isMoreOpen
                  ? 'text-[#b1005e] font-extrabold'
                  : 'text-[#594047] hover:text-[#1c1c19]'
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
            <span className="text-[10px] tracking-tight leading-none">Profile</span>
          </NavLink>

          {/* 4. More Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsMoreOpen(true)}
            aria-label="Open More Menu"
            className={`flex flex-col items-center justify-center flex-1 min-h-[48px] py-1 gap-0.5 cursor-pointer transition-colors active:scale-95 ${
              isMoreOpen
                ? 'text-[#b1005e] font-extrabold'
                : 'text-[#594047] hover:text-[#1c1c19]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">apps</span>
            <span className="text-[10px] tracking-tight leading-none">More</span>
          </button>
        </div>
      </nav>

      {/* 3. Smooth Mobile Bottom Sheet Drawer for "More" */}
      <AnimatePresence>
        {isMoreOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Bottom Sheet Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-h-[85dvh] bg-[#fcf9f4] rounded-t-[28px] border-t border-[#e5e2dd] shadow-2xl flex flex-col overflow-hidden pb-safe"
            >
              {/* Drawer Grab Handle & Header */}
              <div className="pt-3 px-4 pb-3 border-b border-[#e5e2dd] bg-[#f6f3ee]/80 backdrop-blur-md flex flex-col items-center">
                <div className="w-12 h-1.5 rounded-full bg-[#e5e2dd] mb-3" />
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <NexoraLogo variant="emblem" size="xs" />
                    <span className="font-extrabold text-sm text-[#1c1c19]">Nexora Menu</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMoreOpen(false)}
                    className="p-1.5 rounded-full bg-white text-[#594047] hover:text-[#1c1c19] border border-[#e5e2dd] cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Navigation Grid & List */}
              <div className="p-4 overflow-y-auto space-y-4">
                {/* Core Quick Services Grid */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#8e4767] mb-2 block">
                    Essential Services &amp; Rewards
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleMoreNavigation(() => navigate('/partner/leaderboard'))}
                      className="p-3 rounded-2xl bg-white border border-[#e5e2dd] shadow-2xs hover:border-[#b1005e]/30 flex flex-col gap-1.5 text-left active:scale-[0.98] transition-transform cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#1c1c19]">Leaderboard</span>
                      <span className="text-[10px] text-[#594047]">Top ranked partners &amp; cars</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoreNavigation(() => navigate('/partner/rewards'))}
                      className="p-3 rounded-2xl bg-white border border-[#e5e2dd] shadow-2xs hover:border-[#b1005e]/30 flex flex-col gap-1.5 text-left active:scale-[0.98] transition-transform cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#1c1c19]">7 Milestone Tiers</span>
                      <span className="text-[10px] text-[#594047]">iPhones, EV &amp; Mahindra SUV</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleMoreNavigation(() => {
                          if (location.pathname === '/') {
                            onScrollToCalculator?.();
                          } else {
                            navigate('/partner/earnings');
                          }
                        })
                      }
                      className="p-3 rounded-2xl bg-white border border-[#e5e2dd] shadow-2xs hover:border-[#b1005e]/30 flex flex-col gap-1.5 text-left active:scale-[0.98] transition-transform cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#1c1c19]">Earnings Calculator</span>
                      <span className="text-[10px] text-[#594047]">Simulate monthly brokerage</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoreNavigation(() => navigate('/salon-intelligence'))}
                      className="p-3 rounded-2xl bg-white border border-[#e5e2dd] shadow-2xs hover:border-[#b1005e]/30 flex flex-col gap-1.5 text-left active:scale-[0.98] transition-transform cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                        <Store className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#1c1c19]">Salon Intelligence</span>
                      <span className="text-[10px] text-[#594047]">Live POS billing &amp; CRM</span>
                    </button>
                  </div>
                </div>

                {/* Additional Platform Features List */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#8e4767] mb-2 block">
                    Partner Management &amp; Support
                  </span>
                  <div className="bg-white rounded-2xl border border-[#e5e2dd] divide-y divide-[#f0ede9] shadow-2xs overflow-hidden">
                    <button
                      type="button"
                      onClick={() => handleMoreNavigation(() => navigate('/dashboard'))}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#fcf9f4] active:bg-[#f6f3ee] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4 text-[#b1005e]" />
                        <span className="text-xs font-bold text-[#1c1c19]">Growth Partner Dashboard</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#594047]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoreNavigation(() => navigate('/partner/share-earn'))}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#fcf9f4] active:bg-[#f6f3ee] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Share2 className="w-4 h-4 text-[#cca730]" />
                        <span className="text-xs font-bold text-[#1c1c19]">My Referral Link &amp; QR</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#594047]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoreNavigation(() => navigate('/partner/withdrawals'))}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#fcf9f4] active:bg-[#f6f3ee] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-[#1c1c19]">Weekly Monday Withdrawals</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#594047]" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleMoreNavigation(() => {
                          if (location.pathname === '/') {
                            onScrollToFAQ?.();
                          } else {
                            navigate('/');
                          }
                        })
                      }
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#fcf9f4] active:bg-[#f6f3ee] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-[#594047]" />
                        <span className="text-xs font-bold text-[#1c1c19]">FAQs &amp; Compliance Rules</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#594047]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoreNavigation(onOpenSupport)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left bg-emerald-50/50 hover:bg-emerald-50 transition-colors cursor-pointer text-emerald-800"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold">24/7 WhatsApp Partner Support</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Online
                      </span>
                    </button>
                  </div>
                </div>

                {/* Slogan Banner */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-[#ffd9e2]/40 to-[#ffe088]/30 border border-[#b1005e]/20 text-center">
                  <span className="text-[11px] font-black text-[#b1005e] tracking-wider uppercase block">
                    Nexora Salon OS
                  </span>
                  <span className="text-[10px] text-[#594047] font-semibold">
                    YOUR SALON • YOUR BRAND • YOUR SUCCESS.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
