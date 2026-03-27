# OpenClaw Task: DOA Website Revamp — Phase 4: Content & Commerce

## Context
Phases 1-3 are complete. The project has public pages, dashboard, forum, member directory, and global map working. Now build the content-focused and marketplace features: digital magazine, classifieds, and event calendar.

Read these skills: `nextjs-expert`, `frontend`, `ui-ux-pro-max`

---

## Task: Magazine + Classifieds + Events

### 1. Digital Magazine & Content Library

#### Magazine Archive (`app/(member)/magazine/archive/page.tsx`)

- Page title: "DeLorean World Magazine Archive"
- Description: "Every issue of our award-winning magazine, from the latest to the archives."

**Issue Grid:**
- Responsive grid (4 cols desktop, 3 tablet, 2 mobile)
- Each issue card:
  - Cover image (use a gradient-based placeholder with volume/issue text overlay styled like a magazine cover — steel background with amber accents and "DeLorean World" header text)
  - Volume & Issue number
  - Title/theme
  - Published date
  - "Read Issue" button
- Sort by: Newest first (default), Oldest first
- Filter by: Year, Volume

**Featured Section:**
- Latest issue displayed prominently at top
- Large cover image, full description, "Read Latest Issue" CTA

#### Individual Issue (`app/(member)/magazine/[issueId]/page.tsx`)

- Issue cover image (large)
- Title, volume, issue number, date
- Description / table of contents
- "Open PDF" button (in demo, this shows a placeholder PDF viewer or message)
- PDF viewer component:
  - For the demo, create a styled placeholder that says "PDF Viewer — In production, the full digital magazine would display here"
  - Style it to look like an open magazine with the cover on the left page
  - Include sample article titles from the mock data as a table of contents
- "Previous Issue" / "Next Issue" navigation
- Related articles section (placeholder)

#### Stainless News Section (`app/(member)/magazine/news/page.tsx`)
- Newsletter archive list
- Each entry: title, date, brief excerpt
- "Read Full Newsletter" links
- For demo: show 6-8 newsletter entries with realistic titles like:
  - "March 2026 — Spring Driving Season Preview"
  - "February 2026 — EV Conversion Spotlight"
  - "January 2026 — New Year, New Members"

### 2. Member Classifieds Marketplace

#### Classifieds Home (`app/(member)/classifieds/page.tsx`)

- Page title: "Member Classifieds"
- "Create Listing" button (amber, prominent)

**Category Tabs:**
- All | Vehicles | Parts | Accessories | Services | Wanted
- Use shadcn Tabs component

**Listing Grid:**
- Cards showing:
  - Primary photo (use gradient placeholder with category icon)
  - Title
  - Price (formatted as USD)
  - Condition badge (New, Excellent, Good, Fair, Parts Only)
  - Category badge
  - Location
  - Posted date
  - Seller name (link to profile)
  - Status: Active (green), Sold (red strikethrough on price)
- Sort: Newest, Price Low-High, Price High-Low
- Search bar
- Grid layout: 3 cols desktop, 2 tablet, 1 mobile

**Sidebar filters (desktop) / Filter sheet (mobile):**
- Category checkboxes
- Price range (min/max inputs)
- Condition dropdown
- Location search

#### Listing Detail (`app/(member)/classifieds/[id]/page.tsx`)

- Photo gallery:
  - Main large image
  - Thumbnail strip below (click to swap main image)
  - For demo: show 3-4 placeholder images per listing
- Title + Price (large)
- Condition and category badges
- Full description (markdown rendered)
- Details grid:
  - Posted: date
  - Location: city, state
  - Condition: badge
  - Category: badge
  - Status: Active/Sold
- Seller card:
  - Avatar, name, member since
  - "Contact Seller" button (opens a placeholder modal: "In production, this would send a message to the seller")
  - "View Profile" link
- "Report Listing" text link (placeholder)
- Related listings section (other items in same category)

#### Create Listing (`app/(member)/classifieds/new/page.tsx`)

- Form with fields:
  - Title (text input)
  - Category (select: Vehicle, Parts, Accessories, Services, Wanted)
  - Price (number input with $ prefix)
  - Condition (select: New, Excellent, Good, Fair, Parts Only)
  - Location (text input)
  - Description (textarea with markdown hint)
  - Photos (file upload area — drag and drop styled, doesn't need to actually upload)
- "Preview Listing" and "Post Listing" buttons
- Demo note: "Listings are not saved in demo mode"

### 3. Event Calendar with RSVP

#### Events Page (`app/(member)/events/page.tsx`)

- Page title: "Events & Gatherings"
- "Suggest an Event" button

**View Toggle:** Calendar View | List View

**Calendar View:**
- Monthly calendar grid (use a custom component or shadcn Calendar as base)
- Days with events show an amber dot indicator
- Click a day → show events for that day in a side panel or below
- Navigation: Previous month / Next month / Today

**List View (default):**
- Upcoming events first, then past events
- Section headers: "Upcoming Events" / "Past Events"

**Event Cards (for both views):**
- Cover image placeholder (gradient with event type icon)
- Event title
- Date and time (formatted nicely with date-fns)
- Location (city, state or "Online")
- Event type badge (Show, Meet, Expo, Chapter, Online)
- Attendee count: "23 going"
- RSVP button: "RSVP" → changes to "Going ✓" on click (local state only)

**Filters:**
- Event type (checkboxes)
- Time: Upcoming only / All / Past only
- Location search

#### Event Detail (`app/(member)/events/[id]/page.tsx`)

- Hero: cover image or gradient with event title overlay
- Event title (large)
- Date/time display (start and end)
- Location:
  - Name and address
  - Embedded map showing the event location (Mapbox or static map placeholder)
  - "Get Directions" link (Google Maps)
- Event type badge
- Full description (markdown)
- RSVP section:
  - Current status: Not RSVP'd / Going / Maybe
  - Three buttons: "Going", "Maybe", "Can't Make It"
  - "Bring guests" counter (+/-)
  - "Add to Calendar" button (placeholder — in production would generate .ics file)
- Attendee list:
  - Grid of attendee avatars + names (from mock RSVP data)
  - "23 members are going"
  - Show first 12 with "View All" link
- Event organizer card (member who created it)

---

## Design Notes

- Magazine pages should feel editorial — generous whitespace, elegant typography
- Classifieds should feel like a proper marketplace — clean, scannable, trustworthy
- Events should feel exciting and community-focused — highlight the social aspect
- All three should maintain the "Stainless Luxe" theme
- Use amber accents for CTAs and interactive elements consistently

## Verification

1. Magazine archive shows 20 issues in a beautiful grid
2. Individual issue pages display correctly with navigation
3. Stainless News section has newsletter entries
4. Classifieds shows 25 listings with working category tabs
5. Classifieds filters work (category, sort)
6. Listing detail pages show all info with photo gallery
7. Create listing form renders correctly
8. Events show in both calendar and list views
9. Event detail pages have map and RSVP functionality
10. RSVP button toggles state correctly
11. Attendee list displays on event pages
12. All pages are mobile responsive

Commit: `feat: digital magazine archive, member classifieds marketplace, and event calendar with RSVP`
