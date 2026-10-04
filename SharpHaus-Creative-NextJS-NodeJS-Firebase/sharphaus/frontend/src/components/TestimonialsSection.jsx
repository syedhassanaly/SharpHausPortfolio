import { Quote } from "lucide-react";

import Reveal, {
  StaggerGroup,
  StaggerItem,
} from "@/components/Reveal";

import { testimonials } from "@/data/services";

export default function TestimonialsSection() {
  return (
    <section className="py-8 sm:py-12 bg-ink-800/40">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <Reveal className="text-center mb-3">

          <span className="text-brand-500 font-bold text-sm sm:text-base tracking-wider">
            CLIENT FEEDBACK
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-3">
            What Clients{" "}
            <span className="text-gradient-brand">
              Say
            </span>
          </h2>

        </Reveal>

        <Reveal
          delay={0.05}
          className="text-center mb-8 sm:mb-10"
        >

          <span className="inline-block text-xs sm:text-sm text-slate-500 bg-ink-900 border border-brand-500/20 rounded-full px-4 py-1.5">
            Sample layout — replace with real client quotes
          </span>

        </Reveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">

          {testimonials.map((t, index) => (
            <StaggerItem
              key={`${t.name}-${t.role}-${index}`}
            >

              <div className="h-full flex flex-col bg-ink-800 border-2 border-brand-500/15 rounded-2xl p-6 sm:p-7">

                <Quote
                  size={28}
                  className="text-brand-500 mb-4"
                />

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed flex-1 italic">
                  "{t.quote}"
                </p>

                <div className="mt-5 pt-4 border-t border-brand-500/10">

                  <p className="text-white font-bold text-sm sm:text-base">
                    {t.name}
                  </p>

                  <p className="text-slate-500 text-xs sm:text-sm">
                    {t.role}
                  </p>

                </div>

              </div>

            </StaggerItem>
          ))}

        </StaggerGroup>

      </div>

    </section>
  );
}