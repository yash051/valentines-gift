'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import styles from './promise.module.css';
import PageMusic from '../../components/PageMusic';

const slides = [
  {
    id: 0,
    isIntro: true,
    marathi: (
      <>
        जीव दंगला, गुंगला, रंगला असा, <br />
        पिरमाची आस तू...
      </>
    ),
    english: (
      <>
        Not a promise to be perfect, <br />
        just a promise to be here.
        <span className="block text-xs opacity-60 font-sans font-normal tracking-wider uppercase mt-4">
          (Swipe for vows →)
        </span>
      </>
    ),
  },
  {
    id: 1,
    title: "The Promise of Presence",
    text: "I promise to be present... not just when life is beautiful, but when it is quiet, confusing, or heavy. Even in silence, I won’t disappear.",
  },
  {
    id: 2,
    title: "The Promise of Respect",
    text: "I promise to respect your thoughts, your pace, your boundaries, your world, and your being. Loving you will never mean controlling you.",
  },
  {
    id: 3,
    title: "The Promise of Patience",
    text: "I promise patience... when you need time, when answers aren’t clear, when life asks us to... wait.",
  },
  {
    id: 4,
    title: "The Promise of Effort",
    text: "I promise effort, not perfection. I will try, learn, fall short, and still choose you gently, Ever after.",
  },
  {
    id: 5,
    title: "The Promise of Growth",
    text: "I promise to grow... as a man, as a heart, as a soul. So the space beside me always feels safe for you.",
  },
  {
    id: 6,
    title: "The Promise of Emotional Responsibility",
    text: "I promise to take responsibility for my emotions. Not every feeling needs to become your burden. I will speak when it brings clarity.",
  },
  {
    id: 7,
    title: "The Promise of Choice",
    text: "And finally... I promise this: To choose you freely, consciously, without force, fear, or expectation... today, and every day.",
  },
];

export default function PromiseDay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextStep();
    } else if (info.offset.x > swipeThreshold) {
      prevStep();
    }
  };

  const nextStep = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className={styles.container}>
<PageMusic src="/music/promise.mp3" />
      <Link
        href="/"
        className="absolute top-5 left-5 text-[#6a1b9a] hover:text-[#4a148c] z-50 font-bold font-sans"
      >
        ← Back
      </Link>

      <div className={styles.card}>
        <div className={`${styles.cornerFlower} ${styles.topLeft}`}>🌸</div>
        <div className={`${styles.cornerFlower} ${styles.topRight}`}>🌸</div>
        <div className={`${styles.cornerFlower} ${styles.bottomLeft}`}>✨</div>
        <div className={`${styles.cornerFlower} ${styles.bottomRight}`}>✨</div>

        <div className={styles.title}>Happy Promise Day Bayko</div>

        <div className={styles.imageCircle}>
          <Image
            src="/images/couple_images/Promise_Day.webp"
            alt="Promise Day"
            fill
            className="object-cover"
          />
        </div>

        {/* MESSAGE BOX 
            - Added 'layout' prop to motion.div: This animates the height change smoothly.
        */}
        <motion.div className={styles.messageBox} layout transition={{ duration: 0.3 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              // Removed absolute positioning so it takes up real space
              className="w-full cursor-grab active:cursor-grabbing text-center"
              
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              {currentSlide.isIntro ? (
                <div>
                  <div className={styles.marathiPart}>
                    {currentSlide.marathi}
                  </div>
                  <div className={styles.englishPart}>
                    {currentSlide.english}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className={styles.vowTitle}>
                    {currentSlide.title}
                  </h3>
                  <p className={styles.vowBody}>
                    {currentSlide.text}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}