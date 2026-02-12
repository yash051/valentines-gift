'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './kiss.module.css';
import PageMusic from "@/components/PageMusic"; // Ensure this path is correct

export default function KissDay() {
  return (
    <div className={styles.container}>
<PageMusic src="/music/saj_hyo_tuza_v1.mp3" />
      
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
           <img 
             src="https://media1.giphy.com/media/v1.Y2lkPTI2MmQ0YzRlb3locGRtZGJpb3c2bTMyM2tjZzQwdGZycG5wZzJiZ2k0cmcwamk2ZSZlcD12MV9naWZzX2dpZklkJmN0PXM/MGS5vaOVCFMBmjB8Ej/200.webp" 
             alt="Kiss Day Sticker" 
             style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'fadePulse 2s infinite alternate'}}
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