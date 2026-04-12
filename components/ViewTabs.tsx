"use client";

export type ViewType = "open" | "closed" | "upcoming" | "fifthark";

type Props = {
  active: ViewType;
  onChange: (view: ViewType) => void;
};

const tabs: { id: ViewType; label: string }[] = [
  { id: "open", label: "Currently Open" },
  { id: "closed", label: "Recently Closed" },
  { id: "upcoming", label: "Coming Soon" },
  { id: "fifthark", label: "FifthArk / Innovation" },
];

export default function ViewTabs({ active, onChange }: Props) {
  return (
    <nav className="flex gap-1 mb-6 border-b border-border-default" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            active === tab.id
              ? "text-accent-indigo-light"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {tab.label}
          {active === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-indigo" />
          )}
        </button>
      ))}
    </nav>
  );
}
