import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import { AddSalonScreen } from './components/AddSalonScreen';
import { ShareAndEarnScreen } from './components/ShareAndEarnScreen';
import { SalonMerchantRegistrationScreen } from './components/SalonMerchantRegistrationScreen';
import { SalonLockedOnboardingScreen } from './components/SalonLockedOnboardingScreen';
import { SalonStepAuditWorkspaceScreen } from './components/SalonStepAuditWorkspaceScreen';
import { SalonMobileFastTrackScreen } from './components/SalonMobileFastTrackScreen';
import { SalonWebsiteTemplatesScreen } from './components/SalonWebsiteTemplatesScreen';
import { PartnerProfileSettingsScreen } from './components/PartnerProfileSettingsScreen';
import { SalonSecureHandoffScreen } from './components/SalonSecureHandoffScreen';
import { SalonHandoffHubScreen } from './components/SalonHandoffHubScreen';
import { PartnerEarningsLedgerScreen } from './components/PartnerEarningsLedgerScreen';
import { PartnerExtraRewardStructureScreen } from './components/PartnerExtraRewardStructureScreen';
import { PartnerMilestoneClaimsScreen } from './components/PartnerMilestoneClaimsScreen';
import { PartnerMilestoneUnlockCelebrationScreen } from './components/PartnerMilestoneUnlockCelebrationScreen';
import { PartnerMobileRewardsMilestonesScreen } from './components/PartnerMobileRewardsMilestonesScreen';
import { OpsConsoleMilestoneAssetClaimsScreen } from './components/OpsConsoleMilestoneAssetClaimsScreen';
import { MobileJourneyNavigatorScreen } from './components/MobileJourneyNavigatorScreen';
import { PrototypeHubOrchestratorScreen } from './components/PrototypeHubOrchestratorScreen';
import { ReferralHistoryScreen } from './components/ReferralHistoryScreen';
import { PartnerWithdrawalsScreen } from './components/PartnerWithdrawalsScreen';
import { PartnerMarketingMaterialScreen } from './components/PartnerMarketingMaterialScreen';
import { PartnerMobileMarketingMaterialScreen } from './components/PartnerMobileMarketingMaterialScreen';
import { PartnerLevelsScreen } from './components/PartnerLevelsScreen';
import { PartnerNotificationsScreen } from './components/PartnerNotificationsScreen';

