"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Users, Award } from "lucide-react";
import { stats } from "@/data/services";

const icons = [Briefcase, Users, Award];

export default function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 50;
    const duration = 1500;
    let step = 0;
    const id = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      setCounts(stats.map((s) => Math.floor(s.value * progress)));
      if (progress === 1) clearInterval(id);
    }, duration / steps);
    return () => clearInterval(id);
  }, [started]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto -mt-2 sm:mt-0 px-4 sm:px-0"
    >
      {stats.map((stat, i) => {
        const Icon = icons[i];
        return (
          <div
            key={stat.label}
            className="bg-gradient-to-br from-brand-500/10 to-yellow-500/10 backdrop-blur-md border border-brand-500/30 rounded-2xl p-5 sm:p-6 text-center hover:-translate-y-1 hover:border-brand-500/60 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <Icon size={36} className="text-brand-500 mx-auto mb-3 sm:mb-4" />
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              {counts[i]}
              {stat.suffix}
            </div>
            <div className="text-brand-500 font-semibold text-sm sm:text-base">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
