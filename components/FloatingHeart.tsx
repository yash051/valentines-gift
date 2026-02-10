// components/FloatingHeart.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export const FloatingHeart = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, y: 0 }}
    animate={{ opacity: [0, 1, 0], scale: 1.5, y: -100 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2, delay: delay, ease: "easeOut" }}
    className="absolute text-red-400 text-2xl md:text-4xl top-1/2 left-1/2"
    // Randomize horizontal start position slightly
    style={{ marginLeft: `${Math.random() * 40 - 20}px` }} 
  >
    ❤️
  </motion.div>
);