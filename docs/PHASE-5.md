# OpenClaw Task: DOA Website Revamp — Phase 5: Garage, Resources & Account

## Context
Phases 1-4 are complete. The project has all public pages, dashboard, forum, member directory, map, magazine, classifieds, and events built. Now build the final feature set: Digital Garage (vehicle registry), Resources hub (service center locator, tech library), and Account settings.

Read these skills: `nextjs-expert`, `frontend`, `ui-ux-pro-max`

---

## Task: Digital Garage + Resources + Account

### 1. Digital Garage (Vehicle Registry)

#### My Garage (`app/(member)/garage/page.tsx`)

This is a member's personal vehicle showcase. Think of it as a "car profile" — a digital companion to their physical DeLorean.

**Page Layout:**
- Page title: "My Garage"
- "Add Vehicle" button (amber CTA)
- If the demo user has vehicles, show them as large cards:

**Vehicle Card (one per car):**
- Large photo area (gradient placeholder with DeLorean silhouette)
- Year + "DeLorean DMC-12" title
- VIN display (in JetBrains Mono, partially masked: SCEDT26T•••••1234)
- Key specs grid:
  - Color: Stainless Steel
  - Engine: PRV V6 2.85L
  - Transmission: 5-Speed Manual
  - Mileage: 42,500 mi
- Modifications summary (if any)
- "View Full Profile" button
- "Edit Vehicle" button

**Community Stats:**
- "X vehicles registered across the community"
- "Car of the Month" highlight (random vehicle from mock data, displayed prominently)

#### Vehicle Detail (`app/(member)/garage/[vehicleId]/page.tsx`)

Full vehicle profile page — this should feel like a premium spec sheet.

**Hero:**
- Large photo area (full width)
- Year + Model overlay text

**Specs Section (two-column grid):**
- VIN (full, in monospace)
- Year
- Color
- Engine
- Transmission
- Mileage
- Owner: link to member profile

**Modifications Section:**
- List of modifications with descriptions
- If none: "Stock — as John DeLorean intended"

**Ownership History:**
- Timeline showing ownership changes (mock data)
- "Original owner" or "2nd owner" etc.

**Maintenance Log (placeholder):**
- Table/timeline showing maintenance entries
- For demo: show 3-4 sample entries:
  - "Oil Change — Jan 2026"
  - "Door strut replacement — Nov 2025"
  - "Annual inspection — Aug 2025"
- "Add Maintenance Entry" button (placeholder)

**Photo Gallery:**
- Grid of vehicle photos (placeholders)
- Click to enlarge (use shadcn Dialog)

**Share Button:**
- "Share Vehicle Profile" — copies a shareable URL

#### Add/Edit Vehicle Form (`app/(member)/garage/new/page.tsx`)

