# OpenClaw Task: DOA Website Revamp — Phase 3: Member Core Features

## Context
Phases 1-2 are complete. The project has the design system, layouts, mock data, and all public pages built. Now build the core member-only features: dashboard, forum, member directory, profiles, and the flagship global member map.

Read these skills: `nextjs-expert`, `frontend`, `ui-ux-pro-max`

All member pages use the `app/(member)/layout.tsx` layout and require authentication (wrap with the require-auth component).

---

## Task: Dashboard + Forum + Members + Map

### 1. Member Dashboard (`app/(member)/dashboard/page.tsx`)

The member's home base after login. Should feel like a personalized command center.

**Welcome Banner:**
- "Welcome back, {firstName}" with membership badge (National/International/Lifetime)
- Member since date, days until renewal
- Quick action buttons: "New Forum Post", "Create Listing", "Edit Garage"

**Activity Feed (left column, 60% width on desktop):**
- Combined feed showing recent activity across the site:
  - New forum threads and replies
  - New classified listings
  - Upcoming events
  - New members who joined
- Each item shows: icon, brief description, timestamp, link
- Load from mock data, sorted by date

**Sidebar (right column, 40% width on desktop):**
- **My Vehicles** card — show their DMC-12(s) from the garage with thumbnail
- **Upcoming Events** card — next 3 events with RSVP status
- **Quick Stats** card — total members, forum posts today, active classifieds
- **Member Map Mini** — small embedded map preview showing nearby members, "View Full Map" link

**Mobile:** Stack into single column — welcome banner → quick stats → activity feed → sidebar cards

### 2. Forum System

#### Forum Home (`app/(member)/forum/page.tsx`)
- Page title: "Community Forum"
- "New Thread" button (amber, prominent)
- Category grid/list from mock data, each showing:
  - Category icon (use lucide-react icons)
  - Category name and description
  - Thread count and reply count
  - Last activity timestamp and author
- Search bar with filters (category, date range, author)
- Pinned/featured threads section at top

#### Category View (`app/(member)/forum/[category]/page.tsx`)
- Breadcrumb: Forum > Category Name
- Category description banner
- Thread list showing:
  - Thread title (link to thread)
  - Author avatar + name
  - Reply count
  - View count
  - Last reply timestamp
  - Pinned threads at top with pin icon
- "New Thread in {Category}" button
- Pagination or infinite scroll

#### Thread View (`app/(member)/forum/[category]/[threadId]/page.tsx`)
- Breadcrumb: Forum > Category > Thread Title
- Original post:
  - Author card (avatar, name, membership type badge, join date, post count)
  - Full post content (rendered markdown)
  - Timestamp
  - Action bar: Reply, Bookmark, Share
- Replies list:
  - Same author card format
  - Reply content
  - Upvote button with count
  - Reply timestamp
  - Nested replies (1 level deep max for simplicity)
- Reply composer at bottom:
  - Rich text area (textarea with markdown preview)
  - "Post Reply" button
  - Note: In demo mode, replies don't persist (that's fine)

#### New Thread Modal/Page:
- Title input
- Category selector
- Rich text content area
- "Post Thread" button
- Demo note: "In the demo, threads are not persisted"

### 3. Member Directory (`app/(member)/members/page.tsx`)

- Page title: "Member Directory"
- Search bar (search by name, city, chapter)
- Filter tabs or dropdowns: All, By Chapter, By Country
- Member grid (3 columns desktop, 2 tablet, 1 mobile):
  - Avatar
  - Display name
  - City, State/Country
  - Chapter badge
  - Membership type badge
  - Member since year
  - "View Profile" link
  - If show_on_map is true, show a small map pin icon
- Pagination
- Total member count displayed

### 4. Member Profile (`app/(member)/members/[id]/page.tsx`)

- Profile header:
  - Large avatar
  - Display name
  - Membership badge (type + years as member)
  - Location (city, state, country)
  - Chapter
  - Bio
  - Join date
- Vehicle showcase (if they have vehicles registered):
  - Vehicle card(s) with year, VIN preview, color, photo placeholder
  - Link to full vehicle page in garage
- Activity summary:
  - Forum posts count
  - Classifieds listings count
  - Events attended count
- Contact button (placeholder — would send in-app message)

### 5. Global Member Map (`app/(member)/members/map/page.tsx`) ⭐ FLAGSHIP

This is the feature that sells the project. Make it impressive.

**Full-page map using Mapbox GL JS:**

Note: For the demo, use a free Mapbox token. If no token is available, create a beautiful fallback using a custom SVG/CSS world map with plotted dots. The component should gracefully handle missing API keys.

**Map Features:**
- Dark map style (mapbox://styles/mapbox/dark-v11 or similar)
- Custom DeLorean-themed markers:
  - Small amber/gold dots for individual members
  - Cluster circles that show count when zoomed out (steel colored)
  - Clusters expand into individual pins on zoom
- Initial view: Show the whole world, slightly tilted for drama
- Smooth zoom animations

**Member Pins:**
- Click a pin → popup card showing:
  - Member name
  - City, Country
  - Vehicle year (if shared)
  - Chapter
  - "View Profile" link
- Only show members where `show_on_map === true` from mock data

**Controls:**
- Toggle: "Cluster View" / "Pin View"
- Filter sidebar/panel:
  - By chapter (checkboxes)
  - By country
  - By vehicle year
  - "Show heat map" toggle (if Mapbox supports it)
- Member count display: "Showing 180 of 250 members on map"
- "Find me" button (uses browser geolocation to center map)

**Fallback (no Mapbox key):**
- Render a stylized SVG world map
- Plot dots at member coordinates using SVG circles
- Amber dots on dark background
- Still interactive (hover for tooltips)
- This fallback should still look great — it's a demo after all

**Header above map:**
- "Global DeLorean Owner Map"
- "Connect with fellow owners around the world"
- Toggle controls inline

**Mobile:** Full screen map with slide-up filter panel

### Mock Data Integration

For all features, import from `lib/mock-data/`:
- Forum pages use forum categories, threads, and replies
- Member directory and map use the members array
- Dashboard combines all data sources

Make sure all links between features work:
- Forum thread author links to member profile
- Member profile links to their vehicles
- Dashboard activity links to relevant pages

---

## Technical Notes

- Use dynamic routes with `[category]`, `[threadId]`, `[id]` params
- Use `searchParams` for filters and pagination
- Map component must be client-side only (use `dynamic` import with `ssr: false` for Mapbox)
- Forum content should render markdown safely
- All pages need loading states (use shadcn Skeleton components)

## Verification

1. Dashboard renders with all sections populated from mock data
2. Forum navigation works: home → category → thread → back
3. Forum has 8 categories with realistic threads and replies
4. Member directory shows 250 members with search/filter
5. Member profiles display correctly with vehicle info
6. Member map plots ~180 points across the globe
7. Map clusters work on zoom in/out
8. Map pin click shows member popup
9. All cross-links between features work
10. Everything is mobile responsive

Commit: `feat: member dashboard, forum system, directory, profiles, and global member map`
