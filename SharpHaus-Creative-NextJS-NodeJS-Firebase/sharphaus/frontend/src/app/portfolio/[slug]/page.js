import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PortfolioGallery from "@/components/PortfolioGallery";
import Reveal from "@/components/Reveal";
import { services, getServiceBySlug } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.longDesc,
  };
}

export default function ServiceSamplesPage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink-900 to-ink-800 px-4 py-24 sm:py-28">
      <div className="max-w-screen-2xl mx-auto">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-500 transition-colors mb-8 text-sm sm:text-base"
        >
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>

        <Reveal className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/30 rounded-full mb-4">
            <span className="text-3xl leading-none">{service.emoji}</span>
            <span className="text-brand-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
              Our Portfolio · {service.images.length} samples
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
            {service.title} <span className="text-gradient-brand">Samples</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            {service.longDesc}
          </p>
        </Reveal>

        <PortfolioGallery
          title={service.title}
          images={service.images}
          alt={service.title}
        />
      </div>
    </div>
  );
}
