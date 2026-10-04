
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { siteConfig } from "@/data/services";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-ink-900/90 backdrop-blur-xl border-brand-500/30 shadow-lg shadow-black/30"
          : "bg-ink-900/50 backdrop-blur-sm border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link
            href="/#home"
            onClick={handleNavClick}
            className="flex items-center gap-3 group shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: -4 }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
            >
              <Image
                src={siteConfig.logo}
                alt={`${siteConfig.name} logo`}
                width={44}
                height={44}
                className="rounded-xl"
                priority
              />
            </motion.div>

            <div className="leading-tight">
              <span className="block text-xl sm:text-2xl font-black text-gradient-brand">
                {siteConfig.shortName}
              </span>

              <span className="hidden xs:block text-[10px] sm:text-xs text-brand-500 tracking-widest">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:text-brand-400 hover:bg-brand-500/10 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Get Started */}
          <MagneticButton
            className="hidden md:inline-block"
            strength={0.25}
          >
            <Link
              href="/#contact"
              onClick={handleNavClick}
              className="group inline-flex items-center px-5 py-2.5 rounded-lg font-bold text-sm bg-gradient-to-r from-brand-500 to-brand-600 text-ink-900 shadow-md hover:shadow-xl transition-shadow duration-200"
            >
              Get Started

              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </MagneticButton>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-brand-500"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:hidden overflow-hidden border-t border-brand-500/20 bg-ink-900"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    className="block px-4 py-3 rounded-lg font-semibold text-slate-200 hover:bg-brand-500/10 hover:text-brand-400 transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <Link
                href="/#contact"
                onClick={handleNavClick}
                className="flex items-center justify-center mt-2 px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-brand-500 to-brand-600 text-ink-900"
              >
                Get Started

                <ArrowRight
                  size={16}
                  className="ml-2"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

