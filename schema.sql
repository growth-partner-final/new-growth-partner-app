-- ==============================================================================
-- NEXORA GROWTH PARTNER — PRODUCTION DATABASE SCHEMA (PostgreSQL / Supabase)
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. ENUMS
-- ------------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM ('partner', 'admin');
CREATE TYPE kyc_status AS ENUM ('unverified', 'pending', 'verified', 'rejected');
CREATE TYPE salon_onboarding_status AS ENUM ('lead', 'contacted', 'verified', 'activated');
CREATE TYPE claim_status AS ENUM ('pending', 'approved', 'dispatched', 'delivered', 'rejected');
CREATE TYPE transaction_type AS ENUM ('activation_bonus', 'recurring_commission', 'referral_bonus');
CREATE TYPE transaction_status AS ENUM ('pending', 'credited', 'withdrawn');
CREATE TYPE withdrawal_status AS ENUM ('processing', 'completed', 'rejected');

-- ------------------------------------------------------------------------------
-- 2. TABLES
-- ------------------------------------------------------------------------------

-- Users / Growth Partners Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(120) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    referral_code VARCHAR(30) UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'partner',
    kyc_status kyc_status NOT NULL DEFAULT 'unverified',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Salons / Merchants (Referred Entities) Table
CREATE TABLE salons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(150) NOT NULL,
    owner_name VARCHAR(120) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255),
    address TEXT NOT NULL,
    city VARCHAR(80) NOT NULL,
    status salon_onboarding_status NOT NULL DEFAULT 'lead',
    registration_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    activated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Milestone Rewards Ladder Table
CREATE TABLE milestone_rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    required_active_shops INT UNIQUE NOT NULL,
    tier_name VARCHAR(80) NOT NULL,
    reward_asset_title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    display_order INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partner Milestone Claims Table
CREATE TABLE partner_milestone_claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    milestone_id UUID NOT NULL REFERENCES milestone_rewards(id) ON DELETE RESTRICT,
    status claim_status NOT NULL DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    tracking_number VARCHAR(100),
    claim_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    dispatched_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    UNIQUE(partner_id, milestone_id)
);

-- Earnings & Transactions Ledger Table
CREATE TABLE earnings_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    salon_id UUID REFERENCES salons(id) ON DELETE SET NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
    type transaction_type NOT NULL,
    status transaction_status NOT NULL DEFAULT 'pending',
    description VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Withdrawals & Payouts Table
CREATE TABLE withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    bank_details_json JSONB NOT NULL, -- e.g., { "account_number": "...", "ifsc": "...", "upi_id": "..." }
    status withdrawal_status NOT NULL DEFAULT 'processing',
    request_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    settlement_date TIMESTAMPTZ,
    reference_id VARCHAR(100)
);

-- ------------------------------------------------------------------------------
-- 3. INDEXES FOR PERFORMANCE
-- ------------------------------------------------------------------------------
CREATE INDEX idx_salons_partner_id ON salons(partner_id);
CREATE INDEX idx_salons_status ON salons(status);
CREATE INDEX idx_claims_partner_id ON partner_milestone_claims(partner_id);
CREATE INDEX idx_transactions_partner_id ON earnings_transactions(partner_id);
CREATE INDEX idx_transactions_status ON earnings_transactions(status);
CREATE INDEX idx_withdrawals_partner_id ON withdrawals(partner_id);

-- ------------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestone_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_milestone_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

-- Milestone Rewards are readable by everyone
CREATE POLICY "Public milestone rewards view" ON milestone_rewards
    FOR SELECT USING (true);

-- Partners can read and update their own user profile
CREATE POLICY "Users read own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Partners can manage their own referred salons
CREATE POLICY "Partners view own salons" ON salons
    FOR SELECT USING (auth.uid() = partner_id);

CREATE POLICY "Partners insert own salons" ON salons
    FOR INSERT WITH CHECK (auth.uid() = partner_id);

-- Partners can manage their milestone claims
CREATE POLICY "Partners view own claims" ON partner_milestone_claims
    FOR SELECT USING (auth.uid() = partner_id);

CREATE POLICY "Partners insert own claims" ON partner_milestone_claims
    FOR INSERT WITH CHECK (auth.uid() = partner_id);

-- Partners can view their earnings and withdrawals
CREATE POLICY "Partners view own transactions" ON earnings_transactions
    FOR SELECT USING (auth.uid() = partner_id);

CREATE POLICY "Partners view own withdrawals" ON withdrawals
    FOR SELECT USING (auth.uid() = partner_id);

CREATE POLICY "Partners request withdrawals" ON withdrawals
    FOR INSERT WITH CHECK (auth.uid() = partner_id);

-- ------------------------------------------------------------------------------
-- 5. INITIAL SEED DATA — 7 EXACT PHYSICAL ASSET MILESTONES
-- ------------------------------------------------------------------------------
INSERT INTO milestone_rewards (required_active_shops, tier_name, reward_asset_title, description, display_order)
VALUES 
(25,   'Level 1: Rising Star',      'Official Nexora T-Shirt',           'Certified Partner Welcome Merch Kit featuring 240 GSM organic cotton with official Nexora branding.', 1),
(50,   'Level 2: Associate',        'Samsung Tablet',                    'Samsung Galaxy Tab A9+ (5G + 128GB + Stylus) pre-configured with Nexora OS.', 2),
(100,  'Level 3: Manager',          'Branded HP Laptop',                 'HP AI ProBook / OmniBook Ultra Laptop with Next-Day On-Site Warranty.', 3),
(250,  'Level 4: Director',         'Electric Scooter',                  'Flagship Smart Electric Scooter (Ather 450X / Ola S1 Pro Gen 2) with fast charger.', 4),
(500,  'Level 5: Executive Leader', 'Latest iPhone',                     'Apple iPhone 16 Pro (256GB Titanium Edition) accompanied by 2-Year AppleCare+.', 5),
(750,  'Level 6: National Captain', 'Royal Enfield 350 CC',               'Royal Enfield Classic 350 CC (Chrome & Stealth Black) delivered with 5-year insurance.', 6),
(1000, 'Level 7: District Partner', 'District Partner SUV Car',          'Mahindra XUV700 AX7 / Hyundai Creta SUV handover with District Partner leadership tier.', 7)
ON CONFLICT (required_active_shops) DO UPDATE 
SET reward_asset_title = EXCLUDED.reward_asset_title,
    tier_name = EXCLUDED.tier_name,
    description = EXCLUDED.description;
