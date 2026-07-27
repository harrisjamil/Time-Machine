"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const salesBars = [
  { day: "S", value: 42 },
  { day: "M", value: 58 },
  { day: "T", value: 74, highlight: true },
  { day: "W", value: 36 },
  { day: "T", value: 62 },
  { day: "F", value: 48 },
  { day: "S", value: 55 },
];

const reports = [
  { title: "Net Sales Report", due: "Due date 25 Oct", tone: "bg-[#efe8ff]" },
  { title: "Payments Review", due: "Due date 25 Oct", tone: "bg-[#e7f1ff]" },
  { title: "Build Dashboard", due: "Due date 25 Oct", tone: "bg-[#e7f8ef]" },
  { title: "Optimize Exports", due: "Due date 25 Oct", tone: "bg-[#ffe9dc]" },
];

const payments = [
  { id: "A", date: "Oct 17, 2024", cash: "$149.00", rounding: "$0.50", status: "Completed" },
  { id: "B", date: "Oct 17, 2024", cash: "$149.00", rounding: "$0.50", status: "In Progress" },
  { id: "C", date: "Oct 17, 2024", cash: "$149.00", rounding: "$0.50", status: "Pending" },
  { id: "D", date: "Oct 17, 2024", cash: "$149.00", rounding: "$0.50", status: "Completed" },
  { id: "E", date: "Oct 17, 2024", cash: "$149.00", rounding: "$0.50", status: "Pending" },
];

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function statusClass(status: string) {
  if (status === "Completed") return "bg-[#d9f5df] text-[#1f7a3b]";
  if (status === "In Progress") return "bg-[#fff1c9] text-[#9a6b00]";
  return "bg-[#eceff2] text-[#5b6570]";
}

