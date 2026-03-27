"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Tag,
  Car,
  Package,
  Wrench,
  Settings,
  HelpCircle,
  Mail,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { getClassifiedById, MOCK_CLASSIFIEDS } from "@/lib/mock-data/classifieds";
import { getMemberById } from "@/lib/mock-data/members";

interface PageProps {
  params: Promise<{ id: string }>;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Vehicles: Car, Parts: Wrench, Accessories: Package, Services: Settings, Wanted: HelpCircle,
};

const GRADIENT_PALETTES = [
  "from-amber/20 to-charcoal",
  "from-steel/15 to-charcoal",
  "from-blue-900/25 to-charcoal",
  "from-zinc-600/20 to-charcoal",
];

export default function ClassifiedDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const listing = getClassifiedById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [contactSent, setContactSent] = useState(false);

  if (!listing) notFound();

  const seller = getMemberById(listing.seller_id);
  const IconComp = CATEGORY_ICONS[listing.category] || Package;
  const relatedListings = MOCK_CLASSIFIEDS.filter(
    (c) => c.id !== listing.id && c.category === listing.category && !c.is_sold
  ).slice(0, 3);

  // Create fake image array for gallery
  const images = [0, 1, 2].slice(0, Math.max(1, listing.images.length));

  return (
    <div className="p-4 sm:p-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Link href="/classifieds" className="hover:text-steel transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Classifieds
        </Link>
        <span>/</span>
        <span className="text-white line-clamp-1">{listing.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content — 2/3 */}
        <div className="lg:col-span-2">
          {/* Photo gallery */}
          <div className="mb-4">
            {/* Main image */}
            <div className={`h-72 sm:h-96 rounded-xl bg-gradient-to-br ${GRADIENT_PALETTES[selectedImage % GRADIENT_PALETTES.length]} flex items-center justify-center relative overflow-hidden border border-border/50 mb-3`}>
              <IconComp className="h-20 w-20 text-white/10" />
              {listing.is_sold && (
                <div className="absolute inset-0 bg-obsidian/70 flex items-center justify-center">
                  <Badge className="bg-red-500 text-white text-2xl font-bold px-6 py-2">SOLD</Badge>
                </div>
              )}
              <div className="absolute bottom-3 left-3 text-xs text-white/40 font-mono">
                {listing.category} · Photo {selectedImage + 1} of {images.length}
              </div>
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-16 w-20 rounded bg-gradient-to-br ${GRADIENT_PALETTES[i % GRADIENT_PALETTES.length]} border-2 transition-all ${
                      selectedImage === i ? "border-amber" : "border-border/50 hover:border-border"
                    } flex items-center justify-center`}
                  >
                    <IconComp className="h-6 w-6 text-white/20" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title + Price */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                {listing.category}
              </Badge>
              {listing.is_sold && (
                <Badge className="bg-red-500/20 text-red-400 border-red-400/30 text-xs">Sold</Badge>
              )}
            </div>
            <h1 className="font-display text-3xl text-white tracking-wide mb-2">
              {listing.title}
            </h1>
            <div className="flex items-center gap-4">
              {listing.price === 0 ? (
                <span className="font-display text-2xl text-steel">WANTED</span>
              ) : (
                <span className={`font-display text-3xl ${listing.is_sold ? "text-muted-foreground line-through" : "text-amber"}`}>
                  ${listing.price.toLocaleString()}
                  {listing.price_negotiable && !listing.is_sold && (
                    <span className="text-sm font-sans font-normal text-muted-foreground ml-2">Negotiable</span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Details grid */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { label: "Posted", value: new Date(listing.listed_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), icon: Calendar },
              { label: "Location", value: listing.location, icon: MapPin },
              { label: "Condition", value: listing.condition, icon: CheckCircle2 },
              { label: "Category", value: listing.category, icon: Tag },
              ...(listing.part_number ? [{ label: "Part Number", value: listing.part_number, icon: Settings }] : []),
            ].map((detail) => (
              <div key={detail.label} className="flex items-start gap-2 p-3 rounded bg-charcoal/30 border border-border/30">
                <detail.icon className="h-4 w-4 text-amber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{detail.label}</p>
                  <p className="text-sm text-white">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-display text-xl text-white tracking-wide mb-3">DESCRIPTION</h2>
            <div className="text-sm text-steel/80 leading-relaxed whitespace-pre-wrap bg-charcoal/20 rounded-lg p-4 border border-border/30">
              {listing.description}
            </div>
          </div>

          {/* Related listings */}
          {relatedListings.length > 0 && (
            <div>
              <h2 className="font-display text-xl text-white tracking-wide mb-3">
                MORE {listing.category.toUpperCase()}
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {relatedListings.map((rel, i) => (
                  <Link key={rel.id} href={`/classifieds/${rel.id}`}>
                    <div className={`h-24 rounded bg-gradient-to-br ${GRADIENT_PALETTES[i % GRADIENT_PALETTES.length]} border border-border/50 hover:border-amber/30 transition-all flex flex-col justify-end p-3`}>
                      <p className="text-xs font-medium text-white line-clamp-1">{rel.title}</p>
                      <p className="text-xs text-amber">${rel.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — 1/3 */}
        <div className="space-y-4">
          {/* Seller Card */}
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <h3 className="font-display text-sm text-steel tracking-widest mb-4">SELLER</h3>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-amber/10 text-amber border border-amber/20">
                    {listing.seller_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{listing.seller_name}</p>
                  {seller && (
                    <p className="text-xs text-muted-foreground capitalize">
                      {seller.membership_type} Member · {seller.chapter}
                    </p>
                  )}
                </div>
              </div>
              {!listing.is_sold && (
                <>
                  {contactSent ? (
                    <div className="text-center py-2">
                      <CheckCircle2 className="h-6 w-6 text-amber mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Message sent! (Demo mode)</p>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setContactSent(true)}
                      className="w-full bg-amber hover:bg-amber-glow text-obsidian font-bold mb-2"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Seller
                    </Button>
                  )}
                  {seller && (
                    <Button asChild variant="outline" size="sm" className="w-full border-border text-steel hover:text-white">
                      <Link href={`/members/${seller.id}`}>View Profile</Link>
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Safety notice */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-white mb-1">Buyer Safety</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Always verify parts before purchase. For vehicles, arrange a professional PPI. The DOA is not responsible for transactions between members.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report */}
          <button className="text-xs text-muted-foreground hover:text-red-400 transition-colors text-left w-full px-1">
            Report this listing
          </button>
        </div>
      </div>
    </div>
  );
}
