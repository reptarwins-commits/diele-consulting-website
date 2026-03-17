"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Book() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-10 md:py-16 bg-[#1a1a1a] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* Left — book cover: full width, natural aspect ratio, top-left anchored */}
        <div className={`flex items-start py-0 md:py-4 pr-0 md:pr-8 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          <div className="relative w-full">
            <div className="absolute inset-0 bg-[#B22222]/5 blur-3xl rounded-full" />
            <a
              href="https://www.amazon.com/Sustainable-Quality-Joseph-Diele/dp/1953349625"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative shadow-2xl shadow-black/60 hover:shadow-[#B22222]/10 transition-shadow duration-500"
            >
              <Image
                src="/images/sustainable-quality-cover-3d.png"
                alt="Sustainable Quality by Joseph Diele"
                width={320}
                height={427}
                className="w-full h-auto hover:scale-[1.02] transition-transform duration-500"
              />
            </a>
            <div className="absolute bottom-3 right-3 bg-[#111111] border border-[#B22222]/30 px-4 py-2 shadow-lg">
              <p className="text-[#B22222] text-xs font-semibold">Business Expert Press</p>
              <p className="text-[#909090] text-[10px]">Published 2021</p>
            </div>
          </div>
        </div>

        {/* Right — content */}
        <div className={`pt-6 md:pt-4 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Published Work</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-6 leading-tight">
            The intellectual foundation of every engagement.
          </h2>
          <blockquote className="border-l-2 border-[#B22222] pl-6 mb-6">
            <p className="text-[#C8C8C8] italic leading-relaxed">
              &ldquo;There is a personal essence to quality, an inward nature, that is important for any improvement to become sustainable.&rdquo;
            </p>
          </blockquote>
          <p className="text-[#C8C8C8] text-base leading-relaxed mb-8">
            <em>Sustainable Quality</em> argues that most improvement efforts fail not because of flawed tools — but because organizations skip the culture work required to make change stick. The same principle drives every engagement.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="https://www.amazon.com/Sustainable-Quality-Joseph-Diele/dp/1953349625"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#E8E8E8] font-semibold text-sm border border-[#B22222]/40 hover:border-[#B22222] px-6 py-3 transition-all duration-300 hover:bg-[#B22222]/10 group"
            >
              Get the Book on Amazon
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
            <a
              href="https://calendly.com/josephdiele"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C8C8C8] font-semibold text-sm border border-white/10 hover:border-white/30 px-6 py-3 transition-all duration-300 group"
            >
              Discuss the Book
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>

          {/* Amazon reviews */}
          <div className="border-t border-white/5 pt-6">
            <p className="text-[#909090] text-xs tracking-[0.2em] uppercase mb-4">Reader Reviews</p>
            <div className="space-y-3">
              {[
                { stars: 5, title: "A must read if you are in the process of making quality a key component of your culture", text: "Having been in the industry for 45 years, if you don't address the culture then you are missing a key ingredient for a successful quality implementation. You have to start with the people-centric approach outlined in this book.", reviewer: "fred casanova", verified: true },
                { stars: 5, title: "Good book to understand how quality impacts modern business.", text: "This is a good read. This book should be a required reading for graduate level MBA or CIS courses. This book will help you understand the impacts of quality in most aspects of business, not just manufacturing or development areas.", reviewer: "ramesta", verified: false },
                { stars: 5, title: "A must-read for professional leaders", text: "Diele takes a refreshing approach to quality, with a much needed emphasis on company culture. Will definitely be implementing what I've learned from this book in my work and hope others do as well!", reviewer: "joka", verified: false },
                { stars: 5, title: "Joe is an expert in his field!", text: "An excellent book that highlights culture as the key ingredient to unlocking quality as a competitive advantage. The author's experience driving quality throughout his career shows throughout the book.", reviewer: "Harvey A. Kamionka", verified: false },
              ].map((r, i) => (
                <div key={i} className="pb-3 border-b border-white/5 last:border-0">
                  <div className="flex items-start gap-2 mb-1 flex-wrap">
                    <div className="flex gap-0.5 flex-shrink-0 mt-0.5">
                      {[...Array(r.stars)].map((_, j) => (
                        <span key={j} className="text-[#B22222] text-[10px]">★</span>
                      ))}
                    </div>
                    <span className="text-[#E8E8E8] text-xs font-semibold leading-tight">{(r as any).title}</span>
                    {(r as any).verified && <span className="text-[#4a9eff] text-[9px] border border-[#4a9eff]/30 px-1.5 py-0.5 flex-shrink-0">Verified</span>}
                  </div>
                  <p className="text-[#909090] text-xs leading-relaxed mb-1">{r.text}</p>
                  <p className="text-[#555555] text-[10px]">— {r.reviewer}</p>
                </div>
              ))}
            </div>
            <a
              href="https://www.amazon.com/Sustainable-Quality-Joseph-Diele/dp/1953349625#customerReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#909090] hover:text-[#B22222] text-xs mt-3 inline-block transition-colors duration-200"
            >
              See all reviews on Amazon →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
