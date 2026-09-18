import { PartnerDashboard } from '../components/PartnerDashboard';
import { ShareAndEarnScreen } from '../components/ShareAndEarnScreen';
import { ReferralHistoryScreen } from '../components/ReferralHistoryScreen';
import { ReferralStatusTimeline } from '../components/ReferralStatusTimeline';
import { PartnerMilestoneClaimsScreen } from '../components/PartnerMilestoneClaimsScreen';
import { PartnerExtraRewardStructureScreen } from '../components/PartnerExtraRewardStructureScreen';
import { PartnerProfileSettingsScreen } from '../components/PartnerProfileSettingsScreen';
import { PartnerEarningsLedgerScreen } from '../components/PartnerEarningsLedgerScreen';
import { PartnerWithdrawalsScreen } from '../components/PartnerWithdrawalsScreen';
import { PartnerLevelsScreen } from '../components/PartnerLevelsScreen';
import { PartnerMarketingMaterialScreen } from '../components/PartnerMarketingMaterialScreen';
import { PartnerLeaderboard } from '../components/PartnerLeaderboard';
import { TopPerformersLeaderboard } from '../components/TopPerformersLeaderboard';
import { PartnerNotificationsScreen } from '../components/PartnerNotificationsScreen';

export const routes = [
  { path: '/dashboard', component: PartnerDashboard, label: 'Dashboard', icon: 'grid_view' },
  { path: '/partner/leaderboard', component: PartnerLeaderboard, label: 'Leaderboard', icon: 'emoji_events' },
  { path: '/leaderboard', component: PartnerLeaderboard, label: 'Leaderboard', icon: 'emoji_events' },
  { path: '/partner/share-earn', component: ShareAndEarnScreen, label: 'Share & Earn', icon: 'qr_code_2' },
  { path: '/partner/referred-salons', component: ReferralHistoryScreen, label: 'Referred Salons', icon: 'group' },
  { path: '/partner/referral-status', component: ReferralStatusTimeline, label: 'Referral Status', icon: 'query_stats' },
  { path: '/partner/rewards', component: PartnerMilestoneClaimsScreen, label: 'Rewards', icon: 'military_tech' },
  { path: '/partner/activation-reward', component: PartnerExtraRewardStructureScreen, label: 'Activation Reward', icon: 'redeem' },
  { path: '/partner/profile', component: PartnerProfileSettingsScreen, label: 'Profile', icon: 'person' },
  { path: '/partner/earnings', component: PartnerEarningsLedgerScreen, label: 'Earnings', icon: 'account_balance_wallet' },
  { path: '/partner/withdrawals', component: PartnerWithdrawalsScreen, label: 'Withdrawals', icon: 'payments' },
  { path: '/partner/levels', component: PartnerLevelsScreen, label: 'Levels', icon: 'stars' },
  { path: '/partner/marketing', component: PartnerMarketingMaterialScreen, label: 'Marketing', icon: 'campaign' },
  { path: '/partner/top-performers', component: TopPerformersLeaderboard, label: 'Top Performers', icon: 'leaderboard' },
  { path: '/partner/notifications', component: PartnerNotificationsScreen, label: 'Notifications', icon: 'notifications' },
];
