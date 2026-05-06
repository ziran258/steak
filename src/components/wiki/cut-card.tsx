import Link from "next/link";
import type { Cut } from "@/data/wiki";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/lib/routes";

export function CutCard({ cut, locale }: { cut: Cut; locale: Locale }) {
  const t = cut.translations[locale];

  return (
    <Link href={localizedPath(locale, `/cuts/${cut.slug}`)} className="group overflow-hidden rounded-3xl border border-orange-200/15 bg-stone-950/45 transition hover:-translate-y-1 hover:border-orange-200/35">
      <div className="relative aspect-[16/10] overflow-hidden bg-red-950">
        <img src={cut.coverImageUrl} alt={t.name} className="h-full w-full object-cover opacity-80 transition group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-orange-200/60">{cut.primaryPrimal}</p>
          <h3 className="mt-2 text-xl font-bold text-orange-50">{t.name}</h3>
          <p className="text-sm text-orange-100/60">{t.englishName}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-orange-50/72">{t.shortDefinition}</p>
        <div className="flex flex-wrap gap-2">
          {cut.commonCookingMethods.slice(0, 3).map((method) => (
            <span key={method} className="rounded-full border border-orange-200/15 px-2.5 py-1 text-xs text-orange-100/65">
              {method}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
