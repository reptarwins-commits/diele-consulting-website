"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const articles = [
  {
    publication: "IndustryWeek",
    title: "To Fix Quality, You Must First Fix Culture",
    description: "Quality isn't a department — it's a mindset. Joe argues that sustainable improvement is impossible without first addressing the culture underneath.",
  },
  {
    publication: "ASQ Quality Progress",
    title: "Metamorphosis of a Manager",
    description: "The shift from command-and-control oversight to coaching-oriented leadership. What it really takes to evolve from manager to leader.",
  },
  {
    publication: "FutureFitSME · Podcast",
    title: "Speaker & Guest",
    description: "Featured speaker and podcast guest on leadership transitions, culture transformation, and the human side of operational excellence.",
  },
];

export default function Publications() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[#111111]" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Published Work</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-16">
            He wrote the book on it. Literally.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Book feature */}
          <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="flex gap-8 items-start mb-8">
              <div className="relative flex-shrink-0 w-32 shadow-2xl shadow-black/60">
                <Image
                  src="/images/sustainable-quality-cover.jpg"
                  alt="Sustainable Quality by Joseph Diele"
                  width={128}
                  height={192}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 shadow-inner" />
              </div>
              <div>
                <p className="text-[#B22222] text-xs tracking-[0.2em] uppercase font-semibold mb-2">Business Expert Press · 2021</p>
                <h3 className="font-serif text-2xl font-bold text-[#E8E8E8] mb-3">Sustainable Quality</h3>
                <p className="text-[#C8C8C8] text-sm leading-relaxed">
                  The definitive guide on making continuous improvement last — by focusing on the relationship between quality and organizational culture. Not theory. Hard-won lessons from 35 years in the field.
                </p>
              </div>
            </div>

            {/* Upcoming book */}
            <div className="border border-white/5 bg-[#1a1a1a] p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#B22222] text-[10px] tracking-[0.2em] uppercase font-semibold">Coming 2026</span>
                <div className="flex-1 h-[1px] bg-white/10" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#E8E8E8] mb-1">Fire from the Inside-Out</h4>
              <p className="text-[#909090] text-sm">His next book — currently in development.</p>
            </div>
          </div>

          {/* Articles */}
          <div className={`space-y-4 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <p className="text-[#909090] text-sm tracking-wide uppercase font-medium mb-6">Featured In</p>
            {articles.map((a, i) => (
              <div key={i} className="border border-white/5 bg-[#1a1a1a] p-5 hover:border-[#B22222]/30 hover:bg-[#150a0a] transition-all duration-200 group">
                <p className="text-[#B22222] text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">{a.publication}</p>
                <h4 className="text-[#E8E8E8] font-semibold text-base mb-2 group-hover:text-white transition-colors duration-200">"{a.title}"</h4>
                <p className="text-[#909090] text-sm leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
