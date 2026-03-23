import { UpcomingGrant as UpcomingGrantType } from "@/lib/utils";

type Props = {
  grant: UpcomingGrantType;
};

export default function UpcomingGrant({ grant }: Props) {
  return (
    <article
      className="bg-bg-card border border-border-default rounded-lg border-l-4 border-l-accent-indigo p-4"
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
        <h3 className="font-bold text-text-heading text-[15px]">
          {grant.name}
        </h3>
        <div className="md:text-right shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-accent-yellow font-bold text-sm">
            {grant.amount}
          </p>
          <p className="text-accent-indigo-light text-xs">{grant.expected}</p>
        </div>
      </div>
      <p className="text-text-secondary text-sm">{grant.note}</p>
    </article>
  );
}
