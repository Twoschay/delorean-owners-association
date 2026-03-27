"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Bell } from "lucide-react";

const NOTIFICATION_GROUPS = [
  {
    title: "Email Notifications",
    items: [
      { id: "email-newsletter", label: "Monthly Newsletter (Stainless News)", defaultOn: true },
      { id: "email-events", label: "Event announcements and reminders", defaultOn: true },
      { id: "email-forum-replies", label: "Replies to your forum posts", defaultOn: true },
      { id: "email-classifieds", label: "New classifieds in watched categories", defaultOn: false },
      { id: "email-digest", label: "Weekly activity digest", defaultOn: false },
    ],
  },
  {
    title: "Forum Notifications",
    items: [
      { id: "forum-mentions", label: "When you're @mentioned in a thread", defaultOn: true },
      { id: "forum-replies", label: "Replies to your threads", defaultOn: true },
      { id: "forum-solutions", label: "Your post is marked as a solution", defaultOn: true },
    ],
  },
  {
    title: "Magazine & Content",
    items: [
      { id: "mag-new-issue", label: "New magazine issue available", defaultOn: true },
      { id: "mag-news", label: "Breaking DeLorean news", defaultOn: false },
    ],
  },
];

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    NOTIFICATION_GROUPS.forEach((group) => {
      group.items.forEach((item) => {
        defaults[item.id] = item.defaultOn;
      });
    });
    return defaults;
  });
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => {
    setPrefs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/account" className="hover:text-steel flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Account
        </Link>
        <span>/</span>
        <span className="text-white">Notifications</span>
      </div>

      <h1 className="font-display text-3xl text-white tracking-wide mb-6">
        NOTIFICATION <span className="text-amber">PREFERENCES</span>
      </h1>

      {saved && (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg mb-4">
          <Check className="h-4 w-4 text-green-400" />
          <p className="text-sm text-green-400">Preferences saved! (Demo mode)</p>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {NOTIFICATION_GROUPS.map((group) => (
          <Card key={group.title} className="bg-card border-border">
            <CardContent className="p-5">
              <h2 className="font-display text-base text-white tracking-wide mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber" />
                {group.title}
              </h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-steel/80">{item.label}</span>
                    <button
                      onClick={() => toggle(item.id)}
                      className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-all ${
                        prefs[item.id] ? "bg-amber" : "bg-muted"
                      }`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                        prefs[item.id] ? "left-5.5 left-[22px]" : "left-0.5"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
