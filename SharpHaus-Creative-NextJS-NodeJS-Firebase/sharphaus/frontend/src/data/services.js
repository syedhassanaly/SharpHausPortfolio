// src/data/services.js
// Single source of truth for every service/category shown across the site:
// the home page grid, /services, /portfolio, and each /portfolio/[slug] page.
// Image filenames and categories are unchanged from the original project.

const range = (prefix, count, ext = "jpg", start = 1) =>
  Array.from({ length: count }, (_, i) => `/images/${prefix}${i + start}.${ext}`);

// Four higher-level groups used for the portfolio filter tabs. Every
// category belongs to exactly one group; "All" is derived automatically.
export const groups = ["Branding", "Digital", "Illustration", "Print"];

export const services = [
  {
    slug: "websitesamples",
    emoji: "💻",
    group: "Digital",
    title: "Website Development",
    shortDesc: "Modern, responsive websites with cutting-edge technology",
    longDesc:
      "Modern, responsive websites with cutting-edge technology, built to look great and load fast on every device.",
    images: range("w", 21),
  },
  {
    slug: "logosamples",
    emoji: "🎨",
    group: "Branding",
    title: "Logo Design",
    shortDesc: "Expert crafted logo design with unlimited revisions",
    longDesc: "Expert crafted logo design with unlimited revisions.",
    images: range("l", 15),
  },
  {
    slug: "brandingsamples",
    emoji: "✨",
    group: "Branding",
    title: "Branding",
    shortDesc: "Complete brand identity packages that tell your story",
    longDesc: "Complete brand identity packages that tell your story.",
    images: range("b", 9),
  },
  {
    slug: "socialsamples",
    emoji: "📱",
    group: "Digital",
    title: "Social Media",
    shortDesc:
      "Social media content design & posts for Facebook, Instagram, Twitter, and more",
    longDesc:
      "Social media content design & posts on Facebook, Instagram, Twitter, and other platforms.",
    images: [
      "/images/s1.jpg",
      "/images/s2.jpg",
      "/images/s3.jpg",
      "/images/s4.jpg",
      "/images/s10.jpg",
      "/images/s11.jpg",
      "/images/s12.jpg",
      "/images/s13.jpg",
      "/images/s18.png",
      "/images/s15.jpg",
      "/images/s16.jpg",
      "/images/s17.jpg",
      "/images/s19.png",
    ],
  },
  {
    slug: "brandmerchandisesamples",
    emoji: "🏷️",
    group: "Branding",
    title: "BE — Brand / Merchandise",
    shortDesc:
      "Logo design, brand development with stationery, merchandise, and social media design",
    longDesc:
      "Logo design, brand development with stationery, merchandise, and social media design. This project is part of the portfolio.",
    images: range("bm", 6),
  },
  {
    slug: "vehiclewrapsamples",
    emoji: "🚚",
    group: "Branding",
    title: "Vehicle Wraps",
    shortDesc:
      "Bold, vibrant vehicle wraps with dynamic graphics that boost brand visibility",
    longDesc:
      "A bold, vibrant truck wrap with dynamic graphics that boosts brand visibility while clearly showcasing logos and services.",
    images: range("vw", 10),
  },
  {
    slug: "illustrationsamples",
    emoji: "✏️",
    group: "Illustration",
    title: "Illustration",
    shortDesc:
      "Creative art illustrations for social media promotion, cartoon & children's book styles",
    longDesc:
      "Creative art illustrations for social media promotion, specializing in cartoon and children's book styles.",
    images: range("il", 9),
  },
  {
    slug: "vectortracingsamples",
    emoji: "✒️",
    group: "Illustration",
    title: "Vector Tracing",
    shortDesc:
      "High-quality vector tracing that converts raster logos into print-ready vector files",
    longDesc:
      "High-quality vector tracing that converts raster logos into scalable, print-ready vector and SVG files with perfect accuracy.",
    images: range("vt", 7),
  },
  {
    slug: "printdesignsamples",
    emoji: "📄",
    group: "Print",
    title: "Print Design",
    shortDesc:
      "Business cards, flyers, banners, documents, and more since 2014",
    longDesc:
      "A brief example of printing projects completed since 2014, including business cards, flyers, banners, documents, and more.",
    images: range("pd", 9),
  },
  {
    slug: "flyersamples",
    emoji: "📰",
    group: "Print",
    title: "Flyer Design",
    shortDesc: "Clean, professional flyers that communicate with impact",
    longDesc:
      "I design clean, professional flyers that align with your brand identity and effectively communicate your message with impact.",
    images: [
      "/images/f1.jpeg",
      ...range("f", 12, "jpg", 2),
    ],
  },
  {
    slug: "packagedesignsamples",
    emoji: "📦",
    group: "Print",
    title: "Packaging Design",
    shortDesc: "Market-ready packaging tailored to strengthen your brand",
    longDesc:
      "Expertly crafted, market-ready packaging designs with unlimited revisions, tailored to strengthen your brand presence and appeal.",
    images: range("p", 8),
  },
  {
    slug: "brochuredesignsamples",
    emoji: "📘",
    group: "Print",
    title: "Brochure Design",
    shortDesc: "Engaging tri-fold brochures for fitness and golf brands",
    longDesc:
      "Designed engaging tri-fold brochures for fitness and golf brands, combining strong visuals, clear messaging, and effective calls to action.",
    images: [...range("bd", 12), ...range("br", 4)],
  },
];

