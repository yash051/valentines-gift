'use client';

import { useState, useEffect, useRef } from 'react';

export default function PageMusic({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the audio object
    audioRef.current = new Audio(src);
    audioRef.current.loop = true; // Loop the music
    audioRef.current.volume = 0.6; // 60% volume (not too loud)

    // Try to play immediately
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay blocked (normal on mobile):", error);
          setIsPlaying(false);
        });
    }

    // CLEANUP: Stop music when she leaves the page
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-5 right-5 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-pink-200 text-2xl animate-pulse hover:scale-110 transition-transform"
      style={{ boxShadow: '0 0 15px rgba(236, 72, 153, 0.5)' }}
    >
      {isPlaying ? '🎵' : '🔇'}
    </button>
  );
}