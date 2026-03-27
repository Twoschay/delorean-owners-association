"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, List, MapPin, Users, Clock, ChevronLeft, ChevronRight, Plus, Zap } from "lucide-react";
import { MOCK_EVENTS } from "@/lib/mock-data/events";

const EVENT_TYPE_COLORS: Record<string, string> = {
  "Annual Expo": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Chapter Meet": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Car Show": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Tech Workshop": "bg-green-500/20 text-green-300 border-green-500/30",
  "Webinar": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Other": "bg-gray-500/20 text-gray-300 border-gray-500/30",
};

const EVENT_GRADIENTS: Record<string, string> = {
  "expo-gradient": "from-amber-900 via-amber-700 to-yellow-600",
  "newport-gradient": "from-blue-900 via-blue-700 to-cyan-600",
  "uk-gradient": "from-blue-900 via-indigo-700 to-blue-600",
  "webinar-gradient": "from-cyan-900 via-cyan-700 to-blue-600",
  "pebble-gradient": "from-green-900 via-green-700 to-teal-600",
  "workshop-gradient": "from-slate-900 via-slate-700 to-gray-600",
  "pch-gradient": "from-orange-900 via-orange-700 to-amber-500",
  "charleston-gradient": "from-teal-900 via-teal-700 to-green-600",
  "history-gradient": "from-gray-900 via-gray-700 to-slate-600",
  "phoenix-gradient": "from-orange-800 via-red-700 to-amber-600",
  "chicago-gradient": "from-blue-900 via-blue-800 to-indigo-700",
  "meeting-gradient": "from-slate-800 via-slate-700 to-gray-600",
};

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function EventCard({ event }: { event: typeof MOCK_EVENTS[0] }) {
  const [rsvped, setRsvped] = useState(false);
  const gradient = EVENT_GRADIENTS[event.image_placeholder] || "from-slate-800 via-slate-700 to-gray-600";

  return (
    <Card className="bg-gray-900 border-gray-700 hover:border-amber-500/40 transition-all duration-200 overflow-hidden group">
      <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-end p-4`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <Badge className={`text-xs mb-2 ${EVENT_TYPE_COLORS[event.type] || ""}`}>{event.type}</Badge>
          <div className="flex items-center gap-1.5 text-white/80 text-xs">
            <Clock className="w-3 h-3" />
            {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>
        {event.is_members_only && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-black/50 text-amber-300 text-xs border border-amber-500/30">Members Only</Badge>
          </div>
        )}
        {event.is_past && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge className="bg-black/70 text-gray-400 border-gray-600">Past Event</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Link href={`/events/${event.id}`}>
          <h3 className="text-white font-semibold text-base mb-2 group-hover:text-amber-300 transition-colors line-clamp-2 cursor-pointer">
            {event.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
          <MapPin className="w-3 h-3" />
          <span>{event.city === "Online" ? "Online Event" : `${event.city}${event.state ? `, ${event.state}` : ""}`}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4">
          <Users className="w-3 h-3" />
          <span>{event.rsvp_count} going{event.max_attendees ? ` of ${event.max_attendees}` : ""}</span>
        </div>
        {!event.is_past && (
          <Button
            size="sm"
            onClick={() => setRsvped(!rsvped)}
            className={rsvped
              ? "w-full bg-green-600 hover:bg-green-700 text-white"
              : "w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold"
            }
          >
            {rsvped ? "Going ✓" : "RSVP"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function MiniCalendar({ events, currentDate, onDateChange }: {
  events: typeof MOCK_EVENTS;
  currentDate: Date;
  onDateChange: (d: Date) => void;
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const eventDays = new Set(
    events
      .filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map(e => new Date(e.date).getDate())
  );

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => onDateChange(new Date(year, month - 1, 1))} className="p-1 hover:text-amber-400 text-gray-400 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-white font-semibold">{MONTH_NAMES[month]} {year}</span>
        <button onClick={() => onDateChange(new Date(year, month + 1, 1))} className="p-1 hover:text-amber-400 text-gray-400 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-xs text-gray-500 font-medium py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
          const hasEvent = eventDays.has(day);
          const isSelected = selectedDay === day;
          return (
            <button
              key={i}
              onClick={() => setSelectedDay(day === selectedDay ? null : day)}
              className={`relative flex flex-col items-center justify-center rounded-lg p-1.5 text-xs transition-colors
                ${isSelected ? "bg-amber-500 text-black font-bold" : isToday ? "bg-amber-500/20 text-amber-300 font-bold" : "text-gray-400 hover:bg-gray-800"}
              `}
            >
              {day}
              {hasEvent && (
                <div className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? "bg-black" : "bg-amber-400"}`} />
              )}
            </button>
          );
        })}
      </div>
      {selectedDay && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="text-xs text-gray-500 mb-2">{MONTH_NAMES[month]} {selectedDay}</div>
          {events
            .filter(e => {
              const d = new Date(e.date);
              return d.getFullYear() === year && d.getMonth() === month && d.getDate() === selectedDay;
            })
            .map(e => (
              <Link key={e.id} href={`/events/${e.id}`}>
                <div className="p-2 rounded-lg bg-gray-800 hover:bg-gray-750 text-xs text-gray-300 hover:text-amber-300 transition-colors mb-1 cursor-pointer">
                  {e.title}
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [filterType, setFilterType] = useState<string>("all");

  const upcomingEvents = useMemo(() => {
    let evs = MOCK_EVENTS.filter(e => !e.is_past);
    if (filterType !== "all") evs = evs.filter(e => e.type === filterType);
    return evs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filterType]);

  const pastEvents = useMemo(() => {
    let evs = MOCK_EVENTS.filter(e => e.is_past);
    if (filterType !== "all") evs = evs.filter(e => e.type === filterType);
    return evs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filterType]);

  const eventTypes = Array.from(new Set(MOCK_EVENTS.map(e => e.type)));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Events & Gatherings</h1>
          <p className="text-gray-400">Meets, expos, workshops, and chapter events worldwide.</p>
        </div>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-500">
          <Plus className="w-4 h-4 mr-2" />
          Suggest an Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
        <Tabs value={view} onValueChange={(v) => setView(v as "list" | "calendar")}>
          <TabsList className="bg-gray-900 border border-gray-700">
            <TabsTrigger value="list" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-gray-400">
              <List className="w-4 h-4 mr-1.5" />List
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-gray-400">
              <Calendar className="w-4 h-4 mr-1.5" />Calendar
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilterType("all")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterType === "all" ? "bg-amber-500 text-black" : "bg-gray-800 text-gray-400 hover:text-white"}`}>All</button>
          {eventTypes.map(type => (
            <button key={type} onClick={() => setFilterType(type)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterType === type ? "bg-amber-500 text-black" : "bg-gray-800 text-gray-400 hover:text-white"}`}>{type}</button>
          ))}
        </div>
      </div>

      {view === "calendar" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div><MiniCalendar events={MOCK_EVENTS} currentDate={calendarDate} onDateChange={setCalendarDate} /></div>
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-amber-400 mb-4 uppercase tracking-wider">{MONTH_NAMES[calendarDate.getMonth()]} {calendarDate.getFullYear()}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_EVENTS.filter(e => { const d = new Date(e.date); return d.getFullYear() === calendarDate.getFullYear() && d.getMonth() === calendarDate.getMonth(); }).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {upcomingEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-400" />
                <h2 className="text-lg font-semibold text-amber-400 uppercase tracking-wider">Upcoming Events</h2>
                <span className="text-gray-600 text-sm">({upcomingEvents.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            </div>
          )}
          {pastEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wider">Past Events</h2>
                <span className="text-gray-600 text-sm">({pastEvents.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastEvents.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
