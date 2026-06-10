import React from "react";
import Glint from "./Glint";

interface ThresholdProps {
  isOpen?: boolean;
}

export default function Threshold({ isOpen = false }: ThresholdProps) {
  return (
    <div className="w-full flex items-center justify-center h-8 px-6 md:px-12 max-w-6xl mx-auto">
      {isOpen ? (
        <div className="w-full flex items-center justify-center overflow-hidden">
          <svg className="flex-grow h-[1px] text-dd-ember/30" preserveAspectRatio="none" viewBox="0 0 100 1">
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <Glint className="mx-8 w-3 h-3 shrink-0 text-dd-ember fill-current opacity-90" />
          <svg className="flex-grow h-[1px] text-dd-ember/30" preserveAspectRatio="none" viewBox="0 0 100 1">
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      ) : (
        <svg className="w-full h-[1px] text-dd-ember/30" preserveAspectRatio="none" viewBox="0 0 100 1">
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
    </div>
  );
}
