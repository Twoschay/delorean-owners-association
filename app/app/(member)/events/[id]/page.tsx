"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Lock,
  Check,
  Minus,
  Plus,
  ExternalLink,
} from "lucide-react";
import { getEventById } from "@/lib/mock-data/events";
import { MOCK_MEMBERS } from "@/lib/mock-data/members";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  "Annual Expo": "text-amber border-amber/30 bg-amber/10",
  "Chapter Meet": "text-blue-400 border-blue-400/30 bg-blue-400/10",
  "Car Show": "text-green-400 border-green-400/30 bg-green-400/10",
  "Tech Workshop": "text-purple-400 border-purple-400/30 bg-purple-400/10",
  "Webinar": "text-pink-400 border-pink-400/30 bg-pink-400/10",
  "Other": "text-steel border-border",
};

const EVENT_GRADIENT: Record<string, string> = {
  "Annual Expo": "from-amber/30 to-charcoal",
  "Chapter Meet": "from-blue-900/40 to-charcoal",
  "Car Show": "from-green-900/30 to-charcoal",
  "Tech Workshop": "from-purple-900/30 to-charcoal",
  "Webinar": "from-pink-900/25 to-charcoal",
  "Other": "from-zinc-700/25 to-charcoal",
};

export default function EventDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const event = getEventById(id);
  const [rsvpStatus, setRsvpStatus] = useState<"none" | "going" | "maybe" | "no">("none");
  const [guests, setGuests] = useState(0);

  if (!event) notFound();

  const gradient = EVENT_GRADIENT[event.type] || "from-zinc-700/25 to-charcoal";

  // Fake attendee list from members
  const attendees = MOCK_MEMBERS.slice(0, 12);

  return (
    <div className="p-4 sm:p-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/events" className="hover:text-steel transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Events
        </Link>
        <span>/</span>
        <span className="text-white line-clamp-1">{event.title}</span>
      </div>

      {/* Hero */}
      <div className={`rounded-xl bg-gradient-to-br ${gradient} border border-border/50 p-8 mb-6 relative overflow-hidden`}>
        <div className="absolute inset-0 brushed-metal opacity-20" />
        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className={EVENT_TYPE_COLORS[event.type] || EVENT_TYPE_COLORS.Other}>
              {event.type}
            </Badge>
            {event.is_members_only && (
              <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                <Lock className="h-3 w-3 mr-1" />
                Members Only
              </Badge>
            )}
            {event.is_past && (
              <Badge variant="outline" className="border-border text-muted-foreground text-xs">Past Event</Badge>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide mb-2">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-steel/80">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-amber" />
              {new Date(event.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              {event.end_date && event.end_date !== event.date && (
                <> — {new Date(event.end_date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</>
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-amber" />
              {event.city !== "Online" ? `${event.location}, ${event.city}, ${event.state}, ${event.country}` : "Online Event (Zoom)"}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-amber" />
              {event.rsvp_count} attending
              {event.max_attendees && ` / ${event.max_attendees} max`}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div>
            <h2 className="font-display text-xl text-white tracking-wide mb-3">ABOUT THIS EVENT</h2>
            <p className="text-sm text-steel/80 leading-relaxed">{event.description}</p>
          </div>

          {/* Location / Map placeholder */}
          {event.city !== "Online" && (
            <div>
              <h2 className="font-display text-xl text-white tracking-wide mb-3">LOCATION</h2>
              <Card className="bg-card border-border overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-charcoal to-obsidian relative flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-amber/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                    <p className="text-xs text-muted-foreground/60">{event.city}, {event.state}, {event.country}</p>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Button asChild size="sm" variant="outline" className="border-border text-steel hover:text-white text-xs h-7">
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(event.location + ", " + event.city)}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Attendees */}
          <div>
            <h2 className="font-display text-xl text-white tracking-wide mb-3">
              ATTENDEES <span className="text-amber">({event.rsvp_count})</span>
            </h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {attendees.map((member) => {
                const [initials] = member.avatar_placeholder.split("|");
                return (
                  <Link key={member.id} href={`/members/${member.id}`}>
                    <Avatar className="h-9 w-9 border-2 border-border hover:border-amber/30 transition-all">
                      <AvatarFallback className="text-xs bg-charcoal text-steel">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                );
              })}
              {event.rsvp_count > 12 && (
                <div className="h-9 w-9 rounded-full bg-charcoal border-2 border-border flex items-center justify-center text-xs text-muted-foreground">
                  +{event.rsvp_count - 12}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {event.rsvp_count} member{event.rsvp_count !== 1 ? "s" : ""} have RSVP&apos;d as going
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* RSVP Card */}
          {!event.is_past && (
            <Card className="bg-card border-border">
              <CardContent className="p-5">
                <h3 className="font-display text-sm text-steel tracking-widest mb-4">YOUR RSVP</h3>

                {rsvpStatus !== "none" ? (
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-2">
                      <Check className="h-6 w-6 text-green-400" />
                    </div>
                    <p className="text-sm font-medium text-white capitalize">
                      {rsvpStatus === "going" ? "You&apos;re going!" : rsvpStatus === "maybe" ? "You said maybe" : "You declined"}
                    </p>
                  </div>
                ) : null}

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <Button
                    onClick={() => setRsvpStatus("going")}
                    size="sm"
                    className={`text-xs ${rsvpStatus === "going" ? "bg-green-600 text-white" : "bg-secondary hover:bg-secondary/80"}`}
                  >
                    Going
                  </Button>
                  <Button
                    onClick={() => setRsvpStatus("maybe")}
                    size="sm"
                    className={`text-xs ${rsvpStatus === "maybe" ? "bg-amber text-obsidian" : "bg-secondary hover:bg-secondary/80"}`}
                  >
                    Maybe
                  </Button>
                  <Button
                    onClick={() => setRsvpStatus("no")}
                    size="sm"
                    variant="outline"
                    className={`text-xs ${rsvpStatus === "no" ? "border-red-400/50 text-red-400" : "border-border text-steel hover:text-white"}`}
                  >
                    Can&apos;t Go
                  </Button>
                </div>

                <Separator className="bg-border mb-4" />

                {/* Guest counter */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-steel">Bring guests</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 border-border text-steel hover:text-white"
                      onClick={() => setGuests(Math.max(0, guests - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium text-white w-4 text-center">{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 border-border text-steel hover:text-white"
                      onClick={() => setGuests(guests + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full border-border text-steel hover:text-white text-xs">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  Add to Calendar (.ics)
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Organizer */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <h3 className="font-display text-xs text-steel tracking-widest mb-3">ORGANIZED BY</h3>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-amber">
                    {event.organizer.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-white">{event.organizer}</p>
                  {event.chapter && (
                    <p className="text-xs text-muted-foreground">{event.chapter} Chapter</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
