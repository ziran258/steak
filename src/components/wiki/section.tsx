export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-orange-200/15 bg-orange-950/20 p-6 shadow-2xl shadow-stone-950/20">
      <h2 className="mb-4 text-xl font-bold text-orange-50">{title}</h2>
      <div className="space-y-4 text-orange-50/78 leading-7">{children}</div>
    </section>
  );
}
