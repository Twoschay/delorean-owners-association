"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, ImagePlus } from "lucide-react";

export default function NewVehiclePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    vin: "", year: "", color: "", engine: "", transmission: "", mileage: "", modifications: "", history: "",
  });

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
          <h2 className="font-display text-2xl text-white tracking-wide mb-2">VEHICLE ADDED!</h2>
          <p className="text-muted-foreground text-sm mb-6">Demo mode — vehicle was not saved.</p>
          <div className="flex justify-center gap-3">
            <Button asChild variant="outline" className="border-border text-steel hover:text-white">
              <Link href="/garage">Back to Garage</Link>
            </Button>
            <Button onClick={() => setSubmitted(false)} className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
              Add Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/garage" className="hover:text-steel transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          My Garage
        </Link>
        <span>/</span>
        <span className="text-white">Add Vehicle</span>
      </div>

      <h1 className="font-display text-3xl text-white tracking-wide mb-2">
        ADD YOUR <span className="text-amber">DELOREAN</span>
      </h1>
      <Badge className="mb-6 bg-amber/10 text-amber border-amber/30">Demo — not saved</Badge>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">VIN *</label>
              <Input
                placeholder="SCEDT26T_B_######"
                value={form.vin}
                onChange={(e) => setForm({ ...form, vin: e.target.value })}
                className="bg-background border-border font-mono"
                required
              />
              <p className="text-[10px] text-muted-foreground mt-1">Format: SCEDT26T, year code (B=1981, C=1982, D=1983), check digit, 6-digit serial</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Year *</label>
                <Select value={form.year} onValueChange={(v) => setForm({ ...form, year: v })} required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1981">1981</SelectItem>
                    <SelectItem value="1982">1982</SelectItem>
                    <SelectItem value="1983">1983</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Color *</label>
                <Select value={form.color} onValueChange={(v) => setForm({ ...form, color: v })} required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Stainless Steel", "Black", "Gold", "Blue", "Other"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Trans. *</label>
                <Select value={form.transmission} onValueChange={(v) => setForm({ ...form, transmission: v })} required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Trans." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-speed manual">5-Speed Manual</SelectItem>
                    <SelectItem value="3-speed automatic">3-Speed Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Engine *</label>
                <Select value={form.engine} onValueChange={(v) => setForm({ ...form, engine: v })} required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Engine" />
                  </SelectTrigger>
                  <SelectContent>
                    {["PRV V6 2.85L (Stock)", "PRV V6 Turbocharged", "PRV V6 Supercharged", "Chevy LS V8 Swap", "EV Conversion (Tesla)", "EV Conversion (Bolt)", "Other"].map((e) => (
                      <SelectItem key={e} value={e}>{e}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Mileage *</label>
                <Input
                  type="number"
                  placeholder="42,500"
                  min="0"
                  value={form.mileage}
                  onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                  required
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Modifications</label>
              <Textarea
                placeholder="List any modifications from factory spec. Leave blank if stock."
                value={form.modifications}
                onChange={(e) => setForm({ ...form, modifications: e.target.value })}
                rows={3}
                className="bg-background border-border resize-none"
              />
            </div>

            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Vehicle History</label>
              <Textarea
                placeholder="How you acquired it, ownership history, notable history..."
                value={form.history}
                onChange={(e) => setForm({ ...form, history: e.target.value })}
                rows={3}
                className="bg-background border-border resize-none"
              />
            </div>

            {/* Photo upload */}
            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Photos</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-amber/30 transition-colors cursor-pointer">
                <ImagePlus className="h-7 w-7 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Upload photos of your DeLorean</p>
                <p className="text-xs text-amber/60 mt-1">Demo mode — uploads disabled</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button asChild variant="outline" className="border-border text-steel hover:text-white">
                <Link href="/garage">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={!form.vin || !form.year || !form.color || !form.transmission || !form.engine || !form.mileage}
                className="bg-amber hover:bg-amber-glow text-obsidian font-bold"
              >
                Save Vehicle
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
