"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, ImagePlus, DollarSign } from "lucide-react";

export default function NewListingPage() {
  const [form, setForm] = useState({ title: "", category: "", price: "", condition: "", location: "", description: "" });
  const [negotiable, setNegotiable] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-lg">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-amber/10 border-2 border-amber flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-amber" />
          </div>
          <h2 className="font-display text-2xl text-white tracking-wide mb-2">LISTING POSTED!</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Demo mode — your listing wasn&apos;t saved, but this is how it would work.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild variant="outline" className="border-border text-steel hover:text-white">
              <Link href="/classifieds">View Classifieds</Link>
            </Button>
            <Button onClick={() => { setSubmitted(false); setForm({ title: "", category: "", price: "", condition: "", location: "", description: "" }); }} className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
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
        <Link href="/classifieds" className="hover:text-steel transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Classifieds
        </Link>
        <span>/</span>
        <span className="text-white">New Listing</span>
      </div>

      <h1 className="font-display text-3xl text-white tracking-wide mb-6">
        CREATE <span className="text-amber">LISTING</span>
      </h1>

      <Badge className="mb-4 bg-amber/10 text-amber border-amber/30">
        Demo mode — listings are not saved
      </Badge>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Category *</label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })} required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {["Vehicles", "Parts", "Accessories", "Services", "Wanted"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Condition *</label>
                <Select value={form.condition} onValueChange={(v) => setForm({ ...form, condition: v })} required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {["New", "Excellent", "Like New", "Good", "Fair", "For Parts"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Title *</label>
              <Input
                placeholder="Be specific: year, make, model, part number..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="bg-background border-border"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Price ($) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    className="pl-8 bg-background border-border"
                  />
                </div>
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={negotiable}
                    onChange={(e) => setNegotiable(e.target.checked)}
                    className="rounded accent-amber"
                  />
                  <span className="text-xs text-muted-foreground">Price negotiable</span>
                </label>
              </div>
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Location *</label>
                <Input
                  placeholder="City, State / Country"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Description *</label>
              <Textarea
                placeholder="Describe the item in detail. Include condition, history, any defects. Markdown supported."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={6}
                className="bg-background border-border resize-none"
              />
            </div>

            {/* Photo upload area */}
            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Photos (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-amber/30 transition-colors cursor-pointer">
                <ImagePlus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Drag & drop photos or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Up to 10 photos · JPG, PNG, HEIC</p>
                <p className="text-xs text-amber/70 mt-2">Demo mode — uploads disabled</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button asChild variant="outline" className="border-border text-steel hover:text-white">
                <Link href="/classifieds">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={!form.title || !form.category || !form.condition || !form.price || !form.description}
                className="bg-amber hover:bg-amber-glow text-obsidian font-bold"
              >
                Post Listing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
