"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const testimonials = [
  {
    quote: "Working with Joe was a great and rewarding experience. Joe not only made my stay at ScaleFlux a rewarding experience, but also provided a mentor-like role that helped me develop professionally as an engineer. Joe would be a great manager to any group.",
    name: "Edwin Garcia",
    title: "SSD Software Engineer",
    company: "Solidigm Technologies",
    source: "LinkedIn",
  },
  {
    quote: "I found Joe to be a highly competent and seasoned manager who listens well and acts with professionalism in all he does. Joe understands the concept of 'team' and directs accordingly. Joe would be a great asset to any organization.",
    name: "Andrew Amalfitano",
    title: "Revenue Growth",
    company: "CurvepointAI",
    source: "LinkedIn",
  },
  {
    quote: "He is a visionary leader. Under Joe's direction, our team completed a project that reduced the number of tests required for Integration and System Test by over 75% in just a few short months.",
    name: "Kevin Lehigh",
    title: "Lean Six Sigma Master Black Belt",
    company: "LTS, Inc.",
    source: "LinkedIn",
  },
  {
    quote: "Joe had a profound impact on my growth as a leader and professional. He taught me how to think like a leader, how to work across organizational boundaries and most importantly, how to influence people through trust, credibility, and collaboration. What truly sets him apart is his ability to connect with people on a personal level — a great listener and a fantastic mentor who genuinely cared about the success of those he managed.",
    name: "Jon Lacey",
    title: "Cross Functional Test Manager",
    company: "StorageTek / Sun Microsystems",
    source: "LinkedIn",
  },
  {
    quote: "I've had the pleasure of working under Joe's leadership, which is grounded in a deeply people-centric approach that starts with building the right foundation. Throughout high-pressure moments and ambiguity, Joe led with calm, thoughtful, and deep respect of the team, creating a sense of trust and stability even during chaos. I would highly recommend Joe as a mentor and leader — someone I continue to confidently lean on for guidance.",
    name: "Nimisha Morkonda Gnanasekaran",
    title: "Director, Data Science",
    company: "Advisory Board Member | ML/AI",
    source: "LinkedIn",
  },
  {
    quote: "Joe guided me through the manufacturing process and reliability analysis with ease and trust. He was able to convey the larger scope while maintaining a constant vision on the task at hand. He was excellent at creating and fostering a culture of individuals functioning as a cohesive unit. He is an excellent mentor and guide for his employees. He understands what a leadership role is and means to his people. I would recommend him highly for any organization looking to improve its culture and overall employee welfare.",
    name: "Robert Mestas",
    title: "Staff Data Analyst — Retired",
    company: "Western Digital",
    source: "LinkedIn",
  },
  {
    quote: "I worked for Joe in the Product Quality Dept at Sun Microsystems. He was a tremendous leader and still is a great mentor to me. He quickly recognized whenever my team was struggling and inspired and mentored us to solve issues from different approaches. He smartly guided us to make good business decisions while protecting our customers. He wisely taught me to not lose confidence when I failed. He inspired me to be persistent and to believe in my own abilities. Joe seemed to have a sixth sense about recognizing and developing upcoming leaders. He firmly believed that a good leader builds up others, and not pushing people down. He was an approachable mentor. No ego; no 'I told you so;' and certainly no malice in his generous heart. Even long after we no longer worked together, he's still available to me as a dear friend and very wise mentor. It's my privilege to endorse him as a great leader and mentor.",
    name: "Anh Bao",
    title: "Product Quality Manager",
    company: "Super Micro Computer",
    source: "LinkedIn",
  },
];

const INTERVAL = 5000;
const MD_BREAKPOINT = 768; // Tailwind md breakpoint

function useVisibleCount() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    function update() {
      setCount(window.innerWidth < MD_BREAKPOINT ? 1 : 3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isResetting = useRef(false);
  const visibleCount = useVisibleCount();

  const extended = [...testimonials, ...testimonials, ...testimonials];
  const total = testimonials.length;

  // Initialize to the middle set
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      if (trackRef.current) trackRef.current.style.transition = "none";
      setIndex(total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (trackRef.current) trackRef.current.style.transition = "transform 600ms ease-in-out";
          setInitialized(true);
        });
      });
    }
  }, [initialized, total]);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Seamless wrap
  useEffect(() => {
    if (!initialized || isResetting.current) return;
    if (index >= total * 2) {
      isResetting.current = true;
      const timeout = setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = "none";
        setIndex((prev) => prev - total);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (trackRef.current) trackRef.current.style.transition = "transform 600ms ease-in-out";
            isResetting.current = false;
          });
        });
      }, 620);
      return () => clearTimeout(timeout);
    }
    if (index < 0) {
      isResetting.current = true;
      const timeout = setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = "none";
        setIndex((prev) => prev + total);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (trackRef.current) trackRef.current.style.transition = "transform 600ms ease-in-out";
            isResetting.current = false;
          });
        });
      }, 620);
      return () => clearTimeout(timeout);
    }
  }, [index, initialized, total]);

  const goNext = useCallback(() => {
    if (isResetting.current) return;
    setIndex((prev) => prev + 1);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused || !initialized) return;
    const timer = setInterval(goNext, INTERVAL);
    return () => clearInterval(timer);
  }, [goNext, paused, initialized]);

  // Responsive math: track width and slide distance adapt to visibleCount
  const trackWidthPercent = (extended.length / visibleCount) * 100;
  const translatePercent = -(index / extended.length) * 100;

  return (
    <section ref={sectionRef} className="py-24 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-[#B22222]" />
            <span className="text-[#E84444] text-xs tracking-[0.3em] uppercase font-semibold">What Leaders Say</span>
            <div className="w-6 h-[1px] bg-[#B22222]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8]">
            &ldquo;He&rsquo;s been there. He gets it.&rdquo;
          </h2>
        </div>

        <div
          className={`relative transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Carousel viewport */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex"
              style={{
                width: `${trackWidthPercent}%`,
                transform: `translateX(${translatePercent}%)`,
                transition: "transform 600ms ease-in-out",
              }}
            >
              {extended.map((t, i) => (
                <div key={i} className="px-3 flex-shrink-0" style={{ width: `${100 / extended.length}%` }}>
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (!isResetting.current) setIndex(total + i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  ((index % total) + total) % total === i ? "bg-[#B22222] w-6" : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`group relative p-6 pt-4 bg-[#1a1a1a] border border-white/5 transition-all duration-300 h-full flex flex-col
        ${hovered ? "-translate-y-1 border-[#B22222]/30" : ""}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-1 mb-1">
        <span
          className="font-serif text-3xl leading-none transition-all duration-300 flex-shrink-0 -mt-1"
          style={{ color: `rgba(178,34,34,${hovered ? 0.5 : 0.25})` }}
        >
          &ldquo;
        </span>
      </div>
      <p className="text-[#C8C8C8] text-sm leading-relaxed mb-6 italic flex-1">{t.quote}</p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div className="w-10 h-10 bg-[#2a2a2a] flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#B22222]/20">
          <span className="text-[#B22222] font-serif font-bold text-sm">
            {t.name.split(" ").map((n: string) => n[0]).join("")}
          </span>
        </div>
        <div className="flex-1">
          <p className="text-[#E8E8E8] text-sm font-semibold">{t.name}</p>
          <p className="text-[#909090] text-xs">{t.title} · {t.company}</p>
        </div>
        <span className="text-[#909090] text-[10px] border border-white/10 px-2 py-0.5 flex-shrink-0">
          {t.source}
        </span>
      </div>
    </div>
  );
}
