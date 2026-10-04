"use client";

import { motion } from "framer-motion";

export default function PortfolioFilter({ groups, active, onChange }) {
  const tabs = ["All", ...groups];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
              isActive ? "text-ink-900" : "text-slate-300 hover:text-brand-400"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="portfolio-filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-600"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
