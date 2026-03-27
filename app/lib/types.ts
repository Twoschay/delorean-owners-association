// ============================================================
// DeLorean Owners Association — Type Definitions
// ============================================================

export type MembershipType = "national" | "international" | "lifetime";

export type ChapterName =
  | "Northeast"
  | "Southeast"
  | "Midwest"
  | "Southwest"
  | "Pacific"
  | "UK"
  | "Europe"
  | "Australia";

export interface Member {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string; // US state, province, or region
  country: string;
  lat: number;
  lng: number;
  chapter: ChapterName;
  membership_type: MembershipType;
  join_date: string; // ISO date string
  profession: string;
  bio: string;
  avatar_placeholder: string; // CSS gradient or initials
  show_on_map: boolean;
  vehicle_ids: string[];
  is_demo_user?: boolean;
}

export type VehicleColor =
  | "Stainless Steel"
  | "Black"
  | "Gold"
  | "Blue"
  | "Other";

export type VehicleTransmission = "5-speed manual" | "3-speed automatic";

export interface Vehicle {
  id: string;
  owner_id: string;
  year: 1981 | 1982 | 1983;
  vin: string;
  color: VehicleColor;
  engine: string;
  transmission: VehicleTransmission;
  mileage: number;
  modifications: string;
  description: string;
  condition: "Concours" | "Excellent" | "Good" | "Fair" | "Project";
  added_date: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  thread_count: number;
  post_count: number;
  last_post_date: string;
}

export interface ForumThread {
  id: string;
  category_id: string;
  title: string;
  body: string;
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  reply_count: number;
  view_count: number;
  is_pinned: boolean;
  is_locked: boolean;
  tags: string[];
}

export interface ForumReply {
  id: string;
  thread_id: string;
  author_id: string;
  author_name: string;
  body: string;
  created_at: string;
  is_solution?: boolean;
}

export type ClassifiedCategory =
  | "Vehicles"
  | "Parts"
  | "Accessories"
  | "Services"
  | "Wanted";

export type ClassifiedCondition =
  | "New"
  | "Like New"
  | "Good"
  | "Fair"
  | "For Parts"
  | "Concours"
  | "Excellent";

export interface Classified {
  id: string;
  seller_id: string;
  seller_name: string;
  title: string;
  description: string;
  price: number;
  price_negotiable: boolean;
  category: ClassifiedCategory;
  condition: ClassifiedCondition;
  location: string;
  images: string[]; // placeholder CSS gradient identifiers
  listed_date: string;
  is_sold: boolean;
  contact_email: string;
  part_number?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type:
    | "Annual Expo"
    | "Chapter Meet"
    | "Car Show"
    | "Tech Workshop"
    | "Webinar"
    | "Other";
  date: string; // ISO date
  end_date?: string;
  location: string;
  city: string;
  state: string;
  country: string;
  lat?: number;
  lng?: number;
  organizer: string;
  chapter?: ChapterName;
  rsvp_count: number;
  max_attendees?: number;
  is_members_only: boolean;
  registration_url?: string;
  image_placeholder: string;
  is_past: boolean;
}

export interface EventRSVP {
  id: string;
  event_id: string;
  member_id: string;
  member_name: string;
  rsvp_date: string;
  status: "attending" | "maybe" | "not_attending";
}

export interface MagazineIssue {
  id: string;
  volume: number;
  issue: number;
  title: string;
  cover_story: string;
  published_date: string;
  cover_placeholder: string; // CSS gradient identifier
  page_count: number;
  highlights: string[];
  is_digital_only: boolean;
}

export interface ServiceCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  website?: string;
  specialties: string[];
  description: string;
  is_official_dmc: boolean;
}

export interface User extends Member {
  // Extended user profile for auth
  notifications_enabled: boolean;
  newsletter_subscribed: boolean;
  profile_public: boolean;
}
