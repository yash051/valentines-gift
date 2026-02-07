'use client';

import { useState, useEffect } from 'react';

// 👇 THIS INTERFACE IS WHAT VERCEL WAS MISSING
interface GiftCountdownProps {
  targetDate: string;
  onComplete?: () => void; // <--- The optional callback function
}

export default function GiftCountdown({ targetDate, onComplete }: GiftCountdownProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        // 🚨 Signal the parent component that time is up!
        if (onComplete) onComplete(); 
        return "Unlocked!";
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      const result = calculateTime();
      setTimeLeft(result);
      if (result === "Unlocked!") clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center z-20 animate-pulse">
      <div className="text-5xl drop-shadow-md" style={{ marginBottom: '-10px', zIndex: 10 }}>
        🎀
      </div>
      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl border border-pink-200 text-center transform rotate-2 hover:rotate-0 transition-transform duration-300">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Unlocks In</p>
        <p className="text-lg font-bold text-[#d81b60] font-mono min-w-[140px]">
          {timeLeft}
        </p>
      </div>
    </div>
  );
}