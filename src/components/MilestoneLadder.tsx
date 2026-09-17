import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { ASSETS } from '../data/partnerData';
import nexoraTshirtImg from '../assets/images/nexora_tshirt_gift_1789626886832.jpg';

export interface VisualMilestoneReward {
  level: number;
  id: string;
  name: string;
  tierTitle: string;
  rewardGift: string;
  clientsRequired: number;
  rewardAsset: string;
  assetType: 'shirt' | 'tech' | 'bike' | 'car' | 'luxury_car';
  rewardHeadline: string;
  perks: string;
  colorGradient: string;
  badgeTag: string;
  progressPercent: number;
}

const VISUAL_REWARDS: VisualMilestoneReward[] = [
  {
    level: 1,
    id: 'l1',
    name: '25 Shops',
    tierTitle: 'Starter Milestone',
    rewardGift: 'Official Nexora T-Shirt',
    clientsRequired: 25,
    rewardAsset: nexoraTshirtImg,
    assetType: 'shirt',
    rewardHeadline: 'Official Nexora Partner T-Shirt (Branded NEXORA SALONOS Logo • 240 GSM Organic Cotton)',
    perks: 'Certified Partner Welcome Merch Kit + Official NEXORA SALONOS Gold Crest',
    colorGradient: 'from-pink-500/10 to-rose-500/5',
    badgeTag: 'Level 1 Entry',
    progressPercent: 15
  },
  {
    level: 2,
    id: 'l2',
    name: '50 Shops',
    tierTitle: 'Smart Tablet Milestone',
    rewardGift: 'Samsung Tablet',
    clientsRequired: 50,
    rewardAsset: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80',
    assetType: 'tech',
    rewardHeadline: 'Samsung Galaxy Tab A9+ (5G + 128GB + Stylus)',
    perks: 'Nexora Merchant Management Suite Preloaded',
    colorGradient: 'from-amber-500/10 to-orange-500/5',
    badgeTag: 'Level 2 Associate',
    progressPercent: 30
  },
  {
    level: 3,
    id: 'l3',
    name: '100 Shops',
    tierTitle: 'Enterprise Hardware',
    rewardGift: 'Branded HP Laptop (Latest Model)',
    clientsRequired: 100,
    rewardAsset: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80',
    assetType: 'tech',
    rewardHeadline: 'HP OmniBook Ultra / ProBook AI Laptop (Latest Intel Core Ultra 7/i5, 16GB RAM, 512GB SSD)',
    perks: 'High-Performance AI Workstation + Next-Day On-Site HP Warranty Desk',
    colorGradient: 'from-blue-500/10 to-indigo-500/5',
    badgeTag: 'Level 3 Professional',
    progressPercent: 45
  },
  {
    level: 4,
    id: 'l4',
    name: '250 Shops',
    tierTitle: 'Smart EV Scooter',
    rewardGift: 'Electric Scooter',
    clientsRequired: 250,
    rewardAsset: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80',
    assetType: 'bike',
    rewardHeadline: 'Flagship Smart Electric Scooter (Ather 450X Apex / Ola S1 Pro Gen 2)',
    perks: 'Brand New Smart Electric Scooter with Fast Charger & Registration',
    colorGradient: 'from-emerald-500/10 to-teal-500/5',
    badgeTag: 'Level 4 Senior Leader',
    progressPercent: 60
  },
  {
    level: 5,
    id: 'l5',
    name: '500 Shops',
    tierTitle: 'Flagship Smartphone',
    rewardGift: 'Latest iPhone',
    clientsRequired: 500,
    rewardAsset: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
    assetType: 'tech',
    rewardHeadline: 'Latest Apple iPhone 16 Pro (256GB Titanium Edition)',
    perks: 'AppleCare+ 2-Year Warranty & Damage Protection Included',
    colorGradient: 'from-purple-500/10 to-fuchsia-500/5',
    badgeTag: 'Level 5 Executive',
    progressPercent: 75
  },
  {
    level: 6,
    id: 'l6',
    name: '750 Shops',
    tierTitle: 'Classic Cruiser',
    rewardGift: 'Royal Enfield 350 CC',
    clientsRequired: 750,
    rewardAsset: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80',
    assetType: 'bike',
    rewardHeadline: 'Royal Enfield Classic 350 CC (Chrome & Stealth Black Edition)',
    perks: 'Full On-Road Local Showroom Delivery with Insurance & 5-Year Warranty',
    colorGradient: 'from-rose-500/15 to-pink-500/10',
    badgeTag: 'Level 6 Master Captain',
    progressPercent: 90
  },
  {
    level: 7,
    id: 'l7',
    name: '1000+ Shops',
    tierTitle: 'Grand Honor Fleet',
    rewardGift: 'District Partner SUV Car',
    clientsRequired: 1000,
    rewardAsset: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    assetType: 'luxury_car',
    rewardHeadline: 'Mahindra XUV700 AX7 / Hyundai Creta District SUV Car',
    perks: 'Brand New SUV Handover + District Fleet Circle Key & Lifetime Royalty',
    colorGradient: 'from-amber-400/25 via-[#ffe088] to-[#cca730]/20',
    badgeTag: '👑 Level 7 District Partner',
    progressPercent: 100
  }
];

