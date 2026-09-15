import React, { useState } from 'react';
import { STANDARD_REFERRAL_CODE } from '../services/partnerService';

export const QualificationPolicyBox: React.FC = () => (
  <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] text-xs text-[#594047] space-y-2">
    <div className="font-bold text-[#1c1c19] text-sm flex items-center gap-1.5">
      <span>🛡️</span>
      <span>Official Qualification &amp; Reward Policy</span>
    </div>
    <p>
      <strong>Qualifying Salon Standard:</strong> Every qualifying salon requires minimum ₹1,000 genuine QR business per day for 15 consecutive days. Minimum 15-day QR business is ₹15,000. Company commission is 10%, minimum ₹1,500.
    </p>
    <p>
      <strong>One-Time Onboarding Reward:</strong> Partner receives 10% of the company’s eligible settled commission from the shop’s first 15 qualifying days.
      <br />
      • ₹15,000 QR business → ₹1,500 company commission → <strong>₹150 partner reward</strong>.
      <br />
      • ₹50,000 QR business → ₹5,000 company commission → <strong>₹500 partner reward</strong>.
    </p>
  </div>
);

// Route 2: /partner/login
export const PartnerLoginView: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('/partner/dashboard');
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-2xl border border-[#e5e2dd] shadow-lg space-y-5">
      <div className="text-center space-y-1">
        <span className="text-xs font-extrabold uppercase text-[#b1005e] tracking-wider">Nexora Growth Partner</span>
        <h1 className="text-2xl font-extrabold text-[#1c1c19]">Partner Portal Login</h1>
        <p className="text-xs text-[#594047]">Enter your credentials to access your partner dashboard &amp; referral performance.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#1c1c19] mb-1">Registered Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="partner@example.com"
            required
            className="w-full text-xs p-3 rounded-xl border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#1c1c19] mb-1">Account Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full text-xs p-3 rounded-xl border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <button type="button" onClick={() => onNavigate('/partner/forgot-password')} className="text-[#b1005e] font-bold hover:underline">
            Forgot Password?
          </button>
          <button type="button" onClick={() => onNavigate('/partner/application-status')} className="text-[#594047] hover:underline">
            Check Application Status
          </button>
        </div>
        <button
          type="submit"
          className="w-full min-h-[44px] py-3 rounded-xl bg-[#b1005e] text-white font-bold text-xs shadow-md hover:bg-[#8e004a] transition-all"
        >
          Sign In to Partner Portal
        </button>
      </form>
      <div className="pt-3 border-t border-[#e5e2dd] text-center text-xs text-[#594047]">
        Don't have an account yet?{' '}
        <button onClick={() => onNavigate('/partner/signup')} className="text-[#b1005e] font-bold hover:underline">
          Apply as Growth Partner
        </button>
      </div>
    </div>
  );
};

// Route 3: /partner/signup
export const PartnerSignupView: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('/partner/application-status');
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-2xl border border-[#e5e2dd] shadow-lg space-y-5">
      <div className="text-center space-y-1">
        <span className="text-xs font-extrabold uppercase text-[#b1005e] tracking-wider">Join Growth Partner Network</span>
        <h1 className="text-2xl font-extrabold text-[#1c1c19]">Partner Enrollment Application</h1>
        <p className="text-xs text-[#594047]">Enroll to receive your unique referral code: <strong className="font-mono text-[#b1005e]">{STANDARD_REFERRAL_CODE}</strong></p>
      </div>

      <QualificationPolicyBox />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#1c1c19] mb-1">Full Legal Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full legal name"
            required
            className="w-full text-xs p-3 rounded-xl border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#1c1c19] mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="partner@example.com"
              required
              className="w-full text-xs p-3 rounded-xl border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1c1c19] mb-1">Mobile Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              required
              className="w-full text-xs p-3 rounded-xl border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#1c1c19] mb-1">Primary Operating City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Bengaluru / Mumbai / Delhi"
            required
            className="w-full text-xs p-3 rounded-xl border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full min-h-[44px] py-3 rounded-xl bg-[#b1005e] text-white font-bold text-xs shadow-md hover:bg-[#8e004a] transition-all"
        >
          Submit Partner Application
        </button>
      </form>
      <div className="pt-3 border-t border-[#e5e2dd] text-center text-xs text-[#594047]">
        Already enrolled?{' '}
        <button onClick={() => onNavigate('/partner/login')} className="text-[#b1005e] font-bold hover:underline">
          Log in here
        </button>
      </div>
    </div>
  );
};

