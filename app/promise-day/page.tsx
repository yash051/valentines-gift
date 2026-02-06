'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './promise.module.css';

export default function PromiseDay() {
  return (
    <div className={styles.container}>
      
      {/* Back Button */}
      <Link href="/" className="absolute top-5 left-5 text-[#6a1b9a] hover:text-[#4a148c] z-50 font-bold font-sans">
        ← Back
      </Link>

      <div className={styles.card}>
        {/* Corner Flowers */}
        <div className={`${styles.cornerFlower} ${styles.topLeft}`}>🌸</div>
        <div className={`${styles.cornerFlower} ${styles.topRight}`}>🌸</div>
        <div className={`${styles.cornerFlower} ${styles.bottomLeft}`}>✨</div>
        <div className={`${styles.cornerFlower} ${styles.bottomRight}`}>✨</div>

        <div className={styles.title}>Happy Promise Day Bayko</div>

        <div className={styles.imageCircle}>
           {/* Using .webp */}
           <Image 
             src="/images/couple_images/Promise_Day.webp" 
             alt="Promise Day" 
             fill
             className="object-cover"
           />
        </div>

        <div className={styles.messageBox}>
            <div className={styles.marathiPart}>
                जीव दंगला, गुंगला, रंगला असा, <br/>
                पिरमाची आस तू...
            </div>
            
            <div className={styles.englishPart}>
                Not a promise to be perfect, <br/>
                just a promise to be here.
            </div>
        </div>
      </div>

    </div>
  );
}