// Motion animation variants for container and cascaded items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 140
    }
  }
};

/**
 * Animated Shop Counter Component using Framer Motion
 * Smoothly counts from 0 up to target salon onboarding milestone
 */
const AnimatedShopCounter: React.FC<{
  targetValue: number;
  suffix?: string;
  duration?: number;
}> = ({ targetValue, suffix = 'Shops', duration = 1.4 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    const node = ref.current;
    if (!node) return;

    const controls = animate(0, targetValue, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        const formatted = new Intl.NumberFormat('en-IN').format(rounded);
        node.textContent = `${formatted}+ ${suffix}`.trim();
      }
    });

    return () => controls.stop();
  }, [isInView, targetValue, suffix, duration]);

  const initialFormatted = new Intl.NumberFormat('en-IN').format(targetValue);

  return (
    <span ref={ref} className="tabular-nums">
      {`${initialFormatted}+ ${suffix}`.trim()}
    </span>
  );
};

export const MilestoneLadder: React.FC = () => {
  const [selectedReward, setSelectedReward] = useState<VisualMilestoneReward>(VISUAL_REWARDS[0]);
  const [isPosterOpen, setIsPosterOpen] = useState<boolean>(false);
  const [lightboxAsset, setLightboxAsset] = useState<VisualMilestoneReward | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="w-full py-8 flex flex-col gap-6" id="rewards">
      {/* Header with Title, Milestones Pool Badge & Poster Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[#d91b77]">
            <span className="material-symbols-outlined text-[20px]">military_tech</span>
            <span className="text-xs font-black tracking-widest uppercase">7-Stage Career Milestone Ladder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19] tracking-tight">
            Nexora Milestone Rewards &amp; Asset Gifts
          </h2>
          <p className="text-sm text-[#594047] max-w-2xl">
            जैसे-जैसे आप सैलून ऑनबोर्ड करते हैं, आपको आधिकारिक Nexora मर्चेंडाइज, सैमसंग टैबलेट, HP का लेटेस्ट मॉडल AI लैपटॉप, स्मार्ट इलेक्ट्रिक स्कूटर, आईफोन, रॉयल एनफील्ड 350cc और लग्जरी एसयूवी कार जैसे ओरिजिनल एसेट रिवॉर्ड्स दिए जाते हैं।
          </p>
        </div>

        {/* Milestone Ladder Top Target Pill */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#ffd9e2] to-[#ffe088]/40 border border-[#fda4c9]/60 shadow-xs flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#d91b77]">workspace_premium</span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold text-[#8e4767] tracking-wider">Top Fleet Milestone</span>
              <span className="text-sm sm:text-base font-black text-[#1c1c19]">
                <AnimatedShopCounter targetValue={1000} suffix="Shops Milestone" duration={1.8} />
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPosterOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#e5e2dd] text-xs font-bold text-[#1c1c19] hover:border-[#d91b77] hover:text-[#d91b77] transition-all shadow-xs cursor-pointer self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[18px] text-[#d91b77]">image</span>
            <span>Official Poster</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Poster */}
      {isPosterOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsPosterOpen(false)}
        >
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-auto flex flex-col items-center">
            <button
              onClick={() => setIsPosterOpen(false)}
              className="sticky top-2 right-2 self-end mb-2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <img
              src={ASSETS.poster}
              alt="Full view of Nexora Milestone Poster"
              className="w-full h-auto rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Lightbox Modal for High-Res Original Asset Photo */}
      {lightboxAsset && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setLightboxAsset(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-[#1c1c19] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-16/10 bg-black">
              <img
                src={lightboxAsset.rewardAsset}
                alt={lightboxAsset.rewardHeadline}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setLightboxAsset(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#d91b77] text-white text-xs font-black shadow-md flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Original Physical Asset Photo</span>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-2 bg-[#262623]">
              <div className="flex items-center justify-between">
                <span className="px-3 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-black uppercase tracking-wider">
                  Level {lightboxAsset.level} Milestone
                </span>
                <span className="text-xs text-rose-300 font-bold">
                  Requirement: {lightboxAsset.clientsRequired} Active Salons
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                {lightboxAsset.rewardGift} — {lightboxAsset.rewardHeadline}
              </h3>
              <p className="text-xs text-neutral-300">
                {lightboxAsset.perks}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Level Highlight Spotlight Card with motion transition */}
      <motion.div
        key={selectedReward.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#ffd9e2]/30 via-white to-[#ffe088]/20 border border-[#fda4c9]/50 shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div 
            onClick={() => setLightboxAsset(selectedReward)}
            className="md:col-span-4 rounded-2xl overflow-hidden aspect-16/10 shadow-sm relative group cursor-pointer bg-black/5"
          >
            <img
              src={selectedReward.rewardAsset}
              alt={selectedReward.rewardHeadline}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-amber-400">verified</span>
              <span>Level {selectedReward.level} HD Original Photo</span>
            </div>
            <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/80 text-white text-[10px] font-bold opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">zoom_in</span>
              <span>Zoom Image</span>
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#d91b77] text-white text-xs font-bold">
                {selectedReward.badgeTag}
              </span>
              <span className="text-lg sm:text-xl font-black text-[#d91b77] bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
                🎁 {selectedReward.rewardGift}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#1c1c19]">
              {selectedReward.name} — {selectedReward.rewardHeadline}
            </h3>

            <p className="text-xs sm:text-sm text-[#594047]">
              {selectedReward.perks}
            </p>

            <div className="flex items-center gap-4 pt-2 border-t border-[#e5e2dd] mt-1 text-xs flex-wrap">
              <div className="flex items-center gap-1.5 font-bold text-[#1c1c19]">
                <span className="material-symbols-outlined text-[18px] text-[#d91b77]">storefront</span>
                <span>Requirement: <strong>{selectedReward.clientsRequired} Active Salons</strong></span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>100% Guaranteed Physical Asset Handover</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxAsset(selectedReward)}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#b1005e] text-white font-bold text-xs shadow-xs hover:bg-[#d91b77] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>View HD Image</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 7 Milestone Visual Reward Cards: Responsive 3/4 Column Grid with Scroll Cascade */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
      >
        {VISUAL_REWARDS.map((reward) => {
          const isSelected = selectedReward.id === reward.id;
          const isAmbassador = reward.level === 7;

          return (
            <motion.div
              key={reward.id}
              variants={cardVariants}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedReward(reward)}
              className={`relative rounded-2xl overflow-hidden border transition-colors cursor-pointer flex flex-col justify-between ${
                isAmbassador
                  ? 'bg-gradient-to-b from-[#ffe088] to-[#f6f3ee] border-[#cca730] shadow-md hover:shadow-lg ring-1 ring-[#cca730]'
                  : isSelected
                  ? 'bg-white border-[#d91b77] shadow-md ring-2 ring-[#d91b77]/30'
                  : 'bg-white border-[#e5e2dd] shadow-2xs hover:border-[#fda4c9] hover:shadow-sm'
              }`}
            >
              {/* Card Image Thumbnail */}
              <div 
                className="relative aspect-16/10 w-full overflow-hidden bg-[#e5e2dd] group"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedReward(reward);
                  setLightboxAsset(reward);
                }}
              >
                <img
                  src={reward.rewardAsset}
                  alt={`${reward.name} reward`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold flex items-center gap-1">
                  <span>Level {reward.level}</span>
                </div>
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-[#d91b77] text-white text-[11px] font-bold shadow-xs tracking-tight">
                  {reward.clientsRequired} Shops
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-amber-300 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">search</span>
                  <span>Click HD Preview</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#d91b77] uppercase tracking-wider">
                      {reward.name}
                    </span>
                    <span className="text-[11px] font-semibold text-[#8e4767]">
                      {reward.clientsRequired} Salons
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-[#1c1c19] leading-tight">
                    {reward.rewardGift}
                  </h4>
                  <p className="text-xs text-[#594047] line-clamp-2 leading-snug">
                    {reward.rewardHeadline}
                  </p>
                </div>

                {/* Progress Bar & Perks */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#e5e2dd]/80">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#594047] font-medium">Original Reward</span>
                    <span className="text-[#d91b77] font-bold truncate max-w-[150px]">{reward.rewardGift}</span>
                  </div>
                  <div className="w-full bg-[#e5e2dd] h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${reward.progressPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + reward.level * 0.08, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        isAmbassador ? 'bg-[#cca730]' : 'bg-[#d91b77]'
                      }`}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
