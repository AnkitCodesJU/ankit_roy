"use client";

import anime from "animejs";
import useScrollReveal from "../hooks/useScrollReveal";

const skills = [
  { name: "C", icon: "c", bg: "#00599C" },
  { name: "C++", icon: "cplusplus", bg: "#00599C" },
  { name: "HTML5", icon: "html5", bg: "#E34F26" },
  { name: "JAVA", icon: "openjdk", bg: "#E5900F" },
  { name: "JAVASCRIPT", icon: "javascript/F7DF1E", bg: "#323330", color: "#F7DF1E", filterNone: true },
  { name: "PYTHON", icon: "python", bg: "#3776AB" },
  { name: "TYPESCRIPT", icon: "typescript", bg: "#007ACC" },
  { name: "VERCEL", icon: "vercel", bg: "#000000" },
  { name: "MONGODB", icon: "mongodb", bg: "#47A248" },
  { name: "EXPRESS.JS", icon: "express", bg: "#404D59" },
  { name: "REACT", icon: "react", bg: "#20232A" },
  { name: "NODE.JS", icon: "nodedotjs", bg: "#6DA55F" },
  { name: "NEXT", icon: "nextdotjs", bg: "#000000" },
  { name: "NPM", icon: "npm", bg: "#CB3837" },
  { name: "NODEMON", icon: "nodemon", bg: "#3E3E3E" },
  { name: "REACT NATIVE", icon: "react", bg: "#20232A" },
  { name: "REACT ROUTER", icon: "reactrouter", bg: "#CA4245" },
  { name: "REDUX", icon: "redux", bg: "#593D88" },
  { name: "BOOTSTRAP", icon: "bootstrap", bg: "#7952B3" },
  { name: "EXPO", icon: "expo", bg: "#1e2023" },
  { name: "SOCKET.IO", icon: "socketdotio", bg: "#010101" },
  { name: "VITE", icon: "vite", bg: "#646CFF" },
  { name: "MYSQL", icon: "mysql", bg: "#4479A1" },
  { name: "PANDAS", icon: "pandas", bg: "#150458" },
  { name: "NUMPY", icon: "numpy", bg: "#013243" },
  { name: "GIT", icon: "git", bg: "#F05032" },
  { name: "GITHUB", icon: "github", bg: "#181717" },
  { name: "POSTMAN", icon: "postman", bg: "#FF6C37" },
  { name: "TAILWINDCSS", icon: "tailwindcss", bg: "#38B2AC" },
  { name: "SCIKIT-LEARN", icon: "scikitlearn", bg: "#F7931E" },
  { name: "BASH SCRIPT", icon: "gnubash", bg: "#121011" },
  { name: "CLOUDINARY", icon: "cloudinary", bg: "#3448C5" }
];

// Helper to chunk skills into 4 distinct rows
const chunkArray = (arr, numChunks) => {
  const result = Array.from({ length: numChunks }, () => []);
  arr.forEach((item, index) => {
    result[index % numChunks].push(item);
  });
  return result;
};

const skillRows = chunkArray(skills, 4);

export default function Skills() {
  const titleRef = useScrollReveal({ direction: "left", distance: 40 });

  // Explosive click ripple
  const handleBadgeClick = (e) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(50);
    const el = e.currentTarget;

    const ripple = document.createElement("span");
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position: absolute; border-radius: 50%; pointer-events: none;
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      background: radial-gradient(circle, rgba(255,26,26,0.6) 0%, transparent 70%);
      z-index: 20;
    `;
    el.appendChild(ripple);

    anime({
      targets: ripple,
      scale: [0, 2.5],
      opacity: [1, 0],
      duration: 600,
      easing: "easeOutExpo",
      complete: () => ripple.remove(),
    });

    anime({
      targets: el,
      scale: [
        { value: 0.85, duration: 80, easing: "easeOutQuad" },
        { value: 1.12, duration: 400, easing: "easeOutElastic(1, .5)" },
        { value: 1, duration: 200, easing: "easeOutQuad" }
      ],
    });
  };

  return (
    <section id="skills" className="py-[100px] w-full overflow-hidden flex flex-col items-center">
      {/* Title Area */}
      <div className="px-[5%] max-w-[1400px] w-full mx-auto" ref={titleRef}>
        <div className="text-dim text-[13px] mb-[10px] font-mono tracking-[4px] uppercase">
          004 · ARSENAL
        </div>
        <h2 className="text-[clamp(40px,6vw,60px)] mb-[50px] uppercase font-road-rage text-blood tracking-[4px]">
          TECH STACK
        </h2>
      </div>

      {/* Marquee Area */}
      <div className="w-full flex flex-col gap-5 md:gap-8 py-10 relative bg-panel border-y border-smoke shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
        {/* Soft edge blur gradient masks */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_right,#050505,transparent_15%,transparent_85%,#050505)]"></div>

        {skillRows.map((row, rowIndex) => {
          const isReverse = rowIndex % 2 !== 0; // Alternate tracking direction
          const speed = isReverse ? '22s' : '26s'; // Slight speed variations
          
          return (
            <div key={rowIndex} className="flex relative overflow-hidden group/marquee">
              <div 
                className="flex whitespace-nowrap gap-5 md:gap-8 px-2 md:px-4 w-max"
                style={{
                  animation: `scroll ${speed} linear infinite ${isReverse ? 'reverse' : 'normal'}`
                }}
              >
                {/* 4 loops to guarantee complete seamless coverage on wide screens */}
                {[...row, ...row, ...row, ...row].map((skill, idx) => (
                  <div
                    key={`${rowIndex}-${idx}`}
                    onClick={handleBadgeClick}
                    className="skill-badge-item flex-shrink-0 flex items-center py-2 px-5 md:py-[10px] md:px-[22px] font-sans font-extrabold text-[14px] md:text-[16px] tracking-[0.5px] uppercase cursor-pointer relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:!z-30 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group/badge select-none"
                    style={{ backgroundColor: skill.bg, color: skill.color || "#fff" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/badge:translate-x-[200%] transition-transform duration-700 ease-in-out pointer-events-none"></div>
                    <img
                      src={`https://cdn.simpleicons.org/${skill.icon}`}
                      alt={skill.name}
                      draggable="false"
                      className={`h-[18px] md:h-[22px] mr-[10px] md:mr-[12px] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover/badge:scale-125 group-hover/badge:-rotate-12 ${
                        skill.filterNone ? "brightness-100 invert-0" : "brightness-0 invert"
                      }`}
                    />
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .group\\/marquee:hover > div {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}
