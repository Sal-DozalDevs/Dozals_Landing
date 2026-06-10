"use client";

import React, { useEffect } from "react";

export default function GHLCalendar() {
  useEffect(() => {
    // Dynamically inject the GoHighLevel form script to ensure it executes
    const script = document.createElement("script");
    script.src = "https://go.dozaldevs.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full w-full mx-auto bg-transparent relative z-20 min-h-[600px]">
      <iframe
        src="https://go.dozaldevs.com/widget/booking/t70NOkaufqzLgfz7goTA"
        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "600px" }}
        scrolling="no"
        id="t70NOkaufqzLgfz7goTA_1781124190117"
        className="bg-transparent w-full"
      />
    </div>
  );
}
