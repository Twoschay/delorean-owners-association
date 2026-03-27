# OpenClaw Task: DOA Website Revamp — Phase 1: Foundation

## Context
You are building a demo website for the DeLorean Owners Association (DOA), the oldest and largest international DeLorean owners organization (est. 1983, 5,000+ members). The current site is a dated WordPress site. We are building a modern Next.js replacement as a fully interactive demo with mock data.

Read these skills before starting:
- `nextjs-expert` or `nextjs-guidelines`
- `frontend`
- `shadcn-ui`
- `ui-ux-pro-max`
- `anti-slop-design`

## Task: Project Scaffold + Design System + Layouts + Mock Auth + Mock Data

### Step 1: Initialize the project

```bash
npx create-next-app@latest delorean-owners --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd delorean-owners
npx shadcn@latest init
# When prompted: style=new-york, base-color=zinc, css-variables=yes
```

Install additional dependencies:
```bash
npm install mapbox-gl @mapbox/mapbox-gl-geocoder
npm install lucide-react date-fns
npm install @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-select
npm install react-markdown
npm install --save-dev @types/mapbox-gl
```

Install shadcn/ui components we'll need:
```bash
npx shadcn@latest add button card input textarea badge avatar dialog dropdown-menu tabs select separator sheet command scroll-area tooltip calendar popover
```

### Step 2: Design System — globals.css

Set up the "Stainless Luxe" design system. The DeLorean DMC-12's stainless steel body and amber turn signal lights inspire the palette. Dark theme primary (showroom at night feel).

**Color palette:**
```
Steel:       #C0C0C0 (stainless steel primary)
Steel Dark:  #8A8A8A (brushed steel)
Steel Light: #E8E8E8 (light steel surfaces)
Obsidian:    #1A1A1A (deep black bg)
Charcoal:    #2D2D2D (card/surface bg)
Amber:       #F5A623 (DeLorean turn signal accent — primary action color)
Amber Glow:  #FFD700 (hover/highlight)
White:       #FAFAFA (text on dark)
Muted:       #6B7280 (secondary text)
```

Map these to shadcn/ui CSS variables. Dark mode is default.

**Typography:**
- Import from Google Fonts: Bebas Neue (display), DM Sans (body), JetBrains Mono (mono)
- Headers use Bebas Neue — bold, industrial, automotive feel
- Body uses DM Sans — clean and modern
- VIN numbers, tech specs use JetBrains Mono

**Tailwind config additions:**
- Extend fontFamily with these
- Add custom `steel-gradient` and `amber-gradient` utilities
- Add subtle `brushed-metal` background texture utility

### Step 3: Layout Components

Create these layout components:

**`components/layout/site-header.tsx`** — Public site header
- DOA logo (text-based for now: "DMC" icon + "DELOREAN OWNERS ASSOCIATION")
- Navigation: Home, About, Join, Magazine, Events, Contact
- "Member Login" button (right side, amber accent)
- Sticky, backdrop-blur, dark background
- Mobile hamburger menu via Sheet component

**`components/layout/member-header.tsx`** — Authenticated member header
- Same DOA branding
- Navigation: Dashboard, Forum, Classifieds, Magazine, Events, Members, Garage, Resources
- User avatar dropdown (Profile, Settings, Logout)
- Notification bell icon (placeholder)
- Mobile responsive with sheet nav

**`components/layout/member-sidebar.tsx`** — Optional sidebar for member area
- Condensed nav links with icons (using lucide-react)
- Collapsible on desktop, hidden on mobile
- Current user card at bottom (avatar, name, membership type)

**`components/layout/footer.tsx`** — Site footer
- DOA logo and tagline: "The world's premier DeLorean community since 1983"
- Links: About, Contact, Privacy, Terms
- Social media icons (placeholder)
- © Copyright 1983 - 2026 De Lorean Owners Association
- Chapter links section

**`app/(public)/layout.tsx`** — Public layout (site-header + footer)
**`app/(member)/layout.tsx`** — Member layout (member-header + sidebar + footer)
**`app/layout.tsx`** — Root layout with fonts, metadata, dark mode class

### Step 4: Mock Authentication System

Create `lib/auth.ts` — a React context-based mock auth:
- `AuthProvider` wrapping the app
- `useAuth()` hook returning: `{ user, isAuthenticated, login, logout }`
- `login()` sets a demo user (pre-populated with realistic data)
- `logout()` clears the user
- Demo user: "James Schay" with member_since 2024, national membership, 1 vehicle
- Store auth state in localStorage so it persists across refreshes
- This will be completely replaced with real auth later

