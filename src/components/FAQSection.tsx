import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/partnerData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-8 flex flex-col gap-6" id="faq">
      <div className="flex flex-col gap-1.5 text-left">
        <div className="flex items-center gap-2 text-[#d91b77]">
          <span className="material-symbols-outlined text-[20px]">quiz</span>
          <span className="text-xs font-bold tracking-wider uppercase">Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19]">
          Nexora अक्सर पूछे जाने वाले सवाल (Nexora FAQ)
        </h2>
        <p className="text-sm text-[#594047]">
          Nexora Growth Partner प्रोग्राम से जुड़े सभी मुख्य सवालों के आधिकारिक जवाब।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl bg-white overflow-hidden shadow-xs border border-[#e5e2dd] transition-all flex flex-col justify-start"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(item.id)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-[#f6f3ee] transition-colors"
              >
                <span className="text-sm sm:text-base font-bold text-[#1c1c19]">
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
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#594047] leading-relaxed border-t border-[#e5e2dd]/60">
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
