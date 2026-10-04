import Reveal from "@/components/Reveal";
import { process } from "@/data/services";

export default function ProcessSection() {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <Reveal className="text-center mb-8 sm:mb-10">

          <span className="text-brand-500 font-bold text-sm sm:text-base tracking-wider">
            HOW WE WORK
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-3">
            Our{" "}
            <span className="text-gradient-brand">
              Process
            </span>
          </h2>

        </Reveal>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

          {process.map((item, i) => (
            <Reveal
              key={item.step}
              delay={i * 0.1}
              className="relative"
            >

              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-ink-900 font-black text-xl flex items-center justify-center mb-4 shadow-lg shadow-brand-500/20 relative z-10">
                  {item.step}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>

              </div>

            </Reveal>
          ))}

        </div>

      </div>
    </section>
  );
}