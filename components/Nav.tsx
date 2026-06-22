"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
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
            <div className="text-[#C8C8C8] text-[10px] tracking-widest uppercase">Joseph Diele</div>
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
