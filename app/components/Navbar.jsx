"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "py-4 px-[5%] bg-[#050505]/85 backdrop-blur-[15px] border-b border-[#141414]"
          : "py-8 px-[5%] bg-transparent"
      }`}
    >
      <Link href="#" className="flex items-center gap-3 cursor-none">
        <h2 
          className="text-5xl tracking-widest text-[#8B0000] opacity-80 font-road-rage" 
        >
          AR
        </h2>
      </Link>

      <div className="hidden md:flex gap-10 list-none">
        {["ABOUT", "PROJECTS", "SKILLS", "GITHUB", "CONTACT"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-white text-sm font-semibold uppercase tracking-widest relative py-2 cursor-none group font-racing-engine transition-colors duration-300 hover:text-neon"
          >
            {item}
            <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-neon transition-all duration-300 shadow-[0_0_8px_var(--color-neon)] group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 text-white text-sm font-mono tracking-widest uppercase">
        <div className="w-2 h-2 rounded-full bg-neon animate-pulse shadow-[0_0_10px_var(--color-neon)]"></div> ONLINE
      </div>
    </nav>
  );
}
