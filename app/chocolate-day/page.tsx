'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react'; // Import hooks
import styles from './chocolate.module.css';
import ChocolateMusic from '../../components/ChocolateMusic'; // Import your music component

// Define a type for our particle to keep TypeScript happy
type Particle = {
  id: number;
  char: string;
  xInitial: string;
  xAnimate: string;
  duration: number;
  delay: number;
};

export default function ChocolateDay() {
  // 3D Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for the tilt
  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), { stiffness: 100, damping: 20 });

  // State to hold the particles (Stable values)
  const [particles, setParticles] = useState<Particle[]>([]);

  // useEffect to generate random values ONLY on the client
  useEffect(() => {
    const floatingItems = ['🍫', '🍪', '🤎', '🍬', '🍩', '🍫'];
    const newParticles = floatingItems.map((item, i) => ({
      id: i,
      char: item,
      // We generate the random numbers here, once, on mount
      xInitial: (Math.random() * 100 - 50) + '%',
      xAnimate: `calc(${Math.random() * 20 - 10}vw)`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className={styles.container}>
      
      {/* Add Music Component Here */}
      <ChocolateMusic src="/music/yad_lagal.mp3" />

      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 group transition-transform hover:scale-105 active:scale-95"
      >
        <div className="
          relative flex items-center gap-2 px-6 py-2
          bg-gradient-to-b from-[#4a148c] to-[#311b92] /* Deep Dairy Milk Purple */
          border-2 border-[#ffd700] /* Gold Foil Border */
          rounded-xl /* Blocky chocolate shape */
          shadow-[0_4px_0px_#1a237e] /* 3D 'Chunk' Shadow */
          active:shadow-none active:translate-y-[4px] /* Press effect */
          transition-all duration-150
        ">
          {/* Glossy sheen on top half to look like plastic wrapper */}
          <div className="absolute inset-x-0 top-0 h-[40%] bg-white/10 rounded-t-lg"></div>
          
          <span className="text-[#ffd700] text-xl drop-shadow-md">❮</span>
          <span 
            className="text-white text-lg tracking-wide drop-shadow-md" 
            style={{ fontFamily: 'Lobster, cursive' }} /* Matches the title font */
          >
            Back
          </span>
        </div>
      </Link>

      {/* Floating Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: '110vh', x: p.xInitial }}
            animate={{ 
              y: '-10vh', 
              rotate: 360,
              x: p.xAnimate
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: p.delay 
            }}
            className="absolute text-4xl opacity-20 blur-[1px]"
          >
            {p.char}
          </motion.div>
        ))}
      </div>

      {/* 3D TILT WRAPPER */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
            rotateX, 
            rotateY, 
            transformStyle: "preserve-3d",
            width: '100%',
            maxWidth: '380px',
            display: 'flex',
            justifyContent: 'center'
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10"
      >
        <div className={styles.card}>
          {/* Glossy Shine Overlay */}
          <div className={styles.shine}></div>

          {/* Floating 3D Icons */}
          <div className={`${styles.cornerIcon} ${styles.topLeft}`}>🍫</div>
          <div className={`${styles.cornerIcon} ${styles.topRight}`}>❤️</div>
          <div className={`${styles.cornerIcon} ${styles.bottomLeft}`}>🍪</div>
          <div className={`${styles.cornerIcon} ${styles.bottomRight}`}>🍬</div>

          <h1 className={styles.title}>Happy Chocolate Day Bayko</h1>

          <motion.div 
            className={styles.imageCircle}
            whileHover={{ scale: 1.1 }}
          >
             <Image 
               src="/images/couple_images/Chocolate_Day.webp" 
               alt="Chocolate Day" 
               fill
               className="object-cover"
             />
          </motion.div>

          <div className={styles.messageBox}>
              <p className="text-[#3e2723] font-bold text-lg mb-2 font-serif">
                  टिक टिक वाजते डोक्यात, <br/>
                  धड धड वाढते ठोक्यात…
              </p>
              
              <p className="text-[#d84315] font-cursive text-xl leading-relaxed" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Just me, melting like chocolate, <br/>
                  trying to make your day a little sweeter.
              </p>
          </div>
          
        </div>
      </motion.div>

    </div>
  );
}