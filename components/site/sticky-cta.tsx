"use client";

import { useEffect, useState } from "react";
import { useLang } from "./lang";

/* Persistent CTA — shows only when neither the hero form nor the final
   CTA/footer is on screen, so a call-to-action is always visible. */
export default function StickyCta() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const anchors = [
      document.getElementById("hero-form"),
      document.getElementById("start"),
      document.querySelector("footer"),
    ].filter(Boolean) as Element[];
    if (!anchors.length || !("IntersectionObserver" in window)) return;

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        });
        setShow(visible.size === 0);
      },
      { threshold: 0.12 }
    );
    anchors.forEach((a) => io.observe(a));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`sticky-cta${show ? " show" : ""}`} aria-hidden={show ? "false" : "true"}>
      <div className="inner">
        <span className="sc-text">
          {t({
            en: "Start free — describe one real job, see everything it does.",
            es: "Comienza gratis — describe un trabajo real y ve todo lo que hace.",
          })}
        </span>
        <a className="btn btn-cta" href="#start">
          {t({ en: "Get started", es: "Comienza gratis" })}
        </a>
      </div>
    </div>
  );
}
