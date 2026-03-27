"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 border-b border-border bg-gradient-to-b from-charcoal/50 to-transparent">
        <div className="container max-w-3xl">
          <Badge className="mb-4 bg-amber/10 text-amber border-amber/30">Get in Touch</Badge>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide mb-4">
            CONTACT <span className="text-amber">US</span>
          </h1>
          <p className="text-lg text-steel/70 leading-relaxed">
            Questions about membership, events, or your DeLorean? We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl">
            {/* Contact form */}
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-6">SEND US A MESSAGE</h2>

              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-amber/10 border-2 border-amber flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-amber" />
                  </div>
                  <h3 className="font-display text-2xl text-white tracking-wide mb-2">MESSAGE SENT!</h3>
                  <p className="text-muted-foreground text-sm">
                    We&apos;ll get back to you within 2-3 business days.
                  </p>
                  <Button
                    onClick={() => setSent(false)}
                    variant="outline"
                    className="mt-4 border-border text-steel hover:text-white"
                    size="sm"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-steel mb-1.5 block uppercase tracking-wider">First Name</label>
                      <Input
                        placeholder="John"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-steel mb-1.5 block uppercase tracking-wider">Last Name</label>
                      <Input
                        placeholder="DeLorean"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-steel mb-1.5 block uppercase tracking-wider">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-steel mb-1.5 block uppercase tracking-wider">Subject</label>
                    <Select>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select a subject..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="membership">Membership Question</SelectItem>
                        <SelectItem value="magazine">Magazine / Back Issues</SelectItem>
                        <SelectItem value="events">Events & Expo</SelectItem>
                        <SelectItem value="technical">Technical Question</SelectItem>
                        <SelectItem value="press">Press / Media Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs text-steel mb-1.5 block uppercase tracking-wider">Message</label>
                    <Textarea
                      placeholder="How can we help you?"
                      required
                      rows={5}
                      className="bg-background border-border resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber hover:bg-amber-glow text-obsidian font-bold"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-6">CONTACT INFORMATION</h2>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Mail,
                    title: "General Inquiries",
                    content: "info@deloreanowners.org",
                    sub: "Response within 2-3 business days",
                  },
                  {
                    icon: Mail,
                    title: "Membership",
                    content: "membership@deloreanowners.org",
                    sub: "For join, renewal, or account questions",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: "(805) 964-5296",
                    sub: "Tuesday–Thursday, 10am–3pm Pacific",
                  },
                  {
                    icon: MapPin,
                    title: "Mailing Address",
                    content: "DeLorean Owners Association",
                    sub: "PO Box 4270, Santa Barbara, CA 93140",
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    content: "Tuesday–Thursday, 10am–4pm PT",
                    sub: "Volunteer-staffed — response times may vary",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-amber" />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-steel mb-0.5">{item.title}</h3>
                      <p className="text-sm text-white">{item.content}</p>
                      <p className="text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-border mb-6" />

              {/* Social */}
              <h3 className="font-display text-sm text-steel tracking-widest mb-3">SOCIAL MEDIA</h3>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", handle: "DeLoreanOwnersAssociation" },
                  { label: "Instagram", handle: "@delorean_doa" },
                  { label: "YouTube", handle: "DOAtelevision" },
                ].map((social) => (
                  <Card key={social.label} className="bg-card border-border hover:border-amber/30 transition-all flex-1">
                    <CardContent className="p-3 text-center">
                      <div className="text-xs text-amber font-medium mb-0.5">{social.label}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{social.handle}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
