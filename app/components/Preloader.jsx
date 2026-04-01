"use client";

import { useEffect, useState } from "react";
import anime from "animejs";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Wait a brief moment before starting animation
    const timer = setTimeout(() => {
      const tl = anime.timeline({
        complete: () => {
          setIsLoading(false);
          document.body.style.overflow = ""; // restore scroll
        },
      });

      // Simple, robust text reveal since SVG text getTotalLength can be flaky
      tl.add({
        targets: ".preloader-text",
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000,
        easing: "easeOutExpo",
      })
        // Add a cool filter blur effect (supported in most modern browsers)
        .add(
          {
            targets: ".preloader-text",
            filter: ["blur(10px)", "blur(0px)"],
            duration: 800,
            easing: "easeOutQuad",
          },
          "-=1000",
        )
        // Quick flash
        .add({
          targets: ".preloader-text",
          color: ["rgba(139,0,0,1)", "rgba(255,26,26,1)", "rgba(139,0,0,1)"],
          duration: 600,
          easing: "easeInOutSine",
        })
        // Slide up text
        .add({
          targets: ".preloader-text",
          translateY: -50,
          opacity: [1, 0],
          duration: 600,
          easing: "easeInExpo",
          delay: 400,
        })
        // Fade out background
        .add(
          {
            targets: ".preloader-bg",
            opacity: [1, 0],
            duration: 600,
            easing: "easeInOutQuad",
          },
          "-=300",
        );
    }, 300);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = ""; // ensure scroll is restored if unmounted early
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="preloader-bg fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center pointer-events-none">
      <div className="relative">
        {/* Subtle glow behind the text */}
        <div className="absolute inset-0 bg-[#8B0000] blur-[40px] opacity-20 rounded-full w-32 h-32 scale-150 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <h2 className="preloader-text font-road-rage text-8xl md:text-9xl tracking-[8px] text-[#8B0000] opacity-0">
          AR
        </h2>
      </div>
    </div>
  );
}
