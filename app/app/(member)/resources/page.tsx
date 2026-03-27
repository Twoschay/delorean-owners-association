import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, BookOpen, DollarSign, ShoppingCart, ArrowRight } from "lucide-react";

const RESOURCES = [
  {
    icon: Wrench,
    title: "Service Center Locator",
    description: "Find DOA-vetted DeLorean mechanics and restorers near you — from official DMC service centers to community-recommended shops worldwide.",
    href: "/resources/service-centers",
    color: "amber",
  },
  {
    icon: BookOpen,
    title: "Tech Library",
    description: "Guides, how-tos, and technical articles covering everything from routine maintenance to full engine rebuilds. Written by and for DOA members.",
    href: "/resources/tech-library",
    color: "steel",
  },
  {
    icon: DollarSign,
    title: "Vehicle Appraisal",
    description: "Request a professional appraisal from a DOA-certified evaluator. Used for insurance, sale pricing, or simply knowing what your DMC-12 is worth.",
    href: "/resources/appraisal",
    color: "amber",
  },
  {
    icon: ShoppingCart,
    title: "Parts & Vendors",
    description: "Trusted parts suppliers, restoration vendors, and service providers — curated and vetted by the DOA community.",
    href: "/resources/service-centers",
    color: "steel",
  },
];

const TRUSTED_VENDORS = [
  { name: "DeLorean Motor Company", specialty: "Parts, Service, Official", location: "Humble, TX", url: "delorean.com" },
  { name: "PJ Grady Inc.", specialty: "Mechanical, Electrical, Parts", location: "Fairfield, NJ", url: "pjgrady.com" },
  { name: "DMCH", specialty: "Parts, Accessories", location: "Online", url: "dmchouston.com" },
  { name: "SunStar Enterprises", specialty: "Hydraulic Doors, Performance", location: "California", url: "" },
  { name: "Midwest DeLorean", specialty: "Mechanical, EV, Performance", location: "Chicago, IL", url: "" },
  { name: "DeLorean West", specialty: "Restoration, Body, Stainless", location: "San Diego, CA", url: "" },
];

export default function ResourcesPage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-white tracking-wide">
          MEMBER <span className="text-amber">RESOURCES</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Everything you need to own, maintain, and enjoy your DeLorean.
        </p>
      </div>

      {/* Main resource cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {RESOURCES.map((resource) => (
          <Link key={resource.title} href={resource.href}>
            <Card className="bg-card border-border hover:border-amber/30 transition-all hover:-translate-y-0.5 group h-full">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded mb-4 flex items-center justify-center ${
                  resource.color === "amber" ? "bg-amber/10 border border-amber/20" : "bg-steel/5 border border-steel/10"
                } group-hover:bg-amber/20 transition-colors`}>
                  <resource.icon className={`h-6 w-6 ${resource.color === "amber" ? "text-amber" : "text-steel"}`} />
                </div>
                <h3 className="font-display text-lg text-white tracking-wide mb-2 group-hover:text-amber transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{resource.description}</p>
                <div className="flex items-center gap-1 text-xs text-amber/60 group-hover:text-amber transition-colors font-medium">
                  Explore
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Trusted vendors */}
      <div>
        <h2 className="font-display text-xl text-white tracking-wide mb-4">
          TRUSTED <span className="text-amber">VENDORS</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRUSTED_VENDORS.map((vendor) => (
            <Card key={vendor.name} className="bg-card border-border hover:border-amber/20 transition-all">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-white mb-1">{vendor.name}</h3>
                <p className="text-xs text-amber/70 mb-1">{vendor.specialty}</p>
                <p className="text-xs text-muted-foreground">{vendor.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          * The DOA vets these vendors based on member feedback. Always do your own due diligence.
        </p>
      </div>
    </div>
  );
}
