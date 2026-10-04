"use client";

import { useState } from "react";
import { Target, Award, Users } from "lucide-react";

import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import ServiceCard from "@/components/ServiceCard";
import PortfolioCard from "@/components/PortfolioCard";
import FeaturedWorkSlider from "@/components/FeaturedWorkSlider";
import ProcessSection from "@/components/ProcessSection";
import ToolsSection from "@/components/ToolsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Marquee from "@/components/Marquee";
import Reveal, {
  StaggerGroup,
  StaggerItem,
} from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

import { services, siteConfig } from "@/data/services";

const categories = [
  "All",
  "Branding",
  "Digital",
  "Illustration",
  "Print",
];

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To empower businesses with exceptional design that drives growth and engagement.",
  },
  {
    icon: Award,
    title: "Our Values",
    desc: "Excellence, creativity, and client satisfaction are at the heart of everything we do.",
  },
  {
    icon: Users,
    title: "Our Team",
    desc: "A diverse group of passionate creatives dedicated to bringing your vision to life.",
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter(
          (s) =>
            s.group?.toLowerCase() === activeCategory.toLowerCase() ||
            s.type?.toLowerCase() === activeCategory.toLowerCase() ||
            s.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <main className="bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900">

      {/* =====================================================
          1. HOME / HERO
      ===================================================== */}
      <section id="home" className="scroll-mt-20">
        <Hero />
      </section>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-10 relative z-10">
        <StatsSection />
      </div>

      {/* Marquee */}
      <div className="mt-6 sm:mt-8">
        <Marquee />
      </div>

      {/* =====================================================
          2. FEATURED WORK
      ===================================================== */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <span className="text-brand-500 font-bold text-sm sm:text-base tracking-wider">
                FEATURED WORK
              </span>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-2">
                Recent{" "}
                <span className="text-gradient-brand">
                  Projects
                </span>
              </h2>
            </div>
          </Reveal>

          <FeaturedWorkSlider />

        </div>
      </section>

      {/* =====================================================
          3. PORTFOLIO
      ===================================================== */}
      <section
        id="portfolio"
        className="scroll-mt-20 py-8 sm:py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <Reveal className="text-center mb-6 sm:mb-8">

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gradient-brand">
              Our Portfolio
            </h2>

            <p className="text-slate-300 text-sm sm:text-base mt-3">
              12 categories · 136+ real samples — browse by type
              or view everything
            </p>

            {/* Portfolio Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-brand-500 text-ink-900 shadow-md scale-105"
                      : "bg-ink-800/80 text-slate-300 hover:text-white hover:bg-ink-700"
                  }`}
                >
                  {cat}
                </button>
              ))}

            </div>
          </Reveal>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-8">

            {filteredServices.map((service, i) => (
              <PortfolioCard
                key={service.slug}
                service={service}
                index={i}
              />
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          4. SERVICES
      ===================================================== */}
      <section
        id="services"
        className="scroll-mt-20 py-8 sm:py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <Reveal className="text-center mb-8 sm:mb-10">

            <span className="text-brand-500 font-bold text-sm sm:text-base tracking-wider">
              WHAT WE OFFER
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-3">
              Our{" "}
              <span className="text-gradient-brand">
                Services
              </span>
            </h2>

          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

            {services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={i}
                href="/#portfolio"
              />
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          5. ABOUT
      ===================================================== */}
      <section
        id="about"
        className="scroll-mt-20 relative overflow-hidden py-8 sm:py-12"
      >

        {/* Background decoration */}
        <div className="pointer-events-none absolute top-24 -left-16 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />

        <div className="pointer-events-none absolute bottom-24 -right-16 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

          {/* Heading */}
          <Reveal className="text-center mb-8 sm:mb-10">

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 sm:mb-4">
              About{" "}
              <span className="text-gradient-brand">
                {siteConfig.name}
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-400">
              Your creative partner in digital excellence
            </p>

          </Reveal>

          {/* About Stats */}
          <div className="mb-8 sm:mb-10">
            <StatsSection />
          </div>

          {/* Story */}
          <Reveal
            delay={0.05}
            className="bg-ink-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border-2 border-brand-500/30 mb-6 sm:mb-8"
          >

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Our Story
            </h3>

            <p className="text-slate-300 text-base sm:text-lg mb-4">
              Founded with a passion for exceptional design,
              {` ${siteConfig.shortName} `}
              has been transforming visions into reality for over
              a decade. We specialize in creating stunning visual
              experiences that captivate audiences and drive
              results.
            </p>

            <p className="text-slate-300 text-base sm:text-lg">
              Our team of talented designers and developers work
              tirelessly to deliver premium quality work that
              exceeds expectations. From startups to established
              brands, we've helped hundreds of clients achieve
              their creative goals.
            </p>

          </Reveal>

          {/* Mission / Values / Team */}
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">

            {pillars.map((item) => (
              <StaggerItem key={item.title}>

                <div className="h-full bg-ink-800 p-6 rounded-2xl border-2 border-brand-500/20 text-center hover:border-brand-500 hover:-translate-y-1 transition-all duration-300">

                  <item.icon
                    size={40}
                    className="text-brand-500 mx-auto mb-4"
                  />

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm sm:text-base">
                    {item.desc}
                  </p>

                </div>

              </StaggerItem>
            ))}

          </StaggerGroup>

        </div>
      </section>

      {/* =====================================================
          6. PROCESS + TOOLS
      ===================================================== */}
      <section
        id="process"
        className="scroll-mt-20"
      >

        <ProcessSection />

        <div className="mt-2 sm:mt-4">
          <ToolsSection />
        </div>

      </section>

      {/* =====================================================
          7. TESTIMONIALS
      ===================================================== */}
      <section
        id="testimonials"
        className="scroll-mt-20"
      >
        <TestimonialsSection />
      </section>

      {/* =====================================================
          8. FAQ
      ===================================================== */}
      <section
        id="faq"
        className="scroll-mt-20"
      >
        <FAQSection />
      </section>

      {/* =====================================================
          9. CONTACT
      ===================================================== */}
      <section
        id="contact"
        className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-ink-900 to-ink-800 py-10 sm:py-14"
      >

        <div className="pointer-events-none absolute top-10 right-0 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">

          <Reveal className="text-center mb-8 sm:mb-10">

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 sm:mb-4">
              Let's{" "}
              <span className="text-gradient-brand">
                Connect
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-400">
              Get in touch and start your project today
            </p>

          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>

        </div>

      </section>

    </main>
  );
}