- Form fields:
  - VIN (text, with format hint: SCEDT26T_B_######)
  - Year (select: 1981, 1982, 1983)
  - Color (select: Stainless Steel, Black, Gold, Blue, Custom)
  - Engine (select: Stock PRV V6, Turbo PRV, LS Swap, EV Conversion, Other)
  - Transmission (select: 5-Speed Manual, 3-Speed Automatic)
  - Current Mileage (number)
  - Modifications (textarea)
  - Ownership History (textarea)
  - Photos (upload area — placeholder)
- "Save Vehicle" button
- Demo note at bottom

### 2. Resources Hub

#### Resources Home (`app/(member)/resources/page.tsx`)

- Page title: "Member Resources"
- Grid of resource cards linking to sub-sections:
  1. 🔧 Service Center Locator — "Find DeLorean-certified mechanics near you"
  2. 📚 Tech Library — "Technical articles, guides, and how-tos"
  3. 💰 Vehicle Appraisal — "Request a professional vehicle appraisal"
  4. 🛒 Parts Sources — "Trusted parts suppliers and vendors"
- Each card: icon, title, description, "Explore" button

#### Service Center Locator (`app/(member)/resources/service-centers/page.tsx`)

**Map + List hybrid layout:**

**Map (top or left, 60% on desktop):**
- Mapbox map (or SVG fallback) showing service center locations
- Custom markers (wrench icon in amber)
- Click marker → info popup with:
  - Shop name
  - Address
  - Specialties badges
  - "View Details" link
- Zoom to user location option ("Find shops near me")

**List (bottom or right, 40% on desktop):**
- All 15 service centers listed as cards
- Each showing:
  - Shop name
  - City, State, Country
  - Phone number
  - Specialties: badges for Mechanical, Electrical, Body Work, Restoration, EV Conversion
  - Verified badge (if verified by DOA)
  - Distance from user (placeholder or calculated from mock coordinates)
- Search by location input
- Filter by specialty

**"Recommend a Service Center" section at bottom:**
- Brief form: name, location, specialties, your experience
- Demo note

#### Tech Library (`app/(member)/resources/tech-library/page.tsx`)

- Page title: "Tech Library"
- Grid of article/guide cards (mock 10-12 articles):
  - "Beginner's Guide to DMC-12 Maintenance"
  - "Understanding the PRV V6 Engine"
  - "Door Strut Replacement — Step by Step"
  - "Stainless Steel Care and Polishing"
  - "Electrical System Troubleshooting"
  - "EV Conversion Options for Your DeLorean"
  - "Cold Weather Starting Tips"
  - "Fuel Injection System Overview"
  - "Interior Restoration Guide"
  - "Buying Your First DeLorean — What to Look For"
- Each card: title, category badge, estimated read time, brief excerpt
- Category filter: Maintenance, Engine, Electrical, Body, Buying Guide, EV
- Articles themselves can be placeholder pages with a title and "Full article coming soon in production" message

#### Vehicle Appraisal (`app/(member)/resources/appraisal/page.tsx`)

- Explanation of the appraisal service
- Form:
  - VIN
  - Year
  - Mileage
  - Condition description
  - Photos (upload placeholder)
  - Reason for appraisal (select: Insurance, Sale, Curiosity)
  - Contact info
- "Submit Appraisal Request" button
- Note: "A DOA-certified appraiser will contact you within 5 business days"

### 3. Account Settings

#### Account Home (`app/(member)/account/page.tsx`)

- Page title: "My Account"
- Grid of account sections:
  1. Edit Profile
  2. Membership Status
  3. Map Visibility
  4. Change Password
  5. Notification Preferences
  6. Contact Support

#### Edit Profile (`app/(member)/account/edit/page.tsx`)

**Profile Photo:**
- Current avatar (large, circular)
- "Change Photo" button (placeholder upload)

**Personal Information Form:**
- First Name, Last Name
- Display Name
- Email
- Phone
- City, State/Province, Country
- Bio (textarea)
- Profession

**Map Visibility Toggle: ⭐ KEY FEATURE**
- Prominent toggle switch: "Show me on the Global Member Map"
- Description: "When enabled, your approximate location (city level) will be visible to other members on the interactive map. Your exact address is never shared."
- Current status display: "You are currently visible/hidden on the member map"
- If toggling ON:
  - Confirmation dialog: "By enabling this, your city and country will be visible to other DOA members on the global map. Do you want to proceed?"
  - "Yes, show me on the map" / "Cancel"
- If toggling OFF:
  - Immediate toggle, no confirmation needed

**Chapter Selection:**
- Dropdown of available chapters
- "Not sure? Find your nearest chapter" link

**"Save Changes" button**

#### Membership Status (`app/(member)/account/membership/page.tsx`)

- Membership card display:
  - Styled like a physical membership card
  - Dark background with steel border and amber accents
  - DOA logo
  - Member name
  - Membership type badge
  - Member number (mock)
  - Member since date
  - Renewal date
  - Status: Active (green badge)
- Renewal section:
  - "Your membership renews on [date]"
  - "Renew Now" button (placeholder)
  - "Upgrade to Lifetime" option
- Payment history table (mock entries):
  - Date, description, amount, status
  - 3-4 entries showing annual renewals

#### Notification Preferences (`app/(member)/account/notifications/page.tsx`)

- Toggle switches for:
  - Email me when someone replies to my forum posts
  - Email me about new events in my chapter
  - Email me the monthly Stainless News newsletter
  - Email me about new classified listings in my watched categories
  - Email me about membership renewal reminders
  - Email me DeLorean World Magazine digital edition notifications
- "Save Preferences" button

---

## Design Notes

- The Digital Garage should feel like a car showroom — premium, detailed, proud
- The membership card on the account page should look like a real physical card — could be a great visual touch
- Service center map should mirror the member map style (dark theme, amber markers)
- Account pages should be clean and functional — no need for heavy design here

## Verification

1. Garage shows the demo user's vehicle(s)
2. Vehicle detail page displays all specs, maintenance log, photos
3. Add vehicle form renders with all fields
4. Resources hub links to all sub-sections
5. Service center locator shows map with 15 centers
6. Service center cards display correctly with specialty badges
7. Tech library shows article cards with category filters
8. Appraisal form renders correctly
9. Account edit page has the map visibility toggle prominently displayed
10. Membership card looks like a real card
11. All pages are mobile responsive
12. Cross-navigation between garage, profile, and map works

Commit: `feat: digital garage, service center locator, tech library, appraisal, and account settings`
