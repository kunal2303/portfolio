"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // wait for the exit animation to finish before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 280);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white border-b-2 border-black"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <div className="bg-blue-500 text-white font-mono font-bold text-sm px-2 py-1 border-2 border-black shadow-[2px_2px_0px_#0a0a0a]">
            KD
          </div>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
              className="text-sm font-medium hover:text-blue-500 transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Right side: social icons + hamburger */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/kunal2303/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
            <GithubIcon size={20} />
          </a>
          <a href="https://www.linkedin.com/in/kunal-kumar-dey-a9918a249/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
            <LinkedinIcon size={20} />
          </a>
          <button
            className="md:hidden border-2 border-black p-1 shadow-[2px_2px_0px_#0a0a0a]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t-2 border-black bg-white"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleMobileNavClick(e, link.href)}
                className="block px-6 py-4 text-sm font-medium border-b border-gray-100 hover:text-blue-500 hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
