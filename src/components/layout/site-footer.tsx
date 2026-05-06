import type { Locale } from "@/i18n/config";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-orange-200/15 py-10 text-sm text-orange-100/60">
      <div className="mx-auto max-w-7xl px-5">
        <p>
          {locale === "zh"
            ? "Steak Wiki 第一版专注结构化展示牛排部位、术语、产地与等级知识。"
            : "Steak Wiki v1 focuses on structured steak cuts, terminology, origins, and grading knowledge."}
        </p>
      </div>
    </footer>
  );
}
