"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Phone, Star, Wrench, Search } from "lucide-react";
import { MOCK_SERVICE_CENTERS } from "@/lib/mock-data/service-centers";

const SPECIALTIES_FILTER = ["All", "Mechanical", "Electrical", "Restoration", "EV Conversion", "Parts", "Body Work"];

function latLngToSvg(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 700;
  const y = ((90 - lat) / 180) * 380;
  return { x, y };
}

const CONTINENT_PATHS = [
  "M 74 68 Q 104 51 136 60 Q 159 65 174 80 Q 185 96 178 113 Q 164 132 147 135 Q 124 137 105 124 Q 80 110 74 90 Z",
  "M 136 140 Q 152 136 155 152 Q 152 168 140 170 Q 127 168 125 157 Z",
  "M 168 157 Q 194 143 213 157 Q 232 172 234 195 Q 236 221 218 240 Q 197 258 177 254 Q 155 248 147 228 Q 139 205 145 182 Z",
  "M 334 60 Q 365 46 397 53 Q 420 62 429 80 Q 433 100 420 112 Q 401 124 378 121 Q 354 116 340 100 Q 328 84 334 68 Z",
  "M 352 35 Q 374 24 390 32 Q 400 43 391 53 Q 374 59 357 52 Z",
  "M 350 122 Q 383 110 408 120 Q 432 131 438 154 Q 441 176 425 191 Q 403 202 380 199 Q 356 193 344 173 Q 334 152 340 135 Z",
  "M 416 103 Q 445 93 467 104 Q 482 118 472 133 Q 456 142 435 139 Q 416 132 412 118 Z",
  "M 395 28 Q 454 13 513 22 Q 560 35 582 55 Q 597 74 582 88 Q 555 100 515 100 Q 473 99 440 85 Q 410 72 400 52 Z",
  "M 468 115 Q 500 108 522 120 Q 538 134 530 152 Q 515 165 494 162 Q 472 157 464 140 Z",
  "M 525 196 Q 560 186 584 200 Q 598 215 590 232 Q 573 245 552 241 Q 530 234 524 217 Z",
  "M 538 78 Q 574 62 606 70 Q 630 80 630 100 Q 622 118 600 120 Q 570 121 554 107 Q 540 93 540 80 Z",
  "M 613 78 Q 630 71 639 78 Q 643 90 635 95 Q 620 97 610 89 Z",
  "M 555 228 Q 590 216 622 229 Q 645 244 641 264 Q 631 280 610 283 Q 585 283 570 268 Q 557 252 558 238 Z",
  "M 647 264 Q 660 258 668 265 Q 670 275 664 279 Q 652 281 644 274 Z",
];

