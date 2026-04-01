"use client";

import { useState } from "react";
import Link from "next/link";
import useScrollReveal from "../hooks/useScrollReveal";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    id: "01",
    tag: "MERN · FULL-STACK",
    title: "RollCall",
    desc: "A full-stack attendance management system with a spreadsheet-style matrix UI, real-time sync, and role-based workflows for instructors and students. Export-ready reporting included.",
    chips: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "JWT",
      "REST API",
      "TailwindCSS",
      "Next.js",
    ],
    link: "https://github.com/AnkitCodesJU/RollCall",
    website: "https://roll-call-mu.vercel.app/",
    image: "/assets/rollcall.png",
    longDesc: [
      "**Full-Stack Attendance System**: Built using **MongoDB, Express.js, Next.js, and Node.js**, enabling teachers to manage classes with **secure join codes** and controlled student access.",
      "**Attendance Matrix**: Designed a **spreadsheet-style** matrix with customizable and private columns for tracking attendance, remarks, and grading.",
      "**Advanced Workflows**: Implemented **role-based access**, **CSV export/reporting**, and **real-time notifications**.",
      "**Modern UI**: Featuring a **responsive dark/light UI** optimized for all devices.",
    ],
    techIcons: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express", slug: "express" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "JWT", slug: "jsonwebtokens" },
      { name: "JavaScript", slug: "javascript" },
    ],
  },
  {
    id: "02",
    tag: "STREAMING · JWT · CLOUD",
    title: "Voxen",
    desc: "A full-stack video streaming platform with JWT authentication, creator dashboards, live class hubs, and rich community engagement features.",
    chips: [
      "React",
      "Express",
      "Node.js",
      "Tailwind CSS",
      "MongoDB",
      "Axios",
      "JavaScript",
      "TypeScript",
    ],
    link: "https://github.com/AnkitCodesJU/Voxen",
    website: "https://voxen-two.vercel.app/",
    image: "/assets/voxen.png",
    longDesc: [
      "**Full-Stack Streaming Platform**: Built using **MongoDB, Express.js, React/Next.js, and Node.js** with **JWT-based authentication** and comprehensive **user profile management**.",
      "**Video & Engagement**: Implemented **video upload, playback**, and engagement features including **likes, comments, subscriptions, watch history**, and **watch-later** functionality.",
      "**Creator Dashboard**: Developed a **creator dashboard** and **live class hub** with **channel analytics**, **content management**, and community interaction through **posts and threaded discussions**.",
      "**Modern Tech Stack**: Powered by **React, Express, Node.js, Tailwind CSS, MongoDB, Axios, JavaScript**, and **TypeScript** for a robust, scalable architecture.",
    ],
    techIcons: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express", slug: "express" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
    ],
  },
  {
    id: "03",
    tag: "SUSTAINABILITY · WEB3 · AI",
    title: "GreenLens",
    desc: "A sustainability platform that tracks environmental impact, verifies eco-friendly actions via ML, and rewards users with on-chain Green Tokens.",
    chips: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Next.js",
      "Python",
      "JavaScript",
      "TypeScript",
    ],
    link: "https://github.com/Deepsayan-Das/Green-Lens",
    website: "https://green-lens-nine.vercel.app/",
    image: "/assets/greenlens.png",
    longDesc: [
      "**Sustainability Platform**: Developed a platform that helps users **track and reduce their environmental impact** through **daily activity logging** — rewarding sustainability through **transparency and technology**.",
      "**ML-Powered Verification**: Verifies **eco-friendly actions** using an **ML-based system** and rewards users with **Green Tokens** stored transparently **on-chain**.",
      "**Interactive Dashboard**: Features a clean **React-based dashboard** that visualizes **carbon savings, token balance**, and **overall progress**.",
    ],
    techIcons: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express", slug: "express" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Python", slug: "python" },
      { name: "TypeScript", slug: "typescript" },
    ],
  },
  {
    id: "04",
    tag: "FULL-STACK · GAME",
    title: "Antakshari",
    desc: "A full-stack game management platform featuring secure JWT-based authentication, role-based access, and a smart song management engine.",
    chips: [
      "Next.js",
      "React",
      "Express.js",
      "Node.js",
      "Tailwind CSS",
      "MongoDB",
      "TypeScript",
      "Cloudinary",
      "JWT",
      "Axios",
      "Multer",
    ],
    link: "https://github.com/AnkitCodesJU/Antakshari2026",
    website: "https://antakshari-v1.onrender.com/",
    image: "/assets/antakshari.png",
    longDesc: [
      "**Full-Stack Game Management**: Built using **MongoDB, Express.js, Next.js, and Node.js**, featuring **secure JWT-based authentication** and granular **role-based access controls**.",
      "**Song Management**: Implemented **MP3 file uploads** via **Cloudinary**, alongside a **centralized library** for organizing, filtering, and managing tracks.",
      "**Smart Game Logic**: Developed a **specialized shuffle engine**, **automatic multi-language categorization**, and an **admin-exclusive round locking mechanism** with **optimistic UI updates**.",
      "**Advanced Tech**: Powered by **Next.js, Tailwind CSS, TypeScript, and Multer** for a high-performance, responsive experience.",
    ],
    techIcons: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "React", slug: "react" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express", slug: "express" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
    ],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const titleRef = useScrollReveal({ direction: "left", distance: 40 });
  const gridRef = useScrollReveal({
    selector: ".project-card-item",
    stagger: 150,
    distance: 80,
  });

  return (
    <section
      id="projects"
      className="py-[100px] px-[5%] relative max-w-[1400px] mx-auto"
    >
      <div ref={titleRef}>
        <div className="text-dim text-[13px] mb-[10px] font-mono tracking-[4px] uppercase">
          003 · CASE FILES
        </div>
        <h2 className="text-[clamp(40px,6vw,60px)] mb-[50px] uppercase font-road-rage text-blood tracking-[4px]">
          PROJECTS
        </h2>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[2px]"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="project-card-item cursor-pointer group bg-deep border border-[#171717] p-[30px] relative transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col overflow-hidden text-white no-underline hover:border-neon hover:-translate-y-[8px] hover:shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(139,0,0,0.4),inset_0_30px_50px_-30px_rgba(255,26,26,0.2)]"
          >
            {/* Corners */}
            <div className="absolute w-[15px] h-[15px] border-2 border-blood z-10 top-0 left-0 border-r-0 border-b-0"></div>
            <div className="absolute w-[15px] h-[15px] border-2 border-blood z-10 bottom-0 right-0 border-l-0 border-t-0"></div>

            {/* Sweep Effect */}
            <div className="absolute top-0 left-[-100%] w-[50%] h-[2px] bg-neon transition-all duration-500 shadow-[0_0_15px_var(--color-neon)] group-hover:left-[150%]"></div>

            <div className="flex justify-between items-center mb-[20px]">
              <span className="text-smoke text-[24px] font-mono">
                {project.id}
              </span>
              <span className="text-[12px] text-blood tracking-[2px] text-right font-sakana">
                {project.tag}
              </span>
            </div>

            <h3 className="text-[34px] leading-none mb-[15px] font-road-rage text-blood tracking-[4px]">
              {project.title}
            </h3>

            <p className="text-[#777] text-[15px] leading-[1.5] mb-[30px] flex-grow font-sans">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-[8px] mb-[25px] font-racing-engine">
              {project.chips.map((chip, index) => (
                <span
                  key={index}
                  className="text-[11px] border border-[#1a1a1a] py-[4px] px-[10px] text-dim transition-all duration-300 group-hover:border-blood group-hover:text-[#aaa]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="text-right text-dim text-[14px] transition-all duration-300 font-racing-engine group-hover:text-neon">
              DEATAILS →
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
