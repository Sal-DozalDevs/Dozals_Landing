"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const }
  }
};

const Check = () => (
  <div className="bg-[#10B981] rounded-sm w-5 h-5 flex items-center justify-center shrink-0">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </div>
);

const Cross = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#EF4444] shrink-0">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

const ComparisonSection = () => {
  const features = [
    {
      capability: "Receives guest messages",
      pms: { icon: <Check />, text: "Aggregates into inbox" },
      human: { icon: <Check />, text: "Reads them" },
      dozals: { icon: <Check />, text: "Reads them" }
    },
    {
      capability: "Drafts responses",
      pms: { icon: <Check />, text: "AI-suggested reply" },
      human: { icon: <Check />, text: "Writes manually and sends" },
      dozals: { icon: <Check />, text: "Writes and sends" }
    },
    {
      capability: "Dispatches cleaning crew",
      pms: { icon: <Cross />, text: "Sends notification to manager" },
      human: { icon: <Check />, text: "Calls/texts crew" },
      dozals: { icon: <Check />, text: "Sends work order + lock code + notifies you" }
    },
    {
      capability: "Changes door lock code",
      pms: { icon: <Cross />, text: "Requires separate app" },
      human: { icon: <Check />, text: "Does it manually" },
      dozals: { icon: <Check />, text: "Does it automatically" }
    },
    {
      capability: "Resolves maintenance issue",
      pms: { icon: <Cross />, text: "Creates a ticket" },
      human: { icon: <Check />, text: "Calls plumber, coordinates" },
      dozals: { icon: <Check />, text: "Triages, dispatches, updates guest and you" }
    },
    {
      capability: "Works at 3 AM",
      pms: { icon: <Cross />, text: "Notification waits for morning" },
      human: { icon: <Cross />, text: "Asleep" },
      dozals: { icon: <Check />, text: "Resolves immediately" }
    },
    {
      capability: "Scales from 20 to 200 units",
      pms: { icon: <Check />, text: "Software scales" },
      human: { icon: <Cross />, text: "Need more hires" },
      dozals: { icon: <Check />, text: "Same system, zero new hires" }
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto w-full">
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp} 
        className="space-y-12"
      >
        <div className="space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl font-medium leading-[1.15]">
            What Makes Dozals Different From Existing Tools
          </h2>
          <p className="text-lg text-dd-bone/80 leading-[1.6]">
            The short-term rental and property management technology market is crowded with software. However, every incumbent tool shares a common architectural limitation: <span className="font-semibold text-dd-bone">they organize work but do not execute it.</span>
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="min-w-[800px]">
            <table className="w-full text-left border-collapse border-y border-dd-ash/30 text-sm md:text-base">
              <thead className="bg-[#1A1816]">
                <tr>
                  <th className="p-4 border-x border-dd-ash/30 font-semibold text-dd-bone/90 w-[30%]">Capability</th>
                  <th className="p-4 border-x border-dd-ash/30 font-semibold text-dd-bone/90 w-[35%]">Legacy PMS <span className="text-xs font-normal text-dd-bone/50 block mt-1">(Guesty, Hostaway, Hospitable)</span></th>
                  <th className="p-4 border-x border-dd-ash/30 font-semibold text-dd-bone w-[35%] bg-dd-ember/5 text-dd-ember">Dozals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dd-ash/30">
                {features.map((item, index) => (
                  <tr key={index} className="hover:bg-dd-ash/10 transition-colors">
                    <td className="p-4 border-x border-dd-ash/30 font-medium text-dd-bone/90">{item.capability}</td>
                    <td className="p-4 border-x border-dd-ash/30 text-dd-bone/80">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{item.pms.icon}</div>
                        <span>{item.pms.text}</span>
                      </div>
                    </td>
                    <td className="p-4 border-x border-dd-ash/30 text-dd-bone font-medium bg-dd-ember/5">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{item.dozals.icon}</div>
                        <span>{item.dozals.text}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6 text-lg text-dd-bone/80 leading-[1.6]">
          <p>
            <strong className="text-dd-bone font-semibold">The core differentiator is execution.</strong> Every other tool in the market stops at "here's what needs to be done" and waits for a human to do it. A Dozal does it.
          </p>
          <p>
            The secondary differentiator is the <strong className="text-dd-bone font-semibold">"connect and automate" onboarding model.</strong> Instead of requiring a 3-6 month enterprise migration where the client rips out their existing tools and replaces them with a monolithic platform, Dozal overlays on top of whatever the client already uses. It connects to their existing PMS, their existing smart locks, their existing communication channels — and starts working within days.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ComparisonSection;
