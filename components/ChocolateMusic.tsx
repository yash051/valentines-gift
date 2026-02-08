'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChocolateMusic({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the audio object
    audioRef.current = new Audio(src);
    audioRef.current.loop = true; // Loop the music
    audioRef.current.volume = 0.5; // Slightly lower volume for background ambiance

    // Try to play immediately (often blocked by browsers until interaction)
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay blocked (waiting for interaction):", error);
          setIsPlaying(false);
        });
    }

    // CLEANUP: Stop music when component unmounts
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
    <div className="fixed bottom-5 right-5 z-50 flex items-center justify-center">
      {/* Floating Particles (Only visible when playing) */}
      {isPlaying && (
        <>
          <span className="absolute animate-[floatUp_2s_ease-in_infinite] text-lg top-0 right-0 opacity-0">🍫</span>
          <span className="absolute animate-[floatUp_2.5s_ease-in_infinite_0.5s] text-sm top-2 right-4 opacity-0">🤎</span>
          <span className="absolute animate-[floatUp_3s_ease-in_infinite_1s] text-md top-[-10px] right-[-10px] opacity-0">✨</span>
        </>
      )}

      <button
        onClick={togglePlay}
        className={`
          relative flex items-center justify-center w-14 h-14 rounded-full 
          border-2 border-[#ffca28] shadow-xl transition-all duration-300
          ${isPlaying ? 'bg-[#3e2723] text-[#ffca28] scale-110' : 'bg-[#fff8e1] text-[#3e2723] scale-100'}
        `}
        style={{
          boxShadow: isPlaying 
            ? '0 0 20px rgba(93, 64, 55, 0.6), inset 0 0 10px rgba(0,0,0,0.5)' 
            : '0 0 10px rgba(0,0,0,0.2)'
        }}
      >
        {/* Animated Icon */}
        <span className={`text-2xl ${isPlaying ? 'animate-spin-slow' : ''}`}>
          {isPlaying ? '🍩' : '🔇'}
        </span>
      </button>

      {/* Global Styles for the custom animations */}
      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-50px) rotate(20deg); opacity: 0; }
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}