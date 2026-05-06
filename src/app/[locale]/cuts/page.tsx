import { CutCard } from "@/components/wiki/cut-card";
import { PageHero } from "@/components/wiki/page-hero";
import { cuts } from "@/data/wiki";
import { isLocale, type Locale } from "@/i18n/config";

const copy = {
  zh: {
    eyebrow: "Cuts",
    title: "牛排部位",
    description: "按结构化 Wiki 方式理解部位来源、肌肉结构、市场名称和常见用途。",
    all: "全部",
  },
  en: {
    eyebrow: "Cuts",
    title: "Steak cuts",
    description: "A structured wiki view of anatomy, muscle structure, market names, and common uses.",
    all: "All",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function CutsPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string; q?: string }> }) {
  const { locale: rawLocale } = await params;
  const { category, q } = await searchParams;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = copy[locale];
  const categories = Array.from(new Set(cuts.map((cut) => cut.category))).sort();
  const query = q?.toLowerCase().trim();
  const filtered = cuts.filter((cut) => {
    const translation = cut.translations[locale];
    const matchesCategory = !category || cut.category === category;
    const searchable = [translation.name, translation.englishName, translation.shortDefinition, ...translation.aliases, cut.slug, cut.category].join(" ").toLowerCase();
    return matchesCategory && (!query || searchable.includes(query));
  });

  return (
    <div>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <form className="mb-8 grid gap-3 rounded-3xl border border-orange-200/15 bg-stone-950/45 p-4 md:grid-cols-[1fr_auto]">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder={locale === "zh" ? "搜索：肋眼、Ribeye、油花..." : "Search: ribeye, marbling, flank..."}
          className="rounded-2xl border border-orange-200/15 bg-stone-950 px-4 py-3 text-orange-50 outline-none focus:border-orange-200/50"
        />
        <select name="category" defaultValue={category ?? ""} className="rounded-2xl border border-orange-200/15 bg-stone-950 px-4 py-3 text-orange-50 outline-none focus:border-orange-200/50">
          <option value="">{t.all}</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </form>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cut) => (
          <CutCard key={cut.slug} cut={cut} locale={locale} />
        ))}
      </div>
    </div>
  );
}
