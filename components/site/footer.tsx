"use client";

import Link from "next/link";
import { Lockup } from "./logo";
import { useLang } from "./lang";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="site-footer" data-section="Footer">
      <div className="wrap inner">
        <Lockup height={22} />
        <span className="fnote">
          {t({
            en: "DozalDevs — done-for-you operations",
            es: "DozalDevs — operaciones resueltas",
          })}
        </span>
        <nav className="f-links" aria-label="Footer">
          <Link href="/how-it-works">{t({ en: "How it works", es: "Cómo funciona" })}</Link>
          <Link href="/use-cases">{t({ en: "Use cases", es: "Casos de uso" })}</Link>
          <Link href="/pricing">{t({ en: "Pricing", es: "Precios" })}</Link>
          <a href="/#start">{t({ en: "Get started", es: "Comienza gratis" })}</a>
        </nav>
        <span className="fnote">© 2026 DozalDevs</span>
      </div>
    </footer>
  );
}
