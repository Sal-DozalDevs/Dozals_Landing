"use client";

import React from "react";
import LockCodeAd from "../components/ui/LockCodeAd";

export default function AdDemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-dd-obsidian">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-dd-bone/50 uppercase tracking-brand-caps block mb-3">
            Ad Concept 1
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-dd-bone font-medium">
            &ldquo;The Lock Code&rdquo;
          </h1>
          <p className="text-dd-bone/60 font-sans text-sm mt-3 max-w-md mx-auto">
            A 30-second motion ad showing how property managers waste time on repetitive checkout tasks — and how DozalDevs automates it all.
          </p>
        </div>

        <LockCodeAd />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {[
            { time: "0-3s", label: "Hook", desc: "Notification grabs attention" },
            { time: "3-10s", label: "Problem", desc: "4 apps, 7 clicks shown" },
            { time: "10-22s", label: "Solution", desc: "Product demo in action" },
            { time: "22-30s", label: "CTA", desc: "Clear call to action" },
          ].map((item, i) => (
            <div key={i} className="border border-dd-ash/20 rounded-lg p-4 bg-[#0e0c0a]">
              <span className="font-mono text-[10px] text-dd-ember uppercase tracking-wider">{item.time}</span>
              <p className="font-sans text-sm text-dd-bone font-medium mt-1">{item.label}</p>
              <p className="text-[11px] text-dd-bone/50 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
