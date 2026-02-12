'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './kiss.module.css';
import PageMusic from "@/components/PageMusic";

export default function KissDay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFogCleared, setIsFogCleared] = useState(false);
  const [removedFromDom, setRemovedFromDom] = useState(false); // To fully unmount after fade

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Setup Canvas
    const fillCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // The Fog Color
      ctx.fillStyle = "rgba(255, 245, 248, 0.98)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Instruction Text
      ctx.font = "30px 'Dancing Script', cursive";
      ctx.fillStyle = "#ff80ab";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Rub the screen gently...", canvas.width / 2, canvas.height / 2);
    };

    fillCanvas();

    // Handle Resize
    window.addEventListener('resize', fillCanvas);
    return () => window.removeEventListener('resize', fillCanvas);
  }, []);

  // --- CHECK PERCENTAGE LOGIC ---
  const checkFogPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isFogCleared) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Get pixel data
    // Optimization: On huge screens, this can be slow. 
    // We only call this throttled (inside handleErase).
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    let transparentPixels = 0;
    // We check every 40th value (approx every 10th pixel) for speed
    const step = 40; 
    
    for (let i = 3; i < data.length; i += step) {
      // If alpha is 0, it's erased
      if (data[i] === 0) {
        transparentPixels++;
      }
    }

    const totalPixelsChecked = data.length / step;
    const percentage = (transparentPixels / totalPixelsChecked) * 100;

    // If > 30% is cleared, fade it out
    if (percentage > 30) {
      setIsFogCleared(true);
      // Remove from DOM completely after animation (1.5s)
      setTimeout(() => setRemovedFromDom(true), 1500);
    }
  };

  // --- ERASE FUNCTION ---
  const handleErase = (e: React.MouseEvent | React.TouchEvent) => {
    if (isFogCleared) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    // Throttle the check: purely random check (1 in 10 events) prevents lag
    if (Math.random() > 0.9) {
      checkFogPercentage();
    }
  };

  // Trigger one final check on touch end to be sure
  const handleEnd = () => {
    if (!isFogCleared) checkFogPercentage();
  };

  return (
    <div className={styles.container}>
      
      {/* Fog Canvas - Only render if not fully removed yet */}
      {!removedFromDom && (
        <canvas 
          ref={canvasRef}
          className={`${styles.fogCanvas} ${isFogCleared ? styles.fogHidden : ''}`}
          onMouseMove={handleErase}
          onTouchMove={handleErase}
          onMouseUp={handleEnd}
          onTouchEnd={handleEnd}
        />
      )}

      <PageMusic src="/music/kiss_day_v2.mp3" />
      
      <Link href="/" className="absolute top-5 left-5 text-[#b71c1c] hover:text-[#d32f2f] z-50 font-bold font-sans">
        ← Back
      </Link>

      <div className={styles.card}>
        <div className={`${styles.cornerIcon} ${styles.topLeft}`}>😘</div>
        <div className={`${styles.cornerIcon} ${styles.topRight}`}>😘</div>
        <div className={`${styles.cornerIcon} ${styles.bottomLeft}`}>💖</div>
        <div className={`${styles.cornerIcon} ${styles.bottomRight}`}>💖</div>

        <div className={styles.title}>Happy Kiss Day Bayko</div>

        <div className={styles.imageCircle}>
           <img 
             src="https://media1.giphy.com/media/v1.Y2lkPTI2MmQ0YzRlb3locGRtZGJpb3c2bTMyM2tjZzQwdGZycG5wZzJiZ2k0cmcwamk2ZSZlcD12MV9naWZzX2dpZklkJmN0PXM/MGS5vaOVCFMBmjB8Ej/200.webp" 
             alt="Kiss Day Sticker" 
             // Logic: If fog is gone, show image fully. If fog is there, keep it invisible or loading.
             className={styles.visibleImage}
             style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 1s'}}
             onLoad={() => setImageLoaded(true)}
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