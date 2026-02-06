'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './rose.module.css'; // Import the CSS file we just made
import PageMusic from '../../components/PageMusic';

export default function RoseDay() {

	// Create an array for 15 petals
  const petals = Array.from({ length: 15 });
  return (
    <div className={styles.container}>

     {/* 🎵 1. YOUR NEW SONG */}
      <PageMusic src="/music/harvu_zara_v1.mp3" />
	
{/* 🌸 2. FALLING PETALS */}
      {petals.map((_, i) => (
        <div 
          key={i} 
          className={styles.petal}
          style={{
            left: `${Math.random() * 100}%`, // Random horizontal position
            animationDuration: `${Math.random() * 5 + 5}s`, // Random speed (5-10s)
            animationDelay: `${Math.random() * 5}s`, // Random start time
            backgroundColor: Math.random() > 0.5 ? '#ff4081' : '#e91e63' // Two shades of pink
          }}
        />
      ))}

      {/* Back Button */}
      <Link href="/" className="absolute top-5 left-5 text-pink-600 hover:text-pink-800 z-50 font-bold">
        ← Back
      </Link>

      {/* The Card */}
      <div className={styles.card}>
        <div className={`${styles.cornerRose} ${styles.topLeft}`}>🌹</div>
        <div className={`${styles.cornerRose} ${styles.topRight}`}>🌹</div>
        <div className={`${styles.cornerRose} ${styles.bottomLeft}`}>🍃</div>
        <div className={`${styles.cornerRose} ${styles.bottomRight}`}>🍃</div>

        <div className={styles.title}>Happy Rose Day <br/>Bayko</div>

        <div className={styles.imageContainer}>
          <div className={styles.imageCircle}>
            {/* Using Next.js Image for optimization */}
            <Image 
              src="/images/couple_images/Rose_Day.webp" 
              alt="Rose Day" 
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className={styles.messageBox}>
          <div className={styles.marathiPart}>
            तुला पाहिलं आणि सांज मंद झाली, <br/>
            ओशाळल्या चांदण्या, हवा कुंद झाली...
          </div>
          
          <div className={styles.englishPart}>
            Like the world paused for a moment,<br/>
            just to notice you.
          </div>
        </div>
      </div>
    </div>
  );
}