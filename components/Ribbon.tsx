"use client";
import React from "react";
import { motion } from "framer-motion";

const ribbonTransition = {
  type: "spring",
  stiffness: 120,
  damping: 15,
  delay: 0.1,
};

/**
 * The part of the ribbon that goes BEHIND the butterflies.
 * Adjusted Y to 75 (Lower waist).
 */
export const RibbonBack = ({ isHugging }: { isHugging: boolean }) => {
  return (
    <motion.div
      className="absolute z-0 pointer-events-none"
      initial={{ opacity: 0, scaleX: 0.8 }}
      animate={{
        opacity: isHugging ? 1 : 0,
        scaleX: isHugging ? 1 : 0.8,
      }}
      transition={ribbonTransition}
    >
      <svg width="200" height="140" viewBox="0 0 200 140" className="overflow-visible">
        {/* 
           A dark curve connecting the outer waists behind their backs.
           Lowered from y=55 to y=75 to match the new front position.
        */}
        <path
          d="M 65 75 Q 100 95 135 75"
          fill="none"
          stroke="#991b1b" 
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

/**
 * The part of the ribbon that goes IN FRONT.
 * Moved everything down by ~20px to clear the faces.
 */
export const RibbonFront = ({ isHugging }: { isHugging: boolean }) => {
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isHugging ? 1 : 0,
        opacity: isHugging ? 1 : 0,
      }}
      transition={ribbonTransition}
    >
      <svg
        width="240"
        height="160" // Increased height to fit tails
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xl overflow-visible"
      >
        <defs>
            <linearGradient id="ribbon-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
        </defs>

        {/* --- LEFT SIDE WRAP --- */}
        {/* Adjusted from y=55 to y=75 */}
        <path
          d="M 100 75 C 90 75, 75 65, 65 75"
          stroke="url(#ribbon-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        {/* --- RIGHT SIDE WRAP --- */}
        {/* Adjusted from y=55 to y=75 */}
        <path
          d="M 100 75 C 110 75, 125 65, 135 75"
          stroke="url(#ribbon-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        {/* --- THE BOW LOOPS --- */}
        {/* 
            Lowered anchor to 75. 
            Lowered top control points from 20 to 45 so loops don't cover eyes.
        */}
        {/* Left Loop */}
        <path
          d="M 100 75 C 80 45, 40 45, 50 80 C 55 95, 90 85, 100 75"
          fill="#ef4444"
          stroke="#b91c1c"
          strokeWidth="2"
          opacity="0.9"
        />
        {/* Right Loop */}
        <path
          d="M 100 75 C 120 45, 160 45, 150 80 C 145 95, 110 85, 100 75"
          fill="#ef4444"
          stroke="#b91c1c"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* --- RIBBON TAILS --- */}
        {/* Starts at 80, flows down */}
        <path d="M 100 80 Q 90 110 70 125" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
        <path d="M 100 80 Q 110 110 130 125" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />

        {/* --- KNOT (Center) --- */}
        {/* Moved to y=75 */}
        <circle cx="100" cy="75" r="8" fill="#b91c1c" />
        <circle cx="100" cy="74" r="7" fill="#ef4444" />
        {/* Shine */}
        <circle cx="98" cy="72" r="2" fill="white" opacity="0.6" />
      </svg>
    </motion.div>
  );
};