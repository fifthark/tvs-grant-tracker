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
