import React from "react";

interface GlintProps {
  className?: string;
}

export default function Glint({ className = "w-6 h-6 fill-current text-dd-ember" }: GlintProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Short axis (horizontal) is 22%, long axis (vertical) is 100% */}
      <path d="M50 0 C50 39, 39 50, 0 50 C39 50, 50 61, 50 100 C50 61, 61 50, 100 50 C61 50, 50 39, 50 0 Z" />
    </svg>
  );
}
