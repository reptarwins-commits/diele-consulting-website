import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogIndex from "@/components/blog/BlogIndex";

export const metadata = {
  title: "Leadership Blog for Technical Leaders | Diele Consulting",
  description:
    "Practical writing on leadership transitions, engineering culture, and what it really takes to lead technical teams. From Joe Diele — executive coach for engineers, Colorado-based.",
  alternates: {
    canonical: "https://www.dieleconsulting.com/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="bg-[#111111] min-h-screen">
      <Nav />
      <BlogIndex />
      <Footer />
    </main>
  );
}
