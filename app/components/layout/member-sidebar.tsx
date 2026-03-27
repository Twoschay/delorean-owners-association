"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  BookOpen,
  Calendar,
  Users,
  Car,
  Wrench,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

const SIDEBAR_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/forum", label: "Forum", icon: MessageSquare },
  { href: "/classifieds", label: "Classifieds", icon: ShoppingBag },
  { href: "/magazine", label: "Magazine", icon: BookOpen },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/members", label: "Members", icon: Users },
  { href: "/garage", label: "Garage", icon: Car },
  { href: "/resources", label: "Resources", icon: Wrench },
  { href: "/account", label: "Account", icon: Settings },
];

export function MemberSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-border bg-charcoal transition-all duration-200 flex-shrink-0",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {/* Toggle */}
        <div className="flex justify-end p-2 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-7 w-7 text-muted-foreground hover:text-white"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5">
          {SIDEBAR_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href));
            return (
              <Tooltip key={link.href} delayDuration={collapsed ? 0 : 99999}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-2.5 py-2 rounded text-sm transition-colors",
                      isActive
                        ? "bg-amber/10 text-amber"
                        : "text-steel hover:text-white hover:bg-white/5",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <link.icon
                      className={cn(
                        "flex-shrink-0",
                        collapsed ? "h-5 w-5" : "h-4 w-4"
                      )}
                    />
                    {!collapsed && (
                      <span className="truncate">{link.label}</span>
                    )}
                    {isActive && !collapsed && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber" />
                    )}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="bg-charcoal border-border text-white">
                    {link.label}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* User card */}
        {!collapsed && user && (
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="text-xs bg-amber/20 text-amber border border-amber/30">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize truncate">
                  {user.membership_type} member
                </p>
              </div>
            </div>
          </div>
        )}

        {collapsed && user && (
          <div className="p-2 border-t border-border flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarFallback className="text-xs bg-amber/20 text-amber border border-amber/30">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-charcoal border-border text-white">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.membership_type}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}
