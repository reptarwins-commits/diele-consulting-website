import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogIndex from "@/components/blog/BlogIndex";
import { getAllPosts } from "@/lib/notion";
import { BLOG_ENABLED } from "@/lib/flags";

// Auto-refresh from Notion at most every 5 minutes; the daily Vercel Cron and the
// on-demand /api/cron/refresh-blog endpoint force a full refresh regardless of traffic.
export const revalidate = 300;

export const metadata = {
  title: "Leadership Blog for Technical Leaders | Diele Consulting LLC",
  description:
    "Practical writing on leadership transitions, engineering culture, and what it really takes to lead technical teams — from Joe Diele, who ran engineering organizations for 35+ years.",
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
