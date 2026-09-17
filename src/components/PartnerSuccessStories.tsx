import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface PartnerTestimonial {
  id: string;
  name: string;
  city: string;
  state: string;
  tier: string;
  tierColor: string;
  avatarUrl: string;
  salonsCount: number;
  totalEarnings: string;
  rewardClaimed: string;
  rewardIcon: string;
  timeframe: string;
  quote: string;
  rating: number;
  workType: 'Part-Time' | 'Full-Time' | 'Salon Owner' | 'District Partner';
}

const SUCCESS_STORIES: PartnerTestimonial[] = [
  {
    id: 'story-1',
    name: 'Rahul Sharma',
    city: 'Jaipur',
    state: 'Rajasthan',
    tier: 'Gold Partner',
    tierColor: 'bg-[#ffe088] text-[#3c2a00] border-[#cca730]/40',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    salonsCount: 112,
    totalEarnings: '₹2,45,000',
    rewardClaimed: 'HP AI Laptop & Samsung Tab',
    rewardIcon: 'laptop',
    timeframe: '4 Months as Partner',
    quote: 'Nexora के साथ काम करना बेहद आसान है। मैंने जयपुर में 4 महीनों में 112 सैलून जोड़े। टाइम पर वीकली पेआउट मिला और HP का नया AI लैपटॉप हैंडओवर हुआ। सपोर्ट टीम कमाल की है!',
    rating: 5,
    workType: 'Full-Time'
  },
  {
    id: 'story-2',
    name: 'Priya Verma',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    tier: 'Level 4 Senior Leader',
    tierColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    salonsCount: 265,
    totalEarnings: '₹4,80,000',
    rewardClaimed: 'Ather 450X EV Scooter',
    rewardIcon: 'electric_scooter',
    timeframe: '6 Months as Partner',
    quote: 'मैंने पार्ट-टाइम शुरू किया था। सैलून ओनर्स को Nexora डिजिटल बिलिंग और फ्री वेबसाइट बहुत पसंद आती है। 250+ सैलून पूरे होने पर Ather EV स्कूटर गिफ्ट में मिला!',
    rating: 5,
    workType: 'Part-Time'
  },
  {
    id: 'story-3',
    name: 'Vikramaditya Singh',
    city: 'Chandigarh',
    state: 'Punjab',
    tier: 'Level 6 Master Captain',
    tierColor: 'bg-rose-100 text-rose-900 border-rose-300',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    salonsCount: 780,
    totalEarnings: '₹14,50,000',
    rewardClaimed: 'Royal Enfield Classic 350',
    rewardIcon: 'two_wheeler',
    timeframe: '9 Months as Partner',
    quote: 'पंजाब और हरियाणा रीजन में मेरी टीम ने 750 से ज्यादा ब्यूटी पार्लर ऑनबोर्ड किए। रॉयल एनफील्ड 350cc शोरूम से डिलीवर हुई। पैसिव इनकम हर हफ्ते बिना रुके बैंक में आती है।',
    rating: 5,
    workType: 'District Partner'
  },
  {
    id: 'story-4',
    name: 'Ananya Deshmukh',
    city: 'Pune',
    state: 'Maharashtra',
    tier: 'Level 5 Executive',
    tierColor: 'bg-purple-100 text-purple-900 border-purple-300',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    salonsCount: 520,
    totalEarnings: '₹9,20,000',
    rewardClaimed: 'iPhone 16 Pro Titanium',
    rewardIcon: 'smartphone',
    timeframe: '8 Months as Partner',
    quote: 'सैलून ओनर्स को टेक्नोलॉजी से जोड़ना मेरा जुनून है। 500 सैलून का टारगेट पूरा होते ही iPhone 16 Pro Titanium मिला। ट्रांसपेरेंट डैशबोर्ड पर सब लाइव दिखता है।',
    rating: 5,
    workType: 'Part-Time'
  },
  {
    id: 'story-5',
    name: 'Rohan Mehta',
    city: 'Ahmedabad',
    state: 'Gujarat',
    tier: '👑 District Partner Leader',
    tierColor: 'bg-[#ffe088] text-[#241a00] border-[#cca730]',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    salonsCount: 1040,
    totalEarnings: '₹22,80,000',
    rewardClaimed: 'Mahindra XUV700 SUV',
    rewardIcon: 'directions_car',
    timeframe: '12 Months as Partner',
    quote: 'गुजरात के 1,000 से ज्यादा सैलून अब Nexora डिजिटल नेटवर्क का हिस्सा हैं। 1000 सैलून माइलस्टोन पर XUV700 SUV कार चाबी मिली। यह लाइफ-चेंजिंग बिजनेस अपॉर्चुनिटी है!',
    rating: 5,
    workType: 'District Partner'
  }
];

