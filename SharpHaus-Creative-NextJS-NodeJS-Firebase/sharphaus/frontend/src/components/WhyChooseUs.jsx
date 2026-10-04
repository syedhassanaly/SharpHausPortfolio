import { Zap, RefreshCcw, MessageCircle, FileCheck2 } from "lucide-react";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { whyChooseUs } from "@/data/services";

const iconMap = { Zap, RefreshCcw, MessageCircle, FileCheck2 };

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-ink-800/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12 sm:mb-16">
          <span className="text-brand-500 font-bold text-sm sm:text-base tracking-wider">
            WHY SHARPHAUS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-4">
            Why Clients <span className="text-gradient-brand">Choose Us</span>
          </h2>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <StaggerItem key={item.title}>
                <div className="h-full bg-ink-800 border-2 border-brand-500/15 rounded-2xl p-6 text-center hover:border-brand-500 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
                    <Icon size={26} className="text-brand-500" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
