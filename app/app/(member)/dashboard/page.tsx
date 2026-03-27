import { Metadata } from "next";
import { Car, MessageSquare, Calendar, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-white tracking-wide">
          WELCOME BACK, <span className="text-amber">JAMES</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Member since March 2024 · National Membership
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Your Vehicles", value: "1", icon: Car, color: "amber" },
          { label: "Forum Posts", value: "12", icon: MessageSquare, color: "steel" },
          { label: "Events RSVP", value: "3", icon: Calendar, color: "amber" },
          { label: "Member Since", value: "2024", icon: Star, color: "steel" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                <stat.icon
                  className={`h-4 w-4 ${stat.color === "amber" ? "text-amber" : "text-steel"}`}
                />
              </div>
              <div className="font-display text-2xl text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder content */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg text-white tracking-wide">
              RECENT FORUM ACTIVITY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Phase 3 will populate this with live forum threads.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg text-white tracking-wide">
              UPCOMING EVENTS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Phase 4 will populate this with upcoming events.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Badge className="bg-amber/10 text-amber border-amber/30">
          Phase 1 complete — full dashboard in Phase 3
        </Badge>
      </div>
    </div>
  );
}
