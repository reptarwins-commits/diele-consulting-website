import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import AboutCredentials from "@/components/AboutCredentials";
import AboutIdealClient from "@/components/AboutIdealClient";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "About | Joseph Diele — Leadership Coach & Founder, Diele Consulting",
  description:
    "35+ years leading teams in startups and Fortune 500 companies. Author of Sustainable Quality. Performance = Potential - Interference.",
};

export default function AboutPage() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <AboutHero />
      <AboutStory />
      <AboutIdealClient />
      <AboutCredentials />
      <Footer />
    </main>
  );
}
