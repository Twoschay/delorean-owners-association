"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
import { LoginModal } from "@/components/auth/login-modal";

const TIERS = [
  {
    id: "national",
    name: "National",
    price: 50,
    period: "/year",
    description: "For members residing in the United States",
    badge: null,
    highlight: true,
    features: [
      "DeLorean World Magazine (Digital)",
      "DeLorean World Magazine (Print)",
      "Stainless News Newsletter",
      "Member Forum Access",
      "Member Classifieds",
      "Digital Garage (1 vehicle)",
      "Global Member Map",
      "Event Discounts (10%)",
      "Service Center Directory",
      "Vehicle Appraisal Access",
      "Voting Rights",
    ],
  },
  {
    id: "international",
    name: "International",
    price: 60,
    period: "/year",
    description: "For members residing outside the United States",
    badge: null,
    highlight: false,
    features: [
      "DeLorean World Magazine (Digital)",
      "DeLorean World Magazine (Print)",
      "Stainless News Newsletter",
      "Member Forum Access",
      "Member Classifieds",
      "Digital Garage (1 vehicle)",
      "Global Member Map",
      "Event Discounts (10%)",
      "Service Center Directory",
      "Vehicle Appraisal Access",
      "Voting Rights",
    ],
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: 500,
    period: "one time",
    description: "A single payment for lifetime membership",
    badge: "Best Value",
    highlight: false,
    features: [
      "DeLorean World Magazine (Digital)",
      "DeLorean World Magazine (Print)",
      "Stainless News Newsletter",
      "Member Forum Access",
      "Member Classifieds",
      "Digital Garage (unlimited vehicles)",
      "Global Member Map",
      "Event Discounts (15%)",
      "Service Center Directory",
      "Vehicle Appraisal Access",
      "Voting Rights",
      "Lifetime member plaque",
      "Priority support",
    ],
  },
];

const FAQS = [
  {
    q: "Do I need to own a DeLorean to join?",
    a: "Absolutely not! The DOA welcomes all DeLorean enthusiasts — whether you own a car, dream of owning one, or simply admire John DeLorean's vision. About 30% of our members are enthusiasts without a car.",
  },
  {
    q: "What's included in DeLorean World Magazine?",
    a: "DeLorean World is our award-winning publication covering technical articles, restoration guides, member profiles, event coverage, classifieds, and DeLorean news. It's been published continuously since 1985 — 32+ volumes.",
  },
  {
    q: "How do I find my local chapter?",
    a: "After joining, you'll be assigned to a chapter based on your location. Chapters host their own events, meets, and activities independent of the national organization. Visit the About page for chapter information.",
  },
  {
    q: "Can I upgrade my membership later?",
    a: "Yes! You can upgrade from National to Lifetime at any time. Simply pay the difference and your membership is upgraded. Contact the membership team for details.",
  },
  {
    q: "How quickly will I receive my first magazine?",
    a: "Digital access is instant upon membership confirmation. Print magazines ship within 30 days of the next issue publication. You'll receive all back issues of the current volume digitally.",
  },
  {
    q: "Is my membership tax-deductible?",
    a: "The DOA is a 501(c)(7) nonprofit social club. Membership dues are generally not tax-deductible. Consult your tax professional for specific advice.",
  },
];

export default function JoinPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-col">
        {/* Hero */}
        <section className="py-20 border-b border-border bg-gradient-to-b from-charcoal/50 to-transparent">
          <div className="container max-w-3xl">
            <Badge className="mb-4 bg-amber/10 text-amber border-amber/30">
              Membership
            </Badge>
            <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide mb-4">
              JOIN THE <span className="text-amber">ASSOCIATION</span>
            </h1>
            <p className="text-xl text-steel/70 leading-relaxed">
              Whether you own a DeLorean or simply admire them, you belong here.
            </p>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl text-white tracking-wide mb-2">
                CHOOSE YOUR <span className="text-amber">MEMBERSHIP</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                All memberships include print magazine, forum access, and full member benefits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {TIERS.map((tier) => (
                <Card
                  key={tier.id}
                  className={`relative flex flex-col ${
                    tier.highlight
                      ? "border-amber/50 bg-gradient-to-b from-amber/5 to-card shadow-amber-glow"
                      : "bg-card border-border"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-amber text-obsidian text-xs font-bold px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-steel text-obsidian text-xs font-bold px-3 py-1">
                        {tier.badge}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="font-display text-2xl text-white tracking-wide">
                      {tier.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      {tier.description}
                    </CardDescription>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="font-display text-4xl text-amber">${tier.price}</span>
                      <span className="text-muted-foreground text-sm">{tier.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-amber flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-steel">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => setLoginOpen(true)}
                      className={`w-full font-bold ${
                        tier.highlight
                          ? "bg-amber hover:bg-amber-glow text-obsidian shadow-amber-glow"
                          : "bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      Join as {tier.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Already a member?{" "}
              <button
                onClick={() => setLoginOpen(true)}
                className="text-amber hover:text-amber-glow underline"
              >
                Sign in here
              </button>
              . Questions?{" "}
              <a href="/contact" className="text-amber hover:text-amber-glow underline">
                Contact us
              </a>
              .
            </p>
          </div>
        </section>

        <Separator className="bg-border" />

        {/* Feature comparison callout */}
        <section className="py-16 bg-charcoal/50">
          <div className="container max-w-3xl">
            <h2 className="font-display text-3xl text-white tracking-wide mb-6 text-center">
              WHY JOIN THE <span className="text-amber">DOA</span>?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "40+ Years of Knowledge",
                  desc: "Access three decades of technical articles, restoration guides, and community wisdom in the magazine archive."
                },
                {
                  title: "Expert Community",
                  desc: "5,000 owners — including master mechanics, professional restorers, and EV conversion specialists — ready to help."
                },
                {
                  title: "The Premier Publication",
                  desc: "DeLorean World Magazine is the definitive DeLorean publication, covering everything from tech to history to events."
                },
                {
                  title: "Global Events",
                  desc: "Annual DeLorean Expo, chapter meets, tech workshops, and group drives throughout the year."
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="w-1 flex-shrink-0 rounded bg-amber/50 self-stretch" />
                  <div>
                    <h3 className="font-medium text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator className="bg-border" />

        {/* FAQ */}
        <section className="py-16">
          <div className="container max-w-2xl">
            <h2 className="font-display text-3xl text-white tracking-wide mb-8 text-center">
              FREQUENTLY ASKED <span className="text-amber">QUESTIONS</span>
            </h2>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-border rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-amber flex-shrink-0 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 border-t border-border/50 bg-charcoal/30">
                      <p className="text-sm text-muted-foreground pt-3 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
