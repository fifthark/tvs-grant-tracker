"use client";

import { useState } from "react";
import { Grant, daysRemaining, formatDate } from "@/lib/utils";

type Props = {
  grant: Grant;
};

const fitColors: Record<string, string> = {
  high: "border-l-accent-green",
  medium: "border-l-accent-yellow",
  low: "border-l-border-default",
};

const fitLabels: Record<string, string> = {
  high: "Strong Fit",
  medium: "Moderate Fit",
  low: "Conditional",
};

const fitBadgeColors: Record<string, string> = {
  high: "bg-accent-green/15 text-accent-green",
  medium: "bg-accent-yellow/15 text-accent-yellow",
  low: "bg-bg-surface text-text-secondary",
};

export default function GrantCard({ grant }: Props) {
  const [expanded, setExpanded] = useState(false);
  const days = daysRemaining(grant.deadline);
  const isPastDeadline = days < 0;
  const isUrgent = days <= 7 && days >= 0;

  return (
    <article
      className={`bg-bg-card border border-border-default rounded-lg border-l-4 ${fitColors[grant.fit]} cursor-pointer transition-all hover:border-border-active`}
      style={{ boxShadow: "var(--card-shadow)" }}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded(!expanded);
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <div className="p-4">
        {/* Badges row */}
        <div className="flex flex-wrap gap-2 mb-2">
          {isPastDeadline ? (
            <span className="font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded bg-bg-surface text-text-secondary uppercase tracking-wider">
              Closed
            </span>
          ) : (
            <span
              className={`font-[family-name:var(--font-mono)] text-xs px-2 py-0.5 rounded uppercase tracking-wider ${
                isUrgent
                  ? "bg-accent-red/15 text-accent-red-text"
                  : ""
              }`}
              style={
                !isUrgent
                  ? {
                      backgroundColor: "var(--badge-blue-bg)",
                      color: "var(--badge-blue-text)",
                    }
                  : undefined
              }
            >
              {days <= 1 ? `${days}d LEFT` : `${days} DAYS`}
            </span>
          )}
          <span
            className={`text-xs px-2 py-0.5 rounded ${fitBadgeColors[grant.fit]}`}
          >
            {fitLabels[grant.fit]}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={
              grant.bestFor === "TVS"
                ? {
                    backgroundColor: "var(--badge-purple-bg)",
                    color: "var(--badge-purple-text)",
                  }
                : grant.bestFor === "SuperNova"
                ? {
                    backgroundColor: "var(--badge-blue-bg)",
                    color: "var(--badge-blue-text)",
                  }
                : {
                    backgroundColor: "var(--badge-indigo-bg)",
                    color: "var(--a-indigo-light)",
                  }
            }
          >
            {grant.bestFor}
          </span>
        </div>

        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
          <div className="min-w-0">
            <h3 className="font-bold text-text-heading text-[15px] leading-snug">
              {grant.name}
            </h3>
            <p className="text-text-secondary text-sm">{grant.funder}</p>
          </div>
          <div className="md:text-right shrink-0">
            <p className="font-[family-name:var(--font-mono)] text-accent-yellow font-bold text-sm">
              {grant.amount}
            </p>
            <p className="text-text-secondary text-xs">
              {formatDate(grant.deadline)}
            </p>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-border-default">
            <p className="text-text-primary text-sm mb-3 leading-relaxed">
              {grant.notes}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {grant.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-0.5 rounded bg-bg-surface text-text-secondary"
                >
                  {cat}
                </span>
              ))}
            </div>
            <p className="text-text-secondary text-xs mb-3">
              Portal: {grant.portal}
            </p>
            <a
              href={grant.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-accent-indigo-light text-sm hover:underline inline-flex items-center gap-1"
            >
              View Grant Details
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
