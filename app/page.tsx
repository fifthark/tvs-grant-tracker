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

type FifthArkSubTab = "dealdesk" | "badminton";
type BadmintonPathway = "fifthark" | "supernova";

export default function Home() {
  const [view, setView] = useState<ViewType>("open");
  const [filter, setFilter] = useState<FilterType>("all");
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [faSubTab, setFaSubTab] = useState<FifthArkSubTab>("dealdesk");
  const [badmintonPathway, setBadmintonPathway] = useState<BadmintonPathway>("fifthark");

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
            {/* Vendor model callout */}
            <div className="mb-6 p-4 rounded-lg border border-accent-indigo/30 bg-accent-indigo/5">
              <p className="text-xs uppercase tracking-wider text-accent-indigo mb-1">Vendor Model</p>
              <p className="text-text-primary text-sm leading-relaxed">{data.fiftharkGrants.meta.vendor_model}</p>
            </div>

            {/* Entity summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-lg bg-bg-card border border-border-default">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-[rgba(139,92,246,0.15)] text-[#c084fc]">FifthArk</span>
                  <p className="text-text-secondary text-xs">{data.fiftharkGrants.meta.entities.fifthark.type}</p>
                </div>
                <p className="text-text-heading font-bold text-sm">{data.fiftharkGrants.meta.entities.fifthark.legal_name}</p>
                <p className="text-text-secondary text-xs mt-1">{data.fiftharkGrants.meta.entities.fifthark.grant_eligibility}</p>
              </div>
              <div className="p-4 rounded-lg bg-bg-card border border-border-default">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-[rgba(59,130,246,0.15)] text-[#60a5fa]">SuperNova</span>
                  <p className="text-text-secondary text-xs">{data.fiftharkGrants.meta.entities.supernova.type}</p>
                </div>
                <p className="text-text-heading font-bold text-sm">{data.fiftharkGrants.meta.entities.supernova.legal_name}</p>
                <p className="text-text-secondary text-xs mt-1">{data.fiftharkGrants.meta.entities.supernova.grant_eligibility}</p>
              </div>
            </div>

            {/* Priority action list */}
            <div className="mb-6">
              <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-text-secondary mb-3">Priority Actions — All 9</h2>
              <div className="flex flex-col gap-2">
                {data.fiftharkGrants.priority_order.map((s) => (
                  <div key={s.rank} className="flex gap-3 p-3 rounded-lg bg-bg-card border border-border-default">
                    <span className="font-[family-name:var(--font-mono)] text-accent-indigo font-bold text-sm shrink-0 w-5">{s.rank}.</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${s.entity === "FifthArk" ? "bg-[rgba(139,92,246,0.15)] text-[#c084fc]" : "bg-[rgba(59,130,246,0.15)] text-[#60a5fa]"}`}>{s.entity}</span>
                      </div>
                      <p className="text-text-heading text-sm font-medium">{s.action}</p>
                      <p className="text-accent-green text-xs mt-0.5">{s.potential}</p>
                    </div>
                    <span className="shrink-0 text-xs px-2 py-0.5 h-fit rounded bg-bg-surface text-text-secondary whitespace-nowrap">{s.timeline}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/20 rounded p-3">
                ⚠️ Government grants received for R&D work reduce claimable RDTI expenditure dollar-for-dollar. Plan which funding source applies to which activity with your accountant.
              </p>
            </div>

            {/* Sub-tabs: DealDesk AI | Badminton App */}
            <nav className="flex gap-1 mb-6 border-b border-border-default">
              {(["dealdesk", "badminton"] as FifthArkSubTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFaSubTab(tab)}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${faSubTab === tab ? "text-accent-indigo-light" : "text-text-secondary hover:text-text-primary"}`}
                >
                  {tab === "dealdesk" ? "DealDesk AI Grants" : "Badminton App Grants"}
                  {faSubTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-indigo" />}
                </button>
              ))}
            </nav>

            {faSubTab === "dealdesk" && (
              <div className="flex flex-col gap-3 mb-8">
                {data.fiftharkGrants.dealdesk_ai_grants.map((grant) => (
                  <FifthArkGrantCard key={grant.id} grant={grant} />
                ))}
              </div>
            )}

            {faSubTab === "badminton" && (
              <div>
                {/* Framing guidance */}
                <div className="mb-5 p-4 rounded-lg bg-accent-green/5 border border-accent-green/20">
                  <p className="text-xs uppercase tracking-wider text-accent-green mb-1">Framing Principle</p>
                  <p className="text-text-primary text-sm leading-relaxed mb-2">{data.fiftharkGrants.badminton_app_grants.framing_principle}</p>
                  <p className="text-text-secondary text-xs italic">"{data.fiftharkGrants.badminton_app_grants.winning_language}"</p>
                </div>

                {/* Pathway sub-tabs */}
                <div className="flex gap-2 mb-5">
                  {(["fifthark", "supernova"] as BadmintonPathway[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setBadmintonPathway(p)}
                      className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${badmintonPathway === p
                        ? p === "fifthark" ? "bg-[rgba(139,92,246,0.2)] text-[#c084fc] border border-[rgba(139,92,246,0.4)]" : "bg-[rgba(59,130,246,0.2)] text-[#60a5fa] border border-[rgba(59,130,246,0.4)]"
                        : "bg-bg-surface text-text-secondary hover:text-text-primary border border-border-default"}`}
                    >
                      {p === "fifthark" ? "Pathway A — FifthArk (Tech)" : "Pathway B — SuperNova (Sport)"}
                    </button>
                  ))}
                </div>

                {badmintonPathway === "fifthark" && (
                  <div className="flex flex-col gap-3">
                    {data.fiftharkGrants.badminton_app_grants.pathway_a_fifthark.map((grant) => (
                      <FifthArkGrantCard key={grant.id} grant={grant} />
                    ))}
                  </div>
                )}

                {badmintonPathway === "supernova" && (
                  <div className="flex flex-col gap-3">
                    {data.fiftharkGrants.badminton_app_grants.pathway_b_supernova.map((grant) => (
                      <FifthArkGrantCard key={grant.id} grant={grant} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Resources */}
            <div className="mt-8">
              <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-text-secondary mb-3">Grant Portals & Resources</h2>
              <div className="flex flex-wrap gap-2">
                {data.fiftharkGrants.resources.map((r) => (
                  <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="text-sm px-3 py-1.5 rounded bg-bg-card border border-border-default text-accent-indigo-light hover:border-accent-indigo transition-colors">
                    {r.name} →
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs text-text-secondary border-t border-border-default pt-4">
              {data.fiftharkGrants.meta.disclaimer} Last updated: {data.fiftharkGrants.meta.last_updated}
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
