/* Stroked icons per DESIGN.md §7 — 24×24 viewBox, stroke currentColor,
   round caps, never filled. */

export function Check({ strokeWidth = 2.6 }: { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
