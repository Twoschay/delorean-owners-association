"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, BookOpen, Calendar, FileText } from "lucide-react";
import { MOCK_MAGAZINE_ISSUES } from "@/lib/mock-data/magazine";

const COVER_GRADIENTS: Record<string, string> = {
  "mag-ev-gradient": "from-blue-900 via-blue-700 to-amber-500",
  "mag-ladies-gradient": "from-purple-900 via-rose-700 to-amber-400",
  "mag-40th-gradient": "from-amber-800 via-amber-600 to-yellow-400",
  "mag-restoration-gradient": "from-slate-700 via-slate-500 to-amber-500",
  "mag-barnfind-gradient": "from-green-900 via-green-700 to-amber-500",
  "mag-expo-gradient": "from-red-900 via-red-700 to-amber-500",
  "mag-performance-gradient": "from-red-900 via-orange-700 to-yellow-400",
  "mag-gold-gradient": "from-yellow-800 via-yellow-600 to-amber-300",
  "mag-daily-gradient": "from-slate-800 via-slate-600 to-amber-500",
  "mag-international-gradient": "from-blue-900 via-indigo-700 to-amber-400",
  "mag-stainless-gradient": "from-gray-700 via-gray-500 to-amber-400",
  "mag-bttf-gradient": "from-orange-900 via-orange-700 to-amber-400",
  "mag-buying-gradient": "from-green-900 via-teal-700 to-amber-400",
  "mag-prv-gradient": "from-slate-800 via-slate-600 to-orange-500",
  "mag-expo22-gradient": "from-red-800 via-red-600 to-amber-400",
  "mag-digital-gradient": "from-cyan-900 via-cyan-700 to-amber-400",
  "mag-covid-gradient": "from-gray-900 via-gray-700 to-amber-400",
  "mag-factory-gradient": "from-slate-900 via-slate-700 to-amber-300",
  "mag-debate-gradient": "from-violet-900 via-violet-700 to-amber-400",
  "mag-35th-gradient": "from-amber-900 via-amber-700 to-yellow-300",
};

function MagazineCover({ issue, large = false }: { issue: typeof MOCK_MAGAZINE_ISSUES[0]; large?: boolean }) {
  const gradient = COVER_GRADIENTS[issue.cover_placeholder] || "from-slate-800 via-slate-600 to-amber-500";
  return (
    <div className={`relative bg-gradient-to-br ${gradient} ${large ? "h-80" : "h-48"} rounded-t-lg overflow-hidden flex flex-col items-center justify-between p-3`}>
      <div className="text-center w-full">
        <div className="text-amber-300 text-xs font-bold tracking-widest uppercase">DeLorean World</div>
        <div className="h-px bg-amber-400/50 mt-1" />
      </div>
      <div className="text-center px-2">
        <div className={`text-white font-bold leading-tight ${large ? "text-lg" : "text-sm"}`}>
          {issue.title}
        </div>
      </div>
      <div className="text-center w-full">
        <div className="h-px bg-amber-400/50 mb-1" />
        <div className="text-amber-300 text-xs tracking-wide">
          Vol. {issue.volume} · Issue {issue.issue}
        </div>
      </div>
      {issue.is_digital_only && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-amber-500 text-black text-xs">Digital</Badge>
        </div>
      )}
    </div>
  );
}

export default function MagazineArchivePage() {
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [filterYear, setFilterYear] = useState<string>("all");

  const latestIssue = MOCK_MAGAZINE_ISSUES[0];

  const years = useMemo(() => {
    const ys = [...new Set(MOCK_MAGAZINE_ISSUES.map(m => new Date(m.published_date).getFullYear()))].sort((a, b) => b - a);
    return ys;
  }, []);

  const filteredIssues = useMemo(() => {
    let issues = MOCK_MAGAZINE_ISSUES.slice(1); // exclude latest (shown as featured)
    if (filterYear !== "all") {
      issues = issues.filter(m => new Date(m.published_date).getFullYear() === parseInt(filterYear));
    }
    return issues.sort((a, b) => {
      const diff = new Date(b.published_date).getTime() - new Date(a.published_date).getTime();
      return sort === "newest" ? diff : -diff;
    });
  }, [sort, filterYear]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-400 hover:text-amber-400 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-500/20 rounded-lg">
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Magazine Archive</h1>
            <p className="text-gray-400">Every issue of DeLorean World Magazine, from the latest to the archives.</p>
          </div>
        </div>
      </div>

      {/* Featured Latest Issue */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-amber-400 uppercase tracking-wider mb-4">Latest Issue</h2>
        <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-64 shrink-0">
              <MagazineCover issue={latestIssue} large />
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                    Vol. {latestIssue.volume} · Issue {latestIssue.issue}
                  </Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">
                    {new Date(latestIssue.published_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </Badge>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">
                    {latestIssue.page_count} pages
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{latestIssue.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{latestIssue.cover_story}</p>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-amber-400 mb-2">Highlights in this issue:</div>
                  {latestIssue.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link href={`/magazine/${latestIssue.id}`}>
                  <Button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Latest Issue
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-amber-400 uppercase tracking-wider">Archive</h2>
        <div className="flex gap-3">
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger className="w-36 bg-gray-900 border-gray-700 text-gray-200">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">All Years</SelectItem>
              {years.map(y => (
                <SelectItem key={y} value={String(y)}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as "newest" | "oldest")}>
            <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Issue Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredIssues.map((issue) => (
          <Link key={issue.id} href={`/magazine/${issue.id}`}>
            <Card className="bg-gray-900 border-gray-700 hover:border-amber-500/50 transition-all duration-200 hover:-translate-y-1 cursor-pointer group overflow-hidden">
              <MagazineCover issue={issue} />
              <CardContent className="p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">
                    {new Date(issue.published_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>
                <p className="text-xs text-gray-300 font-medium line-clamp-2 group-hover:text-amber-300 transition-colors">
                  {issue.title}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <FileText className="w-3 h-3 text-gray-600" />
                  <span className="text-xs text-gray-600">{issue.page_count} pp</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No issues found for the selected filter.
        </div>
      )}
    </div>
  );
}
