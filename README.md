# DeLorean Owners Association — Website Revamp Demo

A modern, community-first membership platform for the DeLorean Owners Association — built as a full-featured demo showcasing what a modern DOA digital presence could look like.

## Live Demo

🚀 **[View Live Demo](https://delorean-owners-association.vercel.app)**

### Demo Login
Click **"Member Login"** on any page → then **"Demo Login"** to explore all member features.
No account required — you'll be logged in as James Schay (Pacific Chapter).

---

## Features

### Public Site
- **Landing Page** — Hero section with stats, features, and join CTA
- **About** — DOA history, chapters, and statistics
- **Magazine Preview** — DeLorean World magazine archive teaser
- **Events** — Upcoming meets and expos
- **Join** — Membership registration flow

### Member Area (Login Required)
- **Dashboard** — Activity feed, quick stats, upcoming events, latest classifieds
- **Global Member Map** — Interactive map showing DeLorean owners worldwide (SVG fallback — no API key needed)
- **Forum** — Threaded community discussions with categories and nested replies
- **Member Directory** — Browse and connect with fellow owners
- **Digital Magazine** — Full DeLorean World magazine archive with issue viewer
- **Stainless News** — Monthly newsletter archive
- **Member Classifieds** — Buy/sell vehicles, parts, accessories, and services
- **Event Calendar** — RSVP to shows, meets, expos, and webinars (list + calendar view)
- **Digital Garage** — Personal vehicle registry with specs, maintenance log, and photo gallery
- **Service Center Locator** — Find DeLorean-certified mechanics worldwide
- **Tech Library** — Technical articles, guides, and how-tos
- **Vehicle Appraisal** — Request professional appraisals
- **Account Settings** — Profile, membership card, map visibility, notification preferences

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3
- **Components:** shadcn/ui
- **Language:** TypeScript
- **Authentication:** Mocked (demo mode — no real auth)
- **Data:** Fully mocked with realistic community content

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Twoschay/delorean-owners-association.git
cd delorean-owners-association/app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
app/
├── app/
│   ├── (public)/          # Public pages (landing, about, join, etc.)
│   └── (member)/          # Member-only pages (dashboard, forum, etc.)
├── components/
│   ├── layout/            # Header, sidebar, footer
│   ├── auth/              # Login modal, require-auth wrapper
│   └── ui/                # shadcn/ui components
└── lib/
    ├── auth.tsx            # Auth context (demo mode)
    ├── types.ts            # TypeScript types
    └── mock-data/          # All simulated community data
```

---

## Design Notes

- **Dark theme** throughout — obsidian black background with amber (#F5A623) accents
- **No external image dependencies** — all images are CSS gradient placeholders
- **No Mapbox API key required** — global member map uses SVG/CSS with amber dots
- **Mobile-first responsive** — hamburger menu on mobile, full nav on desktop
- **Accessible** — ARIA labels, keyboard navigation, focus indicators

---

## Notes

This is a **demo/prototype** for presentation purposes.

- All data is simulated — no real member information
- Authentication is mocked — no real user accounts or passwords
- Forum posts, classifieds, and events are sample content
- Magazine PDFs are placeholders (UI demonstrates the archive browser)

---

*Built by Tuschay Studios for the DeLorean Owners Association.*
*"The question is not where we're going, it's when." — Doc Brown*
