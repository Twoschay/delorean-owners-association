"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Wrench,
  DollarSign,
  Calendar,
  Zap,
  PaintBucket,
  MapPin,
  Coffee,
  PenSquare,
  Search,
  Pin,
} from "lucide-react";
import { FORUM_CATEGORIES, FORUM_THREADS } from "@/lib/mock-data/forum";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Wrench,
  DollarSign,
  Calendar,
  Zap,
  PaintBucket,
  MapPin,
  Coffee,
};

export default function ForumPage() {
  const [search, setSearch] = useState("");

  const pinnedThreads = FORUM_THREADS.filter((t) => t.is_pinned);
  const filteredCategories = FORUM_CATEGORIES.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl text-white tracking-wide">
            COMMUNITY <span className="text-amber">FORUM</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {FORUM_CATEGORIES.reduce((a, c) => a + c.thread_count, 0).toLocaleString()} threads ·{" "}
            {FORUM_CATEGORIES.reduce((a, c) => a + c.post_count, 0).toLocaleString()} posts
          </p>
        </div>
        <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold flex-shrink-0">
          <Link href="/forum/new">
            <PenSquare className="h-4 w-4 mr-2" />
            New Thread
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search forums..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-background border-border"
        />
      </div>

      {/* Pinned Threads */}
      {!search && pinnedThreads.length > 0 && (
        <div className="mb-6">
          <h2 className="font-display text-sm text-steel tracking-widest mb-3 flex items-center gap-2">
            <Pin className="h-3.5 w-3.5 text-amber" />
            PINNED THREADS
          </h2>
          <div className="space-y-2">
            {pinnedThreads.slice(0, 3).map((thread) => {
              const category = FORUM_CATEGORIES.find((c) => c.id === thread.category_id);
              return (
                <Link key={thread.id} href={`/forum/${thread.category_id}/${thread.id}`}>
                  <Card className="bg-card border-border hover:border-amber/30 transition-all group">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Pin className="h-3.5 w-3.5 text-amber flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white group-hover:text-amber transition-colors line-clamp-1">
                            {thread.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                            <span>{thread.author_name}</span>
                            <span>·</span>
                            <span>{category?.name}</span>
                            <span>·</span>
                            <span>{thread.reply_count} replies</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          <Separator className="bg-border mt-6" />
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 gap-3">
        {filteredCategories.map((category) => {
          const IconComp = CATEGORY_ICONS[category.icon] || MessageSquare;
          const lastPost = new Date(category.last_post_date);
          const isRecent = Date.now() - lastPost.getTime() < 24 * 60 * 60 * 1000;

          return (
            <Link key={category.id} href={`/forum/${category.id}`}>
              <Card className="bg-card border-border hover:border-amber/30 transition-all group h-full">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber/20 transition-colors">
                      <IconComp className="h-5 w-5 text-amber" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white group-hover:text-amber transition-colors">
                          {category.name}
                        </h3>
                        {isRecent && (
                          <Badge className="text-[9px] bg-amber/10 text-amber border-amber/30 h-4 px-1">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>
                          <span className="text-steel font-medium">{category.thread_count.toLocaleString()}</span> threads
                        </span>
                        <span>·</span>
                        <span>
                          <span className="text-steel font-medium">{category.post_count.toLocaleString()}</span> posts
                        </span>
                        <span>·</span>
                        <span>
                          {lastPost.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="h-8 w-8 mx-auto mb-3 opacity-30" />
          <p>No categories match your search.</p>
        </div>
      )}
    </div>
  );
}
