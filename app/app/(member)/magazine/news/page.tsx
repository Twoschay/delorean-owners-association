"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Clock, ChevronRight } from "lucide-react";

const NEWSLETTERS = [
  { id: "nl-001", title: "March 2026 — Spring Driving Season Preview", date: "2026-03-01", excerpt: "As spring approaches, we preview the upcoming driving season: chapter events, maintenance tips for your first drive of the year, and a look ahead at what's coming to the DOA.", tags: ["Seasonal", "Events"] },
  { id: "nl-002", title: "February 2026 — EV Conversion Spotlight", date: "2026-02-01", excerpt: "This month we spotlight three members who completed EV conversions in 2025. Their builds, lessons learned, and the numbers on range, cost, and performance.", tags: ["Tech", "EV"] },
  { id: "nl-003", title: "January 2026 — New Year, New Members", date: "2026-01-01", excerpt: "Welcome to 2026! We introduce 24 new members who joined the DOA in Q4 2025, preview the year's events, and share the most popular forum threads of the past year.", tags: ["Community", "Members"] },
  { id: "nl-004", title: "December 2025 — Year in Review", date: "2025-12-01", excerpt: "A look back at 2025: the events, the milestones, the new members, and the most memorable moments from the DeLorean community. Plus a holiday message from the DOA president.", tags: ["Annual", "Community"] },
  { id: "nl-005", title: "November 2025 — Expo 2026 Planning Begins", date: "2025-11-01", excerpt: "Planning is underway for DeLorean Expo 2026 at the DMC facility in Humble, TX. We outline the schedule, registration details, and how to get involved.", tags: ["Events", "Expo"] },
  { id: "nl-006", title: "October 2025 — BTTF Day Recap", date: "2025-10-01", excerpt: "October 21st, 2025 — another Back to the Future Day. Members around the world gathered for local events. We compile the photos and stories from 12 different chapters.", tags: ["Community", "BTTF"] },
  { id: "nl-007", title: "September 2025 — Parts Availability Report", date: "2025-09-01", excerpt: "Our annual survey of parts vendors: who has stock, what's backordered, new reproduction parts coming to market, and a deep dive into the current door strut situation.", tags: ["Tech", "Parts"] },
  { id: "nl-008", title: "August 2025 — Post-Expo Special", date: "2025-08-01", excerpt: "The DeLorean Expo 2025 is in the books. 340 cars, 800+ attendees, and incredible memories. This special edition is packed with photos, award results, and member spotlights.", tags: ["Events", "Expo"] },
];

export default function StainlessNewsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-500/20 rounded-lg">
            <Mail className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Stainless News</h1>
            <p className="text-gray-400">The DOA monthly newsletter archive.</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/10 border border-amber-500/30 rounded-xl p-5 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold mb-1">Get the newsletter in your inbox</h3>
            <p className="text-gray-400 text-sm">Delivered on the 1st of each month.</p>
          </div>
          <Button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold shrink-0">Subscribe</Button>
        </div>
      </div>

      <div className="space-y-4">
        {NEWSLETTERS.map((nl) => (
          <Card key={nl.id} className="bg-gray-900 border-gray-700 hover:border-amber-500/40 transition-all duration-200 cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span className="text-xs text-gray-500">{new Date(nl.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                    {nl.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs border-gray-700 text-gray-500 py-0">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-amber-300 transition-colors">{nl.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{nl.excerpt}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 shrink-0">
                  Read<ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
