import Nav from "@/components/Nav";
import Hero from "@/components/HeroConceptE3";
import CredibilityBlock from "@/components/CredibilityBlock";
import FeaturedOn from "@/components/FeaturedOn";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import Framework from "@/components/Framework";
import Services from "@/components/Services";
import Book from "@/components/Book";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Leadership Coaching for Technical Leaders | Diele Consulting",
  description:
    "Joe Diele helps CTOs, VPs of Engineering, and technical founders close the gap between technical expertise and people leadership. Colorado-based, coaching leaders nationwide.",
  alternates: {
    canonical: "https://www.dieleconsulting.com",
  },
};

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <CredibilityBlock />
      <FeaturedOn />
      <WhoThisIsFor />
      <Framework />
      <Services />
      <Book />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
