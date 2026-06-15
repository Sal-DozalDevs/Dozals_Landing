"use client";

import React from "react";
import { motion } from "framer-motion";
import Glint from "./Glint";

const commands = [
  {
    text: "Build tomorrow's cleaning schedule and post it to the team.",
    span: "md:col-span-2",
  },
  {
    text: "Rotate my smart-lock codes every checkout.",
    span: "md:col-span-1",
  },
  {
    text: "Chase the late review.",
    span: "md:col-span-1",
  },
  {
    text: "Summarize what happened across my properties today.",
    span: "md:col-span-2",
  },
  {
    text: "Reply to my guest messages — check with me first.",
    span: "md:col-span-2",
  },
  {
    text: "Text me when an air filter is due.",
    span: "md:col-span-1",
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto w-full">
      <div className="mb-16">
        <Glint className="w-6 h-6 text-dd-ember fill-current mb-6" />
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-dd-bone mb-6 tracking-tight max-w-3xl">
          If you can describe it, you can hire it.
        </h2>
        <p className="font-sans text-lg md:text-xl text-dd-bone/70 max-w-2xl leading-relaxed">
          A Dozal handles any repeating job you can explain in plain English. Here's the kind of thing people ask for:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {commands.map((cmd, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`
              ${cmd.span} 
              group relative overflow-hidden rounded-xl border border-dd-ash/30 bg-[#0F0D0B] p-8 md:p-10
              hover:border-dd-ember/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-dd-ember/10
            `}
          >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-dd-ember/0 to-dd-ember/0 group-hover:from-dd-ember/5 group-hover:to-transparent transition-colors duration-500 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <span className="font-mono text-dd-ember text-xl mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                &gt;_
              </span>
              <p className="font-sans text-lg md:text-xl text-dd-bone/90 font-medium leading-relaxed">
                "{cmd.text}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-left md:text-right">
        <p className="font-mono text-xs text-dd-bone/40 uppercase tracking-brand-caps italic">
          The range of what you can ask for, and more.
        </p>
      </div>
    </section>
  );
}
