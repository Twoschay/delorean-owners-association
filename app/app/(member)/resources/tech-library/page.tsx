"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const TECH_ARTICLES = [
  { id: "ta-001", title: "Beginner's Guide to DMC-12 Maintenance", category: "Maintenance", readTime: 12, excerpt: "Everything a new DeLorean owner needs to know about keeping their car happy. From oil changes to inspecting the timing chain.", featured: true },
  { id: "ta-002", title: "Understanding the PRV V6 Engine", category: "Engine", readTime: 18, excerpt: "A deep dive into the Peugeot-Renault-Volvo V6 engine — its quirks, strengths, common failure points, and why it's actually a solid powerplant.", featured: false },
  { id: "ta-003", title: "Door Strut Replacement — Step by Step", category: "Body & Interior", readTime: 8, excerpt: "The most common DeLorean repair job — replacing worn door struts. Includes both the original style and the SunStar hydraulic upgrade.", featured: false },
  { id: "ta-004", title: "Stainless Steel Care and Polishing", category: "Body & Interior", readTime: 10, excerpt: "The definitive guide to caring for your DMC-12's stainless steel body panels. Preventing rust stains, polishing to a mirror finish, and keeping it gorgeous.", featured: true },
  { id: "ta-005", title: "Electrical System Troubleshooting", category: "Electrical", readTime: 20, excerpt: "The DeLorean's electrical system has a reputation for headaches. This systematic guide helps you diagnose and fix the most common issues.", featured: false },
  { id: "ta-006", title: "EV Conversion Options for Your DeLorean", category: "EV", readTime: 25, excerpt: "A comprehensive overview of electric powertrain conversions — motor options, battery packs, range expectations, and budget guidance.", featured: true },
  { id: "ta-007", title: "Cold Weather Starting Tips", category: "Maintenance", readTime: 5, excerpt: "The PRV V6 can be temperamental in cold weather. These tips will get your DeLorean started reliably even in winter.", featured: false },
  { id: "ta-008", title: "Fuel Injection System Overview", category: "Engine", readTime: 14, excerpt: "Understanding the Bosch K-Jetronic fuel injection system — how it works, what goes wrong, and how to tune it for better performance.", featured: false },
  { id: "ta-009", title: "Interior Restoration Guide", category: "Body & Interior", readTime: 16, excerpt: "From sourcing period-correct leather to refurbishing the unique instrument cluster — everything for a factory-fresh interior.", featured: false },
  { id: "ta-010", title: "Buying Your First DeLorean — What to Look For", category: "Buying Guide", readTime: 15, excerpt: "The definitive pre-purchase inspection guide written by a master technician who has inspected over 80 DeLoreans.", featured: true },
  { id: "ta-011", title: "Timing Chain: When to Replace and How", category: "Engine", readTime: 22, excerpt: "The timing chain is the most critical maintenance item on a DMC-12. This guide covers when to replace it, what symptoms to watch for, and how to do the job.", featured: false },
  { id: "ta-012", title: "Cooling System Maintenance and Upgrades", category: "Engine", readTime: 11, excerpt: "The PRV V6's cooling system is often misunderstood. Learn how to maintain it properly and what upgrades improve reliability.", featured: false },
];

const CATEGORIES = ["All", "Maintenance", "Engine", "Electrical", "Body & Interior", "EV", "Buying Guide"];

export default function TechLibraryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return TECH_ARTICLES.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, search]);

  const featured = TECH_ARTICLES.filter((a) => a.featured);

  const CATEGORY_COLORS: Record<string, string> = {
    Maintenance: "text-amber border-amber/30 bg-amber/5",
    Engine: "text-red-400 border-red-400/30 bg-red-400/5",
    Electrical: "text-blue-400 border-blue-400/30 bg-blue-400/5",
    "Body & Interior": "text-green-400 border-green-400/30 bg-green-400/5",
    EV: "text-purple-400 border-purple-400/30 bg-purple-400/5",
    "Buying Guide": "text-steel border-steel/30 bg-steel/5",
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/resources" className="hover:text-steel flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Resources
        </Link>
        <span>/</span>
        <span className="text-white">Tech Library</span>
      </div>

      <div className="mb-6">
        <h1 className="font-display text-3xl text-white tracking-wide">
          TECH <span className="text-amber">LIBRARY</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {TECH_ARTICLES.length} guides and articles written by expert owners
        </p>
      </div>

      {/* Featured articles */}
      <div className="mb-6">
        <h2 className="font-display text-lg text-white tracking-wide mb-3">FEATURED GUIDES</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {featured.slice(0, 4).map((article) => (
            <Card key={article.id} className="bg-gradient-to-r from-amber/5 to-card border-amber/20 hover:border-amber/40 transition-all group">
              <CardContent className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Badge variant="outline" className={`text-[10px] ${CATEGORY_COLORS[article.category] || ""} flex-shrink-0`}>
                    {article.category}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-white group-hover:text-amber transition-colors mb-1 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">{article.excerpt}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {article.readTime} min read
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Articles */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-background border-border" />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? "default" : "outline"}
              onClick={() => setCategory(c)}
              className={`h-8 text-xs ${category === c ? "bg-amber text-obsidian" : "border-border text-steel hover:text-white"}`}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((article) => (
          <Card key={article.id} className="bg-card border-border hover:border-amber/20 transition-all group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={`text-[9px] ${CATEGORY_COLORS[article.category] || ""} flex-shrink-0`}>
                      {article.category}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-white group-hover:text-amber transition-colors line-clamp-1 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 hidden sm:block">{article.excerpt}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}m
                  </span>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-amber">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
