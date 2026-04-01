"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import useScrollReveal from "../hooks/useScrollReveal";

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  const descRef = useScrollReveal({
    direction: "up",
    distance: 30,
    threshold: 0.1,
  });
  const techRef = useScrollReveal({
    selector: ".tech-icon-item",
    stagger: 50,
    distance: 20,
  });

  useEffect(() => {
    if (project) {
      // Entrance animation for backdrop and content scale
      anime({
        targets: backdropRef.current,
        opacity: [0, 1],
        duration: 400,
        easing: "easeOutQuad",
      });

      anime({
        targets: contentRef.current,
        translateY: [60, 0],
        opacity: [0, 1],
        scale: [0.98, 1],
        duration: 600,
        easing: "cubicBezier(0.4, 0, 0.2, 1)",
      });

      // Robust Scroll Lock
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyOverflow = document.body.style.overflow;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      return () => {
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.paddingRight = "0px";
      };
    }
  }, [project]);

  const handleClose = () => {
    anime({
      targets: backdropRef.current,
      opacity: 0,
      duration: 300,
      easing: "easeInQuad",
    });

    anime({
      targets: contentRef.current,
      translateY: 30,
      opacity: 0,
      scale: 0.99,
      duration: 300,
      easing: "easeInQuad",
      complete: () => onClose(),
    });
  };

  const renderDescription = (desc) => {
    if (Array.isArray(desc)) {
      return (
        <ul className="space-y-6">
          {desc.map((point, index) => (
            <li
              key={index}
              className="flex gap-4 text-[#eee] text-lg md:text-xl leading-relaxed font-sans"
            >
              <span className="text-blood mt-2 shrink-0 text-2xl">•</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: point.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-blood font-bold tracking-wide">$1</strong>',
                  ),
                }}
              />
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p className="text-[#eee] text-xl leading-relaxed font-sans">{desc}</p>
    );
  };

  if (!project) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10 bg-black/95 backdrop-blur-[25px] opacity-0"
      onClick={(e) => e.target === backdropRef.current && handleClose()}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-[1200px] h-full md:h-[90vh] bg-deep border border-[#333] shadow-[0_0_150px_rgba(0,0,0,1)] flex flex-col overflow-y-auto no-scrollbar opacity-0 md:rounded-3xl"
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none !important;
          }
          .no-scrollbar {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
        `,
          }}
        />
        {/* Fixed Close Button */}
        <button
          onClick={handleClose}
          className="fixed md:absolute top-6 right-6 z-[120] bg-black/60 backdrop-blur-xl w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-neon transition-all border border-white/20 hover:border-neon text-2xl"
        >
          ✕
        </button>

        {/* Cinematic Initial View (Image + Title) */}
        <div className="min-h-[100%] md:min-h-[90vh] flex flex-col shrink-0 relative">
          {/* Main Landscape Image */}
          <div className="flex-grow bg-[#050505] relative overflow-hidden">
            <img
              src={project.image || "/placeholder-project.jpg"}
              alt={project.title}
              className="w-full h-full object-cover opacity-90 transition-transform duration-[2000ms] scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent"></div>

            {/* Header Overlay (Bottom of first view) */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <h2 className="text-6xl md:text-9xl font-road-rage text-blood tracking-[8px] leading-[0.8] mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                  {project.title}
                </h2>
                <div className="w-32 h-2 bg-blood shadow-[0_0_20px_rgba(139,0,0,0.6)]"></div>
              </div>

              {/* Prominent Action Icons in Initial View */}
              <div className="flex items-center gap-6">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-white/20 hover:border-blood bg-black/40 hover:bg-blood/20 transition-all duration-500 group/link"
                    title="View GitHub"
                  >
                    <img
                      src="https://cdn.simpleicons.org/github/ffffff"
                      alt="GitHub"
                      className="w-8 h-8 group-hover/link:scale-110 transition-transform"
                    />
                  </a>
                )}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-white/20 hover:border-blood bg-black/40 hover:bg-blood/20 transition-all duration-500 group/link"
                    title="View Live Site"
                  >
                    <img
                      src="https://cdn.simpleicons.org/vercel/ffffff"
                      alt="Website"
                      className="w-8 h-8 group-hover/link:scale-110 transition-transform"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
            <span className="text-[10px] font-mono tracking-[4px] uppercase text-dim">
              Scroll Detail
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </div>

        {/* Scrollable Detail Content */}
        <div className="w-full p-8 md:p-20 bg-deep flex flex-col">
          {/* Description with Scroll Animation */}
          <div ref={descRef} className="mb-20 max-w-4xl">
            {renderDescription(project.longDesc || project.desc)}
          </div>

          {/* Tech Stack with Staggered Scroll Animation */}
          <div ref={techRef} className="mt-auto">
            <h4 className="text-dim font-mono text-[12px] tracking-[5px] uppercase mb-12 opacity-40 flex items-center gap-6">
              <span className="h-px bg-white/10 flex-grow"></span>
              CORE ARSENAL
              <span className="h-px bg-white/10 flex-grow"></span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-10">
              {project.techIcons
                ? project.techIcons.map((icon, i) => (
                    <div
                      key={i}
                      className="tech-icon-item flex flex-col items-center gap-4 group/icon"
                    >
                      <div className="w-16 h-16 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center group-hover/icon:border-blood group-hover/icon:bg-blood/5 transition-all duration-500">
                        <img
                          src={`https://cdn.simpleicons.org/${icon.slug}/ffffff`}
                          alt={icon.name}
                          className="w-8 h-8 grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-500"
                        />
                      </div>
                      <span className="text-[11px] font-mono text-dim tracking-wider opacity-0 group-hover/icon:opacity-100 transition-all duration-300">
                        {icon.name}
                      </span>
                    </div>
                  ))
                : project.chips.map((chip, i) => (
                    <span
                      key={i}
                      className="tech-icon-item px-5 py-2 border border-white/10 text-xs text-[#aaa] font-racing-engine"
                    >
                      {chip}
                    </span>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
