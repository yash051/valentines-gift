"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButterflyProps {
  primaryColor: string;   // Main wing color
  secondaryColor: string; // Wing tips/gradients
  patternColor: string;   // Dots/Veins
  bodyColor: string;      // Body gradient base
  isHugging: boolean;
  direction: "left" | "right";
}

export const Butterfly = ({
  primaryColor,
  secondaryColor,
  patternColor,
  bodyColor,
  isHugging,
  direction,
}: ButterflyProps) => {
  const isLeft = direction === "left";
  const uniqueId = `grad-${direction}`; // Unique ID for SVG gradients

  return (
    <motion.div
      className="relative w-32 h-32 md:w-40 md:h-40 pointer-events-none"
      animate={{
        rotate: isHugging ? (isLeft ? 25 : -25) : isLeft ? 10 : -10,
        y: isHugging ? 0 : [0, -10, 0],
        scale: isHugging ? 1.1 : 1, 
      }}
      transition={{
        rotate: { type: "spring", stiffness: 60, damping: 10 },
        y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
        scale: { duration: 0.3 }
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
        <defs>
          {/* Wing Gradient */}
          <linearGradient id={`${uniqueId}-wing`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
          
          {/* Body Gradient (3D effect) */}
          <linearGradient id={`${uniqueId}-body`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={bodyColor} stopOpacity="1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor={bodyColor} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* --- RIGHT WING GROUP --- */}
        <motion.g
          style={{ originX: 0, originY: 0.5 }} // Pivot at body center
          animate={{
            scaleX: isHugging ? [0.8, 0.4] : [1, 0.6], 
            skewY: isLeft ? -5 : 5,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: isHugging ? 0.15 : 0.5,
            ease: "easeInOut",
          }}
        >
          {/* Main Wing Shape */}
          <path
            d="M52 48 C 80 10, 95 15, 95 40 C 95 65, 80 85, 52 65 Z"
            fill={`url(#${uniqueId}-wing)`}
            stroke={bodyColor}
            strokeWidth="0.5"
          />
          {/* Inner Wing Pattern (Veins) */}
          <path
            d="M55 50 C 75 25, 85 30, 85 45 C 85 60, 70 70, 55 60"
            fill="none"
            stroke={patternColor}
            strokeWidth="1"
            opacity="0.6"
          />
          {/* Decorative Spots */}
          <circle cx="85" cy="25" r="3" fill="white" opacity="0.8" />
          <circle cx="90" cy="40" r="2" fill="white" opacity="0.8" />
          <circle cx="82" cy="55" r="2.5" fill="white" opacity="0.8" />
        </motion.g>

        {/* --- LEFT WING GROUP --- */}
        <motion.g
          style={{ originX: 1, originY: 0.5 }} // Pivot at body center
          animate={{
            scaleX: isHugging ? [0.8, 0.4] : [1, 0.6],
            skewY: isLeft ? 5 : -5,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: isHugging ? 0.15 : 0.5,
            ease: "easeInOut",
          }}
        >
          {/* Main Wing Shape */}
          <path
            d="M48 48 C 20 10, 5 15, 5 40 C 5 65, 20 85, 48 65 Z"
            fill={`url(#${uniqueId}-wing)`}
            stroke={bodyColor}
            strokeWidth="0.5"
          />
          {/* Inner Wing Pattern */}
          <path
            d="M45 50 C 25 25, 15 30, 15 45 C 15 60, 30 70, 45 60"
            fill="none"
            stroke={patternColor}
            strokeWidth="1"
            opacity="0.6"
          />
          {/* Decorative Spots */}
          <circle cx="15" cy="25" r="3" fill="white" opacity="0.8" />
          <circle cx="10" cy="40" r="2" fill="white" opacity="0.8" />
          <circle cx="18" cy="55" r="2.5" fill="white" opacity="0.8" />
        </motion.g>

        {/* --- BODY (Drawn on top) --- */}
        <g filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.3))">
          
          {/* Antennae (Curled) */}
          <path d="M46 36 C 40 25, 30 20, 35 30" stroke={bodyColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M54 36 C 60 25, 70 20, 65 30" stroke={bodyColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Head */}
          <circle cx="50" cy="38" r="6" fill={bodyColor} />
          
          {/* Eyes (Cute Highlights) */}
          <circle cx="48" cy="37" r="1.5" fill="white" />
          <circle cx="52" cy="37" r="1.5" fill="white" />

          {/* Thorax (Middle) */}
          <ellipse cx="50" cy="48" rx="5" ry="8" fill={`url(#${uniqueId}-body)`} />

          {/* Abdomen (Bottom) - segmented */}
          <ellipse cx="50" cy="62" rx="4" ry="12" fill={`url(#${uniqueId}-body)`} />
          <path d="M47 60 L53 60" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
          <path d="M47 64 L53 64" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
          <path d="M48 68 L52 68" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        </g>
      </svg>
    </motion.div>
  );
};