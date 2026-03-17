"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#111111]/95 backdrop-blur-sm border-b border-[#B22222]/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-3">
          <div className="w-1 h-6 bg-[#B22222] transition-all duration-300 group-hover:h-8" />
          <div>
            <div className="font-serif text-base font-bold text-[#E8E8E8] leading-none">Diele Consulting</div>
            <div className="text-[#C8C8C8] text-[10px] tracking-widest uppercase">Executive Coaching & Leadership Development</div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[#C8C8C8] hover:text-[#E8E8E8] text-sm transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B22222] group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* LinkedIn icon — sits between nav links and CTA, visually separate */}
          <a
            href="https://linkedin.com/in/jdiele"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Joe Diele on LinkedIn"
            className="text-[#909090] hover:text-[#E8E8E8] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a
            href="https://calendly.com/josephdiele"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#E8E8E8] border border-[#B22222] hover:bg-[#B22222] px-5 py-2 transition-all duration-300"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[#E8E8E8] transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#E8E8E8] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#E8E8E8] transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#111111] border-t border-[#B22222]/20 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-[#C8C8C8] hover:text-[#E8E8E8] text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="https://linkedin.com/in/jdiele"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#909090] hover:text-[#E8E8E8] text-sm transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://calendly.com/josephdiele"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#E8E8E8] border border-[#B22222] px-5 py-2 text-center"
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}
