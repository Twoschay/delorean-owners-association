"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, DollarSign, Shield, Clock } from "lucide-react";

export default function AppraisalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ vin: "", year: "", mileage: "", condition: "", reason: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl">
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/resources" className="hover:text-steel flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Resources
        </Link>
        <span>/</span>
        <span className="text-white">Vehicle Appraisal</span>
      </div>

      <h1 className="font-display text-3xl text-white tracking-wide mb-2">
        VEHICLE <span className="text-amber">APPRAISAL</span>
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Request a professional appraisal from a DOA-certified evaluator.
      </p>

      {/* Info cards */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {[
          { icon: DollarSign, title: "Fair Market Value", desc: "Know what your car is worth — for insurance, sale, or peace of mind" },
          { icon: Shield, title: "Certified Appraisers", desc: "All DOA appraisers are certified and carry professional liability" },
          { icon: Clock, title: "5 Business Days", desc: "Receive your written appraisal report within 5 business days" },
        ].map((item) => (
          <Card key={item.title} className="bg-card border-border">
            <CardContent className="p-4">
              <item.icon className="h-6 w-6 text-amber mb-2" />
              <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {submitted ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-amber/10 border-2 border-amber flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-amber" />
          </div>
          <h2 className="font-display text-2xl text-white tracking-wide mb-2">REQUEST SUBMITTED!</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Demo mode — A DOA appraiser would contact you within 5 business days.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="border-border text-steel hover:text-white">
            Submit Another
          </Button>
        </div>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <Badge className="mb-4 bg-amber/10 text-amber border-amber/30">Demo — not submitted</Badge>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">VIN *</label>
                  <Input
                    value={form.vin}
                    onChange={(e) => setForm({ ...form, vin: e.target.value })}
                    placeholder="SCEDT26T..."
                    required
                    className="bg-background border-border font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Year *</label>
                  <Select value={form.year} onValueChange={(v) => setForm({ ...form, year: v })}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1981", "1982", "1983"].map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Mileage *</label>
                  <Input
                    type="number"
                    value={form.mileage}
                    onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                    placeholder="42,500"
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Reason *</label>
                  <Select value={form.reason} onValueChange={(v) => setForm({ ...form, reason: v })}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {["Insurance", "Sale", "Purchase Decision", "Estate", "Curiosity"].map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Vehicle Description *</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your vehicle's condition, modifications, history, and anything relevant to the appraisal..."
                  required
                  rows={4}
                  className="bg-background border-border resize-none"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                * A DOA-certified appraiser will contact you within 5 business days. Standard fee: $150 for desktop appraisal, $350 for in-person inspection appraisal.
              </p>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!form.vin || !form.year || !form.mileage || !form.reason || !form.description}
                  className="bg-amber hover:bg-amber-glow text-obsidian font-bold"
                >
                  Submit Appraisal Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
