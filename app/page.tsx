'use client';

import { useState } from 'react';
import { valentineDays } from '../lib/days';
import GiftCard from '../components/GiftCard';
import WelcomeScreen from '../components/WelcomeScreen';
import { motion } from 'framer-motion';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white pb-10">
      {!started ? (
        <WelcomeScreen onEnter={() => setStarted(true)} />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="flex flex-col min-h-screen"
        >
          
          {/* Header Section */}
          <div className="text-center pt-10 px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-pink-500 mb-2 font-serif">
              Valentine's Week ❤️
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Swipe to see your surprises...
            </p>
          </div>

          {/* CAROUSEL CONTAINER */}
          <div className="flex-1 flex items-center justify-start overflow-x-auto snap-x snap-mandatory p-8 gap-6 no-scrollbar">
            {valentineDays.map((day) => (
              <div 
                key={day.id} 
                className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[400px]"
              >
                {/* We wrap GiftCard in a div with a fixed width.
                   Mobile: w-[85vw] (85% of screen width, lets them peek at next card)
                   Desktop: w-[400px] (Fixed card size)
                */}
                <GiftCard day={day} />
              </div>
            ))}
            
            {/* Spacer to allow scrolling to the very end */}
            <div className="shrink-0 w-4" />
          </div>

        </motion.div>
      )}
    </main>
  );
}