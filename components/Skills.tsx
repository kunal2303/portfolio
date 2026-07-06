"use client";

import { motion } from "framer-motion";

// Every skill entry is data-driven so we can stagger them cleanly.
type SkillItem = {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontWeight: number;
  fill: string;
  letterSpacing?: number;
  rotate?: number; // rotation anchor is the (x,y) point
};

const DESKTOP_SKILLS: SkillItem[] = [
  // Row 1
  { text: "TYPESCRIPT", x: 5,   y: 48,  fontSize: 17, fontWeight: 600, fill: "#888" },
  { text: "BACKEND",    x: 450, y: 52,  fontSize: 30, fontWeight: 700, fill: "#111" },
  { text: "PYTHON",     x: 745, y: 48,  fontSize: 17, fontWeight: 600, fill: "#888" },
  // Row 2
  { text: "REST API",   x: 5,   y: 116, fontSize: 17, fontWeight: 600, fill: "#888" },
  { text: "CI/CD",      x: 620, y: 116, fontSize: 17, fontWeight: 600, fill: "#111" },
  { text: "JAVASCRIPT", x: 720, y: 122, fontSize: 26, fontWeight: 700, fill: "#111" },
  // Vertical zone
  { text: "SPRING BOOT",x: 400, y: 430, fontSize: 19, fontWeight: 700, fill: "#111", rotate: -90 },
  { text: "TERRAFORM",  x: 432, y: 380, fontSize: 14, fontWeight: 600, fill: "#888", rotate: -90 },
  { text: "MAVEN",      x: 460, y: 315, fontSize: 13, fontWeight: 600, fill: "#888", rotate: -90 },
  { text: "GRADLE",     x: 483, y: 340, fontSize: 13, fontWeight: 600, fill: "#888", rotate: -90 },
  // Main row
  { text: "FULL STACK", x: 5,   y: 290, fontSize: 58, fontWeight: 900, fill: "#111" },
  { text: "REACT",      x: 515, y: 282, fontSize: 34, fontWeight: 900, fill: "#3B82F6" },
  { text: "NODE.JS",    x: 730, y: 282, fontSize: 22, fontWeight: 700, fill: "#111" },
  // Row 4
  { text: "SQL",        x: 5,   y: 462, fontSize: 17, fontWeight: 600, fill: "#888" },
  { text: "LINUX",      x: 58,  y: 462, fontSize: 17, fontWeight: 600, fill: "#111" },
  { text: "KUBERNETES", x: 175, y: 462, fontSize: 21, fontWeight: 700, fill: "#111" },
  { text: "GIT",        x: 572, y: 462, fontSize: 21, fontWeight: 700, fill: "#3B82F6" },
  { text: "AGILE",      x: 678, y: 462, fontSize: 17, fontWeight: 600, fill: "#111" },
  // Right verticals
  { text: "JAVA",       x: 858, y: 338, fontSize: 38, fontWeight: 900, fill: "#3B82F6", rotate: -90 },
  { text: "AZURE",      x: 908, y: 262, fontSize: 14, fontWeight: 600, fill: "#888",    rotate: -90 },
  { text: "POSTGRESQL", x: 935, y: 260, fontSize: 10, fontWeight: 400, fill: "#ccc",    rotate: -90 },
  { text: "ANSIBLE",    x: 958, y: 236, fontSize: 10, fontWeight: 400, fill: "#ccc",    rotate: -90 },
  // Row 5
  { text: "MICROSERVICES", x: 150, y: 518, fontSize: 17, fontWeight: 600, fill: "#111" },
  { text: "OPEN SOURCE",   x: 515, y: 518, fontSize: 12, fontWeight: 400, fill: "#ccc" },
  { text: "CLEAN CODE",    x: 670, y: 518, fontSize: 17, fontWeight: 600, fill: "#111" },
  // Row 6
  { text: "AI-ASSISTED",        x: 5,   y: 563, fontSize: 24, fontWeight: 700, fill: "#3B82F6" },
  { text: "GITHUB COPILOT",     x: 228, y: 563, fontSize: 12, fontWeight: 400, fill: "#888" },
  { text: "PROMPT ENGINEERING", x: 543, y: 563, fontSize: 12, fontWeight: 400, fill: "#ccc" },
];

