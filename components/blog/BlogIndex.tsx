"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const posts = [
  {
    slug: "from-expert-to-leader",
    title: "From Expert to Leader: What Nobody Tells You",
    excerpt: "You were promoted because you were the best at what you did. Then everything changed — and nobody warned you it would feel like this.",
    date: "March 1, 2026",
    readTime: "7 min read",
    category: "Leadership",
    featured: true,
  },
  {
    slug: "what-my-kids-learned-from-me",
    title: "What My Kids Learned From Me",
    excerpt: "I never sat them down and taught them these things. I was too busy working. But somehow, in the margins of all that bustle, they were watching.",
    date: "March 25, 2026",
    readTime: "4 min read",
    category: "Leadership",
    featured: false,
  },
  {
    slug: "remote-culture-problem",
    title: "The Remote Culture Problem",
    excerpt: "You built the culture in the office. You are not sure it survived the distance.",
    date: "March 24, 2026",
    readTime: "3 min read",
    category: "Leadership",
    featured: false,
  },
  {
    slug: "character-of-a-leader",
    title: "The Character of a Leader",
    excerpt: "Real leaders don't need to tell you they are leaders. You know it by watching how they move through difficult decisions.",
    date: "February 25, 2026",
    readTime: "3 min read",
    category: "Leadership",
    featured: false,
  },
  {
    slug: "hands-on-manager-trap",
    title: "The Hands-On Manager Trap",
    excerpt: "Promoting your best technical expert into a player-coach role feels efficient. It isn't. It's a slow sentence for their career and your culture.",
    date: "February 15, 2026",
    readTime: "6 min read",
    category: "Leadership",
    featured: false,
  },
  {
    slug: "mentor-who-changed-everything",
    title: "The Mentor Who Changed Everything",
    excerpt: "He said it simply, almost offhand. 'Technical skills can open doors, but people skills keep them open.' I nodded. I thought I knew better.",
    date: "February 22, 2026",
    readTime: "5 min read",
    category: "Leadership",
    featured: false,
  },
];

const externalPieces = [
  {
    publication: "IndustryWeek",
    title: "To Fix Quality, You Must First Fix Culture",
    excerpt: "Quality isn't a department — it's what happens when your culture is healthy. Sustainable improvement is impossible without addressing what's underneath.",
    url: "https://www.industryweek.com",
  },
  {
    publication: "ASQ Quality Progress",
    title: "Metamorphosis of a Manager",
    excerpt: "The shift from command-and-control oversight to coaching-oriented leadership. What it really takes to evolve from manager to leader.",
    url: "https://asq.org/quality-progress",
  },
];

function PostCard({ post, index }: { post: typeof posts[0]; index: number }) {
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
    <div
      ref={ref}
      className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/blog/${post.slug}`} className="group block border border-white/5 bg-[#1a1a1a] hover:border-[#B22222]/40 hover:bg-[#150a0a] transition-all duration-200 p-8 hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[#B22222] text-[10px] tracking-[0.25em] uppercase font-semibold">{post.category}</span>
          <span className="text-white/20">·</span>
          <span className="text-[#909090] text-xs">{post.date}</span>
          <span className="text-white/20">·</span>
          <span className="text-[#909090] text-xs">{post.readTime}</span>
        </div>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-[#E8E8E8] group-hover:text-white mb-3 leading-tight transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-[#C8C8C8] text-base leading-relaxed mb-5">{post.excerpt}</p>
        <span className="text-[#B22222] text-sm font-semibold group-hover:gap-3 flex items-center gap-2 transition-all duration-200">
          Read essay <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </span>
      </Link>
    </div>
  );
}

export default function BlogIndex() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const featured = posts.find(p => p.featured);
  const rest = posts.filter(p => !p.featured);

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 bg-[#111111] border-b border-white/5">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222]" />
        <div className={`max-w-4xl mx-auto px-6 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#B22222]" />
            <span className="text-[#B22222] text-xs tracking-[0.3em] uppercase font-semibold">Writing</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#E8E8E8] mb-4">
            Essays on leadership.
          </h1>
          <p className="text-[#C8C8C8] text-lg max-w-xl">
            Hard-won lessons from 35 years in tech — on the transition from expert to leader, building cultures that last, and the things nobody teaches you when you get promoted.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="py-12 border-b border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-[#909090] text-xs tracking-[0.25em] uppercase font-medium mb-6">Featured Essay</p>
            <Link href={`/blog/${featured.slug}`} className="group block border border-[#B22222]/20 bg-[#1a1a1a] hover:border-[#B22222]/60 hover:bg-[#150a0a] transition-all duration-200 p-10 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#B22222] text-[10px] tracking-[0.25em] uppercase font-semibold">{featured.category}</span>
                <span className="text-white/20">·</span>
                <span className="text-[#909090] text-xs">{featured.date}</span>
                <span className="text-white/20">·</span>
                <span className="text-[#909090] text-xs">{featured.readTime}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#E8E8E8] group-hover:text-white mb-4 leading-tight transition-colors duration-200">
                {featured.title}
              </h2>
              <p className="text-[#C8C8C8] text-base leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
              <span className="text-[#B22222] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                Read essay <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Rest of posts */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4">
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* External publications */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[#909090] text-xs tracking-[0.25em] uppercase font-medium mb-6">Published Elsewhere</p>
          <div className="space-y-4">
            {externalPieces.map((piece, i) => (
              <a
                key={i}
                href={piece.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-6 border border-white/5 bg-[#1a1a1a] hover:border-[#B22222]/30 p-6 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-28 pt-0.5">
                  {piece.publication === "IndustryWeek" ? (
                    <div className="text-[#909090] group-hover:text-[#C8C8C8] transition-colors duration-200">
                      <span className="font-sans font-black text-[13px] tracking-tight uppercase leading-none">Industry</span>
                      <span className="font-sans font-black text-[13px] tracking-tight uppercase leading-none text-[#B22222]">Week</span>
                    </div>
                  ) : (
                    <div className="text-[#909090] group-hover:text-[#C8C8C8] transition-colors duration-200 flex items-center gap-1">
                      <span className="font-sans font-black text-[15px] tracking-widest uppercase leading-none">ASQ</span>
                      <div className="w-[1px] h-3 bg-current opacity-40 mx-0.5" />
                      <span className="font-sans font-light text-[9px] tracking-[0.15em] uppercase leading-none opacity-80">Quality<br/>Progress</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-[#E8E8E8] font-semibold text-base mb-1 group-hover:text-white transition-colors duration-200">"{piece.title}"</h3>
                  <p className="text-[#909090] text-sm leading-relaxed">{piece.excerpt}</p>
                </div>
                <span className="flex-shrink-0 text-[#B22222]/50 group-hover:text-[#B22222] transition-colors duration-200 pt-1">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
