"use client";

import { useEffect, useState } from "react";

/**
 * DevLabels — renders a small numbered chip floating over every labeled
 * component on the site, plus a toolbar that lists them all in order.
 *
 * A label is created from any element bearing:
 *   - data-section="Name"      (top-level sections / nav / footer)
 *   - data-label="Name"       (any inner component we want to tag)
 * The same element may also set data-file="path/to/source.tsx".
 *
 * Clicking a chip in the toolbar scrolls to that component and flashes it.
 * The whole overlay can be toggled off with the on/off switch in the corner.
 */

type LabelEntry = {
  id: number;
  name: string;
  file: string;
  el: HTMLElement;
};

export default function DevLabels() {
  const [enabled, setEnabled] = useState(true);
  const [entries, setEntries] = useState<LabelEntry[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const scan = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-section], [data-label]")
      );

      const list: LabelEntry[] = nodes
        .filter((el) => {
          // skip elements that aren't rendered (height 0 and not position:fixed/sticky)
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (style.display === "none") return false;
          if (r.width === 0 && r.height === 0 && style.position !== "fixed" && style.position !== "sticky") return false;
          return true;
        })
        .map((el, i) => {
          const name = el.getAttribute("data-label") || el.getAttribute("data-section") || "(unnamed)";
          const file = el.getAttribute("data-file") || "";
          return { id: i + 1, name, file, el };
        });

      setEntries(list);
    };

    scan();
    // re-scan on route changes / after fonts load
    const t = setTimeout(scan, 300);
    window.addEventListener("load", scan);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", scan);
    };
  }, [enabled]);

  const reveal = (el: HTMLElement) => {
    const prev = { outline: el.style.outline, bg: el.style.backgroundColor };
    el.style.outline = "2px solid var(--ember, #D0342C)";
    el.style.outlineOffset = "2px";
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      if (!el) return;
      el.style.outline = prev.outline;
      el.style.backgroundColor = prev.bg;
    }, 1600);
  };

  if (!enabled) {
    return (
      <button
        onClick={() => setEnabled(true)}
        style={btnOff}
        title="Show component labels"
      >
        § labels: off
      </button>
    );
  }

  return (
    <>
      {/* Floating numbered chips over each labeled element */}
      {entries.map((entry) => {
        const el = entry.el;
        if (!el || !el.isConnected) return null;
        // position relative to viewport via getBoundingClientRect is reactive
        // only on render; for a static dev tool this is fine — re-mount happens
        // on scroll because we re-scan on key interactions.
        return (
          <Chip key={entry.id} entry={entry} onClick={() => reveal(el)} />
        );
      })}

      {/* Toolbar — ordered list of every labeled component */}
      <div style={toolbar}>
        <div style={toolbarHead}>
          <span style={toolbarTitle}>§ Component labels</span>
          <span style={toolbarCount}>{entries.length}</span>
          <button
            onClick={() => setEnabled(false)}
            style={btnClose as React.CSSProperties}
            title="Hide labels"
          >
            ×
          </button>
        </div>
        <ol style={list}>
          {entries.map((e) => (
            <li key={e.id}>
              <button style={listBtn as React.CSSProperties} onClick={() => reveal(e.el)}>
                <span style={chipIndex}>{String(e.id).padStart(2, "0")}</span>
                <span style={{ display: "flex", flexDirection: "column" as const, flex: 1, minWidth: 0 }}>
                  <span style={listName}>{e.name}</span>
                  {e.file && <span style={listFile}>{e.file}</span>}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

/** Chip rendered at the element's top-left corner. */
function Chip({ entry, onClick }: { entry: LabelEntry; onClick: () => void }) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const r = entry.el.getBoundingClientRect();
      setPos({ top: r.top, left: r.left });
    };
    update();
    const id = window.setInterval(update, 200);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [entry.el]);

  if (!pos) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      style={chip(pos)}
      title={`${entry.name}${entry.file ? `\n${entry.file}` : ""}`}
    >
      §
      <span style={chipIndex}>
        {String(entry.id).padStart(2, "0")}
      </span>
      {entry.name.length < 24 && entry.name !== "Hero · IntroAnimation" && (
        <span style={chipNameStyle}>{entry.name}</span>
      )}
    </button>
  );
}

