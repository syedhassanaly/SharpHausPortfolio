import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { services } from "@/data/services";

export const metadata = {
  title: "Services",
  description:
    "Professional design solutions for every need — websites, logos, branding, social media, print, packaging and more.",
};

export default function ServicesPage() {
  return (
    <div className="bg-gradient-to-b from-ink-900 to-ink-800 pt-28 sm:pt-36 pb-16 sm:pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            Our <span className="text-gradient-brand">Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400">
            Professional design solutions for every need
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={i}
              href={`/portfolio/${service.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