export const PartnerSuccessStories: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredStories = SUCCESS_STORIES.filter((story) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'full') return story.workType === 'Full-Time';
    if (activeFilter === 'part') return story.workType === 'Part-Time';
    if (activeFilter === 'district') return story.workType === 'District Partner';
    return true;
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  useEffect(() => {
    if (isPaused || filteredStories.length === 0) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, filteredStories.length, currentIndex]);

  const activeStory = filteredStories[currentIndex] || filteredStories[0];

  return (
    <section id="success-stories" className="py-12 sm:py-16 bg-[#fcf9f4] border-t border-[#e5e2dd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd9e2] text-[#b1005e] text-xs font-black uppercase tracking-wider w-max">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Real Partner Proof</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19] tracking-tight">
              Partner Success Stories &amp; Testimonials
            </h2>
            <p className="text-sm text-[#594047] max-w-2xl">
              देखिए कैसे देश भर के टॉप ग्रोथ पार्टनर्स Nexora के साथ जुड़कर हर महीने ₹50,000 से ₹2 लाख+ कमा रहे हैं और अपने ड्रीम रिवॉर्ड्स अनलॉक कर रहे हैं।
            </p>
          </div>

          {/* Filter Chips & Controls */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {[
              { id: 'all', label: 'All Stories' },
              { id: 'part', label: 'Part-Time' },
              { id: 'full', label: 'Full-Time' },
              { id: 'district', label: 'District Leaders' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-[#b1005e] text-white shadow-xs'
                    : 'bg-[#ebe8e3] text-[#594047] hover:bg-[#e5e2dd]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e5e2dd] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Background Gradient Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#ffd9e2]/40 via-[#ffe088]/20 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

          {/* Active Story Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
            >
              {/* Left Column: Avatar & Metrics */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 bg-[#fcf9f4] p-5 sm:p-6 rounded-2xl border border-[#e5e2dd]">
                <div className="relative">
                  <img
                    src={activeStory.avatarUrl}
                    alt={activeStory.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-md border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#ffd8e5] border-2 border-white flex items-center justify-center text-[#b1005e] font-bold shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                  </div>
                </div>

                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-[#1c1c19]">{activeStory.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] font-bold">
                      {activeStory.city}, {activeStory.state}
                    </span>
                  </div>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border mt-1.5 ${activeStory.tierColor}`}>
                    {activeStory.tier}
                  </span>
                </div>

                {/* Key Achievements Grid */}
                <div className="w-full grid grid-cols-2 gap-2 pt-3 border-t border-[#e5e2dd]">
                  <div className="p-2.5 rounded-xl bg-white border border-[#e5e2dd] flex flex-col items-center lg:items-start">
                    <span className="text-[10px] text-[#594047] font-semibold uppercase">Total Earnings</span>
                    <span className="text-base font-black text-[#b1005e]">{activeStory.totalEarnings}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-[#e5e2dd] flex flex-col items-center lg:items-start">
                    <span className="text-[10px] text-[#594047] font-semibold uppercase">Salons Onboarded</span>
                    <span className="text-base font-black text-[#1c1c19]">{activeStory.salonsCount}+ Shops</span>
                  </div>
                </div>

                {/* Claimed Asset Badge */}
                <div className="w-full p-2.5 rounded-xl bg-[#ffe088]/20 border border-[#cca730]/30 flex items-center justify-between text-xs font-bold text-[#3c2a00]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#cca730]">
                      {activeStory.rewardIcon}
                    </span>
                    <span className="truncate max-w-[180px] sm:max-w-none">{activeStory.rewardClaimed}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#cca730] text-white font-black uppercase">
                    Unlocked
                  </span>
                </div>
              </div>

              {/* Right Column: Quote & Details */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full gap-6">
                <div className="flex flex-col gap-4">
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(activeStory.rating)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[20px] fill-current">
                          star
                        </span>
                      ))}
                      <span className="text-xs font-black text-[#1c1c19] ml-1">5.0 Star Rating</span>
                    </div>
                    <span className="text-xs text-[#8e4767] font-bold px-3 py-1 rounded-full bg-[#f6f3ee]">
                      {activeStory.timeframe}
                    </span>
                  </div>

                  {/* Main Testimonial Quote */}
                  <div className="relative p-4 sm:p-6 rounded-2xl bg-[#fcf9f4] border border-[#e5e2dd]">
                    <span className="material-symbols-outlined text-4xl text-[#b1005e]/20 absolute top-2 right-3 pointer-events-none">
                      format_quote
                    </span>
                    <p className="text-base sm:text-lg text-[#1c1c19] font-medium leading-relaxed italic relative z-10">
                      "{activeStory.quote}"
                    </p>
                  </div>
                </div>

                {/* Verification Footer inside Card */}
                <div className="flex items-center justify-between pt-4 border-t border-[#e5e2dd]/80 text-xs text-[#594047]">
                  <div className="flex items-center gap-2 font-bold text-[#b1005e]">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    <span>100% Verified Nexora Partner Payout Record</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8d6f77]">
                    Work Type: {activeStory.workType}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Controls Row: Play/Pause, Indicators, Prev/Next */}
          <div className="mt-8 pt-4 border-t border-[#e5e2dd] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 rounded-full bg-[#f6f3ee] hover:bg-[#e5e2dd] text-[#594047] transition-colors cursor-pointer"
                title={isPaused ? 'Resume Auto-Play' : 'Pause Auto-Play'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isPaused ? 'play_arrow' : 'pause'}
                </span>
              </button>
              <span className="text-xs font-semibold text-[#594047]">
                Story {currentIndex + 1} of {filteredStories.length}
              </span>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {filteredStories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-[#b1005e]'
                      : 'w-2 bg-[#e5e2dd] hover:bg-[#b1005e]/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="p-2.5 rounded-full bg-[#f6f3ee] hover:bg-[#b1005e] hover:text-white text-[#1c1c19] transition-all cursor-pointer border border-[#e5e2dd]"
                aria-label="Previous Story"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="p-2.5 rounded-full bg-[#f6f3ee] hover:bg-[#b1005e] hover:text-white text-[#1c1c19] transition-all cursor-pointer border border-[#e5e2dd]"
                aria-label="Next Story"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
