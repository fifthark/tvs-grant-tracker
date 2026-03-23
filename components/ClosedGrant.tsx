import { ClosedGrant as ClosedGrantType } from "@/lib/utils";

type Props = {
  grant: ClosedGrantType;
};

export default function ClosedGrant({ grant }: Props) {
  return (
    <article
      className="bg-bg-card border border-border-default rounded-lg p-4 opacity-60"
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <h3 className="font-bold text-text-heading text-[15px] mb-1">
        {grant.name}
      </h3>
      <p className="text-text-secondary text-sm">{grant.reason}</p>
    </article>
  );
}
