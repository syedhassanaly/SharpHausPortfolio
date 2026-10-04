import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/data/services";

const explore = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Query", href: "/contact" },
  { label: "Help", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 border-t-2 border-brand-500 pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Image
                src={siteConfig.logo}
                alt={`${siteConfig.name} logo`}
                width={44}
                height={44}
                className="rounded-xl"
              />
              <span className="text-xl sm:text-2xl font-black text-gradient-brand">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-brand-500 font-bold text-base sm:text-lg mb-1 sm:mb-2">
              Explore
            </h3>
            {explore.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative w-fit text-slate-400 hover:text-brand-500 transition-colors text-sm sm:text-base"
              >
                {item.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-brand-500 font-bold text-base sm:text-lg mb-1 sm:mb-2">
              Company
            </h3>
            {company.map((item, i) => (
              <Link
                key={item.label + i}
                href={item.href}
                className="group relative w-fit text-slate-400 hover:text-brand-500 transition-colors text-sm sm:text-base"
              >
                {item.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div>
            <h3 className="text-brand-500 font-bold text-base sm:text-lg mb-4 sm:mb-6">
              Contact
            </h3>
            <div className="space-y-3 sm:space-y-4 text-slate-400 text-sm sm:text-base">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-3 hover:text-brand-500 transition-colors"
              >
                <Mail
                  size={18}
                  className="text-brand-500 shrink-0 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="break-all">{siteConfig.email}</span>
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                className="group flex items-center gap-3 hover:text-brand-500 transition-colors"
              >
                <Phone
                  size={18}
                  className="text-brand-500 shrink-0 transition-transform duration-300 group-hover:scale-110"
                />
                <span>{siteConfig.phone}</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-brand-500 shrink-0" />
                <span>{siteConfig.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-500/20 pt-6 sm:pt-8 text-center text-slate-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
