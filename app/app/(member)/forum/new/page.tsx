"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check } from "lucide-react";
import { FORUM_CATEGORIES } from "@/lib/mock-data/forum";

export default function NewThreadPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-2xl">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-amber/10 border-2 border-amber flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-amber" />
          </div>
          <h2 className="font-display text-2xl text-white tracking-wide mb-2">THREAD POSTED!</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Demo mode — your thread wasn&apos;t actually saved, but that&apos;s how it would work!
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild variant="outline" className="border-border text-steel hover:text-white">
              <Link href="/forum">Back to Forum</Link>
            </Button>
            <Button onClick={() => setSubmitted(false)} className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
              Post Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/forum" className="hover:text-steel transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Forum
        </Link>
        <span>/</span>
        <span className="text-white">New Thread</span>
      </div>

      <h1 className="font-display text-3xl text-white tracking-wide mb-6">
        NEW <span className="text-amber">THREAD</span>
      </h1>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Category</label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select a category..." />
                </SelectTrigger>
                <SelectContent>
                  {FORUM_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Thread Title</label>
              <Input
                placeholder="Give your thread a descriptive title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-background border-border"
              />
            </div>

            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Content</label>
              <Textarea
                placeholder="Write your post here. Markdown is supported."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={8}
                className="bg-background border-border resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">Demo mode — posts won&apos;t persist</p>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="border-border text-steel hover:text-white">
                  <Link href="/forum">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={!title.trim() || !body.trim() || !category}
                  className="bg-amber hover:bg-amber-glow text-obsidian font-bold"
                >
                  Post Thread
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
