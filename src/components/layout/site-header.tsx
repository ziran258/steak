import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localeLabels, locales } from "@/i18n/config";
import { localizedPath } from "@/lib/routes";

const navItems = {
  zh: [
    ["部位", "/cuts"],
    ["术语", "/glossary"],
    ["产地", "/origins"],
    ["等级", "/grades"],
    ["贸易", "/trade"],
  ],
  en: [
    ["Cuts", "/cuts"],
    ["Glossary", "/glossary"],
    ["Origins", "/origins"],
    ["Grades", "/grades"],
    ["Trade", "/trade"],
  ],
} satisfies Record<Locale, [string, string][]>;

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-200/15 bg-stone-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <Link href={localizedPath(locale)} className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-red-800 text-lg font-black shadow-lg shadow-red-950/30">
            SW
          </span>
          <span>
            <span className="block text-lg font-bold tracking-wide">Steak Wiki</span>
            <span className="block text-xs text-orange-100/60">
              {locale === "zh" ? "牛排与牛肉知识库" : "Beef knowledge base"}
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm text-orange-50/80">
          {navItems[locale].map(([label, href]) => (
            <Link key={href} href={localizedPath(locale, href)} className="rounded-full px-3 py-1.5 hover:bg-orange-100/10">
              {label}
            </Link>
          ))}
          <span className="mx-1 h-5 w-px bg-orange-100/20" />
          {locales.map((item) => (
            <Link
              key={item}
              href={localizedPath(item)}
              className={`rounded-full px-3 py-1.5 ${item === locale ? "bg-orange-100 text-stone-950" : "hover:bg-orange-100/10"}`}
            >
              {localeLabels[item]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
