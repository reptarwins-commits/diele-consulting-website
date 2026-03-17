"use client";
import { useEffect, useRef, useState } from "react";

// RedLine — animates left to right on scroll entry. Used as section divider.
export default function GoldLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`h-[1px] w-full overflow-hidden ${className}`}>
      <div
        className="h-full transition-all duration-1000 ease-out"
        style={{
          width: visible ? "100%" : "0%",
          background: "linear-gradient(to right, #B22222, #CC3333)",
        }}
      />
    </div>
  );
}
