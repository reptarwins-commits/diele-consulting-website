"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) return;
    setDone(false);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else { setCount(target); setDone(true); }
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return { count, done };
}

function AnimatedLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-[1px] w-full overflow-hidden">
      <div className="h-full transition-all duration-1000 ease-out"
        style={{ width: visible ? "100%" : "0%", background: "linear-gradient(to right, #B22222, #CC3333)" }} />
    </div>
  );
}

const stats = [
  { value: 35, suffix: "+", label: "Years of Experience", sub: "Technology leadership & operations" },
  { value: 500, suffix: "+", label: "Leaders Developed", sub: "Tech, manufacturing & government" },
  { value: 52, suffix: "", label: "Culture Indicators", sub: "Measured in every engagement" },
  { value: 100, suffix: "%", label: "Custom Engagements", sub: "No off-the-shelf programs" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#1a1a1a]">
      <AnimatedLine />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} active={active} delay={i * 150} />
          ))}
        </div>
      </div>
      <AnimatedLine />
    </section>
  );
}

function StatCard({ stat, active, delay }: { stat: typeof stats[0]; active: boolean; delay: number }) {
  const { count, done } = useCountUp(stat.value, 2, active);
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (active) { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }
  }, [active, delay]);

  useEffect(() => {
    if (done) { setPulse(true); const t = setTimeout(() => setPulse(false), 400); return () => clearTimeout(t); }
  }, [done]);

  return (
    <div className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className={`text-4xl md:text-5xl font-serif font-bold text-[#E8E8E8] mb-2 transition-transform duration-200 ${pulse ? "scale-110" : "scale-100"}`}>
        {count}{stat.suffix}
      </div>
      <div className="w-6 h-[2px] bg-[#B22222] mx-auto mb-2" />
      <div className="text-[#E8E8E8] font-semibold text-sm mb-1">{stat.label}</div>
      <div className="text-[#909090] text-sm leading-relaxed">{stat.sub}</div>
    </div>
  );
}
