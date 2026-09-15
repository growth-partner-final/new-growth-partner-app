import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { RulesSection } from './components/RulesSection';
import { EarningsCalculator } from './components/EarningsCalculator';
import { ActivationRewards } from './components/ActivationRewards';
import { RecurringShare } from './components/RecurringShare';
import { MilestoneLadder } from './components/MilestoneLadder';
import { FraudNotice } from './components/FraudNotice';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { BottomNav } from './components/BottomNav';
import { ApplicationModal } from './components/ApplicationModal';
import { SupportModal } from './components/SupportModal';
import { AuthScreen } from './components/AuthScreen';
import { PartnerDashboard } from './components/PartnerDashboard';
import { SalonIntelligenceDashboard } from './components/SalonIntelligenceDashboard';
import { ReferralStatusTimeline } from './components/ReferralStatusTimeline';
import { TopPerformersLeaderboard } from './components/TopPerformersLeaderboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'leaderboard' | 'referral-timeline' | 'salon-intelligence' | 'dashboard' | 'auth' | 'hub'>('leaderboard');
  const [isApplyOpen, setIsApplyOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [registeredPartner, setRegisteredPartner] = useState<{
    name: string;
    partnerId: string;
    referralLink: string;
  } | null>({
    name: 'Marcus Vance',
    partnerId: 'NEX-88219',
    referralLink: 'https://nexora.network/join?ref=NEX-88219'
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthSuccess = (partnerData: { name: string; partnerId: string }) => {
    setRegisteredPartner({
      name: partnerData.name,
      partnerId: partnerData.partnerId,
      referralLink: `https://nexora.network/join?ref=${partnerData.partnerId}`
    });
    setCurrentScreen('salon-intelligence');
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans relative selection:bg-[#fda4c9]">
      {/* Top Floating View Switcher Bar */}
      <div className="sticky top-0 z-50 w-full bg-[#31302d] text-white py-1.5 px-4 text-xs flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold tracking-tight">Nexora Growth Ecosystem</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setCurrentScreen('leaderboard')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'leaderboard'
                ? 'bg-[#d91b77] text-white shadow-xs'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            🏆 Top Performers
          </button>
          <button
            onClick={() => setCurrentScreen('referral-timeline')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'referral-timeline'
                ? 'bg-[#d91b77] text-white shadow-xs'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            ⏱️ Referral Timeline
          </button>
          <button
            onClick={() => setCurrentScreen('salon-intelligence')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'salon-intelligence'
                ? 'bg-[#d91b77] text-white shadow-xs'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            💈 Salon Intelligence
          </button>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'dashboard'
                ? 'bg-[#d91b77] text-white shadow-xs'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            📊 Partner Telemetry
          </button>
          <button
            onClick={() => setCurrentScreen('auth')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'auth'
                ? 'bg-[#d91b77] text-white shadow-xs'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            🔐 Auth &amp; Enrollment
          </button>
          <button
            onClick={() => setCurrentScreen('hub')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'hub'
                ? 'bg-[#d91b77] text-white shadow-xs'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            🚀 Program Hub &amp; Ladder
          </button>
        </div>
      </div>

      {currentScreen === 'leaderboard' ? (
        /* SCREEN 1: Top Performers Leaderboard */
        <TopPerformersLeaderboard
          onNavigateToAuth={() => setCurrentScreen('auth')}
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToWorkspace={() => setCurrentScreen('dashboard')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
        />
      ) : currentScreen === 'referral-timeline' ? (
        /* SCREEN 2: Referral Lifecycle & Milestone Roadmap / Referral Status Timeline */
        <ReferralStatusTimeline
          onNavigateToAuth={() => setCurrentScreen('auth')}
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToWorkspace={() => setCurrentScreen('dashboard')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
        />
      ) : currentScreen === 'salon-intelligence' ? (
        /* SCREEN 3: Growth Partner Intelligence (Salon Distribution Network) */
        <SalonIntelligenceDashboard
          onNavigateToAuth={() => setCurrentScreen('auth')}
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToWorkspace={() => setCurrentScreen('dashboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
        />
      ) : currentScreen === 'dashboard' ? (
        /* SCREEN 4: Partner Workspace Telemetry Dashboard */
        <PartnerDashboard
          onNavigateToAuth={() => setCurrentScreen('auth')}
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
        />
      ) : currentScreen === 'auth' ? (
        /* SCREEN 3: Partner Auth Master Portal */
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <AuthScreen
            onSuccessLogin={handleAuthSuccess}
            onNavigateToHub={() => setCurrentScreen('hub')}
          />
        </main>
      ) : (
        /* SCREEN 4: Growth Partner Hub & Public Landing */
        <>
          {/* Top Fixed Header */}
          <Header
            onOpenApply={() => setIsApplyOpen(true)}
            onOpenSupport={() => setIsSupportOpen(true)}
            registeredPartner={registeredPartner}
          />

          {/* Main Content */}
          <main className="flex-1 w-full pt-16 pb-24 flex flex-col">
            <div className="max-w-2xl mx-auto w-full relative overflow-hidden flex flex-col">
              {/* Ambient Luxury Glow Backdrop */}
              <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-[#d91b77]/10 blur-3xl pointer-events-none"></div>
              <div className="absolute top-80 -right-24 w-80 h-80 rounded-full bg-[#cca730]/15 blur-3xl pointer-events-none"></div>

              {/* 1. Hero Section */}
              <HeroSection
                onOpenApply={() => setIsApplyOpen(true)}
                onScrollToCalculator={() => scrollToSection('calculator')}
              />

              {/* 2. How It Works */}
              <HowItWorks />

              {/* 3. Partner Work & Rules */}
              <RulesSection />

              {/* 4. Qualification Formula & Interactive Income Calculator */}
              <EarningsCalculator />

              {/* 5. One-Time Activation Rewards */}
              <ActivationRewards />

              {/* 6. Recurring Growth Share */}
              <RecurringShare />

              {/* 7. Seven Reward Milestones & 7-Stage Ladder */}
              <MilestoneLadder />

              {/* 8. Fraud & Risk Notice */}
              <FraudNotice />

              {/* 9. Frequently Asked Questions */}
              <FAQSection />

              {/* 10. Final Call to Action & Footer */}
              <FinalCTA
                onOpenApply={() => setIsApplyOpen(true)}
                onOpenSupport={() => setIsSupportOpen(true)}
              />
            </div>
          </main>

          {/* Fixed Bottom Navigation */}
          <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenSupport={() => setIsSupportOpen(true)}
            onScrollTo={scrollToSection}
          />
        </>
      )}

      {/* Interactive Application Modal */}
      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        currentPartner={registeredPartner}
        onRegisterSuccess={(partner) => {
          setRegisteredPartner(partner);
        }}
      />

      {/* Interactive Support Modal */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        onScrollToFAQ={() => scrollToSection('faq')}
      />
    </div>
  );
}