export default function ServiceCentersPage() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MOCK_SERVICE_CENTERS.filter((sc) => {
      if (search) {
        const s = search.toLowerCase();
        if (!sc.name.toLowerCase().includes(s) && !sc.city.toLowerCase().includes(s) && !sc.country.toLowerCase().includes(s)) return false;
      }
      if (specialty !== "All" && !sc.specialties.some((sp) => sp.toLowerCase().includes(specialty.toLowerCase()))) return false;
      return true;
    });
  }, [search, specialty]);

  const selectedCenter = selected ? MOCK_SERVICE_CENTERS.find((s) => s.id === selected) : null;
  const highlightCenter = selectedCenter || (hovered ? MOCK_SERVICE_CENTERS.find((s) => s.id === hovered) : null);

  return (
    <div className="p-4 sm:p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/resources" className="hover:text-steel flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Resources
        </Link>
        <span>/</span>
        <span className="text-white">Service Centers</span>
      </div>

      <div className="mb-6">
        <h1 className="font-display text-3xl text-white tracking-wide">
          SERVICE CENTER <span className="text-amber">LOCATOR</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {MOCK_SERVICE_CENTERS.length} DOA-vetted service centers worldwide
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, city, country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background border-border"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES_FILTER.slice(0, 5).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={specialty === s ? "default" : "outline"}
              onClick={() => setSpecialty(s)}
              className={`h-8 text-xs ${specialty === s ? "bg-amber text-obsidian" : "border-border text-steel hover:text-white"}`}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Map + List layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* SVG Map */}
        <div className="lg:w-[60%] relative rounded-xl overflow-hidden border border-border/50 bg-[#0D0D0D]">
          {/* Popup */}
          {highlightCenter && (
            <div className="absolute top-3 right-3 z-10 w-56">
              <Card className="bg-charcoal border-amber/30 shadow-amber-glow">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-xs font-medium text-white line-clamp-2">{highlightCenter.name}</h4>
                    {highlightCenter.is_official_dmc && (
                      <Star className="h-3.5 w-3.5 text-amber flex-shrink-0 fill-amber" />
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-2">{highlightCenter.city}, {highlightCenter.country}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {highlightCenter.specialties.slice(0, 3).map((sp) => (
                      <Badge key={sp} variant="outline" className="text-[8px] border-amber/30 text-amber/80 px-1 py-0">{sp}</Badge>
                    ))}
                  </div>
                  <Button
                    onClick={() => setSelected(highlightCenter.id)}
                    size="sm"
                    className="w-full bg-amber/10 hover:bg-amber/20 text-amber border border-amber/30 text-[10px] h-6"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          <svg viewBox="0 0 700 380" className="w-full" style={{ background: "#0D0D0D" }}>
            {/* Grid */}
            {[-60, -30, 0, 30, 60].map((lat) => (
              <line key={lat} x1="0" y1={((90-lat)/180)*380} x2="700" y2={((90-lat)/180)*380} stroke="#111" strokeWidth="0.4" />
            ))}
            {[-120, -60, 0, 60, 120].map((lng) => (
              <line key={lng} x1={((lng+180)/360)*700} y1="0" x2={((lng+180)/360)*700} y2="380" stroke="#111" strokeWidth="0.4" />
            ))}

            {/* Continents */}
            {CONTINENT_PATHS.map((path, i) => (
              <path key={i} d={path} fill="#1A2030" stroke="#252F40" strokeWidth="0.6" />
            ))}

            {/* Service Center markers */}
            {MOCK_SERVICE_CENTERS.map((sc) => {
              const { x, y } = latLngToSvg(sc.lat, sc.lng);
              const isActive = selected === sc.id || hovered === sc.id;
              return (
                <g key={sc.id}>
                  {isActive && <circle cx={x} cy={y} r={10} fill="#F5A623" opacity={0.2} />}
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 6 : sc.is_official_dmc ? 5 : 4}
                    fill={sc.is_official_dmc ? "#F5A623" : "#C0C0C0"}
                    opacity={isActive ? 1 : 0.8}
                    className="cursor-pointer"
                    onMouseEnter={() => setHovered(sc.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(sc.id === selected ? null : sc.id)}
                  />
                  {sc.is_official_dmc && (
                    <circle cx={x} cy={y} r={isActive ? 6 : 5} fill="none" stroke="#F5A623" strokeWidth="1.5" opacity={0.5} />
                  )}
                </g>
              );
            })}

            {/* Legend */}
            <g transform="translate(8,330)">
              <rect x="0" y="0" width="120" height="42" rx="3" fill="#0D0D0D" fillOpacity="0.9" stroke="#222" />
              <circle cx="10" cy="12" r="4" fill="#F5A623" />
              <text x="18" y="16" fill="#aaa" fontSize="8" fontFamily="sans-serif">Official DMC</text>
              <circle cx="10" cy="28" r="3.5" fill="#C0C0C0" />
              <text x="18" y="32" fill="#aaa" fontSize="8" fontFamily="sans-serif">Certified Shop</text>
            </g>
          </svg>
        </div>

        {/* List */}
        <div className="lg:w-[40%] space-y-2 lg:max-h-[500px] lg:overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Wrench className="h-6 w-6 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No service centers match your search.</p>
            </div>
          ) : (
            filtered.map((sc) => (
              <Card
                key={sc.id}
                onClick={() => setSelected(sc.id === selected ? null : sc.id)}
                className={`bg-card border-border cursor-pointer transition-all hover:border-amber/30 ${selected === sc.id ? "border-amber/50" : ""}`}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {sc.is_official_dmc && (
                        <Star className="h-3.5 w-3.5 text-amber fill-amber flex-shrink-0" />
                      )}
                      <h4 className="text-xs font-medium text-white line-clamp-1">{sc.name}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1.5">
                    <MapPin className="h-3 w-3" />
                    {sc.city}, {sc.state}, {sc.country}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {sc.specialties.slice(0, 3).map((sp) => (
                      <Badge key={sp} variant="outline" className="text-[8px] border-border text-muted-foreground px-1 py-0">{sp}</Badge>
                    ))}
                    {sc.specialties.length > 3 && (
                      <Badge variant="outline" className="text-[8px] border-border text-muted-foreground px-1 py-0">+{sc.specialties.length - 3}</Badge>
                    )}
                  </div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    {sc.phone}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
