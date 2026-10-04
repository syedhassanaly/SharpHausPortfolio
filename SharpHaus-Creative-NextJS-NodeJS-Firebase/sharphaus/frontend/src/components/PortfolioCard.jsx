"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PortfolioCard({ service, index = 0 }) {
  // Cycle through up to 3 real samples on hover so the card feels alive —
  // a stand-in for video that only ever shows real project images.
  const previewImages = service.images.slice(0, 3);
  const [hovering, setHovering] = useState(false);
  const [frame, setFrame] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!hovering || previewImages.length < 2) return;
    timerRef.current = setInterval(() => {
      setFrame((f) => (f + 1) % previewImages.length);
    }, 750);
    return () => clearInterval(timerRef.current);
  }, [hovering, previewImages.length]);

  const onEnter = () => {
    setHovering(true);
    setFrame(0);
  };
  const onLeave = () => {
    setHovering(false);
    setFrame(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -6 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative"
    >
      <Link
        href={`/portfolio/${service.slug}`}
        data-cursor-text="View"
        className="block rounded-2xl overflow-hidden border-2 border-brand-500/15 bg-ink-800 transition-colors duration-300 group-hover:border-brand-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={frame}
              initial={{ opacity: hovering ? 0 : 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={previewImages[frame]}
                alt={`${service.title} sample ${frame + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </motion.div>
          </AnimatePresence>

          {/* Base gradient so text is always legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />

          {/* Frame indicator dots (only when actively cycling) */}
          {hovering && previewImages.length > 1 && (
            <div className="absolute top-3 right-3 flex gap-1 z-10">
              {previewImages.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === frame ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-ink-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-ink-900 font-bold text-sm translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              View Project
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>

          <span className="absolute top-3 left-3 text-2xl drop-shadow-lg z-10">
            {service.emoji}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-brand-500 text-[11px] font-bold uppercase tracking-wider mb-1">
            {service.group}
          </p>
          <h3 className="text-white font-bold text-lg leading-snug group-hover:text-brand-400 transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-400 text-sm mt-1 line-clamp-2">
            {service.shortDesc}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
