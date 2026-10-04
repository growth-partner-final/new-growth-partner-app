import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { routes } from './routes/config';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { RulesSection } from './components/RulesSection';
import { EarningsCalculator } from './components/EarningsCalculator';
import { ActivationRewards } from './components/ActivationRewards';
import { RecurringShare } from './components/RecurringShare';
import { MilestoneLadder } from './components/MilestoneLadder';
import { PartnerLeaderboard } from './components/PartnerLeaderboard';
import { FraudNotice } from './components/FraudNotice';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { ApplicationModal } from './components/ApplicationModal';
import { SupportModal } from './components/SupportModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';

function AppLayout({ children }: { children: React.ReactNode }) {
  const { registeredPartner, signOut } = useAuth();
  const [isApplyOpen, setIsApplyOpen] = React.useState(false);
  const [isSupportOpen, setIsSupportOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#fcf9f4] text-[#1c1c19] font-sans">
      <Header 
        onOpenApply={() => setIsApplyOpen(true)} 
        onOpenSupport={() => setIsSupportOpen(true)} 
        registeredPartner={registeredPartner} 
        onLogout={signOut} 
      />
      <div className="flex-1 w-full max-w-full flex pt-14 sm:pt-16 pb-20 md:pb-8">
        {!isHomePage && (
          <Sidebar 
            onLogout={signOut}
            partnerName={registeredPartner?.name}
            partnerId={registeredPartner?.partnerId}
          />
        )}
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && (child as any).type === 'div' && ((child as any).props['data-landing-wrapper'] || (child as any).props.className?.includes('min-h-[calc(100vh-64px)]') || (child as any).props.className?.includes('max-w-7xl'))) {
              // This is the root landing page div, we need to pass the state down
              return React.cloneElement(child as React.ReactElement<any>, {
                children: React.Children.map((child as any).props.children, innerChild => {
                  if (React.isValidElement(innerChild)) {
                    if (innerChild.type === HeroSection) {
                      return React.cloneElement(innerChild as React.ReactElement<any>, {
                        onOpenApply: () => setIsApplyOpen(true),
                        onScrollToCalculator: () => scrollToSection('calculator'),
                        onNavigateToDashboard: () => navigate('/dashboard'),
                        onNavigateToSalonIntelligence: () => navigate('/salon-intelligence'),
                        onNavigateToLeaderboard: () => navigate('/partner/leaderboard'),
                        onNavigateToMilestones: () => navigate('/partner/rewards'),
                        registeredPartner
                      });
                    }
                    if (innerChild.type === FinalCTA) {
                      return React.cloneElement(innerChild as React.ReactElement<any>, {
                        onOpenApply: () => setIsApplyOpen(true),
                        onOpenSupport: () => setIsSupportOpen(true)
                      });
                    }
                  }
                  return innerChild;
                })
              });
            }
            return child;
          })}
        </main>
      </div>
      <BottomNav
        onOpenApply={() => setIsApplyOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onScrollToCalculator={() => scrollToSection('calculator')}
        onScrollToFAQ={() => scrollToSection('faq')}
      />
      
      {/* Modals */}
      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        currentPartner={registeredPartner}
        onRegisterSuccess={() => {}}
      />
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <div data-landing-wrapper="true" className="w-full max-w-full mx-auto px-3 sm:px-6 lg:px-12 py-4 sm:py-8">
                <HeroSection onOpenApply={() => {}} onScrollToCalculator={() => {}} />
                <div className="mt-8 sm:mt-16">
                  <HowItWorks />
                </div>
                <div className="mt-8 sm:mt-16">
                  <RulesSection />
                </div>
                <div className="mt-8 sm:mt-16">
                  <EarningsCalculator />
                </div>
                <div className="mt-8 sm:mt-16">
                  <ActivationRewards />
                </div>
                <div className="mt-8 sm:mt-16">
                  <RecurringShare />
                </div>
                <div className="mt-8 sm:mt-16">
                  <MilestoneLadder />
                </div>
                <div className="mt-8 sm:mt-16">
                  <PartnerLeaderboard />
                </div>
                <div className="mt-8 sm:mt-16">
                  <FraudNotice />
                </div>
                <div className="mt-8 sm:mt-16">
                  <FAQSection />
                </div>
                <div className="mt-8 sm:mt-16">
                  <FinalCTA onOpenApply={() => {}} onOpenSupport={() => {}} />
                </div>
              </div>
            </AppLayout>
          } />
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <AppLayout>
                  <route.component />
                </AppLayout>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
