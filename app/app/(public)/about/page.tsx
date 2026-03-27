import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About the DOA",
  description: "Learn about the DeLorean Owners Association — the oldest and largest international DeLorean owners organization, established 1983.",
};

const TIMELINE = [
  { year: "1983", title: "Foundation", description: "The DeLorean Owners Association is founded by a group of passionate owners just months after the DMC-12 production ended. The first newsletter is mimeographed and mailed to 47 members." },
  { year: "1985", title: "First DeLorean World Issue", description: "The DeLorean World Magazine launches, providing technical articles, event coverage, and member profiles. Vol. 1, No. 1 is now a collector's item." },
  { year: "1990", title: "First National Expo", description: "The first dedicated DeLorean Owners Association National Expo is held in Texas, drawing 84 vehicles and 200 attendees. A tradition is born." },
  { year: "1995", title: "UK Chapter Founded", description: "The UK Chapter launches, becoming the first international chapter. It grows to become the largest chapter outside the United States." },
  { year: "2001", title: "Going Digital", description: "DOA launches its first website and begins digitizing the magazine archive. The online forum connects owners who've never met in person." },
  { year: "2005", title: "Europe & Australia", description: "International expansion continues with the founding of European and Australian chapters." },
  { year: "2015", title: "Digital Magazine Archive", description: "30+ years of DeLorean World Magazine are digitized and made available to members — preserving invaluable automotive history." },
  { year: "2023", title: "40th Anniversary", description: "The DOA celebrates 40 years with record membership and the largest Expo ever, featuring 340 vehicles. The community has never been stronger." },
  { year: "2026", title: "DOA Today", description: "5,000+ members across 8 chapters on 4 continents. Still the world's premier DeLorean community, still growing." },
];

const BOARD = [
  { name: "William Hargrove", title: "President", chapter: "Northeast", bio: "Member since 1988, former DOA Secretary and VP. Retired automotive engineer." },
  { name: "Sandra Chen", title: "Vice President", chapter: "Pacific", bio: "Joined in 2004. Owner of a gold-plated 1982 DMC-12. Event coordinator extraordinaire." },
  { name: "Robert 'Bobby' MacAllister", title: "Secretary", chapter: "UK", bio: "UK Chapter founding member. Keeps the trains running on time — and the minutes." },
  { name: "Maria Torres", title: "Treasurer", chapter: "Southwest", bio: "CPA and lifetime member. Has owned four DeLoreans over the years." },
  { name: "James Park", title: "Tech Director", chapter: "Midwest", bio: "Master mechanic and author of the DOA Technical Manual. Has rebuilt more PRV V6s than he can count." },
  { name: "Claire Wyndham", title: "Magazine Editor", chapter: "UK", bio: "Former automotive journalist. Has edited DeLorean World for 12 years." },
  { name: "Marcus Johnson", title: "Events Director", chapter: "Southeast", bio: "Organizes the annual Expo and coordinates with chapter events year-round." },
  { name: "Yukiko Tanaka", title: "Digital Director", chapter: "Europe", bio: "Web developer and social media manager. Brought the DOA into the digital age." },
];