export default function DashboardHome() {
  const [range, setRange] = useState("1 Day");
  const [selectedDay, setSelectedDay] = useState(17);

  const calendarDays = useMemo(() => {
    const blanks = 1;
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return [...Array(blanks).fill(null), ...days];
  }, []);

  return (
    <>
      <section className="rounded-2xl bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-lg font-bold sm:text-xl">
              Performance Summary
            </h1>
            <p className="mt-0.5 text-xs text-[#7a867f]">
              Track your key metrics and growth this period
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => toast.success("Report draft created")}
              className="rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-forest-soft"
            >
              + Add Report
            </button>
            <button
              type="button"
              onClick={() => toast.success("Import started")}
              className="rounded-full border border-[#d7ddd9] bg-white px-3 py-1.5 text-xs font-semibold text-[#1c2420] transition hover:bg-[#f4f6f5]"
            >
              Import Data
            </button>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="card-blob card-blob-a is-forest bg-forest p-3.5 pr-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-white/75">Net Profit</p>
                <p className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">
                  $125,514.99
                </p>
              </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs">
                ↗
              </span>
            </div>
            <span className="mt-3 inline-flex rounded-full bg-[#d9f5df] px-2 py-0.5 text-[10px] font-semibold text-[#1f7a3b]">
              +5% than last month
            </span>
          </div>

          {[
            { label: "Payments", value: "31 Records", badge: "+3% Increased", shape: "card-blob-b", pad: "pl-8 pr-4" },
            { label: "Running Sales", value: "12", badge: "+6% Increased", shape: "card-blob-c", pad: "px-5 pt-4" },
            { label: "Pending", value: "2", badge: "On Hold", soft: true, shape: "card-blob-d", pad: "pr-8" },
          ].map((card) => (
            <div
              key={card.label}
              className={`card-blob ${card.shape} border border-[#e4ebe7] bg-white p-3.5 ${card.pad}`}
            >
              <p className="text-xs text-[#7a867f]">{card.label}</p>
              <p className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">
                {card.value}
              </p>
              <span
                className={`mt-3 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  card.soft
                    ? "bg-[#e7f8ef] text-[#2f7a4d]"
                    : "bg-[#d9f5df] text-[#1f7a3b]"
                }`}
              >
                {card.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-3 xl:grid-cols-[1.35fr_1fr]">
        <section className="rounded-2xl bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-base font-bold">Sales Summary</h2>
            <div className="flex flex-wrap gap-0.5 rounded-full bg-[#eef1ef] p-0.5">
              {["1 Day", "1 Week", "1 Month", "1 Year"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRange(item)}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                    range === item
                      ? "bg-forest text-white"
                      : "text-[#66736c] hover:bg-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex h-40 items-end gap-2 sm:gap-3">
            {salesBars.map((bar, index) => (
              <div key={`${bar.day}-${index}`} className="relative flex flex-1 flex-col items-center gap-1.5">
                {bar.highlight ? (
                  <span className="absolute -top-6 rounded-full bg-forest px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {bar.value}%
                  </span>
                ) : null}
                <div
                  className={`w-full max-w-[34px] rounded-t-xl ${
                    bar.highlight
                      ? "bg-[repeating-linear-gradient(135deg,#1b3e2f_0_5px,#244a39_5px_10px)]"
                      : "bg-forest"
                  }`}
                  style={{ height: `${bar.value * 1.5}px` }}
                />
                <span className="text-[10px] font-medium text-[#7a867f]">{bar.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-3 shadow-sm sm:p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold">Reports</h2>
            <button
              type="button"
              onClick={() => toast.success("New report added")}
              className="rounded-full border border-[#d7ddd9] px-2.5 py-1 text-xs font-semibold transition hover:bg-[#f4f6f5]"
            >
              + New
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {reports.map((report) => (
              <button
                key={report.title}
                type="button"
                onClick={() => toast(`Opened ${report.title}`)}
                className={`flex w-full items-center justify-between rounded-xl ${report.tone} px-3 py-2.5 text-left transition hover:brightness-[0.98]`}
              >
                <div>
                  <p className="text-xs font-semibold">{report.title}</p>
                  <p className="mt-0.5 text-[10px] text-[#66736c]">{report.due}</p>
                </div>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/70 text-xs">
                  ↗
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.35fr_1fr]">
        <section className="rounded-2xl bg-white p-3 shadow-sm sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-base font-bold">Payments</h2>
            <button
              type="button"
              onClick={() => toast("Filters opened")}
              className="rounded-full border border-[#d7ddd9] px-2.5 py-1 text-xs font-semibold transition hover:bg-[#f4f6f5]"
            >
              + Filter
            </button>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="text-[#7a867f]">
                  <th className="px-2 py-2 font-medium">ID</th>
                  <th className="px-2 py-2 font-medium">Date</th>
                  <th className="px-2 py-2 font-medium">Cash</th>
                  <th className="px-2 py-2 font-medium">Rounding</th>
                  <th className="px-2 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((row) => (
                  <tr key={row.id} className="border-t border-[#eef1ef]">
                    <td className="px-2 py-2.5 font-semibold">{row.id}</td>
                    <td className="px-2 py-2.5 text-[#4d5a54]">{row.date}</td>
                    <td className="px-2 py-2.5 font-medium">{row.cash}</td>
                    <td className="px-2 py-2.5 text-[#4d5a54]">{row.rounding}</td>
                    <td className="px-2 py-2.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClass(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-xs text-[#7a867f]">Net Sales MTD</p>
              <p className="mt-0.5 font-display text-xl font-bold sm:text-2xl">$329,728.45</p>
            </div>
            <div className="rounded-xl bg-[#f4f6f5] px-2.5 py-1.5 text-right text-[10px] text-[#4d5a54]">
              <p>
                Date:{" "}
                <span className="font-semibold text-[#1c2420]">
                  October {selectedDay}, 2024
                </span>
              </p>
              <p className="mt-0.5">
                Amount:{" "}
                <span className="font-semibold text-[#1c2420]">$18,434.76</span>
              </p>
            </div>
          </div>

          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold">October 2024</p>
              <div className="flex gap-1 text-[#7a867f]">
                <button type="button" className="rounded-md px-1.5 py-0.5 text-xs hover:bg-[#f4f6f5]">
                  ‹
                </button>
                <button type="button" className="rounded-md px-1.5 py-0.5 text-xs hover:bg-[#f4f6f5]">
                  ›
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-[#7a867f]">
              {weekDays.map((day) => (
                <div key={day} className="py-1 font-medium">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) =>
                day ? (
                  <button
                    key={`${day}-${index}`}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`rounded-lg py-1 text-xs font-medium transition ${
                      selectedDay === day
                        ? "bg-forest text-white"
                        : "text-[#1c2420] hover:bg-[#f4f6f5]"
                    }`}
                  >
                    {day}
                  </button>
                ) : (
                  <div key={`blank-${index}`} />
                ),
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
