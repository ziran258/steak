import Link from "next/link";
import { CutCard } from "@/components/wiki/cut-card";
import { cuts, glossaryTerms, grades, origins, tradeTopics } from "@/data/wiki";
import { isLocale, type Locale } from "@/i18n/config";
import { localizedPath } from "@/lib/routes";

const copy = {
  zh: {
    eyebrow: "专业百科 · 双语知识库",
    title: "系统理解牛排，从部位到贸易标签。",
    description: "Steak Wiki 以专业百科为核心，结构化展示牛排部位、产地、等级、术语和进口贸易基础知识。第一版先做展示，不做评分、后台和用户系统。",
    modules: "知识模块",
    featured: "精选部位",
    glossary: "术语样例",
  },
  en: {
    eyebrow: "Technical wiki · bilingual knowledge base",
    title: "Understand steak from cuts to trade labels.",
    description: "Steak Wiki is a structured bilingual knowledge base for cuts, origins, grading systems, terminology, and import-trade fundamentals. v1 focuses on display only.",
    modules: "Knowledge modules",
    featured: "Featured cuts",
    glossary: "Glossary samples",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const t = copy[locale];
  const modules = [
    { label: locale === "zh" ? "部位" : "Cuts", value: cuts.length, href: "/cuts" },
    { label: locale === "zh" ? "术语" : "Glossary", value: glossaryTerms.length, href: "/glossary" },
    { label: locale === "zh" ? "产地" : "Origins", value: origins.length, href: "/origins" },
    { label: locale === "zh" ? "等级" : "Grades", value: grades.length, href: "/grades" },
    { label: locale === "zh" ? "贸易主题" : "Trade topics", value: tradeTopics.length, href: "/trade" },
  ];

  return (
    <div className="space-y-14">
      <section className="grid gap-10 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-200/70">{t.eyebrow}</p>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-orange-50 md:text-7xl">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-orange-50/72">{t.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={localizedPath(locale, "/cuts")} className="rounded-full bg-orange-100 px-5 py-3 font-semibold text-stone-950">
              {locale === "zh" ? "浏览部位" : "Browse cuts"}
            </Link>
            <Link href={localizedPath(locale, "/glossary")} className="rounded-full border border-orange-200/25 px-5 py-3 font-semibold text-orange-50">
              {locale === "zh" ? "查看术语" : "View glossary"}
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-orange-200/15 bg-orange-950/25 p-6 shadow-2xl shadow-stone-950/30">
          <h2 className="text-xl font-bold">{t.modules}</h2>
          <div className="mt-6 grid gap-3">
            {modules.map((module) => (
              <Link key={module.href} href={localizedPath(locale, module.href)} className="flex items-center justify-between rounded-2xl bg-stone-950/45 p-4 hover:bg-stone-900/70">
                <span>{module.label}</span>
                <span className="rounded-full bg-red-900/80 px-3 py-1 text-sm">{module.value}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-black">{t.featured}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cuts.slice(0, 6).map((cut) => (
            <CutCard key={cut.slug} cut={cut} locale={locale} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-orange-200/15 bg-stone-950/45 p-6">
        <h2 className="text-3xl font-black">{t.glossary}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {glossaryTerms.slice(0, 6).map((term) => (
            <div key={term.slug} className="rounded-3xl border border-orange-200/15 bg-orange-950/20 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-orange-200/60">{term.category}</p>
              <h3 className="mt-3 text-xl font-bold">{term.translations[locale].term}</h3>
              <p className="mt-2 text-sm leading-6 text-orange-50/70">{term.translations[locale].shortDefinition}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
