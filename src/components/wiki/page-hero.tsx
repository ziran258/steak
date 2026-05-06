export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="mx-auto max-w-4xl py-14 text-center md:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-200/70">{eyebrow}</p>
      <h1 className="mt-5 text-4xl font-black tracking-tight text-orange-50 md:text-6xl">{title}</h1>
      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-orange-50/72">{description}</p>
    </section>
  );
}
