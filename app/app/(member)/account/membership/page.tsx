"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ArrowLeft, Star, Check, RefreshCw } from "lucide-react";

const PAYMENT_HISTORY = [
  { date: "2026-03-15", description: "National Membership — 2026 Renewal", amount: 50, status: "Paid" },
  { date: "2025-03-15", description: "National Membership — 2025 Renewal", amount: 50, status: "Paid" },
  { date: "2024-03-15", description: "National Membership — 2024 (Join)", amount: 50, status: "Paid" },
];

export default function MembershipPage() {
  const { user } = useAuth();

  const renewalDate = "March 15, 2027";
  const memberNumber = "DOA-" + user?.id.replace("member-", "").padStart(5, "0");
  const joinYear = user?.join_date ? new Date(user.join_date).getFullYear() : 2024;

  const MEMBERSHIP_LABEL = {
    national: "National",
    international: "International",
    lifetime: "Lifetime",
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl">
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/account" className="hover:text-steel flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Account
        </Link>
        <span>/</span>
        <span className="text-white">Membership Status</span>
      </div>

      <h1 className="font-display text-3xl text-white tracking-wide mb-6">
        MEMBERSHIP <span className="text-amber">STATUS</span>
      </h1>

      {/* Physical Membership Card */}
      <div className="mb-8 max-w-md">
        <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 40%, #1a1a1a 100%)" }}>
          {/* Metal texture */}
          <div className="absolute inset-0 brushed-metal opacity-40" />
          {/* Gold border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-amber/40" />
          {/* Content */}
          <div className="relative h-full p-6 flex flex-col justify-between">
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-xs text-amber tracking-widest mb-0.5">DELOREAN</div>
                <div className="font-display text-lg text-white tracking-widest leading-none">OWNERS ASSOCIATION</div>
              </div>
              <div className="w-10 h-10 rounded bg-amber/10 border border-amber/30 flex items-center justify-center">
                <span className="font-display text-amber text-sm">DMC</span>
              </div>
            </div>
            {/* Member name */}
            <div>
              <div className="font-display text-3xl text-white tracking-wide mb-1">{user?.name?.toUpperCase()}</div>
              <div className="font-mono text-xs text-steel/60">{memberNumber}</div>
            </div>
            {/* Bottom */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">MEMBER SINCE</div>
                <div className="font-display text-lg text-amber">{joinYear}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">MEMBERSHIP</div>
                <Badge className="bg-amber text-obsidian text-xs font-bold">
                  {MEMBERSHIP_LABEL[user?.membership_type || "national"]} ✓
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">STATUS</div>
                <Badge className="bg-green-600/30 text-green-400 border-green-400/30 text-xs">
                  <Check className="h-3 w-3 mr-1" />
                  ACTIVE
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Renewal info */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Next Renewal</p>
              <p className="text-lg font-medium text-white">{renewalDate}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Auto-renews · $50/year National</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
                <RefreshCw className="h-4 w-4 mr-2" />
                Renew Now
              </Button>
              {user?.membership_type !== "lifetime" && (
                <Button variant="outline" className="border-border text-steel hover:text-white">
                  <Star className="h-4 w-4 mr-2" />
                  Upgrade to Lifetime
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment history */}
      <div>
        <h2 className="font-display text-xl text-white tracking-wide mb-4">PAYMENT HISTORY</h2>
        <div className="rounded-lg overflow-hidden border border-border">
          <div className="grid grid-cols-4 bg-charcoal/50 px-4 py-2 text-[10px] text-muted-foreground uppercase tracking-wider">
            <span>Date</span>
            <span className="col-span-2">Description</span>
            <span className="text-right">Amount</span>
          </div>
          {PAYMENT_HISTORY.map((entry, i) => (
            <div key={i} className="grid grid-cols-4 px-4 py-3 border-t border-border/50 hover:bg-charcoal/20 transition-colors">
              <span className="text-xs text-muted-foreground">
                {new Date(entry.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
              <span className="text-xs text-white col-span-2">{entry.description}</span>
              <div className="text-right">
                <span className="text-xs text-amber font-medium">${entry.amount}</span>
                <Badge className="ml-1.5 bg-green-600/20 text-green-400 border-0 text-[9px] px-1.5 py-0">
                  {entry.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