export const getServiceBySlug = (slug) =>
  services.find((s) => s.slug === slug);

// First image of each category, used as the real-photo thumbnail on
// portfolio/service cards instead of an emoji-only card.
export const getServiceThumb = (service) => service.images[0];

// A hand-picked spread of categories (one image each) for the homepage
// "Featured Work" slider, so the strip shows real variety at a glance.
export const featuredSlugs = [
  "websitesamples",
  "brandingsamples",
  "illustrationsamples",
  "vehiclewrapsamples",
  "packagedesignsamples",
  "brochuredesignsamples",
  "logosamples",
  "socialsamples",
];

// The step-by-step process shown in the "How We Work" section.
export const process = [
  {
    step: "01",
    title: "Discovery & Brief",
    desc: "We start with a conversation about your goals, audience, and the problem the design needs to solve.",
  },
  {
    step: "02",
    title: "Concept & Sketches",
    desc: "Initial directions are explored — mood, color, typography — so you can react before we go deep on one path.",
  },
  {
    step: "03",
    title: "Design & Refinement",
    desc: "The chosen concept is developed into polished, production-ready artwork, with revision rounds along the way.",
  },
  {
    step: "04",
    title: "Delivery & Support",
    desc: "You receive final files in every format you need, plus support if questions come up after handoff.",
  },
];

// Short, verifiable differentiators — no invented statistics here.
export const whyChooseUs = [
  {
    icon: "Zap",
    title: "Fast Turnaround",
    desc: "Clear timelines agreed up front, so you always know when to expect drafts and final files.",
  },
  {
    icon: "RefreshCcw",
    title: "Revisions Included",
    desc: "Feedback rounds are built into the process — the goal is a result you're genuinely happy with.",
  },
  {
    icon: "MessageCircle",
    title: "Direct Communication",
    desc: "You work directly with the designer on your project, not through layers of account managers.",
  },
  {
    icon: "FileCheck2",
    title: "Every Format You Need",
    desc: "Print-ready PDFs, web-ready assets, editable source files — delivered in the formats your project needs.",
  },
];

// Tools referenced by name only (no third-party logos/marks reproduced).
export const tools = [
  { icon: "PenTool", name: "Adobe Illustrator" },
  { icon: "Image", name: "Adobe Photoshop" },
  { icon: "Layout", name: "Adobe InDesign" },
  { icon: "Figma", name: "Figma" },
  { icon: "Code2", name: "Next.js & React" },
  { icon: "Palette", name: "Procreate" },
];

// FAQ content — written as sensible starting answers. Edit these to match
// your actual policies before publishing.
export const faqs = [
  {
    q: "How long does a typical project take?",
    a: "It depends on scope: a single logo often takes a few days, while a full brand identity or website can take a few weeks. You'll get a specific timeline before work begins.",
  },
  {
    q: "How many revisions are included?",
    a: "Each package includes a set number of revision rounds, discussed up front, so feedback is built into the process rather than an extra cost.",
  },
  {
    q: "What file formats will I receive?",
    a: "You'll get whatever the project needs — typically layered source files plus export-ready formats like PNG, JPG, SVG, and print-ready PDF.",
  },
  {
    q: "Do you work with clients remotely?",
    a: "Yes — most projects are run entirely over email/calls, with progress shared as we go so you're never waiting in the dark.",
  },
  {
    q: "How do I get a quote?",
    a: "Send a short brief through the contact form with what you need and any references you like — you'll get a scoped quote back.",
  },
];

// Placeholder testimonials — swap these for real client quotes before
// publishing. They're included so the layout/section exists and is easy
// to fill in later; do not present these as real client feedback as-is.
export const testimonials = [
  {
    name: "Client Name",
    role: "Add project/company",
    quote:
      "Replace this with a real quote from a client about working with you — what the process was like and what they got out of it.",
  },
  {
    name: "Client Name",
    role: "Add project/company",
    quote:
      "Replace this with a second real testimonial. Specific, concrete feedback reads as far more credible than generic praise.",
  },
  {
    name: "Client Name",
    role: "Add project/company",
    quote:
      "A third testimonial slot — remove this section entirely from the homepage if you don't have client quotes to add yet.",
  },
];

export const stats = [
  { label: "Projects", value: 3000, suffix: "+" },
  { label: "Happy Clients", value: 2000, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
];

export const siteConfig = {
  name: "SharpHaus Creative",
  shortName: "SharpHaus",
  tagline: "CREATIVE AGENCY",
  description:
    "Premium graphic design & web development services crafted for businesses, gamers, and creators.",
  email: "syedhassan2327@gmail.com",
  phone: "0313-2507953",
  location: "Karachi , Pakistan",
  logo: "/images/blogo.png",
};
