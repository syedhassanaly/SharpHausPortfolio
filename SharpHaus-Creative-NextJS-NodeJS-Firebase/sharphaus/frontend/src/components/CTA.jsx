"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function CTA({
  heading = "Ready to Create Magic?",
  subheading = "Let's transform your vision into reality!",
  buttonLabel = "Start Your Project Now",
  href = "/contact",
}) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-r from-brand-500 to-brand-600">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-ink-900/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-ink-900 mb-6">
          {heading}
        </h2>
        <p className="text-xl sm:text-2xl text-ink-900/80 mb-8 sm:mb-10 font-medium">
          {subheading}
        </p>
        <MagneticButton className="inline-block">
          <Link
            href={href}
            className="group inline-flex items-center px-8 sm:px-12 py-4 sm:py-5 bg-ink-900 text-white rounded-xl font-bold text-lg sm:text-xl hover:shadow-2xl transition-shadow duration-300 shadow-2xl"
          >
            {buttonLabel}
            <ArrowRight
              size={22}
              className="ml-3 transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
