"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { MOCK_MEMBERS } from "@/lib/mock-data/members";

const CHAPTERS = ["All", "Northeast", "Southeast", "Midwest", "Southwest", "Pacific", "UK", "Europe", "Australia"];
const MEMBERSHIP_TYPES = ["All", "national", "international", "lifetime"];
const PER_PAGE = 24;

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [chapter, setChapter] = useState("All");
  const [membership, setMembership] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_MEMBERS.filter((m) => {
      if (search) {
        const s = search.toLowerCase();
        if (
          !m.name.toLowerCase().includes(s) &&
          !m.city.toLowerCase().includes(s) &&
          !m.state.toLowerCase().includes(s) &&
          !m.country.toLowerCase().includes(s)
        )
          return false;
      }
      if (chapter !== "All" && m.chapter !== chapter) return false;
      if (membership !== "All" && m.membership_type !== membership) return false;
      return true;
    });
  }, [search, chapter, membership]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilterChange = () => setPage(1);

  const MEMBERSHIP_COLORS: Record<string, string> = {
    national: "bg-amber/10 text-amber border-amber/30",
    international: "bg-blue-500/10 text-blue-400 border-blue-400/30",
    lifetime: "bg-purple-500/10 text-purple-400 border-purple-400/30",
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl text-white tracking-wide">
            MEMBER <span className="text-amber">DIRECTORY</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length.toLocaleString()} of {MOCK_MEMBERS.length.toLocaleString()} members
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="border-border text-steel hover:text-white flex-shrink-0">
          <Link href="/members/map">
            <MapPin className="h-4 w-4 mr-2" />
            View Map
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, city, country..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); handleFilterChange(); }}
            className="pl-9 bg-background border-border"
          />
        </div>
        <Select value={chapter} onValueChange={(v) => { setChapter(v); handleFilterChange(); }}>
          <SelectTrigger className="bg-background border-border w-full sm:w-[160px]">
            <SelectValue placeholder="Chapter" />
          </SelectTrigger>
          <SelectContent>
            {CHAPTERS.map((c) => (
              <SelectItem key={c} value={c}>{c === "All" ? "All Chapters" : c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={membership} onValueChange={(v) => { setMembership(v); handleFilterChange(); }}>
          <SelectTrigger className="bg-background border-border w-full sm:w-[160px]">
            <SelectValue placeholder="Membership" />
          </SelectTrigger>
          <SelectContent>
            {MEMBERSHIP_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t === "All" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
        {paginated.map((member) => {
          const [initials] = [member.avatar_placeholder.split("|")[0]];
          const [, gradientClass] = member.avatar_placeholder.split("|");
          return (
            <Link key={member.id} href={`/members/${member.id}`}>
              <Card className="bg-card border-border hover:border-amber/30 transition-all hover:-translate-y-0.5 group h-full">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className={`text-sm text-white font-medium bg-gradient-to-br ${gradientClass || "from-zinc-700 to-zinc-500"}`}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white group-hover:text-amber transition-colors truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
                        <span className="truncate">{member.city}, {member.country}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <Badge variant="outline" className="text-[10px] border-border text-muted-foreground h-4 px-1.5">
                      {member.chapter}
                    </Badge>
                    <Badge variant="outline" className={`text-[10px] h-4 px-1.5 capitalize ${MEMBERSHIP_COLORS[member.membership_type] || ""}`}>
                      {member.membership_type}
                    </Badge>
                    {member.show_on_map && (
                      <Badge variant="outline" className="text-[10px] border-border text-muted-foreground h-4 px-1.5">
                        <MapPin className="h-2 w-2 mr-0.5" />
                        Map
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Member since {new Date(member.join_date).getFullYear()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {paginated.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-8 w-8 mx-auto mb-3 opacity-30" />
          <p>No members match your search.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="border-border text-steel hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = page <= 3 ? i + 1 : page + i - 2;
              if (pageNum < 1 || pageNum > totalPages) return null;
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                  className={pageNum === page ? "bg-amber text-obsidian" : "border-border text-steel hover:text-white w-8 h-8 p-0"}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="border-border text-steel hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
