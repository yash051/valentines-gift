"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- Imports from your components folder ---
import { Butterfly } from "@/components/Butterfly";
import { RibbonFront, RibbonBack } from "@/components/Ribbon";
import { FloatingHeart } from "@/components/FloatingHeart";
import PageMusic from "@/components/PageMusic"; // Ensure this path is correct

export default function HugDay() {
  const [isHugging, setIsHugging] = useState(false);

  const startHug = () => setIsHugging(true);
  const endHug = () => setIsHugging(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#e0f2f1] overflow-hidden touch-none select-none font-sans"
      onMouseDown={startHug}
      onMouseUp={endHug}
      onMouseLeave={endHug}
      onTouchStart={startHug}
      onTouchEnd={endHug}
    >
      {/* Background Music */}
      <div className="absolute top-0 left-0">
         <PageMusic src="/music/saj_hyo_tuza_v1.mp3" />
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-5 left-5 text-[#00695c] hover:text-[#004d40] z-50 font-bold text-lg"
      >
        ← Back
      </Link>

      {/* --- ANIMATION LAYER (Z-INDEX 20) --- 
          This sits on top of the card so the butterflies hug OVER the card content 
      */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
        
        {/* Ribbon Back Layer */}
        <RibbonBack isHugging={isHugging} />

        {/* Butterfly 1 (Blue/Purple) */}
        <motion.div
          className="absolute"
          animate={{
            // Idle: Float at Top Left of Card (-140px, -180px)
            // Hugging: Center (-50px, 0px)
            x: isHugging ? -30 : -150,
            y: isHugging ? 20 : -10, 
            rotate: isHugging ? 10 : -30,
            scale: isHugging ? 0.8 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        >
          <Butterfly
            direction="left"
            isHugging={isHugging}
            primaryColor="#818cf8"
            secondaryColor="#c084fc"
            patternColor="#4f46e5"
            bodyColor="#312e81"
          />
        </motion.div>

        {/* Butterfly 2 (Pink/Red) */}
        <motion.div
          className="absolute"
          animate={{
            // Idle: Float at Top Right of Card (140px, -180px)
            // Hugging: Center (50px, 0px)
            x: isHugging ? 30 : 160,
            y: isHugging ? 20 : -120,
            rotate: isHugging ? -10 : 30,
            scale: isHugging ? 1 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        >
          <Butterfly
            direction="right"
            isHugging={isHugging}
            primaryColor="#fb7185"
            secondaryColor="#f472b6"
            patternColor="#be123c"
            bodyColor="#881337"
          />
        </motion.div>

        {/* Ribbon Front Layer */}
        <RibbonFront isHugging={isHugging} />

        {/* Hearts Particles */}
        <AnimatePresence>
          {isHugging && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <FloatingHeart key={`heart-${i}`} delay={i * 0.1 + 0.2} />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* --- CARD LAYER (Z-INDEX 10) --- */}
      <motion.div 
        className="relative z-10 w-[90%] max-w-[450px] bg-gradient-to-br from-[#4db6ac] to-[#009688] rounded-[25px] p-8 pb-10 shadow-2xl flex flex-col items-center border-4 border-[#b2dfdb]"
        animate={{ scale: isHugging ? 0.95 : 1 }} // Slight push effect when hugging
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        
        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 text-2xl text-white/90 -rotate-45">🌿</div>
        <div className="absolute top-4 right-4 text-2xl text-white/90 rotate-45">🌿</div>
        <div className="absolute bottom-4 left-4 text-2xl text-white/90 -rotate-135">🍃</div>
        <div className="absolute bottom-4 right-4 text-2xl text-white/90 rotate-135">🍃</div>

        {/* Title */}
        <h1 className="font-[Pacifico] text-4xl text-white drop-shadow-md mt-2 mb-6 text-center">
          Happy Hug Day Bayko
        </h1>

        {/* Image Circle */}
        <div className="relative w-40 h-40 bg-[#e0f2f1] rounded-full border-[5px] border-white/80 shadow-inner mb-6 overflow-hidden shrink-0">
          <Image
            src="/images/couple_images/Hug_Day.webp"
            alt="Hug Day"
            fill
            className="object-cover"
          />
        </div>

        {/* Lined Message Box */}
        <div 
          className="w-full bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center min-h-[160px]"
          style={{
            backgroundImage: "repeating-linear-gradient(white 0px, white 33px, #b2dfdb 34px)"
          }}
        >
          {/* Marathi Text - Using Gotu */}
          <p className="font-[Gotu] text-[#00695c] font-bold text-lg text-center leading-[34px] m-0 w-full tracking-wide">
            काही क्षण शब्दांचे नसतात, <br />
            ते फक्त जवळ असण्याचे असतात...
          </p>
          
          {/* English Text - Using Sacramento */}
          {/* Increased size to 2.2rem (text-4xl approx) because Sacramento runs a bit small */}
          <p className="font-['Sacramento'] text-[#00897b] text-[2.2rem] text-center leading-[34px] m-0 w-full mt-2">
            Just a hug, <br />
            where everything feels blessed.
          </p>
        </div>

        {/* Instruction Hint */}
        <motion.div 
            animate={{ opacity: isHugging ? 0 : 0.8 }}
            className="absolute bottom-2 text-[#e0f2f1] text-xs tracking-widest uppercase font-semibold"
        >
            ( Hold to Hug )
        </motion.div>

      </motion.div>
    </div>
  );
}