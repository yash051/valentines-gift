'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './teddy.module.css';
import PageMusic from '../../components/PageMusic';

// Animation variants for text
const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function TeddyDay() {
  const marathiText = "माझ सर्वात गोड आणि माझे प्रेमाचे फुलपाखरू, उडत उडत आले, हळूच अलगद मनामध्ये, घर करून राहिले…";

  return (
    <div className={styles.container}>
      <PageMusic src="/music/ishq_risk_v1.opus" />

      <Link href="/" className="absolute top-5 left-5 z-50">
        <motion.div
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="text-[#5d4037] font-bold font-sans bg-white/30 backdrop-blur-md px-4 py-2 rounded-full shadow-sm"
        >
          ← Back
        </motion.div>
      </Link>

      {/* --- CSS ONLY TEDDY BEAR --- */}
      <div className={styles.bearWrapper}>
        <div className={styles.bearHead}>
          <div className={styles.earLeft}></div>
          <div className={styles.earRight}></div>
          <div className={styles.eyeLeft}></div>
          <div className={styles.eyeRight}></div>
          <div className={styles.muzzle}>
             <div className={styles.nose}></div>
          </div>
        </div>
        {/* The Hugging Arms */}
        <div className={styles.armLeft}>
           <div className={styles.pawPad}></div>
        </div>
        <div className={styles.armRight}>
           <div className={styles.pawPad}></div>
        </div>
      </div>
      {/* --------------------------- */}

      <motion.div 
        className={styles.card}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.h1 
          className={styles.title}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Happy Teddy Day <br /> <span className="text-[#8d6e63]">Bayko</span>
        </motion.h1>

        {/* 3D Image Container */}
        <motion.div 
          className={styles.imageContainer}
          whileTap={{ scale: 0.95, rotate: 2 }}
        >
          <div className={styles.glossyOverlay} />
          <Image 
            src="/images/couple_images/Teddy_Day.webp" 
            alt="Teddy Day" 
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Interactive Text Area */}
        <motion.div 
          className={styles.messageBox}
          variants={sentenceVariants}
          initial="hidden"
          animate="visible"
        >
          {marathiText.split(" ").map((word, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants}
              className={styles.word}
              whileHover={{ scale: 1.2, color: "#d84315" }}
            >
              {word}{"\u00A0"}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

    </div>
  );
}