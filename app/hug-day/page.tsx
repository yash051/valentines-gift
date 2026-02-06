'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './hug.module.css';

export default function HugDay() {
  return (
    <div className={styles.container}>
      
      {/* Back Button */}
      <Link href="/" className="absolute top-5 left-5 text-[#00695c] hover:text-[#004d40] z-50 font-bold font-sans">
        ← Back
      </Link>

      <div className={styles.card}>
        {/* Corner Icons */}
        <div className={`${styles.cornerIcon} ${styles.topLeft}`}>🌿</div>
        <div className={`${styles.cornerIcon} ${styles.topRight}`}>🌿</div>
        <div className={`${styles.cornerIcon} ${styles.bottomLeft}`}>🍃</div>
        <div className={`${styles.cornerIcon} ${styles.bottomRight}`}>🍃</div>

        <div className={styles.title}>Happy Hug Day Bayko</div>

        <div className={styles.imageCircle}>
           {/* Using .webp */}
           <Image 
             src="/images/couple_images/Hug_Day.webp" 
             alt="Hug Day" 
             fill
             className="object-cover"
           />
        </div>

        <div className={styles.messageBox}>
            <div className={styles.marathiPart}>
                काही क्षण शब्दांचे नसतात, <br/>
                ते फक्त जवळ असण्याचे असतात...
            </div>
            
            <div className={styles.englishPart}>
                Just a hug, <br/>
                where everything feels blessed.
            </div>
        </div>
      </div>

    </div>
  );
}