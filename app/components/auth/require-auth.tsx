"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { LoginModal } from "./login-modal";

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      setLoginOpen(true);
    }
  }, [mounted, isAuthenticated]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded bg-amber/10 border border-amber/30 flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-amber text-2xl">DMC</span>
          </div>
          <h2 className="font-display text-2xl text-white tracking-widest mb-2">MEMBERS ONLY</h2>
          <p className="text-muted-foreground text-sm">This area is for DOA members only.</p>
        </div>
        <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      </div>
    );
  }

  return <>{children}</>;
}
