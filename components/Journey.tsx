"use client";

import { motion } from "framer-motion";
import { journey } from "@/data/content";

export default function Journey() {
  return (
    <section id="journey" className="border-b-2 border-black py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-black text-center mb-3"
        >
          My Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-gray-500 mb-16"
        >
          The path that brought me here
        </motion.p>

        <div className="max-w-2xl mx-auto space-y-12">
          {journey.map((item, i) => (
            <div key={i} className="relative">
              {/* Year */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-6xl sm:text-8xl font-black text-blue-500 leading-none mb-2 select-none"
              >
                {item.year}
              </motion.div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="border-2 border-black p-5 shadow-[4px_4px_0px_#0a0a0a] bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">
                    {String(i + 1).padStart(2, "0")} / {String(journey.length).padStart(2, "0")}
                  </span>
                  {item.status === "done" ? (
                    <span className="text-xs text-green-600 font-semibold">✓ DONE</span>
                  ) : (
                    <span className="text-xs text-blue-500 font-semibold flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                      ONGOING
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
