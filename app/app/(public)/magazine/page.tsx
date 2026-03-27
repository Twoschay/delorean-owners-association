import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Lock, ArrowRight, Star } from "lucide-react";
import { MOCK_MAGAZINE_ISSUES, getLatestIssues } from "@/lib/mock-data/magazine";

export const metadata: Metadata = {
  title: "DeLorean World Magazine",
  description: "DeLorean World Magazine — 40+ years of the premier DeLorean publication. Technical articles, restoration guides, member profiles, and more.",
};

// Cover gradient themes by issue
const COVER_THEMES = [
  "from-amber/30 to-obsidian",
  "from-steel/20 to-charcoal",
  "from-blue-900/40 to-obsidian",
  "from-zinc-700/30 to-obsidian",
  "from-amber/20 to-charcoal",
  "from-stone-700/30 to-obsidian",
  "from-yellow-900/40 to-obsidian",
  "from-neutral-700/30 to-charcoal",
];

export default function MagazinePage() {
  const latest = getLatestIssues(1)[0];
  const allIssues = [...MOCK_MAGAZINE_ISSUES].sort(
    (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 border-b border-border bg-gradient-to-b from-charcoal/50 to-transparent">
        <div className="container max-w-3xl">
          <Badge className="mb-4 bg-amber/10 text-amber border-amber/30">
            40+ Years of Excellence
          </Badge>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide mb-4">
            DELOREAN WORLD <span className="text-amber">MAGAZINE</span>
          </h1>
          <p className="text-lg text-steel/70 leading-relaxed">
            The premier publication for DeLorean owners and enthusiasts.
            Technical articles, restoration guides, member profiles, event coverage, and more —
            delivered in print and digitally since 1985.
          </p>
        </div>
      </section>

      {/* Latest Issue Feature */}
      {latest && (
        <section className="py-16 bg-gradient-to-r from-amber/5 to-transparent border-b border-border">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-10 max-w-4xl">
              {/* Cover */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <Badge className="absolute -top-3 -right-3 bg-amber text-obsidian font-bold z-10">
                    LATEST ISSUE
                  </Badge>
                  <div
                    className={`w-48 h-64 rounded-lg bg-gradient-to-br ${COVER_THEMES[0]} border border-border/50 flex flex-col items-center justify-center p-4 text-center shadow-amber-glow`}
                  >
                    <div className="font-display text-[10px] text-amber tracking-widest mb-1">
                      DELOREAN WORLD
                    </div>
                    <div className="font-display text-2xl text-white mb-1">
                      VOL. {latest.volume}
                    </div>
                    <div className="w-3/4 h-px bg-amber/40 mb-2" />
                    <div className="text-[9px] text-steel/80 leading-tight text-center font-sans">
                      {latest.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-2">
                  Volume {latest.volume}, Issue {latest.issue} ·{" "}
                  {new Date(latest.published_date).toLocaleDateString("en-US", {
                    month: "long", year: "numeric",
                  })}
                  {latest.is_digital_only && (
                    <Badge variant="outline" className="ml-2 text-[10px] border-border text-muted-foreground">
                      Digital Only
                    </Badge>
                  )}
                </div>
                <h2 className="font-display text-3xl text-white tracking-wide mb-3">
                  {latest.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {latest.cover_story}
                </p>
                <div className="mb-5">
                  <p className="text-xs text-steel uppercase tracking-wider mb-2">This Issue</p>
                  <ul className="space-y-1">
                    {latest.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-steel/80">
                        <Star className="h-3 w-3 text-amber flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
                  <BookOpen className="h-4 w-4 text-amber" />
                  {latest.page_count} pages
                </div>
                <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
                  <Link href="/join">
                    <Lock className="h-4 w-4 mr-2" />
                    Read as a Member
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Archive */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl text-white tracking-wide mb-1">
                FULL <span className="text-amber">ARCHIVE</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                {MOCK_MAGAZINE_ISSUES.length} issues available — more added regularly
              </p>
            </div>
            <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold hidden sm:flex">
              <Link href="/join">
                Access Full Archive
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allIssues.map((issue, i) => (
              <div key={issue.id} className="group cursor-pointer">
                <div className="relative mb-2">
                  <div
                    className={`aspect-[3/4] rounded bg-gradient-to-br ${COVER_THEMES[i % COVER_THEMES.length]} border border-border/50 flex flex-col items-center justify-center p-3 text-center group-hover:border-amber/30 transition-all group-hover:shadow-amber-glow/20`}
                  >
                    {/* Blurred overlay for non-members */}
                    <div className="absolute inset-0 rounded bg-obsidian/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-amber/90 rounded px-2 py-1">
                        <Lock className="h-4 w-4 text-obsidian mx-auto mb-0.5" />
                        <span className="text-[9px] text-obsidian font-bold">MEMBERS ONLY</span>
                      </div>
                    </div>
                    <div className="font-display text-[8px] text-amber tracking-widest mb-0.5">
                      DELOREAN WORLD
                    </div>
                    <div className="font-display text-base text-white leading-none mb-1">
                      Vol. {issue.volume}
                    </div>
                    <div className="w-3/4 h-px bg-amber/30 mb-1" />
                    <div className="text-[7px] text-steel/70 leading-tight font-sans line-clamp-3">
                      {issue.title}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-white/80 font-medium line-clamp-1 leading-snug">
                    {issue.title.split("—")[0].trim()}
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    {new Date(issue.published_date).toLocaleDateString("en-US", {
                      month: "short", year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Subscribe CTA */}
      <section className="py-16 bg-gradient-to-r from-amber/10 to-transparent">
        <div className="container max-w-2xl text-center">
          <BookOpen className="h-12 w-12 text-amber/50 mx-auto mb-4" />
          <h2 className="font-display text-3xl text-white tracking-wide mb-4">
            40+ YEARS OF <span className="text-amber">DELOREAN HISTORY</span>
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
            Join the DOA and get instant digital access to our complete magazine archive —
            every issue from Vol. 1 through today, plus print delivery of current issues.
          </p>
          <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
            <Link href="/join">
              Subscribe as a Member
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
