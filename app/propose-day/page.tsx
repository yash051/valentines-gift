'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './propose.module.css';

export default function ProposeDay() {
  return (
    <div className={styles.container}>
      
      {/* Back Button */}
      <Link href="/" className="absolute top-5 left-5 text-pink-600 hover:text-pink-800 z-50 font-bold font-sans">
        ← Back
      </Link>

      <div className={styles.card}>
        {/* Corner Flowers */}
        <div className={`${styles.cornerFlower} ${styles.topLeft}`}>🌸</div>
        <div className={`${styles.cornerFlower} ${styles.topRight}`}>🌸</div>
        <div className={`${styles.cornerFlower} ${styles.bottomLeft}`}>🌷</div>
        <div className={`${styles.cornerFlower} ${styles.bottomRight}`}>🌷</div>

        <div className={styles.title}>Love You So Very Much</div>

        <div className={styles.imageCircle}>
           {/* Update: Ensure this image exists in your public folder */}
           <Image 
             src="/images/couple_images/Propose_Day.webp" 
             alt="Propose Day Couple" 
             fill
             className="object-cover"
           />
        </div>

        <div className={styles.messageBox}>
            <div className={styles.messageContent}>
                एक प्रश्न आहे, जरा हळूच विचारतो…<br/>
                तू माझी व्हायचं नको, पण मी तुझा होऊ का?
            </div>
        </div>
      </div>

    </div>
  );
}