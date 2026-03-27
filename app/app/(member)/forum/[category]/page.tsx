"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  ArrowLeft,
  Pin,
  Eye,
  MessageSquare,
  Lock,
  PenSquare,
  Clock,
} from "lucide-react";
import {
  getThreadsByCategory,
  getCategoryById,
} from "@/lib/mock-data/forum";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { category: categoryId } = use(params);
  const category = getCategoryById(categoryId);

  if (!category) notFound();

  const threads = getThreadsByCategory(categoryId).sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return (
    <div className="p-4 sm:p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/forum" className="hover:text-steel transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Forum
        </Link>
        <span>/</span>
        <span className="text-white">{category.name}</span>
      </div>

      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-border">
        <div>
          <h1 className="font-display text-3xl text-white tracking-wide">
            {category.name.toUpperCase()}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span><span className="text-steel">{category.thread_count}</span> threads</span>
            <span>·</span>
            <span><span className="text-steel">{category.post_count}</span> posts</span>
          </div>
        </div>
        <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold flex-shrink-0">
          <Link href="/forum/new">
            <PenSquare className="h-4 w-4 mr-2" />
            New Thread
          </Link>
        </Button>
      </div>

      {/* Threads */}
      {threads.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="h-8 w-8 mx-auto mb-3 opacity-30" />
          <p>No threads yet. Be the first to post!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {threads.map((thread) => (
            <Link key={thread.id} href={`/forum/${categoryId}/${thread.id}`}>
              <Card className={`bg-card border-border hover:border-amber/30 transition-all group ${thread.is_pinned ? "border-amber/20" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Avatar className="h-9 w-9 flex-shrink-0 hidden sm:flex">
                      <AvatarFallback className="text-xs bg-charcoal border border-border text-steel">
                        {thread.author_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Thread info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1 flex-wrap">
                        {thread.is_pinned && (
                          <Pin className="h-3.5 w-3.5 text-amber flex-shrink-0 mt-0.5" />
                        )}
                        {thread.is_locked && (
                          <Lock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <h3 className="text-sm font-medium text-white group-hover:text-amber transition-colors line-clamp-1 flex-1">
                          {thread.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span className="text-steel/70">{thread.author_name}</span>
                        <span>·</span>
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(thread.created_at).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric"
                          })}
                        </span>
                      </div>
                      {thread.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {thread.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[9px] border-border text-muted-foreground h-4 px-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex-shrink-0 text-right hidden sm:block">
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare className="h-3 w-3" />
                          {thread.reply_count}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          {thread.view_count.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {new Date(thread.updated_at).toLocaleDateString("en-US", {
                            month: "short", day: "numeric"
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
