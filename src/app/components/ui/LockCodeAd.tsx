"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const SCENE_DURATIONS = [3000, 7000, 12000, 8000];

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 280, height: 560 }}>
      <div
        className="absolute inset-0 rounded-[36px] border-[3px] border-dd-ash/60 bg-[#0a0908] shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 0 60px rgba(196,122,61,0.1), 0 25px 50px rgba(0,0,0,0.5)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0a0908] rounded-b-2xl z-20" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-dd-ash/40 rounded-full z-20" />
        <div className="w-full h-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function NotificationBubble({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="mx-4 mt-2"
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <div className="bg-[#1c1a17] rounded-2xl p-3 border border-dd-ash/30">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 rounded-md bg-dd-ember/80 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="text-[10px] text-dd-bone/50 font-sans font-medium uppercase tracking-wider">Smart Lock</span>
          <span className="text-[10px] text-dd-bone/30 font-sans ml-auto">now</span>
        </div>
        <p className="text-[13px] text-dd-bone/90 font-sans leading-snug">
          Guest checkout: <span className="font-semibold text-dd-bone">Unit 12</span>
        </p>
      </div>
    </motion.div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] text-dd-bone/50 font-mono">
      <span>11:02</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-[2px]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[3px] bg-dd-bone/50 rounded-sm" style={{ height: 4 + i * 2 }} />
          ))}
        </div>
        <svg width="14" height="10" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2" className="text-dd-bone/50">
          <rect x="1" y="1" width="18" height="14" rx="2" />
          <rect x="20" y="5" width="3" height="6" rx="1" fill="currentColor" />
          <rect x="3" y="3" width="10" height="10" rx="1" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
    </div>
  );
}

function SceneHook() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PhoneFrame>
        <div className="bg-[#0e0c0a] h-full flex flex-col">
          <StatusBar />
          <div className="flex-1 flex flex-col justify-center">
            <NotificationBubble delay={0.6} />
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="inline-block bg-dd-obsidian/80 border border-dd-ash/30 rounded-lg px-4 py-2">
                <span className="font-mono text-xs text-dd-bone/60">11:02 AM</span>
                <span className="text-dd-bone/30 mx-2">|</span>
                <span className="font-sans text-xs text-dd-ember">Guest just checked out</span>
              </div>
            </motion.div>
          </div>
        </div>
      </PhoneFrame>
    </motion.div>
  );
}

const APP_STEPS = [
  { app: "Smart Lock App", action: "Delete old code", icon: "lock", color: "#C47A3D" },
  { app: "Smart Lock App", action: "Generate new code", icon: "key", color: "#C47A3D" },
  { app: "Smart Lock App", action: "Copy code", icon: "copy", color: "#C47A3D" },
  { app: "WhatsApp", action: "Paste to cleaner", icon: "chat", color: "#48684C" },
  { app: "WhatsApp", action: "Send message", icon: "send", color: "#48684C" },
  { app: "Airbnb", action: "Open reservation", icon: "home", color: "#A54134" },
  { app: "Airbnb", action: "Message next guest", icon: "mail", color: "#A54134" },
];

function AppStepCard({ step, index }: { step: typeof APP_STEPS[0]; index: number }) {
  return (
    <motion.div
      className="flex items-center gap-3 bg-[#1c1a17] border border-dd-ash/30 rounded-xl px-4 py-3 w-full max-w-[260px]"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: step.color + "22", border: `1px solid ${step.color}44` }}
      >
        <span className="text-xs font-mono font-bold" style={{ color: step.color }}>
          {index + 1}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-dd-bone/50 font-mono truncate">{step.app}</p>
        <p className="text-[13px] text-dd-bone/90 font-sans font-medium truncate">{step.action}</p>
      </div>
    </motion.div>
  );
}

