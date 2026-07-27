"use client";

import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

type MachineForm = {
  name: string;
  serial: string;
  location: string;
  ip: string;
  model: string;
};

const initialForm: MachineForm = {
  name: "",
  serial: "",
  location: "",
  ip: "",
  model: "BioTime Pro",
};

const registered = [
  { id: "BT-1001", name: "BioTime Front Desk", serial: "SN-88421", model: "BioTime Pro" },
  { id: "BT-1002", name: "BioTime Warehouse Gate", serial: "SN-88455", model: "BioTime Lite" },
  { id: "BT-1003", name: "BioTime Production Floor", serial: "SN-88502", model: "BioTime Pro" },
];

export default function MachineManagementPage() {
  const [form, setForm] = useState<MachineForm>(initialForm);
  const [machines, setMachines] = useState(registered);

  function updateField<K extends keyof MachineForm>(key: K, value: MachineForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.serial.trim() || !form.ip.trim()) {
      toast.error("Name, serial, and IP are required");
      return;
    }

    const nextId = `BT-${1000 + machines.length + 1}`;
    setMachines((prev) => [
      ...prev,
      {
        id: nextId,
        name: form.name.trim(),
        serial: form.serial.trim(),
        model: form.model,
      },
    ]);
    setForm(initialForm);
    toast.success("Machine registered");
  }

  return (
    <div className="grid gap-3 xl:grid-cols-[1fr_1.1fr]">
      <section className="rounded-2xl bg-white p-3 shadow-sm sm:p-4">
        <div>
          <h1 className="font-display text-lg font-bold sm:text-xl">Machine Management</h1>
          <p className="mt-0.5 text-xs text-[#7a867f]">
            Register, update, and configure attendance machines
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-[#4d5a54]">Machine Name</span>
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. BioTime Front Desk"
              className="w-full rounded-xl border border-[#e4e9e6] bg-[#fbfcfb] px-3 py-2 text-xs outline-none transition focus:border-forest"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-[#4d5a54]">Serial Number</span>
            <input
              value={form.serial}
              onChange={(e) => updateField("serial", e.target.value)}
              placeholder="e.g. SN-88901"
              className="w-full rounded-xl border border-[#e4e9e6] bg-[#fbfcfb] px-3 py-2 text-xs outline-none transition focus:border-forest"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-[#4d5a54]">Location</span>
            <input
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="e.g. Head Office — Lobby"
              className="w-full rounded-xl border border-[#e4e9e6] bg-[#fbfcfb] px-3 py-2 text-xs outline-none transition focus:border-forest"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-[#4d5a54]">IP Address</span>
            <input
              value={form.ip}
              onChange={(e) => updateField("ip", e.target.value)}
              placeholder="e.g. 192.168.1.60"
              className="w-full rounded-xl border border-[#e4e9e6] bg-[#fbfcfb] px-3 py-2 text-xs outline-none transition focus:border-forest"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold text-[#4d5a54]">Model</span>
            <select
              value={form.model}
              onChange={(e) => updateField("model", e.target.value)}
              className="w-full rounded-xl border border-[#e4e9e6] bg-[#fbfcfb] px-3 py-2 text-xs outline-none transition focus:border-forest"
            >
              <option>BioTime Pro</option>
              <option>BioTime Lite</option>
              <option>BioTime Access</option>
            </select>
          </label>

          <button
            type="submit"
            className="rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white transition hover:bg-forest-soft"
          >
            Register Machine
          </button>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-3 shadow-sm sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-base font-bold">Registered Machines</h2>
          <span className="rounded-full bg-[#eef1ef] px-2.5 py-1 text-[10px] font-semibold text-[#4d5a54]">
            {machines.length} devices
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {machines.map((machine, index) => {
            const shapes = ["card-blob-a", "card-blob-b", "card-blob-c", "card-blob-d"] as const;
            const shape = shapes[index % shapes.length];
            const padClass = shape === "card-blob-b" ? "pl-8 pr-4" : "pr-8";

            return (
              <div
                key={machine.id}
                className={`card-blob ${shape} flex flex-wrap items-center justify-between gap-2 border border-[#e4ebe7] bg-white px-3 py-2.5 ${padClass}`}
              >
                <div>
                  <p className="text-xs font-semibold">{machine.name}</p>
                  <p className="mt-0.5 text-[10px] text-[#7a867f]">
                    {machine.id} · {machine.serial} · {machine.model}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => toast(`Editing ${machine.name}`)}
                    className="rounded-full border border-[#d7ddd9] px-2.5 py-1 text-[10px] font-semibold transition hover:bg-white"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMachines((prev) => prev.filter((item) => item.id !== machine.id));
                      toast.success(`${machine.name} removed`);
                    }}
                    className="rounded-full border border-[#f0d9d9] px-2.5 py-1 text-[10px] font-semibold text-[#9a3b3b] transition hover:bg-[#fff5f5]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
