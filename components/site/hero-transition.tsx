"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import IntroAnimation from "@/components/ui/scroll-morph-hero";

/**
 * Hero → Dashboard blur transition.
 *
 * After the Hero Intro morph finishes (its internal wheel capture releases),
 * native page scroll resumes. As the user keeps scrolling down, the hero
 * blurs out while the dashboard preview (passed as `children`) blurs in —
 * in the same screen region — so it reads as a blur-out / blur-in transition
 * into the rest of the site instead of an abrupt cut.
 */
export default function HeroTransition({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Hero stays sharp for the first ~70% of its exit, then blurs out.
    const heroBlur = useTransform(
        scrollYProgress,
        [0, 0.7, 1],
        ["blur(0px)", "blur(0px)", "blur(24px)"]
    );
    return (
        <>
            <motion.section
                id="hero"
                data-section="Hero"
                className="hero wrap"
                ref={ref}
                style={{ padding: 0, filter: heroBlur }}
            >
                <div style={{ height: "100vh", minHeight: 640, width: "100%" }}>
                    <IntroAnimation />
                </div>
            </motion.section>

            {children}
        </>
    );
}