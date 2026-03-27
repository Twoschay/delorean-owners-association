"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Car, Plus, Eye, Edit, Zap } from "lucide-react";
import { getVehiclesByOwner, MOCK_VEHICLES } from "@/lib/mock-data/vehicles";
import { getMemberById } from "@/lib/mock-data/members";

export default function GaragePage() {
  const { user } = useAuth();
  const myVehicles = useMemo(() => user ? getVehiclesByOwner(user.id) : [], [user]);

  // Car of the month — pick a notable vehicle (EV or gold)
  const carOfMonth = useMemo(() => {
    return MOCK_VEHICLES.find((v) => v.engine.includes("Tesla")) || MOCK_VEHICLES[1];
  }, []);
  const carOfMonthOwner = carOfMonth ? getMemberById(carOfMonth.owner_id) : null;

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl text-white tracking-wide">
            MY <span className="text-amber">GARAGE</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {MOCK_VEHICLES.length} vehicles registered across the DOA community
          </p>
        </div>
        <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold flex-shrink-0">
          <Link href="/garage/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Link>
        </Button>
      </div>

      {/* My Vehicles */}
      <div className="mb-8">
        <h2 className="font-display text-xl text-white tracking-wide mb-4">YOUR VEHICLES</h2>

        {myVehicles.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
            <h3 className="font-display text-xl text-white tracking-wide mb-2">NO VEHICLES YET</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Register your DeLorean to create a digital profile and connect with owners of similar cars.
            </p>
            <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
              <Link href="/garage/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Your DeLorean
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {myVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="bg-card border-border hover:border-amber/20 transition-all overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Photo area */}
                    <div className="sm:w-64 h-36 sm:h-auto bg-gradient-to-br from-steel/10 to-charcoal flex items-center justify-center relative flex-shrink-0">
                      {/* Stainless steel visual */}
                      <div className="absolute inset-0 brushed-metal opacity-40" />
                      <div className="relative text-center">
                        <div className="font-display text-4xl text-white/20">{vehicle.year}</div>
                        <div className="font-display text-xs text-steel/40 tracking-widest">DMC-12</div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-display text-2xl text-white tracking-wide">
                            {vehicle.year} DELOREAN DMC-12
                          </h3>
                          <div className="font-mono text-xs text-muted-foreground mt-0.5">
                            VIN: {vehicle.vin.slice(0, 8)}•••{vehicle.vin.slice(-4)}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs border-amber/30 text-amber w-fit">
                          {vehicle.condition}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {[
                          { label: "Color", value: vehicle.color },
                          { label: "Engine", value: vehicle.engine.split(" ").slice(0, 3).join(" ") },
                          { label: "Trans.", value: vehicle.transmission.includes("manual") ? "5-Speed Manual" : "3-Speed Auto" },
                          { label: "Mileage", value: `${vehicle.mileage.toLocaleString()} mi` },
                        ].map((spec) => (
                          <div key={spec.label} className="bg-charcoal/40 rounded p-2">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{spec.label}</p>
                            <p className="text-xs text-white font-medium mt-0.5 line-clamp-1">{spec.value}</p>
                          </div>
                        ))}
                      </div>

                      {vehicle.modifications && (
                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                          <span className="text-steel mr-1">Mods:</span>
                          {vehicle.modifications}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold" size="sm">
                          <Link href={`/garage/${vehicle.id}`}>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            View Profile
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="border-border text-steel hover:text-white">
                          <Link href={`/garage/new?edit=${vehicle.id}`}>
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Separator className="bg-border mb-8" />

      {/* Car of the Month */}
      {carOfMonth && (
        <div>
          <h2 className="font-display text-xl text-white tracking-wide mb-4">
            CAR OF THE <span className="text-amber">MONTH</span>
          </h2>
          <Card className="bg-gradient-to-r from-amber/10 to-card border-amber/30">
            <CardContent className="p-0 overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-64 h-36 sm:h-auto bg-gradient-to-br from-amber/20 to-charcoal flex items-center justify-center flex-shrink-0 relative">
                  <div className="absolute inset-0 brushed-metal opacity-30" />
                  <div className="relative text-center">
                    <Zap className="h-10 w-10 text-amber/40 mx-auto mb-1" />
                    <div className="font-display text-xs text-amber/60 tracking-widest">EV</div>
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <Badge className="bg-amber text-obsidian text-xs font-bold mb-2">Community Pick</Badge>
                  <h3 className="font-display text-2xl text-white tracking-wide mb-1">
                    {carOfMonth.year} DMC-12 — EV Conversion
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Owned by{" "}
                    <Link href={`/members/${carOfMonth.owner_id}`} className="text-amber hover:text-amber-glow">
                      {carOfMonthOwner?.name || "Unknown"}
                    </Link>
                  </p>
                  <p className="text-sm text-steel/70 mb-4">{carOfMonth.description}</p>
                  <Button asChild className="bg-amber hover:bg-amber-glow text-obsidian font-bold" size="sm">
                    <Link href={`/garage/${carOfMonth.id}`}>View Full Profile</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
