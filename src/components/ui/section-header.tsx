type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionHeader({ eyebrow, title, subtitle, align = "left", dark, className = "" }: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && <p className={`eyebrow ${dark ? "" : ""}`}>{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`section-subtitle ${align === "center" ? "mx-auto" : ""} mb-0`}>{subtitle}</p>}
    </div>
  );
}