Create `components/auth/login-modal.tsx`:
- Modal with email/password fields (decorative)
- "Demo Login" button that auto-logs in with the demo user
- Note: "This is a demo — click Demo Login to explore"

Create a middleware-like wrapper `components/auth/require-auth.tsx`:
- Wraps member pages, redirects to login modal if not authenticated

### Step 5: Mock Data Generators

Create comprehensive mock data in `lib/mock-data/`. Each file should export typed arrays of realistic data.

**`lib/mock-data/members.ts`** — 250 members
- Spread: US 60%, UK 15%, Europe 15%, Australia/NZ/other 10%
- Each member has: id, name, email, city, state/province, country, lat/lng, chapter, membership_type (national/international/lifetime), join_date (ranging from 1983 to 2026), profession, bio, avatar placeholder, show_on_map (true for ~180 of them)
- Chapters: Northeast, Southeast, Midwest, Southwest, Pacific, UK, Europe, Australia
- Use realistic city/state combos (not random coordinates)
- Include the logged-in demo user as one of the members

**`lib/mock-data/vehicles.ts`** — 50 vehicles
- All are DeLorean DMC-12s (the only model made)
- Year: all 1981, 1982, or 1983 (only production years)
- VINs: realistic format (SCEDT26T_B_######)
- Colors: Stainless Steel (unpainted, most common), Black, Gold, Blue (rare factory colors)
- Engine options: PRV V6 2.85L (stock), various mods (turbo, LS swap, EV conversion)
- Transmission: 5-speed manual or 3-speed automatic
- Mileage: ranging from 5,000 to 95,000
- Linked to member owner_ids
- Modifications text for some (suspension upgrades, EV conversions, stereo, etc.)

**`lib/mock-data/forum.ts`** — 8 categories, 40 threads, 120 replies
- Categories: General Discussion, Tech Talk, Buying & Selling Tips, Events & Meets, EV Conversions, Restoration, Regional, Off-Topic
- Threads should feel authentic:
  - "Just picked up my first DMC-12!" (intro posts)
  - "PRV V6 timing chain replacement guide"
  - "Anyone going to DeLorean Expo 2026?"
  - "EV swap — Tesla motor or Chevy Bolt motor?"
  - "Best source for replacement door struts?"
  - "Stainless steel cleaning and polishing tips"
- Replies should be conversational and helpful

**`lib/mock-data/classifieds.ts`** — 25 listings
- Categories: Vehicles (5), Parts (10), Accessories (5), Services (3), Wanted (2)
- Vehicle listings: complete DMC-12s with prices ($30k-$85k range)
- Parts: door struts, flux capacitor replicas (joke ones too), weather stripping, fuel injectors, relay kits
- Realistic prices, conditions, locations, descriptions

**`lib/mock-data/events.ts`** — 12 events in 2026
- Mix of: DeLorean Expo (annual big one), regional chapter meets, car shows, tech workshops, online webinars
- Include past events (already happened) and upcoming ones
- Locations across the US and UK
- RSVP counts (some events popular, some small)

**`lib/mock-data/magazine.ts`** — 20 issues
- Volumes 25-32, various issue numbers
- Titles like: "Ladies of Stainless", "EV Revolution", "40th Anniversary Special", "Restoration Guide"
- Cover image placeholder URLs
- Published dates spanning 2015-2026

**`lib/mock-data/service-centers.ts`** — 15 service centers
- Real-ish DeLorean specialty shops:
  - DeLorean Motor Company (Humble, TX) — the actual parts supplier
  - Various specialty shops in CA, FL, NY, IL, WA, UK
- Each with: name, address, lat/lng, phone, specialties (mechanical, electrical, body, EV conversion, restoration)

**`lib/mock-data/index.ts`** — Re-export everything with types

### Step 6: TypeScript Types

Create `lib/types.ts` with full type definitions for:
- Member, Vehicle, ForumCategory, ForumThread, ForumReply, Classified, Event, EventRSVP, MagazineIssue, ServiceCenter

### Verification

After completing all steps:
1. Run `npm run dev` and verify the app starts without errors
2. Navigate to `/` — should show the public layout with header and footer
3. The design system colors should be visible in the dark theme
4. Mock data files should all export valid typed arrays
5. The auth context should allow login/logout

Commit with message: `feat: initial scaffold with design system, layouts, mock auth and data`
