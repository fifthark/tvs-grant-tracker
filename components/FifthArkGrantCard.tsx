"use client";

import { useState } from "react";
import { FifthArkGrant } from "@/lib/utils";

type Props = { grant: FifthArkGrant };

const tierColors: Record<number, string> = {
  1: "bg-accent-red/15 text-accent-red-text border border-accent-red/20",
  2: "bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/20",
  3: "bg-bg-surface text-text-secondary border border-border-default",
};

const tierLabels: Record<number, string> = {
  1: "Tier 1 — Priority",
  2: "Tier 2 — Watch",
  3: "Tier 3 — Future",
};

const fitColors: Record<string, string> = {
  Excellent: "bg-accent-green/15 text-accent-green",
  Good: "bg-accent-indigo/15 text-accent-indigo-light",
  Possible: "bg-accent-yellow/15 text-accent-yellow",
  Future: "bg-bg-surface text-text-secondary",
  Watch: "bg-accent-indigo/10 text-accent-indigo-light",
};

const statusColors: Record<string, string> = {
  "Always Open": "bg-accent-green/15 text-accent-green",
  Open: "bg-accent-green/15 text-accent-green",
  "Open — Round 3": "bg-accent-green/15 text-accent-green",
  Monitor: "bg-accent-yellow/15 text-accent-yellow",
  Future: "bg-bg-surface text-text-secondary",
};

const levelColors: Record<string, string> = {
  Federal: "bg-accent-indigo/15 text-accent-indigo-light",
  State: "bg-accent-indigo/10 text-accent-indigo",
  Council: "bg-bg-surface text-text-secondary",
};

const tierBorderColors: Record<number, string> = {
  1: "border-l-accent-red",
  2: "border-l-accent-yellow",
  3: "border-l-bg-surface",
};

export default function FifthArkGrantCard({ grant }: Props) {
  const [expanded, setExpanded] = useState(false);
  const statusColor = statusColors[grant.status] ?? "bg-bg-surface text-text-secondary";

  return (
    <article
      className={`bg-bg-card border border-border-default rounded-lg border-l-4 ${tierBorderColors[grant.tier]} cursor-pointer transition-colors hover:border-border-active`}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(!expanded); }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <div className="p-4">
        {/* Badges row */}
        <div className="flex flex-wrap gap-2 mb-2">
          <span className={`font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded uppercase tracking-wider ${tierColors[grant.tier]}`}>
            {tierLabels[grant.tier]}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${statusColor}`}>
            {grant.status}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${levelColors[grant.level] ?? "bg-bg-surface text-text-secondary"}`}>
            {grant.level}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${fitColors[grant.fit_score] ?? "bg-bg-surface text-text-secondary"}`}>
            {grant.fit_score} Fit
          </span>
        </div>

        {/* Title + amount row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
          <div className="min-w-0">
            <h3 className="font-bold text-text-heading text-[15px] leading-snug">{grant.name}</h3>
            <p className="text-text-secondary text-sm">{grant.administered_by}</p>
          </div>
          <div className="md:text-right shrink-0">
            <p className="font-[family-name:var(--font-mono)] text-accent-yellow font-bold text-sm">{grant.amount_display}</p>
            <p className="text-text-secondary text-xs">{grant.deadline}</p>
          </div>
        </div>

        {/* Action callout */}
        <div className="mt-2 px-3 py-2 rounded bg-accent-indigo/8 border border-accent-indigo/20">
          <p className="text-accent-indigo-light text-xs leading-relaxed">
            <span className="uppercase tracking-wider font-semibold text-accent-indigo mr-1">Action:</span>
            {grant.action}
          </p>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-border-default space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-text-secondary mb-1">Why it fits</p>
              <p className="text-text-primary text-sm leading-relaxed">{grant.fit_notes}</p>
            </div>

            {grant.relevant_activities.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-text-secondary mb-1">Relevant activities</p>
                <ul className="space-y-1">
                  {grant.relevant_activities.map((a, i) => (
                    <li key={i} className="text-sm text-text-primary flex gap-2">
                      <span className="text-accent-green shrink-0">✓</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {grant.warnings.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-accent-yellow mb-1">Warnings</p>
                <ul className="space-y-1">
                  {grant.warnings.map((w, i) => (
                    <li key={i} className="text-sm text-accent-yellow flex gap-2">
                      <span className="shrink-0">⚠️</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={grant.portal}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-accent-indigo-light text-sm hover:underline inline-flex items-center gap-1"
            >
              View Grant Portal <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
