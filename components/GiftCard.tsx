'use client';

import { useState, useEffect } from 'react';
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
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const checkTime = () => {
      const targetDate = new Date(day.date + 'T00:00:00'); 
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setIsLocked(false);
        setTimeLeft('OPEN NOW');
      } else {
        setIsLocked(true);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${mins}m`);
      }
    };

    checkTime();
    const timer = setInterval(checkTime, 60000);
    return () => clearInterval(timer);
  }, [day.date]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative w-full h-[500px] rounded-xl shadow-2xl overflow-hidden group ${
        isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {/* 1. BACKGROUND IMAGE */}
      <Image
        src={day.image}
        alt={day.title}
        fill
        className={`object-cover transition-all duration-500 ${
          isLocked ? 'grayscale blur-sm' : 'group-hover:scale-110'
        }`}
      />

      {/* 2. DARK OVERLAY (Makes text readable) */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all" />

      {/* 3. CONTENT (Text & Icons) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
        {isLocked ? (
          <>
            <GiftCountdown targetDate={day.date} />
            <h3 className="text-2xl font-bold drop-shadow-lg">{day.title}</h3>
            <p className="text-sm mt-2 opacity-90">*I won't say sorry for make you wait</p>
          </>
        ) : (
          <Link href={day.path} className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl mb-2 animate-bounce">🎁</span>
            <h3 className="text-2xl font-bold drop-shadow-lg text-pink-200">{day.title}</h3>
            <p className="text-sm mt-2 bg-pink-600 px-3 py-1 rounded-full shadow-lg">
              Click to Open
            </p>
          </Link>
        )}
      </div>

      {/* 4. RIBBON (Top Right) */}
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