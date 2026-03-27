"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Pin,
  Lock,
  Eye,
  MessageSquare,
  ThumbsUp,
  Share2,
  Clock,
  Check,
} from "lucide-react";
import {
  getThreadById,
  getRepliesByThread,
  getCategoryById,
} from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ category: string; threadId: string }>;
}

export default function ThreadPage({ params }: PageProps) {
  const { category: categoryId, threadId } = use(params);
  const thread = getThreadById(threadId);
  const category = getCategoryById(categoryId);
  const [replyText, setReplyText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!thread || !category) notFound();

  const replies = getRepliesByThread(threadId);

  const handleReply = () => {
    if (!replyText.trim()) return;
    setSubmitted(true);
    setReplyText("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground flex-wrap">
        <Link href="/forum" className="hover:text-steel transition-colors">Forum</Link>
        <span>/</span>
        <Link href={`/forum/${categoryId}`} className="hover:text-steel transition-colors">
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-white line-clamp-1">{thread.title}</span>
      </div>

      {/* Thread Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {thread.is_pinned && <Pin className="h-4 w-4 text-amber flex-shrink-0" />}
          {thread.is_locked && <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-white tracking-wide mb-3">
          {thread.title}
        </h1>
        <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {thread.view_count.toLocaleString()} views
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {thread.reply_count} replies
          </div>
          {thread.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[9px] border-border text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Original Post */}
      <Card className="bg-card border-border mb-4">
        <CardContent className="p-5">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-sm bg-amber/10 text-amber border border-amber/20">
                  {thread.author_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Link href={`/members`} className="text-sm font-medium text-white hover:text-amber transition-colors">
                  {thread.author_name}
                </Link>
                <Badge variant="outline" className="text-[10px] border-amber/30 text-amber h-4 px-1.5">
                  OP
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(thread.created_at).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </span>
              </div>
              <div className="text-sm text-steel/90 leading-relaxed whitespace-pre-wrap mb-4">
                {thread.body}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-amber h-7 gap-1.5 text-xs">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-steel h-7 gap-1.5 text-xs">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      {replies.length > 0 && (
        <>
          <h2 className="font-display text-sm text-steel tracking-widest mb-3">
            {replies.length} REPLIES
          </h2>
          <div className="space-y-3 mb-6">
            {replies.map((reply, index) => (
              <Card
                key={reply.id}
                className={`bg-card border-border ${reply.is_solution ? "border-green-500/30" : ""}`}
              >
                <CardContent className="p-5">
                  {reply.is_solution && (
                    <div className="flex items-center gap-1.5 text-xs text-green-400 mb-3">
                      <Check className="h-3.5 w-3.5" />
                      Marked as Solution
                    </div>
                  )}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-charcoal border border-border text-steel">
                          {reply.author_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Link href={`/members`} className="text-sm font-medium text-white hover:text-amber transition-colors">
                          {reply.author_name}
                        </Link>
                        <span className="text-xs text-muted-foreground">
                          #{index + 1}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(reply.created_at).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="text-sm text-steel/90 leading-relaxed mb-3">
                        {reply.body}
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-amber h-7 gap-1.5 text-xs">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        Like
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Reply composer */}
      {!thread.is_locked && (
        <div>
          <Separator className="bg-border mb-6" />
          <h2 className="font-display text-sm text-steel tracking-widest mb-3">POST A REPLY</h2>
          {submitted ? (
            <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <Check className="h-4 w-4 text-green-400" />
              <p className="text-sm text-green-400">
                Reply posted! (Demo mode — replies don&apos;t persist)
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <Textarea
                placeholder="Write your reply... (Markdown supported)"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                className="bg-background border-border resize-none"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Demo mode — replies won&apos;t be persisted
                </p>
                <Button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="bg-amber hover:bg-amber-glow text-obsidian font-bold"
                >
                  Post Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {thread.is_locked && (
        <div className="flex items-center gap-2 p-4 bg-muted/20 border border-border rounded-lg">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">This thread is locked and no longer accepting replies.</p>
        </div>
      )}
    </div>
  );
}
