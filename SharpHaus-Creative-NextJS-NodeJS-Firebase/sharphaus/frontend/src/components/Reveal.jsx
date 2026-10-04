"use client";

import { motion } from "framer-motion";

/**
 * Fade-up-on-scroll wrapper. Wrap any section/element in <Reveal> to get a
 * consistent, subtle entrance animation the first time it scrolls into view.
 *
 * Props:
 *  - delay: seconds before the animation starts (for staggering siblings)
 *  - y: initial vertical offset in px
 *  - as: motion element tag (default "div")
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  once = true,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger container: gives each direct motion child an incrementing delay.
 * Use with <StaggerItem> children.
 */
export function StaggerGroup({ children, className, stagger = 0.08, once = true }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 24 }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
