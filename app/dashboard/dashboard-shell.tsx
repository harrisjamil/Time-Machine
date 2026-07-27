"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";

export type AdminSession = {
  id: string;
  fullName: string;
  username: string;
  email: string;
};

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

const menuItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Machines",
    children: [
      { label: "All Machines", href: "/dashboard/machines" },
      { label: "Machine Management", href: "/dashboard/machines/management" },
    ],
  },
  { label: "Products" },
  { label: "Customers" },
  { label: "Vendors" },
  { label: "Inventory" },
  { label: "Order" },
  { label: "Report" },
];

const generalItems: NavItem[] = [
  { label: "Evaluation" },
  { label: "Sales by Margin" },
  { label: "Staff" },
  { label: "Pricelist" },
  { label: "Setup" },
  { label: "Clock In/Out" },
];

function IconHome() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconMachine() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 18v2M16 18v2M7 11h4M13 11h4M9 8v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconBox() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 12 20 7.5M12 12v9M12 12 4 7.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 19c.8-3 2.9-4.5 5.5-4.5S14 16 14.8 19M14.5 14.7c1.7.2 3.2 1.2 4 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconStore() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10h16v10H4V10ZM5 7h14l1 3H4l1-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.5L21 8H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1.3" fill="currentColor" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 3v5h5M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 16v-5M12 16V8M16 16v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconStaff() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 19c1.2-3.2 3.5-4.8 7-4.8s5.8 1.6 7 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconTag() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12V4h8l10 10-8 8L3 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="1.3" fill="currentColor" />
    </svg>
  );
}

