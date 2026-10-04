"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Play } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import MagneticButton from "@/components/MagneticButton";

const slides = [
  {
    title: "Transform Your Vision",
    subtitle: "Into Stunning Reality",
    description:
      "Premium graphic design & web development services crafted for businesses, gamers, and creators.",
    accent: "from-brand-500 to-yellow-500",
  },
  {
    title: "Creative Excellence",
    subtitle: "Meets Innovation",
    description:
      "3000+ projects delivered with cutting-edge design and development expertise.",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    title: "Your Success",
    subtitle: "Our Mission",
    description: "Join 2000+ happy clients who trust us with their digital presence.",
    accent: "from-fuchsia-500 to-pink-500",
  },
];

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimatedHeading({ text, className }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate="show"
          className="inline-block mr-[0.28em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const touchStart = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      5500
    );
    return () => clearInterval(id);
  }, [autoPlay]);

  const go = (i) => {
    setAutoPlay(false);
    setCurrent(i);
  };
  const next = () => go((current + 1) % slides.length);
  const prev = () => go((current - 1 + slides.length) % slides.length);

  const onTouchStart = (e) => (touchStart.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) (diff > 0 ? next : prev)();
    touchStart.current = null;
  };

  // Cursor-follow spotlight glow (desktop only — cheap CSS var update)
  const onMouseMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const slide = slides[current];

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900"
      style={{ "--mx": "50%", "--my": "30%" }}
    >
      {/*
        To use a real showreel instead of the animated canvas below, replace
        <AnimatedBackground /> with:
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
          <source src="/videos/showreel.mp4" type="video/mp4" />
        </video>
      */}
      <div className="pointer-events-none absolute inset-0">
        <AnimatedBackground />
      </div>

      {/* Cursor-follow spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx) var(--my), rgba(245,158,11,0.14), transparent 60%)",
        }}
      />

      {/* Decorative floating shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-16 left-6 w-56 h-56 sm:w-72 sm:h-72 bg-brand-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-6 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <motion.div
          className="hidden md:block absolute top-1/3 left-[8%] w-3 h-3 rounded-full bg-brand-400"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hidden md:block absolute top-1/4 right-[12%] w-2 h-2 rounded-full bg-cyan-400"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="hidden lg:block absolute bottom-1/4 left-[20%] w-5 h-5 rounded-full border-2 border-brand-500/40"
          animate={{ y: [0, -12, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/30 rounded-full mb-6 sm:mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
          </span>
          <Sparkles size={14} className="text-brand-400" />
          <span className="text-brand-400 text-xs sm:text-sm font-medium tracking-wide">
            Welcome to SharpHaus
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          <div key={current}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 sm:mb-8 text-white">
              <AnimatedHeading text={slide.title} className="block" />
              <span
                className={`block bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent animate-gradient`}
              >
                <AnimatedHeading text={slide.subtitle} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 max-w-3xl mx-auto"
            >
              {slide.description}
            </motion.p>
          </div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10 sm:mb-12"
        >
          <MagneticButton>
            <Link
              href="/portfolio"
              data-cursor-text="Explore"
              className="group px-8 sm:px-10 py-4 bg-gradient-to-r from-brand-500 to-brand-600 text-ink-900 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-brand-500/20 hover:shadow-2xl hover:shadow-brand-500/30 transition-shadow duration-300 inline-flex items-center justify-center"
            >
              Explore Portfolio
              <ArrowRight
                size={18}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/contact"
              data-cursor-text="Contact"
              className="group px-8 sm:px-10 py-4 border-2 border-brand-500 text-brand-400 rounded-xl font-bold text-base sm:text-lg hover:bg-brand-500 hover:text-ink-900 transition-colors duration-300 inline-flex items-center justify-center"
            >
              Start a Project
              <Play size={16} className="ml-2" />
            </Link>
          </MagneticButton>
        </motion.div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="p-2 rounded-full border border-brand-500/30 text-brand-400 hover:bg-brand-500/10 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-brand-500" : "w-2 bg-brand-500/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next slide"
            className="p-2 rounded-full border border-brand-500/30 text-brand-400 hover:bg-brand-500/10 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
