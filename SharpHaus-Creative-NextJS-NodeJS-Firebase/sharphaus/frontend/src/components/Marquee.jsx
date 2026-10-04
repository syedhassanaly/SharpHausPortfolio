import { Sparkle } from "lucide-react";

const defaultItems = [
  "AVAILABLE FOR NEW PROJECTS",
  "LOGO DESIGN",
  "BRAND IDENTITY",
  "WEB DEVELOPMENT",
  "PACKAGING",
  "ILLUSTRATION",
  "SOCIAL MEDIA",
  "PRINT DESIGN",
];

export default function Marquee({ items = defaultItems }) {
  // duplicate the list so the CSS animation (-50%) loops seamlessly
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-brand-500/20 bg-ink-800/60 py-4">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-sm sm:text-base font-bold tracking-wider text-slate-300 whitespace-nowrap"
          >
            {item}
            <Sparkle size={14} className="text-brand-500 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