function IconGear() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v4.5l3 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const menuIcons = [
  IconHome,
  IconMachine,
  IconBox,
  IconUsers,
  IconStore,
  IconLayers,
  IconCart,
  IconDoc,
];
const generalIcons = [IconChart, IconChart, IconStaff, IconTag, IconGear, IconClock];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function NameAvatar({
  name,
  size = "md",
  tone = "light",
}: {
  name: string;
  size?: "sm" | "md";
  tone?: "light" | "dark";
}) {
  const initials = getInitials(name);
  const sizeClass = size === "sm" ? "h-8 w-8 text-[10px]" : "h-8 w-8 text-[11px]";
  const toneClass =
    tone === "dark"
      ? "bg-white/20 text-white"
      : "bg-forest text-white";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${sizeClass} ${toneClass}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function isPathActive(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href;
}

type DashboardShellProps = {
  admin: AdminSession;
  onLogout: () => void;
  children: ReactNode;
};

export default function DashboardShell({ admin, onLogout, children }: DashboardShellProps) {
  const pathname = usePathname();
  const machinesOpenByDefault = pathname.startsWith("/dashboard/machines");
  const [machinesOpen, setMachinesOpen] = useState(machinesOpenByDefault);

  useEffect(() => {
    if (machinesOpenByDefault) setMachinesOpen(true);
  }, [machinesOpenByDefault]);

  return (
    <div className="flex min-h-screen w-full bg-dash-bg text-[#1c2420]">
      <aside className="hidden w-[220px] shrink-0 flex-col border-r border-[#e4e9e6] bg-white xl:flex">
        <div className="flex items-center gap-2 px-4 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111] font-display text-sm font-bold text-white">
            M
          </span>
          <span className="font-display text-base font-extrabold tracking-wide">MAXEN</span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3">
          <p className="px-2 text-[10px] font-semibold tracking-[0.14em] text-[#8b9690] uppercase">
            Menu
          </p>
          <nav className="mt-2 space-y-0.5">
            {menuItems.map((item, index) => {
              const Icon = menuIcons[index] ?? IconDoc;
              const hasChildren = Boolean(item.children?.length);
              const childActive = item.children?.some((child) => isPathActive(pathname, child.href));
              const active = isPathActive(pathname, item.href) || Boolean(childActive);
              const expanded = item.label === "Machines" ? machinesOpen : false;

              if (hasChildren) {
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => setMachinesOpen((open) => !open)}
                      className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left text-xs transition ${
                        active
                          ? "bg-forest font-semibold text-white shadow-sm"
                          : "text-[#4d5a54] hover:bg-[#f2f5f3]"
                      }`}
                      aria-expanded={expanded}
                    >
                      <Icon />
                      <span className="flex-1">{item.label}</span>
                      <span
                        className={`transition ${expanded ? "rotate-90" : ""} ${
                          active ? "text-white/80" : "text-[#a0aaa4]"
                        }`}
                      >
                        ›
                      </span>
                    </button>
                    {expanded ? (
                      <div className="mt-0.5 ml-4 space-y-0.5 border-l border-[#e4e9e6] pl-2">
                        {item.children?.map((child) => {
                          const childIsActive = isPathActive(pathname, child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-[11px] transition ${
                                childIsActive
                                  ? "bg-[#e7f1ec] font-semibold text-forest"
                                  : "text-[#4d5a54] hover:bg-[#f2f5f3]"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              }

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left text-xs transition ${
                      active
                        ? "bg-forest font-semibold text-white shadow-sm"
                        : "text-[#4d5a54] hover:bg-[#f2f5f3]"
                    }`}
                  >
                    <Icon />
                    <span className="flex-1">{item.label}</span>
                    {!active ? <span className="text-[#a0aaa4]">›</span> : null}
                  </Link>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left text-xs text-[#4d5a54] transition hover:bg-[#f2f5f3]"
                >
                  <Icon />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-[#a0aaa4]">›</span>
                </button>
              );
            })}
          </nav>

          <p className="mt-5 px-2 text-[10px] font-semibold tracking-[0.14em] text-[#8b9690] uppercase">
            General
          </p>
          <nav className="mt-2 space-y-0.5">
            {generalItems.map((item, index) => {
              const Icon = generalIcons[index] ?? IconDoc;
              return (
                <button
                  key={item.label}
                  type="button"
                  className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left text-xs text-[#4d5a54] transition hover:bg-[#f2f5f3]"
                >
                  <Icon />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-[#a0aaa4]">›</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="relative m-3 overflow-hidden rounded-2xl bg-forest p-3 text-white">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full border-[14px] border-white/20" />
            <div className="absolute -bottom-10 -left-8 h-24 w-24 rounded-full border-[14px] border-white/15" />
          </div>
          <p className="relative text-[10px] text-white/70">Head Office</p>
          <div className="relative mt-2 flex items-center gap-2">
            <NameAvatar name={admin.fullName} tone="dark" />
            <div>
              <p className="text-xs font-semibold">{admin.fullName}</p>
              <p className="text-[10px] text-white/70">Administrator</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toast.success("Opening profile...")}
            className="relative mt-3 flex w-full items-center justify-between rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium transition hover:bg-white/25"
          >
            View Profile
            <span>→</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="relative mt-1.5 w-full rounded-full border border-white/20 px-3 py-1.5 text-[10px] text-white/80 transition hover:bg-white/10"
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-[#e4e9e6] bg-white px-3 py-2 xl:hidden">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111] font-display text-xs font-bold text-white">
            M
          </span>
          <span className="font-display text-sm font-extrabold tracking-wide">MAXEN</span>
          <div className="ml-auto flex items-center gap-1.5">
            <Link
              href="/dashboard/machines"
              className="rounded-full border border-[#d7ddd9] px-2.5 py-1 text-[10px] font-semibold"
            >
              Machines
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-[#d7ddd9] px-2.5 py-1 text-[10px] font-semibold"
            >
              Log out
            </button>
          </div>
        </div>

        <header className="flex flex-wrap items-center gap-2 border-b border-[#e4e9e6] bg-white px-4 py-2.5 sm:px-5">
          <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-full bg-[#eef1ef] px-3 py-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="#66736c" strokeWidth="1.7" />
              <path d="m16.5 16.5 3.5 3.5" stroke="#66736c" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Search task"
              className="w-full bg-transparent text-xs outline-none placeholder:text-[#8b9690]"
            />
            <span className="hidden rounded-md border border-[#d7ddd9] px-1.5 py-0.5 text-[10px] text-[#7a867f] sm:inline">
              ⌘ F
            </span>
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e4e9e6] text-[#4d5a54] transition hover:bg-[#f4f6f5]"
              onClick={() => toast("No new messages")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16v11H4V7Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="m4 8 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e4e9e6] text-[#4d5a54] transition hover:bg-[#f4f6f5]"
              onClick={() => toast("You're all caught up")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2 pl-1">
              <NameAvatar name={admin.fullName} />
              <div className="hidden sm:block">
                <p className="text-xs font-semibold">{admin.fullName}</p>
                <p className="text-[10px] text-[#7a867f]">{admin.email}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
