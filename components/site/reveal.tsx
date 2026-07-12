"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Port of the original main.js reveal behavior:
 *  - stagger .reveal children inside known groups (sets --i)
 *  - add `in` when a .reveal element scrolls into view
 * Re-runs when `route` changes (Next navigations).
 */
export default function RevealOnScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const groups = document.querySelectorAll<HTMLElement>(
      ".grid-2, .grid-3, .grid-4, .steps, .plans, .hero__left, .stagger"
    );
    groups.forEach((group) => {
      group.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
        el.style.setProperty("--i", String(Math.min(i, 6)));
      });
    });

    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px 10% 0px" }
    );
    reveals.forEach((el) => io.observe(el));

    // Fallback: force-reveal any elements the observer missed after 2.5s
    const fallback = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
        el.classList.add("in");
      });
    }, 2500);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}