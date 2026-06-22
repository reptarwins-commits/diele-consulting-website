import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogIndex from "@/components/blog/BlogIndex";
import { getAllPosts } from "@/lib/notion";
import { BLOG_ENABLED } from "@/lib/flags";

// Re-fetch from Notion at most hourly; the daily Vercel Cron forces a morning refresh.
export const revalidate = 3600;

export const metadata = {
  title: "Leadership Blog for Technical Leaders | Diele Consulting",
  description:
    "Practical writing on leadership transitions, engineering culture, and what it really takes to lead technical teams — from Joe Diele, executive coach for technical leaders.",
  alternates: {
    canonical: "https://www.dieleconsulting.com/blog",
  },
};

export default async function BlogPage() {
  if (!BLOG_ENABLED) notFound();
  const posts = await getAllPosts();
  return (
    <main className="bg-[#111111] min-h-screen">
      <Nav />
      <BlogIndex posts={posts} />
      <Footer />
    </main>
  );
}
