import { PageHero } from "@/components/wiki/page-hero";
import { glossaryTerms } from "@/data/wiki";
import { isLocale, type Locale } from "@/i18n/config";

const copy = {
  zh: {
    eyebrow: "Glossary",
    title: "牛肉术语表",
    description: "覆盖分割、等级、熟成、加工和进口贸易语境中的核心术语。",
    search: "搜索术语：油花、厂号、BMS...",
    all: "全部",
    misunderstanding: "常见误区",
  },
  en: {
    eyebrow: "Glossary",
    title: "Beef glossary",
    description: "Core terminology for cuts, grading, aging, processing, and import-trade contexts.",
    search: "Search terms: marbling, BMS, establishment...",
    all: "All",
    misunderstanding: "Common misunderstanding",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function GlossaryPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string; q?: string }> }) {
  const { locale: rawLocale } = await params;
  const { category, q } = await searchParams;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = copy[locale];
  const categories = Array.from(new Set(glossaryTerms.map((term) => term.category))).sort();
  const query = q?.toLowerCase().trim();
  const filtered = glossaryTerms.filter((term) => {
    const translation = term.translations[locale];
    const searchable = [translation.term, translation.englishTerm, translation.chineseTerm, translation.shortDefinition, translation.explanation, term.category].join(" ").toLowerCase();
    return (!category || term.category === category) && (!query || searchable.includes(query));
  });

  return (
    <div>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <form className="mb-8 grid gap-3 rounded-3xl border border-orange-200/15 bg-stone-950/45 p-4 md:grid-cols-[1fr_auto]">
        <input name="q" defaultValue={q ?? ""} placeholder={t.search} className="rounded-2xl border border-orange-200/15 bg-stone-950 px-4 py-3 text-orange-50 outline-none focus:border-orange-200/50" />
        <select name="category" defaultValue={category ?? ""} className="rounded-2xl border border-orange-200/15 bg-stone-950 px-4 py-3 text-orange-50 outline-none focus:border-orange-200/50">
          <option value="">{t.all}</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </form>
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((term) => {
          const item = term.translations[locale];
          return (
            <article key={term.slug} className="rounded-3xl border border-orange-200/15 bg-stone-950/45 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-orange-200/60">{term.category}</p>
              <h2 className="mt-3 text-2xl font-black">{item.term}</h2>
              <p className="mt-1 text-sm text-orange-100/55">{item.englishTerm} · {item.chineseTerm}</p>
              <p className="mt-4 text-orange-50/78 leading-7">{item.explanation}</p>
              <div className="mt-5 rounded-2xl bg-orange-950/30 p-4 text-sm leading-6 text-orange-50/70">
                <strong className="text-orange-100">{t.misunderstanding}：</strong>{item.commonMisunderstandings}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
