"use client";

import { RequireAuth } from "@/components/auth/require-auth";
import { MemberHeader } from "@/components/layout/member-header";
import { MemberSidebar } from "@/components/layout/member-sidebar";
import { Footer } from "@/components/layout/footer";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="flex flex-col min-h-screen">
        <MemberHeader />
        <div className="flex flex-1">
          <MemberSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
        <Footer />
      </div>
    </RequireAuth>
  );
}
