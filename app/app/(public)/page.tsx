import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  Car,
  Calendar,
  BookOpen,
  MapPin,
  Wrench,
  Globe,
  Star,
  ChevronRight,
} from "lucide-react";
import { getLatestIssues } from "@/lib/mock-data/magazine";
import { getUpcomingEvents } from "@/lib/mock-data/events";

export default function HomePage() {
  const latestIssues = getLatestIssues(4);
  const upcomingEvents = getUpcomingEvents().slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-obsidian">
          {/* Brushed metal texture */}
          <div className="absolute inset-0 brushed-metal opacity-30" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian/95 to-charcoal/80" />
          {/* Subtle amber glow from bottom right */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-amber/5 rounded-full blur-3xl" />
          {/* Steel shimmer lines */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-steel to-transparent"
                style={{
                  top: `${10 + i * 12}%`,
                  left: 0,
                  right: 0,
                  opacity: 0.3 + (i % 3) * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right side visual — DeLorean silhouette area */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block overflow-hidden">
          <div className="h-full relative">
            {/* Stainless steel gradient */}
            <div className="absolute inset-0 steel-gradient opacity-5" />
            {/* Big DMC text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[220px] text-white/[0.04] leading-none select-none">
                DMC-12
              </span>
            </div>
            {/* Decorative gull-wing door hint */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.07]"
              viewBox="0 0 600 400"
              fill="none"
            >
              {/* Abstract DeLorean door lines */}
              <path
                d="M150 200 Q300 50 450 200"
                stroke="#C0C0C0"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M120 210 Q300 30 480 210"
                stroke="#F5A623"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M100 250 L300 100 L500 250"
                stroke="#C0C0C0"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <rect
                x="200"
                y="250"
                width="200"
                height="80"
                rx="4"
                stroke="#C0C0C0"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            {/* Fade to content */}
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/40 to-transparent" />
          </div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-amber/10 text-amber border-amber/30">
                Est. 1983
              </Badge>
              <Badge variant="outline" className="border-steel/30 text-steel">
                5,000+ Members Worldwide
              </Badge>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-none tracking-wide mb-2">
              THE WORLD&apos;S PREMIER
            </h1>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-wide mb-6">
              <span className="text-amber">DELOREAN</span>{" "}
              <span className="text-steel/80">COMMUNITY</span>
            </h1>

            <p className="text-lg text-steel/70 mb-3 font-light tracking-wider uppercase text-sm">
              Founded in 1983 &nbsp;·&nbsp; 5,000+ Members &nbsp;·&nbsp; One Passion
            </p>

            <p className="text-base text-steel/60 mb-8 leading-relaxed max-w-lg">
              The DeLorean Owners Association is the oldest and largest international DeLorean
              owners organization. Forums, events, classifieds, the digital magazine, and a
              global community — all dedicated to the DMC-12.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-amber hover:bg-amber-glow text-obsidian font-bold text-base h-12 px-6 shadow-amber-glow transition-all hover:scale-105"
              >
                <Link href="/join">
                  Join the Association
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-steel/30 text-steel hover:text-white hover:border-white/40 hover:bg-white/5 h-12 px-6"
              >
                <Link href="/about">Learn Our Story</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-steel/40" />
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-charcoal border-y border-border py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-amber/[0.02]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
        <div className="container relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "5,000+", label: "Members Worldwide", icon: Users },
              { value: "40+", label: "Years of Community", icon: Star },
              { value: "32", label: "Volumes of DeLorean World", icon: BookOpen },
              { value: "4", label: "Continents with Chapters", icon: Globe },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <stat.icon className="h-5 w-5 text-amber/60 mx-auto mb-2" />
                <div className="font-display text-4xl text-amber leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="py-20 relative">
        <div className="absolute inset-0 brushed-metal opacity-10" />
        <div className="container relative">
          <div className="text-center mb-12">
            <p className="text-amber text-sm uppercase tracking-widest mb-3 font-medium">
              Membership Benefits
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-4">
              EVERYTHING FOR YOUR <span className="text-amber">DELOREAN</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              From technical resources to a global community, the DOA gives you everything
              you need to own, maintain, and enjoy your DMC-12.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Globe,
                title: "Global Community",
                description:
                  "Connect with DeLorean owners across 8 chapters on 4 continents. The world's largest DeLorean network.",
                href: "/members",
              },
              {
                icon: MapPin,
                title: "Interactive Owner Map",
                description:
                  "Find fellow owners near you on our interactive global member map. 4,000+ DeLoreans plotted worldwide.",
                href: "/join",
              },
              {
                icon: Wrench,
                title: "Tech Resources",
                description:
                  "Service center locator, technical library, repair guides, and expert advice from veteran owners.",
                href: "/join",
              },
              {
                icon: BookOpen,
                title: "DeLorean World Magazine",
                description:
                  "Our award-winning print and digital magazine. 40+ years of DeLorean coverage, delivered to members.",
                href: "/magazine",
              },
              {
                icon: Car,
                title: "Digital Garage",
                description:
                  "Showcase your DMC-12 with a detailed vehicle profile. VIN, history, modifications, and photos.",
                href: "/join",
              },
              {
                icon: Calendar,
                title: "Events & Expos",
                description:
                  "Chapter meets, the annual DeLorean Expo, tech workshops, and road trips throughout the year.",
                href: "/events",
              },
            ].map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group delorean-card p-6 hover:border-amber/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-amber-glow/5"
              >
                <div className="w-12 h-12 rounded bg-amber/10 border border-amber/20 flex items-center justify-center mb-4 group-hover:bg-amber/20 transition-colors">
                  <feature.icon className="h-5 w-5 text-amber" />
                </div>
                <h3 className="font-display text-lg text-white tracking-wide mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-medium text-amber/50 group-hover:text-amber transition-colors">
                  Learn more
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAGAZINE PREVIEW ===== */}
      <section className="py-20 bg-charcoal border-t border-border">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Featured issue */}
            <div className="flex-1">
              <p className="text-amber text-sm uppercase tracking-widest mb-3 font-medium">
                Latest Issue
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-4">
                DELOREAN WORLD <span className="text-amber">MAGAZINE</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
                {latestIssues[0]?.cover_story || "The premier publication for DeLorean owners and enthusiasts."}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(latestIssues[0]?.highlights || []).map((h) => (
                  <Badge key={h} variant="outline" className="border-steel/20 text-steel text-xs">
                    {h}
                  </Badge>
                ))}
              </div>
              <Button
                asChild
                className="bg-amber hover:bg-amber-glow text-obsidian font-bold"
              >
                <Link href="/magazine">
                  Read as a Member
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Issue grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-shrink-0">
              {latestIssues.map((issue, i) => (
                <div
                  key={issue.id}
                  className={`relative rounded overflow-hidden ${i === 0 ? "ring-2 ring-amber/50" : ""}`}
                >
                  {/* Magazine cover placeholder */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-charcoal to-obsidian border border-border/50 flex flex-col items-center justify-center p-3 text-center">
                    <div className="font-display text-[9px] text-amber tracking-widest mb-1">
                      DELOREAN WORLD
                    </div>
                    <div className="font-display text-xs text-white leading-none mb-2">
                      Vol. {issue.volume}
                    </div>
                    <div className="w-full h-px bg-amber/30 mb-2" />
                    <div className="font-sans text-[8px] text-steel/80 leading-tight line-clamp-3">
                      {issue.title}
                    </div>
                    {i === 0 && (
                      <div className="absolute top-1 right-1">
                        <Badge className="text-[8px] bg-amber text-obsidian px-1 py-0">NEW</Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEMBER MAP PREVIEW ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/30 to-obsidian" />
        <div className="container relative z-10">
          <div className="text-center mb-8">
            <p className="text-amber text-sm uppercase tracking-widest mb-3 font-medium">
              Global Community
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-4">
              DELOREANS <span className="text-amber">EVERYWHERE</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              4,000+ DeLoreans documented across the globe. Join to access the interactive
              member map and connect with owners near you.
            </p>
          </div>

          {/* Map preview — simplified SVG world map */}
          <div className="relative max-w-3xl mx-auto rounded-xl overflow-hidden border border-border/50 bg-obsidian/80 mb-8">
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-center">
              <Badge className="bg-amber/10 text-amber border-amber/30 mb-3">
                Members Only — Interactive Map
              </Badge>
              <Button
                asChild
                className="bg-amber hover:bg-amber-glow text-obsidian font-bold"
              >
                <Link href="/join">
                  Join to Access the Map
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {/* Stylized dark world map */}
            <svg
              viewBox="0 0 800 400"
              className="w-full h-auto opacity-60"
              style={{ background: "#0D0D0D" }}
            >
              {/* Simplified continent outlines */}
              <path
                d="M 50 120 Q 80 90 120 100 Q 150 95 160 120 Q 170 150 150 170 Q 130 190 100 180 Q 60 175 50 150 Z"
                fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"
              />
              <path
                d="M 60 200 Q 80 190 100 200 Q 120 210 130 230 Q 140 260 120 280 Q 90 300 70 285 Q 50 270 55 245 Z"
                fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"
              />
              <path
                d="M 200 80 Q 250 60 310 80 Q 360 95 380 130 Q 390 165 360 185 Q 320 205 280 200 Q 240 195 215 175 Q 190 155 195 120 Z"
                fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"
              />
              <path
                d="M 290 220 Q 330 210 360 230 Q 380 250 370 280 Q 355 310 325 315 Q 295 315 280 295 Q 265 270 275 245 Z"
                fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"
              />
              <path
                d="M 450 100 Q 490 80 540 90 Q 580 100 610 130 Q 630 160 620 195 Q 600 225 560 230 Q 520 232 490 210 Q 460 188 455 155 Q 450 130 450 100 Z"
                fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"
              />
              <path
                d="M 530 240 Q 565 235 595 250 Q 625 270 620 305 Q 610 335 580 345 Q 545 350 520 330 Q 498 308 505 280 Z"
                fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"
              />
              <path
                d="M 650 260 Q 690 250 730 270 Q 760 290 755 320 Q 745 350 715 355 Q 680 358 660 335 Q 640 312 648 285 Z"
                fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"
              />
              {/* Member dots — amber glow */}
              {[
                [220, 110], [240, 125], [310, 140], [330, 130], [195, 145],
                [270, 165], [355, 155], [250, 175], [340, 170], [220, 95],
                [470, 120], [505, 105], [550, 115], [580, 140], [530, 155],
                [500, 135], [560, 125], [490, 155], [570, 150], [545, 130],
                [470, 145], [485, 115], [510, 140], [575, 130], [490, 170],
                [130, 155], [110, 140], [145, 145], [100, 165], [120, 130],
                [670, 280], [695, 265], [720, 275], [680, 295], [710, 285],
                [620, 270], [595, 285], [640, 295], [660, 270], [610, 260],
                [300, 230], [320, 240], [330, 250], [290, 245], [310, 255],
                [490, 310], [510, 295], [520, 315], [480, 305], [500, 325],
              ].map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i < 5 ? 4 : 2.5}
                  fill="#F5A623"
                  opacity={i < 5 ? 0.9 : 0.6}
                />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS PREVIEW ===== */}
      <section className="py-20 bg-charcoal border-t border-border">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-amber text-sm uppercase tracking-widest mb-2 font-medium">
                Upcoming
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
                EVENTS & <span className="text-amber">GATHERINGS</span>
              </h2>
            </div>
            <Button asChild variant="outline" size="sm" className="border-border text-steel hover:text-white hidden sm:flex">
              <Link href="/events">All Events <ChevronRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-card border-border hover:border-amber/30 transition-all hover:-translate-y-0.5 group">
                <CardContent className="p-0">
                  <div className="h-2 bg-gradient-to-r from-amber/60 to-amber/20 rounded-t" />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <Badge variant="outline" className="text-xs border-steel/20 text-steel mb-2">
                          {event.type}
                        </Badge>
                        <h3 className="font-medium text-white text-sm leading-snug group-hover:text-amber transition-colors">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                      <MapPin className="h-3 w-3" />
                      {event.city}, {event.country}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-steel/60">
                        {event.rsvp_count} attending
                      </span>
                      <Button asChild size="sm" variant="ghost" className="text-xs text-amber hover:text-amber-glow px-2 h-7">
                        <Link href="/join">Login to RSVP</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUOTE ===== */}
      <section className="py-16 border-t border-border">
        <div className="container max-w-2xl text-center">
          <div className="text-4xl text-amber/30 font-serif mb-4">&ldquo;</div>
          <blockquote className="font-display text-2xl sm:text-3xl text-white tracking-wide mb-6">
            THE DELOREAN OWNERS ASSOCIATION IS THE HEARTBEAT OF THE DELOREAN COMMUNITY.
          </blockquote>
          <p className="text-muted-foreground text-sm">
            — Graham Spencer, DOA Member since 2003, Detroit Chapter
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gradient-to-br from-amber/10 via-amber/5 to-transparent border-t border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
        <div className="absolute inset-0 brushed-metal opacity-20" />
        <div className="container relative z-10 text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-4">
            READY TO JOIN THE WORLD&apos;S MOST{" "}
            <span className="text-amber">PASSIONATE</span> CAR COMMUNITY?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            National memberships from $50/year. Includes print magazine, event discounts,
            forum access, digital garage, classifieds, and much more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-amber hover:bg-amber-glow text-obsidian font-bold h-12 text-base shadow-amber-glow transition-all hover:scale-105"
            >
              <Link href="/join">
                Become a Member
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border text-steel hover:text-white h-12">
              <Link href="/about">Learn More About DOA</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
