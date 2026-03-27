# OpenClaw Task: DOA Website Revamp — Phase 2: Public Pages

## Context
You are continuing the DeLorean Owners Association website revamp. Phase 1 is complete — you have a Next.js project with the design system, layouts, mock auth, and mock data in place. Now build the public-facing pages.

Read these skills before starting:
- `frontend`
- `ui-ux-pro-max`
- `anti-slop-design`

## Design Direction Reminder
- "Stainless Luxe" — dark theme, brushed metal textures, amber accents
- Bebas Neue for headers, DM Sans for body
- The DeLorean itself is the hero — let the car's iconic silhouette and stainless steel body drive the visuals
- This landing page needs to IMMEDIATELY convey: premium, historic, community, passion

---

## Task: Build All Public Pages

### Page 1: Landing / Splash (`app/(public)/page.tsx`)

This is the most important page — it's what the DOA board sees first.

**Hero Section (full viewport height):**
- Large background: Use a CSS gradient simulating a dark showroom with subtle steel shimmer
- Or use a high-quality DeLorean image from Unsplash/Pexels via `next/image` (search "delorean" or use a placeholder gradient)
- Massive headline in Bebas Neue: "THE WORLD'S PREMIER DELOREAN COMMUNITY"
- Subheadline: "Founded in 1983. 5,000+ Members. One Passion."
- Two CTAs: "Join the Association" (amber button) + "Member Login" (outlined steel button)
- Subtle animated element — maybe a gentle steel shimmer effect or floating particles

**Stats Bar (below hero):**
- Horizontal strip with animated counters:
  - "5,000+ Members Worldwide"
  - "40+ Years of Community"
  - "32 Volumes of DeLorean World Magazine"
  - "Chapters on 4 Continents"
- Dark charcoal background with amber accent line

**Features Grid:**
- 6 cards showcasing membership benefits:
  1. 🌐 Global Community — "Connect with DeLorean owners worldwide"
  2. 🗺️ Owner Map — "Find fellow owners near you with our interactive global map"
  3. 🔧 Tech Resources — "Service center locator, tech library, and expert advice"
  4. 📰 DeLorean World — "Our award-winning magazine, delivered digitally and in print"
  5. 🏎️ Digital Garage — "Showcase your DMC-12 with a detailed vehicle profile"
  6. 🎪 Events & Shows — "Chapter meets, expos, and the annual DeLorean gathering"
- Cards should have a subtle steel border, hover animation (slight lift + amber glow)

**Magazine Preview Section:**
- Latest issue cover (use mock data)
- "DeLorean World Magazine — Volume 32, Issue 2"
- Brief description
- "Read as a Member" CTA

**Member Map Preview:**
- A static or blurred version of the member map
- "5,000+ owners across the globe — see where they are"
- "Join to access the interactive map" CTA
- This section should create FOMO — the map is the hook

**Testimonial/Quote Section (optional):**
- "The DeLorean Owners Association is the heartbeat of the DeLorean community." — fictional member quote
- Clean, elegant styling

**CTA Footer Section:**
- "Ready to join the world's most passionate car community?"
- Membership tier preview (brief)
- "Join Now" button

### Page 2: About (`app/(public)/about/page.tsx`)

**Hero:**
- "About the DeLorean Owners Association"
- Subhead: "Preserving the legacy of the DeLorean DMC-12 since 1983"

**History Section:**
- Brief history of the DOA (founded 1983, oldest and largest)
- Timeline visual showing key milestones (founding, first Expo, 5000th member, etc.)

**Mission Statement:**
- "Our mission is to support DeLorean owners and enthusiasts worldwide, preserve the history of the DeLorean automobile, and educate the public about this iconic vehicle."

**Board of Directors:**
- Grid of placeholder cards (name, title, photo placeholder, brief bio)
- President, VP, Secretary, Treasurer, plus directors

**Chapters Section:**
- List of active chapters with their regions
- Northeast, Southeast, Midwest, Southwest, Pacific, UK, Europe, Australia

### Page 3: Join / Membership (`app/(public)/join/page.tsx`)

**Hero:**
- "Join the Association"
- "Whether you own a DeLorean or simply admire them, you belong here."

**Membership Tier Cards (side by side):**

| Feature | National ($50/yr) | International ($60/yr) | Lifetime ($500) |
|---|---|---|---|
| DeLorean World Magazine (Digital) | ✓ | ✓ | ✓ |
| DeLorean World Magazine (Print) | ✓ | ✓ | ✓ |
| Stainless News Newsletter | ✓ | ✓ | ✓ |
| Member Forum Access | ✓ | ✓ | ✓ |
| Member Classifieds | ✓ | ✓ | ✓ |
| Digital Garage | ✓ | ✓ | ✓ |
| Global Member Map | ✓ | ✓ | ✓ |
| Event Discounts | ✓ | ✓ | ✓ |
| Service Center Directory | ✓ | ✓ | ✓ |
| Vehicle Appraisal Access | ✓ | ✓ | ✓ |
| Voting Rights | ✓ | ✓ | ✓ |

- Use shadcn/ui Card components with the amber "Most Popular" badge on National
- "Join Now" buttons that link to a placeholder signup form (or the demo login)

**FAQ Section:**
- "Do I need to own a DeLorean?" → "No! Enthusiasts are welcome."
- "What's included in DeLorean World Magazine?"
- "How do I find my local chapter?"
- "Can I upgrade my membership later?"
- Use an accordion component

### Page 4: Contact (`app/(public)/contact/page.tsx`)

**Simple, elegant layout:**
- Contact form (name, email, subject, message) — form doesn't need to actually send
- Direct contact info:
  - Email: info@deloreanowners.org
  - Phone: (805) 964-5296
  - Mailing address placeholder
- Social media links (Facebook, Instagram — the DOA has these)
- "For membership questions, email membership@deloreanowners.org"

### Page 5: Public Events Preview (`app/(public)/events/page.tsx`)

- List of upcoming events (from mock data) — show only upcoming ones
- Each event card: title, date, location, brief description
- "Login to RSVP" button
- This is a teaser — full calendar is members-only

### Page 6: Public Magazine Preview (`app/(public)/magazine/page.tsx`)

- Grid of recent magazine covers (from mock data)
- Latest issue featured prominently
- "Subscribe to access the full digital archive"
- Brief description of what DeLorean World covers

---

## Implementation Notes

- All pages should use the public layout (`app/(public)/layout.tsx`)
- Use `next/image` for any images — use placeholder gradients or Unsplash URLs for DeLorean imagery
- For DeLorean placeholder images, you can use gradient backgrounds styled to look like brushed steel or use `/api/placeholder/[width]/[height]` style URLs
- Every page should be mobile-responsive
- Add smooth scroll behavior
- Use Framer Motion or CSS animations for entrance animations on scroll
- Keep page file sizes reasonable — split into components as needed

## Verification

1. All 6 public pages render without errors
2. Navigation between pages works correctly
3. Design feels cohesive — "Stainless Luxe" throughout
4. Mobile responsive (check at 375px, 768px, 1280px)
5. The landing page creates a strong first impression
6. Join page clearly communicates membership value

Commit: `feat: public pages — landing, about, join, contact, events preview, magazine preview`
