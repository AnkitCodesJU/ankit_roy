"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <Link href="#" className="flex items-center gap-3 cursor-none relative z-[60]">
        <h2 
          className="text-5xl tracking-widest text-[#8B0000] opacity-80 font-road-rage" 
        >
          AR
        </h2>
      </Link>

      {/* Desktop Navigation */}
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

      <div className="flex items-center gap-6 relative z-[60]">
        {/* Desktop Online Indicator */}
        <div className="hidden md:flex items-center gap-2 text-white text-sm font-mono tracking-widest uppercase">
          <div className="w-2 h-2 rounded-full bg-neon animate-pulse shadow-[0_0_10px_var(--color-neon)]"></div> ONLINE
        </div>
        
        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer z-[60] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`block w-8 h-[2px] bg-white transition-all duration-300 ease-out origin-center ${menuOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-[6px]'}`}></span>
          <span className={`block w-8 h-[2px] bg-white transition-all duration-300 ease-out ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-8 h-[2px] bg-white transition-all duration-300 ease-out origin-center ${menuOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-[6px]'}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col gap-8 items-center list-none">
          {["ABOUT", "PROJECTS", "SKILLS", "GITHUB", "CONTACT"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-white text-4xl sm:text-5xl font-semibold uppercase tracking-widest relative cursor-none group font-racing-engine transition-colors duration-300 hover:text-neon"
            >
              {item}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-neon transition-all duration-300 shadow-[0_0_10px_var(--color-neon)] group-hover:w-full"></span>
            </Link>
          ))}
          <div className="flex items-center gap-2 text-white text-sm font-mono tracking-widest uppercase mt-8 opacity-70">
            <div className="w-2 h-2 rounded-full bg-neon animate-pulse shadow-[0_0_10px_var(--color-neon)]"></div> ONLINE
          </div>
        </div>
      </div>
    </nav>
  );
}
