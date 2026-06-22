/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Threshold from "./components/ui/Threshold";
import Glint from "./components/ui/Glint";
import GlintScatter from "./components/ui/GlintScatter";
import AnimatedHighlightText from "./components/ui/AnimatedHighlightText";
import GHLCalendar from "./components/ui/GHLCalendar";
import faqSchema from "./data/faq";
import DemoSection from "./components/ui/DemoSection";
import CapabilitiesSection from "./components/ui/CapabilitiesSection";
import ComparisonSection from "./components/ui/ComparisonSection";
import ApprovalSection from "./components/ui/ApprovalSection";

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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-dd-bone selection:bg-dd-ember/30 selection:text-dd-bone font-sans pb-32">
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
          <div className="w-48 md:w-64 mx-auto mb-8">
            <img src="/assets/logos/DozalDevs_Tagline_Mono_White.svg" alt="DozalDevs" className="w-full h-auto object-contain" />
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl font-semibold mb-6 tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Hire a digital employee to execute your <span className="text-dd-ember">Real Estate</span> needs while you rest.
          </h1>
          <p className="font-sans text-lg md:text-xl text-dd-bone/80 max-w-2xl mx-auto">
            Connect your accounts and let it take over the busywork. <br/> Contact people in your behalf, organize your day. <br/> Give it instructions as your own personal assistant and it will handle the rest. Everything 24/7 and you're always in control.
          </p>

          <div className="mt-10 mb-4 flex flex-col items-center">
            <button
              onClick={() => document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-dd-ember text-dd-bone px-8 py-4 font-sans font-semibold rounded-sm hover:bg-[#A3602A] transition-colors duration-300 shadow-lg shadow-dd-ember/20 cursor-pointer"
            >
              Schedule My Demo
            </button>
            <p className="text-xs text-dd-bone/50 mt-4 font-mono tracking-wide">15-minute personalized setup • No commitment</p>
          </div>
        </motion.div>

        {/* ─── DEMO VIDEO ─── */}
        <motion.div variants={fadeUp} className="w-full aspect-video bg-dd-ash relative rounded-sm overflow-hidden shadow-2xl border border-dd-ash/50 group">

          {/* Actual 26s video */}
          <video 
            src="/assets/images/Video.mp4" 
            autoPlay 
            muted
            loop 
            playsInline
            controls
            suppressHydrationWarning
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.section>

      {/* ─── AI DEMO ─── */}
      <DemoSection />

      {/* ─── CAPABILITIES ─── */}
      <CapabilitiesSection />

      <Threshold isOpen />

      {/* ─── COMPARISON SECTION ─── */}
      <ComparisonSection />

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
                name: "Karem Lewis",
                title: "Owner, 24 Rental Units",
                image: "/assets/images/testimonial_1.png"
              },
              {
                quote: "The automated lock management alone pays for itself. No more tracking down cleaner access codes.",
                name: "Mike Johnson",
                title: "Boutique Hotel Owner",
                image: "/assets/images/testimonial_2.png"
              },
              {
                quote: "It actually sounds like me. Guests have no idea they are talking to an AI system.",
                name: "Robert Rodriguez",
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

      {/* ─── NATIVE INTEGRATIONS MARQUEE ─── */}
      <section className="py-16 border-y border-dd-ash/30 bg-[#0F0D0B]/30 flex flex-col items-center overflow-hidden">
        <div className="font-mono text-xs text-dd-bone/50 uppercase tracking-brand-caps font-semibold mb-8">
          Native API Integrations Built For Your Stack
        </div>
        <div 
          className="w-full relative max-w-[100vw] overflow-hidden flex"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
          }}
        >
          <div className="flex w-max animate-[scroll_25s_linear_infinite] hover:[animation-play-state:paused] items-center">
            {/* Duplicated list for seamless infinite scroll */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center justify-around min-w-full">
                {[
                  { name: "Streamline", src: "https://cdn.prod.website-files.com/5f63854d5970333ed31b1b06/64418de68de5f74ce0e2e4ef_streamline.png" },
                  { name: "Track", src: "https://cdn.prod.website-files.com/5f63854d5970333ed31b1b06/6524452a5f4f1219afacfd91_64d292fd1b4c2ee61f11bd56_track-p-500.png" },
                  { name: "Barefoot", src: "https://cdn.prod.website-files.com/5f63854d5970333ed31b1b06/64418de05bf12654fb86ead4_barefoot%20logo.png" },
                  { name: "Guesty", src: "https://cdn.prod.website-files.com/5f63854d5970333ed31b1b06/64418de1d56f14f1e3c4ce06_guesty.png" },
                  { name: "OwnerRez", src: "https://cdn.prod.website-files.com/5f63854d5970333ed31b1b06/64418de28de5f7bb3ee2e4cf_owner%20rez%20logo.png" },
                  { name: "Hostify", src: "https://cdn.prod.website-files.com/5f63854d5970333ed31b1b06/64418de0900e30fadff3125b_hostify-logo.png" },
                  { name: "Escapia", src: "https://cdn.prod.website-files.com/5f63854d5970333ed31b1b06/64418de25e8f7329a46f6711_escapia%20logo.png" },
                ].map((logo, j) => (
                  <div key={j} className="flex items-center justify-center mx-10 transition-transform duration-300 hover:scale-105 cursor-default">
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      loading="lazy" 
                      className="max-h-[35px] w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Threshold />

      {/* ─── APPROVAL ─── */}
      <ApprovalSection />

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
              <span className="font-sans text-5xl font-semibold text-dd-bone">$9</span>
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
      <section id="calendar" className="py-24 px-6 md:px-12 bg-[#0F0D0B] relative overflow-hidden mt-12">
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
          <button
            onClick={() => document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-dd-ember text-dd-bone px-8 py-4 font-sans font-semibold rounded-sm hover:bg-[#A3602A] transition-colors duration-300 shadow-lg shadow-dd-ember/20 cursor-pointer"
          >
            Schedule My Demo
          </button>
          <p className="text-xs text-dd-bone/50 mt-4 font-mono tracking-wide">15-minute personalized setup • No commitment</p>
        </motion.div>
      </section>
    </div>
  );
}
