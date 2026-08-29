"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import anime from "animejs";
import useScrollReveal from "../hooks/useScrollReveal";

const GITHUB_USERNAME = "AnkitCodesJU";

const repos = [
  {
    name: "RollCall",
    desc: "A full-stack attendance management system with a spreadsheet-style matrix UI.",
    lang: "JS / TS",
    link: "https://github.com/AnkitCodesJU/RollCall",
  },
  {
    name: "Voxen",
    desc: "A video streaming platform featuring creator dashboards and Cloudinary upload pipelines.",
    lang: "JS",
    link: "https://github.com/AnkitCodesJU/Voxen",
  },
  {
    name: "CVMorph",
    desc: "An AI-powered mock interview platform featuring automated technical interviews and performance reporting.",
    lang: "React / Gen-AI",
    link: "https://github.com/AnkitCodesJU/CVMorph",
  },
  {
    name: "GreenLens",
    desc: "A smart platform rewarding verified eco-friendly actions with on-chain Green Tokens.",
    lang: "Web3 / AI",
    link: "https://github.com/AnkitCodesJU/Greenlens",
  },
];

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Ruby: "#701516",
  Vue: "#41b883",
  SCSS: "#c6538c",
  Solidity: "#AA6746",
  MDX: "#fcb32c",
  Prisma: "#2D3748",
  EJS: "#a91e50",
};

function useGithubData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, reposRes, commitsSearchRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
          ),
          fetch(
            `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`,
            { headers: { Accept: "application/vnd.github+json" } }
          ),
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("API error");

        const user = await userRes.json();
        const reposList = await reposRes.json();

        // Total commits across all repos via search API
        const commitsData = commitsSearchRes.ok
          ? await commitsSearchRes.json()
          : null;
        const totalCommits = commitsData?.total_count || 0;

        // Total contributions (last year) via contributions API
        const contribData = contribRes.ok
          ? await contribRes.json()
          : null;
        const totalContributions = contribData?.total?.["lastYear"] || 0;

        const totalStars = reposList.reduce(
          (acc, r) => acc + (r.stargazers_count || 0),
          0
        );

        const langMap = {};
        reposList.forEach((r) => {
          if (r.language && !r.fork) {
            langMap[r.language] = (langMap[r.language] || 0) + (r.size || 1);
          }
        });
        const totalSize = Object.values(langMap).reduce((a, b) => a + b, 0);
        const topLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, bytes]) => ({
            name,
            percent: ((bytes / totalSize) * 100).toFixed(1),
            color: LANG_COLORS[name] || "#666",
          }));

        setData({
          name: user.name || GITHUB_USERNAME,
          bio: user.bio || "",
          avatar: user.avatar_url,
          totalStars,
          totalCommits,
          totalContributions,
          publicRepos: user.public_repos,
          followers: user.followers,
          following: user.following,
          topLangs,
          createdAt: user.created_at,
        });
      } catch (err) {
        console.error("GitHub API error:", err);
        setData({
          name: "Ankit Roy",
          bio: "Information Technology Sophomore @ Jadavpur University (2024–2028)\nSoftware Engineering • Full-Stack Development • Problem Solving",
          avatar: `https://avatars.githubusercontent.com/u/177536344?v=4`,
          totalStars: 15,
          totalCommits: 250,
          totalContributions: 320,
          publicRepos: 14,
          followers: 4,
          following: 4,
          topLangs: [
            { name: "TypeScript", percent: "51.0", color: "#3178c6" },
            { name: "JavaScript", percent: "45.7", color: "#f1e05a" },
            { name: "C", percent: "2.4", color: "#555555" },
            { name: "HTML", percent: "0.9", color: "#e34c26" },
          ],
          createdAt: "2024-08-05T12:12:09Z",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading };
}

/* ─── Animated counter ─── */
function AnimatedNumber({ value, duration = 1500 }) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    hasAnimated.current = true;
    const obj = { val: 0 };
    anime({
      targets: obj,
      val: value,
      round: 1,
      duration,
      easing: "easeOutExpo",
      update: () => {
        if (ref.current) ref.current.textContent = obj.val;
      },
    });
  }, [value, duration]);

  return <span ref={ref}>0</span>;
}

/* ─── Fake heatmap grid (visual flair) ─── */
function HeatmapGrid() {
  const weeks = 20;
  const days = 7;
  const cells = [];

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      // Generate a weighted random intensity — most cells light, some bright
      const rand = Math.random();
      let intensity;
      if (rand < 0.35) intensity = 0;
      else if (rand < 0.6) intensity = 1;
      else if (rand < 0.8) intensity = 2;
      else if (rand < 0.93) intensity = 3;
      else intensity = 4;

      const colors = [
        "rgba(178,0,0,0.06)",
        "rgba(178,0,0,0.18)",
        "rgba(178,0,0,0.35)",
        "rgba(255,26,26,0.55)",
        "rgba(255,26,26,0.85)",
      ];

      cells.push(
        <div
          key={`${w}-${d}`}
          className="rounded-[2px] transition-all duration-300 hover:scale-150 hover:rounded-[3px]"
          style={{
            backgroundColor: colors[intensity],
            boxShadow:
              intensity >= 3
                ? `0 0 ${4 + intensity * 2}px rgba(255,26,26,${intensity * 0.15})`
                : "none",
            animationDelay: `${(w * 7 + d) * 15}ms`,
          }}
        ></div>
      );
    }
  }

  return (
    <div
      className="grid gap-[3px]"
      style={{
        gridTemplateColumns: `repeat(${weeks}, 1fr)`,
        gridTemplateRows: `repeat(${days}, 10px)`,
        gridAutoFlow: "column",
      }}
    >
      {cells}
    </div>
  );
}

