export const BUSINESS_RULES = {
  MIN_DAILY_QR_COLLECTION: 1000,
  COMPANY_COMMISSION_PERCENT: 10,
  MIN_DAILY_COMMISSION: 100,
  QUALIFICATION_DAYS: 15,
  ONBOARDING_REWARD_PERCENT_OF_COMMISSION: 10,
  RECURRING_SHARE: {
    MONTHS_1_TO_6: 10,
    MONTHS_7_TO_12: 5,
    AFTER_12_MONTHS: 2,
  },
  MILESTONES: [
    { qualifying: 25, verified: 26, reward: 'Official Nexora T-Shirt' },
    { qualifying: 50, verified: 51, reward: 'Samsung Tablet' },
    { qualifying: 100, verified: 101, reward: 'Branded HP Laptop' },
    { qualifying: 250, verified: 251, reward: 'Electric Scooter' },
    { qualifying: 500, verified: 501, reward: 'Latest iPhone' },
    { qualifying: 750, verified: 751, reward: 'Royal Enfield 350 CC' },
    { qualifying: 1000, verified: 1001, reward: 'District Partner SUV Car' },
  ],
  WITHDRAWAL: {
    MIN: 1000,
    MAX: 50000,
  },
  DISCLAIMER: "Rewards are subject to verified performance, KYC, genuine settled transactions, fraud clearance, availability and programme terms."
};
