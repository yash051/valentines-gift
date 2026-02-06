'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './chocolate.module.css';

export default function ChocolateDay() {
  return (
    <div className={styles.container}>
      
      {/* Back Button */}
      <Link href="/" className="absolute top-5 left-5 text-[#3e2723] hover:text-[#5d4037] z-50 font-bold font-sans">
        ← Back
      </Link>

      <div className={styles.card}>
        {/* Corner Icons */}
        <div className={`${styles.cornerIcon} ${styles.topLeft}`}>🍫</div>
        <div className={`${styles.cornerIcon} ${styles.topRight}`}>🍫</div>
        <div className={`${styles.cornerIcon} ${styles.bottomLeft}`}>🍬</div>
        <div className={`${styles.cornerIcon} ${styles.bottomRight}`}>🍪</div>

        <div className={styles.title}>Happy Chocolate Day Bayko</div>

        <div className={styles.imageCircle}>
           {/* Update: Ensure this image exists in your public folder */}
           <Image 
             src="/images/couple_images/Chocolate_Day.webp" 
             alt="Chocolate Day" 
             fill
             className="object-cover"
           />
        </div>

        <div className={styles.messageBox}>
            <div className={styles.marathiPart}>
                टिक टिक वाजते डोक्यात, <br/>
                धड धड वाढते ठोक्यात…
            </div>
            
            <div className={styles.englishPart}>
                Just me, melting like chocolate, <br/>
                trying to make your day a little sweeter.
            </div>
        </div>
      </div>

    </div>
  );
}