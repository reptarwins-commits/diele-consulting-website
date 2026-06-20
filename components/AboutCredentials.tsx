"use client";

import { useEffect, useRef, useState } from "react";

const credentials = [
  { value: "35+", label: "Years leading teams in startups and Fortune 500 environments" },
  { value: "M.S.", label: "Management" },
  { value: "CECM", label: "Certified Executive Coach" },
  { value: "Author", label: "Sustainable Quality (Business Expert Press, 2021)" },
];

export default function AboutCredentials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-[#111111]">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">
              Background
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {credentials.map((cred, i) => (
              <div
                key={i}
                className={`p-6 border border-white/10 bg-[#1a1a1a] transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <p className="text-2xl font-serif text-[#B22222] font-bold mb-2">
                  {cred.value}
                </p>
                <p className="text-[#C8C8C8]">{cred.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-2xl font-serif text-[#E8E8E8] mb-6">
              Let&apos;s talk about what that could look like for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/josephdiele"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#B22222] text-white px-8 py-4 font-semibold hover:bg-[#8B0000] transition-colors duration-200"
              >
                Book a Free 20-Minute Call →
              </a>
              <a
                href="#services"
                className="inline-block border border-white/20 text-[#C8C8C8] px-8 py-4 font-semibold hover:border-[#B22222] hover:text-white transition-colors duration-200"
              >
                Explore Services
              </a>
            </div>
            <p className="text-sm text-[#888888] mt-4">
              No pitch. Just a conversation about what&apos;s slowing you down.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
