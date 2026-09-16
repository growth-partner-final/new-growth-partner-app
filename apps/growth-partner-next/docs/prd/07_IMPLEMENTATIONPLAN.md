# 07_IMPLEMENTATIONPLAN — Phase 0 boundary

Phase 0 establishes the production-buildable App Router baseline, strict environment lock, canonical Drizzle mappings, focused tests, documentation, and a read-only schema audit utility. It does not apply migrations, alter Supabase, import data, implement write workflows, or port the public UI.

Before later implementation, use additive and idempotent database changes; apply RLS through reviewed migrations; implement atomic payment/earning transactions; add immutable audit logging; and complete server-authoritative referral, KYC, settlement, and fraud workflows. The exact original Nexora pink reward poster is required before Phase 1 public UI work.
