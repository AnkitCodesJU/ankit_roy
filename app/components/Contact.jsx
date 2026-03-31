"use client";

import { useRef, useState } from "react";
import anime from "animejs";
import useScrollReveal from "../hooks/useScrollReveal";

const socials = [
  {
    id: "email",
    href: "https://mail.google.com/mail/?view=cm&to=ankitroy72006@gmail.com",
    color: "#EA4335",
    svg: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    )
  },
  {
    id: "linkedin",
    href: "https://linkedin.com/in/ankit-roy-ju362",
    color: "#0A66C2",
    svg: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  {
    id: "github",
    href: "https://github.com/AnkitCodesJU",
    color: "#E8E8E8",
    svg: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    )
  },
  {
    id: "x",
    href: "https://x.com/ankitroy72006",
    color: "#E8E8E8",
    svg: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
      </svg>
    )
  }
];

export default function Contact() {
  const titleRef = useScrollReveal({ distance: 40, delay: 0 });
  const gridRef = useScrollReveal({ selector: ".contact-icon-item", stagger: 120, distance: 50 });
  const ctaRef = useScrollReveal({ distance: 30, delay: 200 });
  const containerRef = useRef(null);

  // 3D tilt on hover
  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -20;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 20;
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "";
  };

  // Click ripple + bounce
  const handleClick = (e) => {
    const el = e.currentTarget;
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(30);

    anime({
      targets: el,
      scale: [
        { value: 0.8, duration: 100, easing: "easeOutQuad" },
        { value: 1.15, duration: 500, easing: "easeOutElastic(1, .4)" }
      ],
    });

    const ring = el.querySelector(".ring-pulse");
    if (ring) {
      anime({
        targets: ring,
        scale: [1, 2.5],
        opacity: [0.6, 0],
        duration: 600,
        easing: "easeOutExpo",
      });
    }
  };

  const [showToast, setShowToast] = useState(false);
  const toastRef = useRef(null);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => {
      if (toastRef.current) {
        anime({
          targets: toastRef.current,
          translateY: [0, -20],
          opacity: [1, 0],
          scale: [1, 0.95],
          duration: 400,
          easing: "easeInQuad",
          complete: () => setShowToast(false),
        });
      }
    }, 2000);
  };

  return (
    <section id="contact" className="py-[100px] px-[5%] relative max-w-[1400px] mx-auto">
      {/* Toast Popup */}
      {showToast && (
        <div
          ref={(el) => {
            toastRef.current = el;
            if (el) {
              anime({
                targets: el,
                translateY: [30, 0],
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 500,
                easing: "easeOutElastic(1, .6)",
              });
            }
          }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 py-3 px-6 bg-[#0a0a0a]/90 backdrop-blur-[20px] border border-[#1a1a1a] shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(139,0,0,0.2)]"
        >
          <div className="w-6 h-6 rounded-full bg-neon/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--color-neon)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="text-white text-[13px] font-mono tracking-[2px] uppercase">
            Email copied to clipboard
          </span>
          <div className="absolute bottom-0 left-0 h-[2px] bg-neon animate-[shrink_2s_linear_forwards]"></div>
        </div>
      )}

      <div ref={titleRef}>
        <div className="text-dim text-[13px] mb-[10px] font-mono tracking-[4px] uppercase">
          007 · SIGNAL
        </div>
        <h2 className="text-[clamp(42px,7vw,88px)] text-center mb-[80px] leading-none font-road-rage text-blood tracking-[4px]">
          MAKE CONTACT
        </h2>
      </div>

      <div ref={gridRef} className="flex flex-wrap justify-center items-center gap-[20px] md:gap-[40px] mb-[80px]" style={{ perspective: "800px" }}>
        {socials.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="contact-icon-item group relative w-[80px] h-[80px] flex items-center justify-center border border-[#1a1a1a] bg-[#0a0a0a] transition-all duration-200 ease-out cursor-pointer hover:border-[color:var(--hover-color)] hover:shadow-[0_0_30px_var(--hover-glow)]"
            style={{
              "--hover-color": s.color,
              "--hover-glow": `${s.color}33`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Animated ring pulse on click */}
            <span className="ring-pulse absolute inset-0 border-2 rounded-none pointer-events-none opacity-0" style={{ borderColor: s.color }}></span>

            {/* Corner accents */}
            <div className="absolute w-[8px] h-[8px] border-t-2 border-l-2 top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: s.color }}></div>
            <div className="absolute w-[8px] h-[8px] border-b-2 border-r-2 bottom-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: s.color }}></div>

            {/* Icon */}
            <div className="text-[#555] transition-all duration-300 group-hover:text-[color:var(--hover-color)] group-hover:drop-shadow-[0_0_8px_var(--hover-glow)]">
              {s.svg}
            </div>

            {/* Bottom line sweep */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-400 group-hover:w-full" style={{ backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}66` }}></div>
          </a>
        ))}
      </div>

      <div ref={ctaRef} className="flex justify-center font-racing-engine">
        <button
          onClick={(e) => {
            navigator.clipboard.writeText("ankitroy72006@gmail.com").then(() => {
              triggerToast();
            });
            window.open("https://mail.google.com/mail/?view=cm&to=ankitroy72006@gmail.com", "_blank");
          }}
          className="border border-blood text-blood py-[20px] px-[50px] text-[18px] uppercase tracking-[4px] bg-transparent transition-all duration-300 animate-[pulse-border_3s_ease-in-out_infinite] hover:bg-blood hover:text-white hover:animate-none hover:shadow-[0_0_30px_rgba(255,26,26,0.4)] cursor-pointer font-racing-engine"
        >
          MAIL ME
        </button>
      </div>
    </section>
  );
}
