"use client";

import Script from "next/script";

export default function GHLCalendar() {
  return (
    <div className="w-full mx-auto bg-transparent relative z-20 min-h-[600px]">
      <iframe
        src="https://go.dozaldevs.com/widget/booking/t70NOkaufqzLgfz7goTA"
        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "600px" }}
        scrolling="no"
        id="t70NOkaufqzLgfz7goTA_1782158752498"
        className="bg-transparent w-full"
      />
      <Script
        src="https://go.dozaldevs.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
