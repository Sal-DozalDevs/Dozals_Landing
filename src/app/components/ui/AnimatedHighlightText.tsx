"use client";

import React, { useState, useEffect } from "react";

export default function AnimatedHighlightText({ text }: { text: string }) {
  const words = text.split(" ");
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    let isMounted = true;
    
    const runAnimation = () => {
      let index = 0;
      setHighlightIndex(-1);
      
      // Short delay before starting
      timeoutId = setTimeout(() => {
        intervalId = setInterval(() => {
          if (!isMounted) return;
          
          if (index < words.length) {
            setHighlightIndex(index);
            index++;
          } else {
            clearInterval(intervalId);
            // Wait 2 seconds, turn off
            timeoutId = setTimeout(() => {
              if (!isMounted) return;
              setHighlightIndex(-1);
              // Wait 20 seconds, start over
              timeoutId = setTimeout(() => {
                if (!isMounted) return;
                runAnimation();
              }, 20000);
            }, 2000);
          }
        }, 150); // fast highlight speed
      }, 500);
    };

    runAnimation();

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [words.length]);

  return (
    <>
      {words.map((word, idx) => (
        <span
          key={idx}
          className={`transition-colors duration-150 ${
            idx <= highlightIndex ? "bg-dd-ember text-[#0F0D0B]" : "bg-transparent text-dd-bone"
          }`}
        >
          {word}{idx < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
