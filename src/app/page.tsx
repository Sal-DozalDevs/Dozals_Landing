/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Threshold from "./components/ui/Threshold";
import Glint from "./components/ui/Glint";
import GlintScatter from "./components/ui/GlintScatter";
import AnimatedHighlightText from "./components/ui/AnimatedHighlightText";
import RotatingPlatformText from "./components/ui/RotatingPlatformText";
import GHLCalendar from "./components/ui/GHLCalendar";

// Framer motion variants for the ease-out 250-400ms requirements
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does the AI know how to respond to my guests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DozalDevs ingests your existing property listings, past conversations, and brand guidelines to train a custom model. It responds exactly how you would, using your specific house rules and local recommendations."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if a guest has an emergency the AI can't handle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If the system detects an urgent issue (like a leak) or a question it lacks context for, it immediately pauses and escalates the thread to you or your staff via SMS and Slack."
      }
    },
    {
      "@type": "Question",
      "name": "Does it integrate with my current property management software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. DozalDevs natively integrates with major platforms including Guesty, Hostaway, Airbnb, and Vrbo, allowing it to sync reservations and trigger automated workflows seamlessly."
      }
    }
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-dd-obsidian text-dd-bone selection:bg-dd-ember/30 selection:text-dd-bone font-sans pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Threshold />

      {/* ─── HERO ─── */}
      <motion.section 
        className="pt-24 pb-16 px-6 md:px-12 max-w-5xl mx-auto w-full flex flex-col items-center text-center relative"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <GlintScatter seed={4786} />
        <motion.div variants={fadeUp} className="mb-12 relative z-10">
          {/* Logo Placeholder / Symbol */}
          <div className="w-16 h-16 mx-auto mb-8">
            <img src="/assets/logos/DozalDevs_Symbol_OnDark.svg" alt="DozalDevs Monogram" className="w-full h-full object-contain" />
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl font-semibold mb-6 tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Put your <RotatingPlatformText /> on autopilot so you can finally sleep through the night.
          </h1>
          <p className="font-sans text-lg md:text-xl text-dd-bone/80 max-w-2xl mx-auto">
            DozalDevs is the autonomous digital employee that handles guest communications, access management, and operations while you rest.
          </p>

          <div className="mt-10 mb-4 flex flex-col items-center">
            <button className="bg-dd-ember text-dd-bone px-8 py-4 font-sans font-semibold rounded-sm hover:bg-[#A3602A] transition-colors duration-300 shadow-lg shadow-dd-ember/20">
              Start My Free Trial
            </button>
            <p className="text-xs text-dd-bone/50 mt-4 font-mono tracking-wide">No credit card required • Cancel anytime</p>
          </div>
        </motion.div>

        {/* ─── DEMO VIDEO ─── */}
        <motion.div variants={fadeUp} className="w-full aspect-video bg-dd-ash relative rounded-sm overflow-hidden shadow-2xl border border-dd-ash/50 group">

          {/* Actual 26s video */}
          <video 
            src="/assets/images/Video.mov" 
            autoPlay 
            loop 
            playsInline
            controls
            suppressHydrationWarning
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.section>

      <Threshold isOpen />

      {/* ─── PROBLEM - SOLUTION ─── */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto w-full">
        <div className="space-y-32">
          {/* Feature 1 */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp} 
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="md:w-1/2 space-y-6">
               <div className="flex items-center gap-4">
                 <div className="h-px bg-dd-ember w-8" />
                 <span className="font-mono text-sm text-dd-bone/70 uppercase tracking-brand-caps">Omnichannel Comms</span>
               </div>
               <h2 className="font-serif text-3xl md:text-5xl font-medium leading-[1.15]">
                 Eliminate 90% of guest questions instantly with an AI trained on your brand voice.
               </h2>
               <p className="text-lg text-dd-bone/80 leading-[1.6] max-w-md">
                 Stop losing sleep over missing towels or pool codes. The system learns your exact operational details and handles check-ins, local recommendations, and real-time FAQs across all booking channels.
               </p>
            </div>
            <div className="md:w-1/2 relative w-full aspect-square md:aspect-[4/3] bg-dd-ash rounded-sm overflow-hidden border border-dd-ash/30">
               <img 
                 src="/assets/images/hands_warm_light.png" 
                 alt="Hands working in a warm kitchen environment" 
                 className="w-full h-full object-cover"
               />
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp} 
            className="flex flex-col md:flex-row-reverse gap-12 items-center"
          >
            <div className="md:w-1/2 space-y-6">
               <div className="flex items-center gap-4">
                 <div className="h-px bg-dd-ember w-8" />
                 <span className="font-mono text-sm text-dd-bone/70 uppercase tracking-brand-caps">Access Management</span>
               </div>
               <h2 className="font-serif text-3xl md:text-5xl font-medium leading-[1.15]">
                 Automate secure access code generation and never deal with a lockout again.
               </h2>
               <p className="text-lg text-dd-bone/80 leading-[1.6] max-w-md">
                 Generate secure, automated key codes linked exactly to check-in and check-out times. Support for Schlage, Yale, and major smart lock platforms, operating entirely in the background.
               </p>
            </div>
            <div className="md:w-1/2 relative w-full aspect-square md:aspect-[4/3] bg-dd-ash rounded-sm overflow-hidden border border-dd-ash/30">
               <img 
                 src="/assets/images/doorway_dusk.png" 
                 alt="A doorway with low, warm lighting" 
                 className="w-full h-full object-cover"
               />
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp} 
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="md:w-1/2 space-y-6">
               <div className="flex items-center gap-4">
                 <div className="h-px bg-dd-ember w-8" />
                 <span className="font-mono text-sm text-dd-bone/70 uppercase tracking-brand-caps">Full Operational Automation</span>
               </div>
               <h2 className="font-serif text-3xl md:text-5xl font-medium leading-[1.15]">
                 Put every aspect of your short-term rentals on autopilot.
               </h2>
               <p className="text-lg text-dd-bone/80 leading-[1.6] max-w-md">
                 From scheduling cleaners to managing maintenance requests and coordinating guest reviews, your digital employee seamlessly orchestrates the entire lifecycle of a reservation without human intervention.
               </p>
            </div>
            <div className="md:w-1/2 relative w-full aspect-square md:aspect-[4/3] bg-dd-ash rounded-sm overflow-hidden border border-dd-ash/30">
               <img 
                 src="/assets/images/Tile_objects_in_light.png" 
                 alt="Warm minimalist objects in light" 
                 className="w-full h-full object-cover"
               />
            </div>
          </motion.div>
        </div>
      </section>

      <Threshold />

      {/* ─── SOCIAL PROOF ─── */}
      <section className="py-24 bg-[#0F0D0B]/50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="font-mono text-xs text-dd-bone/50 uppercase tracking-brand-caps block mb-4">Real Results</span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium">Trusted by operators who value their time.</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "DozalDevs handles all our late-night inquiries. I haven't woken up to an angry guest message in months.",
                name: "Sarah Jenkins",
                title: "Portfolio Manager, 24 Properties",
                image: "/assets/images/testimonial_1.png"
              },
              {
                quote: "The automated lock management alone pays for itself. No more tracking down cleaner access codes.",
                name: "Marcus Thorne",
                title: "Boutique Hotel Owner",
                image: "/assets/images/testimonial_2.png"
              },
              {
                quote: "It actually sounds like me. Guests have no idea they are talking to an AI system.",
                name: "Elena Rodriguez",
                title: "Superhost, 8 Properties",
                image: "/assets/images/testimonial_3.png"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeUp}
                className="p-8 border border-dd-ash/30 rounded-sm bg-[#0F0D0B] flex flex-col justify-between shadow-lg"
              >
                <p className="text-dd-bone/80 mb-8 italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-dd-ash/50" />
                  <div>
                    <h4 className="font-semibold text-dd-ember">{testimonial.name}</h4>
                    <p className="text-xs text-dd-bone/60 font-mono mt-1">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Threshold />

      {/* ─── TECHNICAL SECTION ─── */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto w-full">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="bg-dd-ash/10 border border-dd-ash/30 rounded-sm p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dd-ash/0 via-dd-ash to-dd-ash/0" />
          
          <motion.h3 variants={fadeUp} className="font-mono text-sm uppercase tracking-brand-caps text-dd-bone/50 mb-8">
            Enterprise-grade performance. Built for scale.
          </motion.h3>
          
          <motion.div variants={fadeUp} className="overflow-x-auto">
            <table className="min-w-full divide-y divide-dd-ash/30">
              <thead className="bg-[#0F0D0B]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-mono text-dd-bone/50 uppercase tracking-brand-caps">Metric</th>
                  <th className="px-6 py-4 text-left text-xs font-mono text-dd-bone/50 uppercase tracking-brand-caps">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dd-ash/30 font-mono text-sm">
                <tr>
                  <td className="px-6 py-4 text-dd-bone/70">Response Latency</td>
                  <td className="px-6 py-4 text-dd-bone tabular-nums">&lt; 1800ms</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-dd-bone/70">Uptime SLA</td>
                  <td className="px-6 py-4 text-dd-bone tabular-nums">99.99%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-dd-bone/70">Context Retention</td>
                  <td className="px-6 py-4 text-dd-bone tabular-nums">512K tokens</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-dd-bone/70">IoT Support</td>
                  <td className="px-6 py-4 text-dd-moss">Native (Schlage, Yale, Minut)</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>

      <Threshold />

      {/* ─── FAQ ─── */}
      <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-medium">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-8">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="border-b border-dd-ash/20 pb-8">
                <h3 className="font-sans text-xl font-medium text-dd-bone mb-3">
                  {i === 0 ? <AnimatedHighlightText text={faq.name} /> : faq.name}
                </h3>
                <p className="text-dd-bone/70 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <Threshold />

      {/* ─── PRICING ─── */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
            Transparent Pricing That Scales With Your Portfolio
          </h2>
          <p className="font-sans text-dd-bone/60 max-w-2xl mx-auto">
            Start for free, scale effortlessly, and customize when you need enterprise power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* ─── PILOT TIER ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            className="border border-dd-ash/30 p-10 rounded-sm bg-[#0F0D0B]/80 text-center flex flex-col h-full"
          >
            <h3 className="font-sans text-xl font-medium text-dd-bone mb-2">Pilot</h3>
            <p className="text-xs font-mono text-dd-bone/50 tracking-brand-caps uppercase mb-8">2 Months Free Trial</p>
            <div className="flex justify-center items-end gap-1 mb-10">
              <span className="font-sans text-4xl font-semibold text-dd-bone">$0</span>
              <span className="font-mono text-xs text-dd-bone/60 uppercase tracking-brand-caps mb-2">/ month</span>
            </div>
            <ul className="space-y-4 mb-auto text-dd-bone/80 text-sm flex flex-col items-center">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-dd-ash/50" />
                1 Property Limit
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-dd-ash/50" />
                All Basic Dozals
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-dd-ash/50" />
                Community Support
              </li>
            </ul>
            <button className="mt-12 border border-dd-bone/50 text-dd-bone px-8 py-3 font-sans text-sm font-semibold rounded-sm hover:bg-dd-bone hover:text-dd-obsidian transition-colors duration-300">
              Start Free Trial
            </button>
          </motion.div>

          {/* ─── SCALE TIER ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            className="border border-dd-ember/50 p-12 rounded-sm bg-[#0F0D0B] shadow-2xl relative text-center flex flex-col h-full md:scale-105 z-10"
          >
            <Glint className="w-8 h-8 text-dd-ember fill-current mx-auto mb-4" />
            <h3 className="font-sans text-xl font-medium text-dd-ember mb-4">Scale</h3>
            <div className="flex justify-center items-end gap-1 mb-10">
              <span className="font-sans text-5xl font-semibold text-dd-bone">$19</span>
              <span className="font-mono text-[10px] text-dd-bone/60 uppercase tracking-brand-caps mb-2">/ property / mo</span>
            </div>
            
            <ul className="space-y-4 mb-auto text-dd-bone/80 text-sm flex flex-col items-center">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-dd-ember opacity-80" />
                All Dozals included
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-dd-ember opacity-80" />
                No per-message fees
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-dd-ember opacity-80" />
                No per-storage charges
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-dd-ember opacity-80" />
                Zero hidden surprises
              </li>
            </ul>

            <button className="mt-12 bg-dd-bone text-dd-obsidian px-8 py-4 font-sans text-sm font-semibold rounded-sm hover:bg-dd-linen transition-colors duration-300">
              Automate My Properties
            </button>
            <p className="text-[10px] text-dd-bone/40 mt-4 font-mono tracking-wide">Setup takes &lt; 5 minutes.</p>
          </motion.div>

          {/* ─── ENTERPRISE TIER ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            className="border border-dd-ash/30 p-10 rounded-sm bg-[#0F0D0B]/80 text-center flex flex-col h-full"
          >
            <h3 className="font-sans text-xl font-medium text-dd-bone mb-2">Enterprise</h3>
            <p className="text-xs font-mono text-dd-bone/50 tracking-brand-caps uppercase mb-8">Tailored Solutions</p>
            <div className="flex justify-center items-end gap-1 mb-10">
              <span className="font-sans text-4xl font-semibold text-dd-bone">Custom</span>
            </div>
            <ul className="space-y-4 mb-auto text-dd-bone/80 text-sm flex flex-col items-center">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-dd-ash/50" />
                Offer specific digital employees
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-dd-ash/50" />
                Custom workflow integrations
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-dd-ash/50" />
                Dedicated Success Manager
              </li>
            </ul>
            <button className="mt-12 border border-dd-bone/50 text-dd-bone px-8 py-3 font-sans text-sm font-semibold rounded-sm hover:bg-dd-bone hover:text-dd-obsidian transition-colors duration-300">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </section>

      <Threshold />

      {/* ─── LEAD CAPTURE FORM ─── */}
      <section className="py-24 px-6 md:px-12 bg-[#0F0D0B] relative overflow-hidden mt-12">
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <Glint className="w-8 h-8 text-dd-ember fill-current mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
              Ready to automate your operations?
            </h2>
            <p className="text-dd-bone/70 mb-12 max-w-xl mx-auto">
              Select a time below to schedule your personalized demo. No complex onboarding, just instant relief.
            </p>
            
            <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-sm border border-dd-ash/30 shadow-2xl bg-transparent">
              <GHLCalendar />
            </div>
          </motion.div>
        </div>
      </section>

      <Threshold />

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto w-full">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.2 }}
           variants={fadeUp}
           className="border border-dd-ash rounded-3xl md:rounded-[180px] px-6 md:px-12 py-16 flex flex-col items-center justify-center text-center bg-dd-obsidian max-w-2xl mx-auto shadow-sm relative z-10"
        >
          <div className="w-16 h-16 mb-6">
            <img src="/assets/logos/DozalDevs_Symbol_Mono_Ember.svg" alt="DozalDevs Monogram" className="w-full h-full object-contain" />
          </div>
          <h2 className="font-serif font-semibold text-4xl text-dd-bone mb-2">
            Hire Your Digital Employee
          </h2>
          <p className="font-serif text-sm tracking-brand-tagline text-dd-ember uppercase italic mb-10">
            Bringing Digital Intelligence to Real Estate
          </p>
          <button className="bg-dd-ember text-dd-bone px-8 py-4 font-sans font-semibold rounded-sm hover:bg-[#A3602A] transition-colors duration-300 shadow-lg shadow-dd-ember/20">
            Start My Free Trial
          </button>
          <p className="text-xs text-dd-bone/50 mt-4 font-mono tracking-wide">No credit card required • Cancel anytime</p>
        </motion.div>
      </section>
    </div>
  );
}
