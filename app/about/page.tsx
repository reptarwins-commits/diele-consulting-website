import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import OriginStory from "@/components/about/OriginStory";
import CareerTimeline from "@/components/about/CareerTimeline";
import Credentials from "@/components/about/Credentials";
import Publications from "@/components/about/Publications";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About Joe Diele | Executive Coach for Engineers & Technical Leaders",
  description:
    "35 years of technical leadership experience. Joe Diele coaches CTOs, VPs of Engineering, and technical founders through the leadership transition — from best engineer in the room to effective people leader. Colorado-based, serving leaders nationwide.",
  alternates: {
    canonical: "https://www.dieleconsulting.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-[#111111] min-h-screen">
      <Nav />
      <AboutHero />
      <OriginStory />
      <CareerTimeline />
      <Credentials />
      <Publications />
      <AboutCTA />
      <Footer />
    </main>
  );
}
