# 03_APPFLOW — program flow

1. A signed-in user is identified through the shared Supabase Auth profile.
2. An approved Growth Partner shares their unique referral code.
3. Server-side validation resolves that code and creates immutable attribution;
   client-supplied partner IDs are never trusted.
4. The shop completes onboarding, KYC, QR activation, settlement checks, and fraud verification.
5. Each genuine business day with at least ₹1,000 QR collection contributes to a 15-consecutive-day streak. Refunds, reversals, duplicate shops, self-payments, circular payments, and artificial transactions fail.
6. On the first completed window, company commission is 10% of collection and the one-time onboarding reward is 10% of company commission: ₹15,000 → ₹1,500 → ₹150; ₹50,000 → ₹5,000 → ₹500.
7. Recurring growth share is separate: 10% in months 1–6, 5% in months 7–12, and 2% after month 12, subject to active status, settlement, compliance, and programme rules.
8. Genuine qualifying-shop counts unlock reviewable milestone claims; rewards remain subject to approval, availability, KYC, settlement, fraud clearance, and applicable tax/document rules.
