import { MilestoneLevel, ActivationTier, FAQItem } from '../types';

export const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida/AEtjO1XZxTb-KtdsPjo0U0odHwDY485hRuwmfDBk7sy7hvncIa4xg3AdjCaLVTut6pSuuRiQJj_3YtSdqJ3TLo2klHSJMNebL6mVq0uWtOhluaULb7Cy_34No2AloAlRtDCW1-HCFGFyKGQkrv2OMGEMkXFJpEFLcxUma8v2Z1hXG0pFOlEix77UvOTw-NfNuX20oyBgVrPL--0n2ZNjrI0vKNBImBop03G0p3fTT3hR_Chdf05d_h_ZbzfoKQ",
  poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP0qskITNIqq7z0SlWIz3ym5hqcLI5u3jGdCrtsgzwH_ddwwsiRttJJGi2Jls2SXtJVsDrtG13IVr7OYHUBQDYXM20p-TyITQpme4TBSwxUoysCeIgHUET4dEjbtFXp3XK8lpPl_HEmyb3HnlEK8mMg5EyBbNm8v_D8mMawkIKt1ZkzR4G6gMvkOnkM4GJ4t8oRxybkjSquXiZqz9xjRuql0BBwYwt2abZFCTeDW0R7SANQfoT4QSb"
};

export const ACTIVATION_TIERS: ActivationTier[] = [
  {
    id: 'standard',
    name: 'Standard Client',
    subtitle: 'Retail & Beginner Account',
    payout: '₹1,500',
    payoutNum: 1500,
    icon: 'badge',
    features: ['Instant KYC Verification', 'Direct Bank / UPI Credit', 'Standard Analytics Dashboard']
  },
  {
    id: 'pro',
    name: 'Pro Trader Tier',
    badge: 'लोकप्रिय (Popular)',
    subtitle: 'High Frequency Active Trader',
    payout: '₹3,500',
    payoutNum: 3500,
    icon: 'workspace_premium',
    features: ['High-volume trader onboarding', 'Extra 5% recurring bonus boost', 'Dedicated account manager']
  },
  {
    id: 'enterprise',
    name: 'Enterprise Onboarding',
    subtitle: 'Corporate & Ultra HNI',
    payout: '₹10,000',
    payoutNum: 10000,
    icon: 'domain',
    features: ['Portfolio size ₹25L+', 'Priority direct RTGS settlement', 'VIP partner access']
  }
];

