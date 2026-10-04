"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ service, href, cta = "View Samples", index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative bg-gradient-to-br from-ink-800 to-ink-900 p-6 rounded-2xl border-2 border-brand-500/20 hover:border-brand-500 transition-colors duration-300 hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col overflow-hidden"
    >
      {/* subtle glow that appears on hover */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 bg-brand-500/0 group-hover:bg-brand-500/10 rounded-full blur-2xl transition-colors duration-500" />

      <motion.div
        className="text-4xl mb-5 w-fit"
        whileHover={{ scale: 1.15, rotate: -6 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {service.emoji}
      </motion.div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
        {service.title}
      </h3>
      <p className="text-slate-400 mb-6 text-sm sm:text-base flex-1">
        {service.shortDesc}
      </p>
      {href && (
        <Link
          href={href}
          className="group/btn w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-ink-900 rounded-lg font-bold hover:shadow-lg transition-all"
        >
          {cta}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>
      )}
    </motion.div>
  );
}
