"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";

export default function PortfolioGallery({ title, images, alt }) {
  const [index, setIndex] = useState(null);
  const touchStart = useRef(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () =>
      setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );

  const onTouchStart = (e) => (touchStart.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart.current === null || index === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) (diff > 0 ? next : prev)();
    touchStart.current = null;
  };

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
      >
        {images.map((src, i) => (
          <motion.button
            key={src}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            onClick={() => setIndex(i)}
            data-cursor-text="Open"
            className="group relative rounded-xl overflow-hidden bg-ink-800 border border-brand-500/40 p-2 sm:p-3 transition-all duration-300 hover:border-brand-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 text-left"
            aria-label={`Open ${title} sample ${i + 1}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink-900">
              <Image
                src={src}
                alt={`${alt || title} sample ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                <span className="text-white text-xs sm:text-sm font-semibold tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  View full size
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <Lightbox
        images={images}
        index={index}
        title={title}
        onClose={close}
        onNext={next}
        onPrev={prev}
        onJump={setIndex}
      />
    </div>
  );
}
