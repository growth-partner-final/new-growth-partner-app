import React, { useState, useMemo } from 'react';
import { NotificationBell } from './NotificationBell';

interface SalonWebsiteTemplatesScreenProps {
  onNavigateToHub?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToShareEarn?: () => void;
  onNavigateToAddSalon?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToMerchantRegister?: () => void;
  onNavigateToLockedOnboarding?: () => void;
  onNavigateToStepAuditWorkspace?: () => void;
  onNavigateToMobileFastTrack?: () => void;
}

interface TemplateItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'hair' | 'spa' | 'barber' | 'nail';
  categoryLabel: string;
  rating: number;
  reviewsCount: string;
  description: string;
  image: string;
  imageAlt: string;
  topBadge: string;
  metricBadge: string;
  deviceBadge: string;
  features: string[];
  featureTags: string[];
  setupFee: string;
  setupBenefit: string;
  velocityMetric: string;
  velocityLabel: string;
  popularRank: number;
  velocityRank: number;
  newestRank: number;
  ratingRank: number;
  heroTag: string;
  heroHeadline: string;
  heroDescription: string;
  mockServices: Array<{
    name: string;
    description: string;
    duration: string;
    tag: string;
    price: string;
  }>;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'velvet-aura',
    title: 'Velvet Aura — Luxury Unisex Salon',
    subtitle: 'Hair & Luxury Editorial',
    category: 'hair',
    categoryLabel: 'Luxury Hair Studio',
    rating: 4.98,
    reviewsCount: '320+ Salons',
    description:
      'Tailored for premium hair design studios. Features champagne gold accents, live Instagram carousel integration, instant UPI checkout, and stylist chair preference selection.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_OF6Ik5rJdnzXXd4aws97Fiw26yNai2LZD_bpWEluygbU9ll7HC46cbnfOnhxmPURkYyoqSkgc0_HPDsL-dCKgOeSEFeenk69sR8hO4H8Tk9ReU90d6k3s7YmJd_Z5TAc4_d7JMTdFp6YkPUNaBWesxeRu3OsA5YM-7D7hog_6TldEeDZMOfvY-wX145BgfEZ-vi52Mk-0bMcEQqus-Rvky4Q2vbyZkO0ihFrkngYl-nh0oPweVru',
    imageAlt:
      'Editorial photograph of an opulent luxury salon interior with warm ambient cove lighting, velvet rose chairs, brass and gold trimmed mirror stations.',
    topBadge: 'Most Popular',
    metricBadge: '99.4% Booking Conversion',
    deviceBadge: 'Ultra-Responsive PWA',
    features: ['Gold Accent Theme', 'Instagram Feed API', 'Instant UPI Razorpay', 'Stylist Slot Picker'],
    featureTags: ['upi', 'whatsapp', 'portfolio', 'chairs'],
    setupFee: '₹0',
    setupBenefit: 'w/ Partner Launch',
    velocityMetric: '2.4s',
    velocityLabel: 'Avg Checkout',
    popularRank: 1,
    velocityRank: 1,
    newestRank: 3,
    ratingRank: 1,
    heroTag: 'Award-Winning Salon • Bandra West, Mumbai',
    heroHeadline: 'Haute Coiffure & Bespoke Color Artistry.',
    heroDescription:
      'Curated by international master colorists. Experience scalp therapies, signature Balayage, and restorative keratin ritual treatments in an atmosphere of refined indulgence.',
    mockServices: [
      {
        name: 'Kérastase Fusio-Dose Treatment',
        description: 'Concentrated active booster tailored to individual fiber nourishment needs.',
        duration: '45 mins',
        tag: 'Includes Blowout',
        price: '₹2,850'
      },
      {
        name: 'Precision Master Cut & Finish',
        description: 'Sculpted to bone structure with luxury head massage and customized styling.',
        duration: '60 mins',
        tag: 'Director Stylist',
        price: '₹1,950'
      },
      {
        name: 'Olaplex Bond Rebuilding Therapy',
        description: 'Patented chemistry restores broken disulfide bonds post-bleach or heat.',
        duration: '50 mins',
        tag: 'Scalp Tonic Free',
        price: '₹3,400'
      },
      {
        name: 'Full Balayage + Gloss Glaze',
        description: 'Seamless hand-painted dimensional highlights with toner and deep treatment.',
        duration: '180 mins',
        tag: 'Best Seller',
        price: '₹7,200'
      }
    ]
  },
  {
    id: 'botanica-wellness',
    title: 'Botanica Wellness & Organic Spa',
    subtitle: 'Wellness & Therapy',
    category: 'spa',
    categoryLabel: 'Wellness Spa & Ayurvedic',
    rating: 4.92,
    reviewsCount: '180+ Spas',
    description:
      'Earthy minimalism with gentle organic palette. Features structured aromatherapy treatment menus, deposit pre-payment locks to eliminate cancellations, and multi-therapist room allocation.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUsH1LD6I3Jo7To78gP2XcPIpY7UH27rXaLzreWW-y0bDCkfsdGCn-o6afPN8q6vEefQu1V5EU0OdHgJaO5Y5Ze2Rt3yh70cqv5Lh9YwQF3AD6eVYVIIgFGGaobFtEAz_3uTFxD_x0gjlA1Cy6AM4uOs_-rxg8RVTRrsC0U5OCOX-6LS2dmSZ58ZKF03tFnIC24RmEmNOc4HbCJpEjBaT5L5O9X87JLW11aWEGCVsHhZpgyW3VSWbX',
    imageAlt:
      'Serene organic ayurvedic spa sanctuary with warm limestone walls, smooth river rocks, cascading water wall, bamboo accents.',
    topBadge: 'Ayurvedic & Holistic',
    metricBadge: '42% Upsell Rate',
    deviceBadge: 'Multi-Room Sync',
    features: ['Earthy Minimalism', 'Deposit Pre-pay Lock', 'Aroma Treatment Menu', 'Multi-Room Calendar'],
    featureTags: ['upi', 'whatsapp', 'chairs'],
    setupFee: '100% Free',
    setupBenefit: 'Domain Included',
    velocityMetric: '3.1s',
    velocityLabel: 'Room Reservation',
    popularRank: 3,
    velocityRank: 4,
    newestRank: 2,
    ratingRank: 4,
    heroTag: 'Holistic Sanctuary • Indiranagar, Bengaluru',
    heroHeadline: 'Ancient Ayurvedic Healing for Modern Minds.',
    heroDescription:
      'Indulge in authentic Abhyanga therapies, herbal steam baths, and botanical scalp infusions formulated from organic cold-pressed botanicals.',
    mockServices: [
      {
        name: 'Royal Shirodhara & Scalp Elixir',
        description: 'Continuous warm herbal oil stream over third-eye chakra to dissolve anxiety.',
        duration: '60 mins',
        tag: 'Herbal Infusion',
        price: '₹3,600'
      },
      {
        name: 'Deep Muscle Ayurvedic Potli Massage',
        description: 'Warm herbal poultice massage relieving deep neuromuscular knots.',
        duration: '75 mins',
        tag: 'Signature Therapy',
        price: '₹4,200'
      },
      {
        name: 'Botanical Radiance Ubtan Facial',
        description: 'Saffron, sandalwood, and raw honey facial scrub for deep luminescence.',
        duration: '60 mins',
        tag: 'Organic Glow',
        price: '₹2,900'
      },
      {
        name: 'Full Body Panchakarma Detox Ritual',
        description: 'Complete restorative detox with steam therapy and rejuvenating herbal tea.',
        duration: '120 mins',
        tag: 'Holistic Best Seller',
        price: '₹6,800'
      }
    ]
  },
  {
    id: 'crown-blade',
    title: 'Crown & Blade — Modern Grooming Lounge',
    subtitle: 'Gentlemen & Modern Barbering',
    category: 'barber',
    categoryLabel: 'Barbershop & Grooming',
    rating: 4.95,
    reviewsCount: '210+ Barbers',
    description:
      'Crisp, masculine contrast UI tuned for swift mobile bookings. Equipped with barber chair speed rebooking, automatic recurring cuts, and contactless digital loyalty cards.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Rh84CMksVg_RtVv6_n_lOIKKkK8O9gaMeu7bbg9twVLTJGcaGU9vIrKPdi6TGWnG61-i_72G7us4ExAEPA7o9AHbrNirDo3UtZEdT51Lrr75_aJqnNqbF1god9R6ykz4cnZUcZzVfadkmn5eYb3mmDeVjijwTpND-e0xCJEa_0jFNajRPGdqCaVej0-W99JVDynfN2DRjOgg_8kZKWVah0NkUmOSw02_ioi0Wmj96kHIB5g36Nf_',
    imageAlt:
      'Sophisticated modern luxury barbershop lounge with dark charcoal and espresso timber interior, industrial matte black fixtures.',
    topBadge: 'Dark Mode Luxury',
    metricBadge: '87% Repeat Retention',
    deviceBadge: 'Digital Punch Card',
    features: ['High-Contrast Dark Theme', 'Quick Repeat Booking', 'Barber Master Showcase', 'Loyalty Punch Card'],
    featureTags: ['upi', 'whatsapp', 'chairs'],
    setupFee: '14 Days',
    setupBenefit: 'Avg Cadence',
    velocityMetric: '1.8s',
    velocityLabel: '1-Tap Rebook',
    popularRank: 2,
    velocityRank: 2,
    newestRank: 4,
    ratingRank: 3,
    heroTag: 'Craft Barbering • Connaught Place, New Delhi',
    heroHeadline: 'Precision Fades, Straight-Razor Shaves & Bourbon.',
    heroDescription:
      'A sanctuary of traditional craftsmanship with modern edge. Enjoy hot-towel straight-razor beard sculpts, executive trims, and charcoal skin tonics.',
    mockServices: [
      {
        name: 'The Executive Cut & Beard Sculpt',
        description: 'Director scissor craft, straight razor line-up, and aromatic beard oil finish.',
        duration: '50 mins',
        tag: 'Complimentary Beverage',
        price: '₹1,450'
      },
      {
        name: 'Hot Towel Traditional Turkish Shave',
        description: 'Multi-layer hot towel prep with badger brush lather and cold stone closing.',
        duration: '35 mins',
        tag: 'Straight Razor',
        price: '₹950'
      },
      {
        name: 'Charcoal Scalp Detox & Fade',
        description: 'Exfoliating charcoal scrub removing buildup paired with high skin fade.',
        duration: '55 mins',
        tag: 'Scalp Refresh',
        price: '₹1,800'
      },
      {
        name: 'Gentleman Grooming Full Package',
        description: 'Signature cut, luxury beard ritual, charcoal facial, and styling balm.',
        duration: '90 mins',
        tag: 'VIP Experience',
        price: '₹3,200'
      }
    ]
  },
  {
    id: 'glow-couture',
    title: 'Glow Couture — Nail & Skin Clinic',
    subtitle: 'Aesthetics & Nail Bar',
    category: 'nail',
    categoryLabel: 'Nail Bar & Aesthetics',
    rating: 4.97,
    reviewsCount: '290+ Clinics',
    description:
      'Pastel glass aesthetic with interactive treatment consultation steps. Features a split-view before/after comparison gallery, skin type intake questionnaire, and retail product checkout add-ons.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUOVkaS1iUaxMYowkXR50e5S_wKZFHevc-nek6KJyLQQuG1BJgdLuVIeyWsTYx8mf1HOyO0Z1YdZo_ePxBI4nQzHNaSBHcTZxdfP4j61FmgSxpTWU5Fh1lXcD-WJyGUXYzpgET-sUnSBeDYxM7gYzg1gMPi9M-oufUcTfiifUbaBArkjtaur3uPu9NS2Ao9XLGhpsFcf54Ik6L28X_wMeuuSK-cascKSx9CAaTSeBcH2f75PDeIGAA',
    imageAlt:
      'High fashion nail bar and medical aesthetic skin clinic lounge with soft rose quartz counters, glowing neon script.',
    topBadge: 'Aesthetics & Nails',
    metricBadge: '+₹480 Avg Basket Size',
    deviceBadge: 'Intake Form Engine',
    features: ['Interactive Before/After', 'Skin Health Intake Form', 'Retail Skincare Add-on', 'UPI Razorpay / GPay'],
    featureTags: ['upi', 'whatsapp', 'portfolio'],
    setupFee: '+34%',
    setupBenefit: 'Post-Service Addon',
    velocityMetric: '2.1s',
    velocityLabel: 'Visual Add-on',
    popularRank: 4,
    velocityRank: 3,
    newestRank: 1,
    ratingRank: 2,
    heroTag: 'Aesthetic Clinic • Jubilee Hills, Hyderabad',
    heroHeadline: 'Bespoke Nail Artistry & Clinical Glow Therapies.',
    heroDescription:
      'Where medical-grade skin therapies meet high-fashion nail couture. Japanese gel extensions, Hydra-facials, and laser dermal rejuvenation.',
    mockServices: [
      {
        name: 'Japanese Gel Chrome Extensions',
        description: 'Hand-sculpted lightweight gel tips with reflective mirror chrome finish.',
        duration: '90 mins',
        tag: 'Long Lasting 4+ Wks',
        price: '₹3,400'
      },
      {
        name: 'Hydra-Glow Medical Facial Infusion',
        description: 'Vortex suction cleansing with customized hyaluronic and antioxidant serums.',
        duration: '60 mins',
        tag: 'Instant Red Carpet Glow',
        price: '₹4,800'
      },
      {
        name: 'Luxury Rose Quartz Spa Pedicure',
        description: 'Rose petal foot soak, organic scrub, hot stone massage, and gel lacquer.',
        duration: '60 mins',
        tag: 'Aromatherapy Soak',
        price: '₹2,200'
      },
      {
        name: 'Glass Skin Laser Tone Therapy',
        description: 'Non-ablative rejuvenation targeting pigmentation and tightening skin pores.',
        duration: '45 mins',
        tag: 'Dermatologist Guided',
        price: '₹5,500'
      }
    ]
  }
];