const MOBILE_SKILLS = [
  { t: "FULL STACK",          c: "text-3xl font-black text-gray-900" },
  { t: "JAVA",                c: "text-2xl font-black text-blue-500" },
  { t: "SPRING BOOT",         c: "text-xl font-bold text-gray-800" },
  { t: "REACT",               c: "text-2xl font-black text-blue-500" },
  { t: "JAVASCRIPT",          c: "text-xl font-bold text-gray-800" },
  { t: "BACKEND",             c: "text-xl font-bold text-gray-800" },
  { t: "REST API",            c: "text-base font-semibold text-gray-600" },
  { t: "TYPESCRIPT",          c: "text-base font-semibold text-gray-500" },
  { t: "GIT",                 c: "text-lg font-bold text-blue-500" },
  { t: "KUBERNETES",          c: "text-base font-bold text-gray-800" },
  { t: "NODE.JS",             c: "text-base font-bold text-gray-800" },
  { t: "MICROSERVICES",       c: "text-base font-semibold text-gray-700" },
  { t: "CI/CD",               c: "text-base font-semibold text-gray-700" },
  { t: "AI-ASSISTED",         c: "text-lg font-bold text-blue-500" },
  { t: "LINUX",               c: "text-sm font-semibold text-gray-600" },
  { t: "AZURE",               c: "text-sm font-semibold text-gray-600" },
  { t: "AGILE",               c: "text-sm font-semibold text-gray-600" },
  { t: "CLEAN CODE",          c: "text-sm font-semibold text-gray-600" },
  { t: "MAVEN",               c: "text-sm font-medium text-gray-400" },
  { t: "GRADLE",              c: "text-sm font-medium text-gray-400" },
  { t: "GITHUB COPILOT",      c: "text-sm font-medium text-gray-400" },
  { t: "PROMPT ENGINEERING",  c: "text-sm font-medium text-gray-300" },
];

export default function Skills() {
  return (
    <section id="skills" className="border-b-2 border-black py-16 relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Desktop SVG word cloud — each word fades + scales in with a stagger */}
        <div className="hidden md:block">
          <motion.svg
            viewBox="0 0 1000 620"
            className="w-full h-auto"
            aria-label="Skills word cloud"
            style={{ fontFamily: "inherit" }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show:   { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
            }}
          >
            {DESKTOP_SKILLS.map((s) => {
              const rot = s.rotate ?? 0;
              const isRotated = rot !== 0;

              // The visible text element. We animate it via motion for entrance + hover.
              // For rotated words we wrap in a plain SVG <g transform="rotate(...)">
              // so rotation uses the SVG coordinate system (rotating around the (x,y)
              // anchor), and the motion transforms only apply scale/opacity.
              const inner = (
                <motion.text
                  x={s.x}
                  y={s.y}
                  fontSize={s.fontSize}
                  fontWeight={s.fontWeight}
                  fill={s.fill}
                  letterSpacing={s.letterSpacing}
                  variants={{
                    hidden: { opacity: 0, scale: 0.6 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      transition: { type: "spring", stiffness: 220, damping: 18 },
                    },
                  }}
                  whileHover={{ fill: "#3B82F6", scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    cursor: "default",
                    transformOrigin: `${s.x}px ${s.y}px`,
                  }}
                >
                  {s.text}
                </motion.text>
              );

              return isRotated ? (
                <g key={s.text} transform={`rotate(${rot},${s.x},${s.y})`}>{inner}</g>
              ) : (
                <g key={s.text}>{inner}</g>
              );
            })}

            {/* Embedded stats — animate separately with a slow pulse */}
            <motion.text
              x={450} y={400} fontSize={46} fontWeight={900} fill="#3B82F6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
            >
              1+
            </motion.text>
            <motion.text
              x={451} y={421} fontSize={11} fontWeight={600} fill="#aaa" letterSpacing={2}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
            >
              YRS EXP
            </motion.text>
            <motion.text
              x={752} y={406} fontSize={38} fontWeight={900} fill="#3B82F6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.35, type: "spring" }}
            >
              12+
            </motion.text>
            <motion.text
              x={753} y={425} fontSize={11} fontWeight={600} fill="#aaa" letterSpacing={2}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6 }}
            >
              REPOS
            </motion.text>
          </motion.svg>
        </div>

        {/* Mobile: staggered flex-wrap with hover/tap pop */}
        <motion.div
          className="md:hidden flex flex-wrap items-center justify-center gap-x-4 gap-y-3 py-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show:   { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
          }}
        >
          {MOBILE_SKILLS.map(({ t, c }) => (
            <motion.span
              key={t}
              className={`${c} leading-tight cursor-default`}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.7 },
                show:   { opacity: 1, y: 0,  scale: 1, transition: { type: "spring", stiffness: 240, damping: 18 } },
              }}
              whileHover={{ scale: 1.1, color: "#3B82F6" }}
              whileTap={{ scale: 0.95 }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
