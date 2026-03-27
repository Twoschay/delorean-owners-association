"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  ArrowLeft,
  MapPin,
  Car,
  MessageSquare,
  Calendar,
  Star,
  Mail,
  Briefcase,
} from "lucide-react";
import { getMemberById } from "@/lib/mock-data/members";
import { getVehiclesByOwner } from "@/lib/mock-data/vehicles";
import { FORUM_THREADS } from "@/lib/mock-data/forum";
import { MOCK_CLASSIFIEDS } from "@/lib/mock-data/classifieds";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MemberProfilePage({ params }: PageProps) {
  const { id } = use(params);
  const member = getMemberById(id);

  if (!member) notFound();

  const vehicles = getVehiclesByOwner(id);
  const memberThreads = FORUM_THREADS.filter((t) => t.author_id === id);
  const memberListings = MOCK_CLASSIFIEDS.filter((c) => c.seller_id === id && !c.is_sold);

  const [initials, gradientClass] = member.avatar_placeholder.split("|");
  const yearsMember = new Date().getFullYear() - new Date(member.join_date).getFullYear();

  const MEMBERSHIP_COLORS: Record<string, string> = {
    national: "text-amber border-amber/30",
    international: "text-blue-400 border-blue-400/30",
    lifetime: "text-purple-400 border-purple-400/30",
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/members" className="hover:text-steel transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Member Directory
        </Link>
        <span>/</span>
        <span className="text-white">{member.name}</span>
      </div>

      {/* Profile Header */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="h-20 w-20">
                <AvatarFallback className={`text-2xl font-medium text-white bg-gradient-to-br ${gradientClass || "from-zinc-700 to-zinc-500"}`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <h1 className="font-display text-3xl text-white tracking-wide mb-1">
                    {member.name.toUpperCase()}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`capitalize text-xs ${MEMBERSHIP_COLORS[member.membership_type] || ""}`}
                    >
                      <Star className="h-3 w-3 mr-1" />
                      {member.membership_type} Member
                    </Badge>
                    <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                      {member.chapter} Chapter
                    </Badge>
                    {yearsMember > 0 && (
                      <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                        {yearsMember} year{yearsMember !== 1 ? "s" : ""} member
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-border text-steel hover:text-white flex-shrink-0">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-steel/70 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-amber" />
                  {member.city}, {member.state}, {member.country}
                </span>
                {member.profession && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5 text-amber" />
                    {member.profession}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-amber" />
                  Joined {new Date(member.join_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
              </div>

              {member.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Vehicles", value: vehicles.length, icon: Car },
          { label: "Forum Posts", value: memberThreads.length, icon: MessageSquare },
          { label: "Classifieds", value: memberListings.length, icon: Star },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card border-border text-center">
            <CardContent className="p-4">
              <stat.icon className="h-5 w-5 text-amber mx-auto mb-1" />
              <div className="font-display text-2xl text-white">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vehicles */}
      {vehicles.length > 0 && (
        <div className="mb-6">
          <h2 className="font-display text-xl text-white tracking-wide mb-3">
            VEHICLES <span className="text-amber">({vehicles.length})</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="bg-card border-border hover:border-amber/20 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-10 rounded bg-gradient-to-br from-steel/20 to-charcoal flex items-center justify-center flex-shrink-0">
                      <Car className="h-5 w-5 text-steel/60" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-white">
                        {vehicle.year} DeLorean DMC-12
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {vehicle.color} · {vehicle.transmission}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {vehicle.mileage.toLocaleString()} miles · {vehicle.condition}
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 font-mono mt-1">
                        VIN: {vehicle.vin.slice(0, 10)}...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Forum threads */}
      {memberThreads.length > 0 && (
        <div className="mb-6">
          <h2 className="font-display text-xl text-white tracking-wide mb-3">
            FORUM THREADS <span className="text-amber">({memberThreads.length})</span>
          </h2>
          <div className="space-y-2">
            {memberThreads.slice(0, 5).map((thread) => (
              <Link key={thread.id} href={`/forum/${thread.category_id}/${thread.id}`}>
                <Card className="bg-card border-border hover:border-amber/20 transition-all group">
                  <CardContent className="p-3">
                    <p className="text-sm font-medium text-white group-hover:text-amber transition-colors line-clamp-1">
                      {thread.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {thread.reply_count} replies · {new Date(thread.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Active listings */}
      {memberListings.length > 0 && (
        <div>
          <h2 className="font-display text-xl text-white tracking-wide mb-3">
            ACTIVE LISTINGS <span className="text-amber">({memberListings.length})</span>
          </h2>
          <div className="space-y-2">
            {memberListings.slice(0, 3).map((listing) => (
              <Link key={listing.id} href="/classifieds">
                <Card className="bg-card border-border hover:border-amber/20 transition-all group">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white group-hover:text-amber transition-colors line-clamp-1 flex-1">
                        {listing.title}
                      </p>
                      <span className="text-sm font-medium text-amber ml-3 flex-shrink-0">
                        {listing.price === 0 ? "Wanted" : `$${listing.price.toLocaleString()}`}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{listing.category} · {listing.condition}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
