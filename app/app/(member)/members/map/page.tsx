"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, Users, MapPin } from "lucide-react";
import { getMapMembers } from "@/lib/mock-data/members";
import { Member } from "@/lib/types";

const CHAPTERS = ["All", "Northeast", "Southeast", "Midwest", "Southwest", "Pacific", "UK", "Europe", "Australia"];

// Map coordinate transformations — convert lat/lng to SVG viewBox coordinates
// ViewBox: 0 0 900 450 representing the world
function latLngToSvg(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 900;
  const y = ((90 - lat) / 180) * 450;
  return { x, y };
}

// Simplified world continent paths for dark SVG map
const CONTINENT_PATHS = [
  // North America
  "M 95 80 Q 130 60 175 75 Q 205 80 225 100 Q 240 120 230 145 Q 215 170 195 175 Q 175 180 155 170 Q 130 160 115 140 Q 95 120 95 100 Z",
  // Central America + Caribbean
  "M 175 175 Q 195 180 200 195 Q 195 215 180 220 Q 165 218 160 205 Q 157 192 165 183 Z",
  // South America  
  "M 215 200 Q 250 185 275 200 Q 300 215 305 250 Q 310 285 290 315 Q 265 340 240 335 Q 215 325 202 300 Q 190 270 195 240 Z",
  // Greenland
  "M 280 30 Q 310 20 335 35 Q 345 55 330 65 Q 310 72 285 60 Z",
  // Europe
  "M 430 75 Q 470 60 510 70 Q 540 80 555 100 Q 560 120 545 135 Q 520 148 490 145 Q 462 140 445 125 Q 428 108 430 90 Z",
  // Scandinavia
  "M 455 45 Q 480 30 500 40 Q 515 52 505 68 Q 488 78 465 72 Z",
  // Africa
  "M 450 155 Q 490 140 525 150 Q 558 162 570 195 Q 582 230 575 270 Q 565 308 545 328 Q 520 345 492 342 Q 462 335 446 310 Q 430 282 430 250 Q 428 215 435 185 Z",
  // Middle East
  "M 540 130 Q 575 120 605 132 Q 625 148 618 168 Q 605 182 580 180 Q 558 175 545 160 Z",
  // Russia / Central Asia
  "M 510 40 Q 580 20 660 30 Q 730 45 760 70 Q 775 92 755 110 Q 720 128 670 130 Q 620 130 575 118 Q 535 108 520 88 Z",
  // South Asia
  "M 605 150 Q 645 140 675 155 Q 700 172 695 198 Q 680 220 655 222 Q 628 220 612 200 Q 598 180 600 163 Z",
  // Southeast Asia
  "M 680 175 Q 715 168 740 182 Q 758 198 750 218 Q 732 232 710 228 Q 688 222 678 205 Z",
  // East Asia
  "M 690 100 Q 740 80 785 90 Q 815 102 820 125 Q 815 148 790 155 Q 760 160 730 150 Q 705 138 695 118 Z",
  // Japan
  "M 790 100 Q 808 92 820 100 Q 825 114 815 120 Q 800 124 790 114 Z",
  // Australia
  "M 715 290 Q 758 275 795 288 Q 825 304 828 330 Q 826 358 800 368 Q 768 375 740 365 Q 712 350 706 325 Z",
  // New Zealand
  "M 838 340 Q 850 332 860 340 Q 863 352 855 360 Q 843 362 835 354 Z",
];

