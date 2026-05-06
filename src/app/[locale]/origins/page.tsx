import { PageHero } from "@/components/wiki/page-hero";
import { origins } from "@/data/wiki";
import { isLocale, type Locale } from "@/i18n/config";

const copy = {
  zh: {
    eyebrow: "Origins",
    title: "牛肉产地",
    description: "第一版先以概览方式展示主要牛肉产地、分级体系和出口语境，后续可扩展为产地详情库。",
    systems: "常见体系",
  },
  en: {
    eyebrow: "Origins",
    title: "Beef origins",
    description: "v1 provides origin overviews with grading and export context, leaving room for full origin detail pages later.",
    systems: "Common systems",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function OriginsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = copy[locale];

  return (
    <div>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="grid gap-5 md:grid-cols-3">
        {origins.map((origin) => {
          const item = origin.translations[locale];
          return (
            <article key={origin.slug} className="overflow-hidden rounded-3xl border border-orange-200/15 bg-stone-950/45">
              <div className="relative aspect-[16/9]">
                <img src={origin.coverImageUrl} alt={item.name} className="h-full w-full object-cover opacity-75" />
              </div>
              <div className="space-y-4 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-orange-200/60">{origin.countryCode}</p>
                <h2 className="text-2xl font-black">{item.name}</h2>
                <p className="text-sm leading-6 text-orange-50/72">{item.overview}</p>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-orange-200/55">{t.systems}</p>
                  <div className="flex flex-wrap gap-2">
                    {origin.commonGradeSystems.map((system) => <span key={system} className="rounded-full border border-orange-200/15 px-2.5 py-1 text-xs">{system}</span>)}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
