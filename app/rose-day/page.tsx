'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './rose.module.css'; // Import the CSS file we just made
import PageMusic from '../../components/PageMusic';

export default function RoseDay() {
  return (
    <div className={styles.container}>

      <PageMusic src="/music/rose.mp3" />
      {/* Back Button */}
      <Link href="/" className="absolute top-5 left-5 text-pink-600 hover:text-pink-800 z-50 font-bold">
        ← Back
      </Link>

      {/* Floating Petals */}
      <div className={`${styles.petal} ${styles.p1}`}></div>
      <div className={`${styles.petal} ${styles.p2}`}></div>
      <div className={`${styles.petal} ${styles.p3}`}></div>
      <div className={`${styles.petal} ${styles.p4}`}></div>
      <div className={`${styles.petal} ${styles.p5}`}></div>
      <div className={`${styles.petal} ${styles.p6}`}></div>

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