'use client';

import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import PageMusic from '../../components/PageMusic';

export default function ProposeDay() {
  const [stage, setStage] = useState<'PROPOSAL' | 'CONTRACT' | 'CERTIFICATE'>('PROPOSAL');
  const [noCount, setNoCount] = useState(0);
  const [herSignature, setHerSignature] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  
  const [herConditions, setHerConditions] = useState('');
  const [showKabool, setShowKabool] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  // Teasing Messages for the "No" button
  const noMessages = [
    "It's God's plan, click Yes! 😇",
    "Don't deny destiny! 💍",
  ];

  const handleNoClick = () => {
    const msg = noMessages[noCount % noMessages.length];
    setShowToast(msg);
    setNoCount(prev => prev + 1);
    setTimeout(() => setShowToast(null), 2000);
  };

  // 👇 REPLACE "handleRevealConditions" WITH THIS:
  const handleRevealConditions = () => {
    // 1. Validation: Make sure she wrote something
    if (herConditions.trim().length < 3) {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
      return;
    }

    // 2. THE SILENT SPY 🕵️‍♂️
    // Replace these with the keys from your EmailJS dashboard
    const serviceID = 'service_zouima4';
    const templateID = 'template_j6ghqty';
    const publicKey = 'MRSTmNDfcIvQtOuvt';

    const templateParams = {
      name: "Ruby",           // 👈 Matches {{name}} in your screenshot
      message: herConditions, // 👈 Matches {{message}} in your screenshot
    };

    // We send it in the background (no 'await')
    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Secret email sent!', response.status, response.text);
      }, (err) => {
        console.log('Failed...', err);
      });

    // 3. IMMEDIATE REVEAL (She waits for nothing)
    setShowKabool(true);
  };

  const handleHerSign = () => {
    if (!herSignature) {
      setHerSignature(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ffa500', '#ffffff']
      });
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4 overflow-hidden relative">
 {/* 🎵 1. YOUR NEW SONG */}
      <PageMusic src="/music/propose_day.mp3" />
      
      <AnimatePresence mode='wait'>
        
        {/* ---------------- STAGE 1: THE PROPOSAL ---------------- */}
        {stage === 'PROPOSAL' && (
          <motion.div 
            key="proposal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border-4 border-pink-200"
          >
            <div className="text-6xl mb-6">💍</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">Court Notice</h1>
            <p className="text-gray-600 mb-8">
              To <strong>Ms. Ruby</strong>,<br/>
              You are hereby summoned to answer the following question under the Love Act of 2026.
            </p>
            <h2 className="text-2xl font-bold text-pink-600 mb-8">
              Do you want to get married?
            </h2>

            <div className="flex justify-center gap-6 relative">
              <button 
                onClick={() => setStage('CONTRACT')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-110"
              >
                YES! ❤️
              </button>

              <div className="relative">
                <button 
                  onClick={handleNoClick}
                  onMouseEnter={() => setShowToast(noMessages[Math.floor(Math.random() * noMessages.length)])}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-8 rounded-full shadow-lg"
                >
                  No 🙈
                </button>
                
                {/* Tooltip for No */}
                <AnimatePresence>
                  {showToast && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -45 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-1/2 -translate-x-1/2 -top-2 w-48 bg-black text-white text-xs py-2 px-3 rounded-lg z-50 pointer-events-none"
                    >
                      {showToast}
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-black"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* ---------------- STAGE 2: THE CONTRACT ---------------- */}
        {stage === 'CONTRACT' && (
          <motion.div 
            key="contract"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="bg-white p-8 rounded-sm shadow-2xl max-w-lg w-full border-2 border-gray-300 relative"
            style={{ backgroundImage: 'radial-gradient(#f3f4f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          >
            <div className="border-b-2 border-black pb-4 mb-6 text-center">
              <h1 className="text-2xl font-serif font-bold uppercase tracking-widest">Marriage Contract</h1>
              <p className="text-xs text-gray-500">Ref: LOVE-2026-FEB-08</p>
            </div>

            <motion.div 
              animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}}
              className="mb-6"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Her Conditions:</label>
              <textarea 
                value={herConditions}
                onChange={(e) => setHerConditions(e.target.value)}
                placeholder="Write your conditions here..."
                className={`w-full p-3 border rounded-md focus:ring-2 focus:outline-none min-h-[100px] text-sm bg-yellow-50 ${errorShake ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300 focus:ring-pink-500'}`}
              />
              {errorShake && <p className="text-red-500 text-xs mt-1">Please write at least one condition! 🥺</p>}
            </motion.div>

            {!showKabool ? (
              <button 
                onClick={handleRevealConditions}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all text-sm mb-4"
              >
                I have written mine, show me yours! 👇
              </button>
            ) : (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mb-8 relative"
              >
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">His Conditions:</label>
                <div className="w-full p-4 border border-gray-300 rounded-md bg-gray-50 text-gray-600 italic text-sm relative overflow-hidden">
                  <p>
                    "Although I cannot read your conditions right now, still this is from my heart: whatever you have written above..."
                  </p>
                  <p className="mt-2 font-bold text-pink-600 text-lg text-center font-serif">
                    Kabool Hai, Kabool Hai, Kabool Hai! 🌹
                  </p>
                </div>
              </motion.div>
            )}

            {showKabool && (
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setStage('CERTIFICATE')}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-lg shadow-xl uppercase tracking-wider transition-all"
              >
                Sign & Proceed to Certificate ✍️
              </motion.button>
            )}
          </motion.div>
        )}

        {/* ---------------- STAGE 3: THE CERTIFICATE ---------------- */}
        {stage === 'CERTIFICATE' && (
          <motion.div 
            key="certificate"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#fffbf0] p-1 rounded-lg shadow-2xl max-w-2xl w-full relative"
          >
            <div className="border-4 border-double border-[#8B4513] p-6 h-full flex flex-col items-center text-center relative">
              
              <div className="absolute top-2 left-2 text-4xl text-[#8B4513] opacity-50">✾</div>
              <div className="absolute top-2 right-2 text-4xl text-[#8B4513] opacity-50">✾</div>
              <div className="absolute bottom-2 left-2 text-4xl text-[#8B4513] opacity-50">✾</div>
              <div className="absolute bottom-2 right-2 text-4xl text-[#8B4513] opacity-50">✾</div>

              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#8B4513] mb-2 uppercase tracking-widest">Certificate</h1>
                <h2 className="text-xl md:text-2xl font-serif text-[#a0522d]">of Eternal Union</h2>
              </div>

              <div className="font-serif text-lg md:text-xl text-gray-800 leading-relaxed max-w-lg mb-8">
                <p className="mb-4">This is to certify that</p>
                
                {/* 1. HER NAME (Top) */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="border-b-2 border-gray-400 inline-block overflow-hidden whitespace-nowrap mb-4 w-full"
                >
                  <span className="font-bold text-3xl text-pink-700 mx-4">Ms. Ruby</span>
                </motion.div>
                
                <p className="mb-4 text-sm text-gray-500">&</p>
                
                {/* 2. HIS NAME (Bottom) */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 2 }}
                  className="border-b-2 border-gray-400 inline-block overflow-hidden whitespace-nowrap mb-6 w-full"
                >
                  <span className="font-bold text-3xl text-blue-900 mx-4">Mr. Yash</span>
                </motion.div>

                <p className="text-base italic text-gray-600">
                  Are woven into a love that breathes with the universe; two souls, now anchored in a singular truth: a love that began before time and will flourish ever after.
                </p>
              </div>

              {/* Signatures Row */}
              <div className="w-full flex justify-between items-end px-4 md:px-10 mb-8">
                
                <div className="flex flex-col items-center">
                  <motion.div 
                     initial={{ opacity: 0, pathLength: 0 }}
                     animate={{ opacity: 1, pathLength: 1 }}
                     transition={{ duration: 2, delay: 4 }}
                     className="text-3xl text-blue-800 transform -rotate-6"
                     style={{ fontFamily: 'cursive' }} 
                  >
                    Yash
                  </motion.div>
                  <div className="w-24 h-0.5 bg-gray-400 mt-1"></div>
                  <span className="text-[10px] uppercase text-gray-500 mt-1">Groom</span>
                </div>

                {/* DIVINE SEAL (Center) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={herSignature ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="flex flex-col items-center mx-2"
                >
                  <div className="border-4 border-yellow-500/50 rounded-full w-24 h-24 flex flex-col items-center justify-center p-2 rotate-12 shadow-lg bg-yellow-50/50 backdrop-blur-sm">
                    <span className="text-[8px] uppercase tracking-widest text-yellow-700">Approved By</span>
                    <span className="text-2xl font-bold text-yellow-600 font-serif" style={{ fontFamily: 'cursive' }}>God</span>
                    <span className="text-[8px] uppercase tracking-widest text-yellow-700">The Almighty</span>
                  </div>
                </motion.div>

                <div className="flex flex-col items-center">
                  <div 
                    onClick={handleHerSign}
                    className="relative cursor-pointer group"
                  >
                    {!herSignature && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 text-center animate-bounce">
                        <span className="bg-pink-100 text-pink-600 text-[10px] px-2 py-1 rounded border border-pink-200">
                          Sign Here
                        </span>
                      </div>
                    )}
                    
                    <div 
                      className="text-3xl text-pink-600 min-h-[40px] flex items-center justify-center transform -rotate-3 transition-all"
                      style={{ fontFamily: 'cursive' }}
                    >
                      {herSignature ? (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1.2 }}
                        >
                          Ruby
                        </motion.span>
                      ) : (
                        <span className="opacity-0">Ruby</span> 
                      )}
                    </div>
                  </div>
                  <div className="w-24 h-0.5 bg-gray-400 mt-1"></div>
                  <span className="text-[10px] uppercase text-gray-500 mt-1">Bride</span>
                </div>
              </div>

              {/* Witnesses Section */}
              <div className="w-full border-t border-gray-300 pt-4 mt-auto">
                <p className="text-xs uppercase text-gray-400 tracking-[0.2em] mb-4">Witnessed By</p>
                <div className="grid grid-cols-4 gap-2 text-center">
                   {['Time', 'Love', 'Nature', 'Happiness'].map((witness, i) => (
                     <div key={i} className="flex flex-col items-center">
                       <span className="text-gray-600 text-lg" style={{ fontFamily: 'cursive' }}>{witness}</span>
                       <div className="w-full h-[1px] bg-gray-300 mt-1"></div>
                     </div>
                   ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}