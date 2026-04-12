"use client";

import { useState, useEffect } from "react";
import grantsData from "@/data/grants.json";
import Header from "@/components/Header";
import ViewTabs, { ViewType } from "@/components/ViewTabs";
import FilterPills from "@/components/FilterPills";
import GrantCard from "@/components/GrantCard";
import ClosedGrantCard from "@/components/ClosedGrant";
import UpcomingGrantCard from "@/components/UpcomingGrant";
import FifthArkGrantCard from "@/components/FifthArkGrantCard";
import {
  GrantData,
  FilterType,
  filterGrants,
  sortByDeadline,
} from "@/lib/utils";

const data = grantsData as GrantData;

export default function Home() {
  const [view, setView] = useState<ViewType>("open");
  const [filter, setFilter] = useState<FilterType>("all");
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDark(isDark);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  const toggleTheme = () => setDark((d) => !d);

  const activeGrants = data.grants.filter(
    (g) => g.status === "open" || g.status === "urgent"
  );
  const filtered = sortByDeadline(filterGrants(activeGrants, filter));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <main className="max-w-[960px] mx-auto px-5 sm:px-8 md:px-12 py-8">
        <Header
          grants={data.grants}
          lastScanned={data.lastScanned}
          dark={dark}
          onToggleTheme={toggleTheme}
        />
        <ViewTabs active={view} onChange={setView} />

        {view === "open" && (
          <>
            <FilterPills active={filter} onChange={setFilter} />
            <div className="flex flex-col gap-3">
              {filtered.length === 0 ? (
                <p className="text-text-secondary text-center py-8">
                  No grants match this filter.
                </p>
              ) : (
                filtered.map((grant) => (
                  <GrantCard key={grant.id} grant={grant} />
                ))
              )}
            </div>
          </>
        )}

        {view === "closed" && (
          <div className="flex flex-col gap-3">
            {data.closedGrants.map((grant) => (
              <ClosedGrantCard key={grant.name} grant={grant} />
            ))}
          </div>
        )}

        {view === "upcoming" && (
          <div className="flex flex-col gap-3">
            {data.upcomingGrants.map((grant) => (
              <UpcomingGrantCard key={grant.name} grant={grant} />
            ))}
          </div>
        )}

        {view === "fifthark" && (
          <div>
            {/* Meta header */}
            <div className="mb-6 p-4 rounded-lg bg-bg-card border border-border-default">
              <p className="text-xs uppercase tracking-wider text-text-secondary mb-1">Entity</p>
              <p className="text-text-heading font-bold">{data.fiftharkGrants.meta.entity} <span className="text-text-secondary font-normal">({data.fiftharkGrants.meta.trading_as})</span></p>
              <p className="text-text-secondary text-sm">ABN {data.fiftharkGrants.meta.abn} · {data.fiftharkGrants.meta.profile}</p>
              <p className="text-text-secondary text-xs mt-2">Last updated: {data.fiftharkGrants.meta.last_updated} · Next review: 1 Jul 2026</p>
            </div>

            {/* Priority action list */}
            <div className="mb-6">
              <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-text-secondary mb-3">Priority Actions</h2>
              <div className="flex flex-col gap-2">
                {data.fiftharkGrants.strategy.map((s) => (
                  <div key={s.rank} className="flex gap-3 p-3 rounded-lg bg-bg-card border border-border-default">
                    <span className="font-[family-name:var(--font-mono)] text-accent-indigo font-bold text-sm shrink-0 w-5">{s.rank}.</span>
                    <div className="min-w-0">
                      <p className="text-text-heading text-sm font-medium">{s.action}</p>
                      <p className="text-text-secondary text-xs mt-0.5">{s.why}</p>
                    </div>
                    <span className="shrink-0 text-xs px-2 py-0.5 h-fit rounded bg-bg-surface text-text-secondary whitespace-nowrap">{s.timeline}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/20 rounded p-3">
                ⚠️ If you receive a government grant for R&D work, that amount reduces your claimable RDTI expenditure dollar-for-dollar. Plan with your accountant.
              </p>
            </div>

            {/* Grant cards */}
            <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-text-secondary mb-3">Grant Programs</h2>
            <div className="flex flex-col gap-3 mb-8">
              {data.fiftharkGrants.grants.map((grant) => (
                <FifthArkGrantCard key={grant.id} grant={grant} />
              ))}
            </div>

            {/* Resources */}
            <div>
              <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-text-secondary mb-3">Grant Portals & Resources</h2>
              <div className="flex flex-wrap gap-2">
                {data.fiftharkGrants.resources.map((r) => (
                  <a
                    key={r.name}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1.5 rounded bg-bg-card border border-border-default text-accent-indigo-light hover:border-accent-indigo transition-colors"
                  >
                    {r.name} →
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs text-text-secondary border-t border-border-default pt-4">
              {data.fiftharkGrants.meta.disclaimer}
            </p>
          </div>
        )}

        <footer className="mt-12 pt-6 border-t border-border-default text-center text-text-secondary text-xs">
          <p>TVS & SuperNova Grant Tracker — Data maintained via Claude.ai</p>
        </footer>
      </main>
    </div>
  );
}