function MainApp() {
  const [currentScreen, setCurrentScreen] = useState<'leaderboard' | 'referral-timeline' | 'salon-intelligence' | 'dashboard' | 'auth' | 'hub' | 'add-salon' | 'share-earn' | 'merchant-register' | 'locked-onboarding' | 'step-audit-workspace' | 'mobile-fast-track' | 'website-templates' | 'profile-settings' | 'secure-handoff' | 'handoff-hub' | 'earnings-ledger' | 'withdrawals' | 'extra-onboarding-reward' | 'milestone-claims' | 'milestone-unlock' | 'mobile-rewards' | 'ops-milestone-claims' | 'prototype-orchestrator' | 'journey-navigator' | 'referral-history' | 'marketing-material' | 'mobile-marketing' | 'partner-levels' | 'partner-notifications'>('prototype-orchestrator');
  const [isApplyOpen, setIsApplyOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const { registeredPartner, setRegisteredPartner } = useAuth();

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
      <Header
        onOpenApply={() => setIsApplyOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        registeredPartner={registeredPartner}
      />
      {currentScreen === 'prototype-orchestrator' ? (
        /* SCREEN: Prototype Hub & Journey Orchestrator (Live Diagnostic Sandbox & 18-Route Register) */
        <PrototypeHubOrchestratorScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
          onNavigateToMilestoneUnlock={() => setCurrentScreen('milestone-unlock')}
          onNavigateToMobileRewards={() => setCurrentScreen('mobile-rewards')}
          onNavigateToOpsMilestoneClaims={() => setCurrentScreen('ops-milestone-claims')}
          onNavigateToJourneyNavigator={() => setCurrentScreen('journey-navigator')}
          onNavigateToReferralHistory={() => setCurrentScreen('referral-history')}
          onNavigateToWithdrawals={() => setCurrentScreen('withdrawals')}
          onNavigateToMobileMarketing={() => setCurrentScreen('mobile-marketing')}
          onNavigateToMarketingMaterial={() => setCurrentScreen('marketing-material')}
          onNavigateToPartnerLevels={() => setCurrentScreen('partner-levels')}
          onNavigateToNotifications={() => setCurrentScreen('partner-notifications')}
        />
      ) : currentScreen === 'partner-notifications' ? (
        /* SCREEN: Partner Notifications Hub */
        <PartnerNotificationsScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToWithdrawals={() => setCurrentScreen('withdrawals')}
        />
      ) : currentScreen === 'journey-navigator' ? (
        /* SCREEN: Mobile Journey Navigator (Canary Sandbox & Mobile UX Sandbox) */
        <MobileJourneyNavigatorScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
          onNavigateToMilestoneUnlock={() => setCurrentScreen('milestone-unlock')}
          onNavigateToMobileRewards={() => setCurrentScreen('mobile-rewards')}
          onNavigateToOpsMilestoneClaims={() => setCurrentScreen('ops-milestone-claims')}
          onNavigateToPrototypeOrchestrator={() => setCurrentScreen('prototype-orchestrator')}
          onNavigateToMobileMarketing={() => setCurrentScreen('mobile-marketing')}
          onNavigateToMarketingMaterial={() => setCurrentScreen('marketing-material')}
          onNavigateToPartnerLevels={() => setCurrentScreen('partner-levels')}
        />
      ) : currentScreen === 'ops-milestone-claims' ? (
        /* SCREEN: Ops Console Milestone Asset Claims & Dispatch Protocol (Risk Audit, Telemetry Gate & Adjudication) */
        <OpsConsoleMilestoneAssetClaimsScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
          onNavigateToMilestoneUnlock={() => setCurrentScreen('milestone-unlock')}
          onNavigateToMobileRewards={() => setCurrentScreen('mobile-rewards')}
        />
      ) : currentScreen === 'mobile-rewards' ? (
        /* SCREEN: Mobile Responsive Rewards & Milestones Hub (7 Incentive Tiers, Dynamic Fill, In-Transit Trackers, POD & Bottom Bar) */
        <PartnerMobileRewardsMilestonesScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToMilestoneUnlock={() => setCurrentScreen('milestone-unlock')}
        />
      ) : currentScreen === 'milestone-unlock' ? (
        /* SCREEN: Milestone 3 Unlocked Celebration & Asset Claim Protocol (100 Qualified Salons Unlocked) */
        <PartnerMilestoneUnlockCelebrationScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
        />
      ) : currentScreen === 'milestone-claims' ? (
        /* SCREEN: Milestone Rewards & Asset Claims Architecture (7 Physical Incentive Tiers, OTP Claim, Live Telemetry) */
        <PartnerMilestoneClaimsScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
          onNavigateToMilestoneUnlock={() => setCurrentScreen('milestone-unlock')}
        />
      ) : currentScreen === 'extra-onboarding-reward' ? (
        /* SCREEN: Extra Onboarding Reward & Commission Structure Architecture (15-Day Accelerator & Recurring Growth Model) */
        <PartnerExtraRewardStructureScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
        />
      ) : currentScreen === 'earnings-ledger' ? (
        /* SCREEN: Partner Treasury Earnings & Commission Ledger with Interactive Audit & Disbursal Table */
        <PartnerEarningsLedgerScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
          onNavigateToWithdrawals={() => setCurrentScreen('withdrawals')}
          onNavigateToMarketingMaterial={() => setCurrentScreen('marketing-material')}
        />
      ) : currentScreen === 'withdrawals' ? (
        /* SCREEN: Partner Withdrawals & Secure Settlements Portal */
        <PartnerWithdrawalsScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToWithdrawals={() => setCurrentScreen('withdrawals')}
          onNavigateToMarketingMaterial={() => setCurrentScreen('marketing-material')}
        />
      ) : currentScreen === 'marketing-material' ? (
        /* SCREEN: Marketing Materials and approved creative templates */
        <PartnerMarketingMaterialScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToWithdrawals={() => setCurrentScreen('withdrawals')}
          onNavigateToMarketingMaterial={() => setCurrentScreen('marketing-material')}
        />
      ) : currentScreen === 'mobile-marketing' ? (
        /* SCREEN: Mobile Approved Marketing Materials Creative Hub */
        <PartnerMobileMarketingMaterialScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToMobileRewards={() => setCurrentScreen('mobile-rewards')}
        />
      ) : currentScreen === 'partner-levels' ? (
        /* SCREEN: Partner Levels and verified progression tiers status */
        <PartnerLevelsScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
          onNavigateToSecureHandoff={() => setCurrentScreen('secure-handoff')}
          onNavigateToHandoffHub={() => setCurrentScreen('handoff-hub')}
          onNavigateToExtraOnboardingReward={() => setCurrentScreen('extra-onboarding-reward')}
          onNavigateToRewardsMilestones={() => setCurrentScreen('milestone-claims')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToMobileRewards={() => setCurrentScreen('mobile-rewards')}
        />
      ) : currentScreen === 'handoff-hub' ? (
        /* SCREEN: Salon Launchpad Cryptographic Handoff Hub & Interactive Lifecycle State Simulator (Full Desktop/Tablet Suite) */
        <SalonHandoffHubScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
        />
      ) : currentScreen === 'secure-handoff' ? (
        /* SCREEN: Salon Secure Handoff Overview & Multi-Stage State Simulator */
        <SalonSecureHandoffScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
          onNavigateToProfileSettings={() => setCurrentScreen('profile-settings')}
        />
      ) : currentScreen === 'profile-settings' ? (
        /* SCREEN: Partner Profile Settings & Bank Payout Management */
        <PartnerProfileSettingsScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
          onNavigateToWebsiteTemplates={() => setCurrentScreen('website-templates')}
        />
      ) : currentScreen === 'website-templates' ? (
        /* SCREEN: Salon Website & Booking Templates Explorer (Live Simulator) */
        <SalonWebsiteTemplatesScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
          onNavigateToMobileFastTrack={() => setCurrentScreen('mobile-fast-track')}
        />
      ) : currentScreen === 'mobile-fast-track' ? (
        /* SCREEN: Mobile-Optimized Salon Location Fast-Track (Step 3 of 5) */
        <SalonMobileFastTrackScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
          onNavigateToStepAuditWorkspace={() => setCurrentScreen('step-audit-workspace')}
        />
      ) : currentScreen === 'step-audit-workspace' ? (
        /* SCREEN: 5-Step Locked Salon Onboarding & Compliance Audit Workspace */
        <SalonStepAuditWorkspaceScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
          onNavigateToLockedOnboarding={() => setCurrentScreen('locked-onboarding')}
        />
      ) : currentScreen === 'locked-onboarding' ? (
        /* SCREEN: Mobile-First Salon Locked Referral Registration & Audit State Simulator */
        <SalonLockedOnboardingScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToMerchantRegister={() => setCurrentScreen('merchant-register')}
        />
      ) : currentScreen === 'merchant-register' ? (
        /* SCREEN: Salon Merchant Direct Registration & Attribution */
        <SalonMerchantRegistrationScreen
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
        />
      ) : currentScreen === 'share-earn' ? (
        /* SCREEN: Share & Earn / Exclusive Code & In-Store QR Scanner */
        <ShareAndEarnScreen
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToAuth={() => setCurrentScreen('auth')}
        />
      ) : currentScreen === 'add-salon' ? (
        /* SCREEN: Refer / Add New Salon */
        <AddSalonScreen
          onNavigateBack={() => setCurrentScreen('salon-intelligence')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToHub={() => setCurrentScreen('hub')}
        />
      ) : currentScreen === 'leaderboard' ? (
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
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
        />
      ) : currentScreen === 'referral-history' ? (
        /* SCREEN: Referral History & Stage Portfolio Ledger */
        <ReferralHistoryScreen
          onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToSalonIntelligence={() => setCurrentScreen('salon-intelligence')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
        />
      ) : currentScreen === 'salon-intelligence' ? (
        /* SCREEN 3: Growth Partner Intelligence (Salon Distribution Network) */
        <SalonIntelligenceDashboard
          onNavigateToAuth={() => setCurrentScreen('auth')}
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToWorkspace={() => setCurrentScreen('dashboard')}
          onNavigateToReferralTimeline={() => setCurrentScreen('referral-timeline')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToAddSalon={() => setCurrentScreen('add-salon')}
          onNavigateToShareEarn={() => setCurrentScreen('share-earn')}
        />
      ) : currentScreen === 'dashboard' ? (
        /* SCREEN 4: Partner Workspace Telemetry Dashboard */
        <PartnerDashboard
          onNavigateToAuth={() => setCurrentScreen('auth')}
          onNavigateToHub={() => setCurrentScreen('hub')}
          onNavigateToLeaderboard={() => setCurrentScreen('leaderboard')}
          onNavigateToEarningsLedger={() => setCurrentScreen('earnings-ledger')}
          onNavigateToWithdrawals={() => setCurrentScreen('withdrawals')}
          onNavigateToMarketingMaterial={() => setCurrentScreen('marketing-material')}
          onNavigateToPartnerLevels={() => setCurrentScreen('partner-levels')}
          onNavigateToNotifications={() => setCurrentScreen('partner-notifications')}
          onNavigateToSupport={() => setIsSupportOpen(true)}
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

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
