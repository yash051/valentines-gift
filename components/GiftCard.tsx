'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import GiftCountdown from './GiftCountdown';

interface GiftCardProps {
  day: {
    id: string;
    date: string;
    title: string;
    description: string;
    image: string;
    path: string;
  };
}

export default function GiftCard({ day }: GiftCardProps) {
  // 1. Initialize state by checking date IMMEDIATELY (prevents "Locked" flash on load)
  const [isLocked, setIsLocked] = useState(() => {
    const targetDate = new Date(day.date).getTime();
    const now = new Date().getTime();
    return targetDate > now;
  });

  // 2. Callback function for when the timer finishes
  const handleUnlock = () => {
    setIsLocked(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative w-full h-[500px] rounded-xl shadow-2xl overflow-hidden group ${
        isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {/* BACKGROUND IMAGE */}
      <Image
        src={day.image}
        alt={day.title}
        fill
        className={`object-cover transition-all duration-500 ${
          isLocked ? 'grayscale blur-sm' : 'group-hover:scale-110'
        }`}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
        {isLocked ? (
          <>
            {/* 🎁 THE FIX: Pass the onComplete prop here */}
            <GiftCountdown 
              targetDate={day.date} 
              onComplete={handleUnlock} 
            />
            
            <h3 className="text-2xl font-bold drop-shadow-lg mt-4">{day.title}</h3>
            <p className="text-sm mt-2 opacity-90 font-light italic">
              *I won't say sorry for make you wait
            </p>
          </>
        ) : (
          <Link href={day.path} className="absolute inset-0 flex flex-col items-center justify-center w-full h-full">
            <span className="text-5xl mb-3 animate-bounce">🎁</span>
            <h3 className="text-3xl font-bold drop-shadow-lg text-pink-200">{day.title}</h3>
            <div className="mt-4 bg-pink-600 px-6 py-2 rounded-full shadow-lg hover:bg-pink-500 transition-colors">
              Click to Open
            </div>
          </Link>
        )}
      </div>

      {/* RIBBON */}
      <div className="absolute top-0 right-0 z-20">
        <div className="w-32 h-8 absolute top-4 -right-8">
          <div
            className={`h-full w-full text-white text-xs font-bold flex items-center justify-center transform rotate-45 shadow-md border-b-2 border-white/20 ${
              isLocked ? 'bg-red-600' : 'bg-green-500'
            }`}
          >
            From ur Hubby
          </div>
        </div>
      </div>
    </motion.div>
  );
}