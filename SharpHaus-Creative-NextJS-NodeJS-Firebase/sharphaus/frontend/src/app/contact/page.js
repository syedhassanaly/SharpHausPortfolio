import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Contact",
  description: "Get in touch with SharpHaus Creative and start your project today.",
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-ink-900 to-ink-800 pt-28 sm:pt-36 pb-16 sm:pb-24 min-h-screen">
      <div className="pointer-events-none absolute top-10 right-0 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6">
            Let's <span className="text-gradient-brand">Connect</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400">
            Get in touch and start your project today
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
