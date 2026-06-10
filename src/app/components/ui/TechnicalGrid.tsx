"use client";

import React from "react";

export default function TechnicalGrid() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] mix-blend-screen"
      style={{
        backgroundImage: "radial-gradient(circle, var(--color-dd-bone) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        animation: "panGrid 90s linear infinite",
      }}
    />
  );
}
