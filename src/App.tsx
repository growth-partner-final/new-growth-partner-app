import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-[#fcf9f4] text-[#1c1c19] font-sans">
      <Header 
        onOpenApply={() => setIsApplyOpen(true)} 
        onOpenSupport={() => setIsSupportOpen(true)} 
        registeredPartner={registeredPartner} 
        onLogout={signOut} 
      />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          onLogout={signOut}
          partnerName={registeredPartner?.name}
          partnerId={registeredPartner?.partnerId}
        />
        <main className="flex-1 overflow-y-auto overscroll-contain">
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && (child as any).type === 'div' && (child as any).props.className?.includes('max-w-2xl')) {
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
              <div className="max-w-2xl mx-auto w-full p-4">
                <HeroSection onOpenApply={() => {}} onScrollToCalculator={() => {}} />
                <HowItWorks />
                <RulesSection />
                <EarningsCalculator />
                <ActivationRewards />
                <RecurringShare />
                <MilestoneLadder />
                <FraudNotice />
                <FAQSection />
                <FinalCTA onOpenApply={() => {}} onOpenSupport={() => {}} />
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
