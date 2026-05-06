import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steak Wiki",
  description: "A bilingual wiki for steak cuts, beef origins, grading systems, and trade terminology.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