function SceneProblem() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= APP_STEPS.length) return;
    const timer = setTimeout(() => {
      setCurrentStep((p) => p + 1);
    }, 850);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full gap-6"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex flex-col items-center gap-3 min-h-[340px] justify-center">
        <AnimatePresence mode="popLayout">
          {APP_STEPS.slice(0, currentStep + 1).map((step, i) => (
            <AppStepCard key={i} step={step} index={i} />
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentStep >= 4 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-sm text-dd-ember font-semibold tracking-wide">
          4 apps. 7 clicks. Every. Single. Checkout.
        </p>
      </motion.div>
    </motion.div>
  );
}

const SOLUTION_TEXT = "After every checkout, change the lock code and send the new one to the cleaner and the next guest.";

function SceneSolution() {
  const [phase, setPhase] = useState<"typing" | "connecting" | "running" | "done">("typing");
  const [typedText, setTypedText] = useState("");
  const [connectStep, setConnectStep] = useState(0);
  const [autoStep, setAutoStep] = useState(0);

  useEffect(() => {
    if (phase !== "typing") return;
    if (typedText.length < SOLUTION_TEXT.length) {
      const timer = setTimeout(() => {
        setTypedText(SOLUTION_TEXT.slice(0, typedText.length + 1));
      }, 45);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setPhase("connecting"), 800);
      return () => clearTimeout(timer);
    }
  }, [phase, typedText]);

  useEffect(() => {
    if (phase !== "connecting") return;
    if (connectStep < 2) {
      const timer = setTimeout(() => setConnectStep((p) => p + 1), 1200);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setPhase("running"), 600);
      return () => clearTimeout(timer);
    }
  }, [phase, connectStep]);

  useEffect(() => {
    if (phase !== "running") return;
    if (autoStep < 3) {
      const timer = setTimeout(() => setAutoStep((p) => p + 1), 1500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setPhase("done"), 800);
      return () => clearTimeout(timer);
    }
  }, [phase, autoStep]);

  const autoSteps = [
    { label: "Lock code changed", icon: "lock" },
    { label: "Cleaner notified", icon: "bell" },
    { label: "Next guest receives code", icon: "key" },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto px-4"
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-full bg-[#13110e] border border-dd-ash/30 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-dd-ash/20 bg-[#0e0c0a]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-dd-rust/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-dd-amber/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-dd-moss/60" />
          </div>
          <span className="text-[10px] font-mono text-dd-bone/40 ml-2">DozalDevs — Automation Studio</span>
        </div>

        <div className="p-5 min-h-[280px] flex flex-col">
          {(phase === "typing" || phase === "connecting" || phase === "running" || phase === "done") && (
            <div className="mb-5">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-dd-ember/20 border border-dd-ember/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C47A3D" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2a10 10 0 1 0 10 10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-mono text-dd-bone/40 mb-1.5 uppercase tracking-wider">New Automation</p>
                  <div className="bg-[#1c1a17] rounded-xl p-3 border border-dd-ash/20">
                    <p className="text-[13px] text-dd-bone/90 font-sans leading-relaxed">
                      {typedText}
                      {phase === "typing" && (
                        <span className="inline-block w-[2px] h-3.5 bg-dd-ember ml-0.5 align-middle animate-pulse" />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {phase === "connecting" || phase === "running" || phase === "done" ? (
            <div className="mb-5 space-y-2">
              <p className="text-[10px] font-mono text-dd-bone/40 uppercase tracking-wider mb-2">Connect Services</p>
              <motion.div
                className="flex items-center gap-3 bg-[#1c1a17] rounded-xl px-4 py-3 border border-dd-ash/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-6 h-6 rounded bg-dd-ember/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C47A3D" strokeWidth="2.5" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <span className="text-[12px] text-dd-bone/80 font-sans flex-1">Smart Lock API</span>
                {connectStep >= 1 ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 rounded-full bg-dd-moss flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-dd-ash/40 border-t-dd-ember animate-spin" />
                )}
              </motion.div>

              <motion.div
                className="flex items-center gap-3 bg-[#1c1a17] rounded-xl px-4 py-3 border border-dd-ash/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="w-6 h-6 rounded bg-dd-rust/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A54134" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <span className="text-[12px] text-dd-bone/80 font-sans flex-1">Airbnb</span>
                {connectStep >= 2 ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 rounded-full bg-dd-moss flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-dd-ash/40 border-t-dd-ember animate-spin" />
                )}
              </motion.div>
            </div>
          ) : null}

          {phase === "running" || phase === "done" ? (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[10px] font-mono text-dd-moss uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-dd-moss animate-pulse" />
                Automation Running
              </p>
              {autoSteps.slice(0, autoStep + 1).map((step, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 bg-[#1c1a17] rounded-xl px-4 py-2.5 border border-dd-moss/20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-5 h-5 rounded-full bg-dd-moss/20 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#48684C" strokeWidth="3" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                  <span className="text-[12px] text-dd-bone/80 font-sans">{step.label}</span>
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          {phase === "done" && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="font-mono text-sm text-dd-ember font-semibold">
                Describe it once. It runs forever.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SceneCTA({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full text-center px-6"
      variants={slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-16 h-16 mb-8"
      >
        <div className="w-full h-full rounded-2xl bg-dd-ember/20 border border-dd-ember/30 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C47A3D" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      </motion.div>

      <motion.h2
        className="font-serif text-3xl md:text-4xl text-dd-bone font-medium mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        What would you automate first?
      </motion.h2>

      <motion.p
        className="text-dd-bone/60 font-sans text-base mb-8 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Connect your tools. Describe the task. It&apos;s done.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <button className="bg-dd-ember text-dd-bone px-8 py-4 font-sans font-semibold rounded-sm hover:bg-[#A3602A] transition-colors duration-300 shadow-lg shadow-dd-ember/20 cursor-pointer">
          Try it free for 30 days
        </button>
        <button
          onClick={onReplay}
          className="border border-dd-ash/50 text-dd-bone/70 px-6 py-4 font-sans text-sm rounded-sm hover:bg-dd-ash/20 transition-colors duration-300 cursor-pointer flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Replay
        </button>
      </motion.div>
    </motion.div>
  );
}

function ProgressBar({ scene, elapsed }: { scene: number; elapsed: number }) {
  return (
    <div className="flex gap-1.5 w-full max-w-xs mx-auto">
      {SCENE_DURATIONS.map((d, i) => (
        <div key={i} className="flex-1 h-[3px] rounded-full bg-dd-ash/30 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: i < scene ? "#C47A3D" : i === scene ? "#C47A3D" : "transparent" }}
            initial={{ width: "0%" }}
            animate={{
              width: i < scene ? "100%" : i === scene ? `${Math.min((elapsed / d) * 100, 100)}%` : "0%",
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      ))}
    </div>
  );
}

export default function LockCodeAd() {
  const [scene, setScene] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const startTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      startTimeRef.current = performance.now();
      initializedRef.current = true;
    }
  }, []);

  const advanceScene = useCallback(() => {
    setScene((prev) => {
      if (prev >= 3) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
    startTimeRef.current = performance.now();
    setElapsed(0);
  }, []);

  const replay = useCallback(() => {
    setScene(0);
    setElapsed(0);
    setIsPlaying(true);
    startTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const tick = () => {
      const now = performance.now();
      const e = now - startTimeRef.current;
      setElapsed(e);

      if (e >= SCENE_DURATIONS[scene]) {
        advanceScene();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scene, isPlaying, advanceScene]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-dd-ash/30"
        style={{
          aspectRatio: "16/9",
          background: "radial-gradient(ellipse at 50% 40%, #1a1510 0%, #0B0A08 70%)",
          boxShadow: "0 0 80px rgba(196,122,61,0.08), 0 25px 50px rgba(0,0,0,0.4)",
        }}
      >
        <div className="absolute top-4 left-0 right-0 z-20">
          <ProgressBar scene={scene} elapsed={elapsed} />
        </div>

        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <span className="font-mono text-[10px] text-dd-bone/30 uppercase tracking-wider">
            {scene === 0 ? "Hook" : scene === 1 ? "Problem" : scene === 2 ? "Solution" : "CTA"}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {scene === 0 && <SceneHook key="hook" />}
            {scene === 1 && <SceneProblem key="problem" />}
            {scene === 2 && <SceneSolution key="solution" />}
            {scene === 3 && <SceneCTA key="cta" onReplay={replay} />}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={replay}
          className="flex items-center gap-2 text-dd-bone/50 hover:text-dd-bone/80 transition-colors font-sans text-sm cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Replay Ad
        </button>
        <span className="text-dd-bone/20">|</span>
        <span className="font-mono text-[10px] text-dd-bone/30">30s Ad Concept — &ldquo;The Lock Code&rdquo;</span>
      </div>
    </div>
  );
}
