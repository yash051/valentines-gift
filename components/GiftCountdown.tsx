'use client';

import { useState, useEffect } from 'react';

export default function GiftCountdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Function to calculate time
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference < 0) {
        return "Unlocked!";
      }

      // Math for days, hours, minutes, seconds
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Formatting: Add '0' if number is less than 10 (e.g., 05s instead of 5s)
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    // Update immediately so we don't wait 1 second for first render
    setTimeLeft(calculateTime());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    // Cleanup when leaving the page
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center z-20 animate-pulse">
      {/* The Gift Knot (Emoji or Icon) */}
      <div className="text-5xl drop-shadow-md" style={{ marginBottom: '-10px', zIndex: 10 }}>
        🎀
      </div>
      
      {/* The Tag with the Time */}
      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl border border-pink-200 text-center transform rotate-2 hover:rotate-0 transition-transform duration-300">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Unlocks In</p>
        <p className="text-lg font-bold text-[#d81b60] font-mono min-w-[140px]">
          {timeLeft}
        </p>
      </div>
    </div>
  );
}