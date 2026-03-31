"use client";

import { useState, useRef, useEffect } from 'react';

export default function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // reasonable default volume
    }
    
    // Ensure accurate state if it automatically pauses for some reason
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.addEventListener('pause', handlePause);
      audioEl.addEventListener('play', handlePlay);
    }
    
    return () => {
      if (audioEl) {
        audioEl.removeEventListener('pause', handlePause);
        audioEl.removeEventListener('play', handlePlay);
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      <button 
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border backdrop-blur-md hover:scale-110 focus:outline-none cursor-none group shadow-[0_4px_20px_0_rgb(0,0,0,0.6)] ${
          isPlaying 
            ? 'bg-blood border-blood text-white shadow-[0_0_20px_rgba(139,0,0,0.8)]' 
            : 'bg-[#1a1a1a] border-[#333] text-[#aaa] hover:text-white hover:border-white hover:bg-[#222]'
        }`}
        title={isPlaying ? "Pause BGM" : "Play BGM"}
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          // Playing icon (Speaker with sound waves)
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] animate-pulse">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <span className="absolute -inset-2 rounded-full border border-blood animate-ping opacity-75"></span>
          </div>
        ) : (
          // Paused icon (Speaker muted)
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] transition-transform group-hover:rotate-12">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>
      
      <audio 
        ref={audioRef} 
        src="/assets/bgm.mp3" 
        loop 
        preload="auto"
      />
    </div>
  );
}
