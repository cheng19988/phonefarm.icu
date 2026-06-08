type Props = {
  specs: Record<string, string>;
  title?: string;
};

export function SpecTable({ specs, title = "Technical Specifications" }: Props) {
  const entries = Object.entries(specs);
  if (entries.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-5">{title}</h2>
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm">
          <tbody>
            {entries.map(([k, v], i) => (
              <tr
                key={k}
                className={i % 2 === 0 ? "bg-[var(--surface-muted)]/50" : "bg-white"}
              >
                <td className="py-3.5 px-5 text-[var(--text-subtle)] w-2/5 font-medium border-b border-[var(--border)] last:border-0">
                  {k}
                </td>
                <td className="py-3.5 px-5 text-[var(--text)] border-b border-[var(--border)] last:border-0">
                  {v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
