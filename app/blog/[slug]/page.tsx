import { getAllPosts, getPost } from "@/lib/posts";
import { marked } from "marked";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Joe Diele`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = marked(post.content);

  return (
    <main className="bg-[#111111] min-h-screen">
      <Nav />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22222]" />

      {/* Header */}
      <section className="pt-32 pb-12 border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#909090] hover:text-[#E8E8E8] text-sm mb-10 transition-colors duration-200">
            ← Back to Writing
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#B22222] text-[10px] tracking-[0.25em] uppercase font-semibold">{post.category}</span>
            <span className="text-white/20">·</span>
            <span className="text-[#909090] text-xs">{post.date}</span>
            <span className="text-white/20">·</span>
            <span className="text-[#909090] text-xs">{post.readTime}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8E8E8] leading-[1.1] mb-6">
            {post.title}
          </h1>
          <p className="text-[#C8C8C8] text-lg leading-relaxed border-l-2 border-[#B22222] pl-5">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="py-16">
        <div
          className="max-w-3xl mx-auto px-6 prose-joe"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {/* Author bio */}
      <section className="border-t border-white/5 py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-start gap-6 p-8 border border-white/5 bg-[#1a1a1a]">
            <div className="flex-shrink-0 w-14 h-14 bg-[#B22222]/20 border border-[#B22222]/30 flex items-center justify-center">
              <span className="text-[#B22222] font-serif font-bold text-lg">JD</span>
            </div>
            <div>
              <p className="text-[#E8E8E8] font-semibold mb-1">Joseph Diele</p>
              <p className="text-[#909090] text-sm mb-3">Executive Coach · Founder, Diele Consulting · Author of Sustainable Quality</p>
              <p className="text-[#C8C8C8] text-sm leading-relaxed">
                35 years in tech — from engineer to director to founder. Joe helps CEOs, CTOs, and VPs close the gap between technical expertise and people leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#C8C8C8] text-base mb-6">If this resonated, let's talk about what it looks like for you.</p>
          <a
            href="https://calendly.com/josephdiele"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#B22222] hover:bg-[#9a1a1a] text-white font-semibold px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B22222]/30"
          >
            Schedule a Conversation →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
