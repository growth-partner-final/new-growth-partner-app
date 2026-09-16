# 05_SCHEMA — canonical data mapping

Phase 0 maps exactly `profiles`, `growth_partners`, `partner_referrals`, `salons`, `organizations`, `organization_members`, `shop_onboarding_applications`, `shop_attributions`, `commission_plans`, `commission_plan_versions`, `commission_events`, `partner_shop_daily_qualification`, `partner_shop_onboarding_rewards`, `partner_reward_milestones`, `partner_reward_claims`, `template_handoffs`, and `payments`.

The partner record has its ID, Auth profile reference, unique referral code, status, and timestamps. Partner earnings and pending balances are derived from the canonical commission ledger and payment status in integer paise rather than a competing table. A salon stores business/owner identity, phone, optional email, onboarding and KYC state; attribution links it to the referring partner.

Payment ingestion must retain a unique transaction ID, salon reference, amount in paise, company commission in paise, payment/settlement state, refund/reversal flags, and transaction timestamp in the canonical payment integration. A partner earning is represented by `commission_events` with partner, salon, source payment reference where applicable, type, paise amount, status, idempotency protection, and timestamps. Additive, idempotent database changes are reserved for later phases.
