import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Car, Calendar, BookOpen } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-obsidian">
          <div className="absolute inset-0 delorean-hero-placeholder opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
          {/* Stainless texture overlay */}
          <div className="absolute inset-0 brushed-metal opacity-20" />
        </div>

        {/* Stainless steel visual placeholder */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <div className="h-full delorean-hero-placeholder relative">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-obsidian" />
            {/* DMC text overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[180px] text-white/5 leading-none select-none">
                DMC
              </span>
            </div>
            {/* Amber accent lines */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
              <div className="absolute inset-0 border border-amber/20 rotate-45 rounded" />
              <div className="absolute inset-4 border border-amber/10 rotate-45 rounded" />
            </div>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-amber/10 text-amber border-amber/30 hover:bg-amber/20">
              Est. 1983 • 5,000+ Members Worldwide
            </Badge>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-none tracking-wide mb-6">
              DELOREAN{" "}
              <span className="text-amber">OWNERS</span>{" "}
              ASSOCIATION
            </h1>

            <p className="text-lg text-steel/80 mb-8 leading-relaxed max-w-xl">
              The world&apos;s premier community for DeLorean DMC-12 owners and enthusiasts.
              Technical resources, events, classifieds, and a passionate global community —
              all in one place.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-amber hover:bg-amber-glow text-obsidian font-bold text-base h-12 shadow-amber-glow"
              >
                <Link href="/join">
                  Join the DOA
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-steel/30 text-steel hover:text-white hover:border-white/50 h-12"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-charcoal border-y border-border py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "5,000+", label: "Active Members" },
              { value: "43", label: "Years Running" },
              { value: "8", label: "Global Chapters" },
              { value: "3,200+", label: "DeLoreans Documented" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl text-amber">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-4">
              EVERYTHING FOR YOUR <span className="text-amber">DELOREAN</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From tech guides to classified ads, events to member maps — the DOA has everything
              you need to enjoy and maintain your DMC-12.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Users,
                title: "Active Community",
                description: "5,000 members across 8 chapters worldwide. A global family united by gull-wing doors.",
                href: "/members",
                color: "amber",
              },
              {
                icon: Car,
                title: "Digital Garage",
                description: "Document your vehicle, track maintenance, store your VIN, and share with the community.",
                href: "/garage",
                color: "steel",
              },
              {
                icon: Calendar,
                title: "Events & Expos",
                description: "Annual DeLorean Expo, chapter meets, tech workshops, and road trips throughout the year.",
                href: "/events",
                color: "amber",
              },
              {
                icon: BookOpen,
                title: "DOA Magazine",
                description: "40 years of the DeLorean magazine — tech articles, member profiles, and restoration guides.",
                href: "/magazine",
                color: "steel",
              },
            ].map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group delorean-card p-6 hover:border-amber/30 transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded mb-4 flex items-center justify-center transition-colors ${
                    feature.color === "amber"
                      ? "bg-amber/10 group-hover:bg-amber/20"
                      : "bg-steel/10 group-hover:bg-steel/20"
                  }`}
                >
                  <feature.icon
                    className={`h-6 w-6 ${
                      feature.color === "amber" ? "text-amber" : "text-steel"
                    }`}
                  />
                </div>
                <h3 className="font-display text-lg text-white tracking-wide mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div
                  className={`flex items-center gap-1 mt-4 text-xs font-medium transition-colors ${
                    feature.color === "amber"
                      ? "text-amber/60 group-hover:text-amber"
                      : "text-steel/60 group-hover:text-steel"
                  }`}
                >
                  Learn more
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber/10 via-amber/5 to-transparent border-t border-border">
        <div className="container text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-4">
            JOIN THE WORLD&apos;S PREMIER{" "}
            <span className="text-amber">DELOREAN COMMUNITY</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            National and international memberships available. Annual subscription includes
            print magazine, event discounts, and full access to all member resources.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-amber hover:bg-amber-glow text-obsidian font-bold h-12 text-base shadow-amber-glow"
          >
            <Link href="/join">
              Become a Member
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
