"use client";

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const ApprovalSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 w-full bg-[#332E27] text-[#F3EFEA]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp} 
          className="w-full md:w-[55%] space-y-8"
        >
          <div className="text-[#C17D41] text-2xl font-light leading-none">✦</div>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] tracking-tight">
            Every Dozal checks with<br className="hidden md:block" /> you before it acts.
          </h2>
          
          <div className="space-y-6 text-lg text-white/60 leading-relaxed font-sans max-w-lg">
            <p>
              It does the work, shows you the draft, and waits. You approve it, edit it, or skip it. Until it's ready.
            </p>
            <p className="text-base">
              When you've seen it get things right enough times, you let it run on its own. Support, not surveillance. You stay in control for as long as you want to be.
            </p>
          </div>
        </motion.div>

        {/* Mockup Card */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp} 
          className="w-full md:w-[45%] flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="bg-[#F9F7F1] rounded-lg p-6 md:p-8 shadow-2xl max-w-sm w-full text-left">
              <div className="text-[10px] font-semibold text-[#8B9285] uppercase tracking-widest mb-4">
                97% confidence, message sent
              </div>
              
              <h3 className="text-[#1C1A18] font-semibold text-[15px] mb-2">
                Guest reply \ Unit 12, checkout morning
              </h3>
              
              <p className="font-mono text-xs text-[#6B6A68] leading-relaxed mb-6">
                "Hi Kara! Yes you can stay 1 hour longer, the lock code will stay active. Let me know if you need anything."
              </p>
              
              <div className="flex gap-3 relative">
                <button className="bg-[#D38B5D] hover:bg-[#B57540] text-black/80 font-medium py-2 px-5 rounded-sm transition-colors cursor-pointer text-sm">
                  Great
                </button>
                <button className="bg-transparent border border-[#E5E0D8] hover:bg-[#E5E0D8]/50 text-[#1C1A18] font-medium py-2 px-5 rounded-sm transition-colors cursor-pointer relative group text-sm">
                  Edit reply instructions
                  {/* Fake Cursor overlaying the Edit button */}
                  <svg className="absolute -bottom-4 -right-2 w-5 h-5 text-black drop-shadow-md z-10" viewBox="0 0 32 32" fill="black" stroke="white" strokeWidth="2">
                    <path d="M10.5 5.5l14 13-5.5 1-4.5 8-4-22z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ApprovalSection;
