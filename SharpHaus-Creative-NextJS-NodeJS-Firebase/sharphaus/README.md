# SharpHaus Creative — Portfolio Website

A revamped version of the SharpHaus Creative portfolio, rebuilt as a proper
production stack:

- **Frontend:** Next.js 14 (App Router) + Tailwind CSS
- **Backend:** Node.js + Express (handles the contact form)
- **Database:** Firebase Firestore (via the Firebase Admin SDK on the backend)

All of your original artwork, categories, and copy are preserved exactly —
only the code, structure, design polish, responsiveness, and performance
have been improved.

## Project structure

```
sharphaus/
├── frontend/         Next.js site (what visitors see)
│   ├── public/images  Your original design samples (unchanged)
│   └── src/
│       ├── app/        Pages (App Router)
│       ├── components/ Reusable UI (Navbar, Footer, Gallery, etc.)
│       ├── data/        Single source of truth for services + galleries
│       └── lib/         Small helpers (API calls)
└── backend/          Express API (contact form → Firestore)
    └── src/
        ├── routes/       /api/contact
        └── middleware/   basic rate limiting
```

## Why this structure is better than the old one

- **One data file (`src/data/services.js`)** now drives the home page service
  cards, the `/services` page, the `/portfolio` index, and every individual
  gallery page — including a `group` field per category so the portfolio can
  be filtered (Branding / Digital / Illustration / Print). In the old project
  each of the 12 gallery pages was a hand-duplicated component — now
  adding/removing a sample image or a whole category is a one-line change.
- **`next/image`** replaces plain `<img>` tags, so every photo is
  automatically resized, lazy-loaded, and served in a modern format.
- **The contact form no longer talks to Firebase directly from the browser**.
  It calls your own Express API, which is the only place that holds Firebase
  Admin credentials — more secure and easier to extend later (email
  notifications, spam filtering, etc.).
- **Every category shows every one of its images** — clicking a portfolio
  category opens a lightbox with all of that category's samples, next/prev
  buttons, a thumbnail strip to jump around, an image counter, keyboard
  arrows/Esc, and swipe support on mobile. Nothing is hardcoded to a single
  image.
- **Real design-agency motion**, powered by `framer-motion`: staggered
  headline reveals in the hero, scroll-triggered fade-ups on every section,
  an animated active-link pill in the navbar, animated filter tabs on
  `/portfolio`, hover-lift + image-zoom + overlay reveal on every project
  card, and a smoothly animated mobile menu.
- **Component breakdown** matches a professional structure: `Navbar`,
  `Hero`, `StatsSection`, `ServiceCard`, `PortfolioCard`, `PortfolioFilter`,
  `PortfolioGallery`, `Lightbox`, `FeaturedWorkSlider`, `CTA`, `Footer`,
  `Reveal` (shared scroll-animation helper) — no giant one-file pages, no
  copy-pasted markup per category.
- **Accessible throughout**: focus states, alt text, keyboard-navigable
  lightbox and menus, semantic headings, and proper page titles/meta
  descriptions per page for SEO.

## What's new in this revision

- **Color theme reverted back to the original amber/slate identity** per
  feedback — the violet/pink experiment is gone. All the motion and
  structural upgrades from that round stayed (marquee, grain overlay,
  animated hero particle background, magnetic buttons, hover-cycling
  portfolio cards).
- **Redesigned custom cursor.** Instead of a plain dot-and-ring, the ring
  now smoothly morphs into a filled, labeled pill when it passes over
  something interactive — showing a contextual word ("View" on portfolio
  cards, "Open" on gallery thumbnails, "Explore"/"Contact" on the hero
  buttons) or a small arrow glyph everywhere else. It's still desktop-only
  and disables itself automatically on touch devices.

## Previous revision notes

