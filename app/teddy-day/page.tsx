'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './teddy.module.css';

export default function TeddyDay() {
  return (
    <div className={styles.container}>
      
      {/* Back Button */}
      <Link href="/" className="absolute top-5 left-5 text-[#5d4037] hover:text-[#8d6e63] z-50 font-bold font-sans">
        ← Back
      </Link>

      <div className={styles.card}>
        {/* Corner Icons with float animation */}
        <div className={`${styles.cornerIcon} ${styles.topLeft}`}>🧸</div>
        <div className={`${styles.cornerIcon} ${styles.topRight}`}>🧸</div>
        <div className={`${styles.cornerIcon} ${styles.bottomLeft}`}>🤎</div>
        <div className={`${styles.cornerIcon} ${styles.bottomRight}`}>🤎</div>

        <div className={styles.title}>Happy Teddy Day Bayko</div>

        <div className={styles.imageCircle}>
           {/* Using .webp as requested */}
           <Image 
             src="/images/couple_images/Teddy_Day.webp" 
             alt="Teddy Day" 
             fill
             className="object-cover"
           />
        </div>

        <div className={styles.messageBox}>
            <div className={styles.messageContent}>
                माझ सर्वात गोड आणि माझे प्रेमाचे फुलपाखरू,<br/>
                उडत उडत आले, हळूच अलगद मनामध्ये,<br/>
                घर करून राहिले…
            </div>
        </div>
      </div>

    </div>
  );
}