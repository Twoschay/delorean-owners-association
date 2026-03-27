import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Bell, ArrowRight, Star } from "lucide-react";
import { getLatestIssues } from "@/lib/mock-data/magazine";

export default function MagazineLandingPage() {
  const latestIssues = getLatestIssues(4);
  const latest = latestIssues[0];

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white tracking-wide mb-1">
          DELOREAN WORLD <span className="text-amber">MAGAZINE</span>
        </h1>
        <p className="text-sm text-muted-foreground">The premier publication for DeLorean owners since 1985</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Latest Issue */}
        {latest && (
          <Link href={`/magazine/${latest.id}`}>
            <Card className="bg-gradient-to-br from-amber/10 to-card border-amber/30 hover:border-amber/50 transition-all group h-full">
              <CardContent className="p-6">
                <Badge className="bg-amber text-obsidian text-xs font-bold mb-3">Latest Issue</Badge>
                <h2 className="font-display text-2xl text-white tracking-wide group-hover:text-amber transition-colors mb-2">
                  {latest.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {latest.cover_story.slice(0, 150)}...
                </p>
                <div className="space-y-1 mb-4">
                  {latest.highlights.slice(0, 3).map((h) => (
                    <div key={h} className="flex items-start gap-2 text-xs text-steel/70">
                      <Star className="h-3 w-3 text-amber flex-shrink-0 mt-0.5" />
                      {h}
                    </div>
                  ))}
                </div>
                <Button className="bg-amber hover:bg-amber-glow text-obsidian font-bold w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Vol. {latest.volume} Issue {latest.issue}
                </Button>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Archive + Newsletter */}
        <div className="space-y-4">
          <Link href="/magazine/archive">
            <Card className="bg-card border-border hover:border-amber/30 transition-all group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-amber" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white group-hover:text-amber transition-colors">Full Archive</h3>
                  <p className="text-xs text-muted-foreground">All 20 issues — Vol. 25 through current</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber transition-colors" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/magazine/news">
            <Card className="bg-card border-border hover:border-amber/30 transition-all group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber/20 transition-colors">
                  <Bell className="h-6 w-6 text-amber" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white group-hover:text-amber transition-colors">Stainless News</h3>
                  <p className="text-xs text-muted-foreground">Monthly e-newsletter archive</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Issues */}
      <div>
        <h2 className="font-display text-xl text-white tracking-wide mb-4">RECENT ISSUES</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {latestIssues.slice(1).map((issue, i) => (
            <Link key={issue.id} href={`/magazine/${issue.id}`} className="group">
              <div className={`aspect-[3/4] rounded-lg bg-gradient-to-br ${["from-zinc-600/30 to-obsidian", "from-blue-900/30 to-obsidian", "from-stone-600/30 to-obsidian"][i % 3]} border border-border/50 group-hover:border-amber/30 transition-all flex flex-col items-center justify-center p-3 text-center`}>
                <div className="font-display text-[8px] text-amber tracking-widest mb-0.5">DELOREAN WORLD</div>
                <div className="font-display text-xl text-white">Vol. {issue.volume}</div>
                <div className="w-3/4 h-px bg-amber/30 my-1.5" />
                <div className="text-[7px] text-steel/70 leading-tight line-clamp-3">{issue.title}</div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-1">
                {new Date(issue.published_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
