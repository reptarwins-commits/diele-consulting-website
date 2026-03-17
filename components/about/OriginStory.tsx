"use client";
import { useEffect, useRef, useState } from "react";

const chapters = [
  {
    label: "The Pattern",
    heading: "The same thing kept happening.",
    body: [
      "Over 35 years — at startups and Fortune 500s, in manufacturing and tech, at SanDisk and Dell and everywhere in between — I watched the same thing play out.",
      "Brilliant people get promoted into management. Engagement drops. Quality suffers. Good people leave. And the manager has no idea why, because they're working harder than ever.",
      "I saw it so often I wrote a book about it.",
    ],
    quote: null,
  },
  {
    label: "The Turning Point",
    heading: "My mentor told me something I didn't want to hear.",
    body: [
      "My first management role came because I was the technical expert. I was good at solving problems. So I kept solving them — every one that crossed my desk. I thought I was doing great work.",
      "Then my mentor pulled me aside.",
    ],
    quote: {
      text: "You're limiting everyone around you. They'll never grow as long as you're the one with all the answers.",
      attribution: "— Joe's mentor",
    },
    bodyAfter: [
      "He was right. I was so busy being indispensable that I'd made everyone else dispensable. I wasn't leading — I was blocking.",
    ],
  },
  {
    label: "The Shift",
    heading: "I stopped being the expert. I started being a leader.",
    body: [
      "I stopped jumping in with answers. I started asking: \"What do you think we should do?\"",
      "I stopped fixing problems. I started building the kind of team that could fix them without me.",
      "It was uncomfortable as hell. But my team got stronger. Decisions got faster. Problems got solved without me. People started leading themselves.",
    ],
    quote: null,
  },
  {
    label: "The Work",
    heading: "Now I do that for other leaders.",
    body: [
      "The brilliant founder who can't scale because they're still the expert. The VP of Engineering who's drowning. The CTO who's the bottleneck for every decision.",
      "If your team can't function without you, that's not a badge of honor. It's a warning sign.",
      "I did the hard work of becoming a leader. I can show you what that path looks like.",
    ],
    quote: null,
  },
];

function Chapter({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
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
      className={`grid md:grid-cols-[120px_1fr] gap-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Left — chapter label + red line */}
      <div className="flex md:flex-col items-start gap-3 pt-1">
        <div className="flex items-center gap-2 md:flex-col md:items-start">
          <div className="w-6 h-[2px] bg-[#B22222] flex-shrink-0" />
          <span className="text-[#B22222] text-[10px] tracking-[0.3em] uppercase font-semibold whitespace-nowrap">{chapter.label}</span>
        </div>
        {/* Vertical line connecting chapters on desktop */}
        <div className="hidden md:block w-[1px] bg-white/5 flex-1 mt-3 ml-3" />
      </div>

      {/* Right — content */}
      <div className="pb-16">
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#E8E8E8] mb-5 leading-tight">
          {chapter.heading}
        </h3>
        {chapter.body.map((p, i) => (
          <p key={i} className="text-[#C8C8C8] text-base leading-relaxed mb-4">{p}</p>
        ))}
        {chapter.quote && (
          <blockquote className="border-l-2 border-[#B22222] pl-6 my-6">
            <p className="font-serif text-xl text-[#E8E8E8] italic leading-relaxed mb-2">
              "{chapter.quote.text}"
            </p>
            <cite className="text-[#909090] text-sm not-italic">{chapter.quote.attribution}</cite>
          </blockquote>
        )}
        {chapter.bodyAfter?.map((p, i) => (
          <p key={i} className="text-[#C8C8C8] text-base leading-relaxed mb-4">{p}</p>
        ))}
      </div>
    </div>
  );
}

export default function OriginStory() {
  return (
    <section className="py-24 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-[2px] bg-[#B22222]" />
          <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">The Story</span>
        </div>
        <div className="space-y-0">
          {chapters.map((chapter, i) => (
            <Chapter key={i} chapter={chapter} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