const CHAPTERS = [
  { name: "Northeast", region: "New England, NY, NJ, PA, DE, MD, DC", members: 820, founded: "1985" },
  { name: "Southeast", region: "FL, GA, NC, SC, VA, TN, KY, AL, MS", members: 640, founded: "1987" },
  { name: "Midwest", region: "IL, IN, OH, MI, WI, MN, IA, MO, KS, NE", members: 710, founded: "1986" },
  { name: "Southwest", region: "TX, AZ, NM, OK, CO, UT, NV", members: 590, founded: "1987" },
  { name: "Pacific", region: "CA, OR, WA, AK, HI", members: 780, founded: "1985" },
  { name: "UK & Ireland", region: "United Kingdom and Republic of Ireland", members: 430, founded: "1995" },
  { name: "Europe", region: "Continental Europe, Scandinavia", members: 385, founded: "2005" },
  { name: "Australia & NZ", region: "Australia and New Zealand", members: 145, founded: "2005" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 border-b border-border bg-gradient-to-b from-charcoal/50 to-transparent">
        <div className="container max-w-3xl">
          <Badge className="mb-4 bg-amber/10 text-amber border-amber/30">
            Est. 1983
          </Badge>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide mb-4">
            ABOUT THE{" "}
            <span className="text-amber">DELOREAN OWNERS</span>{" "}
            ASSOCIATION
          </h1>
          <p className="text-lg text-steel/70 leading-relaxed">
            Preserving the legacy of the DeLorean DMC-12 since 1983.
            The oldest, largest, and most respected international DeLorean owners organization.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="border-l-2 border-amber pl-6">
            <h2 className="font-display text-2xl text-amber tracking-wider mb-3">OUR MISSION</h2>
            <p className="text-xl text-white/80 leading-relaxed font-light">
              &ldquo;Our mission is to support DeLorean owners and enthusiasts worldwide, preserve the history
              of the DeLorean automobile, and educate the public about this iconic vehicle — the
              stainless steel dream that captured the imagination of a generation.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* History / Timeline */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-4xl text-white tracking-wide mb-2">
            OUR <span className="text-amber">HISTORY</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            From a handful of mimeographed newsletters to a global digital community.
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-[100px] top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-8">
              {TIMELINE.map((item) => (
                <div key={item.year} className="flex gap-0 md:gap-6 items-start">
                  <div className="hidden md:flex flex-col items-end w-[100px] flex-shrink-0 pt-0.5">
                    <span className="font-display text-xl text-amber">{item.year}</span>
                  </div>
                  <div className="hidden md:block w-4 h-4 rounded-full bg-amber/20 border-2 border-amber flex-shrink-0 mt-0.5 relative z-10" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="md:hidden bg-amber/10 text-amber border-amber/30 text-xs">
                        {item.year}
                      </Badge>
                      <h3 className="font-medium text-white">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Board of Directors */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-4xl text-white tracking-wide mb-2">
            BOARD OF <span className="text-amber">DIRECTORS</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            The DOA is governed by a volunteer board of passionate members elected by the membership.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BOARD.map((member) => (
              <Card key={member.name} className="bg-card border-border hover:border-amber/30 transition-all hover:-translate-y-0.5">
                <CardContent className="p-5">
                  {/* Avatar placeholder */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber/20 to-charcoal border border-amber/20 flex items-center justify-center mb-3">
                    <span className="font-display text-xl text-amber">
                      {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="font-medium text-white text-sm">{member.name}</h3>
                  <p className="text-amber text-xs mb-1">{member.title}</p>
                  <Badge variant="outline" className="text-[10px] border-border text-muted-foreground mb-2">
                    {member.chapter}
                  </Badge>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Chapters */}
      <section id="chapters" className="py-16">
        <div className="container">
          <h2 className="font-display text-4xl text-white tracking-wide mb-2">
            OUR <span className="text-amber">CHAPTERS</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            Eight active chapters across four continents — there&apos;s a DOA chapter near you.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHAPTERS.map((chapter) => (
              <Card key={chapter.name} className="bg-card border-border hover:border-amber/30 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-amber flex-shrink-0" />
                    <h3 className="font-display text-base text-white tracking-wide">{chapter.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{chapter.region}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-steel/60">
                      <Users className="h-3 w-3" />
                      {chapter.members.toLocaleString()} members
                    </div>
                    <span className="text-xs text-muted-foreground">est. {chapter.founded}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber/10 to-transparent border-t border-border">
        <div className="container text-center max-w-xl">
          <h2 className="font-display text-3xl text-white tracking-wide mb-4">
            BECOME PART OF OUR <span className="text-amber">STORY</span>
          </h2>
          <p className="text-muted-foreground mb-6">
            Join 5,000+ members worldwide who are keeping the DeLorean legacy alive.
          </p>
          <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
            <Link href="/join">
              Join the DOA
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
