import { PageHero } from "@/components/wiki/page-hero";
import { grades, origins } from "@/data/wiki";
import { isLocale, type Locale } from "@/i18n/config";

const copy = {
  zh: {
    eyebrow: "Grades",
    title: "等级与体系",
    description: "展示 USDA、MSA、日本 A5、澳洲 MB 等常见等级/体系，强调不同体系不可简单横向换算。",
    criteria: "评价逻辑",
    market: "市场含义",
    misunderstanding: "常见误区",
  },
  en: {
    eyebrow: "Grades",
    title: "Grades and systems",
    description: "A concise view of USDA, MSA, Japanese A5, Australian MB, and why systems should not be directly converted.",
    criteria: "Criteria",
    market: "Market meaning",
    misunderstanding: "Common misunderstanding",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function GradesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = copy[locale];

  return (
    <div>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="grid gap-5 md:grid-cols-2">
        {grades.map((grade) => {
          const item = grade.translations[locale];
          const origin = origins.find((entry) => entry.slug === grade.originSlug);
          return (
            <article key={grade.slug} className="rounded-3xl border border-orange-200/15 bg-stone-950/45 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-orange-200/60">{grade.systemName} · {origin?.translations[locale].name}</p>
              <h2 className="mt-3 text-2xl font-black">{item.name}</h2>
              <p className="mt-4 text-orange-50/78 leading-7">{item.overview}</p>
              <dl className="mt-5 space-y-3 text-sm leading-6 text-orange-50/70">
                <div><dt className="font-bold text-orange-100">{t.criteria}</dt><dd>{item.criteria}</dd></div>
                <div><dt className="font-bold text-orange-100">{t.market}</dt><dd>{item.marketMeaning}</dd></div>
                <div><dt className="font-bold text-orange-100">{t.misunderstanding}</dt><dd>{item.commonMisunderstandings}</dd></div>
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
}
