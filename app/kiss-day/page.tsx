'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './kiss.module.css';

export default function KissDay() {
  return (
    <div className={styles.container}>
      
      {/* Back Button */}
      <Link href="/" className="absolute top-5 left-5 text-[#b71c1c] hover:text-[#d32f2f] z-50 font-bold font-sans">
        ← Back
      </Link>

      <div className={styles.card}>
        {/* Corner Icons */}
        <div className={`${styles.cornerIcon} ${styles.topLeft}`}>😘</div>
        <div className={`${styles.cornerIcon} ${styles.topRight}`}>😘</div>
        <div className={`${styles.cornerIcon} ${styles.bottomLeft}`}>💖</div>
        <div className={`${styles.cornerIcon} ${styles.bottomRight}`}>💖</div>

        <div className={styles.title}>Happy Kiss Day Bayko</div>

        <div className={styles.imageCircle}>
           {/* Using .webp */}
           <Image 
             src="/images/couple_images/Kiss_Day.webp" 
             alt="Kiss Day" 
             fill
             className="object-cover"
           />
        </div>

        <div className={styles.messageBox}>
            <div className={styles.marathiPart}>
                स्पर्श हा रेशमी तुझा, <br/>
                हळूच मनाला भिडतो...
            </div>
            
            <div className={styles.englishPart}>
                Like a quiet kiss,<br/>
                that stays longer than the moment...
            </div>
        </div>
      </div>

    </div>
  );
}