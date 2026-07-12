"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Demo", href: "/demo" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
];

const PLATFORM_URL = "https://app.dozaldevs.com/dashboard";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="nav"
      data-section="Nav"
      className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
    >
      <div className="nav__shell">
        {/* Brand lockup */}
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="brand__mark"
            src="/brand/DozalDevs_Symbol_OnLight.svg"
            alt="DozalDevs"
            width={34}
            height={34}
          />
          <span className="brand__name">Dozals</span>
        </Link>

        {/* Center navigation links */}
        <div className="nav__links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              className={`nav__tab${pathname === item.href ? " is-active" : ""}`}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right-side CTAs */}
        <div className="nav__right">
          <a
            className="btn btn--ghost btn--sm"
            href={PLATFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Access Platform
            <ArrowUpRight className="nav__icon" size={14} strokeWidth={2} />
          </a>
          <Link
            className="btn btn--primary btn--sm"
            href="/demo"
            onClick={() => setOpen(false)}
          >
            Book a demo <span className="glint"></span>
          </Link>
        </div>

        {/* Mobile hamburger toggle */}
        <button
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
        </button>
      </div>
    </nav>
  );
}