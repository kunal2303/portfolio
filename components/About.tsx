"use client";

import { motion } from "framer-motion";
import { MapPin, Monitor, Server, Wrench } from "lucide-react";
import { personal, skills } from "@/data/content";

function SkillTag({ label }: { label: string }) {
  return (
    <span className="border-2 border-black text-xs font-semibold px-2 py-1 shadow-[2px_2px_0px_#0a0a0a]">
      {label}
    </span>
  );
}

const cardVariant = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function About() {
  return (
    <section id="about" className="border-b-2 border-black py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-black text-center mb-12"
        >
          Get to know me ↓
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bio */}
          <motion.div {...cardVariant(0)} className="md:col-span-2 border-2 border-black p-6 shadow-[4px_4px_0px_#0a0a0a] bg-white">
            <h3 className="font-bold text-lg mb-3">About Me</h3>
            <p className="text-gray-600 leading-relaxed">
              I&apos;m a full-stack developer and M.Tech CS student at BITS Pilani, currently working at SAP. I enjoy
              building products that are clean, reliable, and easy to use. I&apos;m always curious to learn new things,
              improve my craft, and explore better ways to build user-friendly software.
            </p>
          </motion.div>

          {/* Location */}
          <motion.div {...cardVariant(0.1)} className="border-2 border-black p-6 shadow-[4px_4px_0px_#0a0a0a] bg-blue-500 text-white">
            <MapPin size={24} className="mb-4" />
            <div className="text-xs uppercase tracking-widest mb-2 opacity-80">Location</div>
            <div className="text-2xl font-black">{personal.location}</div>
          </motion.div>

          {/* Frontend */}
          <motion.div {...cardVariant(0.2)} className="border-2 border-black p-6 shadow-[4px_4px_0px_#0a0a0a] bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Monitor size={20} />
              <h3 className="font-bold">Front-End</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((s) => <SkillTag key={s} label={s} />)}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div {...cardVariant(0.3)} className="border-2 border-black p-6 shadow-[4px_4px_0px_#0a0a0a] bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Server size={20} />
              <h3 className="font-bold">Back-End</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((s) => <SkillTag key={s} label={s} />)}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div {...cardVariant(0.4)} className="border-2 border-black p-6 shadow-[4px_4px_0px_#0a0a0a] bg-white">
            <div className="flex items-center gap-2 mb-4">
              <Wrench size={20} />
              <h3 className="font-bold">Tools &amp; DevOps</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((s) => <SkillTag key={s} label={s} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
