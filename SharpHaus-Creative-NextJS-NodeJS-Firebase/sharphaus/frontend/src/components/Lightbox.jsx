"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Lightbox({
  images,
  index,
  title,
  onClose,
  onNext,
  onPrev,
  onJump,
}) {
  const open = index !== null && index !== undefined;

  const handleKey = useCallback(
    (e) => {
      if (!open) return;

      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowRight") {
        onNext();
      }

      if (e.key === "ArrowLeft") {
        onPrev();
      }
    },
    [open, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} preview`}
        >

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition z-10"
            aria-label="Close preview"
          >
            <X size={22} />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="hidden sm:flex fixed left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center text-white transition z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center text-white transition z-10"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          <div className="flex flex-col items-center max-w-6xl w-full">

            {/* Title */}
            <div className="mb-3 text-slate-300 text-xs sm:text-sm tracking-wide">
              <span className="text-brand-400 font-semibold">
                {title}
              </span>

              {"  ·  "}

              {index + 1} / {images.length}
            </div>

            {/* FULL IMAGE */}
            <AnimatePresence mode="wait">

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-[65vh] sm:h-[70vh] lg:h-[75vh]"
                onClick={(e) => e.stopPropagation()}
              >

                <Image
                  src={images[index]}
                  alt={`${title} sample ${index + 1} full preview`}
                  fill
                  sizes="95vw"
                  className="object-contain rounded-xl"
                  priority
                />

              </motion.div>

            </AnimatePresence>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div
                className="mt-4 flex gap-2 overflow-x-auto max-w-full px-2 py-1 no-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >

                {images.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    onClick={() => onJump(i)}
                    className={`relative w-14 h-11 sm:w-16 sm:h-12 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                      i === index
                        ? "border-brand-500 opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                    aria-label={`Jump to image ${i + 1}`}
                  >

                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />

                  </button>
                ))}

              </div>
            )}

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}