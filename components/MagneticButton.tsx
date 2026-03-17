"use client";
import { useRef, MouseEvent, ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
}

export default function MagneticButton({ href, className = "", children, target, rel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
  };

  const handleMouseEnter = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.1s ease";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ display: "inline-flex", transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)" }}
    >
      {children}
    </a>
  );
}
