"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";
import { Zap, Lock, Mail } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDemoLogin = () => {
    login("demo@delorean.org", "demo");
    onOpenChange(false);
    router.push("/dashboard");
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: any credentials work
    login(email, password);
    onOpenChange(false);
    router.push("/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-charcoal border-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded bg-amber/10 border border-amber/30 flex items-center justify-center">
              <span className="font-display text-amber text-lg leading-none">DMC</span>
            </div>
            <div>
              <DialogTitle className="font-display text-xl tracking-widest text-white">
                MEMBER LOGIN
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                DeLorean Owners Association
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Demo notice */}
        <div className="bg-amber/10 border border-amber/30 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Zap className="h-4 w-4 text-amber mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber/90">
              <span className="font-semibold">This is a demo site.</span> Click{" "}
              <em>Demo Login</em> to explore the full member experience with pre-loaded data.
            </p>
          </div>
        </div>

        {/* Demo login button */}
        <Button
          onClick={handleDemoLogin}
          className="w-full bg-amber hover:bg-amber-glow text-obsidian font-bold text-base h-11 shadow-amber-glow"
        >
          <Zap className="h-5 w-5 mr-2" />
          Demo Login — Explore as James Schay
        </Button>

        <div className="flex items-center gap-3 my-2">
          <Separator className="flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or sign in</span>
          <Separator className="flex-1 bg-border" />
        </div>

        <form onSubmit={handleManualLogin} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9 bg-background border-border"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9 bg-background border-border"
            />
          </div>
          <Button
            type="submit"
            variant="outline"
            className="w-full border-border hover:bg-white/5"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Not a member?{" "}
          <a href="/join" className="text-amber hover:text-amber-glow underline">
            Join the DOA
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
