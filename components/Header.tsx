"use client";

import {
  Grant,
  daysRemaining,
  parseMaxAmount,
  formatDollarK,
  formatDate,
} from "@/lib/utils";

type Props = {
  grants: Grant[];
  lastScanned: string;
  dark: boolean;
  onToggleTheme: () => void;
};

export default function Header({
  grants,
  lastScanned,
  dark,
  onToggleTheme,
}: Props) {
  const activeGrants = grants.filter(
    (g) => g.status === "open" || g.status === "urgent"
  );
  const openCount = activeGrants.length;
  const closingThisWeek = activeGrants.filter(
    (g) => daysRemaining(g.deadline) <= 7 && daysRemaining(g.deadline) >= 0
  ).length;
  const strongFit = activeGrants.filter((g) => g.fit === "high").length;
  const maxPotential = activeGrants.reduce(
    (sum, g) => sum + parseMaxAmount(g.amount),
    0
  );

  const stats = [
    { label: "Open Grants", value: openCount, color: "text-accent-indigo" },
    {
      label: "Closing This Week",
      value: closingThisWeek,
      color: "text-accent-red",
    },
    { label: "Strong Fit", value: strongFit, color: "text-accent-green" },
    {
      label: "Max Potential",
      value: formatDollarK(maxPotential),
      color: "text-accent-yellow",
    },
  ];

  return (
    <header className="mb-8">
      <div
        className="rounded-xl p-8 mb-6 relative"
        style={{ background: "var(--header-gradient)" }}
      >
        <button
          onClick={onToggleTheme}
          className="absolute top-4 right-4 w-9 h-9 rounded-lg border border-border-default flex items-center justify-center text-text-secondary hover:text-text-heading transition-colors"
          style={{ backgroundColor: dark ? "rgba(30,41,59,0.8)" : "rgba(255,255,255,0.8)" }}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent-indigo mb-2">
          Grant Intelligence
        </p>
        <h1 className="font-[family-name:var(--font-mono)] text-2xl md:text-3xl font-bold text-text-heading mb-2">
          <span className="bg-gradient-to-r from-accent-indigo-light via-accent-indigo to-accent-green bg-clip-text text-transparent">
            TVS & SuperNova — Open Grants
          </span>
        </h1>
        <p className="text-text-secondary text-sm">
          Last scanned: {formatDate(lastScanned)}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-bg-card border border-border-default rounded-lg p-4"
            style={{ boxShadow: "var(--card-shadow)" }}
          >
            <p className="text-xs uppercase tracking-[0.15em] text-text-secondary mb-1">
              {stat.label}
            </p>
            <p
              className={`font-[family-name:var(--font-mono)] text-2xl font-bold ${stat.color}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </header>
  );
}