/* ────────────── styles ────────────── */
const chip = (pos: { top: number; left: number } | null): React.CSSProperties => ({
  position: "fixed",
  top: Math.max(pos?.top ?? 0, 4),
  left: Math.max(pos?.left ?? 0, 4),
  zIndex: 2147483646,
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  padding: "3px 7px 3px 5px",
  background: "rgba(10,10,10,0.92)",
  color: "#fff",
  border: "1px solid rgba(208,52,44,0.7)",
  borderRadius: 6,
  font: "600 10px/1 var(--mono, ui-monospace, monospace)",
  letterSpacing: "0.4px",
  cursor: "pointer",
  pointerEvents: "auto",
  boxShadow: "0 4px 14px -4px rgba(0,0,0,0.5)",
  backdropFilter: "blur(4px)",
});
const chipIndex: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 16,
  height: 16,
  padding: "0 3px",
  borderRadius: 3,
  background: "rgba(208,52,44,0.9)",
  color: "#fff",
  fontSize: 9.5,
};
const chipNameStyle: React.CSSProperties = { color: "rgba(255,255,255,0.85)" };

const toolbar: React.CSSProperties = {
  position: "fixed",
  right: 14,
  bottom: 14,
  zIndex: 2147483647,
  width: 280,
  maxHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  background: "rgba(255,255,255,0.96)",
  border: "1px solid rgba(10,10,10,0.2)",
  borderRadius: 10,
  boxShadow: "0 20px 60px -20px rgba(0,0,0,0.45)",
  backdropFilter: "blur(10px)",
  fontFamily: "Inter, system-ui, sans-serif",
  overflow: "hidden",
};
const toolbarHead: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 10px",
  borderBottom: "1px solid rgba(10,10,10,0.1)",
  background: "rgba(10,10,10,0.04)",
};
const toolbarTitle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  fontFamily: "var(--mono, ui-monospace)",
  letterSpacing: "0.5px",
  color: "#0A0A0A",
  flex: 1,
};
const toolbarCount: React.CSSProperties = {
  fontSize: 10,
  fontFamily: "var(--mono, ui-monospace)",
  fontWeight: 700,
  padding: "1px 6px",
  borderRadius: 999,
  background: "rgba(208,52,44,0.14)",
  color: "#D0342C",
};
const list: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 4,
  overflowY: "auto",
  flex: 1,
};
const listBtn: React.CSSProperties = {
  display: "flex",
  gap: 8,
  width: "100%",
  padding: "6px 8px",
  background: "transparent",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  textAlign: "left",
  fontFamily: "inherit",
  transition: "background .15s",
  alignItems: "center",
};
const listName: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "#0A0A0A",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
};
const listFile: React.CSSProperties = {
  fontSize: 10,
  fontFamily: "var(--mono, ui-monospace)",
  color: "#6E6E6E",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
};
const btnOff: React.CSSProperties = {
  position: "fixed",
  right: 14,
  bottom: 14,
  zIndex: 2147483647,
  padding: "8px 12px",
  background: "rgba(10,10,10,0.92)",
  color: "#fff",
  border: "1px solid rgba(208,52,44,0.5)",
  borderRadius: 8,
  fontSize: 11,
  fontFamily: "var(--mono, ui-monospace)",
  fontWeight: 600,
  letterSpacing: "0.3px",
  cursor: "pointer",
};
const btnClose: React.CSSProperties = {
  padding: "0 6px",
  background: "rgba(10,10,10,0.06)",
  border: "none",
  borderRadius: 4,
  fontSize: 13,
  lineHeight: 1,
  color: "#0A0A0A",
  cursor: "pointer",
};