import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/wiki/section";
import { cuts, getCut, glossaryTerms } from "@/data/wiki";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { localizedPath } from "@/lib/routes";

export function generateStaticParams() {
  return locales.flatMap((locale) => cuts.map((cut) => ({ locale, slug: cut.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const cut = getCut(slug);
  if (!cut) return {};
  const t = cut.translations[locale];
  return {
    title: `${t.name} | Steak Wiki`,
    description: t.shortDefinition,
  };
}

const labels = {
  zh: {
    basics: "基础信息",
    anatomy: "部位与结构",
    eating: "口感与脂肪",
    market: "命名与市场标签",
    related: "相关条目",
    primal: "大分割",
    muscles: "相关肌肉",
    methods: "常见做法",
    aliases: "别名",
    location: "位置",
    structure: "结构",
    texture: "口感",
    fat: "脂肪",
    uses: "常见用途",
    naming: "命名说明",
    notes: "市场说明",
  },
  en: {
    basics: "Basics",
    anatomy: "Anatomy and structure",
    eating: "Texture and fat",
    market: "Naming and market labels",
    related: "Related entries",
    primal: "Primal",
    muscles: "Muscles",
    methods: "Common methods",
    aliases: "Aliases",
    location: "Location",
    structure: "Structure",
    texture: "Texture",
    fat: "Fat",
    uses: "Common uses",
    naming: "Naming notes",
    notes: "Market notes",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function CutDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const cut = getCut(slug);
  if (!cut) notFound();
  const t = cut.translations[locale];
  const label = labels[locale];
  const relatedCuts = cut.relatedCutSlugs.map(getCut).filter(Boolean);
  const relatedTerms = glossaryTerms.filter((term) => cut.relatedTermSlugs.includes(term.slug));

  return (
    <article className="py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-200/70">{cut.primaryPrimal}</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">{t.name}</h1>
          <p className="mt-3 text-xl text-orange-100/70">{t.englishName}</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-orange-50/75">{t.shortDefinition}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {t.aliases.map((alias) => (
              <span key={alias} className="rounded-full border border-orange-200/20 px-3 py-1 text-sm text-orange-100/70">
                {alias}
              </span>
            ))}
          </div>
        </div>
        <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-orange-200/15 bg-red-950">
          <img src={cut.coverImageUrl} alt={t.name} className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <InfoCard label={label.primal} value={cut.primaryPrimal} />
        <InfoCard label={label.muscles} value={cut.muscleNames.join(", ")} />
        <InfoCard label={label.methods} value={cut.commonCookingMethods.join(", ")} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Section title={label.basics}>
          <p>{t.overview}</p>
        </Section>
        <Section title={label.anatomy}>
          <p><strong>{label.location}：</strong>{t.locationDescription}</p>
          <p><strong>{label.structure}：</strong>{t.structureDescription}</p>
        </Section>
        <Section title={label.eating}>
          <p><strong>{label.texture}：</strong>{t.textureDescription}</p>
          <p><strong>{label.fat}：</strong>{t.fatDescription}</p>
          <p><strong>{label.uses}：</strong>{t.commonUses}</p>
        </Section>
        <Section title={label.market}>
          <p><strong>{label.naming}：</strong>{t.namingNotes}</p>
          <p><strong>{label.notes}：</strong>{t.marketNotes}</p>
        </Section>
      </div>

      <section className="mt-10 rounded-3xl border border-orange-200/15 bg-stone-950/45 p-6">
        <h2 className="text-2xl font-black">{label.related}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {relatedCuts.map((related) => related && (
            <Link key={related.slug} href={localizedPath(locale, `/cuts/${related.slug}`)} className="rounded-2xl border border-orange-200/15 p-4 hover:bg-orange-100/10">
              <span className="font-bold">{related.translations[locale].name}</span>
              <span className="ml-2 text-sm text-orange-100/55">{related.translations[locale].englishName}</span>
            </Link>
          ))}
          {relatedTerms.map((term) => (
            <div key={term.slug} className="rounded-2xl border border-orange-200/15 p-4">
              <span className="font-bold">{term.translations[locale].term}</span>
              <p className="mt-1 text-sm text-orange-50/65">{term.translations[locale].shortDefinition}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-orange-200/15 bg-stone-950/45 p-5">
      <p className="text-xs uppercase tracking-[0.25em] text-orange-200/60">{label}</p>
      <p className="mt-3 text-orange-50/82">{value}</p>
    </div>
  );
}
