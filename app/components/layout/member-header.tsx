"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  Menu,
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  BookOpen,
  Calendar,
  Users,
  Car,
  Wrench,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";

const MEMBER_NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/forum", label: "Forum", icon: MessageSquare },
  { href: "/classifieds", label: "Classifieds", icon: ShoppingBag },
  { href: "/magazine", label: "Magazine", icon: BookOpen },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/members", label: "Members", icon: Users },
  { href: "/garage", label: "Garage", icon: Car },
  { href: "/resources", label: "Resources", icon: Wrench },
];

export function MemberHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-obsidian/95 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-8 h-8 rounded bg-amber/10 border border-amber/30 flex items-center justify-center group-hover:bg-amber/20 transition-colors">
            <span className="font-display text-amber text-sm leading-none">DMC</span>
          </div>
          <span className="font-display text-xs text-steel tracking-widest hidden sm:block">
            DOA MEMBERS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 mx-6 overflow-x-auto">
          {MEMBER_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-steel hover:text-white hover:bg-white/5 rounded transition-colors whitespace-nowrap"
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-steel hover:text-white h-8 w-8">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[9px] bg-amber text-obsidian flex items-center justify-center">
              3
            </Badge>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 gap-2 px-2 hover:bg-white/5">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs bg-amber/20 text-amber border border-amber/30">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-steel hidden sm:block max-w-[100px] truncate">
                  {user?.name?.split(" ")[0]}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-charcoal border-border">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.membership_type} member
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile nav */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-steel hover:text-white h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-obsidian border-border w-64">
              <div className="flex items-center gap-3 mb-6 mt-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm bg-amber/20 text-amber border border-amber/30">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.membership_type}
                  </p>
                </div>
              </div>

              <nav className="flex flex-col gap-0.5">
                {MEMBER_NAV.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-steel hover:text-white hover:bg-white/5 rounded transition-colors"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border mt-2 pt-2">
                  <Link
                    href="/settings"
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-steel hover:text-white hover:bg-white/5 rounded transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setSheetOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 rounded transition-colors w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
