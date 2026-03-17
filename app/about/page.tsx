import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import OriginStory from "@/components/about/OriginStory";
import CareerTimeline from "@/components/about/CareerTimeline";
import Credentials from "@/components/about/Credentials";
import Publications from "@/components/about/Publications";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About Joe Diele | Executive Coach & Leadership Consultant",
  description: "35 years turning technical expertise into leadership mastery. Joe Diele's story — from engineer to executive coach.",
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
