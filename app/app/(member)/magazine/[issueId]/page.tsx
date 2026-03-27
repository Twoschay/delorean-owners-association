"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Star, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { getMagazineById, MOCK_MAGAZINE_ISSUES } from "@/lib/mock-data/magazine";

interface PageProps {
  params: Promise<{ issueId: string }>;
}

const COVER_THEMES = [
  "from-amber/30 via-amber/10 to-obsidian",
  "from-zinc-600/40 via-zinc-800/20 to-obsidian",
  "from-blue-800/40 via-blue-900/20 to-obsidian",
  "from-stone-600/30 via-stone-800/20 to-obsidian",
];

export default function MagazineIssuePage({ params }: PageProps) {
  const { issueId } = use(params);
  const issue = getMagazineById(issueId);

  if (!issue) notFound();

  const sortedIssues = [...MOCK_MAGAZINE_ISSUES].sort(
    (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
  );
  const currentIndex = sortedIssues.findIndex((i) => i.id === issueId);
  const prevIssue = currentIndex < sortedIssues.length - 1 ? sortedIssues[currentIndex + 1] : null;
  const nextIssue = currentIndex > 0 ? sortedIssues[currentIndex - 1] : null;
  const themeIdx = currentIndex % COVER_THEMES.length;

  return (
    <div className="p-4 sm:p-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/magazine/archive" className="hover:text-steel transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Magazine Archive
        </Link>
        <span>/</span>
        <span className="text-white">Vol. {issue.volume}, Issue {issue.issue}</span>
      </div>

      {/* Issue header */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Cover */}
        <div className="flex-shrink-0">
          <div className={`w-48 h-64 rounded-xl bg-gradient-to-br ${COVER_THEMES[themeIdx]} border border-amber/30 flex flex-col items-center justify-center p-5 text-center shadow-amber-glow`}>
            <div className="font-display text-[10px] text-amber tracking-widest mb-1">DELOREAN WORLD</div>
            <div className="font-display text-3xl text-white mb-0.5">VOL. {issue.volume}</div>
            <div className="font-display text-xs text-steel/60 mb-1.5">ISSUE {issue.issue}</div>
            <div className="w-3/4 h-px bg-amber/40 mb-2" />
            <div className="text-[8px] text-steel/70 leading-tight font-sans line-clamp-4">{issue.title}</div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" className="border-amber/30 text-amber text-xs">Vol. {issue.volume}, Issue {issue.issue}</Badge>
            {issue.is_digital_only && (
              <Badge variant="outline" className="border-border text-muted-foreground text-xs">Digital Only</Badge>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide mb-3">
            {issue.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">{issue.cover_story}</p>
          <div className="flex items-center gap-4 text-sm text-steel/70 mb-4">
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-amber" />
              {issue.page_count} pages
            </span>
            <span>
              {new Date(issue.published_date).toLocaleDateString("en-US", {
                month: "long", year: "numeric"
              })}
            </span>
          </div>
          <div className="mb-5">
            <p className="text-xs text-steel uppercase tracking-wider mb-2">In This Issue</p>
            <ul className="space-y-1.5">
              {issue.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-steel/80">
                  <Star className="h-3.5 w-3.5 text-amber flex-shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <Button className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
            <FileText className="h-4 w-4 mr-2" />
            Open Digital Magazine
          </Button>
        </div>
      </div>

      {/* PDF Viewer Placeholder */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="p-0">
          <div className="h-96 flex items-center justify-center bg-gradient-to-br from-charcoal to-obsidian rounded-lg">
            <div className="text-center max-w-sm px-6">
              <div className="w-16 h-20 bg-amber/10 border-2 border-amber/30 rounded mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-amber/60" />
              </div>
              <h3 className="font-display text-xl text-white tracking-wide mb-2">DIGITAL MAGAZINE VIEWER</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In production, the full {issue.page_count}-page issue would display here as a beautiful
                interactive flip-book PDF viewer. Members can read, search, bookmark, and annotate issues.
              </p>
              <div className="mt-4 p-3 bg-amber/5 border border-amber/20 rounded text-xs text-amber/80">
                Demo mode — PDF viewer available in production
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {prevIssue ? (
          <Link href={`/magazine/${prevIssue.id}`}>
            <Button variant="outline" className="border-border text-steel hover:text-white gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:block">Vol. {prevIssue.volume}, No. {prevIssue.issue}</span>
              <span className="sm:hidden">Previous</span>
            </Button>
          </Link>
        ) : (
          <div />
        )}
        <Link href="/magazine/archive">
          <Button variant="ghost" className="text-muted-foreground hover:text-steel">
            All Issues
          </Button>
        </Link>
        {nextIssue ? (
          <Link href={`/magazine/${nextIssue.id}`}>
            <Button variant="outline" className="border-border text-steel hover:text-white gap-2">
              <span className="hidden sm:block">Vol. {nextIssue.volume}, No. {nextIssue.issue}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
