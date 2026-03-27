"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Users,
  MessageSquare,
  ShoppingBag,
  Calendar,
  Car,
  Plus,
  ArrowRight,
  MapPin,
  Star,
  PenSquare,
} from "lucide-react";
import { FORUM_THREADS, FORUM_CATEGORIES } from "@/lib/mock-data/forum";
import { MOCK_CLASSIFIEDS } from "@/lib/mock-data/classifieds";
import { getUpcomingEvents } from "@/lib/mock-data/events";
import { MOCK_MEMBERS } from "@/lib/mock-data/members";
import { getVehiclesByOwner } from "@/lib/mock-data/vehicles";

export default function DashboardPage() {
  const { user } = useAuth();

  const upcomingEvents = useMemo(() => getUpcomingEvents().slice(0, 3), []);
  const recentThreads = useMemo(
    () => [...FORUM_THREADS].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 5),
    []
  );
  const recentClassifieds = useMemo(
    () => MOCK_CLASSIFIEDS.filter((c) => !c.is_sold).slice(0, 3),
    []
  );
  const myVehicles = useMemo(
    () => user ? getVehiclesByOwner(user.id) : [],
    [user]
  );
  const initials = user?.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";

  // Activity feed — mix forum + classifieds + events
  const activityFeed = useMemo(() => {
    const items = [
      ...recentThreads.map((t) => ({
        type: "forum" as const,
        id: t.id,
        title: t.title,
        meta: `${t.reply_count} replies`,
        time: t.updated_at,
        href: `/forum/${t.category_id}/${t.id}`,
        icon: MessageSquare,
        author: t.author_name,
      })),
      ...recentClassifieds.map((c) => ({
        type: "classified" as const,
        id: c.id,
        title: c.title,
        meta: `$${c.price.toLocaleString()}`,
        time: c.listed_date,
        href: `/classifieds`,
        icon: ShoppingBag,
        author: c.seller_name,
      })),
      ...upcomingEvents.slice(0, 2).map((e) => ({
        type: "event" as const,
        id: e.id,
        title: e.title,
        meta: `${e.city}, ${e.country}`,
        time: e.date,
        href: `/events`,
        icon: Calendar,
        author: e.organizer,
      })),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8);
    return items;
  }, [recentThreads, recentClassifieds, upcomingEvents]);

  const totalForumPosts = FORUM_CATEGORIES.reduce((acc, c) => acc + c.post_count, 0);
  const activeClassifieds = MOCK_CLASSIFIEDS.filter((c) => !c.is_sold).length;

  return (
    <div className="p-4 sm:p-6">
      {/* Welcome Banner */}
      <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-amber/10 via-amber/5 to-transparent border border-amber/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-lg bg-amber/20 text-amber border border-amber/30">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
                WELCOME BACK, <span className="text-amber">{user?.name.split(" ")[0].toUpperCase()}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge className="bg-amber/10 text-amber border-amber/30 capitalize text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  {user?.membership_type} Member
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Since {user?.join_date ? new Date(user.join_date).getFullYear() : "—"}
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{user?.chapter} Chapter</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
              <Link href="/forum">
                <PenSquare className="h-3.5 w-3.5 mr-1" />
                New Post
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="border-border text-steel hover:text-white">
              <Link href="/classifieds">
                <Plus className="h-3.5 w-3.5 mr-1" />
                List Item
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="border-border text-steel hover:text-white">
              <Link href="/garage">
                <Car className="h-3.5 w-3.5 mr-1" />
                Garage
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Members", value: MOCK_MEMBERS.length.toLocaleString(), icon: Users, href: "/members" },
          { label: "Forum Posts", value: totalForumPosts.toLocaleString(), icon: MessageSquare, href: "/forum" },
          { label: "Active Listings", value: activeClassifieds.toString(), icon: ShoppingBag, href: "/classifieds" },
          { label: "Upcoming Events", value: upcomingEvents.length.toString(), icon: Calendar, href: "/events" },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="bg-card border-border hover:border-amber/30 transition-all hover:-translate-y-0.5 group h-full">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <stat.icon className="h-4 w-4 text-muted-foreground group-hover:text-amber transition-colors" />
                </div>
                <div className="font-display text-2xl text-white group-hover:text-amber transition-colors">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Activity Feed — 3/5 */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-white tracking-wide">RECENT ACTIVITY</h2>
          </div>

          <div className="space-y-2">
            {activityFeed.map((item) => (
              <Link key={`${item.type}-${item.id}`} href={item.href}>
                <Card className="bg-card border-border hover:border-amber/20 transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center ${
                        item.type === "forum" ? "bg-blue-500/10" :
                        item.type === "classified" ? "bg-green-500/10" : "bg-amber/10"
                      }`}>
                        <item.icon className={`h-4 w-4 ${
                          item.type === "forum" ? "text-blue-400" :
                          item.type === "classified" ? "text-green-400" : "text-amber"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white group-hover:text-amber transition-colors truncate font-medium">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{item.author}</span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">{item.meta}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground flex-shrink-0">
                        {new Date(item.time).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-steel">
              <Link href="/forum">View All Forum Posts <ArrowRight className="h-3 w-3 ml-1" /></Link>
            </Button>
          </div>
        </div>

        {/* Sidebar — 2/5 */}
        <div className="lg:col-span-2 space-y-4">
          {/* My Vehicles */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm text-steel tracking-widest flex items-center justify-between">
                MY GARAGE
                <Link href="/garage" className="text-xs text-amber hover:text-amber-glow font-sans font-normal">
                  View All
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              {myVehicles.length > 0 ? (
                <div className="space-y-2">
                  {myVehicles.map((v) => (
                    <div key={v.id} className="flex items-center gap-3 p-2.5 rounded bg-charcoal/50 border border-border/50">
                      <div className="w-10 h-8 rounded bg-gradient-to-br from-steel/20 to-charcoal flex items-center justify-center flex-shrink-0">
                        <Car className="h-4 w-4 text-steel/60" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white">{v.year} DMC-12</p>
                        <p className="text-[10px] text-muted-foreground truncate">{v.color} · {v.mileage.toLocaleString()} mi</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-xs text-muted-foreground mb-2">No vehicles registered yet</p>
                  <Button asChild size="sm" variant="outline" className="text-xs border-border text-steel hover:text-white h-7">
                    <Link href="/garage">Add Your DeLorean</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm text-steel tracking-widest flex items-center justify-between">
                UPCOMING EVENTS
                <Link href="/events" className="text-xs text-amber hover:text-amber-glow font-sans font-normal">
                  All Events
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-center w-10">
                      <div className="font-display text-lg text-amber leading-none">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-[9px] text-muted-foreground uppercase">
                        {new Date(event.date).toLocaleString("en-US", { month: "short" })}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white line-clamp-1">{event.title}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-2.5 w-2.5" />
                        {event.city}, {event.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map Mini */}
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-sm text-steel tracking-widest">
                MEMBER MAP
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mini SVG map */}
              <div className="relative">
                <svg viewBox="0 0 400 220" className="w-full bg-obsidian opacity-80">
                  <path d="M 25 60 Q 40 45 60 50 Q 75 47 80 60 Q 85 75 75 85 Q 65 95 50 90 Q 30 87 25 75 Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
                  <path d="M 30 100 Q 40 95 50 100 Q 60 105 65 115 Q 70 130 60 140 Q 45 150 35 142 Q 25 135 27 122 Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
                  <path d="M 100 40 Q 125 30 155 40 Q 180 47 190 65 Q 195 82 180 92 Q 160 102 140 100 Q 120 97 107 87 Q 95 77 97 60 Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
                  <path d="M 145 110 Q 165 105 180 115 Q 190 125 185 140 Q 177 155 162 157 Q 147 157 140 147 Q 132 135 137 122 Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
                  <path d="M 225 50 Q 245 40 270 45 Q 290 50 305 65 Q 315 80 310 97 Q 300 112 280 115 Q 260 116 245 105 Q 230 94 227 77 Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
                  <path d="M 265 120 Q 282 117 297 125 Q 312 135 310 152 Q 305 167 290 172 Q 272 175 260 165 Q 249 154 252 140 Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
                  <path d="M 325 130 Q 345 125 365 135 Q 380 145 377 160 Q 372 175 357 177 Q 340 179 330 167 Q 320 156 323 142 Z" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="0.5" />
                  {[
                    [110,55],[120,62],[155,70],[165,65],[97,72],[135,82],[177,77],[125,87],[170,85],[110,47],
                    [235,60],[252,52],[275,57],[290,70],[265,77],[250,67],[280,62],[245,77],[285,75],[272,65],
                    [65,77],[55,70],[72,72],[50,82],[60,65],[320,140],[347,132],[360,137],[340,147],[355,142],
                    [310,135],[297,142],[320,147],[305,130],[155,122],[160,120],[165,125],[145,122],[155,127],
                    [245,155],[255,147],[260,157],[240,152],[250,162],
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r={i < 5 ? 3 : 2} fill="#F5A623" opacity={i < 10 ? 0.9 : 0.6} />
                  ))}
                </svg>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent p-3">
                  <Button asChild size="sm" variant="outline" className="w-full text-xs h-7 border-border text-steel hover:text-white">
                    <Link href="/members/map">View Full Map</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
