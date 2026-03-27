"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ArrowLeft, Share2, Edit, Calendar, Wrench, CheckCircle2, Image as ImageIcon,
} from "lucide-react";
import { getVehicleById } from "@/lib/mock-data/vehicles";
import { getMemberById } from "@/lib/mock-data/members";

interface PageProps {
  params: Promise<{ vehicleId: string }>;
}

const MAINTENANCE_LOG = [
  { date: "2026-01-15", service: "Oil and filter change", notes: "Castrol 10W-40, Fram filter" },
  { date: "2025-11-08", service: "Door strut replacement", notes: "Both doors, SunStar hydraulic upgrade" },
  { date: "2025-08-20", service: "Annual inspection and tune-up", notes: "Plugs, wires, timing, brake check" },
  { date: "2025-03-02", service: "Fuel injector cleaning", notes: "Sent to RC Engineering, all 6 units" },
];

export default function VehicleDetailPage({ params }: PageProps) {
  const { vehicleId } = use(params);
  const vehicle = getVehicleById(vehicleId);
  
  const [copied, setCopied] = useState(false);

  if (!vehicle) notFound();

  const owner = getMemberById(vehicle.owner_id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const specs = [
    { label: "VIN", value: vehicle.vin, mono: true },
    { label: "Year", value: vehicle.year.toString() },
    { label: "Color", value: vehicle.color },
    { label: "Engine", value: vehicle.engine },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Mileage", value: `${vehicle.mileage.toLocaleString()} miles` },
    { label: "Condition", value: vehicle.condition },
    { label: "Added", value: new Date(vehicle.added_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/garage" className="hover:text-steel transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          My Garage
        </Link>
        <span>/</span>
        <span className="text-white">{vehicle.year} DMC-12</span>
      </div>

      {/* Hero */}
      <div className="rounded-xl overflow-hidden border border-border/50 mb-6 relative">
        <div className="h-64 sm:h-80 bg-gradient-to-br from-steel/15 to-obsidian relative flex items-center justify-center">
          <div className="absolute inset-0 brushed-metal opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
          <div className="relative text-center">
            <div className="font-display text-[80px] sm:text-[120px] text-white/5 leading-none">{vehicle.year}</div>
          </div>
          <div className="absolute bottom-6 left-6">
            <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
              {vehicle.year} DELOREAN DMC-12
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="border-amber/30 text-amber">{vehicle.condition}</Badge>
              <Badge variant="outline" className="border-steel/30 text-steel">{vehicle.color}</Badge>
              {vehicle.engine.includes("EV") || vehicle.engine.includes("Tesla") || vehicle.engine.includes("Bolt") ? (
                <Badge className="bg-green-600/20 text-green-400 border-green-400/30">EV Conversion</Badge>
              ) : null}
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button onClick={handleShare} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 text-xs h-8">
              <Share2 className="h-3.5 w-3.5 mr-1" />
              {copied ? "Copied!" : "Share"}
            </Button>
            <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 text-xs h-8">
              <Link href="/garage/new">
                <Edit className="h-3.5 w-3.5 mr-1" />
                Edit
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Specs */}
          <div>
            <h2 className="font-display text-xl text-white tracking-wide mb-3">SPECIFICATIONS</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-start gap-3 p-3 bg-charcoal/30 rounded border border-border/30">
                  <div className="min-w-[80px]">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{spec.label}</p>
                  </div>
                  <p className={`text-sm text-white font-medium ${spec.mono ? "font-mono text-xs break-all" : ""}`}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {vehicle.description && (
            <div>
              <h2 className="font-display text-xl text-white tracking-wide mb-3">ABOUT THIS CAR</h2>
              <p className="text-sm text-steel/80 leading-relaxed bg-charcoal/20 rounded-lg p-4 border border-border/30">
                {vehicle.description}
              </p>
            </div>
          )}

          {/* Modifications */}
          <div>
            <h2 className="font-display text-xl text-white tracking-wide mb-3">MODIFICATIONS</h2>
            {vehicle.modifications ? (
              <div className="text-sm text-steel/80 leading-relaxed bg-charcoal/20 rounded-lg p-4 border border-border/30">
                {vehicle.modifications}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground p-4 bg-charcoal/20 rounded-lg border border-border/30">
                <CheckCircle2 className="h-4 w-4 text-amber" />
                Stock — as John DeLorean intended
              </div>
            )}
          </div>

          {/* Photo Gallery */}
          <div>
            <h2 className="font-display text-xl text-white tracking-wide mb-3">PHOTO GALLERY</h2>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <div className="aspect-video rounded cursor-pointer bg-gradient-to-br from-steel/10 to-charcoal border border-border/50 hover:border-amber/30 transition-all flex items-center justify-center group relative overflow-hidden">
                      <div className="absolute inset-0 brushed-metal opacity-30" />
                      <ImageIcon className="h-6 w-6 text-muted-foreground/50 group-hover:text-amber/50 transition-colors relative" />
                      <div className="absolute bottom-1 right-1 text-[9px] text-muted-foreground/50">
                        Photo {i + 1}
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-charcoal border-border max-w-2xl">
                    <div className="aspect-video bg-gradient-to-br from-steel/10 to-obsidian rounded flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Photo {i + 1} of 3</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          In production, high-res vehicle photos would display here
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>

          {/* Maintenance Log */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl text-white tracking-wide">MAINTENANCE LOG</h2>
              <Button variant="outline" size="sm" className="border-border text-steel hover:text-white text-xs h-7">
                <Wrench className="h-3.5 w-3.5 mr-1" />
                Add Entry
              </Button>
            </div>
            <div className="space-y-2">
              {MAINTENANCE_LOG.map((entry) => (
                <div key={entry.date} className="flex items-start gap-3 p-3 bg-charcoal/20 rounded border border-border/30">
                  <div className="flex-shrink-0 text-center w-12">
                    <Calendar className="h-4 w-4 text-amber mx-auto mb-0.5" />
                    <p className="text-[9px] text-muted-foreground leading-none">
                      {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{entry.service}</p>
                    <p className="text-xs text-muted-foreground">{entry.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Owner */}
          {owner && (
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <h3 className="font-display text-xs text-steel tracking-widest mb-3">OWNER</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-amber">
                      {owner.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-white">{owner.name}</p>
                    <p className="text-xs text-muted-foreground">{owner.city}, {owner.country}</p>
                  </div>
                </div>
                <Button asChild size="sm" variant="outline" className="w-full border-border text-steel hover:text-white text-xs h-7">
                  <Link href={`/members/${owner.id}`}>View Member Profile</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Vehicle stats */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <h3 className="font-display text-xs text-steel tracking-widest mb-3">VEHICLE STATS</h3>
              <div className="space-y-2">
                {[
                  { label: "Production Year", value: vehicle.year.toString() },
                  { label: "Years Since Prod.", value: `${2026 - vehicle.year}` },
                  { label: "Condition", value: vehicle.condition },
                  { label: "Odometer", value: `${vehicle.mileage.toLocaleString()} mi` },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
