"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { GithubIcon } from "@/components/icons";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/content";

type Project = (typeof projects)[number];

// ─────────────────────────────────────────────────────────────
// Card content (used by both grid + stack)
// ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border-2 border-black shadow-[4px_4px_0px_#0a0a0a] flex flex-col bg-white h-full">
      <div className="h-48 border-b-2 border-black bg-gray-50 flex items-center justify-center">
        {project.placeholder ? (
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">🚧</div>
            <div className="text-sm font-mono">Coming soon</div>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image!} alt={project.title} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
        <p className="text-gray-500 text-sm font-mono leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="border border-black text-xs px-2 py-1">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="border-2 border-black p-2 shadow-[2px_2px_0px_#0a0a0a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <GithubIcon size={16} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="border-2 border-black p-2 shadow-[2px_2px_0px_#0a0a0a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile stack: top card is draggable, others peek behind
// ─────────────────────────────────────────────────────────────
const SWIPE_THRESHOLD = 120;

function ProjectStack() {
  // `order` holds the project ids in current stack order (top → bottom).
  // Swiping cycles the top id to the end, giving infinite loop.
  const [order, setOrder] = useState(() => projects.map((p) => p.id));

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > 500) {
      setOrder(([first, ...rest]) => [...rest, first]);
    }
  };

  // Render only the top 3 for peek depth
  const visible = order.slice(0, 3).map((id) => projects.find((p) => p.id === id)!);
  const activeIndex = projects.findIndex((p) => p.id === order[0]);

  return (
    <div className="md:hidden relative">
      <div className="relative h-[440px] max-w-sm mx-auto">
        <AnimatePresence initial={false}>
          {visible.map((project, i) => {
            const isTop = i === 0;
            const yOffset = i * 8;
            const scale   = 1 - i * 0.04;
            const zIndex  = 10 - i;

            return (
              <motion.div
                key={project.id}
                className="absolute inset-0"
                style={{ zIndex }}
                initial={{ scale: scale - 0.04, y: yOffset + 8, opacity: 0 }}
                animate={{ scale, y: yOffset, opacity: 1, rotate: 0, x: 0 }}
                exit={{ x: 400, opacity: 0, rotate: 15, transition: { duration: 0.35 } }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={isTop ? handleDragEnd : undefined}
                whileDrag={isTop ? { rotate: 4, cursor: "grabbing" } : undefined}
              >
                <ProjectCard project={project} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex flex-col items-center gap-2 mt-6">
        <div className="flex gap-1.5">
          {projects.map((p, i) => (
            <span
              key={p.id}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? "w-6 bg-blue-500" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 font-mono">swipe to see more →</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="border-b-2 border-black py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-black text-center mb-3"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-gray-500 mb-12"
        >
          Things I&apos;ve built and worked on
        </motion.p>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Mobile stack */}
        <ProjectStack />
      </div>
    </section>
  );
}
