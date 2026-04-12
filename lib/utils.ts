export function daysRemaining(deadline: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline + "T00:00:00");
  const diff = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function parseMaxAmount(amount: string): number {
  const matches = amount.match(/[\d,]+/g);
  if (!matches) return 0;
  const numbers = matches.map((m) => parseInt(m.replace(/,/g, ""), 10));
  return Math.max(...numbers);
}

export function formatDollarK(total: number): string {
  if (total >= 1000) {
    return `$${Math.round(total / 1000)}K+`;
  }
  return `$${total}+`;
}

export type Grant = {
  id: number;
  name: string;
  funder: string;
  amount: string;
  deadline: string;
  status: "open" | "urgent";
  fit: "high" | "medium" | "low";
  bestFor: "TVS" | "SuperNova" | "Both";
  categories: string[];
  notes: string;
  url: string;
  portal: string;
  tags: string[];
};

export type ClosedGrant = {
  name: string;
  reason: string;
};

export type UpcomingGrant = {
  name: string;
  expected: string;
  amount: string;
  note: string;
};

export type GrantData = {
  lastScanned: string;
  grants: Grant[];
  closedGrants: ClosedGrant[];
  upcomingGrants: UpcomingGrant[];
  fiftharkGrants: FifthArkGrantSection;
};

export type FifthArkGrant = {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  priority: string;
  level: string;
  applicant: "FifthArk" | "SuperNova";
  administered_by?: string;
  portal?: string;
  status: string;
  deadline?: string;
  amount_display: string;
  action: string;
  fit_score: "Excellent" | "Good" | "Possible" | "Future" | "Watch";
  relevant_activities: string[];
  warnings: string[];
};

export type FifthArkPriorityItem = {
  rank: number;
  entity: "FifthArk" | "SuperNova";
  action: string;
  timeline: string;
  potential: string;
};

export type FifthArkResource = {
  name: string;
  url: string;
};

export type FifthArkGrantSection = {
  meta: {
    entities: {
      fifthark: { legal_name: string; abn: string; trading_as: string; type: string; profile: string; grant_eligibility: string };
      supernova: { legal_name: string; type: string; profile: string; grant_eligibility: string };
    };
    vendor_model: string;
    last_updated: string;
    disclaimer: string;
  };
  dealdesk_ai_grants: FifthArkGrant[];
  badminton_app_grants: {
    framing_principle: string;
    winning_language: string;
    pathway_a_fifthark: FifthArkGrant[];
    pathway_b_supernova: FifthArkGrant[];
  };
  priority_order: FifthArkPriorityItem[];
  resources: FifthArkResource[];
};

export type FilterType = "all" | "closing" | "strong" | "tvs" | "supernova";

export function filterGrants(grants: Grant[], filter: FilterType): Grant[] {
  switch (filter) {
    case "closing":
      return grants.filter((g) => daysRemaining(g.deadline) <= 7 && daysRemaining(g.deadline) >= 0);
    case "strong":
      return grants.filter((g) => g.fit === "high");
    case "tvs":
      return grants.filter((g) => g.bestFor === "TVS" || g.bestFor === "Both");
    case "supernova":
      return grants.filter(
        (g) => g.bestFor === "SuperNova" || g.bestFor === "Both"
      );
    default:
      return grants;
  }
}

export function sortByDeadline(grants: Grant[]): Grant[] {
  return [...grants].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );
}
