import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/partnerData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="px-4 py-6 flex flex-col gap-4" id="faq">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[#d91b77]">
          <span className="material-symbols-outlined text-[18px]">quiz</span>
          <span className="text-xs font-bold tracking-wider uppercase">FAQ</span>
        </div>
        <h2 className="text-xl font-bold text-[#1c1c19]">
          अक्सर पूछे जाने वाले सवाल
        </h2>
        <p className="text-xs sm:text-sm text-[#594047]">
          पार्टनर प्रोग्राम के बारे में आपके सभी सवालों के आधिकारिक जवाब।
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-xl bg-[#f6f3ee] overflow-hidden shadow-xs border border-[#e5e2dd] transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(item.id)}
                aria-expanded={isOpen}
                className="w-full p-4 text-left flex items-center justify-between gap-2.5 cursor-pointer hover:bg-[#ebe8e3] transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-[#1c1c19]">
                  {item.question}
                </span>
                <span
                  className={`material-symbols-outlined text-[#d91b77] transform transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  expand_more
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#594047] leading-relaxed border-t border-[#e5e2dd]/60">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
