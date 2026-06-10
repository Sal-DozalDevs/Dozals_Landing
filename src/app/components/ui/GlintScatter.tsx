"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Glint from "./Glint";

// A simple seeded PRNG
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface GlintScatterProps {
  seed?: number;
}

export default function GlintScatter({ seed = 4786 }: GlintScatterProps) {
  const { scrollY } = useScroll();
  
  // Parallax layers - move "away" (upwards) as you scroll down
  const bgY = useTransform(scrollY, [0, 1000], [0, -100]);
  const mgY = useTransform(scrollY, [0, 1000], [0, -200]);
  const fgY = useTransform(scrollY, [0, 1000], [0, -400]);

  const glints = useMemo(() => {
    const random = mulberry32(seed);

    // 15 Background Ghost Glints (15% count, increased opacity)
    const bgGlints = Array.from({ length: 15 }).map((_, i) => ({
      id: `bg-${i}`,
      left: `${random() * 100}%`,
      top: `${random() * 100}%`,
      size: 10,
      opacity: 0.4 + random() * 0.4, // 40% - 80%
      color: "text-dd-bone",
    }));

    // 2 Midground Ember Glints (15% count, increased opacity)
    const mgGlints = Array.from({ length: 2 }).map((_, i) => ({
      id: `mg-${i}`,
      left: `${random() * 100}%`,
      top: `${random() * 100}%`,
      size: random() > 0.5 ? 10 : 18,
      opacity: 0.8 + random() * 0.2, // 80% - 100%
      color: "text-dd-ember",
    }));

    // 1 Foreground Ember Glint
    const fgGlint = {
      id: "fg-1",
      left: `${10 + random() * 80}%`,
      top: `${10 + random() * 80}%`,
      size: 36,
      opacity: 1,
      color: "text-dd-ember",
    };

    return { bgGlints, mgGlints, fgGlint };
  }, [seed]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {glints.bgGlints.map((g) => (
          <div
            key={g.id}
            className={`absolute flex items-center justify-center ${g.color}`}
            style={{
              left: g.left,
              top: g.top,
              opacity: g.opacity,
              width: g.size,
              height: g.size,
            }}
          >
            <Glint className="w-full h-full fill-current" />
          </div>
        ))}
      </motion.div>

      {/* Midground */}
      <motion.div className="absolute inset-0" style={{ y: mgY }}>
        {glints.mgGlints.map((g) => (
          <div
            key={g.id}
            className={`absolute flex items-center justify-center ${g.color}`}
            style={{
              left: g.left,
              top: g.top,
              opacity: g.opacity,
              width: g.size,
              height: g.size,
            }}
          >
            <Glint className="w-full h-full fill-current" />
          </div>
        ))}
      </motion.div>

      {/* Foreground */}
      <motion.div className="absolute inset-0" style={{ y: fgY }}>
        <div
          className={`absolute flex items-center justify-center ${glints.fgGlint.color}`}
          style={{
            left: glints.fgGlint.left,
            top: glints.fgGlint.top,
            opacity: glints.fgGlint.opacity,
            width: glints.fgGlint.size,
            height: glints.fgGlint.size,
          }}
        >
          <Glint className="w-full h-full fill-current" />
        </div>
      </motion.div>
    </div>
  );
}
