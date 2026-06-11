import Link from "next/link";

type Props = {
  slug: string;
};

const NOTICES: Record<string, { title: string; body: string }> = {
  "iphone-phone-farm": {
    title: "Chassis-only product photos",
    body:
      "Gallery images show the iPhone rack chassis, slot layout, and rear cooling/PSU bay — not bundled iPhones. You supply devices; we confirm Lightning vs USB-C cable routing in your quote.",
  },
  "cooling-solution": {
    title: "Module + rack airflow reference",
    body:
      "Photos include the fan module and rack rear airflow layout. Exact fan count and CFM rating are confirmed per rack model in your quotation.",
  },
  "remote-control-setup": {
    title: "Workshop setup service",
    body:
      "This SKU is a configuration service — gallery shows workstation and connectivity reference. Scope covers ADB/iOS detection walkthrough after your rack hardware is delivered.",
  },
};

export function ChassisPhotoNotice({ slug }: Props) {
  const notice = NOTICES[slug];
  if (!notice) return null;

  return (
    <div className="mb-6 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/60">
      <p className="text-sm font-semibold text-[var(--text)] mb-1">{notice.title}</p>
      <p className="text-sm text-[var(--text-muted)] leading-relaxed">{notice.body}</p>
      {slug === "iphone-phone-farm" && (
        <p className="text-xs text-[var(--text-subtle)] mt-2">
          See also{" "}
          <Link href="/knowledge-base/remote-control-setup-guide" className="text-[var(--brand)] hover:underline">
            Remote Control Setup
          </Link>{" "}
          and{" "}
          <Link href="/packages/iphone-farm-suite" className="text-[var(--brand)] hover:underline">
            iPhone Farm Suite
          </Link>
          .
        </p>
      )}
    </div>
  );
}
