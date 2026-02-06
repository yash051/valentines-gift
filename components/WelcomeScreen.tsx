'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface WelcomeProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleEnter = () => {
    // 1. Trigger the confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#f472b6', '#ffffff'] // Pink & White theme
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#f472b6', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 2. Fade out this screen
    setIsVisible(false);
    
    // 3. Notify parent component to start music/main content
    setTimeout(() => {
      onEnter();
    }, 500); // Wait for fade out
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="text-4xl md:text-6xl font-bold text-pink-500 mb-8 text-center px-4"
          >
            For My Valentine ❤️
          </motion.h1>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}
            className="px-8 py-4 bg-white text-pink-600 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-shadow"
          >
            Click to Open Gift 🎁
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}