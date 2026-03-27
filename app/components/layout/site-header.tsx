"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LoginModal } from "@/components/auth/login-modal";
import { useAuth } from "@/lib/auth";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join" },
  { href: "/magazine", label: "Magazine" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-obsidian/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded bg-amber/10 border border-amber/30 flex items-center justify-center group-hover:bg-amber/20 transition-colors">
                <span className="font-display text-amber text-lg leading-none">DMC</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-sm text-amber leading-none tracking-widest">
                DELOREAN
              </div>
              <div className="font-display text-xs text-steel leading-none tracking-widest">
                OWNERS ASSOCIATION
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-steel hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button asChild variant="outline" size="sm" className="border-amber/50 text-amber hover:bg-amber/10">
                <Link href="/dashboard">Member Area</Link>
              </Button>
            ) : (
              <Button
                onClick={() => setLoginOpen(true)}
                size="sm"
                className="bg-amber hover:bg-amber-glow text-obsidian font-semibold hidden sm:flex"
              >
                Member Login
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-steel hover:text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-obsidian border-border w-72">
                <div className="flex items-center gap-3 mb-8 mt-2">
                  <div className="w-8 h-8 rounded bg-amber/10 border border-amber/30 flex items-center justify-center">
                    <span className="font-display text-amber text-sm">DMC</span>
                  </div>
                  <span className="font-display text-steel text-sm tracking-widest">
                    DELOREAN OWNERS
                  </span>
                </div>

                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className="flex items-center px-3 py-3 text-steel hover:text-white hover:bg-white/5 rounded transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border my-2" />
                  {isAuthenticated ? (
                    <Link
                      href="/dashboard"
                      onClick={() => setSheetOpen(false)}
                      className="flex items-center px-3 py-3 text-amber hover:text-amber-glow hover:bg-amber/5 rounded transition-colors"
                    >
                      Member Area
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setSheetOpen(false);
                        setLoginOpen(true);
                      }}
                      className="flex items-center px-3 py-3 text-amber hover:text-amber-glow hover:bg-amber/5 rounded transition-colors text-left"
                    >
                      Member Login
                    </button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
