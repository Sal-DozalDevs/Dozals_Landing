"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Conversation prompts that cycle through ── */
const DEMO_PROMPTS = [
  "Send me notifications each time you answer a message",
  "Before sending the new lock code to a guest SMS me",
  "Approve late checkouts up to 1 hour, otherwise ask me first",
  "Block off the calendar for maintenance next Tuesday",
  "If a guest asks for a restaurant recommendation send them my local guide",
];

/* ── Typing speed parameters ── */
const TYPE_DELAY = 55;       // ms between each character
const PAUSE_AFTER = 2200;    // ms to hold the finished message
const ERASE_DELAY = 30;      // ms between each character erase
const PAUSE_BEFORE = 600;    // ms before typing starts again

export default function DemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  /* ── Phase management for the beam → input animation ── */
  const [phase, setPhase] = useState<"idle" | "beam" | "morph" | "ready">("idle");
  
  /* ── Typing animation state ── */
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isErasing, setIsErasing] = useState(false);

  /* ── Trigger the animation sequence when in view ── */
  useEffect(() => {
    if (!isInView) return;
    setPhase("beam");
    const morphTimer = setTimeout(() => setPhase("morph"), 1200);
    const readyTimer = setTimeout(() => setPhase("ready"), 2400);
    return () => {
      clearTimeout(morphTimer);
      clearTimeout(readyTimer);
    };
  }, [isInView]);

  /* ── Typing / erasing cycle ── */
  useEffect(() => {
    if (phase !== "ready") return;

    const currentPrompt = DEMO_PROMPTS[currentPromptIndex];

    if (!isErasing) {
      // Typing forward
      if (displayedText.length < currentPrompt.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentPrompt.slice(0, displayedText.length + 1));
        }, TYPE_DELAY);
        return () => clearTimeout(timer);
      } else {
        // Finished typing → pause, then erase
        const timer = setTimeout(() => setIsErasing(true), PAUSE_AFTER);
        return () => clearTimeout(timer);
      }
    } else {
      // Erasing
      if (displayedText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, ERASE_DELAY);
        return () => clearTimeout(timer);
      } else {
        // Finished erasing → move to next prompt
        const timer = setTimeout(() => {
          setIsErasing(false);
          setCurrentPromptIndex((prev) => (prev + 1) % DEMO_PROMPTS.length);
        }, PAUSE_BEFORE);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, displayedText, isErasing, currentPromptIndex]);

  /* ── Auto-scroll text container to keep cursor in view ── */
  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollLeft = textContainerRef.current.scrollWidth;
    }
  }, [displayedText]);

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 overflow-hidden flex flex-col items-center"
      style={{ background: "radial-gradient(ellipse at 50% 40%, #231A13 0%, #0B0A08 70%)" }}
    >
      {/* ── Ambient background glow ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(196,122,61,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── Section heading ── */}
      <motion.div
        className="text-center mb-20 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="font-mono text-xs text-dd-bone/50 uppercase tracking-brand-caps block mb-4">
          Live Demo
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-medium text-dd-bone max-w-3xl mx-auto">
          Delegate tasks to your Dozal like a real employee
        </h2>
      </motion.div>

      {/* ── The animation stage ── */}
      <div className="relative w-full max-w-3xl mx-auto flex justify-center" style={{ minHeight: "120px" }}>

        {/* ═══════════ PHASE 1: BEAM ═══════════ */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: phase === "beam" ? 1 : 0,
            transition: "opacity 0.4s ease-out",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "4px",
              position: "relative",
            }}
          >
            {/* The beam core */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "10px",
                background: "linear-gradient(270deg, transparent 0%, #ffffff 5%, #ECE1CB 15%, #D29B44 30%, #C47A3D 60%, transparent 100%)",
                animation: phase === "beam" ? "beamSweep 1.2s ease-out forwards" : "none",
                boxShadow: "0 0 20px 2px rgba(210,155,68,0.8)",
              }}
            />
            {/* Bloom / halo */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                bottom: "-20px",
                left: 0,
                right: 0,
                borderRadius: "30px",
                background: "linear-gradient(270deg, transparent 0%, rgba(255,255,255,0.8) 5%, rgba(236,225,203,0.6) 15%, rgba(210,155,68,0.4) 30%, rgba(196,122,61,0.2) 60%, transparent 100%)",
                animation: phase === "beam" ? "beamSweep 1.2s ease-out forwards" : "none",
                filter: "blur(16px)",
              }}
            />
          </div>
        </div>

        {/* ═══════════ PHASE 2 & 3: MORPH → INPUT ═══════════ */}
        <div
          className="relative flex items-center justify-center gap-4 w-full"
          style={{
            opacity: phase === "morph" || phase === "ready" ? 1 : 0,
            transform: phase === "morph" || phase === "ready" ? "scaleY(1)" : "scaleY(0.1)",
            transition: "opacity 0.4s ease-out, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Input Box Wrapper */}
          <div
            className="relative flex-1"
            style={{
              padding: "2px",
              borderRadius: "60px",
              background: "rgba(196,122,61,0.2)",
              boxShadow: phase === "ready" ? "0 0 30px rgba(196,122,61,0.15)" : "none",
              overflow: "hidden",
            }}
          >
            {/* Spinning Glow Layer */}
            {phase === "ready" && (
              <div
                className="absolute"
                style={{
                  top: "-150%", left: "-50%", right: "-50%", bottom: "-150%",
                  background: "conic-gradient(from 90deg, transparent 0%, transparent 70%, rgba(196,122,61,0.8) 85%, rgba(210,155,68,1) 98%, rgba(247,239,225,1) 100%)",
                  animation: "spin 4s linear infinite",
                }}
              />
            )}

            {/* The dark inner input box */}
            <div
              className="relative flex items-center w-full"
              style={{
                background: "linear-gradient(135deg, #13100c 0%, #0B0A08 100%)",
                borderRadius: "58px",
                padding: "20px 32px",
                minHeight: "72px",
                zIndex: 1,
              }}
            >
              <div 
                ref={textContainerRef}
                className="flex-1 flex items-center overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >

                <span
                  className="font-sans text-xl md:text-2xl"
                  style={{
                    color: "rgba(255,245,240,0.95)",
                    fontWeight: 400,
                  }}
                >
                  {displayedText}
                </span>
                {phase === "ready" && (
                  <span
                    className="inline-block ml-1 flex-shrink-0"
                    style={{
                      width: "3px",
                      height: "1.2em",
                      background: "linear-gradient(180deg, #D29B44, #C47A3D)",
                      animation: "cursorBlink 1s step-end infinite",
                      verticalAlign: "middle",
                      borderRadius: "2px",
                      boxShadow: "0 0 8px rgba(196,122,61,0.6)",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Search Button Wrapper */}
          <div
            className="relative flex-shrink-0"
            style={{
              width: "72px",
              height: "72px",
              padding: "2px",
              borderRadius: "50%",
              background: "rgba(196,122,61,0.2)",
              boxShadow: phase === "ready" ? "0 0 20px rgba(196,122,61,0.15)" : "none",
              overflow: "hidden",
            }}
          >
            {/* Spinning Glow for button */}
            {phase === "ready" && (
               <div
                 className="absolute"
                 style={{
                   top: "-50%", left: "-50%", right: "-50%", bottom: "-50%",
                   background: "conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(196,122,61,0.8) 80%, rgba(247,239,225,1) 100%)",
                   animation: "spin 3s linear infinite",
                 }}
               />
            )}
            
            <div
              className="relative flex items-center justify-center w-full h-full"
              style={{
                background: "linear-gradient(135deg, #13100c 0%, #0B0A08 100%)",
                borderRadius: "50%",
                zIndex: 1,
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-label ── */}
      <motion.p
        className="text-xs text-dd-bone/40 mt-10 font-mono tracking-wide text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={phase === "ready" ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Dozal works 24/7 • Adapts to your unique management style
      </motion.p>

      {/* ── Inline keyframes ── */}
      <style jsx>{`
        @keyframes beamSweep {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes cursorBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
