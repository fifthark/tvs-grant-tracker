"use client";

import { useState } from "react";
import { FifthArkGrant } from "@/lib/utils";

type Props = { grant: FifthArkGrant };

const tierBorder: Record<number, string> = { 1: "border-l-accent-red", 2: "border-l-accent-yellow", 3: "border-l-bg-surface" };
const tierBadge: Record<number, string> = {
  1: "bg-accent-red/15 text-accent-red-text border border-accent-red/20",
  2: "bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/20",
  3: "bg-bg-surface text-text-secondary border border-border-default",
};
const tierLabel: Record<number, string> = { 1: "Tier 1", 2: "Tier 2", 3: "Tier 3" };

const fitBadge: Record<string, string> = {
  Excellent: "bg-accent-green/15 text-accent-green",
  Good: "bg-accent-indigo/15 text-accent-indigo-light",
  Possible: "bg-accent-yellow/15 text-accent-yellow",
  Future: "bg-bg-surface text-text-secondary",
  Watch: "bg-accent-indigo/10 text-accent-indigo",
};

const statusBadge = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("always open")) return "bg-accent-green/15 text-accent-green";
  if (s.includes("open")) return "bg-accent-green/15 text-accent-green";
  if (s.includes("closed")) return "bg-accent-yellow/15 text-accent-yellow";
  if (s.includes("monitor") || s.includes("check") || s.includes("investigate")) return "bg-accent-yellow/15 text-accent-yellow";
  if (s.includes("future") || s.includes("standing")) return "bg-bg-surface text-text-secondary";
  return "bg-bg-surface text-text-secondary";
};

const applicantBadge: Record<string, string> = {
  FifthArk: "bg-[rgba(139,92,246,0.15)] text-[#c084fc]",
  SuperNova: "bg-[rgba(59,130,246,0.15)] text-[#60a5fa]",
};

export default function FifthArkGrantCard({ grant }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`bg-bg-card border border-border-default rounded-lg border-l-4 ${tierBorder[grant.tier]} cursor-pointer transition-colors hover:border-border-active`}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(!expanded); } }}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <div className="p-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className={`font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded uppercase tracking-wider ${tierBadge[grant.tier]}`}>
            {tierLabel[grant.tier]}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${applicantBadge[grant.applicant] ?? "bg-bg-surface text-text-secondary"}`}>
            {grant.applicant}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${statusBadge(grant.status)}`}>
            {grant.status}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded ${fitBadge[grant.fit_score] ?? "bg-bg-surface text-text-secondary"}`}>
            {grant.fit_score} Fit
          </span>
        </div>

        {/* Title + amount */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
          <div className="min-w-0">
            <h3 className="font-bold text-text-heading text-[15px] leading-snug">{grant.name}</h3>
            {grant.administered_by && <p className="text-text-secondary text-sm">{grant.administered_by}</p>}
          </div>
          <div className="md:text-right shrink-0">
            <p className="font-[family-name:var(--font-mono)] text-accent-yellow font-bold text-sm">{grant.amount_display}</p>
            {grant.deadline && <p className="text-text-secondary text-xs">{grant.deadline}</p>}
          </div>
        </div>

        {/* Action */}
        <div className="mt-2 px-3 py-2 rounded bg-accent-indigo/8 border border-accent-indigo/20">
          <p className="text-accent-indigo-light text-xs leading-relaxed">
            <span className="uppercase tracking-wider font-semibold text-accent-indigo mr-1">Action:</span>
            {grant.action}
          </p>
        </div>

        {/* Expanded */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-border-default space-y-3">
            {grant.relevant_activities.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-text-secondary mb-1">Relevant activities</p>
                <ul className="space-y-1">
                  {grant.relevant_activities.map((a, i) => (
                    <li key={i} className="text-sm text-text-primary flex gap-2">
                      <span className="text-accent-green shrink-0">✓</span><span>{a}</span>
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
                      <span className="shrink-0">⚠️</span><span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {grant.portal && (
              <a
                href={grant.portal}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-accent-indigo-light text-sm hover:underline inline-flex items-center gap-1"
              >
                View Grant Portal →
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
