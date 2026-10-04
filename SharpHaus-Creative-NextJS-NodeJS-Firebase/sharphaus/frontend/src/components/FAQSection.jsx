"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "@/components/Reveal";
import { faqs } from "@/data/services";

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="border-2 border-brand-500/15 rounded-2xl overflow-hidden bg-ink-800">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-white text-base sm:text-lg">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-8 h-8 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center"
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 sm:px-7 pb-5 text-slate-400 text-sm sm:text-base leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-10 sm:mb-14">
          <span className="text-brand-500 font-bold text-sm sm:text-base tracking-wider">
            GOT QUESTIONS?
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-4">
            Frequently Asked <span className="text-gradient-brand">Questions</span>
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <FAQItem
                item={item}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
