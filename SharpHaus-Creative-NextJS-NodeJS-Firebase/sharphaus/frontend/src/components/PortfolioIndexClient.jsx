"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioCard from "@/components/PortfolioCard";
import PortfolioFilter from "@/components/PortfolioFilter";
import Reveal from "@/components/Reveal";
import { services, groups } from "@/data/services";

export default function PortfolioIndexClient() {
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () => (active === "All" ? services : services.filter((s) => s.group === active)),
    [active]
  );

  const totalSamples = useMemo(
    () => services.reduce((n, s) => n + s.images.length, 0),
    []
  );

  return (
    <div className="bg-gradient-to-b from-ink-900 to-ink-800 pt-28 sm:pt-36 pb-16 sm:pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            Our <span className="text-gradient-brand">Portfolio</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400">
            {services.length} categories · {totalSamples}+ real samples — browse by type or view
            everything
          </p>
        </Reveal>

        <PortfolioFilter groups={groups} active={active} onChange={setActive} />

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((service, i) => (
              <motion.div
                key={service.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <PortfolioCard service={service} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
