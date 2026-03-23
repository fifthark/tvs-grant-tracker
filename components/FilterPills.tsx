"use client";

import { FilterType } from "@/lib/utils";

type Props = {
  active: FilterType;
  onChange: (filter: FilterType) => void;
};

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "closing", label: "\ud83d\udd34 Closing Soon" },
  { id: "strong", label: "\u2b50 Strong Fit" },
  { id: "tvs", label: "TVS" },
  { id: "supernova", label: "SuperNova" },
];

export default function FilterPills({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            active === f.id
              ? "bg-accent-indigo text-white"
              : "bg-bg-surface text-text-secondary hover:text-text-primary"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
