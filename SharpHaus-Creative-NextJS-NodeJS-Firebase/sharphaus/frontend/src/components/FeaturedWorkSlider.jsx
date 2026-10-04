"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { services, featuredSlugs } from "@/data/services";

const items = featuredSlugs
  .map((slug) => services.find((s) => s.slug === slug))
  .filter(Boolean);

export default function FeaturedWorkSlider() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]");
    const width = card ? card.offsetWidth + 24 : 320;
    track.scrollBy({ left: dir * width, behavior: "smooth" });
  };

  // Gentle autoplay, pauses on hover/touch
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd =
        Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
    }, 3500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2"
      >
        {items.map((service) => (
          <Link
            key={service.slug}
            data-card
            data-cursor-text="View"
            href={`/portfolio/${service.slug}`}
            className="group relative shrink-0 w-[78%] xs:w-[60%] sm:w-[42%] lg:w-[30%] snap-start rounded-2xl overflow-hidden border-2 border-brand-500/15 hover:border-brand-500 transition-colors duration-300 bg-ink-800"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={service.images[0]}
                alt={`${service.title} sample`}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 30vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <span className="text-white font-bold text-base sm:text-lg drop-shadow">
                  {service.emoji} {service.title}
                </span>
                <span className="w-9 h-9 rounded-full bg-brand-500 text-ink-900 flex items-center justify-center shrink-0 translate-x-1 group-hover:translate-x-0 opacity-90 group-hover:opacity-100 transition-all">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="hidden sm:flex justify-center gap-3 mt-6">
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous"
          className="p-2.5 rounded-full border border-brand-500/30 text-brand-400 hover:bg-brand-500/10 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next"
          className="p-2.5 rounded-full border border-brand-500/30 text-brand-400 hover:bg-brand-500/10 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
