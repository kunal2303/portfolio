"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { personal } from "@/data/content";

const floatingBadges = [
  { label: "Java",        color: "bg-orange-100 border-orange-400", pos: "top-8 left-12",     duration: 3.2 },
  { label: "React",       color: "bg-blue-100 border-blue-400",     pos: "top-4 right-20",    duration: 2.6 },
  { label: "Spring Boot", color: "bg-green-100 border-green-400",   pos: "bottom-16 left-8",  duration: 3.8 },
  { label: "Agentic AI",  color: "bg-purple-100 border-purple-400", pos: "bottom-8 right-12", duration: 2.9 },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col justify-center border-b-2 border-black relative">
      <div className="max-w-6xl mx-auto px-6 py-20 w-full relative z-10">
        {/* Hello badge */}
        <motion.div {...fadeUp(0.2)} className="flex justify-center mb-8">
          <span className="font-mono text-sm border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#0a0a0a] bg-white">
            &gt;_ Hello!
          </span>
        </motion.div>

        {/* Name */}
        <div className="relative text-center mb-6">
          {floatingBadges.map((badge) => (
            <motion.span
              key={badge.label}
              className={`hidden lg:inline-block absolute ${badge.pos} ${badge.color} border-2 text-xs font-semibold px-2 py-1 shadow-[2px_2px_0px_#0a0a0a]`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: badge.duration, repeat: Infinity, ease: "easeInOut" }}
            >
              {badge.label}
            </motion.span>
          ))}
          <motion.h1 {...fadeUp(0.4)} className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight">
            I&apos;m{" "}
            <span className="text-blue-500">Kunal Kumar</span>
            <br />
            Dey
          </motion.h1>
        </div>

        {/* Title badge */}
        <motion.div {...fadeUp(0.6)} className="flex justify-center mb-6">
          <span className="border-2 border-black font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 shadow-[2px_2px_0px_#0a0a0a] tracking-widest uppercase text-center bg-white">
            Software Engineer @ SAP
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p {...fadeUp(0.75)} className="text-center text-gray-500 max-w-xl mx-auto mb-8 text-base sm:text-lg px-2">
          {personal.bio}
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.9)} className="flex flex-wrap justify-center gap-4 mb-16">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-2 border-black px-4 py-2 font-semibold text-sm shadow-[3px_3px_0px_#0a0a0a] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all bg-white"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-2 border-black px-4 py-2 font-semibold text-sm shadow-[3px_3px_0px_#0a0a0a] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all bg-white"
          >
            <LinkedinIcon size={16} />
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            download="Kunal_Kumar_Dey_Resume.pdf"
            className="flex items-center gap-2 bg-blue-500 text-white border-2 border-black px-4 py-2 font-semibold text-sm shadow-[3px_3px_0px_#0a0a0a] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            <Download size={16} />
            Resume
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div {...fadeUp(1.05)} className="border-t-2 border-black grid grid-cols-2 divide-x-2 divide-black max-w-md mx-auto bg-white">
          <div className="text-center py-6 px-4">
            <div className="text-4xl font-black">{personal.yoe}+</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">YOE</div>
          </div>
          <div className="text-center py-6 px-4">
            <div className="text-4xl font-black">{personal.githubRepos}+</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">GitHub Repos</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
