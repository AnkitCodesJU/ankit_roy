"use client";

import Link from "next/link";
import useScrollReveal from "../hooks/useScrollReveal";

const repos = [
  { name: "RollCall", desc: "A full-stack attendance management system with a spreadsheet-style matrix UI.", lang: "JS / TS", link: "https://github.com/AnkitCodesJU/RollCall" },
  { name: "Voxen", desc: "A video streaming platform featuring creator dashboards and Cloudinary upload pipelines.", lang: "JS", link: "https://github.com/AnkitCodesJU/Voxen" },
  { name: "GreenLens", desc: "A smart platform rewarding verified eco-friendly actions with on-chain Green Tokens.", lang: "Web3 / AI", link: "https://github.com/AnkitCodesJU/Greenlens" },
  { name: "Antakshari", desc: "A full-stack web app to manage and organize songs for an Antakshari game.", lang: "TS / Next.js", link: "https://github.com/AnkitCodesJU/Antakshari2026" }
];

export default function GithubStats() {
  const titleRef = useScrollReveal({ direction: "left", distance: 40 });
  const statsRef = useScrollReveal({ distance: 50, delay: 100 });
  const repoRef = useScrollReveal({ selector: ".repo-card-item", stagger: 120, distance: 40 });

  return (
    <section id="github" className="py-[100px] px-[5%] relative max-w-[1400px] mx-auto">
      <div ref={titleRef}>
        <div className="text-dim text-[13px] mb-[10px] font-mono tracking-[4px] uppercase">
          006 · SOURCE CODE
        </div>
        <h2 className="text-[clamp(40px,6vw,60px)] mb-[50px] uppercase font-road-rage text-blood tracking-[4px]">
          GITHUB
        </h2>
      </div>

      <div ref={statsRef} className="flex flex-col gap-[20px] mb-[40px]">
        <img
          src="https://github-readme-stats.vercel.app/api?username=AnkitCodesJU&show_icons=true&theme=nord&bg_color=0c0c0c&title_color=8B0000&text_color=666666&icon_color=FF1A1A&hide_border=true"
          alt="GitHub Stats"
          className="w-full border border-[#141414] rounded-[4px] bg-[#0c0c0c]"
          loading="lazy"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=AnkitCodesJU&theme=nord&background=0c0c0c&ring=8B0000&fire=FF1A1A&currStreakNum=E8E8E8&sideNums=666666&currStreakLabel=8B0000&sideLabels=8B0000&dates=666666&hide_border=true"
            alt="GitHub Streak"
            className="w-full border border-[#141414] rounded-[4px] bg-[#0c0c0c]"
            loading="lazy"
          />
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=AnkitCodesJU&layout=compact&theme=nord&bg_color=0c0c0c&title_color=8B0000&text_color=666666&hide_border=true"
            alt="Top Languages"
            className="w-full border border-[#141414] rounded-[4px] bg-[#0c0c0c]"
            loading="lazy"
          />
        </div>
      </div>

      <div ref={repoRef} className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
        {repos.map((repo, idx) => (
          <Link
            href={repo.link}
            key={idx}
            target="_blank"
            className="repo-card-item bg-deep border border-[#141414] p-[25px] transition-all duration-300 relative overflow-hidden block no-underline group hover:border-blood hover:-translate-y-[5px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.6),0_0_15px_rgba(139,0,0,0.2)]"
          >
            <div className="absolute bottom-0 left-[-100%] w-full h-[2px] bg-blood transition-all duration-400 group-hover:left-0"></div>
            <h3 className="text-white text-[20px] mb-[10px] flex items-center gap-[10px] font-racing-engine tracking-widest">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="var(--color-blood)">
                <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
              </svg>
              {repo.name}
            </h3>
            <p className="text-[#666] text-[14px] mb-[15px] font-sans">{repo.desc}</p>
            <div className="text-dim text-[12px] flex items-center gap-[6px] font-mono tracking-widest before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:bg-neon">
              {repo.lang}
            </div>
          </Link>
        ))}
        
        <Link
          href="https://github.com/AnkitCodesJU"
          target="_blank"
          className="flex items-center justify-center bg-[#080808] border border-[#141414] text-dim text-[14px] transition-all duration-300 p-[25px] font-mono no-underline hover:border-blood hover:text-neon hover:bg-blood/5"
        >
          AnkitCodesJU — VIEW ALL →
        </Link>
      </div>
    </section>
  );
}
