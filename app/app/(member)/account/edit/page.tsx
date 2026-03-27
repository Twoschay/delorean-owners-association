"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Check, AlertTriangle, Camera } from "lucide-react";

const CHAPTERS = ["Northeast", "Southeast", "Midwest", "Southwest", "Pacific", "UK", "Europe", "Australia"];

export default function EditProfilePage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [mapVisible, setMapVisible] = useState(user?.show_on_map ?? false);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [, setPendingMapToggle] = useState(false);
  

  const initials = user?.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";

  const handleMapToggle = () => {
    if (!mapVisible) {
      // Turning ON — need confirmation
      setPendingMapToggle(true);
      setMapDialogOpen(true);
    } else {
      // Turning OFF — immediate
      setMapVisible(false);
    }
  };

  const confirmMapEnable = () => {
    setMapVisible(true);
    setMapDialogOpen(false);
    setPendingMapToggle(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/account" className="hover:text-steel flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Account
        </Link>
        <span>/</span>
        <span className="text-white">Edit Profile</span>
      </div>

      <h1 className="font-display text-3xl text-white tracking-wide mb-6">
        EDIT <span className="text-amber">PROFILE</span>
      </h1>

      {saved && (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg mb-4">
          <Check className="h-4 w-4 text-green-400" />
          <p className="text-sm text-green-400">Profile saved! (Demo mode — changes not persisted)</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl bg-amber/20 text-amber border border-amber/30">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <Button type="button" variant="outline" size="sm" className="border-border text-steel hover:text-white">
              <Camera className="h-3.5 w-3.5 mr-1.5" />
              Change Photo
            </Button>
            <p className="text-xs text-muted-foreground mt-1">Demo mode — photo upload disabled</p>
          </div>
        </div>

        {/* Personal info */}
        <Card className="bg-card border-border">
          <CardContent className="p-5 space-y-4">
            <h2 className="font-display text-lg text-white tracking-wide">PERSONAL INFORMATION</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">First Name</label>
                <Input defaultValue={user?.name.split(" ")[0] || ""} className="bg-background border-border" />
              </div>
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Last Name</label>
                <Input defaultValue={user?.name.split(" ").slice(1).join(" ") || ""} className="bg-background border-border" />
              </div>
            </div>
            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Email</label>
              <Input type="email" defaultValue={user?.email || ""} className="bg-background border-border" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">City</label>
                <Input defaultValue={user?.city || ""} className="bg-background border-border" />
              </div>
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">State / Region</label>
                <Input defaultValue={user?.state || ""} className="bg-background border-border" />
              </div>
              <div>
                <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Country</label>
                <Input defaultValue={user?.country || ""} className="bg-background border-border" />
              </div>
            </div>
            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Profession</label>
              <Input defaultValue={user?.profession || ""} className="bg-background border-border" />
            </div>
            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Bio</label>
              <Textarea
                defaultValue={user?.bio || ""}
                rows={3}
                className="bg-background border-border resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-steel uppercase tracking-wider mb-1.5 block">Chapter</label>
              <Select defaultValue={user?.chapter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CHAPTERS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* ⭐ Map Visibility Toggle — KEY FEATURE */}
        <Card className="bg-card border-border" id="map">
          <CardContent className="p-5">
            <h2 className="font-display text-lg text-white tracking-wide mb-1">MAP VISIBILITY</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Control whether you appear on the global member map visible to other DOA members.
            </p>

            <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-charcoal/20">
              {/* Toggle */}
              <button
                type="button"
                onClick={handleMapToggle}
                className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-all duration-200 ${
                  mapVisible ? "bg-amber" : "bg-muted"
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                  mapVisible ? "left-7" : "left-1"
                }`} />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-amber" />
                  <p className="text-sm font-medium text-white">Show me on the Global Member Map</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  When enabled, your approximate location (city level) will be visible to other members on the interactive map. Your exact address is never shared.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {mapVisible ? (
                    <Badge className="bg-green-600/20 text-green-400 border-green-400/30 text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      Visible on map
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                      Hidden from map
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button asChild variant="outline" className="border-border text-steel hover:text-white">
            <Link href="/account">Cancel</Link>
          </Button>
          <Button type="submit" className="bg-amber hover:bg-amber-glow text-obsidian font-bold">
            Save Changes
          </Button>
        </div>
      </form>

      {/* Map confirmation dialog */}
      <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
        <DialogContent className="bg-charcoal border-border sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber" />
              <DialogTitle className="font-display text-xl text-white tracking-wide">ENABLE MAP VISIBILITY?</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              By enabling this, your city and country will be visible to other verified DOA members on the global member map. Your exact address is never shared. You can disable this at any time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => { setMapDialogOpen(false); setPendingMapToggle(false); }}
              className="border-border text-steel hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmMapEnable}
              className="bg-amber hover:bg-amber-glow text-obsidian font-bold"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Yes, show me on the map
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