- **An animated particle-network background** in the hero
  (`AnimatedBackground.jsx`, pure canvas, no dependencies) plus a
  cursor-following spotlight glow. This exists as an honest stand-in for a
  real showreel video — there's a comment directly in `Hero.jsx` showing
  exactly where to drop in a real `<video>` background once you have actual
  footage of your work. Nothing fake was faked here on purpose.
- **A film-grain texture overlay** (inline SVG noise, no image asset) for a
  more premium, less "flat gradient" feel.
- **A scrolling marquee ticker** under the hero stats.
- **Magnetic buttons** (`MagneticButton.jsx`) on the main CTAs — they
  subtly pull toward the cursor on hover, a common touch on award-style
  portfolio sites.
- **Portfolio cards now cycle through up to 3 real samples on hover**
  (a soft crossfade, like a mini slideshow) instead of a static single
  image — it's the closest thing to "video" that's honest to show, since it
  only ever displays your actual project photos.

## Previous revision notes

- **More content, more scroll** — the homepage now includes: a "Why Clients
  Choose Us" section, a 4-step "How We Work" process timeline, a
  software/tools strip, a testimonials section, and an FAQ accordion — on
  top of the hero, stats, featured-work slider, portfolio teaser, and
  services grid that were already there.
- **Testimonials are placeholders on purpose.** `src/data/services.js`
  exports a `testimonials` array with generic placeholder names/quotes and
  the section itself shows a small "Sample layout — replace with real
  client quotes" badge. Swap in real feedback before you publish, or delete
  `<TestimonialsSection />` from `src/app/page.js` if you don't have any yet.
- **The FAQ answers are starting drafts**, not verified policy — edit
  `faqs` in `src/data/services.js` to match your actual turnaround,
  revision, and pricing practices before publishing.
- Portfolio browsing is genuinely premium: real photo thumbnails on every
  category card, a hover overlay with a "View Project" reveal, and an
  animated category filter bar on `/portfolio`.
- A homepage "Featured Work" slider spans multiple categories in one
  horizontally-scrolling strip (autoplay, pause-on-hover, swipe, prev/next).
- The hero headline now animates word-by-word on load/slide-change, with
  small floating decorative shapes and an animated gradient on the
  highlighted subtitle.
- The navbar's active link is a smoothly animated pill (shared-layout
  animation) instead of an instant class swap, and the mobile menu slides
  open/closed instead of snapping.
- The lightbox gained a thumbnail strip so people can jump straight to a
  specific sample instead of only stepping one-by-one.

## 1. Frontend setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
# edit .env.local and set NEXT_PUBLIC_API_URL to your backend URL
npm run dev
```

Visit http://localhost:3000

Build for production:

```bash
npm run build
npm start
```

Deploy anywhere that supports Next.js (Vercel is the path of least
resistance; Netlify, Render, or a Node server all work too).

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env` with a Firebase **service account** (Firebase Console →
Project Settings → Service Accounts → Generate new private key):

```
PORT=5000
CORS_ORIGIN=http://localhost:3000
FIREBASE_PROJECT_ID=sharphousecreatives
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@sharphousecreatives.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Then run:

```bash
npm run dev     # nodemon, for local development
npm start       # plain node, for production
```

The backend exposes:

- `POST /api/contact` — `{ name, email, message }` → validates, rate-limits,
  and writes a document to the `submissions` collection in Firestore.
- `GET /api/health` — simple uptime check.

Deploy the backend anywhere that runs Node (Render, Railway, Fly.io, a VPS,
Cloud Run, etc.) and point `NEXT_PUBLIC_API_URL` at it.

## 3. Firebase

You only need Firestore turned on (Build → Firestore Database → Create
database). No client-side Firebase SDK is shipped anymore, so there is
nothing to configure in the browser.

## Notes

- All images are untouched, same filenames, same categories, same order as
  the original site — nothing was swapped, cropped, or removed.
- Placeholder stats (projects/clients/years) and contact details in the
  footer are carried over as-is from the original site; update them in
  `src/data/services.js` and `src/components/Footer.jsx` with your real
  numbers whenever you're ready.
