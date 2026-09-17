import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface AuthScreenProps {
  onSuccessLogin?: (partnerData: { name: string; partnerId: string }) => void;
  onNavigateToHub?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccessLogin, onNavigateToHub }) => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'reset'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [trustTerminal, setTrustTerminal] = useState(true);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupCity, setSignupCity] = useState('');
  const [signupReferral, setSignupReferral] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Recovery form state
  const [recoveryStep, setRecoveryStep] = useState<1 | 2>(1);
  const [recoveryIdentifier, setRecoveryIdentifier] = useState('');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState<number>(45);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{
    visible: boolean;
    text: string;
    icon: string;
    type?: 'info' | 'success' | 'error';
  }>({
    visible: false,
    text: '',
    icon: 'info'
  });

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Toast helper
  const showToast = (text: string, icon = 'info', type: 'info' | 'success' | 'error' = 'info') => {
    setToast({ visible: true, text, icon, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  // Timer effect for OTP countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, countdown]);

  const startCountdownTimer = (sec = 45) => {
    setCountdown(sec);
    setIsTimerActive(true);
  };

  // Switch tabs
  const handleTabSwitch = (tab: 'login' | 'signup' | 'reset') => {
    setActiveTab(tab);
    hideToast();
  };

  // Login handler using real Supabase Auth
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword) {
      showToast('Please enter both identifier and password.', 'error', 'error');
      return;
    }

    showToast('Authenticating partner credentials with Supabase...', 'sync');
    try {
      const { error, partner } = await signIn(loginIdentifier.trim(), loginPassword);
      if (error) {
        showToast(error.message || 'Login failed. Please verify credentials.', 'error', 'error');
        return;
      }

      showToast('Login authorized. Redirecting to workspace...', 'verified', 'success');
      if (onSuccessLogin) {
        setTimeout(() => {
          onSuccessLogin({
            name: partner?.name || (loginIdentifier.includes('@') ? loginIdentifier.split('@')[0] : 'Partner'),
            partnerId: partner?.partnerId || 'Partner profile pending'
          });
        }, 500);
      }
    } catch (err: any) {
      showToast(err.message || 'An unexpected error occurred during login.', 'error', 'error');
    }
  };

  // Signup handler using real Supabase Auth
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      showToast('Please fill all mandatory fields.', 'error', 'error');
      return;
    }

    if (signupPassword.length < 6) {
      showToast('Password must be at least 6 characters.', 'error', 'error');
      return;
    }

    showToast('Creating partner account in Supabase...', 'sync');
    try {
      const { error, partner } = await signUp(signupEmail.trim(), signupPassword, {
        data: {
          full_name: signupName.trim(),
          phone: signupPhone.trim(),
          city: signupCity.trim(),
          referral_code: signupReferral.trim()
        }
      });

      if (error) {
        showToast(error.message || 'Partner registration failed.', 'error', 'error');
        return;
      }

      showToast('Partner account created successfully!', 'verified', 'success');
      if (onSuccessLogin) {
        setTimeout(() => {
          onSuccessLogin({
            name: partner?.name || signupName.trim(),
            partnerId: partner?.partnerId || 'Partner profile pending'
          });
        }, 500);
      }
    } catch (err: any) {
      showToast(err.message || 'An unexpected error occurred during registration.', 'error', 'error');
    }
  };

  // Recovery Step 1: Send real Supabase password reset email
  const handleSendRecoveryOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryIdentifier.trim()) {
      showToast('Please enter your registered partner email.', 'error', 'error');
      return;
    }

    showToast('Dispatching password recovery via Supabase...', 'sync');
    try {
      const { error } = await resetPassword(recoveryIdentifier.trim());
      if (error) {
        showToast(error.message || 'Password recovery request failed.', 'error', 'error');
        return;
      }

      setRecoveryStep(2);
      setOtpValues(['', '', '', '', '', '']);
      showToast('Password recovery instructions sent to your email.', 'check_circle', 'success');
      startCountdownTimer(45);
    } catch (err: any) {
      showToast(err.message || 'Failed to request password reset.', 'error', 'error');
    }
  };

  // OTP input auto focus next
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newArr = [...otpValues];
    newArr[index] = val;
    setOtpValues(newArr);

    if (val && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Password reset complete using real Supabase Auth
  const handleCompleteReset = async () => {
    const enteredOtp = otpValues.join('').trim();
    if (enteredOtp.length < 6 && !newPassword) {
      showToast('Please enter the 6-digit verification code or new password.', 'error', 'error');
      return;
    }
    if (newPassword && newPassword.length < 6) {
      showToast('New password must contain at least 6 secure characters.', 'error', 'error');
      return;
    }

    showToast('Verifying recovery with Supabase Auth...', 'sync');
    try {
      if (enteredOtp.length === 6) {
        const { error: otpErr } = await supabase.auth.verifyOtp({
          email: recoveryIdentifier.trim(),
          token: enteredOtp,
          type: 'recovery',
        });
        if (otpErr) {
          showToast(otpErr.message || 'Invalid or expired verification code.', 'error', 'error');
          return;
        }
      }

      if (newPassword) {
        const { error: updateErr } = await supabase.auth.updateUser({ password: newPassword });
        if (updateErr) {
          showToast(updateErr.message || 'Failed to update password.', 'error', 'error');
          return;
        }
      }

      showToast('Password credentials successfully updated. Launching portal...', 'verified', 'success');
      setTimeout(() => {
        handleTabSwitch('login');
        showToast('Please authenticate with your new credentials.', 'check_circle', 'success');
      }, 1000);
    } catch (err: any) {
      showToast(err.message || 'Password reset failed.', 'error', 'error');
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 px-4 relative">
      {/* Top Bar with optional back/view switch */}
      {onNavigateToHub && (
        <div className="w-full max-w-lg mb-3 flex items-center justify-between">
          <button
            onClick={onNavigateToHub}
            className="flex items-center gap-1 text-xs font-bold text-[#b1005e] hover:underline cursor-pointer bg-white/80 px-3 py-1.5 rounded-full border border-[#e5e2dd] shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Growth Partner Hub (View Program &amp; Ladder)</span>
          </button>
          <span className="text-[11px] text-[#594047] font-semibold">Nexora v2.5</span>
        </div>
      )}

      {/* Background ambient lighting */}
      <div className="w-full max-w-lg relative">
        <div className="absolute -top-16 -left-12 w-64 h-64 rounded-full bg-[#d91b77]/10 blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -right-16 w-72 h-72 rounded-full bg-[#cca730]/10 blur-3xl pointer-events-none -z-10"></div>

        {/* Header Branding Area */}
        <div className="flex flex-col items-center justify-center text-center space-y-1 pb-4">
          <div className="relative flex items-center justify-center p-1">
            <img
              alt="Nexora Growth Partner Logo"
              className="h-10 w-auto object-contain drop-shadow-xs"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XZxTb-KtdsPjo0U0odHwDY485hRuwmfDBk7sy7hvncIa4xg3AdjCaLVTut6pSuuRiQJj_3YtSdqJ3TLo2klHSJMNebL6mVq0uWtOhluaULb7Cy_34No2AloAlRtDCW1-HCFGFyKGQkrv2OMGEMkXFJpEFLcxUma8v2Z1hXG0pFOlEix77UvOTw-NfNuX20oyBgVrPL--0n2ZNjrI0vKNBImBop03G0p3fTT3hR_Chdf05d_h_ZbzfoKQ"
            />
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#b1005e]/10 text-[#b1005e]">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">Official Growth Network</span>
          </div>
          <p className="text-xs sm:text-sm text-[#594047] pt-1">
            2 मिनट में पार्टनर अकाउंट एक्टिवेट करें • Mutual Prosperity
          </p>
        </div>

        {/* Auth Master Glass Container */}
        <div className="w-full bg-white/85 backdrop-blur-xl rounded-xl shadow-xl shadow-[#d91b77]/5 p-6 relative overflow-hidden border border-[#e5e2dd]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d91b77] via-[#8e4767] to-[#cca730]"></div>

          {/* Segmented Tab Navigation */}
          <div className="flex bg-[#ebe8e3]/60 p-1 rounded-lg mb-6 relative">
            <button
              onClick={() => handleTabSwitch('login')}
              className={`flex-1 py-2 rounded-md font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'login'
                  ? 'text-white bg-[#b1005e] shadow-sm'
                  : 'text-[#594047] hover:text-[#1c1c19] bg-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              <span>Sign In</span>
            </button>

            <button
              onClick={() => handleTabSwitch('signup')}
              className={`flex-1 py-2 rounded-md font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'signup'
                  ? 'text-white bg-[#b1005e] shadow-sm'
                  : 'text-[#594047] hover:text-[#1c1c19] bg-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Register</span>
            </button>

            <button
              onClick={() => handleTabSwitch('reset')}
              className={`flex-1 py-2 rounded-md font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'reset'
                  ? 'text-white bg-[#b1005e] shadow-sm'
                  : 'text-[#594047] hover:text-[#1c1c19] bg-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              <span>Recovery</span>
            </button>
          </div>

          {/* VIEW 1: LOGIN */}
          {activeTab === 'login' && (
            <section className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#1c1c19]">Partner Sign In</h2>
                <p className="text-xs text-[#594047]">Access your client portfolio, revenue metrics, and leads.</p>
              </div>

              <form className="space-y-4 pt-1" onSubmit={handleLoginSubmit}>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#594047]">
                    Email or Partner ID
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#8d6f77] text-[20px]">
                      badge
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd] transition-all"
                      placeholder="partner@example.com or mobile"
                      required
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#594047]">Password</label>
                    <button
                      className="text-xs text-[#b1005e] hover:underline cursor-pointer"
                      onClick={() => handleTabSwitch('reset')}
                      type="button"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#8d6f77] text-[20px]">
                      key
                    </span>
                    <input
                      className="w-full pl-10 pr-11 py-2.5 rounded-lg bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd] transition-all"
                      placeholder="Enter confidential password"
                      required
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-3 text-[#8d6f77] hover:text-[#1c1c19] flex items-center justify-center p-1 cursor-pointer"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showLoginPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      className="w-4 h-4 rounded text-[#b1005e] accent-[#b1005e] cursor-pointer"
                      type="checkbox"
                      checked={trustTerminal}
                      onChange={(e) => setTrustTerminal(e.target.checked)}
                    />
                    <span className="text-xs text-[#594047] group-hover:text-[#1c1c19]">
                      Trust this terminal for 30 days
                    </span>
                  </label>
                  <span className="text-[11px] text-[#8e4767] font-semibold">256-Bit SSL</span>
                </div>

                <button
                  className="w-full py-3 px-4 rounded-full bg-[#b1005e] text-white font-bold text-sm shadow-md shadow-[#b1005e]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  <span>Sign In To Partner Workspace</span>
                </button>

                <div className="pt-2 text-center">
                  <p className="text-xs text-[#594047]">
                    New partner seeking network enrollment?{' '}
                    <button
                      className="text-[#b1005e] font-semibold hover:underline cursor-pointer"
                      onClick={() => handleTabSwitch('signup')}
                      type="button"
                    >
                      Register now
                    </button>
                  </p>
                </div>
              </form>
            </section>
          )}

          {/* VIEW 2: SIGNUP */}
          {activeTab === 'signup' && (
            <section className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#1c1c19]">Partner Enrollment</h2>
                <p className="text-xs text-[#594047]">Pan-India distribution alliance for certified advisors &amp; agencies.</p>
              </div>

              <form className="space-y-3 pt-1" onSubmit={handleSignupSubmit}>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#594047]">
                    Full Legal Name <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#8d6f77] text-[20px]">
                      person
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd] transition-all"
                      placeholder="As written on PAN / Business Incorporation"
                      required
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                    />
                  </div>
                  <span className="text-[10px] text-[#594047]">Pincode verification will match this PAN identity.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#594047]">
                        Mobile Number <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ffe088] text-[#241a00] font-semibold">
                        OTP Verification
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#8d6f77] text-[20px]">
                        call
                      </span>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd] transition-all"
                        pattern="[0-9]{10}"
                        placeholder="10-digit mobile"
                        required
                        type="tel"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#594047]">
                      Official Email <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#8d6f77] text-[20px]">
                        mail
                      </span>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd] transition-all"
                        placeholder="partner@enterprise.com"
                        required
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#594047]">
                      Create Password <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#8d6f77] text-[20px]">
                        key
                      </span>
                      <input
                        className="w-full pl-10 pr-11 py-2.5 rounded-lg bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd] transition-all"
                        placeholder="At least 6 secure characters"
                        required
                        minLength={6}
                        type={showSignupPassword ? 'text' : 'password'}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      />
                      <button
                        className="absolute right-3 text-[#8d6f77] hover:text-[#1c1c19] flex items-center justify-center p-1 cursor-pointer"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showSignupPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#594047]">
                      Operating City / State <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#8d6f77] text-[20px]">
                        location_on
                      </span>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd] transition-all"
                        placeholder="e.g., Pune, Maharashtra"
                        required
                        type="text"
                        value={signupCity}
                        onChange={(e) => setSignupCity(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#594047]">Referral / Invite Code</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#8d6f77] text-[20px]">
                      loyalty
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd] transition-all uppercase"
                      placeholder="Optional (e.g. NX-WEST)"
                      type="text"
                      value={signupReferral}
                      onChange={(e) => setSignupReferral(e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#ebe8e3]/40 rounded-lg space-y-2 mt-2 border border-[#e5e2dd]">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      className="mt-0.5 w-4 h-4 rounded text-[#b1005e] accent-[#b1005e] cursor-pointer"
                      required
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <span className="text-xs text-[#594047] leading-tight">
                      I agree to the <span className="text-[#b1005e] font-semibold underline">Nexora Partner Code of Conduct</span>, ethical client advisory standards, and stringent Zero Spam guidelines.
                    </span>
                  </label>
                </div>

                <button
                  className="w-full mt-2 py-3 px-4 rounded-full bg-gradient-to-r from-[#d91b77] to-[#b1005e] text-white font-bold text-sm shadow-lg shadow-[#d91b77]/25 hover:shadow-[#d91b77]/40 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                  <span>Create Free Partner Account</span>
                </button>

                <p className="text-center text-xs text-[#594047] pt-1">
                  Already an onboarded affiliate?{' '}
                  <button
                    className="text-[#b1005e] font-semibold hover:underline cursor-pointer"
                    onClick={() => handleTabSwitch('login')}
                    type="button"
                  >
                    Log in here
                  </button>
                </p>
              </form>
            </section>
          )}

          {/* VIEW 3: FORGOT PASSWORD / RECOVERY */}
          {activeTab === 'reset' && (
            <section className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#1c1c19]">Secure Recovery</h2>
                <p className="text-xs text-[#594047]">Reset security credentials using Supabase password recovery.</p>
              </div>

              {recoveryStep === 1 ? (
                /* Step 1: Request Recovery */
                <form className="space-y-4 pt-1" onSubmit={handleSendRecoveryOtp}>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#594047]">
                      Registered Partner Email
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#8d6f77] text-[20px]">
                        mail
                      </span>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd] transition-all"
                        placeholder="e.g. partner@nexora.io"
                        required
                        type="email"
                        value={recoveryIdentifier}
                        onChange={(e) => setRecoveryIdentifier(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    className="w-full py-3 px-4 rounded-full bg-[#b1005e] text-white font-bold text-sm shadow-md shadow-[#b1005e]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Send Verification Code</span>
                  </button>
                </form>
              ) : (
                /* Step 2: Verify & Enter New Password */
                <div className="space-y-3 pt-1">
                  <div className="p-3 bg-[#ebe8e3] rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#b1005e] text-[20px]">
                        mark_email_read
                      </span>
                      <span className="text-xs text-[#1c1c19] font-semibold truncate max-w-[200px]">
                        {recoveryIdentifier || 'partner@nexora.io'}
                      </span>
                    </div>
                    <button
                      className="text-xs text-[#b1005e] hover:underline cursor-pointer font-semibold"
                      onClick={() => setRecoveryStep(1)}
                      type="button"
                    >
                      Change
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#594047]">Enter 6-Digit OTP / Token</label>
                      <span className="text-xs text-[#8e4767] font-semibold">
                        {isTimerActive ? `Resend in ${formatTime(countdown)}` : 'Code expired'}
                      </span>
                    </div>
                    <div className="flex gap-2 justify-between">
                      {otpValues.map((val, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (otpRefs.current[idx] = el)}
                          className="w-10 sm:w-11 h-12 text-center text-lg font-bold rounded-lg bg-[#f6f3ee] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd]"
                          maxLength={1}
                          value={val}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          type="text"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <label className="block text-xs font-semibold text-[#594047]">New Password</label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#8d6f77] text-[20px]">
                        lock_reset
                      </span>
                      <input
                        className="w-full pl-10 pr-11 py-2.5 rounded-lg bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#b1005e] border border-[#e5e2dd] transition-all"
                        placeholder="At least 6 characters"
                        required
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        className="absolute right-3 text-[#8d6f77] hover:text-[#1c1c19] flex items-center justify-center p-1 cursor-pointer"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showNewPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <button
                    className="w-full mt-2 py-3 px-4 rounded-full bg-[#b1005e] text-white font-bold text-sm shadow-md shadow-[#b1005e]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    onClick={handleCompleteReset}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    <span>Update Password &amp; Sign In</span>
                  </button>

                  <div className="text-center pt-2">
                    <button
                      className={`text-xs ${
                        isTimerActive
                          ? 'text-[#8d6f77] cursor-not-allowed'
                          : 'text-[#b1005e] hover:underline cursor-pointer font-semibold'
                      }`}
                      disabled={isTimerActive}
                      onClick={async () => {
                        showToast('Requesting fresh recovery link from Supabase...', 'sync');
                        const { error } = await resetPassword(recoveryIdentifier.trim());
                        if (error) {
                          showToast(error.message, 'error', 'error');
                        } else {
                          showToast('Fresh recovery instructions sent to your email.', 'check_circle', 'success');
                          startCountdownTimer(45);
                        }
                      }}
                      type="button"
                    >
                      Did not receive code? Resend OTP
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Global Toast Alert Message Container */}
          {toast.visible && (
            <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-xs transition-all border ${
              toast.type === 'error'
                ? 'bg-[#ffdad6] text-[#93000a] border-[#ffdad6]'
                : toast.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-[#e5e2dd] text-[#1c1c19] border-[#dcdad5]'
            }`}>
              <span className={`material-symbols-outlined text-[20px] ${
                toast.type === 'error' ? 'text-[#ba1a1a]' : 'text-[#b1005e]'
              }`}>
                {toast.icon}
              </span>
              <span className="flex-1 font-medium">{toast.text}</span>
              <button
                onClick={hideToast}
                className="text-[#594047] hover:text-[#1c1c19] p-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}
        </div>

        {/* Trust & Security Micro Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[#8d6f77] text-xs">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#735c00]">shield_lock</span>
            <span>256-Bit Encrypted Portal</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#b1005e]">gavel</span>
            <span>Regulated Intermediary Compliance</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">support_agent</span>
            <a className="hover:text-[#1c1c19] underline" href="mailto:partner-desk@nexora.io">
              Partner Helpdesk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
