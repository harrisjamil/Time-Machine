"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import WormLoader from "@/app/components/worm-loader";
import DashboardShell, { type AdminSession } from "./dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminSession | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem("admin");
    if (!raw) {
      router.replace("/login");
      return;
    }

    try {
      setAdmin(JSON.parse(raw) as AdminSession);
    } catch {
      window.localStorage.removeItem("admin");
      router.replace("/login");
    }
  }, [router]);

  function handleLogout() {
    window.localStorage.removeItem("admin");
    router.push("/login");
  }

  if (!admin) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dash-bg">
        <div
          className="pointer-events-none absolute inset-0 scale-110 bg-[radial-gradient(circle_at_20%_20%,rgba(27,62,47,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(17,17,17,0.12),transparent_40%),linear-gradient(180deg,#eef2ef,#f4f6f5)] blur-2xl"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-white/35 backdrop-blur-md" />
        <div className="relative z-10">
          <WormLoader size="lg" />
        </div>
      </main>
    );
  }

  return (
    <DashboardShell admin={admin} onLogout={handleLogout}>
      {children}
    </DashboardShell>
  );
}
