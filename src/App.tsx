import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
  const isHomePage = location.pathname === '/';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-dvh w-full flex flex-col overflow-x-hidden overflow-y-hidden bg-[#fcf9f4] text-[#1c1c19] font-sans">
      <Header 
        onOpenApply={() => setIsApplyOpen(true)} 
        onOpenSupport={() => setIsSupportOpen(true)} 
        registeredPartner={registeredPartner} 
        onLogout={signOut} 
      />
      <div className="flex-1 w-full flex overflow-hidden pt-[64px]">
        {!isHomePage && (
          <Sidebar 
            onLogout={signOut}
            partnerName={registeredPartner?.name}
            partnerId={registeredPartner?.partnerId}
          />
        )}
        <main className="flex-1 w-full overflow-y-auto overflow-x-hidden overscroll-contain">
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && (child as any).type === 'div' && ((child as any).props['data-landing-wrapper'] || (child as any).props.className?.includes('min-h-[calc(100vh-64px)]') || (child as any).props.className?.includes('max-w-7xl'))) {
              // This is the root landing page div, we need to pass the state down
              return React.cloneElement(child as React.ReactElement<any>, {
                children: React.Children.map((child as any).props.children, innerChild => {
                  if (React.isValidElement(innerChild)) {
                    if (innerChild.type === HeroSection) {
                      return React.cloneElement(innerChild as React.ReactElement<any>, {
                        onOpenApply: () => setIsApplyOpen(true),
                        onScrollToCalculator: () => scrollToSection('calculator')
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
      <BottomNav onOpenSupport={() => setIsSupportOpen(true)} />
      
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
              <div data-landing-wrapper="true" className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 md:py-12 min-h-[calc(100vh-64px)]">
                <HeroSection onOpenApply={() => {}} onScrollToCalculator={() => {}} />
                <div className="mt-16 sm:mt-24">
                  <HowItWorks />
                </div>
                <div className="mt-16 sm:mt-24">
                  <RulesSection />
                </div>
                <div className="mt-16 sm:mt-24">
                  <EarningsCalculator />
                </div>
                <div className="mt-16 sm:mt-24">
                  <ActivationRewards />
                </div>
                <div className="mt-16 sm:mt-24">
                  <RecurringShare />
                </div>
                <div className="mt-16 sm:mt-24">
                  <MilestoneLadder />
                </div>
                <div className="mt-16 sm:mt-24">
                  <PartnerLeaderboard />
                </div>
                <div className="mt-16 sm:mt-24">
                  <FraudNotice />
                </div>
                <div className="mt-16 sm:mt-24">
                  <FAQSection />
                </div>
                <div className="mt-16 sm:mt-24">
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
