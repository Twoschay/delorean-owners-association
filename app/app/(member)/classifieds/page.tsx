"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, MapPin, Car, Wrench, Package, Settings, HelpCircle } from "lucide-react";
import { MOCK_CLASSIFIEDS } from "@/lib/mock-data/classifieds";

const CATEGORIES = ["All", "Vehicles", "Parts", "Accessories", "Services", "Wanted"];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Vehicles: Car,
  Parts: Wrench,
  Accessories: Package,
  Services: Settings,
  Wanted: HelpCircle,
};

const CONDITION_COLORS: Record<string, string> = {
  Concours: "text-purple-400 border-purple-400/30",
  Excellent: "text-green-400 border-green-400/30",
  "Like New": "text-emerald-400 border-emerald-400/30",
  New: "text-blue-400 border-blue-400/30",
  Good: "text-amber border-amber/30",
  Fair: "text-orange-400 border-orange-400/30",
  "For Parts": "text-red-400 border-red-400/30",
};

const GRADIENT_COLORS = [
  "from-amber/20 to-charcoal",
  "from-steel/10 to-charcoal",
  "from-blue-900/20 to-charcoal",
  "from-zinc-600/20 to-charcoal",
  "from-stone-600/20 to-charcoal",
];

export default function ClassifiedsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [showSold, setShowSold] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_CLASSIFIEDS.filter((c) => {
      if (!showSold && c.is_sold) return false;
      if (category !== "All" && c.category !== category) return false;
      if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      if (sort === "newest") return new Date(b.listed_date).getTime() - new Date(a.listed_date).getTime();
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return 0;
    });
  }, [category, search, sort, showSold]);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl text-white tracking-wide">
            MEMBER <span className="text-amber">CLASSIFIEDS</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} listing{filtered.length !== 1 ? "s" : ""} · Member-to-member marketplace
          </p>
        </div>
        <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold flex-shrink-0">
          <Link href="/classifieds/new">
            <Plus className="h-4 w-4 mr-2" />
            Create Listing
          </Link>
        </Button>
      </div>

      {/* Category Tabs */}
      <Tabs value={category} onValueChange={setCategory} className="mb-4">
        <TabsList className="bg-charcoal/50 border border-border h-auto flex-wrap">
          {CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="data-[state=active]:bg-amber data-[state=active]:text-obsidian text-xs"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background border-border"
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="bg-background border-border w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSold(!showSold)}
          className={`border-border h-10 ${showSold ? "text-amber border-amber/40" : "text-steel hover:text-white"}`}
        >
          {showSold ? "Hide Sold" : "Show Sold"}
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((listing, i) => {
          const IconComp = CATEGORY_ICONS[listing.category] || Package;
          const gradient = GRADIENT_COLORS[i % GRADIENT_COLORS.length];
          return (
            <Link key={listing.id} href={`/classifieds/${listing.id}`}>
              <Card className={`bg-card border-border hover:border-amber/30 transition-all hover:-translate-y-0.5 group h-full ${listing.is_sold ? "opacity-60" : ""}`}>
                <CardContent className="p-0">
                  {/* Image placeholder */}
                  <div className={`h-36 bg-gradient-to-br ${gradient} relative flex items-center justify-center rounded-t-lg overflow-hidden`}>
                    <IconComp className="h-12 w-12 text-white/10" />
                    {listing.is_sold && (
                      <div className="absolute inset-0 bg-obsidian/60 flex items-center justify-center">
                        <Badge className="bg-red-500/90 text-white text-sm font-bold">SOLD</Badge>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="text-[10px] bg-obsidian/80 border-border text-muted-foreground">
                        {listing.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-medium text-white group-hover:text-amber transition-colors line-clamp-2 mb-2">
                      {listing.title}
                    </h3>

                    <div className="flex items-center justify-between mb-2">
                      {listing.price === 0 ? (
                        <span className="text-steel font-medium text-sm">Wanted</span>
                      ) : (
                        <span className={`font-bold text-base ${listing.is_sold ? "line-through text-muted-foreground" : "text-amber"}`}>
                          ${listing.price.toLocaleString()}
                          {listing.price_negotiable && !listing.is_sold && (
                            <span className="text-xs font-normal text-muted-foreground ml-1">OBO</span>
                          )}
                        </span>
                      )}
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${CONDITION_COLORS[listing.condition] || "text-muted-foreground border-border"}`}
                      >
                        {listing.condition}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      {listing.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {listing.seller_name} ·{" "}
                      {new Date(listing.listed_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="h-8 w-8 mx-auto mb-3 opacity-30" />
          <p>No listings match your search.</p>
          <Button asChild className="mt-4 bg-amber hover:bg-amber-glow text-obsidian font-bold">
            <Link href="/classifieds/new">Create the First Listing</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
