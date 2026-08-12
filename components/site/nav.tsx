"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lockup } from "./logo";
import { LangToggle, useLang } from "./lang";

const NAV_ITEMS: { href: string; label: { en: string; es: string } }[] = [
  { href: "/how-it-works", label: { en: "How it works", es: "Cómo funciona" } },
  { href: "/use-cases", label: { en: "Use cases", es: "Casos de uso" } },
  { href: "/pricing", label: { en: "Pricing", es: "Precios" } },
];

export default function Nav() {
  const pathname = usePathname();
  const { t } = useLang();

  return (
    <header className="masthead" data-section="Nav">
      <div className="bar">
        <Link className="brand" href="/" aria-label="DozalDevs — home">
          <Lockup height={26} />
          <span className="descriptor">
            {t({ en: "done-for-you operations", es: "operaciones resueltas" })}
          </span>
        </Link>
        <nav className="nav-links" aria-label="Site">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              className={`nav-link${pathname === item.href ? " is-active" : ""}`}
              href={item.href}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <LangToggle />
      </div>
    </header>
  );
}
