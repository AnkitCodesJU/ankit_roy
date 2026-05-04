"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";

const phrases = [
  "SOFTWARE ENGINEER · FULL-STACK · ALGO",
  "MERN · NEXT.JS · DSA · PROBLEM SOLVING",
  "JADAVPUR UNIVERSITY · IT · 2024–2028",
];

export default function Hero() {
  const heroRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Typewriter effect logic
  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 32 : 52;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      timeoutId = setTimeout(type, typeSpeed);
    }

    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Anime.js initial reveal
  useEffect(() => {
    anime({
      targets: ".hero-reveal",
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutExpo",
      delay: anime.stagger(150, { start: 300 }),
    });
  }, []);

  return (
    <section
      className="min-h-screen flex items-center px-[5%] relative overflow-hidden"
      id="about"
      ref={heroRef}
    >
      <div className="relative z-10 max-w-[800px] mt-[80px]">
        <div className="hero-reveal opacity-0 text-[clamp(200px,30vw,380px)] text-[#8B0000]/[0.038] absolute right-[-15%] top-1/2 -translate-y-1/2 pointer-events-none font-road-rage z-[-1] leading-none">
          AR
        </div>

        <h1 className="hero-reveal opacity-0 text-[clamp(76px,12vw,148px)] leading-[0.85] m-0 flex flex-col mb-[30px] font-road-rage text-blood tracking-[4px]">
          <span>ANKIT</span>
          <span>ROY</span>
        </h1>

        <div className="hero-reveal opacity-0 text-[14px] text-blood min-h-[24px] mb-4 uppercase tracking-[4px] font-mono">
          {displayText}
          <span className="animate-pulse">|</span>
        </div>

        <p className="hero-reveal opacity-0 text-[16px] text-[#5a5a5a] max-w-[600px] leading-[1.8] mb-[25px] font-sans font-normal">
          I craft bold, immersive digital experiences — blending clean code with
          creative design to bring ideas to life on the web. Focus areas include
          Full-Stack Development, Algorithmic Problem Solving, and scalable
          system architecture.
        </p>

        <div className="hero-reveal opacity-0 flex gap-[15px] flex-wrap mb-[25px]">
          <a
            href="https://linkedin.com/in/ankit-roy-ju362"
            target="_blank"
            className="border border-[#1a1a1a] p-[12px] rounded-full text-text-muted flex items-center justify-center transition-all duration-300 hover:border-blood hover:text-white hover:bg-blood/10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[22px] h-[22px]"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a
            href="https://github.com/AnkitCodesJU"
            target="_blank"
            className="border border-[#1a1a1a] p-[12px] rounded-full text-text-muted flex items-center justify-center transition-all duration-300 hover:border-blood hover:text-white hover:bg-blood/10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[22px] h-[22px]"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a
            href="https://x.com/ankitroy72006"
            target="_blank"
            className="border border-[#1a1a1a] p-[12px] rounded-full text-text-muted flex items-center justify-center transition-all duration-300 hover:border-blood hover:text-white hover:bg-blood/10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[22px] h-[22px]"
            >
              <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
            </svg>
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&to=ankitroy72006@gmail.com"
            target="_blank"
            className="border border-[#1a1a1a] p-[12px] rounded-full text-text-muted flex items-center justify-center transition-all duration-300 hover:border-blood hover:text-white hover:bg-blood/10 cursor-none"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[22px] h-[22px]"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText("+91 943 348 1219");
              triggerToast("COPIED PHONE!");
            }}
            className="border border-[#1a1a1a] p-[12px] rounded-full text-text-muted flex items-center justify-center transition-all duration-300 hover:border-blood hover:text-white hover:bg-blood/10 focus:outline-none cursor-none group relative"
            title="Copy Phone Number"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[22px] h-[22px]"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </button>
          <a
            href="https://drive.google.com/file/d/185SOoj-I-L2gQmjx-nrXteYytWicxPDB/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => triggerToast("OPENING CV...")}
            className="border border-[#1a1a1a] p-[12px] rounded-full text-text-muted flex items-center justify-center transition-all duration-300 hover:border-blood hover:text-white hover:bg-blood/10 cursor-none"
            title="View CV"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[22px] h-[22px]"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </a>
        </div>

        <div className="hero-reveal opacity-0 flex gap-5 font-racing-engine">
          <a
            href="#projects"
            className="py-[14px] px-[30px] text-[15px] no-underline uppercase tracking-[2px] transition-all duration-300 bg-blood text-white shadow-[0_0_15px_rgba(139,0,0,0.5)] hover:bg-neon hover:shadow-[0_0_30px_rgba(255,26,26,0.6)]"
          >
            VIEW WORK
          </a>
          <a
            href="#contact"
            className="py-[14px] px-[30px] text-[15px] no-underline uppercase tracking-[2px] transition-all duration-300 border border-blood text-blood hover:bg-blood hover:text-white"
          >
            CONTACT
          </a>
        </div>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-full bg-blood text-white font-mono text-sm tracking-widest transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${showToast ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95 pointer-events-none"} shadow-[0_4px_20px_rgba(139,0,0,0.5)] flex items-center justify-center`}
      >
        {toastMessage}
      </div>
    </section>
  );
}
