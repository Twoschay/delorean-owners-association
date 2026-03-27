import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, Lock, ArrowRight } from "lucide-react";
import { getUpcomingEvents, getPastEvents } from "@/lib/mock-data/events";

export const metadata: Metadata = {
  title: "Events",
  description: "DeLorean Owners Association events — annual expo, chapter meets, tech workshops, and more.",
};

const EVENT_TYPE_COLORS: Record<string, string> = {
  "Annual Expo": "text-amber border-amber/30 bg-amber/10",
  "Chapter Meet": "text-steel border-steel/30 bg-steel/5",
  "Car Show": "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  "Tech Workshop": "text-blue-400 border-blue-400/30 bg-blue-400/5",
  "Webinar": "text-purple-400 border-purple-400/30 bg-purple-400/5",
  "Other": "text-muted-foreground border-border",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 border-b border-border bg-gradient-to-b from-charcoal/50 to-transparent">
        <div className="container max-w-3xl">
          <Badge className="mb-4 bg-amber/10 text-amber border-amber/30">2026 Season</Badge>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide mb-4">
            EVENTS & <span className="text-amber">GATHERINGS</span>
          </h1>
          <p className="text-lg text-steel/70 leading-relaxed">
            From intimate chapter meets to the annual DeLorean Expo — there&apos;s always somewhere
            to take your DMC-12. Members can RSVP and add events to their calendar.
          </p>
        </div>
      </section>

      {/* Featured Event */}
      {upcoming[0] && (
        <section className="py-12 bg-gradient-to-r from-amber/5 to-transparent border-b border-border">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-amber/30 max-w-[40px]" />
                <span className="text-amber text-xs uppercase tracking-widest font-medium">Featured Event</span>
              </div>
              <Badge className={`mb-3 text-xs ${EVENT_TYPE_COLORS[upcoming[0].type] || EVENT_TYPE_COLORS.Other}`}>
                {upcoming[0].type}
              </Badge>
              <h2 className="font-display text-4xl text-white tracking-wide mb-3">
                {upcoming[0].title}
              </h2>
              <p className="text-muted-foreground mb-4 max-w-xl leading-relaxed">
                {upcoming[0].description.slice(0, 250)}...
              </p>
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-steel/80">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-amber" />
                  {new Date(upcoming[0].date).toLocaleDateString("en-US", {
                    weekday: "long", month: "long", day: "numeric", year: "numeric",
                  })}
                  {upcoming[0].end_date && upcoming[0].end_date !== upcoming[0].date && (
                    <> — {new Date(upcoming[0].end_date).toLocaleDateString("en-US", {
                      month: "short", day: "numeric",
                    })}</>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-amber" />
                  {upcoming[0].city}, {upcoming[0].state}, {upcoming[0].country}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-amber" />
                  {upcoming[0].rsvp_count} attending
                  {upcoming[0].max_attendees && ` / ${upcoming[0].max_attendees} max`}
                </div>
              </div>
              <div className="flex gap-3">
                <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
                  <Link href="/join">
                    <Lock className="h-4 w-4 mr-2" />
                    Login to RSVP
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-border text-steel hover:text-white">
                  <Link href="/join">Join to Access All Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-3xl text-white tracking-wide mb-8">
            UPCOMING <span className="text-amber">EVENTS</span>
          </h2>

          <div className="space-y-4">
            {upcoming.map((event) => (
              <Card key={event.id} className="bg-card border-border hover:border-amber/20 transition-all group">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Date block */}
                    <div className="flex-shrink-0 flex sm:flex-col items-center justify-center gap-2 sm:gap-0 bg-charcoal/50 sm:w-24 p-4 rounded-l-lg sm:rounded-l-lg sm:rounded-tr-none rounded-tr-lg border-b sm:border-b-0 sm:border-r border-border">
                      <div className="font-display text-2xl text-amber leading-none">
                        {new Date(event.date).toLocaleDateString("en-US", { day: "numeric" })}
                      </div>
                      <div className="text-xs text-steel/60 text-center">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </div>
                    </div>

                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <Badge
                              variant="outline"
                              className={`text-xs ${EVENT_TYPE_COLORS[event.type] || EVENT_TYPE_COLORS.Other}`}
                            >
                              {event.type}
                            </Badge>
                            {event.is_members_only && (
                              <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                                <Lock className="h-3 w-3 mr-1" />
                                Members Only
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-medium text-white group-hover:text-amber transition-colors mb-1">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.city}, {event.country}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {event.rsvp_count} RSVPs
                              {event.max_attendees && ` / ${event.max_attendees} spots`}
                            </span>
                          </div>
                        </div>
                        <Button asChild size="sm" variant="ghost" className="text-amber hover:text-amber-glow flex-shrink-0 hidden sm:flex">
                          <Link href="/join">
                            RSVP
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Past Events */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-3xl text-white tracking-wide mb-8">
            PAST <span className="text-amber">EVENTS</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-70">
            {past.map((event) => (
              <Card key={event.id} className="bg-card border-border">
                <CardContent className="p-5">
                  <Badge variant="outline" className={`text-xs mb-3 ${EVENT_TYPE_COLORS[event.type] || EVENT_TYPE_COLORS.Other}`}>
                    {event.type}
                  </Badge>
                  <h3 className="font-medium text-white text-sm mb-2">{event.title}</h3>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "long", day: "numeric", year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.city}, {event.country}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.rsvp_count} attended
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber/10 to-transparent border-t border-border">
        <div className="container text-center max-w-xl">
          <h2 className="font-display text-3xl text-white tracking-wide mb-4">
            DON&apos;T MISS THE <span className="text-amber">ACTION</span>
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Join the DOA to RSVP to events, receive event updates, and connect with other attendees before the show.
          </p>
          <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
            <Link href="/join">
              Join to Access Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
