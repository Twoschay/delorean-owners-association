"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/lib/types";
import { getDemoMember } from "@/lib/mock-data/members";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const STORAGE_KEY = "doa_auth_user";

function getDemoUser(): User {
  const member = getDemoMember();
  return {
    ...member,
    notifications_enabled: true,
    newsletter_subscribed: true,
    profile_public: true,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = (_email?: string, _password?: string) => {
    // In the demo, all logins use the demo user
    const demoUser = getDemoUser();
    setUser(demoUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    } catch {
      // Ignore storage errors
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <AuthContext.Provider value={{ user: null, isAuthenticated: false, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
