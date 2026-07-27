"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import WormLoader from "@/app/components/worm-loader";

const machines = [
  {
    id: "BT-1001",
    name: "BioTime Front Desk",
    location: "Head Office — Lobby",
    ip: "192.168.1.21",
    status: "Online" as const,
    lastSync: "2 min ago",
    model: "BioTime Pro",
    users: 148,
  },
  {
    id: "BT-1002",
    name: "BioTime Warehouse Gate",
    location: "Warehouse A — Entry",
    ip: "192.168.1.34",
    status: "Online" as const,
    lastSync: "5 min ago",
    model: "BioTime Lite",
    users: 86,
  },
  {
    id: "BT-1003",
    name: "BioTime Production Floor",
    location: "Plant 2 — Line B",
    ip: "192.168.1.47",
    status: "Offline" as const,
    lastSync: "1 hr ago",
    model: "BioTime Pro",
    users: 214,
  },
  {
    id: "BT-1004",
    name: "BioTime Staff Exit",
    location: "Head Office — Rear",
    ip: "192.168.1.52",
    status: "Maintenance" as const,
    lastSync: "28 min ago",
    model: "BioTime Access",
    users: 97,
  },
];

type StatusFilter = "All" | "Online" | "Offline" | "Maintenance";

function statusClass(status: string) {
  if (status === "Online") return "bg-[#d9f5df] text-[#1f7a3b]";
  if (status === "Maintenance") return "bg-[#fff1c9] text-[#9a6b00]";
  return "bg-[#eceff2] text-[#5b6570]";
}

function statusDot(status: string) {
  if (status === "Online") return "bg-[#2f9e55]";
  if (status === "Maintenance") return "bg-[#d4a017]";
  return "bg-[#8b9690]";
}

function MachineIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 18v2M16 18v2M7 11h4M13 11h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function AllMachinesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [refreshing, setRefreshing] = useState(false);

  const stats = useMemo(
    () => ({
      total: machines.length,
      online: machines.filter((m) => m.status === "Online").length,
      offline: machines.filter((m) => m.status === "Offline").length,
      maintenance: machines.filter((m) => m.status === "Maintenance").length,
    }),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return machines.filter((machine) => {
      const matchesFilter = filter === "All" || machine.status === filter;
      const matchesQuery =
        !q ||
        machine.name.toLowerCase().includes(q) ||
        machine.id.toLowerCase().includes(q) ||
        machine.location.toLowerCase().includes(q) ||
        machine.ip.includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  function handleRefresh() {
    if (refreshing) return;
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      toast.success("Machine list refreshed");
    }, 1800);
  }

  return (
    <div className="relative space-y-3">
      {refreshing ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/40 backdrop-blur-md">
          <WormLoader size="md" />
        </div>
      ) : null}

      <section className="overflow-hidden rounded-2xl bg-forest p-4 text-white shadow-sm sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-white/60 uppercase">
              Machines
            </p>
            <h1 className="mt-1 font-display text-xl font-bold sm:text-2xl">All Machines</h1>
            <p className="mt-1 max-w-md text-xs text-white/70">
              Monitor attendance devices across every site — status, sync health, and live connectivity.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Link
              href="/dashboard/machines/management"
              className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-forest transition hover:bg-white/90"
            >
              Manage Machines
            </Link>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Devices",
            value: String(stats.total),
            hint: "Registered fleet",
            tone: "forest" as const,
            shape: "card-blob-a",
          },
          {
            label: "Online Now",
            value: String(stats.online),
            hint: "Healthy sync",
            tone: "light" as const,
            shape: "card-blob-b",
          },
          {
            label: "Offline",
            value: String(stats.offline),
            hint: "Needs reconnect",
            tone: "light" as const,
            shape: "card-blob-c",
          },
          {
            label: "Maintenance",
            value: String(stats.maintenance),
            hint: "In service",
            tone: "light" as const,
            shape: "card-blob-d",
          },
        ].map((card) => (
          <div
            key={card.label}
            className={`card-blob ${card.shape} p-4 ${
              card.tone === "forest"
                ? "is-forest bg-forest text-white"
                : "border border-[#e4ebe7] bg-white"
            } ${card.shape === "card-blob-b" ? "pl-8 pr-4" : "pr-8"}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className={`text-[11px] ${card.tone === "forest" ? "text-white/70" : "text-[#7a867f]"}`}>
                  {card.label}
                </p>
                <p className="mt-1.5 font-display text-2xl font-bold tracking-tight">{card.value}</p>
                <p className={`mt-1 text-[10px] ${card.tone === "forest" ? "text-white/55" : "text-[#9aa49e]"}`}>
                  {card.hint}
                </p>
              </div>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  card.tone === "forest" ? "bg-white/15 text-white" : "bg-[#eef5f1] text-forest"
                }`}
              >
                <MachineIcon />
              </span>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-full bg-[#eef1ef] px-3 py-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="#66736c" strokeWidth="1.7" />
              <path d="m16.5 16.5 3.5 3.5" stroke="#66736c" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, ID, location, or IP"
              className="w-full bg-transparent text-xs outline-none placeholder:text-[#8b9690]"
            />
          </div>
          <div className="flex flex-wrap gap-1 rounded-full bg-[#eef1ef] p-0.5">
            {(["All", "Online", "Offline", "Maintenance"] as StatusFilter[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                  filter === item
                    ? "bg-forest text-white"
                    : "text-[#66736c] hover:bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {filtered.map((machine, index) => {
            const shapes = ["card-blob-a", "card-blob-b", "card-blob-c", "card-blob-d"] as const;
            const shape = shapes[index % shapes.length];
            const padClass =
              shape === "card-blob-b"
                ? "pl-8 pr-4"
                : shape === "card-blob-c"
                  ? "px-5 pt-5"
                  : "pr-8";

            return (
              <article
                key={machine.id}
                className={`card-blob ${shape} border border-[#e4ebe7] bg-[#fbfcfb] p-4 ${padClass}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-forest text-white">
                      <MachineIcon />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate font-display text-sm font-bold">{machine.name}</h2>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClass(machine.status)}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${statusDot(machine.status)}`} />
                          {machine.status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#7a867f]">
                        {machine.id} · {machine.model}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-xl bg-white/80 px-2.5 py-2">
                    <p className="text-[10px] text-[#9aa49e]">Location</p>
                    <p className="mt-0.5 font-medium text-[#1c2420]">{machine.location}</p>
                  </div>
                  <div className="rounded-xl bg-white/80 px-2.5 py-2">
                    <p className="text-[10px] text-[#9aa49e]">IP Address</p>
                    <p className="mt-0.5 font-medium text-[#1c2420]">{machine.ip}</p>
                  </div>
                  <div className="rounded-xl bg-white/80 px-2.5 py-2">
                    <p className="text-[10px] text-[#9aa49e]">Last Sync</p>
                    <p className="mt-0.5 font-medium text-[#1c2420]">{machine.lastSync}</p>
                  </div>
                  <div className="rounded-xl bg-white/80 px-2.5 py-2">
                    <p className="text-[10px] text-[#9aa49e]">Enrolled Users</p>
                    <p className="mt-0.5 font-medium text-[#1c2420]">{machine.users}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => toast(`Opening ${machine.name}`)}
                    className="rounded-full bg-forest px-3 py-1.5 text-[10px] font-semibold text-white transition hover:bg-forest-soft"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.success(`Sync started for ${machine.id}`)}
                    className="rounded-full border border-[#d7ddd9] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#1c2420] transition hover:bg-[#f4f6f5]"
                  >
                    Sync Now
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-[#d7ddd9] px-4 py-10 text-center">
            <p className="font-display text-sm font-bold text-[#1c2420]">No machines found</p>
            <p className="mt-1 text-xs text-[#7a867f]">Try another search or status filter</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
