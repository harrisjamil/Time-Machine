"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AdminSession = {
  id: string;
  fullName: string;
  username: string;
  email: string;
};

export default function DashboardPage() {
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
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-white/70">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <p className="text-sm tracking-wide text-brand uppercase">Dashboard</p>
        <h1 className="mt-3 font-display text-4xl font-bold">
          Welcome, {admin.fullName}
        </h1>
        <div className="mt-6 space-y-2 text-white/80">
          <p>
            <span className="text-white/50">Username:</span> @{admin.username}
          </p>
          <p>
            <span className="text-white/50">Email:</span> {admin.email}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm transition hover:bg-white/10"
          >
            Back to login
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Log out
          </button>
        </div>
      </div>
    </main>
  );
}