/* ─── Skeleton loader ─── */
function ProfileCardSkeleton() {
  return (
    <div className="relative border border-[#141414] rounded-[8px] bg-[#080808] p-[40px] animate-pulse">
      <div className="flex items-center gap-[25px] mb-[30px]">
        <div className="w-[80px] h-[80px] rounded-full bg-[#1a1a1a]"></div>
        <div className="space-y-3 flex-1">
          <div className="h-6 w-40 bg-[#1a1a1a] rounded"></div>
          <div className="h-4 w-64 bg-[#141414] rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-[#1a1a1a] rounded"></div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main GitHub profile card ─── */
function GithubProfileCard({ data }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(178,0,0,0.08), transparent 40%)`;
  };

  const handleMouseLeave = () => {
    if (glowRef.current)
      glowRef.current.style.background = "transparent";
  };

  const statItems = [
    {
      value: data.publicRepos,
      label: "REPOS",
      icon: (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
        </svg>
      ),
    },
    {
      value: data.totalStars,
      label: "STARS",
      icon: (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
        </svg>
      ),
    },
    {
      value: data.totalCommits,
      label: "COMMITS",
      icon: (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z" />
        </svg>
      ),
    },
    {
      value: data.totalContributions,
      label: "CONTRIBUTIONS",
      icon: (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path d="M7.823.678a.75.75 0 01.354 0l6.75 2.25a.75.75 0 01.173 1.322l-6.75 4.5a.75.75 0 01-.7 0l-6.75-4.5a.75.75 0 01.173-1.322L7.823.678zM1.401 4.5L8 8.857 14.599 4.5 8 2.178 1.401 4.5zm-.434 3.206a.75.75 0 011.066-.233L8 11.328l5.967-3.855a.75.75 0 01.833 1.248l-6.25 4.04a.75.75 0 01-.867-.017l-6.15-4.023a.75.75 0 01-.233-1.065z" />
        </svg>
      ),
    },
    {
      value: data.followers,
      label: "FOLLOWERS",
      icon: (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-[8px] overflow-hidden"
    >
      {/* Animated border glow */}
      <div
        className="absolute inset-0 rounded-[8px] z-0"
        style={{
          padding: "1px",
          background:
            "linear-gradient(135deg, rgba(178,0,0,0.5), transparent 40%, transparent 60%, rgba(255,26,26,0.3))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      ></div>

      {/* Card body */}
      <div className="relative bg-[#080808] rounded-[8px] p-[35px] md:p-[45px] z-10">
        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-[8px] pointer-events-none z-0 transition-all duration-300"
        ></div>

        {/* Corner accents */}
        <div className="absolute w-[20px] h-[20px] border-t-2 border-l-2 border-blood top-0 left-0 opacity-60"></div>
        <div className="absolute w-[20px] h-[20px] border-b-2 border-r-2 border-blood bottom-0 right-0 opacity-60"></div>

        {/* Profile header */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-[25px] mb-[35px]">
          {/* Avatar with ring */}
          <div className="relative group/avatar flex-shrink-0">
            <div
              className="absolute inset-[-3px] rounded-full opacity-60 group-hover/avatar:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "conic-gradient(from 0deg, #b20000, #ff1a1a, #b20000, transparent, #b20000)",
                animation: "spin 4s linear infinite",
              }}
            ></div>
            <img
              src={data.avatar}
              alt={data.name}
              className="relative w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-full border-2 border-[#0a0a0a] object-cover"
            />
            {/* Online dot */}
            <div className="absolute bottom-1 right-1 w-[12px] h-[12px] rounded-full bg-[#00ff6a] border-2 border-[#0a0a0a] shadow-[0_0_8px_rgba(0,255,106,0.6)]"></div>
          </div>

          {/* Name & bio */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-[12px] mb-[6px] flex-wrap">
              <h3 className="text-white text-[26px] md:text-[30px] font-road-rage tracking-[2px] leading-none">
                {data.name}
              </h3>
              <span className="text-[#444] text-[14px] font-mono">
                @{GITHUB_USERNAME}
              </span>
            </div>
            <p className="text-[#666] text-[13px] font-sans leading-[1.6] max-w-[500px]">
              {data.bio}
            </p>
          </div>

          {/* GitHub link button */}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-[8px] border border-[#222] bg-[#0c0c0c] text-[#888] text-[12px] font-mono tracking-[2px] uppercase px-[16px] py-[8px] rounded-[4px] no-underline transition-all duration-300 hover:border-blood hover:text-neon hover:shadow-[0_0_20px_rgba(178,0,0,0.2)]"
          >
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            VIEW PROFILE
          </a>
        </div>

        {/* Divider */}
        <div className="relative h-[1px] bg-[#1a1a1a] mb-[30px] z-10">
          <div className="absolute left-0 top-0 h-full w-[60px] bg-gradient-to-r from-blood/60 to-transparent"></div>
        </div>

        {/* Stats row */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-[16px] mb-[35px]">
          {statItems.map((stat, idx) => (
            <div
              key={idx}
              className="group/stat text-center p-[15px] rounded-[6px] bg-[#0a0a0a] border border-[#141414] transition-all duration-300 hover:border-blood/40 hover:bg-blood/5 hover:shadow-[0_0_25px_rgba(178,0,0,0.1)]"
            >
              <div className="flex items-center justify-center gap-[6px] text-blood/60 group-hover/stat:text-neon mb-[6px] transition-colors duration-300">
                {stat.icon}
              </div>
              <div
                className="text-white text-[32px] font-mono leading-none mb-[4px]"
                style={{
                  textShadow: "0 0 20px rgba(178,0,0,0.5)",
                }}
              >
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="text-[#444] text-[10px] font-mono tracking-[3px] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Contribution heatmap */}
        <div className="relative z-10 mb-[30px]">
          <div className="flex items-center justify-between mb-[15px]">
            <h4 className="text-[#444] text-[11px] font-mono tracking-[3px] uppercase">
              Contribution Activity
            </h4>
            <div className="flex items-center gap-[6px]">
              <span className="text-[#333] text-[10px] font-mono">Less</span>
              {[0.06, 0.18, 0.35, 0.55, 0.85].map((op, i) => (
                <div
                  key={i}
                  className="w-[10px] h-[10px] rounded-[2px]"
                  style={{
                    backgroundColor:
                      i < 2
                        ? `rgba(178,0,0,${op})`
                        : `rgba(255,26,26,${op})`,
                  }}
                ></div>
              ))}
              <span className="text-[#333] text-[10px] font-mono">More</span>
            </div>
          </div>
          <HeatmapGrid />
        </div>

        {/* Top Languages */}
        <div className="relative z-10">
          <h4 className="text-[#444] text-[11px] font-mono tracking-[3px] uppercase mb-[15px]">
            Top Languages
          </h4>

          {/* Stacked bar */}
          <div className="flex h-[6px] rounded-full overflow-hidden mb-[16px] gap-[2px]">
            {data.topLangs.map((lang, idx) => (
              <div
                key={idx}
                className="h-full rounded-full transition-all duration-500 hover:brightness-125"
                style={{
                  width: `${lang.percent}%`,
                  backgroundColor: lang.color,
                  boxShadow: `0 0 8px ${lang.color}33`,
                }}
              ></div>
            ))}
          </div>

          {/* Language pills */}
          <div className="flex flex-wrap gap-[8px]">
            {data.topLangs.map((lang, idx) => (
              <div
                key={idx}
                className="flex items-center gap-[6px] bg-[#0c0c0c] border border-[#1a1a1a] rounded-full px-[12px] py-[4px] transition-all duration-300 hover:border-[color:var(--lang-color)] hover:shadow-[0_0_12px_var(--lang-glow)]"
                style={{
                  "--lang-color": lang.color,
                  "--lang-glow": `${lang.color}22`,
                }}
              >
                <span
                  className="w-[8px] h-[8px] rounded-full flex-shrink-0"
                  style={{ backgroundColor: lang.color }}
                ></span>
                <span className="text-[#888] text-[11px] font-mono">
                  {lang.name}
                </span>
                <span className="text-[#444] text-[10px] font-mono">
                  {lang.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GithubStats() {
  const titleRef = useScrollReveal({ direction: "left", distance: 40 });
  const statsRef = useScrollReveal({ distance: 50, delay: 100 });
  const repoRef = useScrollReveal({
    selector: ".repo-card-item",
    stagger: 120,
    distance: 40,
  });

  const { data, loading } = useGithubData();

  return (
    <section
      id="github"
      className="py-[100px] px-[5%] relative max-w-[1400px] mx-auto"
    >
      <div ref={titleRef}>
        <div className="text-dim text-[13px] mb-[10px] font-mono tracking-[4px] uppercase">
          006 · SOURCE CODE
        </div>
        <h2 className="text-[clamp(40px,6vw,60px)] mb-[50px] uppercase font-road-rage text-blood tracking-[4px]">
          GITHUB
        </h2>
      </div>

      <div ref={statsRef} className="mb-[40px]">
        {loading || !data ? (
          <ProfileCardSkeleton />
        ) : (
          <GithubProfileCard data={data} />
        )}
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
              <svg
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="var(--color-blood)"
              >
                <path
                  fillRule="evenodd"
                  d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                ></path>
              </svg>
              {repo.name}
            </h3>
            <p className="text-[#666] text-[14px] mb-[15px] font-sans">
              {repo.desc}
            </p>
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
