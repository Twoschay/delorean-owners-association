"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Download, Calendar, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { getMagazineById, MOCK_MAGAZINE_ISSUES } from "@/lib/mock-data/magazine";

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

interface PageProps {
  params: Promise<{ issueId: string }>;
}

export default function IssuePage({ params }: PageProps) {
  const { issueId } = use(params);
  const issue = getMagazineById(issueId);
  if (!issue) notFound();

  const sorted = [...MOCK_MAGAZINE_ISSUES].sort(
    (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
  );
  const idx = sorted.findIndex(i => i.id === issueId);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const gradient = COVER_GRADIENTS[issue.cover_placeholder] || "from-slate-800 via-slate-600 to-amber-500";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/dashboard" className="hover:text-amber-400 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/magazine/archive" className="hover:text-amber-400 transition-colors">Archive</Link>
        <span>/</span>
        <span className="text-gray-300">Vol. {issue.volume} · Issue {issue.issue}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className={`relative bg-gradient-to-br ${gradient} h-80 rounded-xl overflow-hidden flex flex-col items-center justify-between p-4 mb-4`}>
            <div className="text-center w-full">
              <div className="text-amber-300 text-sm font-bold tracking-widest uppercase">DeLorean World</div>
              <div className="h-px bg-amber-400/50 mt-2" />
            </div>
            <div className="text-center px-2">
              <div className="text-white font-bold text-xl leading-tight">{issue.title}</div>
            </div>
            <div className="text-center w-full">
              <div className="h-px bg-amber-400/50 mb-2" />
              <div className="text-amber-300 text-sm tracking-wide">Vol. {issue.volume} · Issue {issue.issue}</div>
            </div>
            {issue.is_digital_only && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-amber-500 text-black text-xs">Digital Only</Badge>
              </div>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Published</span>
              <span className="text-gray-200">{new Date(issue.published_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Pages</span>
              <span className="text-gray-200">{issue.page_count}</span>
            </div>
          </div>

          <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold mb-3">
            <BookOpen className="w-4 h-4 mr-2" />Open PDF
          </Button>
          <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-white hover:border-gray-500">
            <Download className="w-4 h-4 mr-2" />Download Issue
          </Button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">{issue.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Volume {issue.volume}</Badge>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Issue {issue.issue}</Badge>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-amber-400 mb-3">Cover Story</h2>
            <p className="text-gray-300 leading-relaxed">{issue.cover_story}</p>
          </div>

          <div className="h-px bg-gray-800" />

          <div>
            <h2 className="text-lg font-semibold text-amber-400 mb-3">In This Issue</h2>
            <div className="space-y-2">
              {issue.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-900 border border-gray-800 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-amber-400 text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="text-gray-300 text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-800" />

          <div>
            <h2 className="text-lg font-semibold text-amber-400 mb-3">PDF Viewer</h2>
            <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
              <div className="flex">
                <div className={`flex-1 bg-gradient-to-br ${gradient} h-64 flex flex-col items-center justify-center p-4`}>
                  <div className="text-amber-300 text-xs font-bold tracking-widest uppercase mb-1">DeLorean World</div>
                  <div className="h-px bg-amber-400/50 w-full mb-4" />
                  <div className="text-white font-bold text-sm text-center leading-tight">{issue.title}</div>
                  <div className="h-px bg-amber-400/50 w-full mt-4 mb-1" />
                  <div className="text-amber-300 text-xs">Vol. {issue.volume} · Issue {issue.issue}</div>
                </div>
                <div className="flex-1 bg-gray-800 h-64 flex flex-col items-center justify-center p-6 text-center">
                  <BookOpen className="w-10 h-10 text-gray-600 mb-3" />
                  <p className="text-gray-400 text-sm font-medium">PDF Viewer</p>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed">In production, the full digital magazine would display here.</p>
                  <Button size="sm" className="mt-4 bg-amber-500 hover:bg-amber-400 text-black">Open Full PDF</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {prev ? (
              <Link href={`/magazine/${prev.id}`}>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-500">
                  <ChevronLeft className="w-4 h-4 mr-1" />Newer Issue
                </Button>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/magazine/${next.id}`}>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-500">
                  Older Issue<ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800">
        <Link href="/magazine/archive" className="inline-flex items-center text-sm text-gray-400 hover:text-amber-400 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />Back to Archive
        </Link>
      </div>
    </div>
  );
}
