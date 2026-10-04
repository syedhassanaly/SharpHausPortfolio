"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

/**
 * Wraps any button/link content and gives it a subtle "magnetic" pull
 * toward the cursor on hover — a common premium-portfolio micro-interaction.
 * Pass a single child (usually an <a>/<Link> or <button>).
 */
export default function MagneticButton({ children, strength = 0.35, className }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </motion.div>
  );
}