export const SalonWebsiteTemplatesScreen: React.FC<SalonWebsiteTemplatesScreenProps> = ({
  onNavigateToHub,
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToReferralTimeline,
  onNavigateToShareEarn,
  onNavigateToAddSalon,
  onNavigateToDashboard,
  onNavigateToMerchantRegister,
  onNavigateToLockedOnboarding,
  onNavigateToStepAuditWorkspace,
  onNavigateToMobileFastTrack
}) => {
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('popular');

  // Preview Modal State
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [launchSuccessModal, setLaunchSuccessModal] = useState<TemplateItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter & Sort Logic
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(item => {
      const matchSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchTag = !selectedTag || item.featureTags.includes(selectedTag);

      return matchSearch && matchCat && matchTag;
    }).sort((a, b) => {
      if (sortOption === 'velocity') return a.velocityRank - b.velocityRank;
      if (sortOption === 'newest') return a.newestRank - b.newestRank;
      if (sortOption === 'rating') return a.ratingRank - b.ratingRank;
      return a.popularRank - b.popularRank; // 'popular'
    });
  }, [searchTerm, selectedCategory, selectedTag, sortOption]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTag(null);
    setSortOption('popular');
  };

  const handleSelectAndLaunch = (template: TemplateItem) => {
    setLaunchSuccessModal(template);
  };

  return (
    <div className="bg-[#fcf9f4] font-sans text-[#1c1c19] min-h-screen flex flex-col justify-between relative selection:bg-[#fda4c9]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10 max-w-md text-center">
          <span className="material-symbols-outlined text-[18px] text-[#ffe088]">check_circle</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Fixed Header */}
      <header className="fixed top-8 sm:top-7 inset-x-0 z-40 bg-[#fcf9f4]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-b border-[#e5e2dd]">
        <div className="h-20 w-full px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-2.5 bg-transparent border-0 p-0 text-left cursor-pointer hover:opacity-90"
              title="Return to Main Home Landing Page"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#b1005e] to-[#d91b77] text-white flex items-center justify-center font-black text-lg shadow-sm">
                N
              </div>
              <span className="text-lg font-black text-[#1c1c19] tracking-tight hidden sm:inline-block">
                Nexora
              </span>
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-[11px] font-extrabold uppercase tracking-wider border border-[#fda4c9]/60">
                Growth Partner
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 text-[#594047] text-xs font-semibold">
              <button
                onClick={() => onNavigateToHub && onNavigateToHub()}
                className="hover:text-[#b1005e] transition-colors cursor-pointer"
              >
                Portal
              </button>
              <span className="material-symbols-outlined text-[#8d6f77] text-[16px]">chevron_right</span>
              <button
                onClick={() => onNavigateToSalonIntelligence && onNavigateToSalonIntelligence()}
                className="hover:text-[#b1005e] transition-colors cursor-pointer"
              >
                Salon Launchpad
              </button>
              <span className="material-symbols-outlined text-[#8d6f77] text-[16px]">chevron_right</span>
              <span className="text-[#1c1c19] font-bold">Website Templates</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#594047] bg-white hover:bg-[#ebe8e3] hover:text-[#b1005e] border border-[#e5e2dd] transition-all cursor-pointer shadow-xs active:scale-95"
              title="Return to Main Home Landing Page"
            >
              <span className="material-symbols-outlined text-[16px] text-[#b1005e]">home</span>
              <span>Home</span>
            </button>
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6f3ee] text-[#594047] text-xs font-semibold border border-[#e5e2dd]">
              <span className="material-symbols-outlined text-[#b1005e] text-[14px]">lock</span>
              <span className="font-mono">nexora.growth/portal/launchpad/templates</span>
              <span className="text-[#8d6f77] font-normal">(Clean URL)</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd9e2]/60 text-[#8e004a] text-xs font-bold shadow-2xs border border-[#fda4c9]/50">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>
                Referral Applied: <strong className="tracking-wide">REF-5A45019655</strong>
              </span>
            </div>

            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            <div className="w-9 h-9 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full pt-32 pb-24 bg-[#fcf9f4]">
        <div className="flex flex-col w-full space-y-6">
          {/* Clean Visual URL Bar & Obfuscated Token Security Strip */}
          <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2.5 sm:p-3 shadow-xs border border-[#e5e2dd] flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <div className="flex items-center gap-1.5 px-1 text-[#8d6f77]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e1bdc6]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e1bdc6]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e1bdc6]" />
                </div>
                <div className="flex-1 md:w-[480px] bg-[#f6f3ee] px-4 py-1.5 rounded-full flex items-center gap-2 text-[#594047] text-xs border border-[#e5e2dd]">
                  <span
                    className="material-symbols-outlined text-[#b1005e] text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    lock
                  </span>
                  <span className="text-[#1c1c19] font-bold">https://launch.nexora.app/templates/explore</span>
                  <span className="text-[#8d6f77] font-normal">?view=certified_preview</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end md:self-auto flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-bold border border-[#fda4c9]/60">
                  <span className="material-symbols-outlined text-[14px]">format_image_left</span>
                  <span>
                    Zero Internal IDs Exposed (Obfuscated Public Session Token:{' '}
                    <strong className="tracking-wider">NX-9984-OBF</strong>)
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[#735c00] text-xs font-extrabold px-1">
                  <span className="w-2 h-2 rounded-full bg-[#735c00] animate-ping" />
                  Direct White-Label Mirror
                </span>
              </div>
            </div>
          </section>

          {/* Hero Header & Search Section */}
          <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] overflow-hidden">
              {/* Atmospheric Glow Backdrop */}
              <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#b1005e]/5 blur-3xl pointer-events-none" />
              <div className="absolute -left-10 -bottom-10 w-72 h-72 rounded-full bg-[#cca730]/10 blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd9e2]/50 text-[#8e004a] text-xs font-bold mb-3 border border-[#fda4c9]/50">
                    <span className="material-symbols-outlined text-[#b1005e] text-[15px]">verified</span>
                    <span>Fintech-Certified Salon Architecture</span>
                    <span className="text-[#8d6f77]">/</span>
                    <span className="font-extrabold">Instant UPI Ready</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-[#1c1c19] tracking-tight leading-tight mb-3">
                    Select Your Salon Website &amp; Booking Template
                  </h1>
                  <p className="text-xs sm:text-base text-[#594047] leading-relaxed">
                    Engineered specifically for high-volume salons, wellness sanctuaries, and grooming lounges. Zero-latency checkout, automated WhatsApp confirmation workflows, and localized currency engines.
                  </p>
                </div>

                {/* Metric Pulse Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 min-w-[320px]">
                  <div className="p-4 rounded-2xl bg-[#f6f3ee] shadow-2xs border border-[#e5e2dd]">
                    <div className="text-[11px] text-[#594047] uppercase tracking-wider font-extrabold">
                      Avg. Checkout Speed
                    </div>
                    <div className="text-2xl font-black text-[#b1005e] mt-1">2.4s</div>
                    <div className="text-xs text-[#8e4767] font-bold flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px]">bolt</span> 4-Tap UPI Reserve
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] shadow-2xs border border-[#e5e2dd]">
                    <div className="text-[11px] text-[#594047] uppercase tracking-wider font-extrabold">
                      No-Show Reduction
                    </div>
                    <div className="text-2xl font-black text-[#735c00] mt-1">-42%</div>
                    <div className="text-xs text-[#594047] font-semibold flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px]">chat</span> Via Auto-Ping
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#d91b77] text-white shadow-[0_4px_16px_rgba(217,27,119,0.25)]">
                    <div className="text-[11px] text-white/80 uppercase tracking-wider font-bold">
                      Live Deploy Time
                    </div>
                    <div className="text-2xl font-black text-white mt-1">&lt; 15 Min</div>
                    <div className="text-xs text-white/95 font-semibold flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span> Instant DNS Sync
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Search & Category Pills */}
              <div className="mt-8 pt-6 border-t border-[#e5e2dd] flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-stretch gap-3">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8d6f77] text-[22px]">
                      search
                    </span>
                    <input
                      className="w-full bg-white text-[#1c1c19] pl-12 pr-12 py-3.5 rounded-full shadow-2xs text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#b1005e]/40 border border-[#e5e2dd] transition-all placeholder:text-[#8d6f77]"
                      placeholder="Search styles, categories, features (e.g. UPI, Instagram, Ayurveda, Barber)..."
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#594047] hover:text-[#1c1c19] font-bold px-2 py-1 rounded-full bg-[#ebe8e3] cursor-pointer"
                        type="button"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 md:flex-none">
                      <select
                        className="w-full md:w-56 appearance-none bg-white text-[#1c1c19] px-4 py-3.5 pr-10 rounded-full shadow-2xs text-xs sm:text-sm font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b1005e]/40 border border-[#e5e2dd]"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option value="popular">Sort: Most Popular</option>
                        <option value="velocity">Sort: Highest Booking Velocity</option>
                        <option value="newest">Sort: Newest Design (2025)</option>
                        <option value="rating">Sort: Top Stylist Rated</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#8d6f77] pointer-events-none text-[18px]">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {[
                    { id: 'all', label: 'All Categories', count: 24 },
                    { id: 'hair', label: 'Luxury Hair Studio', count: 8 },
                    { id: 'spa', label: 'Wellness Spa & Ayurvedic', count: 6 },
                    { id: 'nail', label: 'Nail Bar & Aesthetics', count: 5 },
                    { id: 'barber', label: 'Barbershop & Grooming', count: 5 }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#d91b77] text-white shadow-[0_2px_8px_rgba(217,27,119,0.25)]'
                          : 'bg-white text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] shadow-2xs border border-[#e5e2dd]'
                      }`}
                      type="button"
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                          selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-[#ebe8e3] text-[#594047]'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Secondary Feature Filter Tags */}
                <div className="flex items-center gap-2 flex-wrap pt-1 text-[#594047] text-xs">
                  <span className="text-[#8d6f77] uppercase tracking-wider text-[10px] font-bold mr-1">
                    Quick Filters:
                  </span>
                  {[
                    { tag: 'upi', label: 'Online UPI Booking', icon: 'currency_rupee', color: 'text-[#b1005e]' },
                    { tag: 'whatsapp', label: 'WhatsApp Automated Reminders', icon: 'chat', color: 'text-[#735c00]' },
                    { tag: 'portfolio', label: 'Stylist Portfolio Gallery', icon: 'photo_library', color: 'text-[#8e4767]' },
                    { tag: 'chairs', label: 'Multi-chair Scheduling', icon: 'chair', color: 'text-[#8e4767]' }
                  ].map(f => {
                    const isActive = selectedTag === f.tag;
                    return (
                      <button
                        key={f.tag}
                        onClick={() => setSelectedTag(isActive ? null : f.tag)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer border ${
                          isActive
                            ? 'bg-[#b1005e] text-white border-[#b1005e]'
                            : 'bg-[#f6f3ee] text-[#594047] hover:bg-[#ffd8e5] border-[#e5e2dd]'
                        }`}
                        type="button"
                      >
                        <span className={`material-symbols-outlined text-[13px] ${isActive ? 'text-white' : f.color}`}>
                          {f.icon}
                        </span>
                        <span>{f.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Active Results Status Bar */}
          <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-semibold text-[#594047]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-[#1c1c19] text-sm">{filteredTemplates.length}</span>
              <span>certified templates match your launch criteria</span>
              <span className="text-[#8d6f77]">•</span>
              <span className="text-[#b1005e] font-bold">Partner Tier: 2.2% Processing Discount Active</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-[#735c00] text-[16px]">bolt</span>
              <span>Handoff package bundles domain setup + UPI merchant gateway</span>
            </div>
          </section>

          {/* Large Interactive Template Cards Grid */}
          <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTemplates.map(template => (
                  <article
                    key={template.id}
                    className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(217,27,119,0.18)] transition-all duration-300 flex flex-col justify-between border border-[#e5e2dd]"
                  >
                    <div>
                      {/* Visual Media Container */}
                      <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-[#ebe8e3] mb-4 group-hover:shadow-md transition-all">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={template.image}
                          alt={template.imageAlt}
                          referrerPolicy="no-referrer"
                        />
                        {/* Badges Overlay */}
                        <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-[#b1005e] text-white text-xs font-black shadow-[0_2px_8px_rgba(177,0,94,0.4)] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              star
                            </span>
                            {template.topBadge}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#b1005e] text-xs font-bold shadow-xs">
                            {template.metricBadge}
                          </span>
                        </div>
                        {/* Viewport Simulation Quick Pill */}
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#31302d]/80 text-[#f3f0eb] backdrop-blur-md text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">devices</span>
                          <span>{template.deviceBadge}</span>
                        </div>
                      </div>

                      {/* Header & Rating */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-[#b1005e] font-extrabold block">
                            {template.subtitle}
                          </span>
                          <h2 className="text-lg sm:text-xl font-black text-[#1c1c19] group-hover:text-[#b1005e] transition-colors mt-0.5">
                            {template.title}
                          </h2>
                        </div>
                        <div className="flex items-center gap-1 bg-[#f6f3ee] px-2.5 py-1 rounded-full text-[#1c1c19] text-xs font-bold shadow-2xs border border-[#e5e2dd]">
                          <span className="material-symbols-outlined text-[#735c00] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          <strong className="font-black">{template.rating}</strong>
                          <span className="text-[#8d6f77] text-[10px]">({template.reviewsCount})</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#594047] mb-4 leading-relaxed">
                        {template.description}
                      </p>

                      {/* Feature Tag Matrix */}
                      <div className="flex items-center gap-1.5 flex-wrap mb-4">
                        {template.features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-full bg-[#ffd8e5]/70 text-[#3c0223] text-[11px] font-bold border border-[#fda4c9]/50"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="pt-3 flex items-center justify-between gap-3 bg-[#f6f3ee]/80 rounded-2xl p-3 border border-[#e5e2dd]">
                      <div className="flex flex-col pl-1">
                        <span className="text-[10px] text-[#8d6f77] uppercase font-bold">Setup Model</span>
                        <span className="text-sm sm:text-base font-black text-[#1c1c19]">
                          {template.setupFee}{' '}
                          <span className="text-xs font-normal text-[#594047]">
                            {template.setupBenefit}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setPreviewTemplate(template);
                            setViewportMode('desktop');
                          }}
                          className="px-4 py-2 rounded-full bg-white text-[#1c1c19] text-xs font-bold hover:bg-[#ebe8e3] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer border border-[#e5e2dd]"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          <span>Preview Live</span>
                        </button>
                        <button
                          onClick={() => handleSelectAndLaunch(template)}
                          className="px-5 py-2 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black transition-all shadow-[0_4px_16px_rgba(217,27,119,0.28)] flex items-center gap-1.5 cursor-pointer"
                          type="button"
                        >
                          <span>Select &amp; Launch</span>
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="w-full p-12 text-center bg-white rounded-3xl shadow-sm my-6 border border-[#e5e2dd]">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#8d6f77]">
                  <span className="material-symbols-outlined text-[32px]">manage_search</span>
                </div>
                <h3 className="text-lg font-black text-[#1c1c19] mb-1">No templates matched your filters</h3>
                <p className="text-xs text-[#594047] max-w-md mx-auto mb-4">
                  Try clearing your search terms or picking another category pill to browse all 24 verified salon design systems.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#d91b77] text-white text-xs font-bold cursor-pointer hover:bg-[#b1005e] transition-all"
                  type="button"
                >
                  Reset Search &amp; Filters
                </button>
              </div>
            )}
          </section>

          {/* Value Anchor: Why Nexora Salon Architecture */}
          <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd]">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <span className="text-xs uppercase tracking-wider text-[#b1005e] font-extrabold">
                  Fintech Architecture Backing
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19] mt-1">
                  Built for Instant Conversions, Not Just Pretty Looks
                </h2>
                <p className="text-xs sm:text-base text-[#594047] mt-2 leading-relaxed">
                  Every Nexora template is integrated with zero-redirect UPI payment links, real-time slot locking to prevent double bookings, and automated WhatsApp appointment reminders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#f6f3ee] flex flex-col gap-3 border border-[#e5e2dd]">
                  <div className="w-12 h-12 rounded-2xl bg-[#ffd8e5] flex items-center justify-center text-[#3c0223] shadow-2xs">
                    <span className="material-symbols-outlined text-[24px]">currency_rupee</span>
                  </div>
                  <h3 className="text-base font-black text-[#1c1c19]">Localized UPI &amp; Split Tipping</h3>
                  <p className="text-xs text-[#594047] leading-relaxed">
                    Clients pay booking advances directly through Google Pay, PhonePe, or Paytm. Tips route automatically to individual stylists' UPI handles without manual calculation.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#f6f3ee] flex flex-col gap-3 border border-[#e5e2dd]">
                  <div className="w-12 h-12 rounded-2xl bg-[#ffe088] flex items-center justify-center text-[#241a00] shadow-2xs">
                    <span className="material-symbols-outlined text-[24px]">send</span>
                  </div>
                  <h3 className="text-base font-black text-[#1c1c19]">WhatsApp Business API Engine</h3>
                  <p className="text-xs text-[#594047] leading-relaxed">
                    Instant booking confirmation with calendar invite attachment. Automatic reminder sent T-minus 2 hours before the slot with quick 1-tap reschedule link.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#f6f3ee] flex flex-col gap-3 border border-[#e5e2dd]">
                  <div className="w-12 h-12 rounded-2xl bg-[#ffd9e2] flex items-center justify-center text-[#8e004a] shadow-2xs">
                    <span className="material-symbols-outlined text-[24px]">speed</span>
                  </div>
                  <h3 className="text-base font-black text-[#1c1c19]">Edge-Cached CDN Performance</h3>
                  <p className="text-xs text-[#594047] leading-relaxed">
                    Sub-second page loads across mobile networks. Clean visual URL masking protects your salon client tokens from leaking across public browser sessions.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FULL-SCREEN INTERACTIVE PREVIEW MODAL / VIEWPORT SIMULATOR */}
      {previewTemplate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#31302d]/70 backdrop-blur-md flex flex-col animate-in fade-in duration-200"
        >
          {/* Modal Control Header */}
          <div className="w-full bg-white shadow-md px-4 sm:px-6 py-3 flex items-center justify-between gap-4 z-20 border-b border-[#e5e2dd]">
            {/* Left: Template Info & Token Status */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-1.5 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Back to Catalogue</span>
              </button>
              <div className="hidden sm:flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-[#1c1c19] leading-tight">
                    {previewTemplate.title}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ffd9e2] text-[#8e004a] text-[10px] uppercase font-black">
                    Live Replica
                  </span>
                </div>
                <span className="text-[#8d6f77] text-[11px] font-mono">
                  Protected Clean URL: https://launch.nexora.app/preview/{previewTemplate.id}
                </span>
              </div>
            </div>

            {/* Center: Viewport Switcher Toggles */}
            <div className="flex items-center bg-[#ebe8e3] p-1 rounded-full shadow-inner border border-[#e5e2dd]">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewportMode === 'desktop'
                    ? 'bg-white text-[#b1005e] shadow-xs'
                    : 'text-[#594047] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
                <span className="hidden md:inline">Desktop</span> (1440px)
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewportMode === 'mobile'
                    ? 'bg-white text-[#b1005e] shadow-xs'
                    : 'text-[#594047] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">smartphone</span>
                <span className="hidden md:inline">Mobile</span> (390px)
              </button>
            </div>

            {/* Right: Action CTA */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const t = previewTemplate;
                  setPreviewTemplate(null);
                  handleSelectAndLaunch(t);
                }}
                className="px-4 sm:px-6 py-2 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black transition-all shadow-[0_4px_16px_rgba(217,27,119,0.28)] flex items-center gap-2 cursor-pointer"
                type="button"
              >
                <span>Confirm &amp; Launch</span>
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              </button>
              <button
                aria-label="Close Preview"
                onClick={() => setPreviewTemplate(null)}
                className="w-9 h-9 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] flex items-center justify-center transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Modal Viewport Canvas Stage */}
          <div className="flex-1 w-full bg-[#dcdad5] overflow-y-auto overflow-x-hidden p-4 sm:p-6 flex justify-center items-start">
            {/* Simulated Device Frame Container */}
            <div
              className={`transition-all duration-300 ease-out w-full bg-white rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col my-auto border border-[#e5e2dd] ${
                viewportMode === 'mobile'
                  ? 'max-w-[390px] border-8 border-[#31302d] rounded-[38px]'
                  : 'max-w-[1280px]'
              }`}
            >
              {/* Simulated In-Device Chrome Bar */}
              <div className="w-full bg-[#ebe8e3] px-4 py-2 flex items-center justify-between text-[#594047] text-xs border-b border-[#e5e2dd]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ba1a1a]/70 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#cca730] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#fda4c9] inline-block" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-md text-[#1c1c19] text-[11px] font-mono shadow-2xs max-w-sm truncate border border-[#e5e2dd]">
                  <span className="material-symbols-outlined text-[#735c00] text-[14px]">lock</span>
                  <span>https://{previewTemplate.id}.nexora.in (Staging Mirror)</span>
                </div>
                <div className="flex items-center gap-2 text-[#8d6f77]">
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  <span className="material-symbols-outlined text-[16px]">share</span>
                </div>
              </div>

              {/* Rendered Mock Salon Website (Inside Simulator) */}
              <div className="w-full bg-[#fcf9f4] flex flex-col text-xs sm:text-sm text-[#1c1c19] overflow-hidden">
                {/* Mock Salon Nav */}
                <nav className="w-full bg-white px-5 py-3.5 flex items-center justify-between shadow-xs border-b border-[#e5e2dd]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b1005e] text-[24px]">content_cut</span>
                    <span className="text-sm sm:text-base font-black tracking-tight text-[#1c1c19]">
                      {previewTemplate.title.split('—')[0].trim().toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:flex items-center gap-5 text-xs font-semibold text-[#594047]">
                    <span className="hover:text-[#b1005e] cursor-pointer">Services &amp; Pricing</span>
                    <span className="hover:text-[#b1005e] cursor-pointer">Master Stylists</span>
                    <span className="hover:text-[#b1005e] cursor-pointer">Packages</span>
                    <span className="hover:text-[#b1005e] cursor-pointer">Reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => showToast('Simulated Booking Drawer: Ready for UPI checkout')}
                      className="px-3.5 py-1.5 rounded-full bg-[#d91b77] text-white text-xs font-extrabold shadow-xs flex items-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span>Book Slot</span>
                      <span className="material-symbols-outlined text-[15px]">calendar_today</span>
                    </button>
                  </div>
                </nav>

                {/* Mock Hero Section */}
                <div className="relative w-full py-8 sm:py-12 px-5 bg-[#f6f3ee] overflow-hidden border-b border-[#e5e2dd]">
                  <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd9e2] text-[#8e004a] text-[11px] font-bold mb-3 border border-[#fda4c9]/50">
                        <span className="material-symbols-outlined text-[14px]">star</span>
                        <span>{previewTemplate.heroTag}</span>
                      </div>
                      <h1 className="text-xl sm:text-3xl font-black text-[#1c1c19] leading-tight tracking-tight mb-2">
                        {previewTemplate.heroHeadline}
                      </h1>
                      <p className="text-xs sm:text-sm text-[#594047] mb-4 leading-relaxed">
                        {previewTemplate.heroDescription}
                      </p>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <button
                          onClick={() => showToast('Simulated Reserve: Advance UPI token ₹500')}
                          className="px-5 py-2.5 rounded-full bg-[#b1005e] text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">event_available</span>
                          <span>Reserve Slot (UPI ₹500)</span>
                        </button>
                        <div className="flex items-center gap-1 text-[#1c1c19] text-xs font-semibold bg-white px-3 py-1.5 rounded-full shadow-2xs border border-[#e5e2dd]">
                          <span
                            className="material-symbols-outlined text-[#735c00] text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <strong>4.9 / 5</strong>
                          <span className="text-[#8d6f77] text-[10px]">(1,420 Reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Hero Salon Showcase Photo Card */}
                    <div className="w-full md:w-64 rounded-2xl overflow-hidden shadow-md bg-white border border-[#e5e2dd] shrink-0">
                      <img
                        className="w-full h-48 object-cover"
                        src={previewTemplate.image}
                        alt="Salon Interior"
                        referrerPolicy="no-referrer"
                      />
                      <div className="p-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1c1c19]">Signature Package</span>
                        <span className="text-xs font-black text-[#b1005e]">₹4,999</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mock Service Menu with Live INR Pricing */}
                <div className="w-full max-w-4xl mx-auto px-5 py-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#b1005e] font-extrabold block">
                        Curated Offerings
                      </span>
                      <h2 className="text-base sm:text-lg font-black text-[#1c1c19]">Signature Service Menu</h2>
                    </div>
                    <span className="text-[11px] text-[#8d6f77]">All prices inclusive of 18% GST</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {previewTemplate.mockServices.map((srv, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white shadow-2xs flex items-start justify-between gap-3 hover:shadow-xs transition-shadow border border-[#e5e2dd]"
                      >
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#1c1c19]">{srv.name}</h4>
                          <p className="text-[11px] text-[#594047] mt-0.5 leading-relaxed">{srv.description}</p>
                          <div className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold text-[#8d6f77]">
                            <span>{srv.duration}</span>
                            <span>•</span>
                            <span className="text-[#735c00] font-bold">{srv.tag}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs sm:text-sm font-black text-[#b1005e]">{srv.price}</span>
                          <button
                            onClick={() => showToast(`Added "${srv.name}" to appointment booking drawer.`)}
                            className="mt-1 px-3 py-1 rounded-full bg-[#ffd9e2] text-[#8e004a] text-[10px] font-black block ml-auto cursor-pointer hover:bg-[#fda4c9]"
                            type="button"
                          >
                            Add +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stylist Selection Bar Preview */}
                  <div className="mt-6 p-4 rounded-2xl bg-[#ffd8e5]/50 flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#fda4c9]/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#b1005e] flex items-center justify-center text-white shadow-2xs">
                        <span className="material-symbols-outlined text-[20px]">person_check</span>
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#3c0223]">Pick Your Preferred Stylist / Chair</div>
                        <div className="text-[11px] text-[#72304f]">
                          Choose Marcus (Director) or Ananya (Specialist)
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('Calendar slot matrix opened')}
                      className="px-4 py-2 rounded-full bg-white text-[#b1005e] text-xs font-black shadow-2xs hover:bg-[#f6f3ee] transition-colors cursor-pointer"
                      type="button"
                    >
                      Select Chair &amp; Time
                    </button>
                  </div>
                </div>

                {/* Mock Footer with Live WhatsApp Widget Simulated */}
                <div className="w-full bg-[#f6f3ee] px-5 py-4 border-t border-[#e5e2dd] flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#594047]">
                  <div>© 2025 {previewTemplate.title.split('—')[0].trim()} • All Rights Reserved</div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span>UPI Accepted: GPay / PhonePe / Paytm</span>
                    <span>•</span>
                    <span className="text-[#735c00] font-bold">Instant Slot Confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAUNCH PROTOCOL SUCCESS MODAL */}
      {launchSuccessModal && (
        <div className="fixed inset-0 z-50 bg-[#31302d]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-4 border border-[#e5e2dd] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[32px]">rocket_launch</span>
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-black uppercase border border-[#fda4c9]/60">
                Launch Handoff Initiated
              </span>
              <h3 className="text-2xl font-black text-[#1c1c19] mt-1">
                {launchSuccessModal.title} Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-[#594047] mt-1 leading-relaxed">
                Session Token attached. Your partner referral benefits have been locked under partner REF-5A45019655.
              </p>
            </div>

            <div className="bg-[#f6f3ee] p-4 rounded-2xl space-y-2 border border-[#e5e2dd]">
              <div className="flex justify-between text-xs">
                <span className="text-[#594047]">Selected Template:</span>
                <span className="font-bold text-[#1c1c19]">{launchSuccessModal.title}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#594047]">Domain &amp; DNS Provisioning:</span>
                <span className="font-bold text-[#b1005e]">Free SSL &amp; Instant Sync</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#594047]">Next Step in Handoff:</span>
                <span className="font-bold text-[#1c1c19]">UPI Merchant Key &amp; WhatsApp API Sync</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setLaunchSuccessModal(null);
                  if (onNavigateToStepAuditWorkspace) onNavigateToStepAuditWorkspace();
                }}
                className="w-full h-12 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white font-extrabold text-sm shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                type="button"
              >
                <span>Proceed to Step-by-Step Onboarding</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => setLaunchSuccessModal(null)}
                className="w-full h-10 rounded-full bg-transparent text-[#594047] font-bold text-xs hover:bg-[#f6f3ee] cursor-pointer"
                type="button"
              >
                Return to Template Gallery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#f6f3ee] py-8 border-t border-[#e5e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#594047]">
          <div>© 2025 Nexora Fintech Growth Network. Certified Salon Launch Partner Ecosystem.</div>
          <div className="flex items-center gap-4 font-semibold">
            <a className="hover:text-[#1c1c19] transition-colors" href="#">
              Partner Agreement
            </a>
            <a className="hover:text-[#1c1c19] transition-colors" href="#">
              Security &amp; Clean URL Policy
            </a>
            <a className="hover:text-[#1c1c19] transition-colors" href="#">
              Support Desk
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
