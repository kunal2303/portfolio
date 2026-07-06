"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { personal } from "@/data/content";

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-2 border-black p-6 shadow-[4px_4px_0px_#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-4 bg-white"
        >
          <div className="flex items-center gap-4">
            <div className="border-2 border-black p-2 shadow-[2px_2px_0px_#0a0a0a]">
              <Mail size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Get in touch</div>
              <a href={`mailto:${personal.email}`} className="font-semibold hover:text-blue-500 transition-colors">
                {personal.email}
              </a>
            </div>
          </div>
          <motion.a
            href={`mailto:${personal.email}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-black text-white font-bold px-6 py-3 border-2 border-black shadow-[3px_3px_0px_#3B82F6] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all text-sm whitespace-nowrap"
          >
            Say Hello
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
