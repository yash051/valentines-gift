"use client";
import React from "react";
import { motion, Transition } from "framer-motion"; // Import Transition type

// Explicitly type the transition to avoid the "string is not assignable" error
const ribbonTransition: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 15,
  delay: 0.1,
};

/**
 * The part of the ribbon that goes BEHIND the butterflies.
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
        <path
          d="M 80 75 Q 100 85 120 75"
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
 */
export const RibbonFront = ({ isHugging }: { isHugging: boolean }) => {
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isHugging ? 1.4 : 0,
        opacity: isHugging ? 1 : 0,
      }}
      transition={ribbonTransition}
    >
      <svg
        width="200"
        height="160"
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

        <path
          d="M 100 75 C 95 75, 85 70, 80 75"
          stroke="url(#ribbon-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M 100 75 C 105 75, 115 70, 120 75"
          stroke="url(#ribbon-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M 100 75 C 80 45, 50 45, 60 80 C 65 95, 95 85, 100 75"
          fill="#ef4444"
          stroke="#b91c1c"
          strokeWidth="2"
          opacity="0.9"
        />
        <path
          d="M 100 75 C 120 45, 150 45, 140 80 C 135 95, 105 85, 100 75"
          fill="#ef4444"
          stroke="#b91c1c"
          strokeWidth="2"
          opacity="0.9"
        />

        <path d="M 100 80 Q 90 110 75 125" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
        <path d="M 100 80 Q 110 110 125 125" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />

        <circle cx="100" cy="75" r="8" fill="#b91c1c" />
        <circle cx="100" cy="74" r="7" fill="#ef4444" />
        <circle cx="98" cy="72" r="2" fill="white" opacity="0.6" />
      </svg>
    </motion.div>
  );
};