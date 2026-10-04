import { Target, Award, Users } from "lucide-react";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import StatsSection from "@/components/StatsSection";
import { siteConfig } from "@/data/services";

export const metadata = {
  title: "About Us",
  description:
    "Your creative partner in digital excellence — learn about SharpHaus Creative's story, mission, and team.",
};

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

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-ink-900 to-ink-800 pt-28 sm:pt-36 pb-16 sm:pb-24 min-h-screen">
      <div className="pointer-events-none absolute top-24 -left-16 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 -right-16 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            About <span className="text-gradient-brand">{siteConfig.name}</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400">
            Your creative partner in digital excellence
          </p>
        </Reveal>

        <div className="mb-10 sm:mb-14">
          <StatsSection />
        </div>

        <Reveal
          delay={0.05}
          className="bg-ink-800/80 backdrop-blur-sm p-6 sm:p-10 rounded-3xl border-2 border-brand-500/30 mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Our Story
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-4 sm:mb-6">
            Founded with a passion for exceptional design, {siteConfig.shortName}{" "}
            has been transforming visions into reality for over a decade. We
            specialize in creating stunning visual experiences that captivate
            audiences and drive results.
          </p>
          <p className="text-slate-300 text-base sm:text-lg">
            Our team of talented designers and developers work tirelessly to
            deliver premium quality work that exceeds expectations. From
            startups to established brands, we've helped hundreds of clients
            achieve their creative goals.
          </p>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
          {pillars.map((item) => (
            <StaggerItem key={item.title}>
              <div className="h-full bg-ink-800 p-6 rounded-2xl border-2 border-brand-500/20 text-center hover:border-brand-500 hover:-translate-y-1 transition-all duration-300">
                <item.icon size={40} className="text-brand-500 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
