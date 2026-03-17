import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogIndex from "@/components/blog/BlogIndex";

export const metadata = {
  title: "Writing | Joe Diele — Diele Consulting",
  description: "Essays on leadership, culture, and the transition from technical expert to people leader.",
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
