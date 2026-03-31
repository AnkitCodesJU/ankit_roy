"use client";

import useScrollReveal from "../hooks/useScrollReveal";

const achievements = [
  {
    title: "Winner — HonourCode Hackathon",
    desc: "IISc Bengaluru — First place among competing teams from India's premier institutions"
  },
  {
    title: "Pupil — Codeforces",
    desc: "Max Rating: 1221 — Consistent competitive programmer with strong algorithmic fundamentals"
  },
  {
    title: "2★ — CodeChef",
    desc: "Max Rating: 1422 — Active Div 2 & 3 contestant with improving performance trajectory"
  },
  {
    title: "DSA & Algo Grind",
    desc: "Ongoing — MERN projects, algorithmic optimization, backend CS fundamentals"
  }
];

const stats = [
  { val: "1221", lbl: "CF RATING" },
  { val: "1422", lbl: "CC RATING" },
  { val: "1W", lbl: "HACKATHONS" },
  { val: "3+", lbl: "PROJECTS" }
];

export default function Achievements() {
  const titleRef = useScrollReveal({ direction: "left", distance: 40 });
  const listRef = useScrollReveal({ selector: ".achieve-item", stagger: 180, distance: 50 });
  const statsRef = useScrollReveal({ direction: "right", distance: 60, delay: 200 });

  return (
    <section id="achievements" className="py-[100px] px-[5%] relative max-w-[1400px] mx-auto">
      <div ref={titleRef}>
        <div className="text-dim text-[13px] mb-[10px] font-mono tracking-[4px] uppercase">
          005 · RECORDS
        </div>
        <h2 className="text-[clamp(40px,6vw,60px)] mb-[50px] uppercase font-road-rage text-blood tracking-[4px]">
          ACHIEVEMENTS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-[50px]">
        
        {/* Achievement List */}
        <div ref={listRef} className="flex flex-col gap-[30px]">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="achieve-item border-l-2 border-blood pl-[25px] relative transition-all duration-300 group hover:border-neon"
            >
              <div className="absolute left-[-6px] top-[8px] w-[10px] h-[10px] bg-neon rounded-full shadow-[0_0_15px_var(--color-neon)] transition-all duration-300 group-hover:bg-white group-hover:shadow-[0_0_44px_var(--color-neon)]"></div>
              <h3 className="text-[24px] text-white mb-[8px] font-sakana tracking-widest">{item.title}</h3>
              <p className="text-[#777] text-[14px] leading-[1.5] font-sans">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Box */}
        <div ref={statsRef} className="border border-[#171717] bg-deep p-[40px] relative flex flex-col justify-center">

          <div className="absolute w-[15px] h-[15px] border-2 border-blood z-10 top-0 left-0 border-r-0 border-b-0"></div>
          <div className="absolute w-[15px] h-[15px] border-2 border-blood z-10 bottom-0 right-0 border-l-0 border-t-0"></div>
          
          <h3 className="text-[36px] text-center mb-[40px] text-[#444] leading-none text-stroke-0 text-shadow-none font-road-rage tracking-widest">
            JADAVPUR UNIVERSITY
          </h3>
          
          <div className="grid grid-cols-2 gap-[30px] text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-[50px] text-white leading-none mb-[5px] font-road-rage" style={{ textShadow: "0 0 20px rgba(139,0,0,0.8)", WebkitTextStroke: "1px var(--color-blood)" }}>
                  {stat.val}
                </div>
                <div className="text-dim text-[12px] font-mono tracking-widest uppercase">{stat.lbl}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