export default function MemberMapPage() {
  const [selectedChapter, setSelectedChapter] = useState("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [hoveredMember, setHoveredMember] = useState<Member | null>(null);

  const mapMembers = useMemo(() => getMapMembers(), []);

  const filteredMembers = useMemo(() => {
    if (selectedChapter === "All") return mapMembers;
    return mapMembers.filter((m) => m.chapter === selectedChapter);
  }, [mapMembers, selectedChapter]);

  const CHAPTER_COLORS: Record<string, string> = {
    Northeast: "#3B82F6",
    Southeast: "#10B981",
    Midwest: "#8B5CF6",
    Southwest: "#F97316",
    Pacific: "#06B6D4",
    UK: "#EC4899",
    Europe: "#EAB308",
    Australia: "#F43F5E",
  };

  const displayMember = selectedMember || hoveredMember;

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border bg-obsidian/80 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/members" className="text-muted-foreground hover:text-steel transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-display text-2xl text-white tracking-wide">
                GLOBAL MEMBER <span className="text-amber">MAP</span>
              </h1>
              <p className="text-xs text-muted-foreground">
                {filteredMembers.length} members shown · {mapMembers.length} total on map
              </p>
            </div>
          </div>

          {/* Chapter filters */}
          <div className="flex flex-wrap gap-1.5">
            {CHAPTERS.slice(0, 5).map((ch) => (
              <Button
                key={ch}
                size="sm"
                variant={selectedChapter === ch ? "default" : "outline"}
                onClick={() => setSelectedChapter(ch)}
                className={`h-7 text-xs px-2 ${
                  selectedChapter === ch
                    ? "bg-amber text-obsidian"
                    : "border-border text-steel hover:text-white"
                }`}
              >
                {ch === "All" ? "All" : ch}
              </Button>
            ))}
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="h-7 text-xs px-2 bg-background border border-border rounded text-steel sm:hidden"
            >
              {CHAPTERS.map((ch) => (
                <option key={ch} value={ch}>{ch}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map container */}
      <div className="flex-1 relative overflow-hidden bg-[#0D0D0D]">
        {/* SVG World Map */}
        <svg
          viewBox="0 0 900 450"
          className="w-full h-full"
          style={{ background: "#0D0D0D" }}
        >
          {/* Grid lines */}
          {[-60, -30, 0, 30, 60].map((lat) => {
            const y = ((90 - lat) / 180) * 450;
            return (
              <line key={lat} x1="0" y1={y} x2="900" y2={y} stroke="#1a1a1a" strokeWidth="0.5" />
            );
          })}
          {[-120, -60, 0, 60, 120].map((lng) => {
            const x = ((lng + 180) / 360) * 900;
            return (
              <line key={lng} x1={x} y1="0" x2={x} y2="450" stroke="#1a1a1a" strokeWidth="0.5" />
            );
          })}

          {/* Ocean */}
          <rect x="0" y="0" width="900" height="450" fill="#0D1117" />

          {/* Continents */}
          {CONTINENT_PATHS.map((path, i) => (
            <path key={i} d={path} fill="#1E2229" stroke="#2D3340" strokeWidth="0.8" />
          ))}

          {/* Equator */}
          <line x1="0" y1="225" x2="900" y2="225" stroke="#222" strokeWidth="0.5" strokeDasharray="4,4" />

          {/* Member dots */}
          {filteredMembers.map((member) => {
            const { x, y } = latLngToSvg(member.lat, member.lng);
            const color = CHAPTER_COLORS[member.chapter] || "#F5A623";
            const isSelected = selectedMember?.id === member.id;
            const isHovered = hoveredMember?.id === member.id;

            return (
              <g key={member.id}>
                {/* Glow ring for selected/hovered */}
                {(isSelected || isHovered) && (
                  <circle cx={x} cy={y} r={8} fill={color} opacity={0.2} />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 5 : isHovered ? 4.5 : 3}
                  fill={color}
                  opacity={isSelected || isHovered ? 1 : 0.7}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredMember(member)}
                  onMouseLeave={() => setHoveredMember(null)}
                  onClick={() => setSelectedMember(member === selectedMember ? null : member)}
                />
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(15, 380)">
            <rect x="0" y="0" width="170" height="62" rx="4" fill="#0D0D0D" fillOpacity="0.9" stroke="#2D2D2D" />
            <text x="8" y="14" fill="#888" fontSize="8" fontFamily="sans-serif">CHAPTERS</text>
            {Object.entries(CHAPTER_COLORS).slice(0, 8).map(([ch, color], i) => (
              <g key={ch} transform={`translate(${8 + (i % 4) * 40}, ${22 + Math.floor(i / 4) * 16})`}>
                <circle cx="4" cy="4" r="3" fill={color} />
                <text x="10" y="8" fill="#aaa" fontSize="7" fontFamily="sans-serif">{ch.slice(0, 5)}</text>
              </g>
            ))}
          </g>
        </svg>

        {/* Member popup */}
        {displayMember && (
          <div
            className="absolute top-4 right-4 w-64 z-10"
            onMouseEnter={() => hoveredMember && setHoveredMember(hoveredMember)}
          >
            <Card className="bg-charcoal border-amber/30 shadow-amber-glow">
              <CardContent className="p-4">
                {selectedMember && (
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 text-white"
                    style={{ backgroundColor: CHAPTER_COLORS[displayMember.chapter] + "33", border: `2px solid ${CHAPTER_COLORS[displayMember.chapter]}44` }}
                  >
                    {displayMember.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{displayMember.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5" />
                      {displayMember.city}, {displayMember.country}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                    {displayMember.chapter} Chapter
                  </Badge>
                  <Badge variant="outline" className="text-[10px] border-amber/30 text-amber capitalize">
                    {displayMember.membership_type}
                  </Badge>
                </div>
                {displayMember.vehicle_ids.length > 0 && (
                  <p className="text-xs text-muted-foreground mb-3">
                    {displayMember.vehicle_ids.length} vehicle{displayMember.vehicle_ids.length !== 1 ? "s" : ""} registered
                  </p>
                )}
                <Button asChild size="sm" className="w-full bg-amber/10 hover:bg-amber/20 text-amber border border-amber/30 text-xs h-7">
                  <Link href={`/members/${displayMember.id}`}>View Profile →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats overlay */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-obsidian/90 border border-border rounded-lg px-3 py-2 flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-amber" />
            <span className="text-xs text-steel">
              <span className="text-amber font-medium">{filteredMembers.length}</span> members on map
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
