"use client";

import { useState, useEffect } from "react";
import grantsData from "@/data/grants.json";
import Header from "@/components/Header";
import ViewTabs, { ViewType } from "@/components/ViewTabs";
import FilterPills from "@/components/FilterPills";
import GrantCard from "@/components/GrantCard";
import ClosedGrantCard from "@/components/ClosedGrant";
import UpcomingGrantCard from "@/components/UpcomingGrant";
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

        <footer className="mt-12 pt-6 border-t border-border-default text-center text-text-secondary text-xs">
          <p>TVS & SuperNova Grant Tracker — Data maintained via Claude.ai</p>
        </footer>
      </main>
    </div>
  );
}
