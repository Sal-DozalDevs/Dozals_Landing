"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLATFORMS = [
  "Airbnb",
  "Vrbo",
  "Booking",
  "Expedia",
  "Vacasa"
];

export default function RotatingPlatformText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PLATFORMS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block mx-2 font-serif font-medium align-middle">
      <span className="invisible px-1">Booking</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-dd-ember italic font-serif leading-tight px-1 whitespace-nowrap"
        >
          {PLATFORMS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