// Route 4: /partner/forgot-password
export const PartnerForgotPasswordView: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-2xl border border-[#e5e2dd] shadow-lg space-y-5">
      <div className="text-center space-y-1">
        <span className="text-xs font-extrabold uppercase text-[#b1005e] tracking-wider">Account Recovery</span>
        <h1 className="text-2xl font-extrabold text-[#1c1c19]">Reset Partner Password</h1>
        <p className="text-xs text-[#594047]">Enter your registered email to receive a password reset link.</p>
      </div>

      {sent ? (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs text-center space-y-3">
          <p className="font-bold">Password Reset Instructions Sent!</p>
          <p>If an account exists for <strong>{email}</strong>, a reset link has been dispatched.</p>
          <button
            onClick={() => onNavigate('/partner/login')}
            className="px-4 py-2 rounded-xl bg-[#b1005e] text-white font-bold text-xs"
          >
            Return to Partner Login
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1c1c19] mb-1">Registered Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="partner@example.com"
              required
              className="w-full text-xs p-3 rounded-xl border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full min-h-[44px] py-3 rounded-xl bg-[#b1005e] text-white font-bold text-xs shadow-md hover:bg-[#8e004a] transition-all"
          >
            Send Reset Link
          </button>
        </form>
      )}

      <div className="pt-3 border-t border-[#e5e2dd] text-center text-xs text-[#594047]">
        <button onClick={() => onNavigate('/partner/login')} className="text-[#b1005e] font-bold hover:underline">
          Back to Login
        </button>
      </div>
    </div>
  );
};

// Route 5: /partner/application-status
export const PartnerApplicationStatusView: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-2xl border border-[#e5e2dd] shadow-lg space-y-6">
      <div className="text-center space-y-1">
        <span className="text-xs font-extrabold uppercase text-[#b1005e] tracking-wider">Application Tracking</span>
        <h1 className="text-2xl font-extrabold text-[#1c1c19]">Partner Application Status</h1>
        <p className="text-xs text-[#594047]">Real-time review &amp; KYC verification status for your growth partner registration.</p>
      </div>

      <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#1c1c19]">Application ID:</span>
          <span className="font-mono text-[#b1005e] font-bold">APP-DEV-2025</span>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span className="font-bold text-[#1c1c19]">Assigned Referral Code:</span>
          <span className="font-mono text-[#b1005e] font-bold">{STANDARD_REFERRAL_CODE}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#1c1c19]">Verification Status:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
            Verified Partner [DEV SAMPLE]
          </span>
        </div>
      </div>

      <QualificationPolicyBox />

      <div className="flex gap-3">
        <button
          onClick={() => onNavigate('/partner/dashboard')}
          className="flex-1 min-h-[44px] py-3 rounded-xl bg-[#b1005e] text-white font-bold text-xs text-center shadow-md hover:bg-[#8e004a]"
        >
          Go to Partner Dashboard
        </button>
        <button
          onClick={() => onNavigate('/partner/referral-code')}
          className="flex-1 min-h-[44px] py-3 rounded-xl bg-[#f0ede9] text-[#1c1c19] font-bold text-xs text-center border border-[#e5e2dd]"
        >
          View Referral Code
        </button>
      </div>
    </div>
  );
};

// Route 15: /onboard/login
export const OnboardLoginView: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [salonEmail, setSalonEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('/onboard/details');
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-2xl border border-[#e5e2dd] shadow-lg space-y-5">
      <div className="text-center space-y-1">
        <span className="text-xs font-extrabold uppercase text-[#b1005e] tracking-wider">Nexora Salon Onboarding</span>
        <h1 className="text-2xl font-extrabold text-[#1c1c19]">Salon Merchant Login</h1>
        <p className="text-xs text-[#594047]">Access your salon merchant setup, booking tools &amp; QR settlement suite.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#1c1c19] mb-1">Salon Owner Email / Phone</label>
          <input
            type="text"
            value={salonEmail}
            onChange={(e) => setSalonEmail(e.target.value)}
            placeholder="salon@example.com / +91 98765 43210"
            required
            className="w-full text-xs p-3 rounded-xl border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#1c1c19] mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full text-xs p-3 rounded-xl border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full min-h-[44px] py-3 rounded-xl bg-[#b1005e] text-white font-bold text-xs shadow-md hover:bg-[#8e004a] transition-all"
        >
          Merchant Login
        </button>
      </form>
      <div className="pt-3 border-t border-[#e5e2dd] text-center text-xs text-[#594047]">
        New salon owner?{' '}
        <button onClick={() => onNavigate('/onboard/signup')} className="text-[#b1005e] font-bold hover:underline">
          Register Salon Merchant Account
        </button>
      </div>
    </div>
  );
};
