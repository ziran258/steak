import { PageHero } from "@/components/wiki/page-hero";
import { tradeTopics } from "@/data/wiki";
import { isLocale, type Locale } from "@/i18n/config";

const copy = {
  zh: {
    eyebrow: "Trade",
    title: "进口贸易基础",
    description: "第一版先保留贸易主题入口，后续再扩展厂号数据库、准入信息与来源核验日期。",
    status: "占位主题",
  },
  en: {
    eyebrow: "Trade",
    title: "Import-trade basics",
    description: "v1 keeps trade topic entry points, with establishment databases, eligibility data, and verification dates planned later.",
    status: "Placeholder topic",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function TradePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = copy[locale];

  return (
    <div>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="grid gap-5 md:grid-cols-2">
        {tradeTopics.map((topic) => {
          const item = topic.translations[locale];
          return (
            <article key={topic.slug} className="rounded-3xl border border-orange-200/15 bg-stone-950/45 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-orange-200/60">{t.status}</p>
              <h2 className="mt-3 text-2xl font-black">{item.title}</h2>
              <p className="mt-4 leading-7 text-orange-50/75">{item.summary}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