export const MILESTONE_LEVELS: MilestoneLevel[] = [
  {
    id: 'l1',
    level: 1,
    name: 'Level 1: Rising Star',
    subtitle: 'शुरुआती लक्ष्य (Starter)',
    cashBonus: '₹5,000 Cash',
    cashBonusNum: 5000,
    perks: 'Direct Instant Bonus',
    clientsRequired: 5,
    colorClass: 'bg-secondary-container/60 text-primary-container',
    icon: 'star'
  },
  {
    id: 'l2',
    level: 2,
    name: 'Level 2: Associate',
    subtitle: '+ Revenue Share शुरू',
    cashBonus: '₹10,000 Bonus',
    cashBonusNum: 10000,
    perks: '+ 5% Monthly Recurring',
    clientsRequired: 15,
    colorClass: 'bg-secondary-container/60 text-primary-container',
    icon: 'military_tech'
  },
  {
    id: 'l3',
    level: 3,
    name: 'Level 3: Manager',
    subtitle: 'Enhanced Revenue Pool',
    cashBonus: '₹25,000 Bonus',
    cashBonusNum: 25000,
    perks: '+ Priority Support Desk',
    clientsRequired: 35,
    colorClass: 'bg-secondary-container/60 text-primary-container',
    icon: 'leaderboard'
  },
  {
    id: 'l4',
    level: 4,
    name: 'Level 4: Director',
    subtitle: 'Growth Acceleration',
    cashBonus: '₹75,000 Bonus',
    cashBonusNum: 75000,
    perks: '+ Growth Revenue Boost',
    clientsRequired: 75,
    colorClass: 'bg-secondary-container/60 text-primary-container',
    icon: 'trending_up'
  },
  {
    id: 'l5',
    level: 5,
    name: 'Level 5: Vice President',
    subtitle: 'Premium Revenue Tier',
    cashBonus: '₹1,50,000 Cash',
    cashBonusNum: 150000,
    perks: '+ Leadership Pool Share',
    clientsRequired: 150,
    colorClass: 'bg-secondary-container/60 text-primary-container',
    icon: 'diamond'
  },
  {
    id: 'l6',
    level: 6,
    name: 'Level 6: President',
    subtitle: 'Elite Revenue Network',
    cashBonus: '₹3,00,000 Cash',
    cashBonusNum: 300000,
    perks: '+ Elite Turnover %',
    clientsRequired: 300,
    colorClass: 'bg-primary-container text-on-primary',
    icon: 'award_star'
  },
  {
    id: 'l7',
    level: 7,
    name: 'Level 7: Global Ambassador',
    subtitle: 'Nexora Luxury Club Member',
    cashBonus: '₹5,00,000 Cash',
    cashBonusNum: 500000,
    perks: '+ Ultimate Lifetime Recurring',
    clientsRequired: 600,
    highlight: true,
    colorClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    icon: 'crown'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'क्या Nexora पार्टनर बनने के लिए कोई इन्वेस्टमेंट चाहिए?',
    answer: 'बिल्कुल नहीं! Nexora Growth Partner Program 100% Free है। आपको ₹1 भी खर्च करने की ज़रूरत नहीं है। कोई जॉइनिंग फीस या हिडन चार्जेस नहीं हैं।'
  },
  {
    id: 'faq-2',
    question: 'पेआउट कब और कैसे मिलता है?',
    answer: 'हर सोमवार को आपका वीकली पेआउट सीधे आपके रजिस्टर्ड बैंक अकाउंट या UPI आईडी में ऑटो-क्रेडिट हो जाता है। आप डैशबोर्ड पर हर सेकंड की अर्निंग रियल-टाइम ट्रैक कर सकते हैं।'
  },
  {
    id: 'faq-3',
    question: 'क्या इसे पार्ट-टाइम किया जा सकता है?',
    answer: 'हाँ! आप अपनी वर्तमान नौकरी, बिज़नेस या पढ़ाई के साथ पार्ट-टाइम दिन में 1-2 घंटे देकर भी आसानी से अच्छी इनकम जनरेट कर सकते हैं। कोई वर्किंग ऑवर्स की पाबंदी नहीं है।'
  },
  {
    id: 'faq-4',
    question: 'मुझे ट्रेनिंग और सपोर्ट कैसे मिलेगा?',
    answer: 'जॉइन करते ही आपको एक डेडिकेटेड पार्टनर मैनेजर असाइन किया जाता है। इसके अलावा फ्री वीडियो ट्रेनिंग, प्रेजेंटेशन मटीरियल, रेडी-टू-शेयर पोस्टर्स और 7-डेज़ व्हाट्सएप सपोर्ट मिलता है।'
  },
  {
    id: 'faq-5',
    question: 'क्लाइंट्स को ऑनबोर्ड कैसे करना है?',
    answer: 'साइन अप के तुरंत बाद आपको एक एक्सक्लूसिव डिजिटल रेफरल लिंक और क्यूआर कोड मिलता है। जब भी कोई आपके लिंक से खाता खोलता है, वह तुरंत आपके पार्टनर डैशबोर्ड में एक्टिवेट हो जाता है।'
  },
  {
    id: 'faq-6',
    question: 'क्या टीडीएस (TDS) काटा जाता है?',
    answer: 'हाँ, सरकारी नियमों (Income Tax Act) के अनुसार वैध पैन कार्ड पर 5% TDS काटा जाता है और तिमाही फॉर्म 16A सीधे आपके ईमेल पर भेजा जाता है जिसे आप टैक्स रिटर्न में क्लेम कर सकते हैं।'
  }
];
