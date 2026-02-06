'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './valentine.module.css';

export default function ValentinesDay() {
  return (
    <div className={styles.container}>
      
      {/* Back Button */}
      <Link href="/" className="absolute top-5 left-5 text-[#b71c1c] hover:text-[#d81b60] z-50 font-bold font-sans">
        ← Back
      </Link>

      {/* Background Floating Particles */}
      <div className={styles.bgEmoji} style={{ left: '10%', animationDelay: '0s' }}>💖</div>
      <div className={styles.bgEmoji} style={{ left: '25%', animationDelay: '3s' }}>😘</div>
      <div className={styles.bgEmoji} style={{ left: '40%', animationDelay: '6s' }}>🤗</div>
      <div className={styles.bgEmoji} style={{ left: '60%', animationDelay: '2s' }}>💋</div>
      <div className={styles.bgEmoji} style={{ left: '75%', animationDelay: '5s' }}>🫂</div>
      <div className={styles.bgEmoji} style={{ left: '90%', animationDelay: '1s' }}>❤️</div>

      {/* Main Glassmorphism Card */}
      <div className={styles.card}>

        {/* Stickers on the Card */}
        <div className={`${styles.cardDecor} ${styles.decor1}`}>😘</div>
        <div className={`${styles.cardDecor} ${styles.decor2}`}>🤗</div>
        <div className={`${styles.cardDecor} ${styles.decor3}`}>💖</div>
        <div className={`${styles.cardDecor} ${styles.decor4}`}>🫂</div>
        <div className={`${styles.cardDecor} ${styles.decor5}`}>❤️</div>
        <div className={`${styles.cardDecor} ${styles.decor6}`}>❤️</div>

        <div className={styles.title}>Forever Yours <br/>Maazi Bayko</div>

        <div className={styles.imageFrame}>
            <div className={styles.imageCircle}>
                {/* Using .webp - Make sure to convert this one too! */}
                <Image 
                  src="/images/couple_images/Valentines_Day.webp" 
                  alt="Valentine Couple" 
                  fill
                  className="object-cover"
                />
            </div>
        </div>

        <div className={styles.messageBox}>
            <div className={styles.marathiPart}>
                एक मी एक तू, शब्द मी गीत तू,<br/>
                ध्यास मी श्वास तू, स्पर्श मी मोहर तू,<br/>
                स्वप्नात तू, सत्यात तू, साऱ्यात तू....
            </div>
        </div>
      </div>

    </div>
  );
}