"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Book() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#1a1a1a] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          <div className="relative max-w-xs mx-auto">
            <div className="absolute inset-0 bg-[#B22222]/5 blur-3xl rounded-full" />
            <div className="relative shadow-2xl shadow-black/60 hover:shadow-[#B22222]/10 transition-shadow duration-500">
              <Image
                src="/images/sustainable-quality-cover.jpg"
                alt="Sustainable Quality by Joseph Diele"
                width={320}
                height={427}
                className="w-full h-auto hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#111111] border border-[#B22222]/30 px-4 py-2 shadow-lg">
              <p className="text-[#B22222] text-xs font-semibold">Business Expert Press</p>
              <p className="text-[#909090] text-[10px]">Published 2021</p>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Published Work</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-6 leading-tight">
            The intellectual foundation of every engagement.
          </h2>
          <blockquote className="border-l-2 border-[#B22222] pl-6 mb-6">
            <p className="text-[#C8C8C8] italic leading-relaxed">
              "There is a personal essence to quality, an inward nature, that is important for any improvement to become sustainable."
            </p>
          </blockquote>
          <p className="text-[#C8C8C8] text-base leading-relaxed mb-8">
            <em>Sustainable Quality</em> argues that most improvement efforts fail not because of flawed tools — but because organizations skip the culture work required to make change stick. The same principle drives every engagement.
          </p>
          <a
            href="https://www.amazon.com/Sustainable-Quality-Joseph-Diele/dp/1953349625"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#E8E8E8] font-semibold text-sm border border-[#B22222]/40 hover:border-[#B22222] px-6 py-3 transition-all duration-300 hover:bg-[#B22222]/10 group"
          >
            Get the Book on Amazon
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
