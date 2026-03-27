"use client";

import { useAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function ProfileRedirectPage() {
  const { user } = useAuth();
  if (user) redirect(`/members/${user.id}`);
  return null;
}
