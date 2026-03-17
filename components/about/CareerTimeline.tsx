"use client";
import { useEffect, useRef, useState } from "react";

const timeline = [
  {
    years: "2023–Present",
    role: "Founder & Executive Coach",
    company: "Diele Consulting",
    description: "Built a leadership coaching and consulting practice from scratch. Helps CEOs, CTOs, and VPs close the gap between technical expertise and people leadership.",
    highlight: true,
  },
  {
    years: "2024–Present",
    role: "Executive Director, Sales & Operations",
    company: "Priest-Zimmerman, Inc.",
    description: "Leads strategic and operational functions supporting small-business growth and workforce performance.",
    highlight: false,
  },
  {
    years: "2021–2023",
    role: "Quality Consultant / Program Manager",
    company: "Dell Technologies",
    description: "Led UAT for enterprise programs and built a Transformation Office Center of Excellence.",
    highlight: false,
  },
  {
    years: "2019–2021",
    role: "Senior Director, Quality & Operations",
    company: "Liqid",
    description: "Directed organizational scaling, manufacturing transition, and culture alignment at a high-growth hardware startup.",
    highlight: false,
  },
  {
    years: "2016–2019",
    role: "Senior Director, Quality & Operations",
    company: "ScaleFlux",
    description: "Improved cross-functional collaboration, validation rigor, and supplier performance.",
    highlight: false,
  },
  {
    years: "2010–2016",
    role: "Director, Quality & Center of Excellence",
    company: "SanDisk / Fusion-IO",
    description: "Drove cultural and leadership practice improvements across engineering and operations at scale.",
    highlight: false,
  },
  {
    years: "Earlier",
    role: "Engineering & Quality Leadership",
    company: "Sun Microsystems · StorageTek · Others",
    description: "35 years of building teams, running operations, and learning — often the hard way — what separates good managers from great leaders.",
    highlight: false,
  },
];

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
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
    <div
      ref={ref}
      className={`relative pl-10 pb-12 last:pb-0 transition-all duration-600 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Vertical line */}
      <div className="absolute left-[7px] top-3 bottom-0 w-[1px] bg-white/10 last:hidden" />

      {/* Dot */}
      <div className={`absolute left-0 top-[6px] w-4 h-4 rounded-full border-2 flex items-center justify-center ${item.highlight ? "border-[#B22222] bg-[#B22222]/20" : "border-white/20 bg-[#111111]"}`}>
        {item.highlight && <div className="w-1.5 h-1.5 rounded-full bg-[#B22222]" />}
      </div>

      <div className={`p-5 border transition-all duration-200 group hover:-translate-y-0.5 ${item.highlight ? "border-[#B22222]/30 bg-[#1a0a0a] hover:border-[#B22222]/60" : "border-white/5 bg-[#1a1a1a] hover:border-white/15"}`}>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-[#E8E8E8] font-semibold text-base">{item.role}</p>
            <p className={`text-sm font-medium ${item.highlight ? "text-[#B22222]" : "text-[#909090]"}`}>{item.company}</p>
          </div>
          <span className="text-[#909090] text-xs tracking-wide border border-white/10 px-2 py-1 whitespace-nowrap">{item.years}</span>
        </div>
        <p className="text-[#C8C8C8] text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

export default function CareerTimeline() {
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
    <section className="py-24 bg-[#111111]" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Career</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E8E8] mb-3">
            35 years. One through-line.
          </h2>
          <p className="text-[#C8C8C8] text-base leading-relaxed mb-16 max-w-xl">
            Every role taught him something different. The common thread: building people, not just products.
          </p>
        </div>

        <div>
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
